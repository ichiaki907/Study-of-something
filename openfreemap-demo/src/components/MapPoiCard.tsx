import {
  googleMapsDirectionsUrl,
  googleMapsUrlByNameNear,
} from '../lib/googleMapsLink'
import { poiDisplayFor } from '../map/poiQuery'
import type { MapPoi } from '../types'

interface MapPoiCardProps {
  poi: MapPoi
  onClose: () => void
}

/**
 * 背景地図（OpenStreetMap 由来）の施設をタップしたときに出すカード。
 *
 * OSM から取れるのは名前・種別・位置だけなので、営業時間や口コミなどの
 * 詳細は Google マップへ委ねる構成にしている。
 */
export function MapPoiCard({ poi, onClose }: MapPoiCardProps) {
  const display = poiDisplayFor(poi.poiClass)

  return (
    <div
      className="spot-card spot-card--osm"
      role="dialog"
      aria-label={poi.name}
    >
      <button
        type="button"
        className="spot-card__close"
        onClick={onClose}
        aria-label="閉じる"
      >
        ×
      </button>

      <div className="spot-card__source">地図上の施設（OpenStreetMap）</div>
      <h2 className="spot-card__name">{poi.name}</h2>

      <div className="spot-card__category" style={{ color: display.color }}>
        <span aria-hidden="true">{display.icon}</span> {display.label}
        <span className="spot-card__raw">
          {poi.subclass ? `${poi.poiClass} / ${poi.subclass}` : poi.poiClass}
        </span>
      </div>

      <div className="spot-card__actions">
        <a
          className="spot-card__detail-button"
          href={googleMapsUrlByNameNear(poi.name, poi.latitude, poi.longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleマップで詳細
        </a>
        <a
          className="spot-card__sub-button"
          href={googleMapsDirectionsUrl(poi.latitude, poi.longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          経路案内
        </a>
      </div>

      <p className="spot-card__notice">
        ※ OSM から取得できるのは名前・種別・位置のみです。営業時間・電話番号・
        評価などは「Googleマップで詳細」から確認する構成にしています。
      </p>
    </div>
  )
}
