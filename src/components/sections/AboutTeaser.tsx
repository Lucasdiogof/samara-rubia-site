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
  const [lead, ...rest] = t.body;
  return (
    <section
      className="on-dark grain lap relative overflow-hidden bg-[radial-gradient(60rem_40rem_at_22%_55%,rgba(181,96,63,0.16),transparent_70%),linear-gradient(150deg,#2f241f,#3d2d26_55%,#34281f)] py-[var(--space-section)] text-vanilla"
      aria-labelledby="sobre-title"
    >
      <Curves className="pointer-events-none absolute -left-10 -top-10 h-72 w-72 -scale-x-100 opacity-30" />
      <Curves className="pointer-events-none absolute -bottom-16 -right-10 hidden h-80 w-80 -scale-y-100 opacity-30 sm:block" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:col-span-5 lg:max-w-[22rem]">
          <div
            className="pointer-events-none absolute -inset-3 rounded-t-[999px] rounded-b-[1.9rem] border border-[var(--warm)] opacity-45"
            aria-hidden="true"
          />
          <RevealImage className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.1rem] bg-cocoa shadow-[0_30px_60px_-30px_rgba(0,0,0,0.65)]">
            <div className="h-full w-full">
              <ParallaxMedia className="h-full w-full" amount={4}>
                <Portrait slot="portrait" sizes="(min-width: 1024px) 24rem, 80vw" />
              </ParallaxMedia>
            </div>
          </RevealImage>
        </div>
        <div className="lg:col-span-7 lg:max-w-[36rem]">
          <h2 id="sobre-title" className="eyebrow">
            {t.eyebrow}
          </h2>
          <RevealText as="p" className="t-h2 mt-5 text-balance !text-[clamp(2rem,1.4rem+2.1vw,3.1rem)]">
            {t.heading}
          </RevealText>
          <FadeInSection delay={0.2}>
            <span aria-hidden="true" className="mt-7 block h-px w-14 bg-[var(--warm)] opacity-70" />
            <p className="mt-6 text-[1.1rem] leading-[1.7] text-vanilla">{lead}</p>
            {rest.map((p) => (
              <p key={p} className="mt-4 leading-[1.75] text-cream/75">
                {p}
              </p>
            ))}
            <AnimatedButton
              href={href(lang, "/sobre/")}
              variant="ghost"
              className="mt-8 !border-[var(--warm)]/60 !text-vanilla hover:!bg-[var(--warm)]/15 hover:!border-[var(--warm)]"
              arrow
            >
              {t.button}
            </AnimatedButton>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
