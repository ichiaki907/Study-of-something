import type { CSSProperties } from 'react'
import { CATEGORY_ORDER, CATEGORY_STYLE } from '../map/categoryStyle'
import type { SpotCategory } from '../types'

export type CategoryFilterValue = SpotCategory | 'all'

interface CategoryFilterProps {
  value: CategoryFilterValue
  onChange: (value: CategoryFilterValue) => void
}

/** カテゴリ選択で表示するスポットを絞り込むフィルターチップ */
export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter" role="radiogroup" aria-label="カテゴリフィルター">
      <button
        type="button"
        role="radio"
        aria-checked={value === 'all'}
        className={`category-chip${value === 'all' ? ' is-active' : ''}`}
        onClick={() => onChange('all')}
      >
        すべて
      </button>
      {CATEGORY_ORDER.map((category) => {
        const style = CATEGORY_STYLE[category]
        const active = value === category
        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={active}
            className={`category-chip${active ? ' is-active' : ''}`}
            style={{ '--chip-color': style.color } as CSSProperties}
            onClick={() => onChange(category)}
          >
            <span aria-hidden="true">{style.icon}</span> {style.label}
          </button>
        )
      })}
    </div>
  )
}
