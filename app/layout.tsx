import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import SiteChrome from "@/components/SiteChrome";
import { site } from "@/data/content";
import "./globals.css";

/* Headings: Poppins (confident, modern). Body: Inter (highly readable). */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.subBrand}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "cleaning company Mogadishu",
    "office cleaning Somalia",
    "residential cleaning Mogadishu",
    "deep cleaning",
    "post-construction cleaning",
    "janitorial services Somalia",
    "Bilic Cleaning Company",
  ],
  openGraph: {
    type: "website",
    locale: "en",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.subBrand}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.subBrand}`,
    description: site.description,
  },
  // TODO: add real icons to /public (favicon.ico, icon.png) and reference them here.
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
