export const SITE_FILES_BUCKET = 'site-files';
export const MAX_SITE_FILE_BYTES = 50 * 1024 * 1024;

export const ARCHIVE_CATEGORIES = [
  { key: '기술지원', title: '기술지원 자료', desc: '설치 · 배선 · 파라미터 설정 가이드' },
  { key: '장비 매뉴얼', title: '장비 매뉴얼', desc: '납품 장비 사용 · 정비 설명서' },
  { key: '강의 자료', title: '강의 자료', desc: '교육용 PLC · 모션 제어 자료' },
  { key: '소프트웨어 툴', title: '소프트웨어 툴', desc: '계산기 · 설정 유틸리티' },
] as const;
export const ARCHIVE_CATEGORY_KEYS = ARCHIVE_CATEGORIES.map((c) => c.key) as string[];

export const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

export function formatBytes(b: number | null | undefined) {
  if (!b) return '-';
  if (b >= 1024 * 1024) return `${(b / 1024 / 1024).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(b / 1024))}KB`;
}

export function fileExt(name: string) {
  return (/\.([A-Za-z0-9]{1,10})$/.exec(name)?.[1] ?? 'FILE').toUpperCase();
}

// supabase-js의 createSignedUrl(download: 이름)은 파일명을 두 번 인코딩해 한글 이름이 %ED%94… 로 깨집니다.
// 서명 링크만 받고, 내려받을 파일명은 한 번만 인코딩해 직접 붙입니다.
export function withDownloadName(signedUrl: string, name: string | null | undefined) {
  return `${signedUrl}${signedUrl.includes('?') ? '&' : '?'}download=${encodeURIComponent(name || '')}`;
}
