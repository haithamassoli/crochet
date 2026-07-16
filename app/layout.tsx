import type { Metadata, Viewport } from "next";
import { Baloo_Bhaijaan_2, Rubik } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BottomNav } from "@/components/bottom-nav";
import { InstallPopup } from "@/components/install-popup";
import { SITE_URL } from "@/lib/site";

const baloo = Baloo_Bhaijaan_2({
  subsets: ["arabic", "latin"],
  variable: "--font-baloo",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["arabic", "latin"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "غُرزة",
  title: {
    default: "غُرزة — تعلّم الكروشيه من الصفر إلى الاحتراف",
    template: "%s | غُرزة",
  },
  description:
    "مسار عربي متكامل لتعلّم الكروشيه خطوة بخطوة: دروس مرتّبة من أول غرزة حتى الاحتراف، مع مراجع الخيوط والإبر والأدوات وأفضل المصادر العربية والعالمية.",
  openGraph: {
    type: "website",
    siteName: "غُرزة",
    locale: "ar",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#251c19" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${baloo.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-100 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          تخطَّ إلى المحتوى
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
        <InstallPopup />
      </body>
    </html>
  );
}
