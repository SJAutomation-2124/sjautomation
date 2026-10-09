export const INQUIRY_BUCKET = 'inquiry-files';
export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

export const INQUIRY_TYPES = [
  '자동화 기계 제작 (턴키)',
  '설계 · 가공',
  'PLC · 모션 제어 · 임베디드',
  '스마트팩토리 · 전산 연동',
] as const;

export type InquiryInput = {
  title: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  types: string[];
  message: string;
  consent: boolean;
  isSecret: boolean;
  /** 비밀글일 때 작성자가 정하는 열람 비밀번호. */
  password: string;
  /** 사람 눈에는 안 보이는 칸. 채워져 있으면 스팸 봇으로 보고 저장하지 않습니다. */
  website: string;
  attachmentPath?: string;
  attachmentName?: string;
};

export type ActionResult<T = unknown> = ({ ok: true } & T) | { ok: false; error: string };

export const BOARD_PAGE_SIZE = 10;
export const MIN_PASSWORD_LENGTH = 4;

/** 게시판에 보이는 작성자 이름: 홍길동 → 홍*동, 김철 → 김* */
export function maskName(name: string) {
  const chars = [...name.trim()];
  if (chars.length <= 1) return chars.join('') || '익명';
  if (chars.length === 2) return chars[0] + '*';
  return chars[0] + '*'.repeat(chars.length - 2) + chars[chars.length - 1];
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/.s?/g, '.').replace(/.$/, '');
