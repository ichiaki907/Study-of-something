import type { FilterSpecification, MapLibreMap } from 'maplibre-gl'

/**
 * 国道・県道の番号標識（シールド）を Google マップ風に描き替える。
 *
 * - 国道: 上が角丸・下がすぼまった盾型（日本の「おにぎり」を丸めた形）
 * - 県道: 左右がとがった横長の六角形（「ヘキサ」を丸めた形）
 *
 * OpenFreeMap 既定は `road_<桁数>` という白い角丸長方形のスプライトを使う。
 * スプライトは OpenFreeMap 側にあり差し替えられないため、Canvas で描いた
 * 画像を `map.addImage()` で登録し、レイヤーの icon-image を差し替えている。
 *
 * ■ 寸法・配色の根拠
 * 実際の Google マップのスクリーンショットから実測した値を使っている。
 * （同一端末で撮影した本アプリのスクショと突き合わせ、CSS px 換算で比較）
 *   - 塗りの青      : rgb(72,118,191)
 *   - 白フチ        : 約 1.5px
 *   - 国道 3桁      : 塗り幅 約 24px / 高さ 約 18px
 *   - 県道 3桁      : 塗り幅 約 26px / 高さ 約 14.5px
 *   - 数字          : 高さ・送り幅とも本アプリ（text-size 10）とほぼ同じ
 * 以前の実寸大の道路標識（濃紺・鋭い逆三角形）は Google に比べて 1.6 倍ほど
 * 大きく、地図の情報量を圧迫していたため、この実測値に合わせて縮めている。
 *
 * ■ 国道と県道の判別について（重要な制約）
 * OpenMapTiles の `network` フィールドは us-* / ca-* / gb-* / ie-* しか値を
 * 持たず、日本の道路はすべて既定値の "road" になる。つまりデータから
 * 「国道か県道か」を直接は判別できない。
 * そのため道路種別(class)で近似している。
 *   trunk / primary      → 国道
 *   secondary / tertiary → 県道
 * 日本の OSM では概ねこの対応だが、地方の国道が secondary で登録されている
 * ような例では取り違えが起きうる。
 */

/** 塗りの青。Google マップの標識から実測した値 */
const SHIELD_BLUE = '#4876bf'
const SHIELD_WHITE = '#ffffff'

/** ref_length（番号の文字数）の取りうる範囲。スタイル側の filter が <= 6 */
const REF_LENGTHS = [1, 2, 3, 4, 5, 6]

/** 画像は 2倍解像度で描いて pixelRatio 2 として登録する */
const SCALE = 2

/** 白フチの太さ(px)。Google の実測値 */
const HALO = 1.5

/** 塗り部分の高さ(px)。桁数によらず一定なのも Google と同じ */
const NATIONAL_HEIGHT = 18
const PREFECTURAL_HEIGHT = 14.5

/**
 * 塗り部分の幅(px)。
 * DIGIT_WIDTH は text-size 10 / Noto Sans Regular の数字1文字の送り幅、
 * SIDE_PADDING は Google の標識で数字の左右に空いていた余白の合計。
 * 1桁だけは相対的に余白を広く取る（Google も同様）ため下限を設けている。
 */
const DIGIT_WIDTH = 5.8
const SIDE_PADDING = 8.4
const MIN_WIDTH = 16

function shieldWidth(refLength: number): number {
  return Math.max(MIN_WIDTH, DIGIT_WIDTH * refLength + SIDE_PADDING)
}

const NATIONAL_PREFIX = 'jp-national-'
const PREFECTURAL_PREFIX = 'jp-prefectural-'
const NATIONAL_LAYER_ID = 'jp-shield-national'
const PREFECTURAL_LAYER_ID = 'jp-shield-prefectural'

/**
 * 盾型は下半分がすぼまるので、数字をわずかに上へ寄せる（単位は em）。
 * Google の標識でも数字の中心は図形の中心より 6% ほど上にあった。
 */
const NATIONAL_TEXT_OFFSET: [number, number] = [0, -0.12]
const PREFECTURAL_TEXT_OFFSET: [number, number] = [0, 0]

/**
 * 国道の盾型パスを引く。
 *
 * 座標は Google の標識（62x47px）から起こした比率をそのまま使い、
 * 幅・高さに掛けて任意サイズへ伸縮する。Google も桁数に応じて
 * 横方向へ一様に引き伸ばしていた（1桁 42px / 3桁 62px で輪郭が相似）。
 */
function nationalPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const px = (rx: number) => x + rx * w
  const py = (ry: number) => y + ry * h

  ctx.beginPath()
  // 上辺（左右は角丸）
  ctx.moveTo(px(0.27), py(0))
  ctx.lineTo(px(0.73), py(0))
  ctx.quadraticCurveTo(px(1), py(0), px(1), py(0.19))
  // 右肩からすぼまって下の丸い先端へ
  ctx.lineTo(px(1), py(0.32))
  ctx.bezierCurveTo(px(0.98), py(0.6), px(0.8), py(0.9), px(0.55), py(0.985))
  // 先端はわずかに丸める
  ctx.quadraticCurveTo(px(0.5), py(1), px(0.45), py(0.985))
  // 左側は右側の鏡像
  ctx.bezierCurveTo(px(0.2), py(0.9), px(0.02), py(0.6), px(0), py(0.32))
  ctx.lineTo(px(0), py(0.19))
  ctx.quadraticCurveTo(px(0), py(0), px(0.27), py(0))
  ctx.closePath()
}

/**
 * 県道の六角形パスを引く。
 *
 * 左右のとがりの深さは高さに対する比率で決める（Google では 9/38 ≒ 0.24）。
 * 幅に対する比率にすると、桁数が少ない標識でとがりが浅くなってしまう。
 */
function prefecturalPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const inset = 0.24 * h
  const r = 1.4
  const points: [number, number][] = [
    [x + inset, y],
    [x + w - inset, y],
    [x + w, y + h / 2],
    [x + w - inset, y + h],
    [x + inset, y + h],
    [x, y + h / 2],
  ]

  ctx.beginPath()
  for (let i = 0; i < points.length; i++) {
    const prev = points[(i - 1 + points.length) % points.length]
    const curr = points[i]
    const next = points[(i + 1) % points.length]
    // 直前の辺の中点から始め、頂点を radius で丸めながら次の辺へ向かう
    const startX = curr[0] + (prev[0] - curr[0]) * 0.5
    const startY = curr[1] + (prev[1] - curr[1]) * 0.5
    if (i === 0) ctx.moveTo(startX, startY)
    else ctx.lineTo(startX, startY)
    ctx.arcTo(curr[0], curr[1], next[0], next[1], r)
  }
  ctx.closePath()
}

type PathFn = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) => void

/**
 * 標識を描いた canvas を作る。
 *
 * 塗り(fillWidth x fillHeight)の外側に HALO 分の白フチが付くので、
 * canvas はその分だけ大きく取る。パスは線幅の半分だけ内側に置き、
 * 中心線に沿ってストロークすることで「内側 0.75px を白が覆い、
 * 外側 0.75px がキャンバス端まで」となるように描いている。
 */
function drawShield(
  fillWidth: number,
  fillHeight: number,
  path: PathFn,
): HTMLCanvasElement {
  const width = fillWidth + HALO * 2
  const height = fillHeight + HALO * 2
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * SCALE)
  canvas.height = Math.round(height * SCALE)
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.scale(SCALE, SCALE)
  const inset = HALO / 2
  path(ctx, inset, inset, width - inset * 2, height - inset * 2)

  ctx.fillStyle = SHIELD_BLUE
  ctx.fill()
  ctx.lineWidth = HALO
  ctx.strokeStyle = SHIELD_WHITE
  ctx.lineJoin = 'round'
  ctx.stroke()
  return canvas
}

/** canvas を MapLibre の画像として登録する */
function addCanvasImage(
  map: MapLibreMap,
  id: string,
  canvas: HTMLCanvasElement,
): void {
  if (map.hasImage(id)) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height)
  map.addImage(
    id,
    { width: image.width, height: image.height, data: image.data },
    { pixelRatio: SCALE },
  )
}

/** 国道（盾型）・県道（六角形）の標識画像を登録する */
function registerShieldImages(map: MapLibreMap): void {
  for (const n of REF_LENGTHS) {
    const width = shieldWidth(n)
    addCanvasImage(
      map,
      `${NATIONAL_PREFIX}${n}`,
      drawShield(width, NATIONAL_HEIGHT, nationalPath),
    )
    addCanvasImage(
      map,
      `${PREFECTURAL_PREFIX}${n}`,
      drawShield(width, PREFECTURAL_HEIGHT, prefecturalPath),
    )
  }
}

type ShieldLayer = {
  id: string
  filter?: unknown
  layout?: Record<string, unknown>
  paint?: Record<string, unknown>
}

/**
 * 国道・県道の標識を Google マップ風に差し替える。
 *
 * 元の `highway-shield-non-us` を複製して国道用・県道用のレイヤーを作り、
 * 元レイヤーからは該当する道路種別を除外する。
 * 文字位置をレイヤーごとに変えられるよう、条件式で1枚に詰め込まず
 * レイヤーを分けている（盾型は文字を少し上に置く必要があるため）。
 */
export function applyJapaneseRoadShields(map: MapLibreMap): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  const base = layers.find((layer) => layer.id === 'highway-shield-non-us')
  if (!base || base.type !== 'symbol') return
  if (map.getLayer(NATIONAL_LAYER_ID)) return

  registerShieldImages(map)

  const baseFilter = (base as ShieldLayer).filter

  const makeLayer = (
    id: string,
    classes: string[],
    iconPrefix: string,
    textOffset: [number, number],
  ) => {
    const layer = structuredClone(base) as typeof base & ShieldLayer
    layer.id = id
    layer.filter = [
      'all',
      baseFilter,
      ['match', ['get', 'class'], classes, true, false],
    ] as unknown as FilterSpecification
    layer.layout = {
      ...(layer.layout ?? {}),
      'icon-image': [
        'concat',
        iconPrefix,
        ['to-string', ['get', 'ref_length']],
      ],
      'text-offset': textOffset,
    }
    layer.paint = { ...(layer.paint ?? {}), 'text-color': SHIELD_WHITE }
    map.addLayer(layer, 'highway-shield-non-us')
  }

  // 国道: 盾型は下がすぼまるので、文字を少し上に寄せる
  makeLayer(
    NATIONAL_LAYER_ID,
    ['trunk', 'primary'],
    NATIONAL_PREFIX,
    NATIONAL_TEXT_OFFSET,
  )
  // 県道: 六角形は上下対称なので中央のまま
  makeLayer(
    PREFECTURAL_LAYER_ID,
    ['secondary', 'tertiary'],
    PREFECTURAL_PREFIX,
    PREFECTURAL_TEXT_OFFSET,
  )

  // 元のレイヤーからは国道・県道を除外する（それ以外は既定の見た目のまま）
  map.setFilter('highway-shield-non-us', [
    'all',
    baseFilter,
    [
      'match',
      ['get', 'class'],
      ['trunk', 'primary', 'secondary', 'tertiary'],
      false,
      true,
    ],
  ] as unknown as FilterSpecification)
}
