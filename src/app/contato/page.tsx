import { Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageParts";
import { AnimatedButton } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { FadeInSection } from "@/components/animations/Reveal";
import { instagramUrl, whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Contato e agendamento",
  description:
    "Agende sua avaliação de fisioterapia pélvica pelo WhatsApp e conheça os canais de contato.",
  path: "/contato/",
});

export default function Contato() {
  const wa = whatsappUrl();
  const { city, region, address, mapsUrl, hours, modality } = site.location;
  const place = [address, city, region].filter(Boolean).join(", ");
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Vamos *conversar?*"
        lead={
          wa
            ? "O agendamento é feito pelo WhatsApp, de forma simples e sem formulários."
            : "Os canais de atendimento ainda estão em preparação. Esta página será atualizada com as informações confirmadas."
        }
        crumbs={[{ name: "Contato", path: "/contato/" }]}
      />
      <section className="pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-6">
            {wa ? (
              <>
                <h2 className="t-h3">Agendar avaliação</h2>
                <p className="mt-4 max-w-md text-cocoa">
                  Clique para abrir uma conversa com uma mensagem inicial pronta. Não envie
                  informações clínicas detalhadas por mensagem.
                </p>
                <AnimatedButton href={wa} track="contact" className="mt-8">
                  <WhatsAppIcon /> Chamar no WhatsApp
                </AnimatedButton>
              </>
            ) : (
              <div className="rounded-3xl bg-cream p-8">
                <h2 className="t-h3">Canais em preparação</h2>
                <p className="mt-4 text-cocoa">
                  O número de WhatsApp para agendamento será divulgado aqui assim que for
                  confirmado. Este botão está desativado de propósito até lá.
                </p>
              </div>
            )}
            {instagramUrl && (
              <p className="mt-8">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u inline-flex items-center gap-2 font-semibold"
                >
                  <InstagramIcon width={18} height={18} /> @{site.contact.instagram}
                </a>
              </p>
            )}
          </FadeInSection>

          <FadeInSection delay={0.15} className="space-y-8 lg:col-span-5 lg:col-start-8">
            {place ? (
              <div className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-cocoa" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-2xl">Endereço</h2>
                  <p className="mt-2 text-cocoa">{place}</p>
                  {modality && <p className="text-cocoa">Modalidade: {modality}</p>}
                  {mapsUrl && (
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-u mt-2 inline-block font-semibold"
                    >
                      Abrir no Google Maps
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-cocoa">
                Endereço e modalidade de atendimento serão informados em breve.
              </p>
            )}
            {hours && (
              <div className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-cocoa" aria-hidden="true" />
                <div>
                  <h2 className="font-display text-2xl">Horários</h2>
                  <p className="mt-2 text-cocoa">{hours}</p>
                </div>
              </div>
            )}
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
