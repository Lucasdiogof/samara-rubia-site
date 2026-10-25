import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { FadeInSection } from "@/components/animations/Reveal";
import { faqGroups } from "@/content/faq";
import { faqLd } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Perguntas frequentes",
  description:
    "Respostas sobre fisioterapia pélvica, primeira consulta, agendamento e privacidade.",
  path: "/perguntas-frequentes/",
});

export default function Perguntas() {
  return (
    <>
      <PageHero
        eyebrow="Dúvidas"
        title="Perguntas *frequentes.*"
        lead="Respostas educativas, organizadas por assunto. Ficou com alguma dúvida? É só perguntar no contato."
        crumbs={[{ name: "Perguntas frequentes", path: "/perguntas-frequentes/" }]}
      >
        <ReviewNotice approved={site.approved.faq}>
          Versão de revisão: as respostas ainda serão validadas clinicamente pela profissional.
        </ReviewNotice>
      </PageHero>
      <section className="pb-24">
        <div className="wrap space-y-16">
          {faqGroups.map((g) => (
            <FadeInSection key={g.topic} className="grid gap-8 lg:grid-cols-12">
              <h2 className="t-h3 lg:col-span-4">{g.topic}</h2>
              <div className="lg:col-span-8">
                <Accordion items={g.items} />
              </div>
            </FadeInSection>
          ))}
        </div>
        <JsonLd data={faqLd(faqGroups.flatMap((g) => g.items))} />
      </section>
      <CtaBand />
    </>
  );
}
