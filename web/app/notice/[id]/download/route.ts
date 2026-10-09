import { NextResponse } from 'next/server';
import { SITE_FILES_BUCKET, withDownloadName } from '@/lib/site-files';
import { createAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// 공지 첨부 내려받기: 60초짜리 서명 링크로 보냅니다.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = createAdminClient();
  if (!db || !/^[0-9a-f-]{36}$/.test(id)) return new NextResponse('Not found', { status: 404 });
  const { data } = await db.from('notices').select('attachment_path, attachment_name').eq('id', id).maybeSingle();
  if (!data?.attachment_path) return new NextResponse('Not found', { status: 404 });
  const { data: signed } = await db.storage.from(SITE_FILES_BUCKET).createSignedUrl(data.attachment_path, 60);
  if (!signed?.signedUrl) return new NextResponse('File unavailable', { status: 503 });
  return NextResponse.redirect(withDownloadName(signed.signedUrl, data.attachment_name), 302);
}
