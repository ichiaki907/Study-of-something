/**
 * このデモ全体で使う型定義。
 *
 * 将来的に「固定スポット → Cloudflare D1」への差し替えを想定し、
 * Spot の形は API レスポンスとしてもそのまま使えるシンプルな形にしている。
 */

/** 仮スポットのカテゴリ */
export type SpotCategory = 'cafe' | 'restaurant' | 'sightseeing' | 'hotel'

/** 仮スポット（将来的には D1 等の実データに置き換える想定） */
export interface Spot {
  id: string
  name: string
  category: SpotCategory
  latitude: number
  longitude: number
  /** 一覧・詳細カードで使う簡単な説明（仮データ） */
  description?: string
}

/** OpenFreeMap の切り替え可能なスタイル */
export type MapStyleKey = 'liberty' | 'positron' | 'bright'

/**
 * 背景地図（OpenFreeMap の poi レイヤー）から取得した施設。
 * 保存スポット(Spot)とは出所が異なるため別の型にしている。
 */
export interface MapPoi {
  /** OSM の feature id。無い場合は座標から合成する */
  id: string
  name: string
  /** OpenMapTiles の poi.class（例: cafe, restaurant, shop, lodging） */
  poiClass: string
  /** OpenMapTiles の poi.subclass（例: convenience, supermarket） */
  subclass?: string
  latitude: number
  longitude: number
}
