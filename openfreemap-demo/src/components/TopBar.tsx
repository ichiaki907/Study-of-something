import { StyleSwitcher } from './StyleSwitcher'
import type { MapStyleKey } from '../types'

interface TopBarProps {
  spotCount: number
  styleKey: MapStyleKey
  onChangeStyle: (style: MapStyleKey) => void
  showPoi: boolean
  onTogglePoi: (showPoi: boolean) => void
}

/** 画面上部の簡易アプリ UI（保存スポット件数・地図スタイル切り替え・POI 表示切り替え） */
export function TopBar({
  spotCount,
  styleKey,
  onChangeStyle,
  showPoi,
  onTogglePoi,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__title">
        <strong>OpenFreeMap Demo</strong>
        <span className="top-bar__count">保存スポット {spotCount}件</span>
        <button
          type="button"
          className={`poi-toggle${showPoi ? ' is-active' : ''}`}
          aria-pressed={showPoi}
          onClick={() => onTogglePoi(!showPoi)}
          title="背景地図の店舗・バス停などの表示を切り替えます"
        >
          POI {showPoi ? 'ON' : 'OFF'}
        </button>
      </div>
      <StyleSwitcher value={styleKey} onChange={onChangeStyle} />
    </header>
  )
}
