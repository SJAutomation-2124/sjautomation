import Link from 'next/link';
import { redirect } from 'next/navigation';
import { formatDate } from '@/lib/inquiry';
import { fileExt, formatBytes } from '@/lib/site-files';
import { createAdminClient } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/supabase-server';
import AdminHeader from '../AdminHeader';
import ConfirmDelete from '../ConfirmDelete';
import { deleteArchiveFile } from '../content-actions';
import ArchiveForm from './ArchiveForm';

export const dynamic = 'force-dynamic';

export default async function AdminArchivePage() {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');
  const db = createAdminClient();
  const { data, error } = db
    ? await db.from('archive_files').select('id, created_at, title, category, file_name, file_size, downloads').order('created_at', { ascending: false })
    : { data: null, error: true };
  const rows = data ?? [];

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <AdminHeader email={user.email} active="archive" title="자료실 관리" />

          {error && (
            <p className="card" style={{ padding: 20, color: '#c0392b' }}>
              자료실 표를 읽지 못했습니다. Supabase에 003_notice_archive.sql을 실행했는지 확인해 주세요.
            </p>
          )}

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 12px' }}>자료 올리기</h2>
          <ArchiveForm />

          <h2 style={{ fontSize: 18, fontWeight: 600, margin: '40px 0 12px' }}>등록된 자료 {rows.length}개</h2>
          <div className="card" style={{ padding: '4px 20px' }}>
            {rows.length === 0 ? (
              <p style={{ padding: '28px 0', textAlign: 'center', color: 'var(--faint)', margin: 0 }}>아직 올린 자료가 없습니다.</p>
            ) : (
              rows.map((r) => (
                <div
                  key={r.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 0', borderBottom: '1px solid var(--line-soft)', flexWrap: 'wrap' }}
                >
                  <span className="badge badge-muted">{r.category}</span>
                  <span style={{ flex: '1 1 240px', minWidth: 0, fontSize: 15, wordBreak: 'break-word' }}>
                    {r.title}
                    <span style={{ display: 'block', fontSize: 12, color: 'var(--faint)' }}>{r.file_name}</span>
                  </span>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
                    {fileExt(r.file_name)} · {formatBytes(r.file_size)} · {formatDate(r.created_at)} · 받음 {r.downloads}
                  </span>
                  <span style={{ display: 'flex', gap: 14, fontSize: 13 }}>
                    <Link href={`/archive/download/${r.id}`}>받기</Link>
                    <ConfirmDelete id={r.id} message={`"${r.title}" 자료를 삭제할까요? 파일도 함께 지워집니다.`} action={deleteArchiveFile} />
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
