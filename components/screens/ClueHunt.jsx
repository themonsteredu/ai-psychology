"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CaseScene from "@/components/scene/CaseScene";
import {
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconSearch,
} from "@/components/ui/Icons";

import { withParticle } from "@/lib/korean";
import s from "./ClueHunt.module.css";

/** 손전등이 한 지점을 비추는 시간 (ms) */
const TORCH_MS = 3800;
/** 아무것도 못 찾고 이만큼 지나면 손전등이 알아서 켜진다 (ms) */
const IDLE_MS = 30000;

/**
 * 02 단서 탐색 — 장면을 관찰해 단서를 직접 찾아낸다.
 *
 * 표시가 미리 떠 있으면 관찰이 아니라 '점 누르기'가 되므로, 아직 찾지 못한
 * 단서는 보이지 않는 영역으로만 존재한다. 대신 한참 못 찾으면 손전등이
 * 그 지점을 비춰 준다. (버튼으로 바로 켤 수도 있다.)
 */
export default function ClueHunt({ caseData, found, onFind, onNext, onBack }) {
  const CLUES = caseData.clues;
  const CLUE_HINTS = caseData.clueHints;
  const [active, setActive] = useState(null);
  const [hint, setHint] = useState(0);
  const [torch, setTorch] = useState(null);
  const torchTimer = useRef(null);

  const all = found.length === CLUES.length;
  const pct = Math.round((found.length / CLUES.length) * 100);
  const activeClue = CLUES.find((c) => c.id === active) ?? null;
  const torchClue = CLUES.find((c) => c.id === torch) ?? null;

  /** 아직 못 찾은 단서 하나를 손전등으로 비춘다. */
  const shine = useCallback(() => {
    const rest = CLUES.filter((c) => !found.includes(c.id));
    if (!rest.length) return;
    setTorch(rest[0].id);
    window.clearTimeout(torchTimer.current);
    torchTimer.current = window.setTimeout(() => setTorch(null), TORCH_MS);
  }, [CLUES, found]);

  /* 마지막으로 단서를 찾은 뒤 한참 진전이 없으면 알아서 비춰 준다. */
  useEffect(() => {
    if (all) return undefined;
    const t = window.setTimeout(shine, IDLE_MS);
    return () => window.clearTimeout(t);
  }, [all, shine, found.length]);

  useEffect(() => () => window.clearTimeout(torchTimer.current), []);

  const pick = (clue) => {
    onFind(clue.id);
    setActive(clue.id);
    setTorch(null);
    window.clearTimeout(torchTimer.current);
  };

  return (
    <section className={s.board} aria-label="단서 탐색">
      {/* ---------------- 좌: 장면 + 핫스팟 ---------------- */}
      <div className={s.scenePane}>
        <CaseScene
          scene={caseData.scene}
          className={s.scene}
          title={caseData.title}
          spotlight={active ? (caseData.spotlightOf?.[active] ?? caseData.scene.figures.at(-1)?.id) : null}
        />

        <div className={s.sceneTop}>
          <span className={s.stepBadge}>STEP 02</span>
          <span className={s.sceneTitle}>{caseData.sceneTitle}</span>
        </div>

        {torchClue && (
          <span
            className={s.torch}
            style={{ "--tx": `${torchClue.x}%`, "--ty": `${torchClue.y}%` }}
            aria-hidden="true"
          />
        )}

        {CLUES.map((c) => {
          const isFound = found.includes(c.id);
          const lit = torch === c.id;
          return (
            <button
              key={c.id}
              type="button"
              className={`${s.hotspot} ${c.flip ? s.hotFlip : ""} ${
                isFound ? s.hotFound : s.hotHidden
              } ${lit ? s.hotLit : ""} ${active === c.id ? s.hotActive : ""}`}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              onClick={() => pick(c)}
              aria-label={isFound ? `찾은 단서: ${c.label}` : "관찰할 지점"}
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
            장면을 천천히 살펴보고, 이상해 보이는 곳을 눌러 보세요. 표시는
            없습니다.
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
              왼쪽 장면을 관찰하며 이상한 곳을 눌러 보세요.
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

        {/* 손전등 — 못 찾을 때 한 곳을 비춰 준다 */}
        <button
          type="button"
          className={s.torchBtn}
          onClick={shine}
          disabled={all || Boolean(torch)}
        >
          <IconSearch size={16} />
          {all ? "모두 찾았어요" : "손전등 비추기"}
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
            {all ? `${withParticle(caseData.subject.name, "과")} 대화하기` : `단서 ${CLUES.length - found.length}개 더 찾기`}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
