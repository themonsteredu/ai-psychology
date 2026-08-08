/**
 * 모든 CASE 가 공유하는 셸·활동 규칙.
 * 사례별 내용(인물·단서·대화 등)은 lib/cases/ 아래에 따로 둔다.
 */

/* ------------------------------------------------------------------ */
/* 셸: 사이드바 / 단계 네비게이션                                        */
/* ------------------------------------------------------------------ */

export const SIDEBAR_ITEMS = [
  { id: "case", label: "오늘의 CASE", icon: "case" },
  { id: "note", label: "개별 노트", icon: "note" },
  { id: "board", label: "시그널 보드", icon: "board" },
  { id: "report", label: "AI 리포트", icon: "report" },
  { id: "message", label: "새 메시지", icon: "mail", badge: "NEW" },
  { id: "strategy", label: "상담 전략", icon: "strategy" },
  { id: "career", label: "진로 리포트", icon: "career" },
];

export const STEPS = [
  { id: "intro", no: "01", label: "CASE 안내" },
  { id: "clues", no: "02", label: "단서 탐색" },
  { id: "signal", no: "03", label: "시그널 분석" },
  { id: "report", no: "04", label: "AI 리포트" },
  { id: "twist", no: "05", label: "새 메시지" },
  { id: "strategy", no: "06", label: "상담 전략" },
  { id: "result", no: "07", label: "결과 확인" },
];

/* ------------------------------------------------------------------ */
/* 02 단서 탐색 — 단서를 얻는 곳                                         */
/* ------------------------------------------------------------------ */

/*
 * 상담사는 세 군데에서 정보를 모읍니다. 한 장의 그림에서 전부 찾게 하면
 * '정지된 그림으로는 알 수 없는 것'까지 찾으라고 시키게 되므로, 단서마다
 * 어디서 온 것인지를 나눠 둡니다. 출처가 다르면 믿는 방식도 달라야 한다는
 * 것 자체가 04 AI 리포트로 이어지는 첫 수업입니다.
 */
export const CLUE_SOURCES = [
  {
    id: "scene",
    label: "장면",
    sub: "직접 관찰",
    tone: "mint",
    icon: "search",
    desc: "지금 내 눈에 보이는 것. 장면을 천천히 살펴보고 이상한 곳을 눌러 보세요.",
    trust: "내가 직접 봤으니 사실입니다. 다만 '왜 그런지'는 아직 모릅니다.",
  },
  {
    id: "record",
    label: "기록",
    sub: "학교 자료",
    tone: "blue",
    icon: "note",
    desc: "출결부·상담 신청서처럼 시간이 쌓인 자료. 한 줄씩 눌러 확인하세요.",
    trust: "하루가 아니라 '달라진 흐름'을 보여 줍니다. 숫자는 사실, 이유는 아직 아닙니다.",
  },
  {
    id: "voice",
    label: "이야기",
    sub: "주변 사람",
    tone: "lime",
    icon: "people",
    desc: "곁에 있던 사람이 알려 주는 것. 눌러서 들어 보세요.",
    trust: "전해 들은 말은 사실이 아니라 '확인할 것'입니다. 그대로 옮겨 적되, 믿지는 마세요.",
  },
];

export const getSource = (id) => CLUE_SOURCES.find((s) => s.id === id) ?? CLUE_SOURCES[0];

/* ------------------------------------------------------------------ */
/* 03 상담 대화 — 선택지 품질                                            */
/* ------------------------------------------------------------------ */

export const QUALITY_META = {
  good: { label: "좋은 반응", tone: "mint", score: 20 },
  soso: { label: "무난한 반응", tone: "blue", score: 10 },
  poor: { label: "아쉬운 반응", tone: "coral", score: 4 },
};

/* ------------------------------------------------------------------ */
/* 04 AI 리포트 — 문장 분류 기준                                         */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* 05 새로운 메시지 — 다시 판단하기 기준                                  */
/* ------------------------------------------------------------------ */

export const TWIST_VERDICTS = [
  { id: "stand", label: "그대로", tone: "blue", desc: "새 정보와 상관없이 남는 것" },
  { id: "shaken", label: "흔들림", tone: "coral", desc: "근거가 달라진 것" },
];

/* ------------------------------------------------------------------ */
/* 06 상담 전략 — 계획표 슬롯                                            */
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
    desc: "약속하고 이어 갈 일",
  },
  {
    id: "adult",
    no: "03",
    label: "어른과 함께",
    tone: "coral",
    desc: "혼자 결정하지 않고 함께할 일",
  },
];

/* ------------------------------------------------------------------ */
/* 07 결과 확인 — 역량과 진로                                            */
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
