"use client";

import { useState } from "react";
import HallwayScene from "@/components/scene/HallwayScene";
import {
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconSearch,
} from "@/components/ui/Icons";
import { CLUES, CLUE_HINTS } from "@/lib/caseData";
import s from "./ClueHunt.module.css";

/** 02 단서 탐색 — 복도 장면 위 핫스팟을 눌러 단서를 모은다. */
export default function ClueHunt({ found, onFind, onNext, onBack }) {
  const [active, setActive] = useState(null);
  const [hint, setHint] = useState(0);

  const all = found.length === CLUES.length;
  const pct = Math.round((found.length / CLUES.length) * 100);
  const activeClue = CLUES.find((c) => c.id === active) ?? null;

  const pick = (clue) => {
    onFind(clue.id);
    setActive(clue.id);
  };

  return (
    <section className={s.board} aria-label="단서 탐색">
      {/* ---------------- 좌: 장면 + 핫스팟 ---------------- */}
      <div className={s.scenePane}>
        <HallwayScene className={s.scene} spotlight={active === "distance" || active === "friends" ? "friends" : active ? "minseo" : null} />

        <div className={s.sceneTop}>
          <span className={s.stepBadge}>STEP 02</span>
          <span className={s.sceneTitle}>복도에서 마음 시그널을 찾아보세요</span>
        </div>

        {CLUES.map((c) => {
          const isFound = found.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              className={`${s.hotspot} ${c.flip ? s.hotFlip : ""} ${
                isFound ? s.hotFound : ""
              } ${active === c.id ? s.hotActive : ""}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              onClick={() => pick(c)}
              aria-label={`단서: ${c.label}`}
              aria-pressed={isFound}
            >
              <span className={s.hotDot}>
                {isFound ? <IconCheck size={16} /> : <IconSearch size={16} />}
              </span>
              <span className={s.hotLabel}>{c.label}</span>
            </button>
          );
        })}

        <div className={s.detect}>
          <span className={s.detectIcon}>
            <IconSearch size={20} />
          </span>
          <span className={s.detectText}>
            <span className={s.detectLabel}>시그널 탐지율</span>
            <span className={s.detectValue}>{pct}%</span>
          </span>
          <span className={s.detectBar} aria-hidden="true">
            <span className={s.detectFill} style={{ width: `${pct}%` }} />
          </span>
        </div>
      </div>

      {/* ---------------- 우: 탐색 노트 ---------------- */}
      <div className={s.notePane}>
        <header className={s.noteHead}>
          <h2 className={s.noteTitle}>
            단서 <em>{found.length}</em> / {CLUES.length}
          </h2>
          <p className={s.noteSub}>
            장면 속 빛나는 지점을 눌러 관찰한 내용을 기록하세요.
          </p>
        </header>

        {/* 선택된 단서 상세 */}
        <div className={`${s.detail} ${activeClue ? s.detailOn : ""}`}>
          {activeClue ? (
            <>
              <span className={`${s.kind} ${s[activeClue.tone]}`}>
                {activeClue.kind}
              </span>
              <h3 className={s.detailTitle}>{activeClue.label}</h3>
              <p className={s.detailText}>{activeClue.text}</p>
              <p className={s.detailInsight}>
                <IconBulb size={16} />
                {activeClue.insight}
              </p>
            </>
          ) : (
            <p className={s.detailEmpty}>
              아직 선택한 단서가 없어요.
              <br />
              왼쪽 장면에서 이상한 점을 찾아 눌러 보세요.
            </p>
          )}
        </div>

        {/* 수집 목록 */}
        <ul className={s.clueList}>
          {CLUES.map((c) => {
            const isFound = found.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  className={`${s.clueRow} ${isFound ? s.clueOn : ""} ${
                    active === c.id ? s.clueActive : ""
                  }`}
                  onClick={() => isFound && setActive(c.id)}
                  disabled={!isFound}
                >
                  <span className={s.clueCheck}>
                    {isFound ? <IconCheck size={14} /> : null}
                  </span>
                  <span className={s.clueName}>
                    {isFound ? c.label : "아직 찾지 못한 단서"}
                  </span>
                  {isFound && <span className={`${s.dotTone} ${s[c.tone]}`} />}
                </button>
              </li>
            );
          })}
        </ul>

        {/* 힌트 */}
        <button type="button" className={s.hint} onClick={() => setHint((h) => (h + 1) % CLUE_HINTS.length)}>
          <IconBulb size={17} />
          <span>{CLUE_HINTS[hint]}</span>
        </button>

        <div className={s.actions}>
          <button type="button" className={s.ghost} onClick={onBack}>
            이전
          </button>
          <button
            type="button"
            className={s.cta}
            onClick={onNext}
            disabled={!all}
          >
            {all ? "민서와 대화하기" : `단서 ${CLUES.length - found.length}개 더 찾기`}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
