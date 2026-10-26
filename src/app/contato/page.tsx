import { PageHero } from "@/components/ui/PageParts";
import { AnimatedButton } from "@/components/ui/Button";
import { ContactRows } from "@/components/ui/ContactRows";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { FadeInSection } from "@/components/animations/Reveal";
import { hasChannel, hasWhatsapp, whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: hasWhatsapp ? "Contato e agendamento" : "Contato",
  description: hasWhatsapp
    ? "Agende sua avaliação de fisioterapia pélvica pelo WhatsApp e conheça os canais de contato."
    : "Canais de contato de fisioterapia pélvica. As informações de atendimento serão divulgadas aqui assim que confirmadas.",
  path: "/contato/",
});

export default function Contato() {
  const wa = whatsappUrl();
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos *conversar?*"
        lead={
          wa
            ? "O agendamento é feito pelo WhatsApp, de forma simples e sem formulários."
            : hasChannel
              ? "O agendamento ainda não está disponível neste site. Veja abaixo os canais confirmados."
              : "Os canais de atendimento ainda estão em preparação. Esta página será atualizada com as informações confirmadas."
        }
        crumbs={[{ name: "Contato", path: "/contato/" }]}
      />
      <section className="pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-5">
            <div className="rounded-[2rem] bg-cream p-8 sm:p-10">
              {wa ? (
                <>
                  <h2 className="t-h3">Agendar avaliação</h2>
                  <p className="mt-4 text-cocoa">
                    Clique para abrir uma conversa com uma mensagem inicial pronta. Não envie
                    informações clínicas detalhadas por mensagem.
                  </p>
                  <AnimatedButton href={wa} track="contact" className="mt-8">
                    <WhatsAppIcon /> Chamar no WhatsApp
                  </AnimatedButton>
                </>
              ) : (
                <>
                  <h2 className="t-h3">Canais em preparação</h2>
                  <p className="mt-4 text-cocoa">
                    O número de WhatsApp para agendamento será divulgado aqui assim que for
                    confirmado. Até lá, não há canal de agendamento disponível neste site.
                  </p>
                </>
              )}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ContactRows />
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
