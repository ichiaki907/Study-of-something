import { ViewMode } from '../App';
type BottomNavProps = { currentView: ViewMode; onChange: (view: ViewMode) => void };
const tabs: { key: ViewMode; label: string }[] = [
  { key: 'parent', label: '親' },{ key: 'child', label: '子' },{ key: 'criteria', label: 'キジュン' },{ key: 'words', label: 'ワード' }
];
export default function BottomNav({ currentView, onChange }: BottomNavProps) {
  return <nav className="bottom-nav">{tabs.map((tab) => <button key={tab.key} className={`tab ${currentView===tab.key?'active':''}`} onClick={() => onChange(tab.key)}>{tab.label}</button>)}</nav>;
}
