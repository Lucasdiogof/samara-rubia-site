import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import {
  RevealText,
  FadeInSection,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { enabledServices } from "@/lib/services";
import { getDict, href, type Lang } from "@/i18n";

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
          {list.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard slug={s.slug} title={s.title} href={href(lang, `/tratamentos/${s.slug}/`)} />
            </StaggerItem>
          ))}
          <StaggerItem>
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
