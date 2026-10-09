export type WorkCategory = '자동화 기계' | '설계 · 가공' | '모션 · 제어' | '스마트팩토리';

export type WorkPhoto = { src: string; caption: string };
export type WorkVideo = { src: string; poster: string; caption: string };

export type Work = {
  slug: string;
  category: WorkCategory;
  title: string;
  img: string;
  imgCaption: string;
  /** 세로로 긴 사진은 목록 썸네일에서 잘리는 위치를 지정합니다 (CSS object-position). */
  imgPosition?: string;
  /** 세로 사진처럼 대표 사진을 자르지 않고 통째로 보여줘야 할 때 true. */
  imgContain?: boolean;
  client?: string;
  tech: string[];
  summary: string;
  background: string;
  approach: string;
  result: string;
  gallery?: WorkPhoto[];
  videos?: WorkVideo[];
  /** 유튜브 영상 ID만 적습니다 (youtube.com/watch?v= 뒤에 붙는 부분). */
  youtubeId?: string;
};

export const WORKS: Work[] = [
  {
    slug: 'line-cutting-system',
    category: '자동화 기계',
    title: '절단기 가공 라인시스템',
    img: '/images/line-cutting.jpg',
    imgCaption: '절단기 앞뒤로 소재 지지 레일을 깐 가공 라인',
    imgPosition: 'center 60%',
    tech: ['정척 이송 제어', '절단 라인 구성', '코일 교정기 연동'],
    summary:
      '절단기 앞뒤로 소재 이송과 길이 맞춤을 붙여, 긴 판재를 사람이 밀고 재지 않아도 정해진 길이로 연속 절단하는 라인입니다.',
    background:
      '대형 판재를 절단기에 넣을 때마다 작업자가 소재를 밀어 넣고 길이를 직접 재서 맞추고 있었습니다. 판이 길고 무거울수록 위치를 맞추는 데 시간이 걸리고, 작업자마다 치수가 조금씩 달라졌습니다.',
    approach:
      '절단기 앞뒤에 소재를 받치는 레일과 롤러를 깔고, 입력한 길이만큼 소재를 보내 멈추도록 이송부를 제어했습니다. 코일 소재는 언코일러와 교정기를 거쳐 평평하게 펴진 상태로 바로 절단부에 들어가도록 라인을 이었습니다. 작업자는 컨트롤러에 길이와 수량만 입력합니다.',
    result:
      '길이 맞춤을 장비가 하기 때문에 작업자가 바뀌어도 같은 치수로 잘리고, 소재 공급부터 절단까지 한 사람이 라인을 운전할 수 있게 되었습니다.',
    gallery: [{ src: '/images/works/coil-cut-line.jpg', caption: '코일 공급 → 교정 → 절단으로 이어지는 라인' }],
  },
  {
    slug: 'steel-v-cutting',
    category: '자동화 기계',
    title: '철판 V-Cutting 시스템',
    img: '/images/works/v-grooving-machine.jpg',
    imgCaption: 'CNC V-그루빙 장비와 조작반',
    tech: ['3축 (X1 · X2 · Z) 위치 제어', 'HMI 화면 설계', '소재별 가공 조건 관리'],
    summary:
      '절곡 전에 판재 뒷면에 V홈을 파서 모서리가 날카롭게 꺾이도록 하는 CNC V-그루빙 장비의 제어부와 조작 화면입니다.',
    background:
      '스테인리스 판재로 패널이나 마감재를 만들 때 그냥 절곡하면 모서리가 둥글게 남습니다. 모서리를 날카롭게 세우려면 절곡 전에 정확한 깊이로 V홈을 내야 하는데, 홈 위치나 깊이가 조금만 어긋나도 판재 한 장을 통째로 버리게 됩니다.',
    approach:
      'X1 · X2 · Z 세 축을 따로 제어해 홈 위치와 깊이를 맞추도록 했습니다. 조작 화면에서 소재 종류와 두께를 고르고, 완성될 절곡 형상을 그림으로 보면서 홈 위치를 입력할 수 있게 만들었습니다. 컷 방식(A · B · C 컷, 라인)은 버튼 하나로 바꿉니다.',
    result:
      '도면 치수를 그대로 입력하면 홈 위치와 깊이가 잡히기 때문에, 숙련도에 덜 기대고도 같은 품질로 반복 가공할 수 있습니다.',
    gallery: [{ src: '/images/works/v-grooving-hmi.jpg', caption: '절곡 형상과 홈 위치를 함께 보여주는 조작 화면' }],
  },
  {
    slug: 'steel-rolling',
    category: '자동화 기계',
    title: '철판 롤링기',
    img: '/images/works/roll-bender-controller.jpg',
    imgCaption: '롤링기에 붙인 컨트롤러와 성형 롤',
    imgPosition: 'center 25%',
    imgContain: true,
    tech: ['롤 높이 단계 제어', '공정 레시피 저장', '컨트롤러 · 조작반 제작'],
    summary:
      '롤 높이를 정해진 만큼씩 자동으로 내려가며 여러 번 통과시켜, 소재를 원하는 곡률로 감는 롤링기에 전용 컨트롤러를 붙였습니다.',
    background:
      '롤링은 롤을 조금씩 내리면서 소재를 여러 번 통과시켜 곡률을 만듭니다. 몇 번에 걸쳐 얼마씩 내릴지는 작업자 감에 맡겨져 있었고, 같은 제품을 다시 만들 때도 처음부터 다시 맞춰야 했습니다.',
    approach:
      '컨트롤러에 X 거리, 목표 Y 높이, 1회 하강량, R 각도를 공정 번호별로 저장하고, 자동모드에서는 저장된 순서대로 롤 위치를 움직이도록 했습니다. 조작반에는 속도 조절 다이얼, 비상정지, 수동 운전 버튼을 함께 배치했습니다.',
    result:
      '한 번 맞춘 곡률 조건을 공정으로 저장해 두고 다음 작업 때 불러와 바로 쓸 수 있어, 반복 생산할 때 다시 맞추는 시간이 없어졌습니다.',
  },
  {
    slug: 'cnc-retrofit',
    category: '자동화 기계',
    title: '수동밀링 CNC 개조',
    img: '/images/works/cnc-retrofit-panel.jpg',
    imgCaption: '새로 단 조작반(왼쪽)과 서보 드라이브 전장 박스(오른쪽)',
    imgPosition: 'center 55%',
    imgContain: true,
    tech: ['3축 서보 제어', '전장 설계 · 시공', '공정표 기반 자동 운전', '노후 설비 개조'],
    summary:
      '핸들을 돌려 쓰던 수동 밀링기에 3축 서보와 조작반을 달아, 가공 순서를 입력하면 자동으로 깎는 장비로 바꿨습니다.',
    background:
      '기계 본체는 아직 튼튼한데 핸들로만 움직이는 수동 밀링기여서, 같은 가공을 반복할 때마다 작업자가 눈금을 보며 직접 이송해야 했습니다. 새 CNC 장비를 들이기엔 비용 부담이 컸습니다.',
    approach:
      'X · Y · Z 세 축에 서보모터와 드라이브를 달고, 전장 박스와 변압기를 새로 꾸몄습니다. 조작반에는 터치 화면, 비상정지, 수동 핸들(MPG), 오일 · 절삭유 · 모터 스위치를 배치했습니다. 화면에서 공정마다 X 시작 · 끝 위치, Z 절삭 높이와 이동 높이, Y 위치를 표로 입력하면, 이동은 고속으로 절삭은 저속으로 나눠 순서대로 가공합니다.',
    result:
      '기존 기계를 그대로 살리면서 반복 가공을 자동으로 돌릴 수 있게 되었습니다. 아래 영상은 개조 후 입력한 공정표대로 가공이 진행되는 모습입니다.',
    videos: [
      {
        src: '/videos/cnc-retrofit-run-1.mp4',
        poster: '/videos/cnc-retrofit-run-1.jpg',
        caption: '공정표의 다음 행으로 넘어가며 자동 가공',
      },
      {
        src: '/videos/cnc-retrofit-run-2.mp4',
        poster: '/videos/cnc-retrofit-run-2.jpg',
        caption: '조작반 전체 — 오일 · 절삭유 · 모터 스위치와 공정 화면',
      },
    ],
  },
  {
    slug: 'frontgauge-calculator',
    category: '자동화 기계',
    title: '2축 프런트게이지 자동 차감연산기 탑재',
    img: '/images/press-hmi.jpg',
    imgCaption: '잔여 치수와 공정표를 보여주는 컨트롤러 화면',
    imgPosition: 'center 55%',
    tech: ['2축 동기 위치 제어', '잔여 치수 자동 연산', 'HMI 화면 설계'],
    summary:
      '긴 판재를 일정한 길이로 연속해서 잘라 나갈 때, 남은 길이를 자동으로 계산해 앞쪽 게이지를 맞춰주는 2축 프런트게이지 컨트롤러입니다.',
    background:
      '긴 판을 여러 조각으로 나눌 때는 한 번 자를 때마다 남은 길이를 다시 계산해서 게이지를 옮겨야 합니다. 계산을 한 번 잘못하거나 게이지를 잘못 옮기면 그 뒤 조각 치수가 전부 틀어집니다.',
    approach:
      '소재 길이와 자를 치수를 입력하면 컨트롤러가 절단할 때마다 남은 치수를 차감해 다음 위치를 계산하고, X1 · X2 두 축 게이지를 동시에 그 위치로 보내도록 했습니다. 작업은 채널과 공정 번호로 나눠 저장하고, 생산 수량은 화면에서 바로 확인합니다.',
    result:
      '작업자는 치수만 입력하면 되고, 남은 길이 계산과 게이지 이동은 장비가 처리합니다. 잔여 치수와 생산 수량이 화면에 계속 표시되어 진행 상황도 한눈에 보입니다.',
  },
  {
    slug: 'okuma-planer-machining',
    category: '설계 · 가공',
    title: '오쿠마 프레나 가공 · 대학교 납품',
    img: '/images/works/okuma-mcv-machining.jpg',
    imgCaption: '오쿠마 MCV 문형 머시닝센터에 바이스 세 대로 고정한 장척 판재',
    imgPosition: 'center 40%',
    tech: ['문형 머시닝센터 가공', '장척물 고정 · 셋업', '정밀 판재 가공'],
    summary: '오쿠마 MCV 문형 머시닝센터로 길이가 긴 판재 부품을 가공해 대학교에 납품했습니다.',
    background:
      '길이가 긴 판재 부품이라, 여러 번 나눠 물리면 기준이 틀어져 단차가 생기기 쉬웠습니다. 한 번에 고정한 상태로 가공을 끝낼 수 있는 장비가 필요했습니다.',
    approach:
      '테이블이 넓은 오쿠마 MCV 문형 머시닝센터에 바이스 여러 대를 일렬로 세워 소재를 한 번에 고정했습니다. 한 번 물린 상태에서 측면과 끝단을 이어서 가공해, 다시 물리면서 생기는 기준 틀어짐을 막았습니다.',
    result: '도면 치수대로 가공을 마치고 대학교에 납품했습니다.',
  },
  {
    slug: 'io-precision-measure',
    category: '모션 · 제어',
    title: 'IO 모듈 고속 정밀 측정 솔루션',
    img: '/images/scope.jpg',
    imgCaption: '입력 신호(노랑)와 출력 신호(보라) 사이 지연을 오실로스코프로 측정',
    imgPosition: 'center 20%',
    tech: ['ARM 임베디드', '고속 IO 처리', '오실로스코프 타이밍 검증'],
    summary:
      '일반 PLC로는 잡기 어려운 짧은 신호를 다루는 IO 모듈을 만들고, 입력에서 출력까지 몇 마이크로초 만에 반응하는지 오실로스코프로 확인했습니다.',
    background:
      '일반 PLC는 스캔 주기 때문에 아주 짧은 신호를 놓치거나 출력이 늦게 나갈 수 있습니다. 짧은 펄스를 정확히 잡고 곧바로 반응해야 하는 측정 작업에는 맞지 않았습니다.',
    approach:
      'ARM 기반 보드에서 입출력을 직접 처리하도록 구성했습니다. 검증은 입력 신호와 출력 신호를 오실로스코프 두 채널에 동시에 걸고, 10µs 단위 눈금으로 둘 사이 지연을 읽어 가며 맞췄습니다.',
    result: '응답 타이밍을 감이 아니라 측정 파형으로 확인한 뒤 납품했습니다.',
  },
  {
    slug: 'servo-tuner-hmi',
    category: '모션 · 제어',
    title: '서보 튜닝기 HMI 솔루션 · BECKHOFF',
    img: '/images/servo-hmi.jpg',
    imgCaption: '게인 설정, 명령 프로파일, 응답 그래프를 한 화면에',
    tech: ['BECKHOFF 서보', '서보 게인 튜닝', '실시간 응답 그래프'],
    summary:
      'BECKHOFF 서보 축에 사인파 · 사각파 명령을 넣고 응답 파형을 보면서 게인을 조정하는 튜닝 전용 화면입니다.',
    background:
      '서보 게인을 바꿀 때마다 축을 실제로 움직여 보고 결과를 따로 기록해야 해서, 튜닝 한 번에 시간이 오래 걸렸습니다. 명령과 응답을 한 화면에서 같이 볼 도구가 필요했습니다.',
    approach:
      '화면에서 위치 루프 · 속도 루프 게인을 바로 바꾸고, 주파수와 진폭을 정한 사인파나 거리 · 속도 · 가감속 · 저크를 정한 사각파를 명령으로 보낼 수 있게 했습니다. 현재 위치와 속도는 실시간으로 읽어 명령값과 함께 그래프에 겹쳐 그립니다.',
    result:
      '게인을 바꾸고 곧바로 응답 파형을 비교할 수 있어, 오버슈트나 추종 지연을 눈으로 확인하면서 튜닝할 수 있게 되었습니다.',
  },
  {
    slug: 'excavator-teleop',
    category: '모션 · 제어',
    title: '무인 굴삭기 조종 관제 시스템 · 한양대학교',
    img: '/images/works/excavator-teleop-screen.jpg',
    imgCaption: '위: 굴삭기 카메라 4채널 관제 · 아래: 원격 조종 시뮬레이터와 3D 점군 화면',
    client: '한양대학교',
    tech: ['원격 조종석 제작', 'IP 카메라 4채널 관제', 'IMU 기반 자세 표시', '3D 점군 표시'],
    summary: '원격지에서 굴삭기를 조종할 수 있도록, 운전석 형태의 조종석과 카메라 · 센서 관제 화면을 함께 구성했습니다.',
    background:
      '위험한 현장에 사람이 타지 않고 굴삭기를 다루기 위한 원격 조종 연구였습니다. 조종하는 사람은 현장을 직접 볼 수 없기 때문에, 화면만 보고도 장비 자세와 주변 상황을 정확히 알 수 있어야 했습니다.',
    approach:
      '실제 굴삭기 운전석과 같은 배치로 시트, 좌우 조이스틱, 발 페달을 갖춘 조종석을 만들고 앞쪽에 곡면 모니터 두 대를 달았습니다. 위 화면에는 굴삭기에 단 IP 카메라 4대의 영상을 녹화 · 재생 기능과 함께 띄우고, 아래 화면에는 붐 · 암 각도와 센서 값을 보여주는 원격 조종 시뮬레이터와 주변을 3D 점군으로 보여주는 화면을 배치했습니다.',
    result:
      '조종석에 앉은 채로 카메라 영상, 장비 자세, 주변 지형을 함께 보면서 굴삭기를 원격으로 운전할 수 있는 환경을 만들어 납품했습니다.',
    gallery: [{ src: '/images/works/excavator-teleop-cockpit.jpg', caption: '시트 · 조이스틱 · 페달을 갖춘 원격 조종석' }],
  },
  {
    slug: 'mobile-robot-controller',
    category: '모션 · 제어',
    title: '모바일 로봇 조종기 커스텀 제작 · 한양대학교',
    img: '/images/works/mobile-robot-controller.jpg',
    imgCaption: '조이스틱 두 개, 상태 화면, 비상정지를 갖춘 무선 조종기',
    imgPosition: 'center 55%',
    client: '한양대학교',
    tech: ['무선 조종기 설계', '임베디드 보드', '하우징 · 기구 설계'],
    summary:
      '모바일 로봇을 현장에서 들고 다니며 조종할 수 있도록, 조이스틱 두 개와 상태 화면을 갖춘 무선 조종기를 직접 설계해 만들었습니다.',
    background:
      '연구용 모바일 로봇에 맞는 기성 조종기가 없어, 필요한 조작 입력의 개수와 배치를 로봇에 맞춘 전용 조종기가 필요했습니다.',
    approach:
      '좌우 조이스틱으로 주행과 작업 동작을 나눠 조종하고, 토글 · 로커 스위치로 모드를 바꾸도록 배치했습니다. 가운데 화면과 LED로 상태를 확인하고, 비상정지 버튼은 손이 바로 닿는 자리에 두었습니다. 하우징과 손잡이 프레임까지 함께 설계해 오래 들고 써도 무리가 없도록 했습니다.',
    result: '로봇에 맞춘 무선 조종기를 하우징까지 갖춘 완성품 형태로 납품했습니다.',
  },
  {
    slug: 'press-brake-scada',
    category: '스마트팩토리',
    title: '절곡기 실시간 모니터링 (SCADA)',
    img: '/images/works/press-brake-scada.png',
    imgCaption: '운전 정보, 4축 현재 · 목표 위치, 수신 프레임 로그',
    imgPosition: 'top',
    tech: ['통신 프로토콜 설계', '실시간 모니터링 화면', '체크섬 데이터 검증'],
    summary:
      '절곡기 백게이지 컨트롤러가 보내는 운전 데이터를 받아, 각 축 위치와 생산 수량을 실시간으로 보여주는 모니터링 화면입니다.',
    background:
      '절곡기가 지금 몇 개째 작업 중인지, 축이 어디에 있는지는 장비 앞에 가야만 볼 수 있었습니다. 기존 장비를 바꾸지 않고 데이터만 꺼내 다른 곳에서도 볼 방법이 필요했습니다.',
    approach:
      '컨트롤러가 운전 모드, 축 구성, 채널, 공정 번호, 생산 수량, 목표 잔량, 각 축의 현재 · 목표 위치를 한 줄짜리 프레임으로 계속 내보내도록 하고, 프레임 끝에 체크섬을 붙여 깨진 데이터는 걸러내게 했습니다. 모니터링 화면은 이 프레임을 받아 X1 · X2 · Y · Z 네 축 위치와 생산 현황을 갱신하고, 받은 원본 프레임도 로그로 남깁니다. 장비 없이도 화면을 점검할 수 있게 시뮬레이션 모드를 넣었습니다.',
    result: '장비 앞에 가지 않고도 운전 상태와 생산 진행을 실시간으로 확인할 수 있게 되었습니다.',
    gallery: [{ src: '/images/code.jpg', caption: '컨트롤러에서 나오는 원본 프레임을 터미널로 확인하는 모습' }],
  },
  {
    slug: 'smart-factory-install',
    category: '스마트팩토리',
    title: '전산 · 자동화 연계 근태관리 시스템',
    img: '/images/works/attendance-dashboard.png',
    imgCaption: '월간 출근 현황 달력과 요약 지표',
    imgPosition: 'top',
    tech: ['출입기록 연동', '사내 전산 DB 연동', '근태 현황 대시보드', '다지사 통합 조회'],
    summary:
      '출입 보안 시스템(세콤)에 이미 쌓이고 있는 출입 기록을 가져와, 따로 입력하지 않아도 출근 · 결근 현황이 달력에 자동으로 정리되는 근태관리 시스템입니다.',
    background:
      '출입문에는 출입 기록이 남고 있었지만, 근태는 따로 다시 적어서 관리하고 있었습니다. 같은 정보를 두 번 다루다 보니 손이 많이 가고, 지사가 여러 곳이면 현황을 한 번에 보기도 어려웠습니다.',
    approach:
      '세콤 출입 기록을 받아 팀 명단과 맞춰 보고, 날짜별 출근 인원과 결근 인원을 달력에 표시하도록 했습니다. 상단에는 명단 인원, 출근 기록일, 평균 출근 인원과 출근률, 결근 누계를 요약 카드로 보여주고, 지사를 골라 따로 보거나 통합해서 볼 수 있습니다. 날짜를 고르면 작업자별 출근 · 퇴근 시간과 결근 여부를 표로 확인합니다.',
    result:
      '출입만 하면 근태가 자동으로 정리되어 따로 기록할 일이 없어졌고, 관리자는 달력 한 화면에서 한 달 출근 현황을 바로 확인합니다.',
    gallery: [{ src: '/images/mes.jpg', caption: '초기 버전 — 날짜별 출근 · 결근 인원과 작업자별 출퇴근 시간' }],
  },
  {
    slug: 'rebar-design-tool',
    category: '스마트팩토리',
    title: '철근 설계 프로그램 TOOL 개발 · 용역',
    img: '/images/rebar-tool.jpg',
    imgCaption: '부재별 재료 강도 · 철근 · 계수 입력 화면',
    imgPosition: 'top',
    tech: ['Windows 데스크톱 프로그램', '구조 계산 로직', '부재 데이터 관리'],
    summary:
      '보 같은 부재의 재료 강도와 철근 정보를 넣으면 설계 기준에 따른 계산을 바로 해주는 철근 설계 전용 프로그램을 용역으로 개발했습니다.',
    background:
      '부재마다 같은 계산식을 엑셀이나 손계산으로 반복하다 보니 시간이 오래 걸리고, 계수를 잘못 넣는 실수도 생기기 쉬웠습니다.',
    approach:
      '부재 이름과 종류를 정하고 콘크리트 강도(fck), 철근 항복강도(fy, fys), 부재 치수, 주근 · 스터럽 규격과 간격, 피복 두께, 위치 · 도막 · 경량콘크리트 계수를 입력하면 계산 버튼 한 번으로 결과가 나오게 했습니다. 부재별로 저장 · 불러오기 · 인쇄 · 검색이 되고, 여러 부재의 결과를 표로 모아 볼 수 있습니다.',
    result: '반복 계산은 프로그램이 대신하고 입력값이 부재별로 남기 때문에, 검토하고 고치기가 쉬워졌습니다.',
  },
];

export const WORK_CATEGORIES: WorkCategory[] = ['자동화 기계', '설계 · 가공', '모션 · 제어', '스마트팩토리'];

export function hasVideo(work: Work) {
  return Boolean(work.youtubeId || work.videos?.length);
}
