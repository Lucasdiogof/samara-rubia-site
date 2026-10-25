import { RevealText, RevealImage, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob, Portrait } from "@/components/ui/Portrait";
import { bookingHref } from "@/lib/contact";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:min-h-[100svh] lg:pb-24 lg:pt-44">
      <Blob
        className="drift pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] opacity-60"
        fill="var(--cream)"
      />
      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FadeInSection intro>
            <p className="eyebrow">{site.specialty}</p>
          </FadeInSection>
          <RevealText as="h1" className="t-display mt-6" delay={0.1} intro>
            Cuidado que *acolhe,* atenção que *respeita* cada história.
          </RevealText>
          <FadeInSection delay={0.5} intro>
            <p className="t-lead mt-8">
              Fisioterapia pélvica para homens e mulheres, com avaliação individual, escuta atenta e
              total respeito à sua privacidade.
            </p>
          </FadeInSection>
          <FadeInSection intro delay={0.65} className="mt-10 flex flex-wrap gap-4">
            <AnimatedButton href={bookingHref} track="hero">
              Agendar avaliação
            </AnimatedButton>
            <AnimatedButton href="/sobre/" variant="ghost" arrow={false}>
              Conheça meu trabalho
            </AnimatedButton>
          </FadeInSection>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <RevealImage
            intro
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand"
          >
            <div className="relative h-full w-full">
              <Portrait />
            </div>
          </RevealImage>
          <FadeInSection
            intro
            delay={1}
            className="absolute -left-3 bottom-10 max-w-[13rem] rounded-2xl bg-vanilla px-5 py-4 text-sm leading-snug text-cocoa-deep shadow-[var(--shadow-soft)] sm:-left-8"
          >
            <span className="block font-display text-xl italic text-cocoa">
              Avaliação individual
            </span>
            Cada etapa explicada, no seu ritmo.
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
