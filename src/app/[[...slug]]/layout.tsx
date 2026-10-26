import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "@/styles/globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MotionRoot } from "@/components/animations/MotionRoot";
import { MotionProvider } from "@/components/animations/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { nav } from "@/components/layout/nav";
import { getDict, langMeta, parseSlug } from "@/i18n";
import { primaryCta } from "@/lib/contact";
import { websiteLd, personLd, businessLd } from "@/lib/structured-data";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCF8F1" },
    { media: "(prefers-color-scheme: dark)", color: "#1B1613" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Define o tema antes da primeira pintura (preferência salva ou do sistema), marca "js" e arma a
// falha-segura: se a animação não iniciar em 3,5 s, tudo é revelado.
const bootScript = `try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}document.documentElement.classList.add('js');setTimeout(function(){if(!window.__animOk&&!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('anim-fail')},3500)`;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const { lang } = parseSlug((await params).slug);
  const t = getDict(lang);
  return (
    <html
      lang={langMeta[lang].htmlLang}
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a
          id="pular"
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-cocoa-deep focus:px-5 focus:py-3 focus:text-vanilla"
        >
          {t.a11y.skip}
        </a>
        <MotionProvider>
          <Header
            lang={lang}
            t={{
              specialty: t.specialty,
              navMain: t.a11y.navMain,
              navMobile: t.a11y.navMobile,
              menuOpen: t.a11y.menuOpen,
              menuClose: t.a11y.menuClose,
              links: Object.fromEntries(nav.map((n) => [n.key, t.nav[n.key]])) as Record<
                (typeof nav)[number]["key"],
                string
              >,
              controls: {
                language: t.a11y.language,
                toDark: t.a11y.themeToDark,
                toLight: t.a11y.themeToLight,
              },
              cta: primaryCta(lang),
            }}
          />
          <main id="conteudo">{children}</main>
          <Footer lang={lang} />
          <FloatingWhatsApp
            lang={lang}
            labels={{ region: t.a11y.shortcut, schedule: t.a11y.scheduleWa }}
          />
        </MotionProvider>
        <MotionRoot />
        <JsonLd data={websiteLd(lang)} />
        {personLd(lang) && <JsonLd data={personLd(lang)!} />}
        {businessLd(lang) && <JsonLd data={businessLd(lang)!} />}
      </body>
    </html>
  );
}
