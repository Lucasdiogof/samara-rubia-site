import {
  RevealText,
  RevealImage,
  FadeInSection,
  ParallaxMedia,
} from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob, Portrait } from "@/components/ui/Portrait";
import { fullName, site } from "@/config/site";

export function AboutTeaser() {
  return (
    <section
      className="on-dark relative overflow-hidden bg-cocoa-deep py-[var(--space-section)] text-vanilla"
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
          <RevealImage className="relative aspect-[3/4] rounded-t-[999px] rounded-b-[1.5rem] bg-cocoa">
            <div className="h-full w-full">
              <ParallaxMedia className="h-full w-full" amount={5}>
                <Portrait />
              </ParallaxMedia>
            </div>
          </RevealImage>
        </div>
        <div className="lg:col-span-7 lg:pl-10">
          <p className="eyebrow">Sobre mim</p>
          <RevealText as="h2" id="sobre-title" className="t-h2 mt-5">
            Um espaço para falar do que é *delicado,* sem pressa.
          </RevealText>
          <FadeInSection delay={0.2}>
            <div className="prose-calm !text-cream mt-8">
              <p>
                {site.bio.summary ??
                  `Sou ${fullName}, fisioterapeuta pélvica. Acredito num atendimento em que cada pessoa é ouvida com atenção, entende cada etapa e decide junto o caminho do seu cuidado.`}
              </p>
            </div>
            <AnimatedButton href="/sobre/" variant="light" className="mt-10" arrow>
              Conhecer minha história
            </AnimatedButton>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
