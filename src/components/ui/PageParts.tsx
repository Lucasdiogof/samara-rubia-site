import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, Info } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { breadcrumbLd } from "@/lib/structured-data";
import { bookingHref, ctaLabel, hasWhatsapp } from "@/lib/contact";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Início", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Você está em" className="mb-8">
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

/** Arcos em traço fino (eco do logotipo) no canto da abertura das páginas internas. */
function ArchMotif() {
  return (
    <svg
      viewBox="0 0 360 440"
      aria-hidden="true"
      fill="none"
      className="pointer-events-none absolute right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] top-28 hidden h-[24rem] text-taupe lg:block"
    >
      <path d="M0 440H360" stroke="currentColor" strokeWidth="1.2" opacity=".6" />
      <circle cx="262" cy="150" r="30" fill="var(--sand)" opacity=".7" />
      <path
        d="M20 440V190a160 160 0 0 1 320 0v250"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".6"
      />
      <path
        d="M70 440V200a110 110 0 0 1 220 0v240"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".45"
      />
      <path
        d="M120 440V210a60 60 0 0 1 120 0v230"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".3"
      />
    </svg>
  );
}

/** Abertura das páginas internas. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44 lg:pb-20">
      <ArchMotif />
      <div className="wrap relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
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
export function ReviewNotice({ approved, children }: { approved: boolean; children?: ReactNode }) {
  if (approved) return null;
  return (
    <aside className="mt-10 flex max-w-2xl gap-3 rounded-2xl bg-cream p-5 text-[0.95rem] text-cocoa-deep">
      <Info size={20} className="mt-0.5 shrink-0 text-cocoa" aria-hidden="true" />
      <p>
        {children ??
          "Versão de revisão: este conteúdo está aguardando validação da profissional antes da publicação."}
      </p>
    </aside>
  );
}

/** CTA de fechamento reutilizável para páginas internas. */
export function CtaBand({
  title = hasWhatsapp
    ? "Vamos conversar sobre o seu cuidado?"
    : "Os canais de contato estão em preparação.",
}: {
  title?: string;
}) {
  return (
    <section className="on-dark bg-cocoa-deep py-20 text-vanilla">
      <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <RevealText as="h2" className="t-h2 max-w-2xl">
          {title}
        </RevealText>
        <AnimatedButton href={bookingHref} variant="light" track="band">
          {ctaLabel}
        </AnimatedButton>
      </div>
    </section>
  );
}
