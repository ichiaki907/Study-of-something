import ActionButton from './ActionButton';
import Card from './Card';
export default function ListItemCard({ id, category, text, actionLabel, onAction }: { id:number; category:string; text:string; actionLabel:string; onAction:()=>void }) {
  return <Card><div className="list-meta"><strong>{String(id).padStart(3,'0')}</strong><span>{category}</span></div><p>{text}</p><ActionButton onClick={onAction} variant="secondary">{actionLabel}</ActionButton></Card>;
}
