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
  land: '#f5f5f3',
  landSubtle: '#eeeeec',
  green: '#c9e7c0',
  water: '#a9d3f0',
  building: '#e6e6e3',
  buildingTop: '#ededea',
  road: '#ffffff',
  roadCasing: '#e2e2df',
  motorway: '#f9d79f',
  motorwayCasing: '#efb96a',
  rail: '#d6d6d3',
  path: '#dcdcd8',
  /** 農地。森林よりわずかに明るく黄み寄りにして区別できるようにする */
  farmland: '#dfeccd',
}

/**
 * 森林(landcover class=wood)の不透明度。
 *
 * OpenFreeMap 既定は bright=0.1 / liberty=0.4 と非常に薄く、
 * 山地がほとんど白いままになる。一般的な地図アプリの「山の緑」に
 * 近づけるため濃くする。
 */
const WOOD_OPACITY = 0.5

/** 追加する農地レイヤーの ID（復元時に削除するため固定値で持つ） */
const FARMLAND_LAYER_ID = 'ofm-demo-farmland'

/** 建物にうっすら輪郭を付けて、施設の輪郭が分かるようにする */
const BUILDING_OUTLINE = '#d8d8d4'

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
  { test: /(motorway|trunk).*casing/, color: PALETTE.motorwayCasing },
  { test: /motorway/, color: PALETTE.motorway },
  { test: /casing/, color: PALETTE.roadCasing },
  // rail(way) / major_rail / transit_rail をまとめて拾う
  { test: /rail|cablecar/, color: PALETTE.rail },
  { test: /path/, color: PALETTE.path },
  {
    test: /highway|street|bridge[-_]|tunnel[-_]|road[-_]|aeroway/,
    color: PALETTE.road,
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
            'fill-opacity': 0.75,
          },
        },
        beforeId,
      )
      snapshot.addedLayerIds.push(FARMLAND_LAYER_ID)
    }
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
