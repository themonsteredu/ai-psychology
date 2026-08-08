"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CaseScene from "@/components/scene/CaseScene";
import AssetImage from "@/components/ui/AssetImage";
import {
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconNote,
  IconPeople,
  IconSearch,
} from "@/components/ui/Icons";
import { CLUE_SOURCES, getSource } from "@/lib/shared";
import { withParticle } from "@/lib/korean";
import s from "./ClueHunt.module.css";

/** 손전등이 한 지점을 비추는 시간 (ms) */
const TORCH_MS = 3800;
/** 장면에서 아무것도 못 찾고 이만큼 지나면 손전등이 알아서 켜진다 (ms) */
const IDLE_MS = 30000;

const SOURCE_ICON = { search: IconSearch, note: IconNote, people: IconPeople };

/**
 * 02 단서 탐색 — 세 곳에서 단서를 모은다.
 *
 * 장면 한 장에서 전부 찾게 하면, 정지된 그림으로는 알 수 없는 것("어제까지
 * 달려 있던 키링", "이번 주에만 세 번째")까지 찾으라고 시키게 된다. 그래서
 * 단서마다 출처를 나눴다 — 장면은 눈으로, 기록은 자료로, 이야기는 사람에게서.
 * 출처가 다르면 얼마나 믿을지도 달라야 한다는 게 이 단계의 진짜 수업이다.
 */
