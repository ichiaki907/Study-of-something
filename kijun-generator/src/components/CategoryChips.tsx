export default function CategoryChips({ categories, selected, onSelect }: { categories:string[]; selected:string; onSelect:(category:string)=>void }) {
  return <div className="chips">{categories.map((c)=><button key={c} className={`chip ${selected===c?'selected':''}`} onClick={()=>onSelect(c)}>{c}</button>)}</div>;
}
