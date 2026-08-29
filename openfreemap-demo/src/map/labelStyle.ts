import type { MapLibreMap } from 'maplibre-gl'

/**
 * OpenFreeMap（OpenMapTiles スキーマ）の見た目を日本向けに調整するヘルパー。
 *
 * 地図の「粒度」に関する調整はこのファイルに集約しているので、
 * ラベルや POI の出し方を変えたい場合はここだけを見ればよい。
 */

/**
 * ラベルを日本語優先にするための text-field 式。
 * `name:ja` があればそれを、無ければ既定の `name`（国内なら日本語）を使う。
 */
const JA_TEXT_FIELD = ['coalesce', ['get', 'name:ja'], ['get', 'name']]

/**
 * ラベルを日本語のみに揃える。
 *
 * OpenMapTiles 系スタイルの既定では text-field が
 * `{name:latin}\n{name:nonlatin}` 相当になっており、日本国内を表示すると
 * 「Osaka Sta. JR Expressway Bus Terminal」と「大阪駅高速バスターミナル」の
 * ように英語と日本語が2行で併記され、ラベルが非常に大きく煩雑になる。
 * 一般的な地図アプリの見た目に近づけるため、日本語のみに統一する。
 */
export function localizeLabelsToJa(map: MapLibreMap): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    if (layer.type !== 'symbol') continue

    const textField = layer.layout?.['text-field']
    if (textField === undefined) continue

    // 国道番号などラベルに name を使っていないレイヤー（ref 等）は触らない。
    // ここを条件なしで上書きすると道路番号の盾表示が壊れる。
    if (!JSON.stringify(textField).includes('name')) continue

    map.setLayoutProperty(layer.id, 'text-field', JA_TEXT_FIELD)
  }
}

/**
 * POI（店舗・バス停などの細かい地点）レイヤーの表示を切り替える。
 *
 * OpenFreeMap の既定はバス停や小さな施設まで出るため情報量が多い。
 * 保存スポット主体のアプリでは独自マーカーが埋もれるので、
 * 既定では隠し、比較検証用にトグルで戻せるようにしている。
 */
export function setPoiVisibility(map: MapLibreMap, visible: boolean): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    // 先頭一致にしているのは、部分一致（/poi/）にすると
    // "water_name_point_label" の "point" にも誤マッチし、
    // 水域名ラベルまで消えてしまうため。
    // 実際の POI レイヤーは liberty / bright で
    // poi_r20 / poi_r7 / poi_r1 / poi_transit の4つ
    // （positron は元々 POI を持たない）。
    if (!/^poi/i.test(layer.id)) continue
    map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none')
  }
}

/**
 * POI レイヤーの minzoom を下げて、初期表示の縮尺でも施設が見えるようにする。
 *
 * OpenFreeMap 既定では poi_r1=z15 / poi_r7=z16 / poi_r20=z17 から表示され、
 * 初期表示の z14 ではバス停(poi_transit)しか出ない。
 * 施設のカバレッジを確認しづらいので、重要度の高いものを1段階早く出す。
 * （OpenMapTiles の poi データ自体が z14 以上にしか無いため、
 *   これ以上下げても表示は増えない）
 */
export function lowerPoiMinzoom(map: MapLibreMap): void {
  const adjustments: Record<string, number> = {
    poi_r1: 14,
    poi_r7: 15,
    poi_r20: 16,
  }
  for (const [layerId, minzoom] of Object.entries(adjustments)) {
    const layer = map.getLayer(layerId)
    if (!layer) continue
    map.setLayerZoomRange(layerId, minzoom, 24)
  }
}