export default function ClueHunt({ caseData, found, onFind, onNext, onBack }) {
  const CLUES = caseData.clues;
  const CLUE_HINTS = caseData.clueHints;
  const [tab, setTab] = useState("scene");
  const [active, setActive] = useState(null);
  const [hint, setHint] = useState(0);
  const [torch, setTorch] = useState(null);
  const torchTimer = useRef(null);

  /** 출처별로 나눈 단서 — 탭 하나가 정보원 한 곳이다. */
  const bySource = useMemo(() => {
    const map = Object.fromEntries(CLUE_SOURCES.map((src) => [src.id, []]));
    CLUES.forEach((c) => map[c.source]?.push(c));
    return map;
  }, [CLUES]);

  const sceneClues = bySource.scene;
  const tabClues = bySource[tab] ?? [];
  const source = getSource(tab);

  const all = found.length === CLUES.length;
  const pct = Math.round((found.length / CLUES.length) * 100);
  const activeClue = CLUES.find((c) => c.id === active) ?? null;
  const torchClue = sceneClues.find((c) => c.id === torch) ?? null;

  /** 장면에서 아직 못 찾은 단서 하나를 손전등으로 비춘다. */
  const shine = useCallback(() => {
    const rest = sceneClues.filter((c) => !found.includes(c.id));
    if (!rest.length) return;
    setTorch(rest[0].id);
    window.clearTimeout(torchTimer.current);
    torchTimer.current = window.setTimeout(() => setTorch(null), TORCH_MS);
  }, [sceneClues, found]);

  const sceneDone = sceneClues.every((c) => found.includes(c.id));
  const srcDone = tabClues.length > 0 && tabClues.every((c) => found.includes(c.id));

  /* 장면을 보고 있는데 한참 진전이 없으면 알아서 비춰 준다. */
  useEffect(() => {
    if (tab !== "scene" || sceneDone) return undefined;
    const t = window.setTimeout(shine, IDLE_MS);
    return () => window.clearTimeout(t);
  }, [tab, sceneDone, shine, found.length]);

  /* 다른 정보원으로 옮기면 손전등은 끈다. */
  useEffect(() => {
    setTorch(null);
    window.clearTimeout(torchTimer.current);
  }, [tab]);

  useEffect(() => () => window.clearTimeout(torchTimer.current), []);

  const pick = (clue) => {
    onFind(clue.id);
    setActive(clue.id);
    setTorch(null);
    window.clearTimeout(torchTimer.current);
  };

  return (
    <section className={s.board} aria-label="단서 탐색">
      {/* ---------------- 좌: 정보원 ---------------- */}
      <div className={s.sourcePane}>
        {/* 정보원 탭 */}
        <div className={s.tabs} role="tablist" aria-label="단서를 모을 곳">
          {CLUE_SOURCES.map((src) => {
            const list = bySource[src.id] ?? [];
            const got = list.filter((c) => found.includes(c.id)).length;
            const Icon = SOURCE_ICON[src.icon];
            return (
              <button
                key={src.id}
                type="button"
                role="tab"
                aria-selected={tab === src.id}
                className={`${s.tab} ${tab === src.id ? s.tabOn : ""} ${
                  s[src.tone]
                }`}
                onClick={() => setTab(src.id)}
              >
                <Icon size={17} />
                <span className={s.tabLabel}>{src.label}</span>
                <span className={s.tabCount}>
                  {got}/{list.length}
                </span>
              </button>
            );
          })}
        </div>

        <p className={`${s.sourceDesc} ${srcDone ? s.sourceDone : ""}`}>
          {srcDone ? <IconCheck size={15} /> : null}
          {srcDone
            ? `${source.label}에서 얻을 수 있는 단서는 다 모았어요. 위에서 다른 정보원을 열어 보세요.`
            : source.desc}
        </p>

        {/* ---- 장면: 그림을 관찰해 직접 찾는다 ---- */}
        {tab === "scene" && (
          <div className={s.scenePane}>
            <CaseScene
              scene={caseData.scene}
              className={s.scene}
              title={caseData.title}
              spotlight={
                active
                  ? (caseData.spotlightOf?.[active] ??
                    caseData.scene.figures.at(-1)?.id)
                  : null
              }
            />

            <div className={s.sceneTop}>
              <span className={s.stepBadge}>STEP 02</span>
              <span className={s.sceneTitle}>{caseData.sceneTitle}</span>
            </div>

            {torchClue && (
              <span
                className={s.torch}
                style={{ "--tx": `${torchClue.x}%`, "--ty": `${torchClue.y}%` }}
                aria-hidden="true"
              />
            )}

            {sceneClues.map((c) => {
              const isFound = found.includes(c.id);
              const lit = torch === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`${s.hotspot} ${c.flip ? s.hotFlip : ""} ${
                    isFound ? s.hotFound : s.hotHidden
                  } ${lit ? s.hotLit : ""} ${active === c.id ? s.hotActive : ""}`}
                  style={{ left: `${c.x}%`, top: `${c.y}%` }}
                  onClick={() => pick(c)}
                  aria-label={isFound ? `찾은 단서: ${c.label}` : "관찰할 지점"}
                  aria-pressed={isFound}
                >
                  <span className={s.hotDot}>
                    {isFound ? <IconCheck size={16} /> : <IconSearch size={16} />}
                  </span>
                  <span className={s.hotLabel}>{c.label}</span>
                </button>
              );
            })}

            <div className={s.detect}>
              <span className={s.detectIcon}>
                <IconSearch size={20} />
              </span>
              <span className={s.detectText}>
                <span className={s.detectLabel}>시그널 탐지율</span>
                <span className={s.detectValue}>{pct}%</span>
              </span>
              <span className={s.detectBar} aria-hidden="true">
                <span className={s.detectFill} style={{ width: `${pct}%` }} />
              </span>
            </div>

            {!sceneDone && (
              <button type="button" className={s.torchBtn} onClick={shine} disabled={Boolean(torch)}>
                <IconSearch size={15} />
                손전등 비추기
              </button>
            )}
          </div>
        )}

        {/* ---- 기록: 학교 자료를 한 줄씩 읽는다 ---- */}
        {tab === "record" && (
          <ul className={s.papers}>
            {tabClues.map((c) => {
              const isFound = found.includes(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`${s.paper} ${isFound ? s.paperOn : ""} ${
                      active === c.id ? s.paperActive : ""
                    }`}
                    onClick={() => pick(c)}
                  >
                    <span className={s.paperFrom}>
                      <IconNote size={14} />
                      {c.from}
                    </span>
                    <b className={s.paperTitle}>
                      {isFound ? c.label : "아직 열어 보지 않은 기록"}
                    </b>
                    <span className={s.paperLine}>
                      {isFound ? c.text : "눌러서 내용을 확인하세요."}
                    </span>
                    {isFound && (
                      <span className={s.paperStamp}>
                        <IconCheck size={13} />
                        기록함
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* ---- 이야기: 주변 사람에게 듣는다 ---- */}
        {tab === "voice" && (
          <ul className={s.voices}>
            {tabClues.map((c) => {
              const isFound = found.includes(c.id);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    className={`${s.voice} ${isFound ? s.voiceOn : ""} ${
                      active === c.id ? s.voiceActive : ""
                    }`}
                    onClick={() => pick(c)}
                  >
                    {/* 얼굴 그림이 있는 인물만 사진을 쓴다. 없으면 실루엣 —
                        다른 사람의 얼굴을 빌려 쓰면 누가 말한 건지 헷갈린다. */}
                    <span className={s.voiceFace}>
                      {c.avatar ? (
                        <AssetImage
                          src={c.avatar}
                          alt=""
                          tone="lime"
                          fallback={<IconPeople size={22} />}
                        />
                      ) : (
                        <IconPeople size={22} />
                      )}
                    </span>
                    <span className={s.voiceBody}>
                      <b className={s.voiceWho}>{c.who}</b>
                      <span className={s.voiceNote}>{c.whoNote}</span>
                      <span className={s.voiceLine}>
                        {isFound ? c.text : "“…잠깐 얘기 좀 할 수 있을까요?” 눌러서 들어 보세요."}
                      </span>
                    </span>
                    {isFound && (
                      <span className={s.voiceStamp}>
                        <IconCheck size={13} />
                        들음
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
            <li className={s.voiceWarn}>
              <IconBulb size={15} />
              {source.trust}
            </li>
          </ul>
        )}
      </div>

      {/* ---------------- 우: 탐색 노트 ---------------- */}
      <div className={s.notePane}>
        <header className={s.noteHead}>
          <h2 className={s.noteTitle}>
            단서 <em>{found.length}</em> / {CLUES.length}
          </h2>
          <p className={s.noteSub}>
            상담사는 한 곳만 보지 않아요. <b>장면 · 기록 · 이야기</b> 세 곳을
            모두 열어 봐야 단서가 다 모입니다.
          </p>
        </header>

        {/* 선택된 단서 상세 */}
        <div className={`${s.detail} ${activeClue ? s.detailOn : ""}`}>
          {activeClue ? (
            <>
              <span className={s.detailTags}>
                <span className={`${s.kind} ${s[activeClue.tone]}`}>
                  {activeClue.kind}
                </span>
                <span className={`${s.srcTag} ${s[getSource(activeClue.source).tone]}`}>
                  {getSource(activeClue.source).label}에서
                </span>
              </span>
              <h3 className={s.detailTitle}>{activeClue.label}</h3>
              <p className={s.detailText}>{activeClue.text}</p>
              <p className={s.detailInsight}>
                <IconBulb size={16} />
                {activeClue.insight}
              </p>
            </>
          ) : (
            <p className={s.detailEmpty}>
              아직 선택한 단서가 없어요.
              <br />
              왼쪽에서 정보원을 골라 하나씩 열어 보세요.
            </p>
          )}
        </div>

        {/* 수집 목록 — 출처별로 묶어서 보여 준다 */}
        <div className={s.clueGroups}>
          {CLUE_SOURCES.map((src) => {
            const list = bySource[src.id] ?? [];
            if (!list.length) return null;
            return (
              <section key={src.id} className={s.clueGroup}>
                <h4 className={`${s.groupHead} ${s[src.tone]}`}>
                  {src.label}
                  <span>{src.sub}</span>
                </h4>
                <ul className={s.clueList}>
                  {list.map((c) => {
                    const isFound = found.includes(c.id);
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          className={`${s.clueRow} ${isFound ? s.clueOn : ""} ${
                            active === c.id ? s.clueActive : ""
                          }`}
                          onClick={() => {
                            if (!isFound) return setTab(src.id);
                            setActive(c.id);
                            setTab(src.id);
                          }}
                        >
                          <span className={s.clueCheck}>
                            {isFound ? <IconCheck size={14} /> : null}
                          </span>
                          <span className={s.clueName}>
                            {isFound ? c.label : "아직 찾지 못한 단서"}
                          </span>
                          {isFound && (
                            <span className={`${s.dotTone} ${s[c.tone]}`} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        {/* 힌트 */}
        <button
          type="button"
          className={s.hint}
          onClick={() => setHint((h) => (h + 1) % CLUE_HINTS.length)}
        >
          <IconBulb size={17} />
          <span>{CLUE_HINTS[hint]}</span>
        </button>

        <div className={s.actions}>
          <button type="button" className={s.ghost} onClick={onBack}>
            이전
          </button>
          <button type="button" className={s.cta} onClick={onNext} disabled={!all}>
            {all
              ? `${withParticle(caseData.subject.name, "과")} 대화하기`
              : `단서 ${CLUES.length - found.length}개 더 찾기`}
            <IconArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
