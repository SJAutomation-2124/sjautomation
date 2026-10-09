import Link from 'next/link';
import type { Metadata } from 'next';
import { EMAIL, EMAIL_HREF, PHONE, PHONE_HREF } from '@/lib/contact';

export const metadata: Metadata = { title: '개인정보처리방침' };

const EFFECTIVE_DATE = '2026년 10월 9일';

const TRUSTEES = [
  ['Vercel Inc. (미국)', '홈페이지 호스팅, 견적 문의 접수 처리'],
  ['Supabase, Inc. (미국) — 데이터 저장 위치: 대한민국(서울)', '문의 내용 · 첨부파일 저장'],
  ['Resend (미국)', '문의 접수 알림 메일 발송'],
];

const TRANSFERS = [
  {
    to: 'Vercel Inc.',
    country: '미국',
    items: '견적 문의 입력 항목 전체(첨부파일 제외)',
    how: '문의를 보낼 때 네트워크로 전송',
    purpose: '문의 접수 처리',
    period: '처리 즉시 삭제 (서버 접속 기록은 Vercel 정책에 따름)',
  },
  {
    to: 'Resend',
    country: '미국',
    items: '제목, 회사명, 담당자명, 연락처, 이메일, 문의 내용, 첨부파일 이름과 내려받기 링크',
    how: '문의가 접수될 때 네트워크로 전송',
    purpose: '회사 담당자에게 접수 알림 메일 발송',
    period: '발송 기록은 Resend 정책에 따른 기간 보관',
  },
];

const REMEDIES = [
  ['개인정보분쟁조정위원회', '1833-6972', 'www.kopico.go.kr'],
  ['개인정보침해신고센터 (한국인터넷진흥원)', '118', 'privacy.kisa.or.kr'],
  ['대검찰청 사이버수사과', '1301', 'www.spo.go.kr'],
  ['경찰청 사이버수사국', '182', 'ecrm.police.go.kr'],
];

