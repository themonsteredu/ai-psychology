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
    x: 71,
    y: 43,
    flip: true,
    kind: "행동",
    tone: "mint",
    text: "민서는 친구들 쪽을 보지 않고 계속 휴대폰 화면만 내려다보고 있어요.",
    insight: "혼자 있는 시간을 늘리는 건 마음이 불편하다는 신호일 수 있어요.",
  },
  {
    id: "distance",
    label: "친구들과의 거리",
    x: 45,
    y: 74,
    kind: "관계",
    tone: "blue",
    text: "늘 넷이 함께 다니던 무리에서 민서만 두세 걸음 떨어져 서 있어요.",
    insight: "물리적 거리는 관계의 변화를 보여주는 중요한 관찰 포인트예요.",
  },
  {
    id: "face",
    label: "굳어 있는 표정",
    x: 81,
    y: 35,
    flip: true,
    kind: "감정",
    tone: "coral",
    text: "눈썹이 살짝 처지고 입꼬리에 힘이 빠져 있어요. 웃음소리에도 반응이 없어요.",
    insight: "표정은 말보다 먼저 나오는 감정 시그널이에요.",
  },
  {
    id: "bag",
    label: "정리되지 않은 가방",
    x: 88,
    y: 47,
    flip: true,
    kind: "생활",
    tone: "lime",
    text: "가방 지퍼가 열린 채로 있고, 어제까지 달려 있던 커플 키링이 하나만 남아 있어요.",
    insight: "평소와 달라진 작은 습관도 단서가 됩니다.",
  },
  {
    id: "friends",
    label: "친구들의 반응",
    x: 24,
    y: 57,
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

/* ------------------------------------------------------------------ */
/* 화면 4 — AI 리포트 검토                                              */
/* ------------------------------------------------------------------ */

/**
 * AI가 쓴 리포트 문장을 세 가지로 분류하는 활동.
 * fact      — 관찰·대화에서 직접 확인한 사실
 * inference — 사실에서 끌어낸 추론 (단정하지 않음)
 * check     — 근거가 부족해 상담사가 더 확인해야 하는 문장
 */
export const REPORT_TAGS = [
  {
    id: "fact",
    label: "사실",
    sub: "Fact",
    tone: "blue",
    desc: "직접 보거나 들은 내용",
  },
  {
    id: "inference",
    label: "추론",
    sub: "Inference",
    tone: "mint",
    desc: "사실에서 끌어낸 짐작",
  },
  {
    id: "check",
    label: "더 확인",
    sub: "Check",
    tone: "coral",
    desc: "근거가 부족한 내용",
  },
];

export const AI_REPORT = {
  title: "AI 상담 리포트",
  meta: "CASE 01 · 자동 생성 초안",
  intro:
    "상담사님이 모은 단서와 대화를 AI가 정리했어요. 그대로 믿지 말고 한 문장씩 확인해 주세요.",
  lines: [
    {
      id: "r1",
      text: "민서는 쉬는 시간 복도에서 친구들과 두세 걸음 떨어져 혼자 서 있었습니다.",
      answer: "fact",
      why: "단서 탐색에서 직접 관찰한 장면이에요. 본 것을 그대로 적은 문장입니다.",
    },
    {
      id: "r2",
      text: "민서는 상담 중 “저만 빠진 것 같다”고 직접 말했습니다.",
      answer: "fact",
      why: "민서가 자기 입으로 한 말이라 사실로 기록할 수 있어요.",
    },
    {
      id: "r3",
      text: "표정이 굳어 있는 것으로 보아 마음이 불편했을 수 있습니다.",
      answer: "inference",
      why: "“~일 수 있다”로 열어 둔 짐작이에요. 관찰에서 나온 합리적인 추론입니다.",
    },
    {
      id: "r4",
      text: "따라서 민서는 친구들에게 따돌림을 당하고 있습니다.",
      answer: "check",
      why: "짐작을 사실처럼 단정했어요. 친구들 이야기를 듣기 전에는 쓸 수 없는 문장입니다.",
    },
    {
      id: "r5",
      text: "민서는 2주 전 새 단톡방이 생긴 뒤부터 그런 느낌이 들었다고 말했습니다.",
      answer: "fact",
      why: "대화에서 민서가 시점을 직접 알려 준 내용이에요.",
    },
    {
      id: "r6",
      text: "혼자 있는 시간이 늘어난 것은 마음이 힘들다는 신호일 수 있습니다.",
      answer: "inference",
      why: "행동 변화에서 마음을 짐작한 문장이에요. 단정하지 않아 추론으로 볼 수 있어요.",
    },
    {
      id: "r7",
      text: "민서는 우울증 초기 단계로 보입니다.",
      answer: "check",
      why: "진단은 AI도 상담사도 함부로 내릴 수 없어요. 전문가의 영역입니다.",
    },
    {
      id: "r8",
      text: "친구들이 일부러 제외했을 가능성이 있으나, 친구들의 이야기는 아직 듣지 못했습니다.",
      answer: "check",
      why: "한쪽 이야기만 들은 상태예요. 판단을 미루고 더 확인해야 합니다.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 화면 5 — 상담 전략                                                   */
/* ------------------------------------------------------------------ */

export const PLAN_SLOTS = [
  {
    id: "now",
    no: "01",
    label: "오늘 바로",
    tone: "mint",
    desc: "지금 상담실에서 할 수 있는 일",
  },
  {
    id: "week",
    no: "02",
    label: "이번 주 안에",
    tone: "blue",
    desc: "민서와 약속하고 이어 갈 일",
  },
  {
    id: "adult",
    no: "03",
    label: "어른과 함께",
    tone: "coral",
    desc: "혼자 결정하지 않고 함께할 일",
  },
];

export const HELP_CARDS = [
  {
    id: "listen",
    icon: "chat",
    title: "한 번 더 들어주기",
    desc: "판단하지 않고 민서의 이야기를 끝까지 듣기",
    recommend: "now",
    why: "마음이 열린 지금이 가장 좋은 때예요. 오늘 바로 할 수 있는 일입니다.",
  },
  {
    id: "feeling",
    icon: "heart",
    title: "감정에 이름 붙여주기",
    desc: "“외로웠구나”처럼 감정을 정확히 되돌려 주기",
    recommend: "now",
    why: "감정을 알아주는 건 오늘 바로 해야 할 일이에요. 미루면 효과가 줄어요.",
  },
  {
    id: "safety",
    icon: "people",
    title: "힘들 때 연락할 사람 정하기",
    desc: "혼자 버티지 않도록 안전망을 함께 만들기",
    recommend: "week",
    why: "오늘 급하게 정하기보다, 민서가 생각해 보고 함께 정하는 게 좋아요.",
  },
  {
    id: "step",
    icon: "sparkle",
    title: "작은 시도 하나 정하기",
    desc: "민서가 할 수 있는 아주 작은 행동 한 가지 정하기",
    recommend: "week",
    why: "이번 주 안에 해 볼 만한 작은 목표예요. 너무 큰 과제는 부담이 됩니다.",
  },
  {
    id: "teacher",
    icon: "case",
    title: "담임 선생님과 상황 공유",
    desc: "민서 동의를 얻고 학교 안 지원을 연결하기",
    recommend: "adult",
    why: "상담사 혼자 결정할 일이 아니에요. 반드시 어른과 함께 움직여야 합니다.",
  },
  {
    id: "friends",
    icon: "search",
    title: "친구들 이야기도 들어보기",
    desc: "한쪽 이야기만으로 판단하지 않기",
    recommend: "adult",
    why: "민서가 다칠 수 있어 조심해야 해요. 선생님과 상의한 뒤에 진행합니다.",
  },
];

/* ------------------------------------------------------------------ */
/* 화면 6 — 결과 확인 · 진로 리포트                                      */
/* ------------------------------------------------------------------ */

export const COMPETENCIES = [
  {
    id: "empathy",
    label: "공감력",
    tone: "coral",
    desc: "상대의 감정을 알아주고 되돌려 주는 힘",
  },
  {
    id: "observation",
    label: "관찰력",
    tone: "mint",
    desc: "말보다 먼저 나오는 신호를 알아채는 힘",
  },
  {
    id: "question",
    label: "질문력",
    tone: "blue",
    desc: "마음이 열리는 질문을 고르는 힘",
  },
  {
    id: "judgment",
    label: "판단력",
    tone: "lime",
    desc: "지금 할 일과 미룰 일을 나누는 힘",
  },
  {
    id: "ai",
    label: "AI 리터러시",
    tone: "blue",
    desc: "AI의 말을 사실과 추측으로 나눠 보는 힘",
  },
];

export const CAREERS = [
  {
    id: "youth-counselor",
    name: "청소년 상담사",
    image: "/assets/career/youth-counselor",
    tone: "mint",
    desc: "학교 밖 상담센터에서 청소년의 고민을 함께 풀어 갑니다.",
    skill: "공감력 · 관찰력",
  },
  {
    id: "school-counselor",
    name: "학교 상담교사",
    image: "/assets/career/school-counselor",
    tone: "blue",
    desc: "학교 안에서 학생·교사·보호자를 잇는 상담을 맡습니다.",
    skill: "질문력 · 판단력",
  },
  {
    id: "ux-researcher",
    name: "UX 리서처",
    image: "/assets/career/ux-researcher",
    tone: "lime",
    desc: "사람의 행동을 관찰하고 인터뷰해 더 나은 서비스를 설계합니다.",
    skill: "관찰력 · 질문력",
  },
  {
    id: "ai-planner",
    name: "사람 중심 AI 기획자",
    image: "/assets/career/ai-planner",
    tone: "coral",
    desc: "AI가 사람을 해치지 않도록 기준을 세우고 서비스를 기획합니다.",
    skill: "AI 리터러시 · 판단력",
  },
];
