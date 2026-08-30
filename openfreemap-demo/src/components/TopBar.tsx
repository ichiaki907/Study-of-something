import { StyleSwitcher } from './StyleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import type { ColorThemeKey, MapStyleKey } from '../types'

interface TopBarProps {
  spotCount: number
  styleKey: MapStyleKey
  onChangeStyle: (style: MapStyleKey) => void
  showPoi: boolean
  onTogglePoi: (showPoi: boolean) => void
  colorTheme: ColorThemeKey
  onChangeColorTheme: (theme: ColorThemeKey) => void
}

/**
 * 画面上部の簡易アプリ UI。
 * 保存スポット件数・地図スタイル切り替えに加え、
 * 検証用のUI（配色テーマ・施設表示）を並べている。
 */
export function TopBar({
  spotCount,
  styleKey,
  onChangeStyle,
  showPoi,
  onTogglePoi,
  colorTheme,
  onChangeColorTheme,
}: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__title">
        <strong>OpenFreeMap Demo</strong>
        <span className="top-bar__count">保存スポット {spotCount}件</span>
      </div>

      <StyleSwitcher value={styleKey} onChange={onChangeStyle} />

      <div className="top-bar__toggles">
        <ThemeSwitcher value={colorTheme} onChange={onChangeColorTheme} />
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
