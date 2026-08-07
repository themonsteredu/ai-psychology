"use client";

import { useEffect, useRef, useState } from "react";
import s from "./AssetImage.module.css";

/**
 * public/assets 의 일러스트를 표시한다.
 *
 * src 는 확장자 없는 경로("/assets/scene/hallway")를 받아
 *   .webp → .png → 폴백
 * 순서로 시도한다. 리포에는 용량 때문에 WebP 로 커밋하지만,
 * PNG 를 그대로 올려도 잡히게 하기 위한 장치다.
 *
 * 파일이 하나도 없으면 그라디언트 플레이스홀더를 그려서
 * 깨진 이미지가 노출되지 않게 한다. (생성 프롬프트: public/assets/PROMPTS.md)
 */
const EXTS = ["webp", "png"];

export default function AssetImage({
  src,
  alt,
  tone = "mint",
  fallback = null,
  bare = false,
  className = "",
}) {
  const [tried, setTried] = useState(0);
  const ref = useRef(null);

  /* 이 페이지는 SSR 되므로 이미지 404 가 하이드레이션보다 먼저 끝난다.
     그 경우 onError 가 오지 않으니, 마운트 시 실패 여부를 직접 확인한다. */
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) {
      setTried((n) => n + 1);
    }
  }, [tried]);

  if (!src || tried >= EXTS.length) {
    return (
      <span
        className={`${s.fallback} ${bare ? s.bare : (s[tone] ?? s.mint)} ${className}`}
        role={fallback || !alt ? undefined : "img"}
        aria-label={fallback || !alt ? undefined : alt}
        aria-hidden={alt ? undefined : true}
      >
        {fallback}
      </span>
    );
  }

  return (
    /* next/image 는 파일이 없을 때 빌드/런타임에서 다루기 번거로워 img 를 쓴다. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={EXTS[tried]}
      ref={ref}
      src={`${src}.${EXTS[tried]}`}
      alt={alt}
      className={`${s.img} ${className}`}
      onError={() => setTried((n) => n + 1)}
    />
  );
}
