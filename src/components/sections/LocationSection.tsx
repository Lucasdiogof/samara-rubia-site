import { MapPin } from "lucide-react";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { site } from "@/config/site";

/** Mostra apenas dados confirmados; sem endereço, exibe aviso discreto. */
export function LocationSection() {
  const { city, region, address, mapsUrl, hours, modality } = site.location;
  const place = [city, region].filter(Boolean).join(" · ");
  return (
    <section className="border-y border-border py-20" aria-labelledby="local-title">
      <div className="wrap grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Localização</p>
          <RevealText as="h2" id="local-title" className="t-h2 mt-5">
            Onde *encontrar* o atendimento.
          </RevealText>
        </div>
        <FadeInSection className="lg:col-span-7">
          <div className="flex gap-4">
            <MapPin className="mt-1 shrink-0 text-cocoa" aria-hidden="true" />
            {place || address ? (
              <div className="space-y-2 text-cocoa-deep">
                {place && <p className="font-display text-3xl">{place}</p>}
                {address && <p className="text-cocoa">{address}</p>}
                {modality && <p className="text-cocoa">Modalidade: {modality}</p>}
                {hours && <p className="text-cocoa">Horários: {hours}</p>}
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-u inline-block font-semibold"
                  >
                    Abrir no Google Maps
                  </a>
                )}
              </div>
            ) : (
              <p className="max-w-md text-cocoa">
                Cidade, endereço e horários de atendimento serão divulgados em breve. Enquanto isso,
                o contato pode ser feito pelos canais da página de contato.
              </p>
            )}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
