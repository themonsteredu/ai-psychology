"use client";

import AssetImage from "@/components/ui/AssetImage";
import s from "./CaseScene.module.css";

/**
 * 사례 장면 — 배경 이미지 위에 인물 컷아웃을 얹는다.
 *
 * 인물 위치를 장면 대비 %로 잡기 때문에, 배경이 어떤 비율로 잘려도
 * 위에 얹히는 단서 핫스팟(역시 %)과 인물의 위치 관계는 유지된다.
 *
 * scene      — { bg, bgPosition, figures: [{ id, src, style }] }
 * spotlight  — 강조할 인물 id. 나머지는 흐려진다.
 */
export default function CaseScene({ scene, className = "", spotlight = null, title }) {
  if (!scene) return null;

  return (
    <div className={`${s.scene} ${className}`} role="img" aria-label={title}>
      <AssetImage
        src={scene.bg}
        alt=""
        tone="blue"
        className={s.bg}
        style={scene.bgPosition ? { objectPosition: scene.bgPosition } : undefined}
      />

      {(scene.figures ?? []).map((f) => (
        <span
          key={f.id}
          className={`${s.figure} ${spotlight && spotlight !== f.id ? s.dim : ""}`}
          style={f.style}
        >
          {/* 발밑 그림자 — 없으면 컷아웃이 바닥에서 떠 보인다.
              앉아 있거나 바닥이 안 보이는 인물에는 붙이지 않는다. */}
          {f.ground && <span className={s.ground} aria-hidden="true" />}
          <AssetImage
            src={f.src}
            alt=""
            bare
            className={`${s.fit} ${f.fade ? s.faded : ""}`}
          />
        </span>
      ))}

      {/* 카드 위 텍스트 가독성을 위한 상·하단 감쇠 */}
      <span className={s.vignette} aria-hidden="true" />
    </div>
  );
}
