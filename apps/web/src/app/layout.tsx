import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://groupomania-modern.vercel.app"),
  title: {
    default: "Groupomania – Workplace social platform",
    template: "%s · Groupomania",
  },
  description:
    "Réseau social d’entreprise nouvelle génération : feed collaboratif, profils riches, notifications temps réel et design system premium.",
  openGraph: {
    title: "Groupomania – Workplace social platform",
    description:
      "Expérience sociale moderne pour vos équipes : interactions riches, modération, analytics et PWA.",
    url: "https://groupomania-modern.vercel.app",
    type: "website",
    siteName: "Groupomania",
  },
  twitter: {
    card: "summary_large_image",
    title: "Groupomania – Workplace social platform",
    description:
      "Expérience sociale moderne pour vos équipes : interactions riches, modération, analytics et PWA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
