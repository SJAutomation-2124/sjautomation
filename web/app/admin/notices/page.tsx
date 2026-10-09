import Link from 'next/link';
import { redirect } from 'next/navigation';
import { formatDate } from '@/lib/inquiry';
import { createAdminClient } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/supabase-server';
import AdminHeader from '../AdminHeader';
import ConfirmDelete from '../ConfirmDelete';
import { deleteNotice } from '../content-actions';
import NoticeForm from './NoticeForm';

export const dynamic = 'force-dynamic';

export default async function AdminNoticesPage() {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  const db = createAdminClient();
  const { data, error } = db
    ? await db.from('notices').select('id, created_at, title, pinned, views, attachment_name').order('pinned', { ascending: false }).order('created_at', { ascending: false })
    : { data: null, error: true };
  const rows = data ?? [];

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <AdminHeader email={user.email} active="notices" title="공지사항 관리" />

          {error && (
            <p className="card" style={{ padding: 20, color: '#c0392b' }}>
              공지사항 표를 읽지 못했습니다. Supabase에 003_notice_archive.sql을 실행했는지 확인해 주세요.
            </p>
          )}

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 12px' }}>새 공지 쓰기</h2>
          <NoticeForm />

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '40px 0 12px' }}>등록된 공지 {rows.length}개</h2>
          <div className="card" style={{ padding: '4px 20px' }}>
            {rows.length === 0 ? (
              <p style={{ padding: '28px 0', textAlign: 'center', color: 'var(--faint)', margin: 0 }}>아직 등록된 공지가 없습니다.</p>
            ) : (
              rows.map((r) => (
                <div
                  key={r.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--line-soft)', flexWrap: 'wrap' }}
                >
                  {r.pinned && <span className="badge">고정</span>}
                  <span style={{ flex: '1 1 240px', minWidth: 0, fontSize: 15, wordBreak: 'break-word' }}>
                    {r.title}
                    {r.attachment_name && <span style={{ fontSize: 12, color: 'var(--faint)' }}> · 첨부 1</span>}
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
                    {formatDate(r.created_at)} · 조회 {r.views}
                  </span>
                  <span style={{ display: 'flex', gap: 14, fontSize: 13 }}>
                    <Link href={`/notice/${r.id}`} target="_blank">
                      보기
                    </Link>
                    <Link href={`/admin/notices/${r.id}`}>수정</Link>
                    <ConfirmDelete id={r.id} message={`"${r.title}" 공지를 삭제할까요? 첨부파일도 함께 지워집니다.`} action={deleteNotice} />
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
