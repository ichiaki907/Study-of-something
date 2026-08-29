import { StyleSwitcher } from './StyleSwitcher'
import type { MapStyleKey } from '../types'

interface TopBarProps {
  spotCount: number
  styleKey: MapStyleKey
  onChangeStyle: (style: MapStyleKey) => void
}

/** 画面上部の簡易アプリ UI（保存スポット件数・地図スタイル切り替え） */
export function TopBar({ spotCount, styleKey, onChangeStyle }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__title">
        <strong>OpenFreeMap Demo</strong>
        <span className="top-bar__count">保存スポット {spotCount}件</span>
      </div>
      <StyleSwitcher value={styleKey} onChange={onChangeStyle} />
    </header>
  )
}
