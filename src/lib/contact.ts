import { site } from "@/config/site";
import { ctaLabel, waMessage, type Lang } from "@/i18n/config";

const WHATSAPP_RE = /^55\d{10,11}$/;

export function whatsappUrl(lang: Lang = "pt"): string | null {
  const n = site.contact.whatsapp;
  if (!n || !WHATSAPP_RE.test(n)) return null;
  return `https://wa.me/${n}?text=${encodeURIComponent(waMessage[lang])}`;
}

// O @ vem de variável de build: só caracteres de um usuário do Instagram entram no caminho da URL.
const INSTAGRAM_RE = /^[A-Za-z0-9._]{1,30}$/;

export const instagramUrl =
  site.contact.instagram && INSTAGRAM_RE.test(site.contact.instagram)
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
export function primaryCta(lang: Lang): { href: string; label: string } | null {
  if (hasWhatsapp) return { href: whatsappUrl(lang)!, label: ctaLabel[lang].schedule };
  if (instagramUrl) return { href: instagramUrl, label: ctaLabel[lang].instagram };
  return null;
}

export function trackCta(name: string) {
  // Gancho para mensuração futura: qualquer script pode ouvir "site:cta".
  window.dispatchEvent(new CustomEvent("site:cta", { detail: { name } }));
}
