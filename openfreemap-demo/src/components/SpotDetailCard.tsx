import { CATEGORY_STYLE } from '../map/categoryStyle'
import {
  googleMapsDirectionsUrl,
  googleMapsUrlByCoords,
} from '../lib/googleMapsLink'
import type { Spot } from '../types'

interface SpotDetailCardProps {
  spot: Spot
  onClose: () => void
}

/**
 * マーカータップ時に表示するスポット詳細カード。
 *
 * 「詳細」は Google マップへの遷移で代替している。
 * Maps URLs は API キー不要のただの URL なので、
 * 「地図は OpenFreeMap、詳細情報は Google マップ」という
 * ハイブリッド構成が成立するかの確認を兼ねている。
 */
export function SpotDetailCard({ spot, onClose }: SpotDetailCardProps) {
  const style = CATEGORY_STYLE[spot.category]

  return (
    <div className="spot-card" role="dialog" aria-label={spot.name}>
      <button
        type="button"
        className="spot-card__close"
        onClick={onClose}
        aria-label="閉じる"
      >
        ×
      </button>
      <div className="spot-card__category" style={{ color: style.color }}>
        <span aria-hidden="true">{style.icon}</span> {style.label}
      </div>
      <h2 className="spot-card__name">{spot.name}</h2>
      {spot.description && (
        <p className="spot-card__description">{spot.description}</p>
      )}

      <div className="spot-card__actions">
        <a
          className="spot-card__detail-button"
          href={googleMapsUrlByCoords(spot.latitude, spot.longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Googleマップで開く
        </a>
        <a
          className="spot-card__sub-button"
          href={googleMapsDirectionsUrl(spot.latitude, spot.longitude)}
          target="_blank"
          rel="noopener noreferrer"
        >
          経路案内
        </a>
      </div>

      <p className="spot-card__notice">
        ※ この仮スポットは架空のため、Googleマップでは座標の位置が開きます。
      </p>
    </div>
  )
}
