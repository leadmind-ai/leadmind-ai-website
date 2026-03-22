import type { Metadata } from "next";
import { DM_Sans, Source_Sans_3 } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LeadMind AI — Conseil & Formation IA pour l'Assurance et la Finance",
  description:
    "Cabinet spécialisé en formation et solutions IA pour les professionnels de l'assurance et de la finance : actuaires, comptables, asset managers, analystes, data scientists et plus.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/images/icon-512.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${sourceSans.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
