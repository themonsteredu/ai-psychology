"use client";

import AssetImage from "@/components/ui/AssetImage";
import {
  IconArrowRight,
  IconCase,
  IconCheck,
  IconSparkle,
} from "@/components/ui/Icons";
import { CASES, TOTAL_MINUTES } from "@/lib/cases";
import s from "./CaseSelect.module.css";

/**
 * CASE 목록 — 수업의 출발점.
 * 세 사례는 같은 사건을 세 사람의 자리에서 보므로 순서대로 푸는 걸 권한다.
 * 다만 수업 상황에 맞춰 아무 사례나 열 수 있게 잠그지는 않았다.
 */
export default function CaseSelect({ done, onPick }) {
  const doneCount = CASES.filter((c) => done[c.id]).length;
  const nextCase = CASES.find((c) => !done[c.id]) ?? CASES[0];

  return (
    <section className={s.board} aria-label="CASE 목록">
      <header className={s.head}>
        <span className={s.eyebrow}>
          <IconSparkle size={14} />
          마음 SIGNAL LAB
        </span>
        <h2 className={s.title}>오늘 맡은 사례</h2>
        <p className={s.sub}>
          세 사례는 같은 사건을 세 사람의 자리에서 봅니다. 순서대로 푸는 걸
          권하지만, 수업 상황에 맞춰 골라도 괜찮아요.
        </p>

        <div className={s.meta}>
          <span className={s.metaItem}>
            <b>{doneCount}</b> / {CASES.length} 완료
          </span>
          <span className={s.metaDot} aria-hidden="true" />
          <span className={s.metaItem}>전체 약 {TOTAL_MINUTES}분</span>
        </div>
      </header>

      <ul className={s.list}>
        {CASES.map((c) => {
          const isDone = Boolean(done[c.id]);
          const isNext = c.id === nextCase.id && !isDone;

          return (
            <li key={c.id}>
              <button
                type="button"
                className={`${s.card} ${isDone ? s.cardDone : ""} ${
                  isNext ? s.cardNext : ""
                }`}
                onClick={() => onPick(c.id)}
              >
                <span className={s.thumb}>
                  <AssetImage src={c.cover} alt="" tone="blue" />
                  <span className={s.no}>CASE {c.no}</span>
                  {isDone && (
                    <span className={s.doneBadge}>
                      <IconCheck size={14} />
                      완료
                    </span>
                  )}
                </span>

                <span className={s.body}>
                  <b className={s.cardTitle}>{c.title}</b>
                  <span className={s.lead}>{c.lead}</span>
                  <span className={s.desc}>{c.summary}</span>

                  <span className={s.foot}>
                    <span className={s.who}>
                      <span className={s.whoAvatar}>
                        <AssetImage src={c.subject.avatar} alt="" tone="mint" />
                      </span>
                      {c.subject.name}
                    </span>
                    <span className={s.minutes}>약 {c.minutes}분</span>
                  </span>

                  <span className={s.cta}>
                    {isDone ? "다시 해 보기" : isNext ? "시작하기" : "열어 보기"}
                    <IconArrowRight size={16} />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className={s.note}>
        <IconCase size={15} />
        모든 사례는 교육용 가상 사례입니다. 실제 심리 진단이 아니며, 실존 인물과
        관계가 없습니다.
      </p>
    </section>
  );
}
