export const INQUIRY_BUCKET = 'inquiry-files';
export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

export const INQUIRY_TYPES = [
  '자동화 기계 제작 (턴키)',
  '설계 · 가공',
  'PLC · 모션 제어 · 임베디드',
  '스마트팩토리 · 전산 연동',
] as const;

export type InquiryInput = {
  company: string;
  name: string;
  phone: string;
  email: string;
  types: string[];
  message: string;
  consent: boolean;
  /** 사람 눈에는 안 보이는 칸. 채워져 있으면 스팸 봇으로 보고 저장하지 않습니다. */
  website: string;
  attachmentPath?: string;
  attachmentName?: string;
};

export type ActionResult<T = unknown> = ({ ok: true } & T) | { ok: false; error: string };
