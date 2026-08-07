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
      <body>{children}</body>
    </html>
  );
}
