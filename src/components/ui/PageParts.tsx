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

type Motif = "arch" | "waves" | "rings";

const motifBox =
  "pointer-events-none absolute right-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] top-28 hidden h-[24rem] text-taupe lg:block";
const line = { stroke: "currentColor", strokeWidth: 1.2 } as const;

/**
 * Motivos em traço fino no canto da abertura das páginas internas. Três variações da mesma
 * linguagem (arcos, ondas, anéis), escolhidas por página para evitar repetição.
 */
function HeroMotif({ motif }: { motif: Motif }) {
  if (motif === "waves")
    return (
      <svg
        viewBox="0 0 400 300"
        aria-hidden="true"
        fill="none"
        className={`${motifBox} !top-auto bottom-10 !h-[12rem]`}
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)",
        }}
      >
        <circle cx="300" cy="80" r="26" fill="var(--sand)" opacity=".7" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${130 + i * 30}C70 ${80 + i * 30} 130 ${80 + i * 30} 200 ${120 + i * 30}S330 ${170 + i * 30} 400 ${110 + i * 30}`}
            {...line}
            opacity={0.65 - i * 0.11}
          />
        ))}
      </svg>
    );
  if (motif === "rings")
    return (
      <svg viewBox="0 0 360 360" aria-hidden="true" fill="none" className={motifBox}>
        <circle cx="290" cy="90" r="24" fill="var(--sand)" opacity=".7" />
        {[170, 125, 80, 38].map((r, i) => (
          <circle key={r} cx="180" cy="190" r={r} {...line} opacity={0.6 - i * 0.12} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 360 440" aria-hidden="true" fill="none" className={motifBox}>
      <path d="M0 440H360" {...line} opacity=".6" />
      <circle cx="262" cy="150" r="30" fill="var(--sand)" opacity=".7" />
      <path d="M20 440V190a160 160 0 0 1 320 0v250" {...line} opacity=".6" />
      <path d="M70 440V200a110 110 0 0 1 220 0v240" {...line} opacity=".45" />
      <path d="M120 440V210a60 60 0 0 1 120 0v230" {...line} opacity=".3" />
    </svg>
  );
}

/** Abertura das páginas internas. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  motif = "arch",
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: { name: string; path: string }[];
  motif?: Motif;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-14 pt-36 sm:pt-44 lg:pb-20">
      <HeroMotif motif={motif} />
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

/**
 * CTA de fechamento das páginas internas. Com WhatsApp configurado, convida ao agendamento.
 * Sem canal, não promete agendamento nem repete o aviso em toda página: leva ao próximo
 * conteúdo útil (`here` evita apontar para a própria página).
 */
export function CtaBand({ here }: { here?: string }) {
  const next = [
    { title: "Ficou com dúvidas?", label: "Perguntas frequentes", href: "/perguntas-frequentes/" },
    { title: "Quer entender o atendimento?", label: "Como funciona", href: "/como-funciona/" },
  ].find((n) => n.href !== here)!;
  const cta = hasWhatsapp
    ? { title: "Vamos conversar sobre o seu cuidado?", label: ctaLabel, href: bookingHref }
    : next;
  return (
    <section className="on-dark lap bg-cocoa-deep py-20 text-vanilla">
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
