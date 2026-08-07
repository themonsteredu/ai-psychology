/**
 * CASE 01 데이터 — 화면 컴포넌트가 참조하는 단일 소스.
 * 교육용 가상 사례이며 실제 심리 진단이 아닙니다.
 */

/* ------------------------------------------------------------------ */
/* 셸: 사이드바 / 단계 네비게이션                                        */
/* ------------------------------------------------------------------ */

export const SIDEBAR_ITEMS = [
  { id: "case", label: "오늘의 CASE", icon: "case", badge: "01" },
  { id: "note", label: "개별 노트", icon: "note" },
  { id: "board", label: "시그널 보드", icon: "board" },
  { id: "report", label: "AI 리포트", icon: "report" },
  { id: "strategy", label: "상담 전략", icon: "strategy" },
  { id: "career", label: "진로 리포트", icon: "career" },
];

export const STEPS = [
  { id: "intro", no: "01", label: "CASE 안내" },
  { id: "clues", no: "02", label: "단서 탐색" },
  { id: "signal", no: "03", label: "시그널 분석" },
  { id: "report", no: "04", label: "AI 리포트" },
  { id: "strategy", no: "05", label: "상담 전략" },
  { id: "result", no: "06", label: "결과 확인" },
];

/* ------------------------------------------------------------------ */
/* 화면 1 — CASE 안내                                                   */
/* ------------------------------------------------------------------ */

export const CASE_META = {
  code: "CASE 01",
  sceneTitle: "친구 사이, 무슨 일이 생긴 걸까?",
  headlineTop: "친구의 마음 시그널을",
  headlineAccent: "발견",
  headlineTail: "하라!",
  eyebrow: "오늘의 미션",
  summary:
    "쉬는 시간 복도. 늘 함께 다니던 민서가 오늘은 친구들과 조금 떨어져 있어요. 상담사가 되어 민서의 마음 시그널을 찾아봅시다.",
};

export const MISSION_STEPS = [
  { id: "search", icon: "search", label: "단서 살펴보기", state: "active" },
  { id: "analyze", icon: "brain", label: "시그널 분석", state: "todo" },
  { id: "empathy", icon: "heart", label: "마음 이해하기", state: "todo" },
  { id: "help", icon: "people", label: "도움 방법 찾기", state: "todo" },
];

export const ACTIVITY_PREVIEW = [
  {
    id: "clue",
    icon: "chat",
    label: "상담 단서",
    tone: "mint",
    desc: "복도 장면에서 마음의 신호를 찾아요",
  },
  {
    id: "ai",
    icon: "pulse",
    label: "AI 시그널 분석",
    tone: "blue",
    desc: "AI 분석을 사실과 추측으로 나눠요",
  },
  {
    id: "plan",
    icon: "heart",
    label: "상담 전략 선택",
    tone: "coral",
    desc: "민서에게 맞는 도움을 골라요",
  },
];

/* ------------------------------------------------------------------ */
/* 화면 2 — 단서 탐색                                                   */
/* ------------------------------------------------------------------ */

export const CLUES = [
  {
    id: "phone",
    label: "휴대폰만 보는 민서",
    x: 68,
    y: 52,
    kind: "행동",
    tone: "mint",
    text: "민서는 친구들 쪽을 보지 않고 계속 휴대폰 화면만 내려다보고 있어요.",
    insight: "혼자 있는 시간을 늘리는 건 마음이 불편하다는 신호일 수 있어요.",
  },
  {
    id: "distance",
    label: "친구들과의 거리",
    x: 33,
    y: 60,
    kind: "관계",
    tone: "blue",
    text: "늘 넷이 함께 다니던 무리에서 민서만 두세 걸음 떨어져 서 있어요.",
    insight: "물리적 거리는 관계의 변화를 보여주는 중요한 관찰 포인트예요.",
  },
  {
    id: "face",
    label: "굳어 있는 표정",
    x: 70,
    y: 27,
    kind: "감정",
    tone: "coral",
    text: "눈썹이 살짝 처지고 입꼬리에 힘이 빠져 있어요. 웃음소리에도 반응이 없어요.",
    insight: "표정은 말보다 먼저 나오는 감정 시그널이에요.",
  },
  {
    id: "bag",
    label: "정리되지 않은 가방",
    x: 82,
    y: 46,
    kind: "생활",
    tone: "lime",
    text: "가방 지퍼가 열린 채로 있고, 어제까지 달려 있던 커플 키링이 하나만 남아 있어요.",
    insight: "평소와 달라진 작은 습관도 단서가 됩니다.",
  },
  {
    id: "friends",
    label: "친구들의 반응",
    x: 30,
    y: 33,
    kind: "관계",
    tone: "blue",
    text: "친구들은 즐겁게 이야기하지만 민서를 대화에 부르지는 않아요.",
    insight: "주변 사람의 행동도 함께 살펴야 상황을 정확히 이해할 수 있어요.",
  },
];

