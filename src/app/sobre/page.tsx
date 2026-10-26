import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import {
  RevealImage,
  FadeInSection,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { Portrait } from "@/components/ui/Portrait";
import { OfficeGallery } from "@/components/sections/OfficeGallery";
import { differentials } from "@/content/journey";
import { pageMetadata } from "@/lib/metadata";
import { fullName, site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Sobre",
  description: `Conheça ${fullName}, fisioterapeuta pélvica: abordagem de atendimento, formação e valores.`,
  path: "/sobre/",
});

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <FadeInSection>
      <h2 className="t-h3">{title}</h2>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {items.map((e) => (
          <li key={e} className="py-3 text-cocoa-deep">
            {e}
          </li>
        ))}
      </ul>
    </FadeInSection>
  );
}

export default function Sobre() {
  const { bio } = site;
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
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none">
            <RevealImage className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
              <div className="relative h-full w-full">
                <Portrait slot="portrait" sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </RevealImage>
          </div>
          <div className="space-y-14 lg:col-span-7 lg:pl-8">
            <FadeInSection>
              <h2 className="t-h3">História profissional</h2>
              <div className="prose-calm mt-5">
                <p>
                  {bio.summary ??
                    "A apresentação completa da trajetória profissional será publicada após a confirmação das informações pela própria Samara."}
                </p>
              </div>
            </FadeInSection>
            <List title="Formação" items={bio.education} />
            <List title="Especializações" items={bio.specializations} />
            <List title="Cursos e qualificações" items={bio.courses} />
            <div>
              <RevealText as="h2" className="t-h3">
                Abordagem de atendimento
              </RevealText>
              {bio.approach.length > 0 && (
                <div className="prose-calm mt-5">
                  {bio.approach.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}
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
      <OfficeGallery />
      <CtaBand />
    </>
  );
}
