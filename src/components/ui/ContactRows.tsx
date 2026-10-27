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
            {venue && (
              <span className="block font-display text-[1.55rem] leading-snug text-cocoa-deep">{t.venueAt(venue)}</span>
            )}
            {street && <span className="block text-cocoa">{street}</span>}
            {cityLine && <span className="block text-cocoa">{cityLine}</span>}
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
      value: hours ? (
        <>
          <span className="block text-[1.1rem]">{t.hoursText(hours.open, hours.close)}</span>
          <span className="block text-[0.95rem] text-cocoa">{t.hoursNote}</span>
        </>
      ) : null,
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
export function ContactRows({
  lang,
  only,
  bare = false,
}: {
  lang: Lang;
  only?: Key[];
  /** sem moldura própria (usado dentro de um cartão maior) */
  bare?: boolean;
}) {
  const t = getDict(lang).contactRows;
  const rows = select(lang, only);
  const items: Row[] = rows.filter((r) => r.value !== null);
  // Sem nenhum dado confirmado, uma única linha avisa que virá; havendo dados, não polui o card.
  const pending = rows.filter((r) => r.value === null);
  if (items.length === 0 && pending.length) {
    const text = t.pending(list(pending.map((r) => r.label.toLowerCase()), t.and));
    items.push({
      key: "soon",
      label: t.soon,
      icon: Hourglass,
      value: text.charAt(0).toUpperCase() + text.slice(1),
    });
  }

  return (
    <dl className={bare ? "" : "overflow-hidden rounded-3xl border border-border bg-cream/50"}>
      {items.map(({ key, label, icon: Icon, value }) => (
        <div key={key} className="relative border-b border-border py-6 pl-[4.75rem] pr-6 last:border-b-0">
          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cocoa">
            <span className="absolute left-5 top-6 grid h-12 w-12 place-items-center rounded-full bg-cream text-cocoa">
              <Icon className="h-[1.35rem] w-[1.35rem]" />
            </span>
            {label}
          </dt>
          <dd className="mt-2 text-cocoa-deep">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
