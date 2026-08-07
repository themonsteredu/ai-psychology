"use client";

import { useMemo, useState } from "react";
import AssetImage from "@/components/ui/AssetImage";
import {
  IconAlert,
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconPaperclip,
  IconRefresh,
} from "@/components/ui/Icons";
import {
  TWIST_CHECKS,
  TWIST_INTRO,
  TWIST_LESSON,
  TWIST_MESSAGES,
  TWIST_VERDICTS,
} from "@/lib/caseData";
import s from "./NewMessage.module.css";

const VERDICT_BY_ID = Object.fromEntries(TWIST_VERDICTS.map((v) => [v.id, v]));

/**
 * 05 새로운 메시지 — 판단을 끝냈다고 생각한 뒤 도착하는 반전.
 * marks: { [checkId]: verdictId } — 상위(page)에서 보관해 결과 화면 점수로 이어진다.
 */
export default function NewMessage({ marks, onMark, onReset, onNext, onBack }) {
  const [openFile, setOpenFile] = useState(false);

  const { done, correct } = useMemo(() => {
    const marked = TWIST_CHECKS.filter((c) => marks[c.id]);
    return {
      done: marked.length === TWIST_CHECKS.length,
      correct: marked.filter((c) => marks[c.id] === c.answer).length,
    };
  }, [marks]);

  const markedCount = TWIST_CHECKS.filter((c) => marks[c.id]).length;
  const pct = Math.round((markedCount / TWIST_CHECKS.length) * 100);

  return (
    <section className={s.board} aria-label="새로운 메시지">
      {/* ---------------- 좌: 메시지 ---------------- */}
      <div className={s.msgPane}>
        <AssetImage
          src="/assets/scene/classroom"
          alt=""
          bare
          className={s.roomBg}
        />

        {/* 오른쪽 목록이 길어져도 메시지가 화면에 남도록 sticky 처리 */}
        <div className={s.msgInner}>
          <div className={s.alert}>
            <span className={s.alertIcon}>
              <IconAlert size={19} />
            </span>
            <span className={s.alertText}>
              <small>{TWIST_INTRO.eyebrow}</small>
              <b>{TWIST_INTRO.title}</b>
              <span>{TWIST_INTRO.sub}</span>
            </span>
          </div>

          <div className={s.thread}>
            {TWIST_MESSAGES.map((m) => (
              <article key={m.id} className={s.msg}>
                <header className={s.msgHead}>
                  <span className={s.msgAvatar}>
                    <AssetImage src={m.avatar} alt="" tone="mint" />
                  </span>
                  <span className={s.msgWho}>
                    <b>{m.from}</b>
                    <small>{m.role}</small>
                  </span>
                  <span className={s.msgTime}>{m.time}</span>
                </header>

                {m.lines.map((line, i) => (
                  <p key={i} className={s.bubble}>
                    {line}
                  </p>
                ))}

                {m.attachment && (
                  <button
                    type="button"
                    className={`${s.file} ${openFile ? s.fileOpen : ""}`}
                    onClick={() => setOpenFile((v) => !v)}
                    aria-expanded={openFile}
                  >
                    <span className={s.fileIcon}>
                      <IconPaperclip size={16} />
                    </span>
                    <span className={s.fileBody}>
                      <b>{m.attachment.name}</b>
                      <small>{m.attachment.size}</small>
                    </span>
                    <span className={s.fileCta}>
                      {openFile ? "닫기" : "열어 보기"}
                    </span>
                  </button>
                )}

                {m.attachment && openFile && (
                  <p className={s.fileNote}>
                    <IconBulb size={15} />
                    {m.attachment.note}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- 우: 다시 보기 ---------------- */}
      <div className={s.toolPane}>
        <header>
          <span className={s.stepBadge}>STEP 05 · 새로운 메시지</span>
          <h2 className={s.toolTitle}>이제 무엇이 달라졌을까?</h2>
          <p className={s.toolSub}>
            지금까지 적어 둔 문장들이에요. 새 메시지를 읽고 다시 판단해 보세요.
          </p>
        </header>

        <div className={s.progressRow}>
          <span className={s.progressLabel}>다시 본 문장</span>
          <span className={s.progressBar}>
            <span className={s.progressFill} style={{ width: `${pct}%` }} />
          </span>
          <span className={s.progressVal}>
            {markedCount}/{TWIST_CHECKS.length}
          </span>
        </div>

        <ul className={s.checks}>
          {TWIST_CHECKS.map((c) => {
            const mark = marks[c.id];
            const right = mark === c.answer;

            return (
              <li key={c.id} className={`${s.check} ${mark ? s.checkOn : ""}`}>
                <p className={s.checkText}>{c.text}</p>

                <span
                  className={s.verdicts}
                  role="group"
                  aria-label={`${c.text} 판단`}
                >
                  {TWIST_VERDICTS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`${s.verdict} ${s[v.tone]} ${
                        mark === v.id ? s.verdictOn : ""
                      }`}
                      onClick={() => onMark(c.id, mark === v.id ? null : v.id)}
                      aria-pressed={mark === v.id}
                    >
                      <b>{v.label}</b>
                      <small>{v.desc}</small>
                    </button>
                  ))}
                </span>

                {mark && (
                  <span className={`${s.why} ${right ? s.whyGood : s.whyMiss}`}>
                    {right ? <IconCheck size={15} /> : <IconBulb size={15} />}
                    <span>
                      <b>
                        {right
                          ? "맞아요"
                          : `이건 «${VERDICT_BY_ID[c.answer].label}»에 가까워요`}
                      </b>
                      <br />
                      {c.why}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {done && (
          <div className={s.doneCard}>
            <h3>
              다시 보기 완료 — {correct}/{TWIST_CHECKS.length} 정확
            </h3>
            <p>{TWIST_LESSON}</p>
            <button type="button" className={s.retry} onClick={onReset}>
              <IconRefresh size={15} />
              다시 판단하기
            </button>
          </div>
        )}

        <div className={s.actions}>
          <button type="button" className={s.ghost} onClick={onBack}>
            이전
          </button>
          <button
            type="button"
            className={s.cta}
            onClick={onNext}
            disabled={!done}
          >
            {done
              ? "상담 전략 세우기"
              : `${TWIST_CHECKS.length - markedCount}문장 더 보기`}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
