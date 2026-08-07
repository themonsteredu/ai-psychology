"use client";

import { useEffect, useRef, useState } from "react";
import AssetImage from "@/components/ui/AssetImage";
import { IconArrowRight, IconBulb, IconCheck, IconSend } from "@/components/ui/Icons";
import { DIALOGUE, QUALITY_META } from "@/lib/caseData";
import s from "./Counseling.module.css";

/** 03 상담 대화 — 메신저형 선택지 대화. */
export default function Counseling({ log, onLog, onReset, onNext, onBack }) {
  const turn = DIALOGUE[log.length] ?? null;
  const done = log.length >= DIALOGUE.length;
  const feedRef = useRef(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    feedRef.current?.scrollTo({
      top: feedRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [log.length, typing]);

  const choose = (opt) => {
    setTyping(true);
    const meta = QUALITY_META[opt.quality];
    window.setTimeout(() => {
      setTyping(false);
      onLog({
        turnId: turn.id,
        prompt: turn.text,
        sub: turn.sub,
        choice: opt.text,
        quality: opt.quality,
        feedback: opt.feedback,
        reply: opt.reply,
        score: meta.score,
      });
    }, 620);
  };

  const total = log.reduce((a, t) => a + t.score, 0);
  const maxTotal = DIALOGUE.length * QUALITY_META.good.score;

  return (
    <section className={s.board} aria-label="상담 대화">
      {/* ---------------- 좌: 대화 ---------------- */}
      <div className={s.chatPane}>
        {/* 상담실 배경 — 방과 그 안에 앉은 민서를 한 겹으로 깔고,
            말풍선은 그 위에 얹는다. */}
        <span className={s.room} aria-hidden="true">
          <AssetImage
            src="/assets/scene/counseling-room"
            alt=""
            bare
            className={s.roomBg}
          />
          <AssetImage
            src="/assets/char/minseo-talk"
            alt=""
            bare
            className={s.roomMinseo}
          />
        </span>

        <header className={s.chatHead}>
          <span className={s.avatar} aria-hidden="true">
            <AssetImage src="/assets/avatar/minseo" alt="" tone="mint" />
          </span>
          <span className={s.chatWho}>
            <b>민서</b>
            <small>2학년 3반 · 상담실</small>
          </span>
          <span className={s.chatState}>
            <span className={s.chatDot} />
            상담 진행 중
          </span>
        </header>

        <div className={s.feed} ref={feedRef}>
          <p className={s.systemNote}>
            교육용 가상 상담입니다. 실제 심리 진단이 아니에요.
          </p>

          {log.map((entry, i) => (
            <div key={entry.turnId} className={s.block}>
              <Bubble side="them" text={entry.prompt} sub={i === 0 ? entry.sub : null} />
              <Bubble side="me" text={entry.choice} tone={entry.quality} />
              <div className={`${s.feedback} ${s[entry.quality]}`}>
                <IconBulb size={15} />
                <span>
                  <b>{QUALITY_META[entry.quality].label}</b> · {entry.feedback}
                </span>
              </div>
              <Bubble side="them" text={entry.reply} />
            </div>
          ))}

          {turn && !typing && (
            <div className={s.block}>
              <Bubble side="them" text={turn.text} sub={turn.sub} />
            </div>
          )}

          {typing && (
            <div className={s.typing} aria-label="민서가 입력 중">
              <span />
              <span />
              <span />
            </div>
          )}

          {done && (
            <div className={s.doneCard}>
              <span className={s.doneIcon}>
                <IconCheck size={22} />
              </span>
              <h3>1차 상담을 마쳤어요</h3>
              <p>
                공감 점수 <b>{total}</b> / {maxTotal}점 — 민서가 마음속 이야기를
                꺼내기 시작했어요. 다음 단계에서 시그널을 정리해 봅시다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- 우: 선택지 ---------------- */}
      <div className={s.pickPane}>
        <header>
          <span className={s.stepBadge}>STEP 03 · 상담 대화</span>
          <h2 className={s.pickTitle}>상담사의 한마디</h2>
          <p className={s.pickSub}>
            민서의 마음이 열리는 말을 골라 보세요. 정답보다 태도가 중요해요.
          </p>
        </header>

        <div className={s.scoreRow}>
          <span className={s.scoreLabel}>공감 점수</span>
          <span className={s.scoreBar}>
            <span
              className={s.scoreFill}
              style={{ width: `${Math.round((total / maxTotal) * 100)}%` }}
            />
          </span>
          <span className={s.scoreVal}>{total}</span>
        </div>

        {turn ? (
          <ul className={s.options}>
            {turn.options.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  className={s.option}
                  onClick={() => choose(o)}
                  disabled={typing}
                >
                  <span className={s.optionText}>{o.text}</span>
                  <span className={s.optionSend}>
                    <IconSend size={16} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.finished}>
            <p>모든 대화를 마쳤어요. 다시 해 보면 다른 반응을 볼 수 있어요.</p>
            <button type="button" className={s.ghost} onClick={onReset}>
              대화 다시 하기
            </button>
          </div>
        )}

        <div className={s.tips}>
          <h4>기억할 점</h4>
          <ul>
            <li>감정을 먼저 알아주고, 조언은 나중에.</li>
            <li>&quot;왜&quot;보다 &quot;어떤 느낌이었어?&quot;로 물어보기.</li>
            <li>내 추측을 사실처럼 말하지 않기.</li>
          </ul>
        </div>

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
            AI 리포트 검토하기
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Bubble({ side, text, sub, tone }) {
  return (
    <div className={`${s.row} ${side === "me" ? s.rowMe : s.rowThem}`}>
      <div className={`${s.bubble} ${side === "me" ? s.me : s.them} ${tone ? s[`b_${tone}`] : ""}`}>
        {text}
      </div>
      {sub && <p className={s.sub}>{sub}</p>}
    </div>
  );
}
