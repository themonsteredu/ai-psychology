import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata = {
  title: "마음 SIGNAL LAB",
  description:
    "AI 시대, 마음을 읽고 연결하는 청소년 상담 체험 — 중학생용 진로교육 웹앱",
};

export const viewport = {
  themeColor: "#061125",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <head>
        {/*
          제목 폰트는 첫 화면의 큰 글자에 바로 쓰이므로 미리 받아 둔다.
          9Black 만 미리 받는다 — 700(6Bold)은 화면 안쪽에서야 나온다.
        */}
        <link
          rel="preload"
          href="/fonts/s-core-dream-9black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
