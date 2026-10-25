import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { fullName, site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MotionRoot } from "@/components/animations/MotionRoot";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteLd, personLd, businessLd } from "@/lib/structured-data";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const description = `${site.specialty} para homens e mulheres: avaliação individual, escuta e acolhimento. Agende pelo WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${fullName} | ${site.specialty}`, template: "%s" },
  description,
  alternates: { canonical: "/" },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: `${fullName} | ${site.specialty}`,
    description,
    siteName: fullName,
    locale: "pt_BR",
    type: "website",
    url: site.url,
  },
  twitter: { card: "summary", title: `${fullName} | ${site.specialty}`, description },
};

export const viewport: Viewport = { themeColor: "#FCF8F1", width: "device-width", initialScale: 1 };

// Marca "js" e arma a falha-segura: se a animação não iniciar em 3,5 s, tudo é revelado.
const bootScript = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__animOk&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim-fail')},3500)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          id="pular"
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa-deep focus:px-5 focus:py-3 focus:text-vanilla"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <main id="conteudo">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </MotionProvider>
        <MotionRoot />
        <JsonLd data={websiteLd()} />
        {personLd() && <JsonLd data={personLd()!} />}
        {businessLd() && <JsonLd data={businessLd()!} />}
      </body>
    </html>
  );
}
