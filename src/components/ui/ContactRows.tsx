import type { ComponentType, ReactNode } from "react";
import { Clock, Hourglass, Laptop, MapPin, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/config/site";
import { instagramUrl, whatsappUrl } from "@/lib/contact";
import { getDict, type Lang } from "@/i18n";

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
function contactRows(lang: Lang): Row[] {
  const t = getDict(lang).contactRows;
  const { venue, city, region, address, district, hours, modalities } = site.location;
  const street = [address, district].filter(Boolean).join(", ");
  const cityLine = [city, region].filter(Boolean).join(" – ");
  const wa = whatsappUrl(lang);
  const rows: Row[] = [
    {
      key: "whatsapp",
      label: t.whatsapp,
      icon: (p) => <WhatsAppIcon {...p} width={20} height={20} />,
      value: wa ? (
        <a href={wa} target="_blank" rel="noopener noreferrer" className={linkCls}>
          {t.callWa}
        </a>
      ) : null,
    },
    {
      key: "instagram",
      label: t.instagram,
      icon: (p) => <InstagramIcon {...p} width={20} height={20} />,
      value: instagramUrl ? (
        <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkCls}>
          @{site.contact.instagram}
        </a>
      ) : null,
    },
    {
      key: "address",
      label: t.address,
      icon: MapPin,
      value:
        street || cityLine ? (
          <>
            {venue && <span className="block font-semibold">{t.venueAt(venue)}</span>}
            {street && <span className="block">{street}</span>}
            {cityLine && <span className="block">{cityLine}</span>}
          </>
        ) : null,
    },
    {
      key: "modality",
      label: t.modality,
      icon: Laptop,
      value: modalities.length ? modalities.join(" · ") : null,
    },
    {
      key: "hours",
      label: t.hours,
      icon: Clock,
      value: hours ? t.hoursText(hours.open, hours.close) : null,
    },
  ];
  if (site.insurance.length)
    rows.push({
      key: "insurance",
      label: t.insurance,
      icon: ShieldCheck,
      value: site.insurance.join(" · "),
    });
  return rows;
}

const select = (lang: Lang, only?: Key[]) =>
  contactRows(lang).filter((r) => !only || only.includes(r.key as Key));

/** true quando nenhuma das informações pedidas foi confirmada. */
export const nothingConfirmed = (lang: Lang, only?: Key[]) =>
  select(lang, only).every((r) => r.value === null);

const list = (names: string[], and: string) =>
  names.length > 1 ? `${names.slice(0, -1).join(", ")} ${and} ${names.at(-1)}` : (names[0] ?? "");

/**
 * Lista de contato: mostra o que está confirmado e resume o restante em uma única linha
 * "Em breve", em vez de repetir "A confirmar" em cada item.
 */
export function ContactRows({ lang, only }: { lang: Lang; only?: Key[] }) {
  const t = getDict(lang).contactRows;
  const rows = select(lang, only);
  const items: Row[] = rows.filter((r) => r.value !== null);
  const pending = rows.filter((r) => r.value === null);
  if (pending.length) {
    const text = t.pending(list(pending.map((r) => r.label.toLowerCase()), t.and));
    items.push({
      key: "soon",
      label: t.soon,
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
