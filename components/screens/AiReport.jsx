"use client";

import { useMemo, useState } from "react";
import AssetImage from "@/components/ui/AssetImage";
import {
  IconAlert,
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconRefresh,
  IconSparkle,
} from "@/components/ui/Icons";
import { REPORT_TAGS } from "@/lib/shared";
import s from "./AiReport.module.css";

const TAG_BY_ID = Object.fromEntries(REPORT_TAGS.map((t) => [t.id, t]));

/**
 * 04 AI 리포트 검토 — AI가 쓴 문장을 사실 / 추론 / 더 확인으로 분류한다.
 * marks: { [lineId]: tagId } — 상위(page)에서 보관해 결과 화면 점수로 이어진다.
 */
export default function AiReport({ caseData, marks, onMark, onReset, onNext, onBack }) {
  const AI_REPORT = caseData.report;
  const [active, setActive] = useState(AI_REPORT.lines[0].id);

  const activeLine = AI_REPORT.lines.find((l) => l.id === active) ?? null;
  const activeMark = activeLine ? marks[activeLine.id] : null;

  const { done, correct } = useMemo(() => {
    const marked = AI_REPORT.lines.filter((l) => marks[l.id]);
    return {
      done: marked.length === AI_REPORT.lines.length,
      correct: marked.filter((l) => marks[l.id] === l.answer).length,
    };
  }, [marks]);

  const markedCount = AI_REPORT.lines.filter((l) => marks[l.id]).length;
  const pct = Math.round((markedCount / AI_REPORT.lines.length) * 100);

  const choose = (tagId) => {
    if (!activeLine) return;
    onMark(activeLine.id, tagId);

    // 아직 분류하지 않은 다음 문장으로 자동 이동
    const rest = AI_REPORT.lines.filter(
      (l) => l.id !== activeLine.id && !marks[l.id]
    );
    if (rest.length) setActive(rest[0].id);
  };

  return (
    <section className={s.board} aria-label="AI 리포트 검토">
      {/* ---------------- 좌: AI 리포트 문서 ---------------- */}
      <div className={s.docPane}>
        <header className={s.docHead}>
          <span className={s.bot} aria-hidden="true">
            <AssetImage
              src="/assets/avatar/ai-helper"
              alt=""
              tone="blue"
              fallback={<IconSparkle size={20} />}
            />
          </span>
          <span className={s.docWho}>
            <b>{AI_REPORT.title}</b>
            <small>{AI_REPORT.meta}</small>
          </span>
          <span className={s.docState}>
            <IconSparkle size={14} />
            AI 초안
          </span>
        </header>

        <p className={s.docIntro}>{AI_REPORT.intro}</p>

        <ol className={s.lines}>
          {AI_REPORT.lines.map((line, i) => {
            const mark = marks[line.id];
            const tag = mark ? TAG_BY_ID[mark] : null;
            const isRight = mark === line.answer;

            return (
              <li key={line.id}>
                <button
                  type="button"
                  className={`${s.line} ${active === line.id ? s.lineActive : ""} ${
                    mark ? s.lineMarked : ""
                  }`}
                  onClick={() => setActive(line.id)}
                  aria-current={active === line.id}
                >
                  <span className={s.lineNo}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.lineText}>{line.text}</span>

                  {tag && (
                    <span className={`${s.lineTag} ${s[tag.tone]}`}>
                      <span className={s.lineTagIcon}>
                        {isRight ? <IconCheck size={12} /> : <IconAlert size={12} />}
                      </span>
                      {tag.label}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        <p className={s.docNote}>
          교육용 가상 리포트입니다. 실제 심리 진단이 아니에요.
        </p>
      </div>

      {/* ---------------- 우: 분류 도구 ---------------- */}
      <div className={s.toolPane}>
        <header>
          <span className={s.stepBadge}>STEP 04 · AI 리포트</span>
          <h2 className={s.toolTitle}>이 문장, 믿어도 될까?</h2>
          <p className={s.toolSub}>
            AI가 쓴 문장을 한 줄씩 골라 사실 · 추론 · 더 확인으로 나눠 보세요.
          </p>
        </header>

        <div className={s.progressRow}>
          <span className={s.progressLabel}>검토한 문장</span>
          <span className={s.progressBar}>
            <span className={s.progressFill} style={{ width: `${pct}%` }} />
          </span>
          <span className={s.progressVal}>
            {markedCount}/{AI_REPORT.lines.length}
          </span>
        </div>

        {activeLine ? (
          <>
            <blockquote className={s.quote}>{activeLine.text}</blockquote>

            <ul className={s.tags}>
              {REPORT_TAGS.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    className={`${s.tag} ${s[t.tone]} ${
                      activeMark === t.id ? s.tagOn : ""
                    }`}
                    onClick={() => choose(t.id)}
                  >
                    <span className={s.tagLabel}>{t.label}</span>
                    <span className={s.tagSub}>{t.sub}</span>
                    <span className={s.tagDesc}>{t.desc}</span>
                  </button>
                </li>
              ))}
            </ul>

            {activeMark && (
              <div
                className={`${s.feedback} ${
                  activeMark === activeLine.answer ? s.fbGood : s.fbMiss
                }`}
              >
                {activeMark === activeLine.answer ? (
                  <IconCheck size={16} />
                ) : (
                  <IconBulb size={16} />
                )}
                <span>
                  <b>
                    {activeMark === activeLine.answer
                      ? "정확해요"
                      : `다시 보면 «${TAG_BY_ID[activeLine.answer].label}»에 가까워요`}
                  </b>
                  <br />
                  {activeLine.why}
                </span>
              </div>
            )}
          </>
        ) : null}

        {done && (
          <div className={s.doneCard}>
            <h3>
              리포트 검토 완료 — {correct}/{AI_REPORT.lines.length} 문장 정확
            </h3>
            <p>
              AI는 빠르지만 단정하기 쉬워요. 사실과 추측을 나누는 건 상담사의
              일입니다.
            </p>
            <button type="button" className={s.retry} onClick={onReset}>
              <IconRefresh size={15} />
              다시 분류하기
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
              ? "새 메시지 확인하기"
              : `${AI_REPORT.lines.length - markedCount}문장 더 검토하기`}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
