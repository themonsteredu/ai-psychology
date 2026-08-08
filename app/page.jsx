"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/shell/AppShell";
import Title from "@/components/screens/Title";
import CaseIntro from "@/components/screens/CaseIntro";
import ClueHunt from "@/components/screens/ClueHunt";
import Counseling from "@/components/screens/Counseling";
import AiReport from "@/components/screens/AiReport";
import NewMessage from "@/components/screens/NewMessage";
import Strategy from "@/components/screens/Strategy";
import Result from "@/components/screens/Result";
import NoteDrawer from "@/components/screens/NoteDrawer";
import { CASES, getCase } from "@/lib/cases";
import { STEPS } from "@/lib/shared";

const SIDEBAR_TO_STEP = {
  note: "clues",
  board: "signal",
  report: "report",
  message: "twist",
  strategy: "strategy",
  career: "result",
};

/** 선택지 품질 → 질문력 환산 점수 */
const QUESTION_SCORE = { good: 100, soso: 65, poor: 30 };

/** 사례 하나를 푸는 동안 쌓이는 기록 */
const emptyProgress = () => ({
  found: [],
  talkLog: [],
  reportMarks: {},
  twistMarks: {},
  plan: {},
});

export default function Home() {
  const [caseId, setCaseId] = useState(null);
  const [step, setStep] = useState("intro");
  const [progress, setProgress] = useState(emptyProgress);
  /** 완료한 사례의 역량 점수 — { [caseId]: scores } */
  const [done, setDone] = useState({});
  const [noteOpen, setNoteOpen] = useState(false);

  const caseData = caseId ? getCase(caseId) : null;
  const caseIdx = CASES.findIndex((c) => c.id === caseId);
  const isLastCase = caseIdx === CASES.length - 1;

  const { found, talkLog, reportMarks, twistMarks, plan } = progress;
  const patch = (next) => setProgress((prev) => ({ ...prev, ...next }));

  const detection = caseData
    ? Math.round((found.length / caseData.clues.length) * 100)
    : 0;

  const stepPct = useMemo(() => {
    if (!caseData) return 0;
    const idx = STEPS.findIndex((s) => s.id === step);
    /* 단계 수가 아니라 '구간 수'로 나눠야 마지막 단계가 100% 가 된다. */
    const spans = STEPS.length - 1;
    const base = (idx / spans) * 100;
    const within = step === "clues" ? (detection / 100) * (100 / spans) : 0;
    return Math.min(100, Math.round(base + within));
  }, [caseData, step, detection]);

  /** 직무 역량 점수 — 모두 실제 플레이 기록에서 계산한다. */
  const scores = useMemo(() => {
    if (!caseData) return {};

    const maxEmpathy = caseData.dialogue.length * 20;
    const empathy = talkLog.reduce((a, t) => a + t.score, 0);

    const question = talkLog.length
      ? talkLog.reduce((a, t) => a + (QUESTION_SCORE[t.quality] ?? 0), 0) /
        talkLog.length
      : 0;

    const aiCorrect = caseData.report.lines.filter(
      (l) => reportMarks[l.id] === l.answer
    ).length;

    /* 판단력은 두 활동에서 나온다 — 계획의 시점 선택과, 새 정보로 판단을 고쳐 본 결과. */
    const planFit = caseData.helpCards.filter(
      (c) => plan[c.id] === c.recommend
    ).length;
    const twistFit = caseData.twist.checks.filter(
      (c) => twistMarks[c.id] === c.answer
    ).length;
    const judgment =
      (planFit / caseData.helpCards.length +
        twistFit / caseData.twist.checks.length) /
      2;

    return {
      empathy: Math.round((empathy / maxEmpathy) * 100),
      observation: detection,
      question: Math.round(question),
      judgment: Math.round(judgment * 100),
      ai: Math.round((aiCorrect / caseData.report.lines.length) * 100),
    };
  }, [caseData, talkLog, reportMarks, twistMarks, plan, detection]);

  const points =
    1260 +
    Object.keys(done).length * 300 +
    found.length * 20 +
    talkLog.reduce((a, t) => a + t.score, 0) +
    Object.keys(reportMarks).length * 10 +
    Object.values(twistMarks).filter(Boolean).length * 10 +
    Object.values(plan).filter(Boolean).length * 10;

  /** 앞 사례를 끝내야 다음이 열린다 — 목록 대신 순서대로 하나씩. */
  const openCase = (id) => {
    const target = id ?? CASES.find((c) => !done[c.id])?.id ?? CASES[0].id;
    setCaseId(target);
    setStep("intro");
    setProgress(emptyProgress());
  };

  const backToTitle = () => {
    /* 결과 화면까지 간 사례만 완료로 친다 — 중간에 나가면 다음 사례가 열리지 않는다. */
    if (caseId && step === "result") setDone((prev) => ({ ...prev, [caseId]: scores }));
    setCaseId(null);
    setNoteOpen(false);
  };

  const nextCase = () => {
    setDone((prev) => ({ ...prev, [caseId]: scores }));
    const next = CASES[caseIdx + 1];
    if (next) openCase(next.id);
    else setCaseId(null);
  };

  const sidebarActive = caseId
    ? (Object.entries(SIDEBAR_TO_STEP).find(([, v]) => v === step)?.[0] ?? "case")
    : "case";

  return (
    <AppShell
      step={caseId ? step : null}
      onStepChange={setStep}
      sidebarActive={sidebarActive}
      onSidebarSelect={(id) => {
        if (id === "case" || !caseId) backToTitle();
        else setStep(SIDEBAR_TO_STEP[id] ?? "intro");
      }}
      caseBadge={`${Object.keys(done).length}/${CASES.length}`}
      progress={stepPct}
      points={points}
      onOpenNote={() => setNoteOpen(true)}
    >
      {!caseData && <Title done={done} onStart={openCase} />}

      {caseData && step === "intro" && (
        <CaseIntro
          caseData={caseData}
          detection={detection}
          onStart={() => setStep("clues")}
        />
      )}

      {caseData && step === "clues" && (
        <ClueHunt
          caseData={caseData}
          found={found}
          onFind={(id) =>
            patch({ found: found.includes(id) ? found : [...found, id] })
          }
          onNext={() => setStep("signal")}
          onBack={() => setStep("intro")}
        />
      )}

      {caseData && step === "signal" && (
        <Counseling
          caseData={caseData}
          log={talkLog}
          onLog={(entry) => patch({ talkLog: [...talkLog, entry] })}
          onReset={() => patch({ talkLog: [] })}
          onNext={() => setStep("report")}
          onBack={() => setStep("clues")}
        />
      )}

      {caseData && step === "report" && (
        <AiReport
          caseData={caseData}
          marks={reportMarks}
          onMark={(lineId, tagId) =>
            patch({ reportMarks: { ...reportMarks, [lineId]: tagId } })
          }
          onReset={() => patch({ reportMarks: {} })}
          onNext={() => setStep("twist")}
          onBack={() => setStep("signal")}
        />
      )}

      {caseData && step === "twist" && (
        <NewMessage
          caseData={caseData}
          marks={twistMarks}
          onMark={(checkId, verdictId) => {
            const next = { ...twistMarks };
            if (verdictId) next[checkId] = verdictId;
            else delete next[checkId];
            patch({ twistMarks: next });
          }}
          onReset={() => patch({ twistMarks: {} })}
          onNext={() => setStep("strategy")}
          onBack={() => setStep("report")}
        />
      )}

      {caseData && step === "strategy" && (
        <Strategy
          caseData={caseData}
          plan={plan}
          onPlace={(cardId, slotId) => {
            const next = { ...plan };
            if (slotId) next[cardId] = slotId;
            else delete next[cardId];
            patch({ plan: next });
          }}
          onReset={() => patch({ plan: {} })}
          onNext={() => setStep("result")}
          onBack={() => setStep("twist")}
        />
      )}

      {caseData && step === "result" && (
        <Result
          caseData={caseData}
          scores={scores}
          isLast={isLastCase}
          onNext={nextCase}
          onRestart={backToTitle}
          onBack={() => setStep("strategy")}
        />
      )}

      <NoteDrawer
        caseData={caseData}
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        found={found}
        talkLog={talkLog}
      />
    </AppShell>
  );
}
