"use client";

import { useState } from "react";
import s from "./AssetImage.module.css";

/**
 * public/assets 의 일러스트를 표시한다.
 *
 * 에셋은 별도로 업로드되므로, 파일이 아직 없을 때 깨진 이미지가 뜨지 않도록
 * 그라디언트 플레이스홀더로 대체한다. 파일이 올라오면 자동으로 이미지가 뜬다.
 * (생성 프롬프트: public/assets/PROMPTS.md)
 */
export default function AssetImage({
  src,
  alt,
  tone = "mint",
  fallback = null,
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <span
        className={`${s.fallback} ${s[tone] ?? s.mint} ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallback}
      </span>
    );
  }

  return (
    /* next/image 는 파일이 없을 때 빌드/런타임에서 다루기 번거로워 img 를 쓴다. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${s.img} ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
