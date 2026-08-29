import {
  googleMapsDirectionsUrl,
  googleMapsUrlByName,
} from '../lib/googleMapsLink'
import { CATEGORY_STYLE } from '../map/categoryStyle'
import { categoryForPoiClass } from '../map/poiQuery'
import type { MapPoi } from '../types'

interface MapPoiCardProps {
  poi: MapPoi
  /** すでに保存済みかどうか */
  saved: boolean
  onSave: (poi: MapPoi) => void
  onClose: () => void
}

/**
 * 背景地図（OpenStreetMap 由来）の施設をタップしたときに出すカード。
 *
 * 保存スポットのカードとは意図的に見た目を分けている。
 * OSM から取れるのは名前・種別・位置だけで、営業時間や評価などは
 * 含まれない点がこのデモで確認したいポイントのため、それを明示する。
 */
export function MapPoiCard({ poi, saved, onSave, onClose }: MapPoiCardProps) {
  const category = categoryForPoiClass(poi.poiClass)
  const style = CATEGORY_STYLE[category]

  return (
    <div className="spot-card spot-card--osm" role="dialog" aria-label={poi.name}>
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

      <div className="spot-card__category" style={{ color: style.color }}>
        <span aria-hidden="true">{style.icon}</span> {style.label}
        <span className="spot-card__raw">
          {poi.subclass ? `${poi.poiClass} / ${poi.subclass}` : poi.poiClass}
        </span>
      </div>

      <div className="spot-card__actions">
        {saved ? (
          <span className="spot-card__saved">保存済みです</span>
        ) : (
          <button
            type="button"
            className="spot-card__detail-button"
            onClick={() => onSave(poi)}
          >
            保存スポットに追加
          </button>
        )}
        <a
          className="spot-card__sub-button"
          href={googleMapsUrlByName(poi.name)}
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
