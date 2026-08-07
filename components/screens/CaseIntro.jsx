"use client";

import HallwayScene from "@/components/scene/HallwayScene";
import {
  IconArrowRight,
  IconBrain,
  IconChat,
  IconHeart,
  IconPeople,
  IconPulse,
  IconSearch,
} from "@/components/ui/Icons";
import { ACTIVITY_PREVIEW, CASE_META, MISSION_STEPS } from "@/lib/caseData";
import s from "./CaseIntro.module.css";

const ICONS = {
  search: IconSearch,
  brain: IconBrain,
  heart: IconHeart,
  people: IconPeople,
  chat: IconChat,
  pulse: IconPulse,
};

export default function CaseIntro({ onStart, detection = 0 }) {
  return (
    <section className={s.board} aria-label="CASE 01 안내">
      {/* ==================== 좌측: 복도 장면 ==================== */}
      <div className={s.scenePane}>
        <HallwayScene className={s.scene} />

        <div className={s.sceneTop}>
          <span className={s.caseBadge}>{CASE_META.code}</span>
          <span className={s.sceneTitle}>{CASE_META.sceneTitle}</span>
        </div>

        <div className={s.detect}>
          <span className={s.detectIcon}>
            <IconSearch size={20} />
          </span>
          <span className={s.detectText}>
            <span className={s.detectLabel}>시그널 탐지율</span>
            <span className={s.detectValue}>{detection}%</span>
          </span>
        </div>
      </div>

      {/* ==================== 우측: 미션 카드 ==================== */}
      <div className={s.missionPane}>
        <span className={s.eyebrow}>
          <span className={s.eyebrowDot} aria-hidden="true" />
          {CASE_META.eyebrow}
          <IconArrowRight size={13} className={s.eyebrowArrow} />
        </span>

        <h2 className={s.headline}>
          {CASE_META.headlineTop}
          <br />
          <em className={s.headlineAccent}>{CASE_META.headlineAccent}</em>
          {CASE_META.headlineTail}
        </h2>

        <p className={s.summary}>{CASE_META.summary}</p>

        {/* --- 4개 미션 아이콘 --- */}
        <ul className={s.missions}>
          {MISSION_STEPS.map((m) => {
            const Icon = ICONS[m.icon];
            const on = m.state === "active";
            return (
              <li key={m.id} className={`${s.mission} ${on ? s.missionOn : ""}`}>
                <span className={s.missionRing}>
                  <Icon size={26} />
                </span>
                <span className={s.missionLabel}>{m.label}</span>
              </li>
            );
          })}
        </ul>

        {/* --- 활동 미리보기 --- */}
        <div className={s.preview}>
          <h3 className={s.previewTitle}>활동 미리보기</h3>
          <ul className={s.previewList}>
            {ACTIVITY_PREVIEW.map((a) => {
              const Icon = ICONS[a.icon];
              return (
                <li key={a.id} className={s.previewCard}>
                  <span className={`${s.previewIcon} ${s[a.tone]}`}>
                    <Icon size={24} />
                  </span>
                  <span className={s.previewLabel}>{a.label}</span>
                  <span className={s.previewDesc}>{a.desc}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- CTA --- */}
        <button type="button" className={s.cta} onClick={onStart}>
          <span className={s.ctaText}>미션 시작하기</span>
          <span className={s.ctaArrow} aria-hidden="true">
            <IconArrowRight size={19} />
          </span>
        </button>
      </div>
    </section>
  );
}
