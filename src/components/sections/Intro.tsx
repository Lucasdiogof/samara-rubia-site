import { ScrubText } from "@/components/animations/Reveal";
import { getDict, type Lang } from "@/i18n";

export function Intro({ lang }: { lang: Lang }) {
  const t = getDict(lang).intro;
  return (
    <section className="section !pt-3 md:!pt-8" aria-labelledby="intro-title">
      <div className="wrap">
        <h2 className="eyebrow" id="intro-title">
          {t.eyebrow}
        </h2>
        <ScrubText
          as="p"
          className="mt-8 max-w-4xl font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] leading-[1.3] text-cocoa-deep"
        >
          {t.text}
        </ScrubText>
      </div>
    </section>
  );
}
