'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { INQUIRY_BUCKET, type ActionResult } from '@/lib/inquiry';
import { createAdminClient } from '@/lib/supabase-admin';
import { createSessionClient, getAdminUser } from '@/lib/supabase-server';

const ID = /^[0-9a-f-]{36}$/;

async function adminDb() {
  if (!(await getAdminUser())) return null;
  return createAdminClient();
}

function refresh(id: string) {
  revalidatePath('/admin');
  revalidatePath('/request');
  revalidatePath(`/request/${id}`);
}

export async function saveAnswer(id: string, answer: string): Promise<ActionResult> {
  const db = await adminDb();
  if (!db || !ID.test(id)) return { ok: false, error: '로그인이 필요합니다.' };
  const text = answer.trim().slice(0, 5000);
  const { error } = await db
    .from('inquiries')
    .update(text ? { answer: text, answered_at: new Date().toISOString(), status: 'answered' } : { answer: null, answered_at: null, status: 'new' })
    .eq('id', id);
  if (error) return { ok: false, error: '저장하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  refresh(id);
  return { ok: true };
}

export async function deleteInquiry(id: string): Promise<ActionResult> {
  const db = await adminDb();
  if (!db || !ID.test(id)) return { ok: false, error: '로그인이 필요합니다.' };
  const { data } = await db.from('inquiries').select('attachment_path').eq('id', id).maybeSingle();
  if (data?.attachment_path) await db.storage.from(INQUIRY_BUCKET).remove([data.attachment_path]);
  const { error } = await db.from('inquiries').delete().eq('id', id);
  if (error) return { ok: false, error: '삭제하지 못했습니다.' };
  refresh(id);
  return { ok: true };
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
