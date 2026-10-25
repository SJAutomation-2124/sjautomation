import { SUPABASE_URL } from '@/lib/supabase';

// '공지 · 칼럼' 게시판. DB 표 이름은 예전 그대로 notices이고, category로 공지 / 칼럼을 나눕니다.
export const POST_TYPES = [
  { key: 'notice', label: '공지' },
  { key: 'column', label: '칼럼' },
] as const;
export type PostType = (typeof POST_TYPES)[number]['key'];
export const postTypeLabel = (key: string) => (key === 'column' ? '칼럼' : '공지');

// 칼럼 소분류
export const COLUMN_TOPICS = ['기술 이론', '현장 이야기', '생각'] as const;

// 칼럼 글쓴이 표기. 대표 이름은 사이트에 밝히지 않습니다.
export const COLUMN_AUTHOR = '대표 엔지니어';

export const MAX_POST_BODY = 50000;

// 본문 중간 사진(공개 저장소). 본문에는 한 줄로 ![사진 설명](2026-10/0a1b2c3d4e5f.webp) 처럼 들어갑니다.
export const POST_IMAGE_BUCKET = 'post-images';
export const IMAGE_LINE = /^!\[([^\]\n]*)\]\((\d{4}-\d{2}\/[0-9a-f]{12}\.(?:webp|jpg))\)$/;
export const postImageUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${POST_IMAGE_BUCKET}/${path}`;

export function postImagePaths(body: string) {
  return body
    .split('\n')
    .map((line) => IMAGE_LINE.exec(line.trim())?.[2])
    .filter((p): p is string => Boolean(p));
}

// 목록 미리보기 · 검색 설명용 글자만 (사진 줄 · 소제목 표시 · 굵게 기호를 뺍니다)
export function postExcerpt(body: string, max = 140) {
  const text = body
    .split('\n')
    .filter((line) => !IMAGE_LINE.test(line.trim()))
    .map((line) => line.replace(/^##\s+/, '').replace(/\*\*/g, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}
