"use client";

import { useState } from "react";
import s from "./AiHelper.module.css";

const TIPS = [
  "함께\n시그널을 찾아보자!",
  "표정과 자세부터\n살펴볼까?",
  "사실과 추측을\n꼭 나눠 적어 줘.",
];

/** 좌하단 AI 도우미 — 말풍선 + 로봇 캐릭터 + 상태 표시 */
export default function AiHelper() {
  const [tip, setTip] = useState(0);

  return (
    <div className={s.wrap}>
      <button
        type="button"
        className={s.bubble}
        onClick={() => setTip((t) => (t + 1) % TIPS.length)}
        aria-label="AI 도우미 힌트 바꾸기"
      >
        {TIPS[tip].split("\n").map((line, i) => (
          <span key={i} className={i === 0 ? s.bubbleTop : s.bubbleMain}>
            {line}
          </span>
        ))}
        <span className={s.tail} aria-hidden="true" />
      </button>

      <div className={s.robotRow}>
        <svg
          className={s.robot}
          viewBox="0 0 96 92"
          role="img"
          aria-label="AI 도우미 로봇"
        >
          <defs>
            <linearGradient id="aiFace" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1c2b46" />
              <stop offset="1" stopColor="#0e1a2e" />
            </linearGradient>
            <linearGradient id="aiBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d8e6f4" />
            </linearGradient>
          </defs>
          {/* 안테나 */}
          <path d="M48 14V6" stroke="#cfe0f2" strokeWidth="3.4" strokeLinecap="round" />
          <circle cx="48" cy="4" r="4.4" fill="#35e0bd" />
          {/* 귀 */}
          <rect x="4" y="34" width="12" height="22" rx="6" fill="#35e0bd" />
          <rect x="80" y="34" width="12" height="22" rx="6" fill="#35e0bd" />
          {/* 머리 */}
          <rect x="14" y="14" width="68" height="52" rx="21" fill="url(#aiBody)" />
          <rect x="21" y="22" width="54" height="36" rx="16" fill="url(#aiFace)" />
          {/* 눈 */}
          <circle cx="38" cy="39" r="5.4" fill="#eaf6ff" />
          <circle cx="58" cy="39" r="5.4" fill="#eaf6ff" />
          <circle cx="39.4" cy="37.6" r="1.8" fill="#1c2b46" />
          <circle cx="59.4" cy="37.6" r="1.8" fill="#1c2b46" />
          {/* 입 */}
          <path
            d="M41 49c4 3.4 10 3.4 14 0"
            stroke="#35e0bd"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* 몸 */}
          <path
            d="M28 68h40c6 0 10 4 10 10v6H18v-6c0-6 4-10 10-10Z"
            fill="url(#aiBody)"
          />
          <rect x="40" y="72" width="16" height="5" rx="2.5" fill="#9fc0dc" />
        </svg>

        <span className={s.status}>
          <span className={s.statusName}>AI 도우미</span>
          <span className={s.statusDot} aria-hidden="true" />
          <span className={s.statusOn}>ON</span>
        </span>
      </div>
    </div>
  );
}
