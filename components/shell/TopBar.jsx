"use client";

import { IconBell, IconChevronDown, IconFlame, IconSparkle } from "@/components/ui/Icons";
import s from "./TopBar.module.css";

export default function TopBar({ points = 1260, level = 3, levelPct = 62, onMenu }) {
  return (
    <header className={s.topbar}>
      <button
        type="button"
        className={s.menuBtn}
        onClick={onMenu}
        aria-label="메뉴 열기"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={s.brand}>
        <h1 className={s.logo}>
          <span className={s.logoKo}>마음</span>
          <span className={s.logoSignal}>SIGNAL</span>
          <span className={s.logoLab}>LAB</span>
          <IconSparkle size={16} className={s.logoSpark} />
        </h1>
        <p className={s.tagline}>AI 시대, 마음을 읽고 연결하는 청소년 상담 체험</p>
      </div>

      <div className={s.right}>
        <span className={s.points} title="모은 시그널 포인트">
          <IconFlame size={16} className={s.flame} />
          <b>{points.toLocaleString()}</b>
        </span>

        <span className={s.level}>
          <span className={s.levelTag}>Lv.{level}</span>
          <span className={s.levelBar}>
            <span className={s.levelFill} style={{ width: `${levelPct}%` }} />
          </span>
        </span>

        <button type="button" className={s.iconBtn} aria-label="알림 3개">
          <IconBell size={19} />
          <span className={s.dot} />
        </button>

        <button type="button" className={s.profile} aria-label="내 프로필">
          <span className={s.avatar} aria-hidden="true">
            <svg viewBox="0 0 40 40" role="presentation">
              <circle cx="20" cy="20" r="20" fill="#f6dfcd" />
              <path d="M20 4c9 0 13 6 13 15 0 4-1 7-2 9H9c-1-2-2-5-2-9C7 10 11 4 20 4Z" fill="#2f2b3f" />
              <circle cx="20" cy="21" r="10" fill="#fbe3cb" />
              <circle cx="16.4" cy="20" r="1.7" fill="#2f2b3f" />
              <circle cx="23.6" cy="20" r="1.7" fill="#2f2b3f" />
              <path d="M17.6 25c1.6 1.2 3.2 1.2 4.8 0" stroke="#c4705f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M20 31c6 0 11 3 12 9H8c1-6 6-9 12-9Z" fill="#2b5183" />
            </svg>
          </span>
          <IconChevronDown size={15} className={s.chev} />
        </button>
      </div>
    </header>
  );
}
