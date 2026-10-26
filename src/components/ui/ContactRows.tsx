import type { ComponentType, ReactNode } from "react";
import { Clock, Hourglass, Laptop, MapPin, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/config/site";
import { instagramUrl, whatsappUrl } from "@/lib/contact";

type Key = "whatsapp" | "instagram" | "address" | "modality" | "hours" | "insurance";
type Row = {
  key: Key | "soon";
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** null = ainda não confirmado */
  value: ReactNode | null;
};

const linkCls = "link-u font-semibold";

/** Informações de contato; `value: null` indica dado ainda não confirmado. */
function contactRows(): Row[] {
  const { city, region, address, mapsUrl, hours, modalities } = site.location;
  const place = [address, city, region].filter(Boolean).join(", ");
  const wa = whatsappUrl();
  const rows: Row[] = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: (p) => <WhatsAppIcon {...p} width={20} height={20} />,
      value: wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={linkCls}>
          Chamar no WhatsApp
        </a>
      ) : null,
    },
    {
      key: "instagram",
      label: "Instagram",
      icon: (p) => <InstagramIcon {...p} width={20} height={20} />,
      value: instagramUrl ? (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
          @{site.contact.instagram}
        </a>
      ) : null,
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
              className={`${linkCls} mt-1 block w-fit`}
            >
              Abrir no Google Maps
            </a>
          )}
        </>
      ) : null,
    },
    {
      key: "modality",
      label: "Modalidade",
      icon: Laptop,
      value: modalities.length ? modalities.join(" · ") : null,
    },
    { key: "hours", label: "Horários", icon: Clock, value: hours },
  ];
  if (site.insurance.length)
    rows.push({
      key: "insurance",
      label: "Convênios",
      icon: ShieldCheck,
      value: site.insurance.join(" · "),
    });
  return rows;
}

const select = (only?: Key[]) => contactRows().filter((r) => !only || only.includes(r.key as Key));

/** true quando nenhuma das informações pedidas foi confirmada. */
export const nothingConfirmed = (only?: Key[]) => select(only).every((r) => r.value === null);

const list = (names: string[]) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} e ${names.at(-1)}` : (names[0] ?? "");

/**
 * Lista de contato: mostra o que está confirmado e resume o restante em uma única linha
 * "Em breve", em vez de repetir "A confirmar" em cada item.
 */
export function ContactRows({ only }: { only?: Key[] }) {
  const rows = select(only);
  const items: Row[] = rows.filter((r) => r.value !== null);
  const pending = rows.filter((r) => r.value === null);
  if (pending.length) {
    const text = `${list(pending.map((r) => r.label.toLowerCase()))}: serão divulgados aqui assim que confirmados.`;
    items.push({
      key: "soon",
      label: "Em breve",
      icon: Hourglass,
      value: text.charAt(0).toUpperCase() + text.slice(1),
    });
  }

  return (
    <dl className="divide-y divide-border border-y border-border">
      {items.map(({ key, label, icon: Icon, value }) => (
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
