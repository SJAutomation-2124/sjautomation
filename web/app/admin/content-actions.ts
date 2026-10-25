'use server';

import { revalidatePath } from 'next/cache';
import { adminDb, UUID } from '@/lib/admin-db';
import type { ActionResult } from '@/lib/inquiry';
import { COLUMN_TOPICS, MAX_POST_BODY, POST_IMAGE_BUCKET, postImagePaths, type PostType } from '@/lib/posts';
import { ARCHIVE_CATEGORY_KEYS, MAX_SITE_FILE_BYTES, SITE_FILES_BUCKET } from '@/lib/site-files';

const NEED_LOGIN = '로그인이 필요합니다. 다시 로그인해 주세요.';
const FILE_PATH = /^(notices|archive)\/\d{4}-\d{2}-\d{2}\/[0-9a-f-]{36}\.[a-z0-9]{1,10}$/;

export type UploadedFile = { path: string; name: string; size: number };

// 파일은 브라우저가 Supabase로 직접 올립니다(Vercel 요청 크기 제한 회피). 서버는 서명된 업로드 주소만 발급.
export async function createSiteUpload(
  folder: 'notices' | 'archive',
  fileName: string,
  size: number,
): Promise<ActionResult<{ path: string; token: string }>> {
  const db = await adminDb();
  if (!db) return { ok: false, error: NEED_LOGIN };
  if (!(size > 0) || size > MAX_SITE_FILE_BYTES) return { ok: false, error: '파일은 50MB까지 올릴 수 있습니다.' };
  const ext = (/\.([A-Za-z0-9]{1,10})$/.exec(fileName)?.[1] ?? 'bin').toLowerCase();
  const path = `${folder}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const { data, error } = await db.storage.from(SITE_FILES_BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false, error: '파일을 올릴 준비를 하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  return { ok: true, path: data.path, token: data.token };
}

// 본문 중간 사진: 브라우저가 줄이고 사진 정보를 지운 파일을 공개 저장소(post-images)에 바로 올립니다.
export async function createPostImageUpload(ext: 'webp' | 'jpg'): Promise<ActionResult<{ path: string; token: string }>> {
  const db = await adminDb();
  if (!db) return { ok: false, error: NEED_LOGIN };
  const path = `${new Date().toISOString().slice(0, 7)}/${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}.${ext === 'jpg' ? 'jpg' : 'webp'}`;
  const { data, error } = await db.storage.from(POST_IMAGE_BUCKET).createSignedUploadUrl(path);
  if (error || !data) return { ok: false, error: '사진을 올릴 준비를 하지 못했습니다. Supabase에 004_notice_column.sql을 실행했는지 확인해 주세요.' };
  return { ok: true, path: data.path, token: data.token };
}

const cleanFile = (f: UploadedFile | null | undefined) =>
  f && FILE_PATH.test(f.path) ? { path: f.path, name: f.name.trim().slice(0, 200) || '첨부파일', size: Math.max(0, Math.round(f.size)) } : null;

function refreshNotices(id?: string) {
  revalidatePath('/');
  revalidatePath('/notice');
  if (id) revalidatePath(`/notice/${id}`);
  revalidatePath('/admin/notices');
}

export async function saveNotice(input: {
  id?: string;
  category: PostType;
  topic: string | null;
  title: string;
  body: string;
  pinned: boolean;
  attachment?: UploadedFile | null;
  removeAttachment?: boolean;
}): Promise<ActionResult<{ id: string }>> {
  const db = await adminDb();
  if (!db) return { ok: false, error: NEED_LOGIN };
  const title = input.title.trim().slice(0, 200);
  const body = input.body.trim().slice(0, MAX_POST_BODY);
  if (!title) return { ok: false, error: '제목을 입력해 주세요.' };
  const category: PostType = input.category === 'column' ? 'column' : 'notice';
  const topic = category === 'column' ? (COLUMN_TOPICS as readonly string[]).find((t) => t === input.topic) : null;
  if (topic === undefined) return { ok: false, error: '칼럼 분류를 골라 주세요.' };
  // 맨 위 고정은 공지에만 씁니다
  const fields = { category, topic, title, body, pinned: category === 'notice' && input.pinned };
  const file = cleanFile(input.attachment);

  if (input.id) {
    if (!UUID.test(input.id)) return { ok: false, error: '잘못된 공지입니다.' };
    const { data: prev } = await db.from('notices').select('attachment_path, body').eq('id', input.id).maybeSingle();
    const replace = Boolean(file) || Boolean(input.removeAttachment);
    const { error } = await db
      .from('notices')
      .update({
        ...fields,
        updated_at: new Date().toISOString(),
        ...(replace ? { attachment_path: file?.path ?? null, attachment_name: file?.name ?? null, attachment_size: file?.size ?? null } : {}),
      })
      .eq('id', input.id);
    if (error) return { ok: false, error: '저장하지 못했습니다.' };
    if (replace && prev?.attachment_path) await db.storage.from(SITE_FILES_BUCKET).remove([prev.attachment_path]);
    // 본문에서 뺀 사진은 저장소에서도 지웁니다
    const kept = new Set(postImagePaths(body));
    const dropped = postImagePaths(prev?.body ?? '').filter((p) => !kept.has(p));
    if (dropped.length) await db.storage.from(POST_IMAGE_BUCKET).remove(dropped);
    refreshNotices(input.id);
    return { ok: true, id: input.id };
  }

  const { data, error } = await db
    .from('notices')
    .insert({ ...fields, attachment_path: file?.path ?? null, attachment_name: file?.name ?? null, attachment_size: file?.size ?? null })
    .select('id')
    .single();
  if (error || !data) return { ok: false, error: '저장하지 못했습니다.' };
  refreshNotices(data.id);
  return { ok: true, id: data.id };
}

export async function deleteNotice(id: string): Promise<ActionResult> {
  const db = await adminDb();
  if (!db || !UUID.test(id)) return { ok: false, error: NEED_LOGIN };
  const { data } = await db.from('notices').select('attachment_path, body').eq('id', id).maybeSingle();
  const { error } = await db.from('notices').delete().eq('id', id);
  if (error) return { ok: false, error: '삭제하지 못했습니다.' };
  if (data?.attachment_path) await db.storage.from(SITE_FILES_BUCKET).remove([data.attachment_path]);
  const images = postImagePaths(data?.body ?? '');
  if (images.length) await db.storage.from(POST_IMAGE_BUCKET).remove(images);
  refreshNotices(id);
  return { ok: true };
}

function refreshArchive() {
  revalidatePath('/');
  revalidatePath('/archive');
  revalidatePath('/admin/archive');
}

export async function createArchiveFile(input: {
  title: string;
  category: string;
  description: string;
  file: UploadedFile;
}): Promise<ActionResult> {
  const db = await adminDb();
  if (!db) return { ok: false, error: NEED_LOGIN };
  const title = input.title.trim().slice(0, 200);
  const file = cleanFile(input.file);
  if (!title) return { ok: false, error: '자료명을 입력해 주세요.' };
  if (!ARCHIVE_CATEGORY_KEYS.includes(input.category)) return { ok: false, error: '분류를 골라 주세요.' };
  if (!file) return { ok: false, error: '파일을 올려 주세요.' };
  const { error } = await db.from('archive_files').insert({
    title,
    category: input.category,
    description: input.description.trim().slice(0, 500) || null,
    file_path: file.path,
    file_name: file.name,
    file_size: file.size,
  });
  if (error) return { ok: false, error: '저장하지 못했습니다.' };
  refreshArchive();
  return { ok: true };
}

export async function deleteArchiveFile(id: string): Promise<ActionResult> {
  const db = await adminDb();
  if (!db || !UUID.test(id)) return { ok: false, error: NEED_LOGIN };
  const { data } = await db.from('archive_files').select('file_path').eq('id', id).maybeSingle();
  if (data?.file_path) await db.storage.from(SITE_FILES_BUCKET).remove([data.file_path]);
  const { error } = await db.from('archive_files').delete().eq('id', id);
  if (error) return { ok: false, error: '삭제하지 못했습니다.' };
  refreshArchive();
  return { ok: true };
}
