"use client";

import AssetImage from "@/components/ui/AssetImage";
import { IconCheck, IconNote, IconStar } from "@/components/ui/Icons";
import { STEPS } from "@/lib/shared";
import s from "./StepNav.module.css";

export default function StepNav({ current, onSelect, onOpenNote, progress = 0 }) {
  const currentIdx = STEPS.findIndex((st) => st.id === current);

  return (
    <div className={s.wrap}>
      <nav className={s.bar} aria-label="CASE 진행 단계">
        <span className={s.progressChip}>
          <span className={s.star}>
            <AssetImage
              src="/assets/ui/badge-star"
              alt=""
              bare
              fallback={<IconStar size={15} />}
            />
          </span>
          <span className={s.progressLabel}>CASE 진행도</span>
          <span className={s.progressPct}>{progress}%</span>
        </span>

        <ol className={s.steps}>
          {STEPS.map((step, i) => {
            const state =
              i < currentIdx ? "done" : i === currentIdx ? "current" : "todo";
            return (
              <li key={step.id} className={s.step}>
                {i > 0 && (
                  <span
                    className={`${s.connector} ${
                      i <= currentIdx ? s.connectorDone : ""
                    }`}
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  className={`${s.stepBtn} ${s[state]}`}
                  aria-current={state === "current" ? "step" : undefined}
                  onClick={() => onSelect?.(step.id)}
                >
                  <span className={s.stepNo}>
                    {state === "done" ? <IconCheck size={15} /> : step.no}
                  </span>
                  <span className={s.stepLabel}>{step.label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <button type="button" className={s.noteBtn} onClick={onOpenNote}>
        <IconNote size={19} />
        <span>탐색 노트</span>
      </button>
    </div>
  );
}
