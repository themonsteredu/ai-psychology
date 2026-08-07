"use client";

import AssetImage from "@/components/ui/AssetImage";
import s from "./HallwayScene.module.css";

/**
 * 학교 복도 장면 — 일러스트 에셋 합성
 *
 * 배경(복도)과 인물을 각각의 이미지로 겹쳐서 구성한다.
 * 인물 위치를 장면 대비 % 로 잡기 때문에, 배경이 어떤 비율로 잘려도
 * 위에 얹히는 단서 핫스팟(역시 %)과 인물의 위치 관계는 유지된다.
 *
 * - 배경        public/assets/scene/hallway
 * - 전경 우측   public/assets/char/minseo-full   — 무리에서 떨어져 휴대폰만 보는 민서
 * - 중경 좌측   public/assets/char/friends-full  — 대화 중인 친구 3명
 *
 * props.spotlight — 특정 인물을 강조하고 나머지를 흐린다(단서 탐색 화면).
 */
export default function HallwayScene({
  className = "",
  spotlight = null,
  title = "햇빛이 드는 학교 복도. 친구 세 명이 이야기를 나누고, 민서는 조금 떨어진 곳에서 혼자 휴대폰을 보고 있다.",
}) {
  const dim = (who) => (spotlight && spotlight !== who ? s.dim : "");

  return (
    <div className={`${s.scene} ${className}`} role="img" aria-label={title}>
      <AssetImage src="/assets/scene/hallway" alt="" tone="blue" className={s.bg} />

      <span className={`${s.figure} ${s.friends} ${dim("friends")}`}>
        <AssetImage src="/assets/char/friends-full" alt="" bare className={s.fit} />
      </span>

      <span className={`${s.figure} ${s.minseo} ${dim("minseo")}`}>
        <AssetImage src="/assets/char/minseo-full" alt="" bare className={s.fit} />
      </span>

      {/* 카드 위 텍스트 가독성을 위한 상·하단 감쇠 */}
      <span className={s.vignette} aria-hidden="true" />
    </div>
  );
}
