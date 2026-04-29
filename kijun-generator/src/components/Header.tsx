type HeaderProps = { title: string; subtitle?: string };
export default function Header({ title, subtitle }: HeaderProps) {
  return <header><h1 className="title">{title}</h1>{subtitle ? <p className="subtitle">{subtitle}</p> : null}</header>;
}
