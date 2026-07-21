import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "کیف پول بانک مسکن",
  description: "اپلیکیشن بانکداری دیجیتال بانک مسکن",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F76B1C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body>
        <ThemeRegistry>
          <div className="app-shell">
            <div className="ambient-glow" />
            <div className="relative z-10">{children}</div>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
