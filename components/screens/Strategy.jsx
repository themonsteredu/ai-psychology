"use client";

import { useMemo } from "react";
import {
  IconArrowRight,
  IconBulb,
  IconCase,
  IconChat,
  IconCheck,
  IconHeart,
  IconPeople,
  IconRefresh,
  IconSearch,
  IconSparkle,
} from "@/components/ui/Icons";
import { HELP_CARDS, PLAN_SLOTS } from "@/lib/caseData";
import s from "./Strategy.module.css";

const ICONS = {
  chat: IconChat,
  heart: IconHeart,
  people: IconPeople,
  sparkle: IconSparkle,
  case: IconCase,
  search: IconSearch,
};

/**
 * 05 상담 전략 — 도움 카드를 세 개의 시점 슬롯에 배치해 상담 계획을 만든다.
 * plan: { [cardId]: slotId } — 상위(page)에서 보관해 결과 화면 점수로 이어진다.
 */
export default function Strategy({ plan, onPlace, onReset, onNext, onBack }) {
  const placed = HELP_CARDS.filter((c) => plan[c.id]);

  const { filledSlots, matched } = useMemo(
    () => ({
      filledSlots: PLAN_SLOTS.filter((slot) =>
        HELP_CARDS.some((c) => plan[c.id] === slot.id),
      ).length,
      matched: HELP_CARDS.filter((c) => plan[c.id] === c.recommend).length,
    }),
    [plan],
  );

  const allPlaced = placed.length === HELP_CARDS.length;
  const ready = allPlaced && filledSlots === PLAN_SLOTS.length;

  return (
    <section className={s.board} aria-label="상담 전략 세우기">
      {/* ---------------- 좌: 계획 보드 ---------------- */}
      <div className={s.planPane}>
        {/* 카드 목록이 길어져도 계획표가 화면에 남도록 sticky 처리 */}
        <div className={s.planInner}>
          <header className={s.planHead}>
            <span className={s.stepBadge}>STEP 05</span>
            <h2 className={s.planTitle}>민서를 위한 상담 계획</h2>
            <p className={s.planSub}>
              오른쪽 도움 카드를 언제 할 일인지 골라 계획표에 채워 보세요.
            </p>
          </header>

          <div className={s.slots}>
            {PLAN_SLOTS.map((slot) => {
              const cards = HELP_CARDS.filter((c) => plan[c.id] === slot.id);
              return (
                <section key={slot.id} className={`${s.slot} ${s[slot.tone]}`}>
                  <header className={s.slotHead}>
                    <span className={s.slotNo}>{slot.no}</span>
                    <span className={s.slotWho}>
                      <b>{slot.label}</b>
                      <small>{slot.desc}</small>
                    </span>
                    <span className={s.slotCount}>{cards.length}</span>
                  </header>

                  {cards.length ? (
                    <ul className={s.slotList}>
                      {cards.map((c) => {
                        const Icon = ICONS[c.icon];
                        const fits = plan[c.id] === c.recommend;
                        return (
                          <li key={c.id} className={s.slotItem}>
                            <span className={s.slotItemIcon}>
                              <Icon size={15} />
                            </span>
                            <span className={s.slotItemName}>{c.title}</span>
                            {fits && (
                              <span
                                className={s.slotItemFit}
                                title="추천 시점과 일치"
                              >
                                <IconCheck size={13} />
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className={s.slotEmpty}>아직 비어 있어요</p>
                  )}
                </section>
              );
            })}
          </div>

          <p className={s.planNote}>
            정답을 맞히는 활동이 아니에요. 왜 그 시점을 골랐는지 설명할 수
            있으면 충분합니다.
          </p>
        </div>
      </div>

      {/* ---------------- 우: 도움 카드 ---------------- */}
      <div className={s.cardPane}>
        <header>
          <h3 className={s.cardTitle}>
            도움 카드 <em>{placed.length}</em> / {HELP_CARDS.length}
          </h3>
          <p className={s.cardSub}>
            카드마다 &quot;언제 할 일인지&quot;를 골라 주세요. 다시 눌러 바꿀 수
            있어요.
          </p>
        </header>

        <ul className={s.cards}>
          {HELP_CARDS.map((c) => {
            const Icon = ICONS[c.icon];
            const at = plan[c.id];
            const fits = at === c.recommend;

            return (
              <li key={c.id} className={`${s.card} ${at ? s.cardOn : ""}`}>
                <span className={s.cardIcon}>
                  <Icon size={18} />
                </span>

                <span className={s.cardBody}>
                  <b className={s.cardName}>{c.title}</b>
                  <span className={s.cardDesc}>{c.desc}</span>

                  <span
                    className={s.picker}
                    role="group"
                    aria-label={`${c.title} 시점 선택`}
                  >
                    {PLAN_SLOTS.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        className={`${s.pick} ${s[slot.tone]} ${
                          at === slot.id ? s.pickOn : ""
                        }`}
                        onClick={() =>
                          onPlace(c.id, at === slot.id ? null : slot.id)
                        }
                        aria-pressed={at === slot.id}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </span>

                  {at && (
                    <span
                      className={`${s.tip} ${fits ? s.tipGood : s.tipElse}`}
                    >
                      <IconBulb size={14} />
                      {c.why}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {ready && (
          <div className={s.doneCard}>
            <h4>
              계획 완성 — 추천 시점과 {matched}/{HELP_CARDS.length} 일치
            </h4>
            <p>
              상담은 순서가 중요해요. 마음을 먼저 듣고, 어른과 함께할 일은 혼자
              결정하지 않습니다.
            </p>
            <button type="button" className={s.retry} onClick={onReset}>
              <IconRefresh size={15} />
              계획 다시 짜기
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
            disabled={!ready}
          >
            {ready
              ? "결과 확인하기"
              : !allPlaced
                ? `카드 ${HELP_CARDS.length - placed.length}개 더 배치하기`
                : "세 시점을 모두 채워 주세요"}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
