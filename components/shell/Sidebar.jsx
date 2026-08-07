"use client";

import {
  IconBoard,
  IconCareer,
  IconCase,
  IconMail,
  IconNote,
  IconReport,
  IconStrategy,
} from "@/components/ui/Icons";
import { SIDEBAR_ITEMS } from "@/lib/caseData";
import AiHelper from "./AiHelper";
import s from "./Sidebar.module.css";

const ICONS = {
  case: IconCase,
  note: IconNote,
  board: IconBoard,
  report: IconReport,
  mail: IconMail,
  strategy: IconStrategy,
  career: IconCareer,
};

export default function Sidebar({ active, onSelect, open, onClose }) {
  return (
    <>
      <div
        className={`${s.scrim} ${open ? s.scrimOn : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`${s.sidebar} ${open ? s.open : ""}`}
        aria-label="주요 메뉴"
      >
        <nav className={s.nav}>
          <ul>
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`${s.item} ${isActive ? s.active : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onSelect?.(item.id)}
                  >
                    <span className={s.itemIcon}>
                      <Icon size={20} />
                    </span>
                    <span className={s.itemLabel}>{item.label}</span>
                    {item.badge && <span className={s.itemBadge}>{item.badge}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <AiHelper />
      </aside>
    </>
  );
}
