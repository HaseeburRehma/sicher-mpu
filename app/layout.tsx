import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "MPU Beratung & Nachhilfe Düsseldorf · SicherMPU · 99% Erfolgsquote",
    template: "%s · SicherMPU",
  },
  description:
    "Persönliche MPU Beratung und Nachhilfe in Düsseldorf. 1-zu-1 Vollbegleitung durch Anwälte, Ärzte und Psychologen. Restzahlung erst nach bestandener MPU.",
  keywords: [
    "MPU Beratung Düsseldorf",
    "MPU Vorbereitung Düsseldorf",
    "MPU Nachhilfe Düsseldorf",
    "MPU Nachhilfe online",
    "Medizinisch-Psychologische Untersuchung Düsseldorf",
    "MPU bestehen Düsseldorf",
  ],
  authors: [{ name: site.founder }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    url: site.url,
    title: "MPU Beratung & Nachhilfe Düsseldorf · SicherMPU",
    description:
      "Den Führerschein zurückholen. Mit Strategie statt Stress. 1-zu-1 MPU Beratung in Düsseldorf.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MPU Beratung & Nachhilfe Düsseldorf · SicherMPU",
    description:
      "Den Führerschein zurückholen. Mit Strategie statt Stress.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${newsreader.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
