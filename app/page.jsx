"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/shell/AppShell";
import CaseIntro from "@/components/screens/CaseIntro";
import ClueHunt from "@/components/screens/ClueHunt";
import Counseling from "@/components/screens/Counseling";
import AiReport from "@/components/screens/AiReport";
import NewMessage from "@/components/screens/NewMessage";
import Strategy from "@/components/screens/Strategy";
import Result from "@/components/screens/Result";
import NoteDrawer from "@/components/screens/NoteDrawer";
import {
  AI_REPORT,
  CLUES,
  DIALOGUE,
  HELP_CARDS,
  STEPS,
  TWIST_CHECKS,
} from "@/lib/caseData";

const SIDEBAR_TO_STEP = {
  case: "intro",
  note: "clues",
  board: "signal",
  report: "report",
  message: "twist",
  strategy: "strategy",
  career: "result",
};

/** 선택지 품질 → 질문력 환산 점수 */
const QUESTION_SCORE = { good: 100, soso: 65, poor: 30 };

export default function Home() {
  const [step, setStep] = useState("intro");
  const [foundClues, setFoundClues] = useState([]);
  const [talkLog, setTalkLog] = useState([]);
  const [reportMarks, setReportMarks] = useState({});
  const [twistMarks, setTwistMarks] = useState({});
  const [plan, setPlan] = useState({});
  const [noteOpen, setNoteOpen] = useState(false);

  const detection = Math.round((foundClues.length / CLUES.length) * 100);

  const progress = useMemo(() => {
    const idx = STEPS.findIndex((s) => s.id === step);
    /* 단계 수가 아니라 '구간 수'로 나눠야 마지막 단계가 100% 가 된다. */
    const spans = STEPS.length - 1;
    const base = (idx / spans) * 100;
    const within = step === "clues" ? (detection / 100) * (100 / spans) : 0;
    return Math.min(100, Math.round(base + within));
  }, [step, detection]);

  /** 04~07에서 쓰는 직무 역량 점수 — 모두 실제 플레이 기록에서 계산한다. */
  const scores = useMemo(() => {
    const maxEmpathy = DIALOGUE.length * 20;
    const empathy = talkLog.reduce((a, t) => a + t.score, 0);

    const question = talkLog.length
      ? talkLog.reduce((a, t) => a + (QUESTION_SCORE[t.quality] ?? 0), 0) /
        talkLog.length
      : 0;

    const aiCorrect = AI_REPORT.lines.filter(
      (l) => reportMarks[l.id] === l.answer
    ).length;

    const planFit = HELP_CARDS.filter((c) => plan[c.id] === c.recommend).length;

    /* 판단력은 두 활동에서 나온다 — 계획의 시점 선택과, 새 정보로 판단을 고쳐 본 결과. */
    const twistFit = TWIST_CHECKS.filter(
      (c) => twistMarks[c.id] === c.answer
    ).length;
    const judgment =
      (planFit / HELP_CARDS.length + twistFit / TWIST_CHECKS.length) / 2;

    return {
      empathy: Math.round((empathy / maxEmpathy) * 100),
      observation: detection,
      question: Math.round(question),
      judgment: Math.round(judgment * 100),
      ai: Math.round((aiCorrect / AI_REPORT.lines.length) * 100),
    };
  }, [talkLog, reportMarks, twistMarks, plan, detection]);

  const points =
    1260 +
    foundClues.length * 20 +
    talkLog.reduce((a, t) => a + t.score, 0) +
    Object.keys(reportMarks).length * 10 +
    Object.values(twistMarks).filter(Boolean).length * 10 +
    Object.values(plan).filter(Boolean).length * 10;

  const sidebarActive =
    Object.entries(SIDEBAR_TO_STEP).find(([, v]) => v === step)?.[0] ?? "case";

  const restart = () => {
    setFoundClues([]);
    setTalkLog([]);
    setReportMarks({});
    setTwistMarks({});
    setPlan({});
    setStep("intro");
  };

  return (
    <AppShell
      step={step}
      onStepChange={setStep}
      sidebarActive={sidebarActive}
      onSidebarSelect={(id) => setStep(SIDEBAR_TO_STEP[id] ?? "intro")}
      progress={progress}
      points={points}
      onOpenNote={() => setNoteOpen(true)}
    >
      {step === "intro" && (
        <CaseIntro detection={detection} onStart={() => setStep("clues")} />
      )}

      {step === "clues" && (
        <ClueHunt
          found={foundClues}
          onFind={(id) =>
            setFoundClues((prev) => (prev.includes(id) ? prev : [...prev, id]))
          }
          onNext={() => setStep("signal")}
          onBack={() => setStep("intro")}
        />
      )}

      {step === "signal" && (
        <Counseling
          log={talkLog}
          onLog={(entry) => setTalkLog((prev) => [...prev, entry])}
          onReset={() => setTalkLog([])}
          onNext={() => setStep("report")}
          onBack={() => setStep("clues")}
        />
      )}

      {step === "report" && (
        <AiReport
          marks={reportMarks}
          onMark={(lineId, tagId) =>
            setReportMarks((prev) => ({ ...prev, [lineId]: tagId }))
          }
          onReset={() => setReportMarks({})}
          onNext={() => setStep("twist")}
          onBack={() => setStep("signal")}
        />
      )}

      {step === "twist" && (
        <NewMessage
          marks={twistMarks}
          onMark={(checkId, verdictId) =>
            setTwistMarks((prev) => {
              const next = { ...prev };
              if (verdictId) next[checkId] = verdictId;
              else delete next[checkId];
              return next;
            })
          }
          onReset={() => setTwistMarks({})}
          onNext={() => setStep("strategy")}
          onBack={() => setStep("report")}
        />
      )}

      {step === "strategy" && (
        <Strategy
          plan={plan}
          onPlace={(cardId, slotId) =>
            setPlan((prev) => {
              const next = { ...prev };
              if (slotId) next[cardId] = slotId;
              else delete next[cardId];
              return next;
            })
          }
          onReset={() => setPlan({})}
          onNext={() => setStep("result")}
          onBack={() => setStep("twist")}
        />
      )}

      {step === "result" && (
        <Result
          scores={scores}
          onRestart={restart}
          onBack={() => setStep("strategy")}
        />
      )}

      <NoteDrawer
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
        found={foundClues}
        talkLog={talkLog}
      />
    </AppShell>
  );
}
