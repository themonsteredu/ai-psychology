/**
 * 마음 SIGNAL LAB 아이콘 세트
 * 시안의 얇은 라인 아이콘 톤에 맞춘 stroke 기반 SVG 컴포넌트.
 * 색은 항상 currentColor 를 따르므로 부모에서 color 로 제어한다.
 */

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

function Svg({ children, size = 24, strokeWidth, ...rest }) {
  return (
    <svg
      {...base}
      strokeWidth={strokeWidth ?? base.strokeWidth}
      width={size}
      height={size}
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---------- 사이드바 ---------- */

export function IconCase(props) {
  return (
    <Svg {...props}>
      <path d="M3.6 10.4 12 3.8l8.4 6.6" />
      <path d="M5.6 9.4V19a1 1 0 0 0 1 1h10.8a1 1 0 0 0 1-1V9.4" />
      <path d="M9.8 20v-5.2h4.4V20" />
    </Svg>
  );
}

export function IconNote(props) {
  return (
    <Svg {...props}>
      <path d="M6.2 3.6h7l4.6 4.6V19a1.4 1.4 0 0 1-1.4 1.4H6.2A1.4 1.4 0 0 1 4.8 19V5a1.4 1.4 0 0 1 1.4-1.4Z" />
      <path d="M13.2 3.8v4.6h4.4" />
      <path d="M8.2 13h7.2M8.2 16.4h5" />
    </Svg>
  );
}

export function IconBoard(props) {
  return (
    <Svg {...props}>
      <rect x="3.6" y="4.2" width="7" height="7" rx="1.8" />
      <rect x="13.4" y="4.2" width="7" height="7" rx="1.8" />
      <rect x="3.6" y="12.8" width="7" height="7" rx="1.8" />
      <path d="M14.2 16.3h5.6M17 13.5v5.6" />
    </Svg>
  );
}

export function IconReport(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="3.8" width="16" height="16.4" rx="2.6" />
      <path d="M8.2 15.6v-3M12 15.6V9.4M15.8 15.6v-4.6" />
    </Svg>
  );
}

export function IconStrategy(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="7.6" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 1.8v2.6M12 19.6v2.6M22.2 12h-2.6M4.4 12H1.8" />
    </Svg>
  );
}

export function IconCareer(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M15.4 8.6 13.6 13.6 8.6 15.4l1.8-5Z" />
    </Svg>
  );
}

/* ---------- 상단바 ---------- */

export function IconFlame(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.2s4.6 3.6 4.6 7.8a4.6 4.6 0 0 1-9.2 0c0-1.4.5-2.6 1.2-3.5.3 1 .9 1.7 1.7 2 .3-2.4.9-4.4 1.7-6.3Z" />
      <path d="M12 20.6a3 3 0 0 1-3-3c0-1.6 1.4-2.6 3-4.6 1.6 2 3 3 3 4.6a3 3 0 0 1-3 3Z" />
    </Svg>
  );
}

export function IconBell(props) {
  return (
    <Svg {...props}>
      <path d="M18 15.4V10.6a6 6 0 1 0-12 0v4.8l-1.4 2.2h14.8Z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </Svg>
  );
}

export function IconChevronDown(props) {
  return (
    <Svg {...props}>
      <path d="m6.6 9.4 5.4 5.2 5.4-5.2" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M4.8 12h13.4M12.8 6.4 18.4 12l-5.6 5.6" />
    </Svg>
  );
}

export function IconSparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 3.4 13.7 9l5.6 1.7-5.6 1.7L12 18l-1.7-5.6L4.7 10.7 10.3 9Z" />
      <path d="M18.6 3.4v3M20.1 4.9h-3" />
    </Svg>
  );
}

export function IconStar(props) {
  return (
    <Svg {...props}>
      <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L4.2 9.7l5.4-.8Z" />
    </Svg>
  );
}

/* ---------- 미션 / 활동 ---------- */

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.4" />
      <path d="m15.8 15.8 4 4" />
    </Svg>
  );
}

export function IconBrain(props) {
  return (
    <Svg {...props}>
      <path d="M12 5.2v13.6" />
      <path d="M12 6.4a2.8 2.8 0 0 0-5.2-1.2 2.5 2.5 0 0 0-2 3.4 2.7 2.7 0 0 0-.2 4.6 2.8 2.8 0 0 0 1.9 4 2.7 2.7 0 0 0 5.5.2" />
      <path d="M12 6.4a2.8 2.8 0 0 1 5.2-1.2 2.5 2.5 0 0 1 2 3.4 2.7 2.7 0 0 1 .2 4.6 2.8 2.8 0 0 1-1.9 4 2.7 2.7 0 0 1-5.5.2" />
    </Svg>
  );
}

export function IconHeart(props) {
  return (
    <Svg {...props}>
      <path d="M12 19.6S4.2 15 4.2 9.9a4.1 4.1 0 0 1 7.8-1.8 4.1 4.1 0 0 1 7.8 1.8c0 5.1-7.8 9.7-7.8 9.7Z" />
    </Svg>
  );
}

export function IconPeople(props) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="8.4" r="3.4" />
      <path d="M3.8 19.6a6.2 6.2 0 0 1 12.4 0" />
      <path d="M16.6 6a3.2 3.2 0 0 1 0 6.2" />
      <path d="M18.4 14.6a5.6 5.6 0 0 1 3.4 5" />
    </Svg>
  );
}

export function IconChat(props) {
  return (
    <Svg {...props}>
      <path d="M20 12.6c0 3.6-3.6 6.5-8 6.5a9.6 9.6 0 0 1-2.6-.35L4.6 20.2l1.1-3.4A6.2 6.2 0 0 1 4 12.6C4 9 7.6 6.1 12 6.1s8 2.9 8 6.5Z" />
    </Svg>
  );
}

export function IconPulse(props) {
  return (
    <Svg {...props}>
      <path d="M2.8 12.4h4L8.6 8l3 9 2.4-6.2 1.6 3.6h5.6" />
    </Svg>
  );
}

export function IconLock(props) {
  return (
    <Svg {...props}>
      <rect x="4.8" y="10.4" width="14.4" height="9.4" rx="2.4" />
      <path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="m5.4 12.6 4.2 4.2 9-9.6" />
    </Svg>
  );
}

export function IconSend(props) {
  return (
    <Svg {...props}>
      <path d="M20.4 3.6 3.8 10.2l6.6 2.8 2.8 6.6Z" />
      <path d="m10.4 13 4.4-4.4" />
    </Svg>
  );
}

export function IconBulb(props) {
  return (
    <Svg {...props}>
      <path d="M9.4 17.8a5.8 5.8 0 1 1 5.2 0v1.6a1.4 1.4 0 0 1-1.4 1.4h-2.4a1.4 1.4 0 0 1-1.4-1.4Z" />
      <path d="M9.6 18.6h4.8" />
    </Svg>
  );
}
