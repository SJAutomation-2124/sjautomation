import Link from 'next/link';
import { signOut } from './actions';

const TABS = [
  { key: 'inquiries', href: '/admin', label: '견적 문의' },
  { key: 'notices', href: '/admin/notices', label: '공지사항' },
  { key: 'archive', href: '/admin/archive', label: '자료실' },
] as const;

export default function AdminHeader({
  email,
  active,
  title,
}: {
  email: string | undefined;
  active: (typeof TABS)[number]['key'];
  title: string;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <nav aria-label="관리 메뉴" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={t.href}
              aria-current={t.key === active ? 'page' : undefined}
              style={{
                padding: '9px 18px',
                fontSize: 14,
                fontWeight: t.key === active ? 600 : 400,
                border: '1px solid',
                borderColor: t.key === active ? 'var(--accent)' : 'var(--line)',
                background: t.key === active ? 'var(--accent)' : '#fff',
                color: t.key === active ? '#fff' : 'var(--ink)',
              }}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <form action={signOut} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--muted)' }}>
          <span>{email}</span>
          <button type="submit" className="btn btn-outline" style={{ height: 38, padding: '0 16px', fontSize: 13 }}>
            로그아웃
          </button>
        </form>
      </div>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 10 }}>
        ADMIN
      </div>
      <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>{title}</h1>
    </div>
  );
}
