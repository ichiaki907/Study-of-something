import { MAP_STYLES } from '../map/mapStyles'
import type { MapStyleKey } from '../types'

interface StyleSwitcherProps {
  value: MapStyleKey
  onChange: (style: MapStyleKey) => void
}

/** OpenFreeMap の Liberty / Positron / Bright を切り替えるボタン群 */
export function StyleSwitcher({ value, onChange }: StyleSwitcherProps) {
  return (
    <div className="style-switcher" role="radiogroup" aria-label="地図スタイル">
      {(Object.keys(MAP_STYLES) as MapStyleKey[]).map((key) => {
        const style = MAP_STYLES[key]
        const active = key === value
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            className={`style-switcher__item${active ? ' is-active' : ''}`}
            onClick={() => onChange(key)}
            title={style.note}
          >
            {style.label}
          </button>
        )
      })}
    </div>
  )
}
