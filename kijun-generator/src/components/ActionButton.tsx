import { ReactNode } from 'react';
export default function ActionButton({ children, onClick, variant='primary' }: { children: ReactNode; onClick: () => void; variant?: 'primary'|'secondary'|'danger'|'success'|'purple' }) { return <button className={`action ${variant}`} onClick={onClick}>{children}</button>; }
