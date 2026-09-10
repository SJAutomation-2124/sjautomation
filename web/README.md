# sjautosolution.com

SJ AUTOMATION 홈페이지. Next.js + Supabase.

## 처음 실행하는 방법

1. [nodejs.org](https://nodejs.org)에서 LTS 버전 설치 (그냥 다음, 다음, 설치)
2. 이 폴더에서 터미널 열고:
   ```
   npm install
   npm run dev
   ```
3. 브라우저에서 `http://localhost:3000` 열면 확인 가능

## 지금까지 만든 것

- `app/page.tsx` — 메인
- `app/about/page.tsx` — 회사소개 (인사말 포함)
- 공통 헤더/푸터, 디자인 시스템(`app/globals.css`)

## 아직 안 만든 것

- 사업분야, 실적사례(목록/상세), 자료실, 공지사항(목록/상세), 문의 페이지
- Supabase 연동 (게시판, 문의 폼 저장, 관리자 로그인, 메일 알림)
- 위 페이지들의 콘텐츠 대괄호 `[ ]` 채우기

## 대괄호 정보를 나중에 채울 때

전화번호/이메일은 `components/SiteHeader.tsx`와 `components/SiteFooter.tsx` 맨 위
상수만 고치면 사이트 전체에 반영됩니다.
