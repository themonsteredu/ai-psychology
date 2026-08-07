"use client";

import AssetImage from "@/components/ui/AssetImage";
import {
  IconArrowRight,
  IconCareer,
  IconRefresh,
  IconSparkle,
  IconStar,
  IconTrophy,
} from "@/components/ui/Icons";
import { CAREERS, COMPETENCIES } from "@/lib/caseData";
import s from "./Result.module.css";

const TONE_COLOR = {
  mint: "#22c9a8",
  blue: "#3b82f6",
  coral: "#f43f5e",
  lime: "#9dc51f",
};

/** 받침 유무에 따라 주격 조사 이/가 를 고른다. ("관찰력이" / "AI 리터러시가") */
function subjectParticle(word) {
  const code = word.charCodeAt(word.length - 1);
  const isHangul = code >= 0xac00 && code <= 0xd7a3;
  return isHangul && (code - 0xac00) % 28 !== 0 ? "이" : "가";
}

/** 07 결과 확인 — 체험에서 쓴 직무 역량과 관련 진로를 보여준다. */
export default function Result({ scores, onRestart, onBack }) {
  const top = [...COMPETENCIES].sort(
    (a, b) => (scores[b.id] ?? 0) - (scores[a.id] ?? 0)
  )[0];

  return (
    <section className={s.board} aria-label="결과 확인">
      {/* ---------------- 좌: 완료 배너 ---------------- */}
      <div className={s.heroPane}>
        <span className={s.confetti} aria-hidden="true" />

        <span className={s.stepBadge}>STEP 07 · 활동 완료</span>

        <span className={s.trophy}>
          <AssetImage
            src="/assets/ui/trophy"
            alt="트로피"
            tone="lime"
            fallback={<IconTrophy size={40} />}
          />
        </span>

        <h2 className={s.heroTitle}>
          탐정 활동 완료!
          <br />
          너의 <em>{top.label}</em>
          {subjectParticle(top.label)}
          <br />
          세상을 바꿀 거야
        </h2>

        <p className={s.heroDesc}>
          민서의 마음 시그널을 끝까지 따라간 상담사님, 수고했어요. 오늘 쓴 힘은
          아래 다섯 가지예요.
        </p>

        <span className={s.hero}>
          <AssetImage
            src="/assets/char/minseo-happy"
            alt="밝게 웃는 민서"
            tone="mint"
            fallback={<IconSparkle size={44} />}
            className={s.heroImg}
          />
        </span>

        <button type="button" className={s.restart} onClick={onRestart}>
          <IconRefresh size={16} />
          처음부터 다시 체험하기
        </button>
      </div>

      {/* ---------------- 우: 역량 + 진로 ---------------- */}
      <div className={s.dataPane}>
        <section className={s.block}>
          <header className={s.blockHead}>
            <h3>
              <IconStar size={17} />
              나의 상담 역량
            </h3>
            <p>이번 체험에서 실제로 사용한 직무 역량이에요.</p>
          </header>

          <ul className={s.gauges}>
            {COMPETENCIES.map((c) => (
              <li key={c.id} className={s.gauge}>
                <Dial value={scores[c.id] ?? 0} color={TONE_COLOR[c.tone]} />
                <b className={s.gaugeLabel}>{c.label}</b>
                <span className={s.gaugeDesc}>{c.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.block}>
          <header className={s.blockHead}>
            <h3>
              <IconCareer size={17} />
              너와 잘 맞는 미래 진로
            </h3>
            <p>사람의 마음을 읽는 힘이 필요한 직업들이에요.</p>
          </header>

          <ul className={s.careers}>
            {CAREERS.map((job) => (
              <li key={job.id} className={s.career}>
                <span className={s.careerThumb}>
                  <AssetImage
                    src={job.image}
                    alt={job.name}
                    tone={job.tone}
                    fallback={<IconCareer size={26} />}
                  />
                </span>
                <b className={s.careerName}>{job.name}</b>
                <span className={s.careerDesc}>{job.desc}</span>
                <span className={`${s.careerSkill} ${s[job.tone]}`}>{job.skill}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className={s.disclaimer}>
          이 결과는 직업 체험 활동 기록이에요. 실제 심리 검사나 진단이 아니며,
          진로를 정해 주는 결과도 아닙니다.
        </p>

        <div className={s.actions}>
          <button type="button" className={s.ghost} onClick={onBack}>
            이전
          </button>
          <button type="button" className={s.cta} onClick={onRestart}>
            새로운 CASE 받기
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

/** 원형 게이지 — 값(0~100)을 도넛 형태로 그린다. */
function Dial({ value, color }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const v = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <span className={s.dial}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e2ebf6" strokeWidth="7" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${(c * v) / 100} ${c}`}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className={s.dialVal} style={{ color }}>
        {v}
      </span>
    </span>
  );
}
