export default function NoticeBanner({ text, tone = 'warning' }: { text: string; tone?: 'warning' | 'info' }) {
  return <div className={`banner ${tone}`}>{text}</div>;
}
