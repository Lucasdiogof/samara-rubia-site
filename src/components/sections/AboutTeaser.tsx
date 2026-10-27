import {
  RevealImage,
  FadeInSection,
  ParallaxMedia,
} from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob, Portrait } from "@/components/ui/Portrait";
import { getDict, href, type Lang } from "@/i18n";

export function AboutTeaser({ lang }: { lang: Lang }) {
  const t = getDict(lang).aboutTeaser;
  return (
    <section
      className="on-dark grain lap relative overflow-hidden bg-cocoa-deep py-[var(--space-section)] text-vanilla"
      aria-labelledby="sobre-title"
    >
      <Blob
        className="pointer-events-none absolute -right-32 -top-24 h-[30rem] w-[30rem] opacity-[0.12]"
        fill="var(--sand)"
      />
      <div className="wrap relative grid items-center gap-16 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div
            className="absolute -bottom-6 -right-4 h-2/3 w-2/3 rounded-full bg-cocoa"
            aria-hidden="true"
          />
          <RevealImage className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-cocoa">
            <div className="h-full w-full">
              <ParallaxMedia className="h-full w-full" amount={5}>
                <Portrait slot="portrait" sizes="(min-width: 1024px) 40vw, 80vw" />
              </ParallaxMedia>
            </div>
          </RevealImage>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <h2 id="sobre-title" className="eyebrow">
            {t.eyebrow}
          </h2>
          <FadeInSection delay={0.2}>
            <div className="prose-calm !text-cream mt-8">
              {getDict(lang).bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <AnimatedButton href={href(lang, "/sobre/")} variant="light" className="mt-10" arrow>
              {t.button}
            </AnimatedButton>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
