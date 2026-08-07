/**
 * 학교 복도 장면 — 웹툰풍 벡터 일러스트레이션
 *
 * 시안의 "햇빛 드는 학교 복도 / 대화 중인 친구 3명 / 혼자 휴대폰을 보는 민서"
 * 구도를 DOM(SVG)으로 직접 그린 컴포넌트입니다. 스크린샷을 깔지 않습니다.
 *
 * - 1점 투시(소실점 약 300,330) 기준의 복도
 * - 오른쪽 창에서 들어오는 따뜻한 햇빛
 * - 배경: 즐겁게 대화하는 친구 3명
 * - 전경 우측: 무리에서 떨어져 휴대폰만 보는 민서
 *
 * props.spotlight  — 특정 인물을 강조(단서 탐색 화면에서 사용)
 * props.children   — 장면 위에 얹을 핫스팟/오버레이 (SVG 좌표계 아님, 부모가 배치)
 */

export default function HallwayScene({ className, spotlight = null, title = "햇빛이 드는 학교 복도. 친구 세 명이 이야기를 나누고, 민서는 조금 떨어진 곳에서 혼자 휴대폰을 보고 있다." }) {
  const dim = (who) => (spotlight && spotlight !== who ? 0.72 : 1);

  return (
    <svg
      className={className}
      viewBox="0 0 620 720"
      preserveAspectRatio="xMidYMin slice"
      role="img"
      aria-label={title}
    >
      <defs>
        {/* ---------- 그라디언트 ---------- */}
        <linearGradient id="hsCeiling" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfebf7" />
        </linearGradient>
        <linearGradient id="hsWallL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e6eef7" />
          <stop offset="1" stopColor="#f6fafd" />
        </linearGradient>
        <linearGradient id="hsWallLBase" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cfdcea" />
          <stop offset="1" stopColor="#e3ecf5" />
        </linearGradient>
        <linearGradient id="hsFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0ece2" />
          <stop offset="0.45" stopColor="#e6dfd1" />
          <stop offset="1" stopColor="#cfc6b4" />
        </linearGradient>
        <linearGradient id="hsGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e4f4ff" />
          <stop offset="1" stopColor="#c9e7fb" />
        </linearGradient>
        <linearGradient id="hsFarLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dff1ff" />
        </linearGradient>
        <linearGradient id="hsSun" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff6d9" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff6d9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hsBlazer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#31477a" />
          <stop offset="1" stopColor="#1e2f57" />
        </linearGradient>
        <linearGradient id="hsSkirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3d69" />
          <stop offset="1" stopColor="#18264a" />
        </linearGradient>
        <linearGradient id="hsHair" x1="0.2" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#3c3d55" />
          <stop offset="0.55" stopColor="#2b2c40" />
          <stop offset="1" stopColor="#1f2032" />
        </linearGradient>
        <radialGradient id="hsVignette" cx="0.5" cy="0.42" r="0.78">
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#22406e" stopOpacity="0.22" />
        </radialGradient>
        <radialGradient id="hsGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffdf2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fffdf2" stopOpacity="0" />
        </radialGradient>

        {/* ---------- 마스크 / 클립 ---------- */}
        <clipPath id="hsFrame">
          <rect x="0" y="0" width="620" height="720" rx="0" />
        </clipPath>
        <filter id="hsSoft" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id="hsSoftSm" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id="hsCastShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#2a3f63" floodOpacity="0.22" />
        </filter>
      </defs>

      <g clipPath="url(#hsFrame)">
        {/* =========================================================
            복도 구조 (1점 투시)
           ========================================================= */}
        <rect width="620" height="720" fill="#eaf2fa" />

        {/* 천장 */}
        <polygon points="0,0 620,0 390,236 230,236" fill="url(#hsCeiling)" />
        {/* 천장 등 (원근에 따라 줄어듦) */}
        <g fill="#ffffff">
          <polygon points="248,214 372,214 366,226 254,226" opacity="0.95" />
          <polygon points="230,166 390,166 381,184 239,184" opacity="0.95" />
          <polygon points="202,96 418,96 405,122 215,122" opacity="0.95" />
          <polygon points="160,0 460,0 442,36 178,36" opacity="0.95" />
        </g>
        <g fill="#fff8e2" filter="url(#hsSoft)" opacity="0.75">
          <ellipse cx="310" cy="222" rx="66" ry="9" />
          <ellipse cx="310" cy="176" rx="86" ry="12" />
          <ellipse cx="310" cy="110" rx="118" ry="17" />
          <ellipse cx="310" cy="22" rx="158" ry="22" />
        </g>

        {/* 왼쪽 벽 */}
        <polygon points="0,0 230,236 230,432 0,720" fill="url(#hsWallL)" />
        {/* 왼쪽 벽 하단 걸레받이 패널 */}
        <polygon points="0,720 230,432 230,462 0,720" fill="url(#hsWallLBase)" />
        <polyline points="0,720 230,432" fill="none" stroke="#b6c6d8" strokeWidth="2" />

        {/* 왼쪽 교실 문 / 창 (원근) */}
        <g>
          {/* 먼 쪽 문 */}
          <polygon points="196,262 230,266 230,404 196,412" fill="#dbe6f1" />
          <polygon points="200,272 226,275 226,336 200,341" fill="url(#hsGlass)" opacity="0.9" />
          {/* 중간 문 */}
          <polygon points="112,214 190,262 190,414 112,470" fill="#e2ecf6" />
          <polygon points="120,232 184,272 184,344 120,356" fill="url(#hsGlass)" opacity="0.9" />
          <rect x="150" y="360" width="6" height="16" rx="3" fill="#9fb3c8" />
          {/* 앞쪽 문 */}
          <polygon points="0,116 104,208 104,478 0,600" fill="#e8f1f9" />
          <polygon points="10,148 96,222 96,340 10,356" fill="url(#hsGlass)" opacity="0.85" />
          <rect x="78" y="368" width="8" height="22" rx="4" fill="#9fb3c8" />
        </g>

        {/* 교실 안내판 "2학년 3반" */}
        <g transform="translate(24 168) skewY(20)">
          <rect width="66" height="30" rx="6" fill="#2f6fbf" />
          <rect x="6" y="7" width="54" height="5" rx="2.5" fill="#eaf4ff" opacity="0.95" />
          <rect x="6" y="17" width="36" height="5" rx="2.5" fill="#eaf4ff" opacity="0.7" />
        </g>

        {/* 오른쪽 창문 벽 */}
        <polygon points="620,0 390,236 390,432 620,720" fill="#f4f9fd" />
        {/* 창 프레임 + 유리 (원근) */}
        <g>
          <polygon points="390,252 424,244 424,414 390,420" fill="url(#hsGlass)" />
          <polygon points="432,242 508,224 508,436 432,418" fill="url(#hsGlass)" />
          <polygon points="516,222 620,196 620,470 516,438" fill="url(#hsGlass)" />
          {/* 창틀 */}
          <g fill="#c3d5e4">
            <polygon points="424,244 432,242 432,418 424,414" />
            <polygon points="508,224 516,222 516,438 508,436" />
            <polygon points="390,236 620,190 620,204 390,250" />
            <polygon points="390,420 620,468 620,482 390,434" />
          </g>
          {/* 창밖 나무 실루엣 */}
          <g opacity="0.5" filter="url(#hsSoft)">
            <ellipse cx="470" cy="340" rx="46" ry="40" fill="#a7d6a1" />
            <ellipse cx="566" cy="316" rx="60" ry="52" fill="#8fcb92" />
            <rect x="556" y="356" width="14" height="80" fill="#b39a7c" />
          </g>
          {/* 유리 반사 하이라이트 */}
          <g fill="#ffffff" opacity="0.55">
            <polygon points="440,250 470,244 436,414 432,414" />
            <polygon points="524,232 552,226 512,436 508,435" />
          </g>
        </g>
        {/* 창가 난간 */}
        <polyline points="390,432 620,478" fill="none" stroke="#cbdae7" strokeWidth="9" strokeLinecap="round" />

        {/* 복도 끝 (밝게 날아간 광원) */}
        <rect x="230" y="236" width="160" height="196" fill="url(#hsFarLight)" />
        <rect x="252" y="256" width="116" height="176" rx="4" fill="#ffffff" opacity="0.92" />
        <ellipse cx="310" cy="330" rx="120" ry="120" fill="url(#hsGlow)" />

        {/* 바닥 */}
        <polygon points="0,720 230,432 390,432 620,720" fill="url(#hsFloor)" />
        {/* 바닥 원근 라인 */}
        <g stroke="#b7ab97" strokeOpacity="0.34" strokeWidth="2" fill="none">
          <path d="M230 432 0 596" />
          <path d="M262 432 96 720" />
          <path d="M310 432 310 720" />
          <path d="M358 432 524 720" />
          <path d="M390 432 620 596" />
          <path d="M186 486 434 486" strokeOpacity="0.2" />
          <path d="M124 556 496 556" strokeOpacity="0.18" />
          <path d="M40 646 580 646" strokeOpacity="0.16" />
        </g>

        {/* 창에서 들어오는 햇빛 기둥 */}
        <g opacity="0.62">
          <polygon points="620,150 620,330 236,720 44,720" fill="url(#hsSun)" />
          <polygon points="530,206 566,200 300,720 190,720" fill="#fff8e0" opacity="0.5" />
          <polygon points="440,240 458,236 214,720 154,720" fill="#fff8e0" opacity="0.35" />
        </g>

        {/* =========================================================
            배경 인물 — 대화 중인 친구 3명
            그리는 순서: 다리 → 몸 → 팔 → 목 → 뒷머리 → 얼굴 → 앞머리 → 이목구비
           ========================================================= */}
        <g opacity={dim("friends")} style={{ transition: "opacity .35s ease" }}>
          <g fill="#8d99a8" opacity="0.24" filter="url(#hsSoftSm)">
            <ellipse cx="106" cy="596" rx="38" ry="8" />
            <ellipse cx="174" cy="602" rx="36" ry="8" />
            <ellipse cx="240" cy="598" rx="35" ry="8" />
          </g>

          {/* --- 남학생 (왼쪽) --- */}
          <g transform="translate(76 306)">
            {/* 가방 (등 뒤로 살짝) */}
            <path d="M2 74c-11 1-17 9-17 20v40c0 11 6 17 17 17h6V74Z" fill="#8e9cb3" />
            <path d="M2 74c-11 1-17 9-17 20v10h23V74Z" fill="#9eabc0" />
            {/* 다리 (교복 바지) */}
            <path d="M12 168h24l-2 100H12Z" fill="#3f4c66" />
            <path d="M38 168h24l3 100H40Z" fill="#4a5875" />
            <path d="M8 264h28l2 12H6Z" fill="#282f42" />
            <path d="M38 264h28l2 12H36Z" fill="#282f42" />
            {/* 상의 */}
            <path d="M20 58h30c14 0 21 10 22 24l5 66c1 12-6 20-18 20H15c-12 0-19-8-18-20l5-66c1-14 8-24 22-24Z" fill="#31426a" />
            <path d="M20 58h11l-4 110H15c-12 0-19-8-18-20l5-66c1-14 8-24 22-24Z" fill="#3e5182" />
            {/* 팔 */}
            <path d="M64 66c8 4 11 12 12 22l4 44c1 8-4 13-10 13s-10-4-11-12l-4-44Z" fill="#374a76" />
            <ellipse cx="72" cy="152" rx="8" ry="9" fill="#f2c9a8" />
            <path d="M8 66c-8 4-11 12-12 22l-4 44c-1 8 4 13 10 13s10-4 11-12l4-44Z" fill="#2c3c62" />
            <ellipse cx="0" cy="152" rx="8" ry="9" fill="#f2c9a8" />
            {/* 목 */}
            <path d="M27 36h16v24H27Z" fill="#e3b28c" />
            {/* 뒷머리 */}
            <path d="M35-6c-16 0-24 12-24 28 0 8 1 15 3 21h42c2-6 3-13 3-21 0-16-8-28-24-28Z" fill="#241f2c" />
            {/* 얼굴 */}
            <ellipse cx="35" cy="22" rx="21" ry="24" fill="#f2c9a8" />
            {/* 앞머리 */}
            <path d="M14 22c-1-17 8-28 21-28s22 11 21 28c-2-8-5-14-10-16-4 6-12 10-19 8-5-1-9-4-11-7-2 4-3 9-2 15Z" fill="#241f2c" />
            <path d="M24 0c6-4 16-4 22 1-7-3-15-3-22-1Z" fill="#453b52" />
            {/* 이목구비 */}
            <g fill="#2c2438">
              <ellipse cx="26" cy="24" rx="2.9" ry="3.8" />
              <ellipse cx="44" cy="24" rx="2.9" ry="3.8" />
            </g>
            <g stroke="#3a3145" strokeWidth="2" strokeLinecap="round" fill="none">
              <path d="M22 16c3-2 6-2 8 0" />
              <path d="M40 16c3-2 6-2 8 0" />
            </g>
            <path d="M31 33c2 3 6 3 8 0" stroke="#c9705f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <g fill="#ffb0a2" opacity="0.45">
              <ellipse cx="20" cy="29" rx="5.4" ry="3" />
              <ellipse cx="50" cy="29" rx="5.4" ry="3" />
            </g>
          </g>

          {/* --- 여학생 A (가운데, 긴 갈색 머리 · 이야기 중) --- */}
          <g transform="translate(148 302)">
            {/* 다리 */}
            <path d="M14 172h22l-2 92H14Z" fill="#f3cfb2" />
            <path d="M38 172h22l3 92H40Z" fill="#f3cfb2" />
            <path d="M10 260h26l2 12H8Z" fill="#2f3648" />
            <path d="M38 260h26l2 12H36Z" fill="#2f3648" />
            {/* 치마 */}
            <path d="M8 130h58l8 46H0Z" fill="#3a4258" />
            <g stroke="#2b3245" strokeWidth="1.7" opacity="0.55">
              <path d="M22 132 17 176M37 132v44M52 132l4 44" />
            </g>
            {/* 뒷머리 */}
            <path d="M37-14c-20 0-30 14-29 33 1 19 0 42-3 66-1 8 10 10 13 3 7-18 10-38 10-56h18c0 18 3 38 10 56 3 7 14 5 13-3-3-24-4-47-3-66 1-19-9-33-29-33Z" fill="#7d4a2b" />
            {/* 가디건 + 셔츠 */}
            <path d="M20 54h34c13 0 20 10 21 24l4 38c1 12-6 20-18 20H13c-12 0-19-8-18-20l4-38c1-14 8-24 21-24Z" fill="#f4ede0" />
            <path d="M29 54h16l-2 78H31Z" fill="#fdfefe" />
            <path d="M20 54h10l-3 78H13c-12 0-19-8-18-20l4-38c1-14 8-24 21-24Z" fill="#e6dccb" />
            {/* 리본 */}
            <path d="M31 60l6 5-6 5-6-5Z" fill="#e05a6a" />
            <path d="M25 62l-8-4 2 10Z" fill="#c94a5c" />
            <path d="M37 62l8-4-2 10Z" fill="#c94a5c" />
            {/* 팔 (한 손 들고 이야기) */}
            <path d="M69 62c8 4 11 12 11 22l-4 22c-1 7-6 10-11 8s-7-7-6-13l5-26Z" fill="#f0e5d4" />
            <ellipse cx="70" cy="112" rx="8" ry="9" fill="#f3cfb2" />
            <path d="M5 64c-8 4-11 12-11 22l3 40c1 7 6 10 11 8s7-7 6-13l-4-40Z" fill="#f0e5d4" />
            <ellipse cx="7" cy="140" rx="8" ry="9" fill="#f3cfb2" />
            {/* 목 */}
            <path d="M28 34h16v22H28Z" fill="#e9bd9b" />
            {/* 얼굴 */}
            <ellipse cx="36" cy="20" rx="21" ry="24" fill="#f9d8bd" />
            {/* 앞머리 */}
            <path d="M15 22c-1-18 8-30 21-30s22 12 21 30c-3-10-7-16-12-18-5 7-14 11-21 7-4-2-6-4-7-7-2 5-3 11-2 18Z" fill="#7d4a2b" />
            <path d="M22 0c6-5 18-5 24 1-7-3-17-3-24-1Z" fill="#9c6440" />
            {/* 이목구비 (웃는 눈) */}
            <path d="M22 20c3-4 7-4 10 0" stroke="#3a2a2a" strokeWidth="2.9" fill="none" strokeLinecap="round" />
            <path d="M40 20c3-4 7-4 10 0" stroke="#3a2a2a" strokeWidth="2.9" fill="none" strokeLinecap="round" />
            <path d="M32 30c2 4 6 4 8 0" stroke="#c9705f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <g fill="#ffb0a2" opacity="0.5">
              <ellipse cx="20" cy="27" rx="5.6" ry="3.2" />
              <ellipse cx="52" cy="27" rx="5.6" ry="3.2" />
            </g>
            {/* 옆머리 */}
            <path d="M15 22c-2 20-3 44-5 66-1 8 9 10 12 3 4-20 5-47 4-69Z" fill="#8a5433" />
            <path d="M57 22c2 20 3 44 5 66 1 8-9 10-12 3-4-20-5-47-4-69Z" fill="#8a5433" />
          </g>

          {/* --- 여학생 B (오른쪽, 뒷모습 · 올림머리) --- */}
          <g transform="translate(212 306)">
            {/* 다리 */}
            <path d="M12 168h22l-2 90H12Z" fill="#f0cbae" />
            <path d="M36 168h22l3 90H38Z" fill="#f0cbae" />
            <path d="M8 254h26l2 12H6Z" fill="#2f3648" />
            <path d="M36 254h26l2 12H34Z" fill="#2f3648" />
            {/* 치마 */}
            <path d="M6 128h56l8 44H-2Z" fill="#454d63" />
            <g stroke="#353c50" strokeWidth="1.7" opacity="0.5">
              <path d="M20 130 15 172M35 130v42M50 130l4 42" />
            </g>
            {/* 후드티 */}
            <path d="M18 52h32c13 0 20 10 21 24l4 36c1 12-6 20-18 20H13c-12 0-19-8-18-20l4-36c1-14 8-24 19-24Z" fill="#e2d9c8" />
            <path d="M24 52c5 8 22 8 27 0l-4-5H27Z" fill="#cec3af" />
            {/* 가방 (어깨끈 + 본체) */}
            <path d="M20 54c-1 8-1 13 0 18M46 54c1 8 1 13 0 18" stroke="#a196b4" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M20 70h26c6 0 10 4 10 10v28c0 6-4 10-10 10H20c-6 0-10-4-10-10V80c0-6 4-10 10-10Z" fill="#b3a7c4" />
            <path d="M20 70h26c6 0 10 4 10 10v6H10v-6c0-6 4-10 10-10Z" fill="#c1b6cf" />
            <rect x="25" y="92" width="16" height="11" rx="3" fill="#9c8fb2" />
            {/* 팔 */}
            <path d="M66 62c8 4 11 12 11 22l-3 28c-1 7-6 10-11 8s-7-7-6-13l5-32Z" fill="#ded4c2" />
            <ellipse cx="64" cy="122" rx="7.4" ry="8.4" fill="#f0cbae" />
            <path d="M2 62c-8 4-11 12-11 22l3 28c1 7 6 10 11 8s7-7 6-13L7 84Z" fill="#ded4c2" />
            <ellipse cx="4" cy="122" rx="7.4" ry="8.4" fill="#f0cbae" />
            {/* 목 */}
            <path d="M25 30h16v22H25Z" fill="#e0b092" />
            {/* 뒤통수 + 올림머리 */}
            <ellipse cx="33" cy="16" rx="21" ry="24" fill="#4b3627" />
            <circle cx="33" cy="-8" r="10.5" fill="#5c452f" />
            <path d="M15 4c6-10 30-10 36 0-6-5-30-5-36 0Z" fill="#5c452f" opacity="0.6" />
            <path d="M14 20c1 10 3 18 5 25" stroke="#3d2c1f" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.45" />
          </g>

          {/* 즐거운 대화 말풍선 */}
          <g>
            <rect x="188" y="216" width="52" height="29" rx="14" fill="#ffffff" opacity="0.96" />
            <g fill="#a7b8cc">
              <circle cx="202" cy="230" r="3.1" />
              <circle cx="214" cy="230" r="3.1" />
              <circle cx="226" cy="230" r="3.1" />
            </g>
            <circle cx="191" cy="251" r="4.6" fill="#ffffff" opacity="0.94" />
            <circle cx="184" cy="260" r="2.8" fill="#ffffff" opacity="0.9" />
          </g>
        </g>

        {/* =========================================================
            전경 인물 — 민서 (혼자 휴대폰을 보는 중)
            그리는 순서: 뒷머리 → 가방 → 다리 → 치마 → 몸 → 팔 → 얼굴 → 앞머리 → 옆머리
           ========================================================= */}
        <g opacity={dim("minseo")} style={{ transition: "opacity .35s ease" }}>
          <ellipse cx="462" cy="712" rx="88" ry="15" fill="#8d99a8" opacity="0.28" filter="url(#hsSoftSm)" />

          <g transform="translate(352 152)" filter="url(#hsCastShadow)">
            {/* ---------- 뒷머리 ---------- */}
            <path
              d="M112-12C72-12 58 18 60 60c2 34 1 66-3 92-1 9 10 13 15 4 10-18 15-44 15-72h50c0 28 5 54 15 72 5 9 16 5 15-4-4-26-5-58-3-92 2-42-12-72-52-72Z"
              fill="url(#hsHair)"
            />

            {/* ---------- 가방 ---------- */}
            <path d="M164 168c23 4 33 21 33 45v78c0 18-11 27-27 27l-10-2 4-148Z" fill="#efe6d6" />
            <path d="M178 196c8 5 11 14 11 25v54c0 11-5 17-13 19" fill="none" stroke="#dbcfba" strokeWidth="3.6" />
            <g transform="translate(180 288)">
              <path d="M5 0v11" stroke="#c9bda6" strokeWidth="2.4" />
              <circle cx="5" cy="22" r="11" fill="#ffffff" />
              <circle cx="5" cy="22" r="11" fill="none" stroke="#e2e9f1" strokeWidth="1.6" />
              <circle cx="1.4" cy="20" r="1.8" fill="#3b4a63" />
              <circle cx="8.6" cy="20" r="1.8" fill="#3b4a63" />
              <path d="M2.4 26c1.6 1.8 3.6 1.8 5.2 0" stroke="#3b4a63" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx="5" cy="11" r="3.2" fill="#35e0bd" />
            </g>

            {/* ---------- 다리 ---------- */}
            <path d="M72 404h40l-4 164H70Z" fill="#f6d3b6" />
            <path d="M118 404h40l6 164h-42Z" fill="#f9dcc1" />
            <path d="M69 524h39l-1 44H68Z" fill="#fbfdff" />
            <path d="M120 524h40l2 44h-42Z" fill="#fbfdff" />

            {/* ---------- 치마 (플리츠) ---------- */}
            <path d="M46 306h140l12 100H34Z" fill="url(#hsSkirt)" />
            <g stroke="#131f3e" strokeWidth="2.2" opacity="0.45">
              <path d="M69 308 62 406M93 308l-3 98M116 308v98M139 308l3 98M163 308l7 98" />
            </g>
            <path d="M46 306h140l2 15H44Z" fill="#0f1932" opacity="0.3" />

            {/* ---------- 셔츠 ---------- */}
            <path d="M92 142h44c23 0 36 15 38 39l7 96c1 18-10 29-28 29H63c-18 0-29-11-28-29l7-96c2-24 15-39 38-39Z" fill="#fbfdff" />

            {/* ---------- 넥타이 ---------- */}
            <path d="M106 142h16l7 12-5 9h-20l-5-9Z" fill="#22406e" />
            <path d="M104 165h20l6 56-16 19-16-19Z" fill="#2b5183" />
            <g stroke="#35e0bd" strokeWidth="3.8" opacity="0.82">
              <path d="M103 180l25 12M103 198l26 12M104 216l24 12" />
            </g>

            {/* ---------- 블레이저 ---------- */}
            <path d="M96 142c-26 2-41 17-43 41l-7 96c-1 18 9 29 27 29h19l4-166Z" fill="url(#hsBlazer)" />
            <path d="M132 142c26 2 41 17 43 41l7 96c1 18-9 29-27 29h-20l-3-166Z" fill="url(#hsBlazer)" />
            <path d="M96 142l24 25-17 13-13-19Z" fill="#1a2a50" />
            <path d="M132 142l-29 25 19 13 16-19Z" fill="#1a2a50" />
            <path d="M52 196c5-23 16-36 38-41l-3 20c-13 4-21 15-24 32Z" fill="#41598f" opacity="0.55" />

            {/* ---------- 가방끈 ---------- */}
            <path d="M76 150c-2 16-2 32 0 46" fill="none" stroke="#e8dece" strokeWidth="8" strokeLinecap="round" />
            <path d="M152 150c2 16 2 32 0 46" fill="none" stroke="#e8dece" strokeWidth="8" strokeLinecap="round" />
            <path d="M76 150c-2 16-2 32 0 46" fill="none" stroke="#cfc2ab" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
            <path d="M152 150c2 16 2 32 0 46" fill="none" stroke="#cfc2ab" strokeWidth="2" strokeLinecap="round" opacity="0.45" />

            {/* ---------- 팔 (앞으로 굽혀 휴대폰을 봄) ---------- */}
            <path d="M62 176c-12 24-15 48-8 66 7 18 19 28 34 33" fill="none" stroke="#2b3f6d" strokeWidth="27" strokeLinecap="round" />
            <path d="M166 176c12 24 15 48 8 66-7 18-19 28-34 33" fill="none" stroke="#2b3f6d" strokeWidth="27" strokeLinecap="round" />
            <path d="M58 190c-7 18-9 34-6 47" fill="none" stroke="#41598f" strokeWidth="6" strokeLinecap="round" opacity="0.45" />
            {/* 흰 커프스 */}
            <path d="M76 264c6 9 14 15 22 18l-6 15c-11-4-21-11-28-20Z" fill="#fbfdff" />
            <path d="M152 264c-6 9-14 15-22 18l6 15c11-4 21-11 28-20Z" fill="#fbfdff" />

            {/* ---------- 휴대폰 ---------- */}
            <g transform="translate(93 234) rotate(-7)">
              <rect x="0" y="0" width="40" height="62" rx="8.5" fill="#12988f" />
              <rect x="3.2" y="3.2" width="33.6" height="55.6" rx="5.6" fill="#eaf8fc" />
              <rect x="7.4" y="9" width="26" height="4.6" rx="2.3" fill="#c3dde7" />
              <rect x="7.4" y="18" width="17" height="4.6" rx="2.3" fill="#c3dde7" />
              <rect x="7.4" y="28" width="26" height="14" rx="4.6" fill="#b6e5f0" />
              <rect x="7.4" y="47" width="15" height="4.6" rx="2.3" fill="#c3dde7" />
            </g>
            {/* 손 */}
            <path d="M95 278c-10 2-15 11-12 19 4 8 14 11 23 7l9-4-8-23Z" fill="#f9dcc1" />
            <path d="M143 276c10 2 15 11 12 19-4 8-14 11-23 7l-9-4 8-23Z" fill="#fbe3cb" />

            {/* ---------- 목 ---------- */}
            <path d="M98 102h28v40H98Z" fill="#eec3a2" />
            <path d="M98 102h28v13H98Z" fill="#d9a583" />

            {/* ---------- 얼굴 ---------- */}
            <path
              d="M73 54c0-32 18-49 40-49s40 17 40 49c0 26-9 45-24 54-6 4-11 6-16 6s-10-2-16-6C82 99 73 80 73 54Z"
              fill="#fbe0c6"
            />
            <ellipse cx="71" cy="61" rx="5.6" ry="8.4" fill="#f6d3b6" />
            <ellipse cx="155" cy="61" rx="5.6" ry="8.4" fill="#f6d3b6" />
            <g fill="#ff9f92" opacity="0.4" filter="url(#hsSoftSm)">
              <ellipse cx="88" cy="84" rx="12" ry="6.4" />
              <ellipse cx="138" cy="84" rx="12" ry="6.4" />
            </g>
            {/* 눈썹 (살짝 처짐) */}
            <g stroke="#3a3145" strokeWidth="3.7" strokeLinecap="round" fill="none">
              <path d="M85 51c5-4 14-4 18-1" />
              <path d="M124 50c5-3 13-3 18 1" />
            </g>
            {/* 눈 */}
            <path d="M86 65c4-6 14-6 18 0" fill="none" stroke="#2a2233" strokeWidth="4.2" strokeLinecap="round" />
            <path d="M124 65c4-6 14-6 18 0" fill="none" stroke="#2a2233" strokeWidth="4.2" strokeLinecap="round" />
            <ellipse cx="95" cy="72" rx="6.2" ry="7.2" fill="#33293f" />
            <ellipse cx="133" cy="72" rx="6.2" ry="7.2" fill="#33293f" />
            <circle cx="97.2" cy="69.6" r="2.3" fill="#ffffff" opacity="0.95" />
            <circle cx="135.2" cy="69.6" r="2.3" fill="#ffffff" opacity="0.95" />
            {/* 코 / 입 */}
            <path d="M113 83c3 3 4 5 2 6" stroke="#d9a184" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M106 95c5 4 10 4 15 0" stroke="#c4705f" strokeWidth="3.2" fill="none" strokeLinecap="round" />

            {/* ---------- 앞머리 ---------- */}
            <path
              d="M113-6C82-6 69 18 71 58c3-13 8-23 14-30 7 10 21 16 34 12 8-2 15-6 19-11 6 7 10 17 11 29 2-40-11-64-36-64Z"
              fill="url(#hsHair)"
            />
            {/* 머리 결 (앞머리 안쪽에만) */}
            <path d="M92 12c12-8 27-10 39-4" fill="none" stroke="#5f6182" strokeWidth="4" strokeLinecap="round" opacity="0.55" />
            <path d="M83 32c3-9 8-16 15-20" fill="none" stroke="#5f6182" strokeWidth="3.2" strokeLinecap="round" opacity="0.4" />

            {/* ---------- 옆머리 (얼굴 옆 가닥) ---------- */}
            <path d="M72 52c-2 22-4 52-7 78-1 8 9 11 14 4 7-22 10-54 9-84Z" fill="url(#hsHair)" />
            <path d="M154 52c2 22 4 52 7 78 1 8-9 11-14 4-7-22-10-54-9-84Z" fill="url(#hsHair)" />
          </g>
        </g>

        {/* 앞쪽 화분 (좌하단 프레이밍) */}
        <g transform="translate(-14 540)">
          <path d="M18 84h96l-10 96H28Z" fill="#c88b63" />
          <path d="M18 84h96l-3 22H21Z" fill="#dc9d72" />
          <g fill="#5fae72">
            <path d="M66 84C44 78 26 54 30 26c22 2 38 24 36 58Z" />
            <path d="M70 84c20-10 34-36 26-62-22 6-34 30-26 62Z" fill="#79c184" />
            <path d="M64 84C44 66 14 62 0 78c16 16 46 18 64 6Z" fill="#4f9d64" />
            <path d="M72 84c18-20 50-24 66-8-16 16-48 20-66 8Z" fill="#6bb87a" />
          </g>
        </g>

        {/* 전체 톤 마무리 */}
        <rect width="620" height="720" fill="url(#hsVignette)" />
        <rect width="620" height="720" fill="#ffd98a" opacity="0.07" />
      </g>
    </svg>
  );
}