export const CLUE_HINTS = [
  "표정, 자세, 거리처럼 '눈에 보이는 것'부터 적어 보세요.",
  "내 추측과 실제로 본 사실을 꼭 구분해서 기록하세요.",
  "단서 5개를 모두 모으면 민서와 대화를 시작할 수 있어요.",
];

/* ------------------------------------------------------------------ */
/* 화면 3 — 상담 대화                                                   */
/* ------------------------------------------------------------------ */

/**
 * 각 턴: 민서의 말 → 상담사(학생)의 선택지 3개.
 * quality: good(공감·개방질문) / soso(무난) / poor(단정·조언 위주)
 */
export const DIALOGUE = [
  {
    id: "t1",
    from: "민서",
    text: "안녕하세요… 상담실은 처음이라 좀 어색하네요.",
    sub: "민서가 문 앞에서 머뭇거리며 들어옵니다.",
    options: [
      {
        id: "t1a",
        text: "와 줘서 고마워. 편한 자리에 앉아도 괜찮아.",
        quality: "good",
        feedback: "안전한 분위기를 먼저 만들어 주었어요. 상담의 첫 단계는 신뢰 쌓기예요.",
        reply: "네… 고맙습니다. 조금 긴장했었는데 괜찮아졌어요.",
      },
      {
        id: "t1b",
        text: "무슨 일 때문에 왔는지 바로 말해 줄래?",
        quality: "poor",
        feedback: "본론부터 물으면 마음을 닫을 수 있어요. 먼저 편안하게 해 주세요.",
        reply: "아… 그게, 별일 아닌데 괜히 온 것 같아요.",
      },
      {
        id: "t1c",
        text: "괜찮아. 여기 오는 친구들 다 처음엔 어색해해.",
        quality: "soso",
        feedback: "안심시키는 말이지만, 민서 자신의 이야기로는 아직 이어지지 않았어요.",
        reply: "그렇구나… 조금 낫네요.",
      },
    ],
  },
  {
    id: "t2",
    from: "민서",
    text: "요즘 친구들이랑 좀… 잘 모르겠어요. 저만 빠진 것 같기도 하고.",
    sub: "손으로 소매 끝을 만지작거립니다.",
    options: [
      {
        id: "t2a",
        text: "'저만 빠진 것 같다'는 게 민서한테 어떤 느낌이었어?",
        quality: "good",
        feedback: "민서가 쓴 표현을 그대로 되돌려 준 좋은 개방형 질문이에요.",
        reply: "음… 다 같이 웃는데 저만 밖에 서 있는 느낌이요. 좀 외로웠어요.",
      },
      {
        id: "t2b",
        text: "그건 오해일 거야. 친구들이 일부러 그러진 않았을걸.",
        quality: "poor",
        feedback: "감정을 부정하면 대화가 멈춰요. 먼저 있는 그대로 들어 주세요.",
        reply: "…네, 그렇겠죠. 제가 예민한 거겠죠.",
      },
      {
        id: "t2c",
        text: "언제부터 그런 느낌이 들었어?",
        quality: "soso",
        feedback: "사실 확인에는 좋지만, 감정을 먼저 받아 주면 더 깊이 이야기해요.",
        reply: "한 2주쯤 됐어요. 단톡방이 하나 더 생긴 뒤부터요.",
      },
    ],
  },
  {
    id: "t3",
    from: "민서",
    text: "사실 어제는 저만 빼고 다 같이 사진을 올렸더라고요.",
    sub: "목소리가 조금 작아집니다.",
    options: [
      {
        id: "t3a",
        text: "그걸 봤을 때 마음이 많이 무거웠겠다.",
        quality: "good",
        feedback: "감정을 정확히 읽어 주는 '반영'이에요. 민서가 더 솔직해집니다.",
        reply: "네… 사실 그날 밤에 좀 울었어요. 누구한테도 말 안 했는데.",
      },
      {
        id: "t3b",
        text: "그럼 민서가 먼저 연락해 보는 건 어때?",
        quality: "poor",
        feedback: "너무 이른 조언이에요. 해결책보다 마음을 먼저 들어 주세요.",
        reply: "…해 봤는데 답이 늦어서요. 그냥 제가 알아서 할게요.",
      },
      {
        id: "t3c",
        text: "그 사진을 보고 어떤 생각이 들었어?",
        quality: "soso",
        feedback: "생각을 묻는 것도 좋지만, 지금은 감정을 먼저 알아주면 더 좋아요.",
        reply: "그냥… 제가 필요 없나 보다 싶었어요.",
      },
    ],
  },
];

export const QUALITY_META = {
  good: { label: "좋은 반응", tone: "mint", score: 20 },
  soso: { label: "무난한 반응", tone: "blue", score: 10 },
  poor: { label: "아쉬운 반응", tone: "coral", score: 4 },
};
