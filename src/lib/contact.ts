import { site } from "@/config/site";

const WHATSAPP_RE = /^55\d{10,11}$/;

export function whatsappUrl(message: string = site.whatsappMessage): string | null {
  const n = site.contact.whatsapp;
  if (!n || !WHATSAPP_RE.test(n)) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export const instagramUrl = site.contact.instagram
  ? `https://instagram.com/${site.contact.instagram}`
  : null;

/** Destino dos CTAs: WhatsApp quando válido; senão a página de contato. */
export const bookingHref = whatsappUrl() ?? "/contato/";
export const hasWhatsapp = whatsappUrl() !== null;

export function trackCta(name: string) {
  // Gancho para mensuração futura: qualquer script pode ouvir "site:cta".
  window.dispatchEvent(new CustomEvent("site:cta", { detail: { name } }));
}
