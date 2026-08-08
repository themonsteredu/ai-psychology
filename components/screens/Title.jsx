"use client";

import AssetImage from "@/components/ui/AssetImage";
import { IconArrowRight, IconCase, IconSparkle } from "@/components/ui/Icons";
import { CASES, TOTAL_MINUTES } from "@/lib/cases";
import s from "./Title.module.css";

/**
 * 시작 화면 — 사례 목록을 펼치지 않고 제목만 보여준다.
 * 사례는 한 번에 하나씩, 앞 사례를 끝내야 다음이 열린다.
 */
export default function Title({ done, onStart }) {
  const doneCount = CASES.filter((c) => done[c.id]).length;
  const next = CASES.find((c) => !done[c.id]);
  const allDone = !next;

  return (
    <section className={s.board} aria-label="마음 SIGNAL LAB 시작">
      <AssetImage src="/assets/ui/title-hero" alt="" bare className={s.bg} />
      <span className={s.veil} aria-hidden="true" />

      <div className={s.inner}>
        <span className={s.eyebrow}>
          <IconSparkle size={14} />
          중학생 진로교육 체험
        </span>

        <h1 className={s.title}>
          마음 <em>SIGNAL</em> LAB
        </h1>

        <p className={s.tagline}>
          AI 시대, 사람의 마음을 읽는 직업을 체험합니다.
          <br />
          당신은 오늘부터 마음 SIGNAL LAB의 신입 청소년상담사입니다.
        </p>

        <button type="button" className={s.cta} onClick={() => onStart(next?.id)}>
          {allDone
            ? "다시 체험하기"
            : doneCount === 0
              ? "체험 시작하기"
              : `이어서 하기 — CASE ${next.no}`}
          <IconArrowRight size={20} />
        </button>

        <div className={s.meta}>
          <span className={s.metaItem}>
            사례 <b>{doneCount}</b> / {CASES.length} 완료
          </span>
          <span className={s.metaDot} aria-hidden="true" />
          <span className={s.metaItem}>전체 약 {TOTAL_MINUTES}분</span>
        </div>

        <p className={s.note}>
          <IconCase size={14} />
          모든 사례는 교육용 가상 사례입니다. 실제 심리 진단이 아니며, 실존
          인물과 관계가 없습니다.
        </p>
      </div>
    </section>
  );
}
