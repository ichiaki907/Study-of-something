import type { MapStyleKey } from '../types'

/**
 * OpenFreeMap が公開しているホスト型スタイル。
 *
 * OpenFreeMap は Google Cloud Storage 上でベクトルタイルとスタイルを
 * 無料・無制限（要フェアユース）で配信しており、自前でタイルサーバーや
 * PMTiles を用意しなくてもこの URL をそのまま MapLibre の `style` に
 * 渡すだけで表示できる。
 *
 * 参考: https://openfreemap.org/quick_start/
 *
 * 将来的にタイル配信を PMTiles + Cloudflare R2 などへ移行する場合は、
 * このファイルの URL だけを差し替えれば良いように、地図スタイルに
 * 関する定義をここへ集約している。
 */
export const MAP_STYLES: Record<
  MapStyleKey,
  { label: string; url: string; note: string }
> = {
  liberty: {
    label: 'Liberty',
    url: 'https://tiles.openfreemap.org/styles/liberty',
    note: '情報量多め・一般的な地図アプリに近い見た目',
  },
  positron: {
    label: 'Positron',
    url: 'https://tiles.openfreemap.org/styles/positron',
    note: '淡色・シンプル。データ可視化やオーバーレイ向き',
  },
  bright: {
    label: 'Bright',
    url: 'https://tiles.openfreemap.org/styles/bright',
    note: '発色が強め・視認性重視',
  },
}

export const DEFAULT_MAP_STYLE: MapStyleKey = 'liberty'
