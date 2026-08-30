import type { MapLibreMap } from 'maplibre-gl'

/**
 * OpenFreeMap の既定配色を「一般的な地図アプリ（Google マップ等）」に
 * 近い寒色寄りのニュートラルな配色へ寄せるテーマ。
 *
 * OpenMapTiles 系スタイルの既定は暖色ベージュ基調で、
 * 一般道まで淡黄色(#fea)＋茶系ケーシング(#e9ac77)が付くため、
 * 見慣れた地図アプリと比べて独特な印象になる。
 * ここでは以下の方針で色を置き換える。
 *
 * - 陸地・土地利用: 暖色ベージュ → ニュートラルなライトグレー
 * - 一般道: 淡黄色 → 白 ＋ 淡いグレーのケーシング
 * - 黄色〜橙は高速道路にのみ残す
 * - 病院のピンク・学校の紫など主張の強い面: ニュートラル化
 */

const PALETTE = {
  // --- 面 ---
  /** 陸地のベース */
  land: '#f3f1f2',
  /** 土地利用のうち市街地以外（墓地・学校敷地など） */
  landSubtle: '#efedee',
  /**
   * 市街地。実測では Google も街区をベースとほぼ同色にしており、
   * 面ではなく「道路の塗り分け」で街の構造を見せている。
   */
  urban: '#f0eeef',
  /** 自然（森林・公園・草地）。黄緑ではなく明るいミント寄りの緑 */
  green: '#d9f4e1',
  /** 農地。森林よりわずかに淡く */
  farmland: '#e4f6e8',
  water: '#a0d6ea',
  building: '#e8e6e7',
  buildingTop: '#eeecee',

  // --- 道路（3階層で塗り分ける）---
  /** 生活道路。周囲の土地より「明るく」して道路網を浮かせる */
  road: '#ffffff',
  roadCasing: '#e2e0e1',
  /** 国道(trunk/primary)。土地より「暗い」青灰で幹線を目立たせる */
  trunk: '#c3ccd8',
  trunkCasing: '#aab4c2',
  /** 県道(secondary/tertiary)。国道より淡い青灰 */
  arterial: '#d5dde5',
  arterialCasing: '#bcc5cf',
  /** 高速道路のみ橙系を残す */
  motorway: '#f9d79f',
  motorwayCasing: '#efb96a',

  // --- その他 ---
  rail: '#d6d6d3',
  path: '#dcdcd8',
}

/**
 * 森林(landcover class=wood)の不透明度。
 *
 * OpenFreeMap 既定は bright=0.1 / liberty=0.4 と非常に薄く、
 * 山地がほとんど白いままになる。一般的な地図アプリの「山の緑」に
 * 近づけるため濃くする。
 */
const WOOD_OPACITY = 0.85

/**
 * 緑地（草地・公園）の最低不透明度。
 *
 * これらも既定値が低く、bright の park は z12 で 0.2、
 * liberty の grass は 0.3 まで下がって色が飛んでしまう。
 * 既定値がこれより高い場合は下げないよう、数値指定のときだけ比較する。
 */
const GREEN_MIN_OPACITY = 0.75

/** 追加する農地レイヤーの ID（復元時に削除するため固定値で持つ） */
const FARMLAND_LAYER_ID = 'ofm-demo-farmland'

/** 建物にうっすら輪郭を付けて、施設の輪郭が分かるようにする */
const BUILDING_OUTLINE = '#d8d8d4'

/** POI・道路名ラベルの文字色（既定の #666 は薄すぎる） */
const LABEL_TEXT = '#43464a'
/** ラベルの白フチ。道路や緑地に重なっても読めるようにする */
const LABEL_HALO = '#ffffff'

interface ColorRule {
  test: RegExp
  color: string
}

/**
 * 上から順に評価し、最初に一致したルールを適用する（順序が重要）。
 * 例: "highway-path" は道路ルールより先に path ルールへ当てる。
 *
 * レイヤーIDの区切り文字はスタイルによって異なる点に注意。
 * bright/positron はハイフン（tunnel-minor）だが
 * liberty はアンダースコア（tunnel_minor）を使うため、
 * 区切りを含むパターンは [-_] で両方に対応させている。
 */
