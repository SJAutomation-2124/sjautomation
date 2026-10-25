import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/inquiry';

export type ColumnItem = {
  id: string;
  created_at: string;
  title: string;
  topic: string | null;
  views: number;
  excerpt: string;
  cover: string | null;
};

// 칼럼 목록: 글은 왼쪽, 대표 사진(본문 첫 사진)은 오른쪽.
// 사진이 없는 칼럼은 도면 느낌의 어두운 판에 분류 이름을 둡니다.
export default function ColumnList({ items }: { items: ColumnItem[] }) {
  return (
    <div className="col-list">
      {items.map((c) => (
        <Link key={c.id} href={`/notice/${c.id}`} className="col-row board-link">
          <div>
            <span className="col-meta mono">
              {c.topic && <span className="col-topic">{c.topic}</span>}
              <span>{formatDate(c.created_at)}</span>
              <span>조회 {c.views}</span>
            </span>
            <h3 className="col-title">{c.title}</h3>
            {c.excerpt && <p className="col-excerpt">{c.excerpt}</p>}
          </div>
          {c.cover ? (
            <div className="col-cover">
              <Image src={c.cover} alt="" fill sizes="(max-width: 640px) 104px, 240px" style={{ objectFit: 'cover' }} />
            </div>
          ) : (
            <div className="col-cover col-cover--blank" aria-hidden="true">
              <span className="mono">SJ MOTION · COLUMN</span>
              <strong>{c.topic ?? '칼럼'}</strong>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
