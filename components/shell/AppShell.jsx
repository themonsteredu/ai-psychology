"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import StepNav from "./StepNav";
import TopBar from "./TopBar";
import s from "./AppShell.module.css";

/**
 * 앱 셸 — 좌측 사이드바 + 상단바 + 메인 영역 + 하단 단계 네비게이션.
 * 모든 화면이 이 셸 안에서 렌더링된다.
 */
export default function AppShell({
  step,
  onStepChange,
  sidebarActive = "case",
  onSidebarSelect,
  caseBadge,
  progress = 0,
  points,
  onOpenNote,
  children,
}) {
  const [drawer, setDrawer] = useState(false);

  return (
    <div className={s.shell}>
      <TopBar points={points} onMenu={() => setDrawer(true)} />

      <Sidebar
        active={sidebarActive}
        onSelect={(id) => {
          onSidebarSelect?.(id);
          setDrawer(false);
        }}
        caseBadge={caseBadge}
        open={drawer}
        onClose={() => setDrawer(false)}
      />

      <main className={s.main}>{children}</main>

      {/* 사례를 고르기 전에는 단계 네비게이션이 가리킬 것이 없다. */}
      {step && (
        <StepNav
          current={step}
          onSelect={onStepChange}
          onOpenNote={onOpenNote}
          progress={progress}
        />
      )}
    </div>
  );
}
