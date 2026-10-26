import type { ComponentType, ReactNode } from "react";
import { Clock, Laptop, MapPin, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/config/site";
import { instagramUrl, whatsappUrl } from "@/lib/contact";

type Key = "whatsapp" | "instagram" | "address" | "modality" | "hours" | "insurance";

const pending = <span className="italic text-cocoa">A confirmar</span>;

/** Lista de informações de contato; o que não foi confirmado aparece como "A confirmar". */
export function ContactRows({ only }: { only?: Key[] }) {
  const { city, region, address, mapsUrl, hours, modalities } = site.location;
  const place = [address, city, region].filter(Boolean).join(", ");
  const wa = whatsappUrl();

  const rows: {
    key: Key;
    label: string;
    icon: ComponentType<{ className?: string }>;
    value: ReactNode;
  }[] = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: (p) => <WhatsAppIcon {...p} width={20} height={20} />,
      value: wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="link-u font-semibold">
          Chamar no WhatsApp
        </a>
      ) : (
        pending
      ),
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: (p) => <InstagramIcon {...p} width={20} height={20} />,
      value: instagramUrl ? (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-u font-semibold"
        >
          @{site.contact.instagram}
        </a>
      ) : (
        pending
      ),
    },
    {
      key: "address",
      label: "Endereço",
      icon: MapPin,
      value: place ? (
        <>
          {place}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-u mt-1 block font-semibold"
            >
              Abrir no Google Maps
            </a>
          )}
        </>
      ) : (
        pending
      ),
    },
    {
      key: "modality",
      label: "Modalidade",
      icon: Laptop,
      value: modalities.length ? modalities.join(" · ") : pending,
    },
    { key: "hours", label: "Horários", icon: Clock, value: hours ?? pending },
  ];
  if (site.insurance.length)
    rows.push({
      key: "insurance",
      label: "Convênios",
      icon: ShieldCheck,
      value: site.insurance.join(" · "),
    });

  return (
    <dl className="divide-y divide-border border-y border-border">
      {rows
        .filter((r) => !only || only.includes(r.key))
        .map(({ key, label, icon: Icon, value }) => (
          <div key={key} className="py-5">
            <dt className="flex items-center gap-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cocoa">
              <Icon className="shrink-0" />
              {label}
            </dt>
            <dd className="mt-2 pl-9 text-cocoa-deep">{value}</dd>
          </div>
        ))}
    </dl>
  );
}
