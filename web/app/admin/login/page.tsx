import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/supabase-server';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  if (await getAdminUser()) redirect('/admin');
  return (
    <main className="bp-grid">
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 12 }}>
            ADMIN
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}>관리자 로그인</h1>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
