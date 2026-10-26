import { ScrubText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { getDict, type Lang } from "@/i18n";

export function Intro({ lang }: { lang: Lang }) {
  const t = getDict(lang).intro;
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="wrap">
        <h2 className="eyebrow" id="intro-title">
          {t.eyebrow}
        </h2>
        <ScrubText
          as="p"
          className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,1.2rem+3vw,3.6rem)] leading-[1.12] text-cocoa-deep"
        >
          {t.text}
        </ScrubText>
        <StaggerContainer className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-12">
          {t.audiences.map(([t, d]) => (
            <StaggerItem key={t}>
              <h3 className="font-display text-2xl text-cocoa-deep">{t}</h3>
              <p className="mt-3 text-cocoa">{d}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
