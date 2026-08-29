import type { SpotCategory } from '../types'

/** カテゴリごとの表示ラベル・色・簡易アイコン（絵文字）をまとめた定義 */
export const CATEGORY_STYLE: Record<
  SpotCategory,
  { label: string; color: string; icon: string }
> = {
  cafe: { label: 'カフェ', color: '#b5651d', icon: '☕' },
  restaurant: { label: '飲食店', color: '#e0542b', icon: '🍴' },
  sightseeing: { label: '観光', color: '#2f8f4e', icon: '⛩️' },
  hotel: { label: 'ホテル', color: '#2b6fe0', icon: '🛏️' },
  // OpenMapTiles の class は37種あり5カテゴリに収まらないため、
  // shop は「店舗・施設」として受け皿を兼ねている
  shop: { label: '店舗・施設', color: '#7a3fb5', icon: '🏬' },
}

export const CATEGORY_ORDER: SpotCategory[] = [
  'cafe',
  'restaurant',
  'sightseeing',
  'hotel',
  'shop',
]
