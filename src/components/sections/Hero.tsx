import { RevealText, RevealImage, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob, Portrait } from "@/components/ui/Portrait";
import { getDict, href, type Lang } from "@/i18n";
import { primaryCta as getCta } from "@/lib/contact";

export function Hero({ lang }: { lang: Lang }) {
  const t = getDict(lang).hero;
  const primaryCta = getCta(lang);
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-24 lg:pt-44">
      <Blob
        className="drift pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] opacity-60"
        fill="var(--cream)"
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeInSection intro>
            <p className="eyebrow">{getDict(lang).specialty}</p>
          </FadeInSection>
          <RevealText as="h1" className="t-display mt-6" delay={0.1} intro>
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
          <FadeInSection intro delay={0.8}>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cocoa">
              {t.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cocoa" />
                  {p}
                </li>
              ))}
            </ul>
          </FadeInSection>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <FadeInSection
            intro
            delay={0.9}
            className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] border border-taupe/70 sm:translate-x-4 sm:translate-y-4"
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
