import { MAX_SITE_FILE_BYTES, SITE_FILES_BUCKET } from '@/lib/site-files';
import { createSiteUpload, type UploadedFile } from './content-actions';

// 관리자 화면(브라우저)에서 파일을 Supabase 비공개 저장소로 바로 올립니다.
export async function uploadSiteFile(folder: 'notices' | 'archive', file: File): Promise<UploadedFile> {
  if (file.size > MAX_SITE_FILE_BYTES) throw new Error('파일은 50MB까지 올릴 수 있습니다.');
  const slot = await createSiteUpload(folder, file.name, file.size);
  if (!slot.ok) throw new Error(slot.error);
  const { createBrowserClient } = await import('@/lib/supabase');
  const { error } = await createBrowserClient()
    .storage.from(SITE_FILES_BUCKET)
    .uploadToSignedUrl(slot.path, slot.token, file, { contentType: file.type || 'application/octet-stream' });
  if (error) throw new Error('파일을 올리지 못했습니다. 잠시 후 다시 시도해 주세요.');
  return { path: slot.path, name: file.name, size: file.size };
}
