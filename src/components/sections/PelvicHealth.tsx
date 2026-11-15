import Link from "next/link";
import {
  ArrowUpRight,
  Baby,
  Droplets,
  Flower2,
  Hourglass,
  Heart,
  Activity,
  ShieldPlus,
  Timer,
  ArrowDownToLine,
  CircleDot,
  type LucideIcon,
} from "lucide-react";
import {
  RevealText,
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { enabledServices } from "@/lib/services";
import { getDict, href, type Lang } from "@/i18n";

const icons: Record<string, LucideIcon> = {
  "disfuncoes-sexuais-femininas": Heart,
  "dor-pelvica": Activity,
  endometriose: Flower2,
  "incontinencia-urinaria": Droplets,
  "bexiga-hiperativa": Timer,
  "retencao-urinaria": Hourglass,
  "prolapso-de-orgaos-pelvicos": ArrowDownToLine,
  constipacao: CircleDot,
  "prostatectomia-radical": ShieldPlus,
  "gestacao-e-pos-parto": Baby,
};

/** "O que é" + "o que trata" numa só seção: introdução curta e grade compacta de tratamentos (só nomes). */
export function PelvicHealth({ lang }: { lang: Lang }) {
  const t = getDict(lang).pelvic;
  const list = enabledServices(lang);
  return (
    <section className="section lap bg-cream" aria-labelledby="pelvic-title">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.eyebrow}</p>
          <RevealText as="h2" id="pelvic-title" className="t-h2 mt-4 text-balance">
            {t.title}
          </RevealText>
          <FadeInSection delay={0.2}>
            <p className="mt-5 text-[1.1rem] leading-[1.7] text-cocoa">{t.text}</p>
          </FadeInSection>
        </div>
        <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {list.map((s) => {
            const Icon = icons[s.slug] ?? Heart;
            return (
              <StaggerItem key={s.slug}>
                <Link
                  href={href(lang, `/tratamentos/${s.slug}/`)}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-vanilla/70 px-4 py-3.5 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--warm)] hover:bg-vanilla hover:shadow-soft focus-visible:-translate-y-0.5 focus-visible:border-[var(--warm)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-[var(--warm)] transition-colors duration-300 group-hover:bg-[var(--warm)] group-hover:text-vanilla">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="flex-1 font-display text-[1.3rem] leading-tight text-cocoa-deep">
                    {s.title}
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-cocoa opacity-60 transition-[transform,opacity] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </StaggerItem>
            );
          })}
          <StaggerItem className="sm:col-span-2">
            <Link
              href={href(lang, "/tratamentos/")}
              className="link-u flex h-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border px-4 py-3.5 font-semibold text-cocoa-deep transition-colors duration-300 hover:border-[var(--warm)]"
            >
              {t.all}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
