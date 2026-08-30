import type { MapGeoJSONFeature, MapLibreMap, PointLike } from 'maplibre-gl'
import type { MapPoi } from '../types'

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
 * 駅を選択できるようにするため poi_transit（駅・バス停・空港）も含める。
 */
export function collectPoiLayerIds(map: MapLibreMap): string[] {
  const layers = map.getStyle()?.layers
  if (!layers) return []
  return layers.filter((layer) => /^poi/i.test(layer.id)).map((l) => l.id)
}

/** 施設カードに表示する分類（保存スポットのカテゴリとは独立） */
export interface PoiDisplay {
  label: string
  color: string
  icon: string
}

const TRANSIT: PoiDisplay = { label: '交通', color: '#1a73e8', icon: '🚉' }
const CAFE: PoiDisplay = { label: 'カフェ', color: '#b5651d', icon: '☕' }
const FOOD: PoiDisplay = { label: '飲食店', color: '#e0542b', icon: '🍴' }
const SHOP: PoiDisplay = { label: '店舗', color: '#7a3fb5', icon: '🛍️' }
const LODGING: PoiDisplay = { label: '宿泊', color: '#2b6fe0', icon: '🛏️' }
const SIGHTS: PoiDisplay = { label: '観光・文化', color: '#2f8f4e', icon: '⛩️' }
const PUBLIC: PoiDisplay = { label: '公共・その他', color: '#5f6368', icon: '📍' }

/**
 * OpenMapTiles の poi.class を表示用の分類へ対応付ける。
 *
 * class は「該当する上位クラスが無い場合 subclass と同じ値になる」仕様のため、
 * restaurant / museum / pharmacy のように class 一覧に無い値も現れる。
 * 対応表に無いものは「公共・その他」として扱い、
 * 元の class / subclass はカード上に併記して判別できるようにしている。
 */
const CLASS_TO_DISPLAY: Record<string, PoiDisplay> = {
  // 交通（駅・バス停・空港など）
  railway: TRANSIT,
  bus: TRANSIT,
  aerialway: TRANSIT,
  entrance: TRANSIT,
  airport: TRANSIT,
  // 飲食
  cafe: CAFE,
  ice_cream: CAFE,
  restaurant: FOOD,
  fast_food: FOOD,
  bar: FOOD,
  beer: FOOD,
  // 物販
  shop: SHOP,
  clothing_store: SHOP,
  grocery: SHOP,
  alcohol_shop: SHOP,
  music: SHOP,
  car: SHOP,
  // 宿泊
  lodging: LODGING,
  // 観光・文化
  attraction: SIGHTS,
  art_gallery: SIGHTS,
  castle: SIGHTS,
  zoo: SIGHTS,
  stadium: SIGHTS,
  park: SIGHTS,
  museum: SIGHTS,
  library: SIGHTS,
}

export function poiDisplayFor(poiClass: string): PoiDisplay {
  return CLASS_TO_DISPLAY[poiClass] ?? PUBLIC
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
