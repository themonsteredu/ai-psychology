"use client";

import { IconCheck, IconNote } from "@/components/ui/Icons";
import { QUALITY_META, getSource } from "@/lib/shared";
import s from "./NoteDrawer.module.css";

/** 탐색 노트 — 지금까지 모은 단서와 상담 기록을 모아 보여주는 패널. */
export default function NoteDrawer({ caseData, open, onClose, found, talkLog }) {
  const CLUES = caseData?.clues ?? [];
  return (
    <>
      <div
        className={`${s.scrim} ${open ? s.on : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${s.panel} ${open ? s.on : ""}`}
        aria-label="탐색 노트"
        aria-hidden={!open}
      >
        <header className={s.head}>
          <span className={s.headIcon}>
            <IconNote size={19} />
          </span>
          <h2>탐색 노트</h2>
          <button type="button" className={s.close} onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div className={s.body}>
          <section className={s.section}>
            <h3>
              모은 단서 <em>{found.length}/{CLUES.length}</em>
            </h3>
            {found.length === 0 ? (
              <p className={s.empty}>아직 기록된 단서가 없어요.</p>
            ) : (
              <ul className={s.clues}>
                {CLUES.filter((c) => found.includes(c.id)).map((c) => (
                  <li key={c.id} className={s.clue}>
                    <span className={`${s.kind} ${s[c.tone]}`}>{c.kind}</span>
                    {/* 출처를 같이 남긴다 — 04에서 사실/추론을 가를 때 근거가 된다. */}
                    <span className={s.src}>{getSource(c.source).label}에서</span>
                    <b>{c.label}</b>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={s.section}>
            <h3>
              상담 기록 <em>{talkLog.length}턴</em>
            </h3>
            {talkLog.length === 0 ? (
              <p className={s.empty}>아직 상담 대화를 시작하지 않았어요.</p>
            ) : (
              <ul className={s.talks}>
                {talkLog.map((t, i) => (
                  <li key={t.turnId} className={s.talk}>
                    <span className={`${s.tag} ${s[t.quality]}`}>
                      <IconCheck size={12} />
                      {QUALITY_META[t.quality].label}
                    </span>
                    <p className={s.said}>“{t.choice}”</p>
                    <p className={s.fb}>{t.feedback}</p>
                    <span className={s.turnNo}>{i + 1}턴</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <p className={s.disclaimer}>
            이 노트는 상담사 직무를 체험하기 위한 학습 기록입니다. 실제 심리
            진단이나 점수화가 아닙니다.
          </p>
        </div>
      </aside>
    </>
  );
}
