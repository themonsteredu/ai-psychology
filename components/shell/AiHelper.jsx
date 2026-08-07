"use client";

import { useState } from "react";
import AssetImage from "@/components/ui/AssetImage";
import { IconSparkle } from "@/components/ui/Icons";
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
        <span className={s.robot}>
          <AssetImage
            src="/assets/avatar/ai-helper"
            alt="AI 도우미 로봇"
            tone="blue"
            fallback={<IconSparkle size={30} />}
          />
        </span>

        <span className={s.status}>
          <span className={s.statusName}>AI 도우미</span>
          <span className={s.statusDot} aria-hidden="true" />
          <span className={s.statusOn}>ON</span>
        </span>
      </div>
    </div>
  );
}
