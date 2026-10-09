import { notFound, redirect } from 'next/navigation';
import { UUID } from '@/lib/admin-db';
import { createAdminClient } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/supabase-server';
import AdminHeader from '../../AdminHeader';
import NoticeForm from '../NoticeForm';

export const dynamic = 'force-dynamic';

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const db = createAdminClient();
  const { data } = db
    ? await db.from('notices').select('id, title, body, pinned, attachment_name, attachment_size').eq('id', id).maybeSingle()
    : { data: null };
  if (!data) notFound();

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <AdminHeader email={user.email} active="notices" title="공지 수정" />
          <NoticeForm initial={data} />
        </div>
      </section>
    </main>
  );
}
