import type { Spot } from '../types'

/**
 * 仮スポットデータ（大阪駅・梅田周辺）
 *
 * ※ すべて架空のサンプルデータです。実在の店舗・施設の情報ではありません。
 *
 * 今回は API・DB を使わず、TypeScript 上の固定データとして持たせている。
 * 将来的に「実際の保存スポット」に置き換える際は、この配列を
 * API（例: Cloudflare D1 + Workers）からのレスポンスに差し替えるだけで
 * 済むように、Spot 型をそのままレスポンス形として使える形にしてある。
 */
export const SPOTS: Spot[] = [
  {
    id: '1',
    name: 'サンプルカフェ 梅田本店',
    category: 'cafe',
    latitude: 34.704,
    longitude: 135.4955,
    description: '大阪駅から徒歩圏の仮想カフェ。',
  },
  {
    id: '2',
    name: '梅田スカイテラスカフェ（仮）',
    category: 'cafe',
    latitude: 34.7051,
    longitude: 135.49,
    description: '梅田スカイビル付近を想定した仮想カフェ。',
  },
  {
    id: '3',
    name: '中崎町レトロカフェ（仮）',
    category: 'cafe',
    latitude: 34.7062,
    longitude: 135.5028,
    description: 'レトロな街並みをイメージした仮想カフェ。',
  },
  {
    id: '4',
    name: 'お好み焼き 梅田店（仮）',
    category: 'restaurant',
    latitude: 34.701,
    longitude: 135.4965,
    description: '大阪らしい仮想飲食店。',
  },
  {
    id: '5',
    name: '個室居酒屋 うめだ（仮）',
    category: 'restaurant',
    latitude: 34.7005,
    longitude: 135.498,
    description: '夜の想定利用シーンを確認するための仮想飲食店。',
  },
  {
    id: '6',
    name: '立ち食い寿司 梅田（仮）',
    category: 'restaurant',
    latitude: 34.6995,
    longitude: 135.5,
    description: '駅チカ想定の仮想飲食店。',
  },
  {
    id: '7',
    name: '梅田スカイビル展望台（仮）',
    category: 'sightseeing',
    latitude: 34.7053,
    longitude: 135.4898,
    description: '実在の展望台をイメージした仮想観光スポット。',
  },
  {
    id: '8',
    name: '太融寺（仮）',
    category: 'sightseeing',
    latitude: 34.6989,
    longitude: 135.504,
    description: '梅田近くの寺院をイメージした仮想観光スポット。',
  },
  {
    id: '9',
    name: 'ホテル梅田サンプル',
    category: 'hotel',
    latitude: 34.703,
    longitude: 135.494,
    description: '出張・旅行利用を想定した仮想ホテル。',
  },
  {
    id: '10',
    name: 'ビジネスホテル大阪駅前（仮）',
    category: 'hotel',
    latitude: 34.698,
    longitude: 135.495,
    description: '駅前立地を想定した仮想ホテル。',
  },
]
