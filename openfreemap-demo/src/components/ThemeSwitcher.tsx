import { COLOR_THEMES } from '../map/colorThemes'
import type { ColorThemeKey } from '../types'

interface ThemeSwitcherProps {
  value: ColorThemeKey
  onChange: (theme: ColorThemeKey) => void
}

/** 配色テーマ（デフォルト / Google風）の切り替え UI */
export function ThemeSwitcher({ value, onChange }: ThemeSwitcherProps) {
  return (
    <div className="theme-switcher" role="radiogroup" aria-label="配色テーマ">
      {(Object.keys(COLOR_THEMES) as ColorThemeKey[]).map((key) => {
        const theme = COLOR_THEMES[key]
        const active = key === value
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            className={`map-toggle${active ? ' is-active' : ''}`}
            onClick={() => onChange(key)}
            title={theme.note}
          >
            {theme.label}
          </button>
        )
      })}
    </div>
  )
}
