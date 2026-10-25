"use client";

import { WhatsAppIcon } from "@/components/ui/Icons";
import { trackCta, whatsappUrl } from "@/lib/contact";

/** Botão flutuante discreto. Só aparece com WhatsApp válido na configuração. */
export function FloatingWhatsApp() {
  const href = whatsappUrl();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      onClick={() => trackCta("floating")}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-cocoa text-vanilla shadow-[var(--shadow-soft)] transition-colors hover:bg-cocoa-deep"
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
