import type { MapGeoJSONFeature, MapLibreMap, PointLike } from 'maplibre-gl'
import type { MapPoi, SpotCategory } from '../types'

/**
 * 背景地図（OpenFreeMap の poi レイヤー）にある施設をタップで拾うための処理。
 *
 * OpenFreeMap のタイルは OpenMapTiles スキーマなので、
 * poi レイヤーの各フィーチャは name / class / subclass / rank を持つ。
 * 営業時間・電話番号・評価などは含まれないため、
 * 取得できるのは「名前・種別・位置」までである点に注意。
 */

/**
 * タップ対象にする POI レイヤーの ID を集める。
 *
 * レイヤーIDはスタイルによって異なる（liberty/bright は
 * poi_r1 / poi_r7 / poi_r20 / poi_transit、positron は POI 自体を持たない）
 * ため実行時に集める。
 *
 * poi_transit（バス停・駅・空港）は保存スポットの対象として不自然なうえ
 * 数が多くタップの邪魔になるので、タップ対象からは除外する
 * （表示自体は「施設表示」トグルに従う）。
 */
export function collectPoiLayerIds(map: MapLibreMap): string[] {
  const layers = map.getStyle()?.layers
  if (!layers) return []
  return layers
    .filter((layer) => /^poi/i.test(layer.id) && layer.id !== 'poi_transit')
    .map((layer) => layer.id)
}

/**
 * OpenMapTiles の poi.class をこのアプリのカテゴリへ対応付ける。
 *
 * class は「該当する上位クラスが無い場合 subclass と同じ値になる」仕様のため、
 * restaurant / museum のように一覧に無いものも class として現れる。
 *
 * OpenMapTiles の class は37種あり、このアプリの5カテゴリには収まらない
 * （office / town_hall / school / hospital など）。対応表に無いものは
 * まとめて shop（表示名は「店舗・施設」）として扱い、
 * 元の class / subclass はカード上にそのまま表示して判別できるようにする。
 */
const CLASS_TO_CATEGORY: Record<string, SpotCategory> = {
  cafe: 'cafe',
  ice_cream: 'cafe',
  restaurant: 'restaurant',
  fast_food: 'restaurant',
  bar: 'restaurant',
  beer: 'restaurant',
  lodging: 'hotel',
  attraction: 'sightseeing',
  art_gallery: 'sightseeing',
  castle: 'sightseeing',
  zoo: 'sightseeing',
  stadium: 'sightseeing',
  park: 'sightseeing',
  museum: 'sightseeing',
}

export function categoryForPoiClass(poiClass: string): SpotCategory {
  return CLASS_TO_CATEGORY[poiClass] ?? 'shop'
}

/** タップ位置の許容範囲（px）。指でも押しやすいように少し広げる */
const TAP_TOLERANCE = 8

/**
 * 画面座標の周辺にある背景地図の施設を1件返す。該当が無ければ null。
 */
export function queryPoiAt(
  map: MapLibreMap,
  point: { x: number; y: number },
  layerIds: string[],
): MapPoi | null {
  if (layerIds.length === 0) return null

  // 存在しないレイヤーIDを渡すと例外になるため、実在するものだけに絞る
  const layers = layerIds.filter((id) => map.getLayer(id))
  if (layers.length === 0) return null

  const box: [PointLike, PointLike] = [
    [point.x - TAP_TOLERANCE, point.y - TAP_TOLERANCE],
    [point.x + TAP_TOLERANCE, point.y + TAP_TOLERANCE],
  ]

  const features = map.queryRenderedFeatures(box, { layers })
  for (const feature of features) {
    const poi = toMapPoi(feature)
    if (poi) return poi
  }
  return null
}

/** 名前を持つ Point フィーチャだけを MapPoi に変換する */
function toMapPoi(feature: MapGeoJSONFeature): MapPoi | null {
  if (feature.geometry?.type !== 'Point') return null

  const props = feature.properties ?? {}
  const name = typeof props.name === 'string' ? props.name.trim() : ''
  // 名前のない POI は保存しても意味がないので対象外にする
  if (!name) return null

  const [longitude, latitude] = feature.geometry.coordinates
  const poiClass = typeof props.class === 'string' ? props.class : 'shop'
  const subclass = typeof props.subclass === 'string' ? props.subclass : undefined

  return {
    id:
      feature.id !== undefined && feature.id !== null
        ? `osm-${feature.id}`
        : `pos-${longitude.toFixed(6)},${latitude.toFixed(6)}`,
    name,
    poiClass,
    subclass,
    latitude,
    longitude,
  }
}
