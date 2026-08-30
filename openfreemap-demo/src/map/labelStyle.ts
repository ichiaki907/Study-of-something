import type { FilterSpecification, MapLibreMap } from 'maplibre-gl'

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

/**
 * 斜体（Italic）のラベルを立体（Regular）に直す。
 *
 * OpenFreeMap のスタイルは POI・水域名・その他ラベルに
 * `Noto Sans Italic` を指定している。欧文の地図では水域名などを
 * 斜体にするのが慣習だが、日本語の組版に斜体は使わないため、
 * 全角文字が機械的に傾いて不自然な見た目になる。
 *
 * `Noto Sans Italic` → `Noto Sans Regular` のように Italic の部分だけを
 * Regular へ置き換える。置き換え先はスタイル内の他レイヤーが既に
 * 使っているフォントスタックなので、グリフサーバー側にも必ず存在する。
 *
 * ※ 関数名を use で始めると React が Hook と誤認するため避けている。
 */
export function makeLabelFontsUpright(map: MapLibreMap): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  for (const layer of layers) {
    if (layer.type !== 'symbol') continue

    const font = layer.layout?.['text-font']
    if (!Array.isArray(font)) continue

    const hasItalic = font.some(
      (name) => typeof name === 'string' && /italic/i.test(name),
    )
    if (!hasItalic) continue

    map.setLayoutProperty(
      layer.id,
      'text-font',
      font.map((name) =>
        typeof name === 'string' ? name.replace(/Italic/gi, 'Regular') : name,
      ),
    )
  }
}

/** バス停専用レイヤーの ID。/^poi/ に一致させて施設表示トグル・タップ対象に含める */
const BUS_LAYER_ID = 'poi-bus-highzoom'

/**
 * バス停をかなり拡大したときだけ出す最小ズーム。
 * z17 は建物が見える程度の縮尺で、街を俯瞰しているときには出てこない。
 */
const BUS_MIN_ZOOM = 17

/**
 * バス停を駅・空港から分離し、名称を消してアイコンだけを高ズームで出す。
 *
 * OpenFreeMap の `poi_transit` は airport / bus / rail をまとめて描いており、
 * バス停は数が多いため、縮尺を引いた状態では名称だけで画面が埋まってしまう。
 * 一方で駅は残したいので、レイヤーを分けて扱う。
 *
 * - 元の `poi_transit` は airport / rail のみに絞る（駅はこれまで通り）
 * - バス停は複製したレイヤーで描き、名称(text-field)を外し minzoom を上げる
 *
 * 見た目（アイコン画像・サイズ等）を元のレイヤーからそのまま引き継ぎたいので、
 * 定義を手で書き写さず実行時に複製している。スタイルごとの差異にも追従できる。
 */
export function separateBusStops(map: MapLibreMap): void {
  const layers = map.getStyle()?.layers
  if (!layers) return

  const transit = layers.find((layer) => layer.id === 'poi_transit')
  if (!transit || transit.type !== 'symbol') return
  // スタイル再読み込み以外で二重に追加されないようにする
  if (map.getLayer(BUS_LAYER_ID)) return

  // バス停専用のレイヤーを複製して追加する（名称なし・高ズームのみ）
  const busLayer = structuredClone(transit) as typeof transit & {
    id: string
    minzoom?: number
    filter?: unknown
    layout?: Record<string, unknown>
  }
  busLayer.id = BUS_LAYER_ID
  busLayer.filter = ['==', ['get', 'class'], 'bus']
  busLayer.minzoom = BUS_MIN_ZOOM
  // 名称は表示しない（アイコンのみ）
  if (busLayer.layout) delete busLayer.layout['text-field']
  map.addLayer(busLayer, 'poi_transit')

  // 既存のすべての POI レイヤーからバスを除外する。
  //
  // poi_transit だけを対象にしても消えない点に注意。
  // poi_r1 / poi_r7 / poi_r20 は rank でしか絞っておらず class 指定が無いため、
  // バス停はこれらのレイヤーにも含まれて名称付きで描画される。
  for (const layer of layers) {
    if (!/^poi/i.test(layer.id)) continue
    if (layer.id === BUS_LAYER_ID) continue

    const current = map.getFilter(layer.id)
    const excludeBus = ['!=', ['get', 'class'], 'bus']
    // getFilter が返す型はレガシー形式と式形式の広い union になっており、
    // 'all' で合成すると型を絞り込めないためキャストしている
    const next = (
      current ? ['all', current, excludeBus] : excludeBus
    ) as FilterSpecification
    map.setFilter(layer.id, next)
  }
}
