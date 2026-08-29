import { StyleSwitcher } from './StyleSwitcher'
import type { MapStyleKey } from '../types'

interface TopBarProps {
  spotCount: number
  styleKey: MapStyleKey
  onChangeStyle: (style: MapStyleKey) => void
  showPoi: boolean
  onTogglePoi: (showPoi: boolean) => void
  googleTheme: boolean
  onToggleGoogleTheme: (googleTheme: boolean) => void
}

/**
 * 画面上部の簡易アプリ UI。
 * 保存スポット件数・地図スタイル切り替えに加え、
 * 検証用のトグル（配色・施設表示）を並べている。
 */
export function TopBar({
  spotCount,
  styleKey,
  onChangeStyle,
  showPoi,
  onTogglePoi,
  googleTheme,
  onToggleGoogleTheme,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__title">
        <strong>OpenFreeMap Demo</strong>
        <span className="top-bar__count">保存スポット {spotCount}件</span>
      </div>

      <StyleSwitcher value={styleKey} onChange={onChangeStyle} />

      <div className="top-bar__toggles">
        <button
          type="button"
          className={`map-toggle${googleTheme ? ' is-active' : ''}`}
          aria-pressed={googleTheme}
          onClick={() => onToggleGoogleTheme(!googleTheme)}
          title="一般的な地図アプリに近いニュートラルな配色に切り替えます"
        >
          Google風カラー
        </button>
        <button
          type="button"
          className={`map-toggle${showPoi ? ' is-active' : ''}`}
          aria-pressed={showPoi}
          onClick={() => onTogglePoi(!showPoi)}
          title="背景地図の店舗・施設・バス停などの表示を切り替えます"
        >
          施設表示
        </button>
      </div>
    </header>
  )
}