export default function PrivacyPage() {
  return (
    <main className="bp-grid">
      <section className="section--tight section--panel">
        <div className="container">
          <div className="crumb">
            <Link href="/">HOME</Link>
            <span>/</span>
            <span className="current">PRIVACY</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.025em', marginBottom: 16 }}>
            개인정보처리방침
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)', maxWidth: 720 }}>
            SJ AUTOMATION(이하 &lsquo;회사&rsquo;)은 「개인정보 보호법」에 따라 정보주체의 개인정보를 보호하고 관련 고충을
            신속하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 둡니다.
          </p>
          <p className="mono" style={{ fontSize: 12, color: 'var(--faint)', marginTop: 18, letterSpacing: '0.04em' }}>
            시행일 {EFFECTIVE_DATE}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="card privacy" style={{ padding: 'clamp(28px, 5vw, 56px)', maxWidth: 920 }}>
            <Clause n={1} title="개인정보의 처리 목적">
              <p>회사는 홈페이지 견적 문의를 통해 받은 개인정보를 다음 목적으로만 처리하며, 목적이 바뀌면 미리 동의를 받습니다.</p>
              <ul>
                <li>자동화 기계 제작, 설계 · 가공, 제어, 스마트팩토리 관련 견적 · 제작 문의에 대한 상담과 회신</li>
                <li>문의 내용 확인과 상담 이력 관리</li>
                <li>문의 게시판 운영 (공개글의 게시, 답변 게시, 비밀글 열람 확인)</li>
              </ul>
            </Clause>

            <Clause n={2} title="처리하는 개인정보 항목">
              <ul>
                <li>
                  <strong>필수:</strong> 제목, 회사명, 담당자명, 연락처, 이메일, 문의 분야, 문의 내용
                </li>
                <li>
                  <strong>선택:</strong> 첨부파일 (도면, 사진, 사양서 등 문의하신 분이 직접 올린 파일과 그 안의 정보), 비밀글
                  비밀번호 (되돌릴 수 없도록 암호화하여 저장)
                </li>
                <li>
                  <strong>자동 생성:</strong> 홈페이지 이용 과정에서 접속 IP, 접속 일시 등 서버 접속 기록이 호스팅 업체(Vercel)에
                  생성될 수 있습니다.
                </li>
              </ul>
              <p>
                공개글로 작성한 문의는 제목, 문의 내용, 일부를 가린 이름(예: 홍*동), 작성일, 답변이 문의 게시판에 공개됩니다.
                회사명, 연락처, 이메일, 첨부파일은 공개글이어도 공개하지 않습니다. 비밀글은 담당자와 비밀번호를 아는 분만 볼 수
                있습니다.
              </p>
              <p>회사는 만 14세 미만 아동의 개인정보를 받지 않습니다.</p>
            </Clause>

            <Clause n={3} title="개인정보의 처리 및 보유 기간">
              <p>
                문의 내용과 첨부파일은 <strong>문의 처리 완료 후 3년간</strong> 보관한 뒤 파기합니다. 다만 관계 법령에 따라 보존해야
                하는 경우에는 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
            </Clause>

            <Clause n={4} title="개인정보의 파기 절차 및 방법">
              <p>
                보유 기간이 지나거나 처리 목적을 달성한 개인정보는 지체 없이(5일 이내) 파기합니다. 전자적 파일은 복구할 수 없는
                방법으로 삭제하고, 종이 문서는 분쇄하거나 소각합니다.
              </p>
            </Clause>

            <Clause n={5} title="개인정보의 제3자 제공">
              <p>
                회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 다만 정보주체의 별도 동의가 있거나 법률에 특별한 규정이
                있는 경우에는 예외로 합니다.
              </p>
            </Clause>

            <Clause n={6} title="개인정보 처리의 위탁">
              <p>회사는 홈페이지 운영을 위해 다음과 같이 개인정보 처리 업무를 위탁합니다.</p>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>수탁자</th>
                      <th>위탁 업무</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRUSTEES.map(([who, what]) => (
                      <tr key={who}>
                        <td>{who}</td>
                        <td>{what}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>위탁 계약 시 개인정보가 안전하게 관리되도록 수탁자를 관리 · 감독하며, 수탁자가 바뀌면 이 방침을 통해 알립니다.</p>
            </Clause>

            <Clause n={7} title="개인정보의 국외 이전">
              <p>위탁 업무 수행을 위해 다음과 같이 개인정보가 국외로 이전됩니다.</p>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>이전받는 자</th>
                      <th>국가</th>
                      <th>이전 항목</th>
                      <th>이전 시기 · 방법</th>
                      <th>이용 목적</th>
                      <th>보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSFERS.map((t) => (
                      <tr key={t.to}>
                        <td>{t.to}</td>
                        <td>{t.country}</td>
                        <td>{t.items}</td>
                        <td>{t.how}</td>
                        <td>{t.purpose}</td>
                        <td>{t.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                국외 이전을 원하지 않으시면 온라인 문의 대신 전화({PHONE})나 이메일({EMAIL})로 문의하실 수 있습니다. 이 경우
                위 업체로 개인정보가 이전되지 않습니다.
              </p>
            </Clause>

            <Clause n={8} title="정보주체의 권리 · 의무 및 행사 방법">
              <p>
                정보주체는 언제든지 회사에 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다. 아래 개인정보 보호 담당자에게
                전화나 이메일로 요청하시면 지체 없이 조치합니다. 법정대리인이나 위임을 받은 사람을 통해서도 요구할 수 있습니다.
              </p>
            </Clause>

            <Clause n={9} title="개인정보의 안전성 확보 조치">
              <ul>
                <li>접근 권한 관리: 문의 내용과 첨부파일은 회사 담당자만 볼 수 있도록 접근을 제한하며, 외부에서는 읽을 수 없습니다.</li>
                <li>전송 구간 암호화: 홈페이지와 저장소 사이의 모든 통신은 암호화(HTTPS)됩니다.</li>
                <li>첨부파일 보호: 첨부파일은 비공개 저장소에 보관하며, 알림 메일에는 기간이 정해진 내려받기 링크만 담습니다.</li>
                <li>비밀번호 암호화: 비밀글 비밀번호는 복원할 수 없는 방식으로 암호화하여 저장합니다.</li>
              </ul>
            </Clause>

            <Clause n={10} title="개인정보 자동 수집 장치(쿠키)">
              <p>
                회사 홈페이지는 방문자에게 쿠키를 사용하지 않습니다. 회사 담당자가 관리자 화면에 로그인할 때만 로그인 상태를
                유지하기 위한 쿠키를 사용합니다.
              </p>
            </Clause>

            <Clause n={11} title="개인정보 보호 담당자">
              <p>개인정보 처리에 관한 문의, 불만 처리, 피해 구제는 아래로 연락해 주시면 지체 없이 답변 · 처리합니다.</p>
              <div className="table-scroll">
                <table className="data-table" style={{ minWidth: 0 }}>
                  <tbody>
                    <tr>
                      <td style={{ width: 140, color: 'var(--muted)' }}>담당</td>
                      <td>SJ AUTOMATION 개인정보 보호 담당</td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--muted)' }}>전화</td>
                      <td>
                        <a href={PHONE_HREF}>{PHONE}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ color: 'var(--muted)' }}>이메일</td>
                      <td>
                        <a href={EMAIL_HREF}>{EMAIL}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Clause>

            <Clause n={12} title="권익침해 구제 방법">
              <p>개인정보 침해로 인한 구제를 받으려면 아래 기관에 분쟁 조정이나 상담을 신청할 수 있습니다.</p>
              <div className="table-scroll">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>기관</th>
                      <th>전화</th>
                      <th>홈페이지</th>
                    </tr>
                  </thead>
                  <tbody>
                    {REMEDIES.map(([org, tel, web]) => (
                      <tr key={org}>
                        <td>{org}</td>
                        <td className="mono">{tel}</td>
                        <td className="mono">{web}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Clause>

            <Clause n={13} title="개인정보처리방침의 변경" last>
              <p>
                이 개인정보처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 내용이 바뀌면 시행 7일 전부터 홈페이지를 통해 알립니다.
              </p>
            </Clause>
          </article>
        </div>
      </section>
    </main>
  );
}

function Clause({ n, title, last, children }: { n: number; title: string; last?: boolean; children: React.ReactNode }) {
  return (
    <section style={{ paddingBottom: last ? 0 : 36, marginBottom: last ? 0 : 36, borderBottom: last ? undefined : '1px solid var(--line-soft)' }}>
      <div className="eyebrow" style={{ marginBottom: 12 }}>
        <span className="num mono">{String(n).padStart(2, '0')}</span>
        <span className="rule" />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', marginBottom: 14 }}>
        제{n}조 {title}
      </h2>
      {children}
    </section>
  );
}
