import { POST_IMAGE_BUCKET } from '@/lib/posts';
import { createBrowserClient } from '@/lib/supabase';
import { createPostImageUpload } from '../content-actions';

const MAX_SIDE = 1800;

// 본문 사진은 올리기 전에 브라우저에서 긴 변 1800px로 줄여 다시 저장합니다.
// 다시 저장하면 촬영 위치(GPS) · 기기 같은 사진 속 정보가 모두 빠집니다.
export async function shrinkImage(file: File): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    throw new Error(`"${file.name}"은(는) 열 수 없는 사진입니다. JPG · PNG 사진으로 올려 주세요.`);
  }
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('사진을 처리하지 못했습니다.');
  // 투명한 PNG는 흰 바탕 위에 놓습니다
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const encode = (type: string, quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  const webp = await encode('image/webp', 0.85);
  if (webp?.type === 'image/webp') return webp;
  // WEBP로 저장하지 못하는 브라우저(일부 아이폰 등)는 JPG로
  const jpg = await encode('image/jpeg', 0.88);
  if (!jpg) throw new Error('사진을 처리하지 못했습니다.');
  return jpg;
}

// 줄인 사진을 공개 저장소에 올리고, 본문에 넣을 저장 경로를 돌려줍니다.
export async function uploadPostImage(file: File): Promise<string> {
  const blob = await shrinkImage(file);
  const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
  const slot = await createPostImageUpload(ext);
  if (!slot.ok) throw new Error(slot.error);
  const { error } = await createBrowserClient()
    .storage.from(POST_IMAGE_BUCKET)
    .uploadToSignedUrl(slot.path, slot.token, blob, { contentType: blob.type, cacheControl: '31536000' });
  if (error) throw new Error('사진을 올리지 못했습니다. 잠시 후 다시 시도해 주세요.');
  return slot.path;
}
