import { Fragment, type ReactNode } from 'react';
import { IMAGE_LINE, postImageUrl } from '@/lib/posts';

// 공지 · 칼럼 본문. 관리자 글쓰기 도구가 넣어 주는 간단한 표시만 알아봅니다.
//   ## 소제목            → 소제목
//   **굵게**             → 굵은 글씨
//   ![사진 설명](사진)   → 그 자리에 사진 (설명은 사진 아래 작은 글씨)
//   https:// 주소        → 링크
// 빈 줄로 문단을 나누고, 문단 안의 줄바꿈은 그대로 보입니다.

type Block = { kind: 'h'; text: string } | { kind: 'img'; caption: string; path: string } | { kind: 'p'; text: string };

function toBlocks(body: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ kind: 'p', text: para.join('\n') });
    para = [];
  };
  for (const raw of body.replace(/\r\n?/g, '\n').split('\n')) {
    const line = raw.trimEnd();
    const img = IMAGE_LINE.exec(line.trim());
    if (img) {
      flush();
      blocks.push({ kind: 'img', caption: img[1].trim(), path: img[2] });
    } else if (/^##\s+\S/.test(line)) {
      flush();
      blocks.push({ kind: 'h', text: line.replace(/^##\s+/, '') });
    } else if (!line.trim()) {
      flush();
    } else {
      para.push(line);
    }
  }
  flush();
  return blocks;
}

const withLinks = (text: string, key: string) =>
  text.split(/(https?:\/\/[^\s<>"']*[^\s<>"'.,!?;:)\]])/g).map((part, i) =>
    i % 2 ? (
      <a key={`${key}-${i}`} href={part} target="_blank" rel="noopener noreferrer nofollow">
        {part}
      </a>
    ) : (
      <Fragment key={`${key}-${i}`}>{part}</Fragment>
    ),
  );

const inline = (text: string, key: string): ReactNode[] =>
  text
    .split(/(\*\*[^*\n]+\*\*)/g)
    .map((part, i) =>
      i % 2 ? <strong key={`${key}b${i}`}>{withLinks(part.slice(2, -2), `${key}b${i}`)}</strong> : withLinks(part, `${key}t${i}`),
    );

export default function PostBody({ body, title }: { body: string; title: string }) {
  return (
    <div className="post-body">
      {toBlocks(body).map((b, i) =>
        b.kind === 'h' ? (
          <h2 key={i}>{inline(b.text, `${i}`)}</h2>
        ) : b.kind === 'img' ? (
          <figure key={i}>
            {/* 사진 크기가 글마다 달라 이미지 최적화 대신 올릴 때 미리 줄여 둔 파일을 그대로 씁니다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={postImageUrl(b.path)} alt={b.caption || title} loading={i < 3 ? 'eager' : 'lazy'} decoding="async" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>
        ) : (
          <p key={i}>{inline(b.text, `${i}`)}</p>
        ),
      )}
    </div>
  );
}
