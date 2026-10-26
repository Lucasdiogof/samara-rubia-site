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

export const hasWhatsapp = whatsappUrl() !== null;
/** Há ao menos um canal real confirmado (a página de contato tem o que mostrar). */
export const hasChannel = hasWhatsapp || instagramUrl !== null;

/**
 * Ação principal de contato, única fonte para header, hero e CTAs.
 * WhatsApp válido: agendar; só Instagram: seguir (sem prometer agendamento); nenhum: null,
 * e cada lugar omite o botão em vez de levar a uma página sem ação útil.
 */
export const primaryCta: { href: string; label: string } | null = hasWhatsapp
  ? { href: whatsappUrl()!, label: "Agendar avaliação" }
  : instagramUrl
    ? { href: instagramUrl, label: "Conhecer no Instagram" }
    : null;

export function trackCta(name: string) {
  // Gancho para mensuração futura: qualquer script pode ouvir "site:cta".
  window.dispatchEvent(new CustomEvent("site:cta", { detail: { name } }));
}