const RULES: ColorRule[] = [
  { test: /^water$|^water[-_]|^waterway/, color: PALETTE.water },
  { test: /park|grass|wood|forest/, color: PALETTE.green },
  { test: /^building[-_]top$/, color: PALETTE.buildingTop },
  { test: /^building/, color: PALETTE.building },
  // 高速道路
  { test: /motorway.*casing/, color: PALETTE.motorwayCasing },
  { test: /motorway/, color: PALETTE.motorway },
  // 国道（trunk / primary）
  { test: /(trunk|primary).*casing/, color: PALETTE.trunkCasing },
  { test: /(trunk|primary)/, color: PALETTE.trunk },
  // 県道（secondary / tertiary）
  { test: /(secondary|tertiary).*casing/, color: PALETTE.arterialCasing },
  { test: /(secondary|tertiary)/, color: PALETTE.arterial },
  // 生活道路のケーシング
  { test: /casing/, color: PALETTE.roadCasing },
  { test: /rail|cablecar/, color: PALETTE.rail },
  { test: /path/, color: PALETTE.path },
  {
    test: /highway|street|bridge[-_]|tunnel[-_]|road[-_]|aeroway/,
    color: PALETTE.road,
  },
  // 市街地は汎用の landuse ルールより前に評価する
  {
    test: /landuse[-_](residential|suburb|commercial|industrial|retail)/,
    color: PALETTE.urban,
  },
  { test: /landuse|landcover/, color: PALETTE.landSubtle },
  { test: /^background$/, color: PALETTE.land },
]

/** レイヤー種別ごとの「色を持つ paint プロパティ名」 */
function colorPropertyFor(layerType: string): string | null {
  switch (layerType) {
    case 'background':
      return 'background-color'
    case 'fill':
      return 'fill-color'
    case 'line':
      return 'line-color'
    case 'fill-extrusion':
      return 'fill-extrusion-color'
    default:
      return null
  }
}

/** テーマ適用前の状態を退避しておくためのスナップショット */
export interface ThemeSnapshot {
  /** 変更した paint プロパティの元の値 */
  paints: Map<string, { property: string; value: unknown }>
  /** テーマ適用時に追加したレイヤーの ID */
  addedLayerIds: string[]
}

/** 元の値を退避してから paint プロパティを設定する */
function setPaint(
  map: MapLibreMap,
  layerId: string,
  property: string,
  value: unknown,
  snapshot: ThemeSnapshot,
  snapshotKey = `${layerId}::${property}`,
): void {
  snapshot.paints.set(snapshotKey, {
    property,
    value: map.getPaintProperty(layerId, property),
  })
  map.setPaintProperty(layerId, property, value)
}

/**
 * 山地の緑を、一般的な地図アプリに近い見え方へ強調する。
 *
 * OpenFreeMap には森林・農地のデータ（landcover レイヤーの
 * class=wood / farmland）が入っているが、既定のスタイルでは
 * - 森林の不透明度が非常に低い（bright=0.1 / liberty=0.4）
 * - 農地を描くレイヤーがそもそも存在しない（3スタイルとも）
 * ため、山間部がほとんど白いままになる。
 * 森林を濃くし、農地レイヤーを追加して「山の緑」を出す。
 */
