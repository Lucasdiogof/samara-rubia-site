import {
  RevealImage,
  RevealText,
  FadeInSection,
  ParallaxMedia,
} from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Portrait } from "@/components/ui/Portrait";
import { getDict, href, type Lang } from "@/i18n";

/** Fios curvos finos nos cantos, como no layout de referência. */
function Curves({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true" className={className} fill="none" stroke="var(--warm)" strokeWidth="1">
      <path d="M300 0C220 20 140 90 120 300" />
      <path d="M300 60C240 80 190 140 180 300" opacity=".5" />
    </svg>
  );
}

export function AboutTeaser({ lang }: { lang: Lang }) {
  const t = getDict(lang).aboutTeaser;
  return (
    <section
      className="on-dark grain lap relative overflow-hidden bg-[linear-gradient(135deg,var(--cocoa-deep),#3b2b25)] py-[var(--space-section)] text-vanilla"
      aria-labelledby="sobre-title"
    >
      <Curves className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 -scale-x-100 opacity-40" />
      <Curves className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80 -scale-y-100 opacity-40" />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div
            className="absolute -bottom-5 -left-6 h-3/4 w-3/4 rounded-[2.5rem] bg-[linear-gradient(160deg,#8a6552,#5a4034)] opacity-70"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-3 translate-x-3 rounded-t-[999px] rounded-b-[1.75rem] border border-[var(--warm)] opacity-60"
            aria-hidden="true"
          />
          <RevealImage className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.25rem] border border-[var(--warm)] bg-cocoa">
            <div className="h-full w-full">
              <ParallaxMedia className="h-full w-full" amount={5}>
                <Portrait slot="portrait" sizes="(min-width: 1024px) 40vw, 80vw" />
              </ParallaxMedia>
            </div>
          </RevealImage>
        </div>
        <div className="lg:col-span-7 lg:pl-8">
          <h2 id="sobre-title" className="eyebrow">
            {t.eyebrow}
          </h2>
          <RevealText as="p" className="t-h2 mt-5 max-w-2xl">
            {t.heading}
          </RevealText>
          <FadeInSection delay={0.2}>
            <div className="prose-calm !text-cream mt-7">
              {getDict(lang).bio.filter((_, index) => index === 0 || index === 2).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex items-center gap-6">
              <AnimatedButton href={href(lang, "/sobre/")} variant="light" arrow>
                {t.button}
              </AnimatedButton>
              <span aria-hidden="true" className="hidden h-px flex-1 bg-[var(--warm)] opacity-40 sm:block" />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
