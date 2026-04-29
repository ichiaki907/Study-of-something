export default function SearchBox({ value, onChange, placeholder='検索' }: { value: string; onChange: (value:string)=>void; placeholder?: string }) {
  return <input aria-label={placeholder} className="search" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} />;
}
