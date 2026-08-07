"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/shell/AppShell";
import CaseIntro from "@/components/screens/CaseIntro";
import ClueHunt from "@/components/screens/ClueHunt";
import Counseling from "@/components/screens/Counseling";
import AiReport from "@/components/screens/AiReport";
import Strategy from "@/components/screens/Strategy";
import Result from "@/components/screens/Result";
import NoteDrawer from "@/components/screens/NoteDrawer";
import { AI_REPORT, CLUES, DIALOGUE, HELP_CARDS, STEPS } from "@/lib/caseData";

const SIDEBAR_TO_STEP = {
  case: "intro",
  note: "clues",
  board: "signal",
  report: "report",
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
  const [plan, setPlan] = useState({});
  const [noteOpen, setNoteOpen] = useState(false);

  const detection = Math.round((foundClues.length / CLUES.length) * 100);

  const progress = useMemo(() => {
    const idx = STEPS.findIndex((s) => s.id === step);
    const base = (idx / STEPS.length) * 100;
    const within = step === "clues" ? (detection / 100) * (100 / STEPS.length) : 0;
    return Math.min(100, Math.round(base + within));
  }, [step, detection]);

  /** 04~06에서 쓰는 직무 역량 점수 — 모두 실제 플레이 기록에서 계산한다. */
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

    return {
      empathy: Math.round((empathy / maxEmpathy) * 100),
      observation: detection,
      question: Math.round(question),
      judgment: Math.round((planFit / HELP_CARDS.length) * 100),
      ai: Math.round((aiCorrect / AI_REPORT.lines.length) * 100),
    };
  }, [talkLog, reportMarks, plan, detection]);

  const points =
    1260 +
    foundClues.length * 20 +
    talkLog.reduce((a, t) => a + t.score, 0) +
    Object.keys(reportMarks).length * 10 +
    Object.values(plan).filter(Boolean).length * 10;

  const sidebarActive =
    Object.entries(SIDEBAR_TO_STEP).find(([, v]) => v === step)?.[0] ?? "case";

  const restart = () => {
    setFoundClues([]);
    setTalkLog([]);
    setReportMarks({});
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
          onNext={() => setStep("strategy")}
          onBack={() => setStep("signal")}
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
          onBack={() => setStep("report")}
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
