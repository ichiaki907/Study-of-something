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
}

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

/** テーマ適用前の色を退避しておくためのスナップショット */
export type PaintSnapshot = Map<string, { property: string; value: unknown }>

/**
 * Google マップ風の配色を適用し、元の配色を復元するための
 * スナップショットを返す。
 */
export function applyGoogleLikeTheme(map: MapLibreMap): PaintSnapshot {
  const snapshot: PaintSnapshot = new Map()
  const layers = map.getStyle()?.layers
  if (!layers) return snapshot

  for (const layer of layers) {
    const property = colorPropertyFor(layer.type)
    if (!property) continue

    const rule = RULES.find((r) => r.test.test(layer.id))
    if (!rule) continue

    snapshot.set(layer.id, {
      property,
      value: map.getPaintProperty(layer.id, property),
    })
    map.setPaintProperty(layer.id, property, rule.color)

    // 建物は塗りだけだと輪郭が潰れるので、うっすら枠線を足す
    if (layer.type === 'fill' && /^building/.test(layer.id)) {
      const outlineKey = `${layer.id}::outline`
      snapshot.set(outlineKey, {
        property: 'fill-outline-color',
        value: map.getPaintProperty(layer.id, 'fill-outline-color'),
      })
      map.setPaintProperty(layer.id, 'fill-outline-color', BUILDING_OUTLINE)
    }
  }

  return snapshot
}

/** applyGoogleLikeTheme で退避した元の配色へ戻す */
export function restoreTheme(map: MapLibreMap, snapshot: PaintSnapshot): void {
  for (const [key, { property, value }] of snapshot) {
    const layerId = key.endsWith('::outline') ? key.slice(0, -9) : key
    if (!map.getLayer(layerId)) continue
    map.setPaintProperty(layerId, property, value)
  }
}
