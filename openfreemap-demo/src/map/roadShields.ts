import type { FilterSpecification, MapLibreMap } from 'maplibre-gl'

/**
 * 国道・県道の番号標識（シールド）を、日本の実際の道路標識風に描き替える。
 *
 * - 国道: 青地・白フチの逆三角形（通称「おにぎり」）
 * - 県道: 青地・白フチの六角形（通称「ヘキサ」）
 *
 * OpenFreeMap 既定は `road_<桁数>` という白い角丸長方形のスプライトを使う。
 * スプライトは OpenFreeMap 側にあり差し替えられないため、Canvas で描いた
 * 画像を `map.addImage()` で登録し、レイヤーの icon-image を差し替えている。
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

/** 標識の青。実際の案内標識に近い濃い青 */
const SHIELD_BLUE = '#0b4da2'
const SHIELD_WHITE = '#ffffff'

/** ref_length（番号の文字数）の取りうる範囲。スタイル側の filter が <= 6 */
const REF_LENGTHS = [1, 2, 3, 4, 5, 6]

/** 画像は 2倍解像度で描いて pixelRatio 2 として登録する */
const SCALE = 2

const NATIONAL_PREFIX = 'jp-national-'
const PREFECTURAL_PREFIX = 'jp-prefectural-'
const NATIONAL_LAYER_ID = 'jp-shield-national'
const PREFECTURAL_LAYER_ID = 'jp-shield-prefectural'

/**
 * 番号の文字数から標識の寸法を決める。
 *
 * 逆三角形は下に向かって細くなるため、文字を置く高さでの内幅が
 * 文字幅を上回るように、六角形より大きめに取る必要がある。
 * ヘッドレスブラウザで実際に描画し、文字がはみ出さないことを確認した値。
 */
function nationalSize(refLength: number): { width: number; height: number } {
  const width = Math.round(16 + 9.5 * refLength)
  return { width, height: Math.round(width * 0.72) }
}

function prefecturalSize(refLength: number): { width: number; height: number } {
  return { width: Math.round(14 + 8.5 * refLength), height: 19 }
}

/** 逆三角形は文字を上寄せしないと収まらない（単位は em、text-size 基準） */
const NATIONAL_TEXT_OFFSET: [number, number] = [0, -0.3]
const PREFECTURAL_TEXT_OFFSET: [number, number] = [0, 0]

/** 角を丸めた多角形のパスを引く */
function roundedPolygon(
  ctx: CanvasRenderingContext2D,
  points: [number, number][],
  radius: number,
): void {
  ctx.beginPath()
  for (let i = 0; i < points.length; i++) {
    const prev = points[(i - 1 + points.length) % points.length]
    const curr = points[i]
    const next = points[(i + 1) % points.length]
    // 前の頂点から curr へ向かう線上の、curr の手前 radius の点から
    // 次の頂点方向へ arcTo で丸める
    const start: [number, number] = [
      curr[0] + (prev[0] - curr[0]) * 0.5,
      curr[1] + (prev[1] - curr[1]) * 0.5,
    ]
    if (i === 0) ctx.moveTo(start[0], start[1])
    else ctx.lineTo(start[0], start[1])
    ctx.arcTo(curr[0], curr[1], next[0], next[1], radius)
  }
  ctx.closePath()
}

/** 多角形を描いた canvas を作る */
function drawShield(
  width: number,
  height: number,
  points: (w: number, h: number) => [number, number][],
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = width * SCALE
  canvas.height = height * SCALE
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.scale(SCALE, SCALE)
  // 白フチが切れないよう内側に寄せて描く
  const inset = 1.5
  roundedPolygon(ctx, points(width - inset * 2, height - inset * 2).map(
    ([x, y]) => [x + inset, y + inset] as [number, number],
  ), 3)

  ctx.fillStyle = SHIELD_BLUE
  ctx.fill()
  ctx.lineWidth = 2
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

/** 国道（逆三角形）・県道（六角形）の標識画像を登録する */
function registerShieldImages(map: MapLibreMap): void {
  for (const n of REF_LENGTHS) {
    // 国道: 逆三角形（おにぎり）
    const nat = nationalSize(n)
    addCanvasImage(
      map,
      `${NATIONAL_PREFIX}${n}`,
      drawShield(nat.width, nat.height, (iw, ih) => [
        [0, 0],
        [iw, 0],
        [iw / 2, ih],
      ]),
    )

    // 県道: 六角形（ヘキサ）
    const pref = prefecturalSize(n)
    addCanvasImage(
      map,
      `${PREFECTURAL_PREFIX}${n}`,
      drawShield(pref.width, pref.height, (iw, ih) => [
        [iw * 0.25, 0],
        [iw * 0.75, 0],
        [iw, ih / 2],
        [iw * 0.75, ih],
        [iw * 0.25, ih],
        [0, ih / 2],
      ]),
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
 * 国道・県道の標識を日本風に差し替える。
 *
 * 元の `highway-shield-non-us` を複製して国道用・県道用のレイヤーを作り、
 * 元レイヤーからは該当する道路種別を除外する。
 * 文字色や文字位置をレイヤーごとに変えられるよう、条件式で1枚に詰め込まず
 * レイヤーを分けている（逆三角形は文字を少し上に置く必要があるため）。
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

  // 国道: 逆三角形は下に向かって細くなるので、文字を上に寄せる
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
