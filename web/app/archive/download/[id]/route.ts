import { NextResponse } from 'next/server';
import { SITE_FILES_BUCKET, withDownloadName } from '@/lib/site-files';
import { createAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// 자료실 "받기": 내려받기 수를 올리고, 60초짜리 서명 링크로 보냅니다(저장소 자체는 비공개).
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = createAdminClient();
  if (!db || !/^[0-9a-f-]{36}$/.test(id)) return new NextResponse('Not found', { status: 404 });
  const { data } = await db.from('archive_files').select('file_path, file_name').eq('id', id).maybeSingle();
  if (!data) return new NextResponse('Not found', { status: 404 });
  await db.rpc('bump_archive_downloads', { fid: id });
  const { data: signed } = await db.storage.from(SITE_FILES_BUCKET).createSignedUrl(data.file_path, 60);
  if (!signed?.signedUrl) return new NextResponse('File unavailable', { status: 503 });
  return NextResponse.redirect(withDownloadName(signed.signedUrl, data.file_name), 302);
}
