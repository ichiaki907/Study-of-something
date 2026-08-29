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
