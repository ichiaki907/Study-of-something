/**
 * Google マップへ遷移するための URL を組み立てる。
 *
 * ここで使うのは Google の「Maps URLs」という単なる URL スキームで、
 * Google Maps API / Places API とは別物。
 * **API キーも課金も不要**で、スマートフォンでは Google マップアプリが
 * 直接開く（ユニバーサルリンク）。
 *
 * この仕組みを使うと「地図表示は OpenFreeMap、営業時間や口コミなどの
 * 詳細情報は Google マップへ委ねる」というハイブリッド構成が取れる。
 */

const SEARCH_BASE = 'https://www.google.com/maps/search/?api=1'
const DIRECTIONS_BASE = 'https://www.google.com/maps/dir/?api=1'

/**
 * 緯度経度を "lat,lng" 形式にする。
 *
 * カンマは URL エンコードしない。%2C にすると Google マップ側で
 * 正しく解釈されないことがあるため（Maps URLs を扱う実装では
 * エンコード後にカンマを戻すのが定石になっている）。
 */
function toCoordQuery(latitude: number, longitude: number): string {
  return `${latitude},${longitude}`
}

/**
 * 施設名で Google マップを検索して開く URL。
 *
 * 実在する施設（OSM から取得した施設など）はこちらを使うと、
 * 営業時間・口コミ・写真などが載った店舗ページに辿り着ける。
 * 同名店舗が複数ある場合は意図した店舗にならないことがある点に注意。
 */
export function googleMapsUrlByName(name: string): string {
  return `${SEARCH_BASE}&query=${encodeURIComponent(name)}`
}

/**
 * 緯度経度で Google マップを開く URL。
 *
 * 位置は必ず正確になるが、その地点に Google 側の登録が無い場合は
 * ピンが落ちるだけになる。架空のスポットなど、名前で検索しても
 * 見つからないものはこちらを使う。
 */
export function googleMapsUrlByCoords(
  latitude: number,
  longitude: number,
): string {
  return `${SEARCH_BASE}&query=${toCoordQuery(latitude, longitude)}`
}

/** 指定地点への経路案内を Google マップで開く URL */
export function googleMapsDirectionsUrl(
  latitude: number,
  longitude: number,
): string {
  return `${DIRECTIONS_BASE}&destination=${toCoordQuery(latitude, longitude)}`
}
