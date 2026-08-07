"use client";

import AssetImage from "@/components/ui/AssetImage";
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
            <AssetImage src="/assets/avatar/user" alt="" tone="mint" />
          </span>
          <IconChevronDown size={15} className={s.chev} />
        </button>
      </div>
    </header>
  );
}