function emphasizeLandcover(map: MapLibreMap, snapshot: ThemeSnapshot): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  // 森林レイヤー（bright はハイフン、liberty/positron はアンダースコア）
  const woodLayer = layers.find((l) => /^landcover[-_]wood$/.test(l.id))
  if (woodLayer) {
    setPaint(map, woodLayer.id, 'fill-opacity', WOOD_OPACITY, snapshot)
  }

  // 草地・公園も既定の不透明度が低く色が飛ぶため底上げする。
  // ズームで変化する式が入っている場合は数値比較できないので、
  // 数値で指定されていて十分濃いときだけそのまま残す。
  for (const layer of layers) {
    if (!/^park$|^landcover[-_]grass/.test(layer.id)) continue

    const current = map.getPaintProperty(layer.id, 'fill-opacity')
    if (typeof current === 'number' && current >= GREEN_MIN_OPACITY) continue

    setPaint(map, layer.id, 'fill-opacity', GREEN_MIN_OPACITY, snapshot)
  }

  // 農地レイヤーを追加する。データ(class=farmland)は存在するのに
  // どのスタイルも描画していないため、自前で足す。
  if (!map.getLayer(FARMLAND_LAYER_ID) && map.getSource('openmaptiles')) {
    // 道路やラベルより下に入れる。森林レイヤーの直前が最も自然。
    const beforeId =
      woodLayer?.id ??
      layers.find((l) => /^water/.test(l.id))?.id ??
      layers.find((l) => l.type === 'symbol')?.id

    // 適切な挿入位置が見つからない場合は、道路の上に乗ってしまうので追加しない
    if (beforeId) {
      map.addLayer(
        {
          id: FARMLAND_LAYER_ID,
          type: 'fill',
          source: 'openmaptiles',
          'source-layer': 'landcover',
          filter: ['==', ['get', 'class'], 'farmland'],
          paint: {
            'fill-color': PALETTE.farmland,
            'fill-opacity': 0.85,
          },
        },
        beforeId,
      )
      snapshot.addedLayerIds.push(FARMLAND_LAYER_ID)
    }
  }
}

/**
 * ラベルの視認性を上げる。
 *
 * OpenFreeMap 既定では POI と道路名の文字色が #666 と薄く、
 * さらに道路名は text-halo-color が未指定で白フチが付かないため、
 * 道路の上に重なると読みにくい。文字を濃くし、白フチを付ける。
 * 町名・都市名は元から #333 / #000 なので触らない。
 */
function strengthenLabelContrast(
  map: MapLibreMap,
  snapshot: ThemeSnapshot,
): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    if (layer.type !== 'symbol') continue
    if (!/^poi|highway[-_]name/.test(layer.id)) continue

    setPaint(map, layer.id, 'text-color', LABEL_TEXT, snapshot)
    setPaint(map, layer.id, 'text-halo-color', LABEL_HALO, snapshot)
    setPaint(map, layer.id, 'text-halo-width', 1.2, snapshot)
  }
}

/**
 * Google マップ風の配色を適用し、元の状態を復元するための
 * スナップショットを返す。
 */
export function applyGoogleLikeTheme(map: MapLibreMap): ThemeSnapshot {
  const snapshot: ThemeSnapshot = { paints: new Map(), addedLayerIds: [] }
  const layers = map.getStyle()?.layers
  if (!layers) return snapshot

  for (const layer of layers) {
    const property = colorPropertyFor(layer.type)
    if (!property) continue

    const rule = RULES.find((r) => r.test.test(layer.id))
    if (!rule) continue

    setPaint(map, layer.id, property, rule.color, snapshot)

    // 建物は塗りだけだと輪郭が潰れるので、うっすら枠線を足す
    if (layer.type === 'fill' && /^building/.test(layer.id)) {
      setPaint(map, layer.id, 'fill-outline-color', BUILDING_OUTLINE, snapshot)
    }
  }

  // 山地の緑（森林・農地）を強調する
  emphasizeLandcover(map, snapshot)

  // POI・道路名ラベルの視認性を上げる
  strengthenLabelContrast(map, snapshot)

  return snapshot
}

/** applyGoogleLikeTheme で退避した元の状態へ戻す */
export function restoreTheme(map: MapLibreMap, snapshot: ThemeSnapshot): void {
  // 追加したレイヤーを取り除く
  for (const layerId of snapshot.addedLayerIds) {
    if (map.getLayer(layerId)) map.removeLayer(layerId)
  }

  // paint プロパティを元に戻す
  for (const [key, { property, value }] of snapshot.paints) {
    const layerId = key.slice(0, key.lastIndexOf('::'))
    if (!map.getLayer(layerId)) continue
    map.setPaintProperty(layerId, property, value)
  }
}
