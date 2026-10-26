import { PageHero, CtaBand } from "@/components/ui/PageParts";
import { Journey } from "@/components/sections/Journey";
import { FadeInSection } from "@/components/animations/Reveal";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Como funciona o atendimento",
  description:
    "Do primeiro contato pelo WhatsApp ao acompanhamento: veja como é a avaliação em fisioterapia pélvica, com privacidade e consentimento.",
  path: "/como-funciona/",
});

const care = [
  [
    "Privacidade",
    "Sigilo profissional. Pelo WhatsApp, envie apenas o necessário para o agendamento; detalhes clínicos são conversados na avaliação.",
  ],
  [
    "Consentimento",
    "Cada etapa é explicada antes de acontecer e só é realizada com a sua compreensão e concordância. Você pode pedir para parar a qualquer momento.",
  ],
  [
    "Acompanhamento",
    "O plano é individual e revisitado ao longo do caminho. Não há promessa de prazo ou de resultado.",
  ],
];

export default function ComoFunciona() {
  return (
    <>
      <PageHero
        eyebrow="Como funciona"
        title="Um atendimento *claro* em cada etapa."
        lead="Saber o que vai acontecer ajuda a chegar mais tranquilo. Veja a jornada e os cuidados que a acompanham."
        motif="rings"
        crumbs={[{ name: "Como funciona", path: "/como-funciona/" }]}
      />
      <Journey />
      <section className="bg-cream py-20">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {care.map(([t, d], i) => (
            <FadeInSection key={t} delay={i * 0.1}>
              <h2 className="font-display text-3xl text-cocoa-deep">{t}</h2>
              <p className="mt-3 text-cocoa">{d}</p>
            </FadeInSection>
          ))}
        </div>
      </section>
      <CtaBand here="/como-funciona/" />
    </>
  );
}
