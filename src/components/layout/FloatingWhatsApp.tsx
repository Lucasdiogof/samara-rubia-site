"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { trackCta, whatsappUrl } from "@/lib/contact";
import type { Lang } from "@/i18n/config";

/** Botão flutuante discreto. Só aparece com WhatsApp válido na configuração. */
export function FloatingWhatsApp({
  lang,
  labels,
}: {
  lang: Lang;
  labels: { region: string; schedule: string };
}) {
  const href = whatsappUrl(lang);
  if (!href) return null;
  return (
    <aside aria-label={labels.region} className="fixed bottom-5 right-5 z-40">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.schedule}
        onClick={() => trackCta("floating")}
        className="grid h-14 w-14 place-items-center rounded-full bg-cocoa text-vanilla shadow-[var(--shadow-soft)] transition-colors hover:bg-cocoa-deep"
      >
        <WhatsAppIcon width={26} height={26} />
      </a>
    </aside>
  );
}
