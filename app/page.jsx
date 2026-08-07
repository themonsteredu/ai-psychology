"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/shell/AppShell";
import CaseIntro from "@/components/screens/CaseIntro";
import ClueHunt from "@/components/screens/ClueHunt";
import Counseling from "@/components/screens/Counseling";
import ComingSoon from "@/components/screens/ComingSoon";
import NoteDrawer from "@/components/screens/NoteDrawer";
import { CLUES, STEPS } from "@/lib/caseData";

const SIDEBAR_TO_STEP = {
  case: "intro",
  note: "clues",
  board: "signal",
  report: "report",
  strategy: "strategy",
  career: "result",
};

export default function Home() {
  const [step, setStep] = useState("intro");
  const [foundClues, setFoundClues] = useState([]);
  const [talkLog, setTalkLog] = useState([]);
  const [noteOpen, setNoteOpen] = useState(false);

  const detection = Math.round((foundClues.length / CLUES.length) * 100);

  const progress = useMemo(() => {
    const idx = STEPS.findIndex((s) => s.id === step);
    const base = (idx / STEPS.length) * 100;
    const within = step === "clues" ? (detection / 100) * (100 / STEPS.length) : 0;
    return Math.min(100, Math.round(base + within));
  }, [step, detection]);

  const points = 1260 + foundClues.length * 20 + talkLog.reduce((a, t) => a + t.score, 0);

  const sidebarActive =
    Object.entries(SIDEBAR_TO_STEP).find(([, v]) => v === step)?.[0] ?? "case";

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
          onBack={() => setStep("clues")}
        />
      )}

      {["report", "strategy", "result"].includes(step) && (
        <ComingSoon step={step} onBack={() => setStep("signal")} />
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
