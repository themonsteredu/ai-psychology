/**
 * CASE 01 — 민서 · 복도
 * 관찰에서 시작해, AI가 단정한 문장을 걸러내고, 새 정보로 판단을 고쳐 본다.
 * 교육용 가상 사례이며 실제 심리 진단이 아닙니다.
 */
const CASE_01 = {
  id: "case01",
  no: "01",
  title: "친구 사이, 무슨 일이 생긴 걸까?",
  lead: "관계 · 소외감",
  minutes: 25,
  cover: "/assets/scene/hallway",
  subject: { name: "민서", where: "2학년 3반", avatar: "/assets/avatar/minseo" },
  hero: "/assets/char/minseo-happy",

  eyebrow: "오늘의 미션",
  headline: { top: "친구의 마음 시그널을", accent: "발견", tail: "하라!" },
  summary:
    "쉬는 시간 복도. 늘 함께 다니던 민서가 오늘은 친구들과 조금 떨어져 있어요. 상담사가 되어 민서의 마음 시그널을 찾아봅시다.",

  /* 01·02 화면의 장면 합성 — 배경 위에 인물 컷아웃을 % 좌표로 얹는다. */
  scene: {
    bg: "/assets/scene/hallway",
    bgPosition: "52% 62%",
    figures: [
      {
        id: "friends",
        src: "/assets/char/friends-full",
        style: { left: "9%", bottom: "17%", height: "45%", aspectRatio: "3 / 4" },
      },
      {
        id: "minseo",
        src: "/assets/char/minseo-full",
        style: { right: "7%", bottom: "1%", height: "74%", aspectRatio: "374 / 1200" },
      },
    ],
  },

  /* 03 상담 대화 화면의 배경 레이어 */
  room: {
    bg: "/assets/scene/counseling-room",
    figure: {
      src: "/assets/char/minseo-talk",
      style: { left: "-3%", bottom: 0, height: "52%" },
    },
  },

  missions: [
    { id: "search", icon: "search", label: "단서 살펴보기" },
    { id: "analyze", icon: "brain", label: "시그널 분석" },
    { id: "empathy", icon: "heart", label: "마음 이해하기" },
    { id: "help", icon: "people", label: "도움 방법 찾기" },
  ],

  activityPreview: [
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
  ],

  /* ---------------- 02 단서 탐색 ---------------- */

  sceneTitle: "복도에서 마음 시그널을 찾아보세요",
  spotlightOf: { distance: "friends", friends: "friends" },

  /*
   * 장면 단서는 그림에 실제로 그려진 것만 둔다. '어제까지 달려 있던 키링'
   * 처럼 정지된 그림으로는 알 수 없는 것은 기록·이야기 쪽으로 옮겼다.
   */
  clues: [
    {
      id: "phone",
      source: "scene",
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
      source: "scene",
      label: "친구들과의 거리",
      x: 45,
      y: 74,
      kind: "관계",
      tone: "blue",
      text: "친구들은 서로 가까이 붙어 서 있는데, 민서만 복도 반대쪽에 떨어져 있어요.",
      insight: "물리적 거리는 관계의 변화를 보여주는 중요한 관찰 포인트예요.",
    },
    {
      id: "friends",
      source: "scene",
      label: "친구들의 반응",
      x: 24,
      y: 57,
      kind: "관계",
      tone: "blue",
      text: "친구들은 서로를 보며 이야기하고 있어요. 민서 쪽으로 몸을 돌린 사람은 없어요.",
      insight: "주변 사람의 행동도 함께 살펴야 상황을 정확히 이해할 수 있어요.",
    },
    {
      id: "lunchlog",
      source: "record",
      from: "2학년 3반 담임 기록",
      label: "점심시간 교실 이용 기록",
      kind: "생활",
      tone: "blue",
      text: "이번 주에 급식실 대신 교실에 남은 날이 사흘이에요. 지난달에는 한 번도 없었어요.",
      insight: "기록은 '오늘 하루'가 아니라 '달라진 흐름'을 보여 줘요. 한 번은 우연이지만 사흘은 아닙니다.",
    },
    {
      id: "survey",
      source: "record",
      from: "학기 초 교우관계 설문",
      label: "두 번 적은 설문지",
      kind: "관계",
      tone: "blue",
      text: "「고민을 이야기할 수 있는 친구」 칸에 4월에는 세 명을 적었는데, 이번 달에는 비워 뒀어요.",
      insight: "같은 질문에 대한 답이 달라진 것도 강한 신호예요. 무엇이 사라졌는지를 보세요.",
    },
    {
      id: "mate",
      source: "voice",
      who: "짝꿍 지우",
      whoNote: "같은 반 · 민서 옆자리",
      label: "짝꿍이 전해 준 말",
      kind: "소문",
      tone: "lime",
      text: "“요즘 단톡방이 하나 새로 생겼는데, 거기 민서만 없대요. 저도 들은 얘기라 확실하진 않아요.”",
      insight: "전해 들은 말은 사실이 아니라 '확인할 것'입니다. 적어는 두되, 아직 판단의 근거로 쓰면 안 돼요.",
    },
  ],

  clueHints: [
    "장면 · 기록 · 이야기 세 곳을 모두 열어 봐야 단서가 다 모여요.",
    "기록의 숫자는 사실이지만, 그 이유까지 알려 주지는 않아요.",
    "이야기에서 들은 말은 '아직 확인 안 된 것'으로 표시해 두세요.",
  ],

  /* ---------------- 03 상담 대화 ---------------- */

  dialogue: [
    {
      id: "t1",
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
  ],

  dialogueTips: [
    "감정을 먼저 알아주고, 조언은 나중에.",
    "\"왜\"보다 \"어떤 느낌이었어?\"로 물어보기.",
    "내 추측을 사실처럼 말하지 않기.",
  ],

  /* ---------------- 04 AI 리포트 ---------------- */

  report: {
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
  },

  /* ---------------- 05 새로운 메시지 ---------------- */

  twist: {
    scene: "/assets/scene/classroom",
    eyebrow: "3일 전 · 그룹 프로젝트 회의",
    title: "새로운 메시지가 도착했습니다!",
    sub: "지금까지의 생각이 바뀔 수도 있어요.",
    messages: [
      {
        id: "seohyun",
        from: "서현",
        role: "같은 조 · 2학년 3반",
        avatar: "/assets/avatar/seohyun",
        time: "오늘 16:12",
        lines: [
          "선생님, 민서 일 때문에 연락드려요. 계속 마음에 걸려서요.",
          "사실 제가 조별 과제 자료를 늦게 공유했어요. 그날 민서가 혼자 다 떠안게 됐고, 제가 먼저 예민하게 굴었어요.",
          "미안하다고 말하려다가 계속 못 했어요. 단톡방도 과제 얘기하려고 새로 판 건데, 민서를 빠뜨린 건 진짜 실수예요.",
        ],
        attachment: {
          name: "조별과제_역할표.png",
          size: "1.2 MB",
          note: "역할표에 민서 이름만 두 칸에 적혀 있어요.",
        },
      },
      {
        id: "junho",
        from: "준호",
        role: "같은 조",
        avatar: "/assets/avatar/friend-boy",
        time: "오늘 16:40",
        lines: [
          "저도 서현이가 말한 거 맞아요. 민서한테 미안한데 어떻게 말해야 할지 몰랐어요.",
        ],
      },
    ],
    checks: [
      {
        id: "c1",
        text: "민서는 복도에서 친구들과 두세 걸음 떨어져 혼자 서 있었다.",
        answer: "stand",
        why: "직접 관찰한 장면이에요. 새 메시지가 와도 본 것은 그대로 남습니다.",
      },
      {
        id: "c2",
        text: "친구들이 민서를 일부러 빼놓았다.",
        answer: "shaken",
        why: "서현이는 실수였다고 말합니다. 같은 행동도 이유가 다를 수 있어요.",
      },
      {
        id: "c3",
        text: "민서는 단톡방이 생긴 뒤부터 외로움을 느꼈다.",
        answer: "stand",
        why: "민서가 직접 말한 감정이에요. 다른 사람의 사정이 밝혀져도 민서의 마음은 진짜입니다.",
      },
      {
        id: "c4",
        text: "민서가 예민해서 생긴 오해다.",
        answer: "shaken",
        why: "원인은 민서에게 있지 않았어요. 한쪽만 탓하는 설명은 거의 틀립니다.",
      },
    ],
    lesson:
      "새 정보는 사실을 지우지 않아요. 대신 추측을 흔듭니다. 상담사는 결론을 내린 뒤에도 계속 다시 확인해요.",
  },

  /* ---------------- 06 상담 전략 ---------------- */

  planTitle: "민서를 위한 상담 계획",

  helpCards: [
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
  ],
};

export default CASE_01;
