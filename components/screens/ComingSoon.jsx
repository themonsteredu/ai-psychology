"use client";

import { IconArrowRight, IconBoard, IconLock, IconReport, IconStrategy } from "@/components/ui/Icons";
import s from "./ComingSoon.module.css";

const INFO = {
  report: {
    icon: IconReport,
    step: "STEP 04",
    title: "AI 리포트 검토",
    desc: "AI가 정리한 민서 분석 리포트를 읽고 사실 · 추론 · 더 확인할 정보로 나눠 봅니다.",
    points: [
      "AI 문장을 사실 / 추측으로 분류하기",
      "근거가 부족한 문장 찾아내기",
      "상담사가 직접 확인해야 할 항목 정리하기",
    ],
  },
  strategy: {
    icon: IconStrategy,
    step: "STEP 05",
    title: "상담 전략 세우기",
    desc: "민서에게 맞는 도움 카드를 골라 나만의 상담 계획을 만듭니다.",
    points: [
      "지금 필요한 도움과 나중에 할 일 구분하기",
      "혼자 할 일 / 어른과 함께할 일 나누기",
      "상담 계획을 카드로 조합하기",
    ],
  },
  result: {
    icon: IconBoard,
    step: "STEP 06",
    title: "결과 확인 · 진로 리포트",
    desc: "이번 체험에서 사용한 직무 역량을 정리하고, 관련된 진로를 살펴봅니다.",
    points: [
      "관찰력 · 공감 · 질문력 등 역량 되돌아보기",
      "청소년상담사가 하는 일 알아보기",
      "함께 살펴볼 관련 직업 소개",
    ],
  },
};

/** 04~06 단계 — 구조와 학습 목표를 먼저 보여주는 준비 화면. */
export default function ComingSoon({ step, onBack }) {
  const info = INFO[step] ?? INFO.report;
  const Icon = info.icon;

  return (
    <section className={s.board} aria-label={info.title}>
      <div className={s.inner}>
        <span className={s.badge}>{info.step}</span>

        <span className={s.bigIcon}>
          <Icon size={38} />
        </span>

        <h2 className={s.title}>{info.title}</h2>
        <p className={s.desc}>{info.desc}</p>

        <ul className={s.points}>
          {info.points.map((p) => (
            <li key={p}>
              <span className={s.tick} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>

        <span className={s.lock}>
          <IconLock size={15} />
          이 단계는 다음 업데이트에서 열려요
        </span>

        <button type="button" className={s.back} onClick={onBack}>
          이전 단계로 돌아가기
          <IconArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}
