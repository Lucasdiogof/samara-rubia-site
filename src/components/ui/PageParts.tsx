import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, Info } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { breadcrumbLd } from "@/lib/structured-data";
import { primaryCta as getCta } from "@/lib/contact";
import { getDict, href, type Lang } from "@/i18n";

export function Breadcrumbs({ lang, items }: { lang: Lang; items: { name: string; path: string }[] }) {
  const t = getDict(lang);
  const all = [{ name: t.page.breadcrumbHome, path: "/" }, ...items].map((i) => ({
    ...i,
    path: href(lang, i.path),
  }));
  return (
    <>
      <nav aria-label={t.a11y.navBreadcrumb} className="mb-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cocoa">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-cocoa-deep">
                  {it.name}
                </span>
              ) : (
                <Link href={it.path} className="link-u">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}

/** Abertura das páginas internas. */
export function PageHero({
  lang,
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  lang: Lang;
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-8 pt-28 sm:pt-32 lg:pb-10">
      <div className="wrap relative">
        {crumbs && <Breadcrumbs lang={lang} items={crumbs} />}
        <p className="eyebrow">{eyebrow}</p>
        <RevealText as="h1" className="t-h1 mt-5 max-w-4xl" intro>
          {title}
        </RevealText>
        {lead && (
          <FadeInSection delay={0.3} intro>
            <p className="t-lead mt-7">{lead}</p>
          </FadeInSection>
        )}
        {children}
      </div>
    </section>
  );
}

/** Aviso exibido enquanto o conteúdo clínico não foi aprovado (site.approved.*). */
export function ReviewNotice({ approved, children }: { approved: boolean; children: ReactNode }) {
  if (approved) return null;
  return (
    <aside className="mt-10 flex max-w-2xl gap-3 rounded-2xl bg-cream p-5 text-[0.95rem] text-cocoa-deep">
      <Info size={20} className="mt-0.5 shrink-0 text-cocoa" aria-hidden="true" />
      <p>{children}</p>
    </aside>
  );
}

/**
 * CTA de fechamento das páginas internas. Com WhatsApp configurado, convida ao agendamento.
 * Sem canal, não promete agendamento nem repete o aviso em toda página: leva ao próximo
 * conteúdo útil (`here` evita apontar para a própria página).
 */
export function CtaBand({ lang, here }: { lang: Lang; here?: string }) {
  const t = getDict(lang).page;
  const primaryCta = getCta(lang);
  const next = [
    { title: t.ctaFaqTitle, label: t.ctaFaqLabel, href: "/perguntas-frequentes/" },
    { title: t.ctaHowTitle, label: t.ctaHowLabel, href: "/como-funciona/" },
  ]
    .map((n) => ({ ...n, path: n.href, href: href(lang, n.href) }))
    .find((n) => n.path !== here)!;
  const cta = primaryCta ? { title: t.ctaBandTitle, ...primaryCta } : next;
  return (
    <section className="on-dark grain lap bg-cocoa-deep py-14 text-vanilla">
      <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <RevealText as="h2" className="t-h2 max-w-2xl">
          {cta.title}
        </RevealText>
        <AnimatedButton href={cta.href} variant="light" track="band">
          {cta.label}
        </AnimatedButton>
      </div>
    </section>
  );
}
