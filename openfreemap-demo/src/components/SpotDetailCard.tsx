import { useState } from 'react'
import { CATEGORY_STYLE } from '../map/categoryStyle'
import type { Spot } from '../types'

interface SpotDetailCardProps {
  spot: Spot
  onClose: () => void
}

/**
 * マーカータップ時に表示するスポット詳細カード。
 * 「詳細を見る」は今回は仮ボタンで、実際のページ遷移は行わない。
 */
export function SpotDetailCard({ spot, onClose }: SpotDetailCardProps) {
  const [showNotice, setShowNotice] = useState(false)
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
      <button
        type="button"
        className="spot-card__detail-button"
        onClick={() => setShowNotice(true)}
      >
        詳細を見る
      </button>
      {showNotice && (
        <p className="spot-card__notice">
          ※ このデモでは詳細ページへの遷移は実装していません。
        </p>
      )}
    </div>
  )
}
