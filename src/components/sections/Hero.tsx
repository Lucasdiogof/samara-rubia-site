import { RevealText, RevealImage, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob, Portrait } from "@/components/ui/Portrait";
import { getDict, href, type Lang } from "@/i18n";
import { primaryCta as getCta } from "@/lib/contact";

export function Hero({ lang }: { lang: Lang }) {
  const t = getDict(lang).hero;
  const primaryCta = getCta(lang);
  return (
    <section className="relative overflow-hidden pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
      <Blob
        className="drift pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] opacity-60"
        fill="var(--cream)"
      />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeInSection intro>
            <p className="eyebrow">{t.eyebrow}</p>
          </FadeInSection>
          <RevealText as="h1" className="t-display mt-6 !text-[clamp(2.5rem,1.7rem+3.4vw,4.6rem)]" delay={0.1} intro>
            {t.title}
          </RevealText>
          <FadeInSection delay={0.5} intro>
            <p className="t-lead mt-8">
              {t.lead}
            </p>
          </FadeInSection>
          <FadeInSection intro delay={0.65} className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <AnimatedButton href={primaryCta.href} track="hero">
                {primaryCta.label}
              </AnimatedButton>
            )}
            <AnimatedButton
              href={href(lang, "/sobre/")}
              variant={primaryCta ? "ghost" : "primary"}
              arrow={!primaryCta}
            >
              {t.about}
            </AnimatedButton>
          </FadeInSection>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <FadeInSection
            intro
            delay={0.9}
            className="pointer-events-none absolute -inset-2.5 rounded-t-[999px] rounded-b-[2.6rem] border border-taupe/70"
          >
            <span aria-hidden="true" />
          </FadeInSection>
          <RevealImage
            intro
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand"
          >
            <div className="relative h-full w-full">
              <Portrait slot="hero" priority sizes="(min-width: 1024px) 40vw, 90vw" />
            </div>
          </RevealImage>
        </div>
      </div>
    </section>
  );
}
