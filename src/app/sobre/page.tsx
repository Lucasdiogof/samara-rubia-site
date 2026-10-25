import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import {
  RevealImage,
  FadeInSection,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { Portrait } from "@/components/ui/Portrait";
import { differentials } from "@/content/journey";
import { pageMetadata } from "@/lib/metadata";
import { fullName, site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Sobre",
  description: `Conheça ${fullName}, fisioterapeuta pélvica: abordagem de atendimento, formação e valores.`,
  path: "/sobre/",
});

export default function Sobre() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title={`Prazer, *${fullName.split(" ")[0]}.*`}
        lead="Fisioterapeuta pélvica, com um atendimento pensado para que cada pessoa se sinta ouvida e segura."
        crumbs={[{ name: "Sobre", path: "/sobre/" }]}
      >
        <ReviewNotice approved={site.approved.about}>
          Versão de revisão: história profissional, formação e fotografias serão inseridas após
          confirmação.
        </ReviewNotice>
      </PageHero>

      <section className="pb-24">
        <div className="wrap grid items-start gap-14 lg:grid-cols-12">
          <RevealImage className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand lg:col-span-5 lg:max-w-none">
            <div className="relative h-full w-full">
              <Portrait />
            </div>
          </RevealImage>
          <div className="space-y-14 lg:col-span-7 lg:pl-8">
            <FadeInSection>
              <h2 className="t-h3">História profissional</h2>
              <div className="prose-calm mt-5">
                <p>
                  {site.bio.summary ??
                    "A apresentação completa da trajetória profissional será publicada após a confirmação das informações pela própria Samara."}
                </p>
              </div>
            </FadeInSection>
            {site.bio.education.length > 0 && (
              <FadeInSection>
                <h2 className="t-h3">Formação e qualificações</h2>
                <ul className="mt-5 space-y-2 text-cocoa">
                  {site.bio.education.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </FadeInSection>
            )}
            <div>
              <RevealText as="h2" className="t-h3">
                Abordagem de atendimento
              </RevealText>
              <StaggerContainer
                as="ul"
                className="mt-6 divide-y divide-border border-y border-border"
              >
                {differentials.map((d) => (
                  <StaggerItem as="li" key={d.title} className="py-4">
                    <span className="font-display text-xl text-cocoa-deep">{d.title}</span>
                    <span className="mt-1 block text-cocoa">{d.text}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
