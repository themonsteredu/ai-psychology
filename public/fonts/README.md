# 제목용 폰트 — 에스코어드림 (S-Core Dream)

| 파일 | 굵기 | 크기 | 쓰이는 곳 |
| --- | --- | --- | --- |
| `s-core-dream-9black.woff2` | 900 | 130KB | 시작 화면 제목, 각 화면 큰 헤드라인 |
| `s-core-dream-6bold.woff2` | 700 | 127KB | 그 외 `h2`~`h4` |

`app/globals.css` 의 `@font-face` 와 `--font-title` 토큰이 이 두 파일을 씁니다.
`app/layout.jsx` 는 9Black 을 `preload` 합니다 — 첫 화면 제목에 바로 쓰이기 때문입니다.

## 왜 리포에 넣었나

CDN(`cdn.jsdelivr.net`)으로 불러오면 학교 방화벽이 막았을 때 제목만 통째로
다른 폰트가 됩니다. 앱과 같은 서버에서 주면 앱이 열리는 곳에서는 폰트도
반드시 따라옵니다.

## 어떻게 줄였나

원본은 벌당 346KB짜리 `.woff` 입니다(글리프 13,495자).

1. **서브셋** — 한글 음절 11,172자(`U+AC00`~`U+D7A3`) + ASCII + 호환 자모 +
   문장부호만 남겼습니다. 빠진 것은 한자와 희귀 기호뿐이라 이 앱이 쓰는
   글자는 전부 들어 있습니다. 없는 글자는 Noto Sans KR 로 대체됩니다.
2. **woff2 변환** — 브로틀리 압축. 결과는 벌당 약 130KB (원본의 37%).

다시 만들려면:

```bash
pip install fonttools brotli
curl -O https://raw.githubusercontent.com/projectnoonnu/noonfonts_six/master/S-CoreDream-9Black.woff
python -c "
chars = ''.join(chr(c) for c in
    list(range(0x20, 0x7f)) + list(range(0xac00, 0xd7a4)) + list(range(0x3131, 0x3164)))
open('subset.txt', 'w').write(chars + '·—…‘’“”※→←↑↓℃%±×÷°∙•')
"
pyftsubset S-CoreDream-9Black.woff --text-file=subset.txt \
  --layout-features='*' --flavor=woff2 --output-file=s-core-dream-9black.woff2
```

## 라이선스

**에스코어드림(S-Core Dream)** — 에스코어㈜ 제작·배포.
개인·기업 상업적 이용을 포함해 무료로 사용할 수 있으며, 폰트 파일 자체를
유료로 판매하는 것만 금지됩니다. 출처: <https://www.s-core.co.kr/who-we-are/font/>

이 리포에 포함된 파일은 위 원본을 서브셋·형식 변환한 것으로, 자형은
수정하지 않았습니다.
