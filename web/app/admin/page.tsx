import Link from 'next/link';
import { redirect } from 'next/navigation';
import { INQUIRY_BUCKET } from '@/lib/inquiry';
import { createAdminClient } from '@/lib/supabase-admin';
import { getAdminUser } from '@/lib/supabase-server';
import { LockIcon, StatusBadge } from '../request/Board';
import { signOut } from './actions';
import { AnswerForm, DeleteButton } from './InquiryControls';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;
const fmt = (iso: string) => new Date(iso).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'medium', timeStyle: 'short' });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ page?: string; filter?: string }> }) {
  const user = await getAdminUser();
  if (!user) redirect('/admin/login');

  const sp = await searchParams;
  const page = Math.max(1, Number.parseInt(sp.page ?? '1', 10) || 1);
  const onlyNew = sp.filter === 'new';
  const db = createAdminClient();
  if (!db) return <p style={{ padding: 48 }}>SUPABASE_SECRET_KEY 환경 변수가 없습니다.</p>;

  let query = db.from('inquiries').select('*', { count: 'exact' }).order('created_at', { ascending: false });
  if (onlyNew) query = query.eq('status', 'new');
  const from = (page - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);
  const rows = data ?? [];
  const pages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));

  const { count: newCount } = await db.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new');

  // 첨부파일은 비공개 저장소에 있으므로, 이 화면을 열 때마다 1시간짜리 내려받기 링크를 새로 만듭니다.
  const paths = rows.map((r) => r.attachment_path).filter(Boolean) as string[];
  const links = new Map<string, string>();
  if (paths.length) {
    const { data: signed } = await db.storage.from(INQUIRY_BUCKET).createSignedUrls(paths, 60 * 60);
    signed?.forEach((s) => s.path && s.signedUrl && links.set(s.path, s.signedUrl));
  }

  const tab = (active: boolean) => ({
    padding: '8px 16px',
    fontSize: 14,
    border: '1px solid',
    borderColor: active ? 'var(--ink)' : 'var(--line)',
    background: active ? 'var(--ink)' : '#fff',
    color: active ? '#fff' : 'var(--ink)',
  });

  return (
    <main className="bp-grid">
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 10 }}>
                ADMIN
              </div>
              <h1 style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>견적 문의 관리</h1>
            </div>
            <form action={signOut} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--muted)' }}>
              <span>{user.email}</span>
              <button type="submit" className="btn btn-outline" style={{ height: 38, padding: '0 16px', fontSize: 13 }}>
                로그아웃
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            <Link href="/admin" style={tab(!onlyNew)}>
              전체 {onlyNew ? '' : count ?? 0}
            </Link>
            <Link href="/admin?filter=new" style={tab(onlyNew)}>
              답변 대기 {newCount ?? 0}
            </Link>
          </div>

          {rows.length === 0 && (
            <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--faint)' }}>
              {onlyNew ? '답변을 기다리는 문의가 없습니다.' : '아직 들어온 문의가 없습니다.'}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {rows.map((r) => (
              <article key={r.id} className="card">
                <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                      <StatusBadge status={r.status} />
                      {r.is_secret ? (
                        <span className="badge badge-muted" style={{ gap: 6 }}>
                          <LockIcon />
                          비밀글
                        </span>
                      ) : (
                        <span className="badge badge-muted">공개글</span>
                      )}
                      <span className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
                        {fmt(r.created_at)}
                      </span>
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0, wordBreak: 'break-word' }}>{r.title}</h2>
                  </div>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <Link href={`/request/${r.id}`} target="_blank" style={{ fontSize: 13 }}>
                      게시판에서 보기
                    </Link>
                    <DeleteButton id={r.id} title={r.title} />
                  </div>
                </header>

                <div className="grid grid-2" style={{ gap: 0, borderBottom: '1px solid var(--line-soft)' }}>
                  {[
                    ['회사명', r.company],
                    ['담당자', r.name],
                    ['연락처', <a key="p" href={`tel:${String(r.phone).replace(/[^0-9+]/g, '')}`}>{r.phone}</a>],
                    ['이메일', <a key="e" href={`mailto:${r.email}`}>{r.email}</a>],
                    ['문의 분야', (r.types as string[]).join(', ')],
                    [
                      '첨부파일',
                      r.attachment_path ? (
                        links.get(r.attachment_path) ? (
                          <a key="a" href={links.get(r.attachment_path)} target="_blank" rel="noopener">
                            {r.attachment_name ?? '내려받기'}
                          </a>
                        ) : (
                          r.attachment_name ?? '있음'
                        )
                      ) : (
                        '없음'
                      ),
                    ],
                  ].map(([k, v]) => (
                    <div key={String(k)} style={{ display: 'grid', gridTemplateColumns: '84px 1fr', padding: '10px 24px', fontSize: 14 }}>
                      <span style={{ color: 'var(--faint)' }}>{k}</span>
                      <span style={{ wordBreak: 'break-all' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '18px 24px', fontSize: 15, lineHeight: 1.85, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--body)' }}>
                  {r.message}
                </div>

                <div style={{ padding: '18px 24px 22px', background: '#f7f9fc', borderTop: '1px solid var(--line-soft)' }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 10 }}>
                    ANSWER {r.answered_at ? `· ${fmt(r.answered_at)}` : ''}
                  </div>
                  <AnswerForm id={r.id} initial={r.answer} />
                </div>
              </article>
            ))}
          </div>

          {pages > 1 && (
            <nav style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <Link key={p} href={`/admin?page=${p}${onlyNew ? '&filter=new' : ''}`} style={tab(p === page)}>
                  {p}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
