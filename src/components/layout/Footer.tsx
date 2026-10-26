import Link from "next/link";
import { fullName, site } from "@/config/site";
import { instagramUrl, whatsappUrl } from "@/lib/contact";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { getDict, href, type Lang } from "@/i18n";
import { Logo } from "./Logo";
import { navItems } from "@/lib/nav";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const wa = whatsappUrl(lang);
  const loc = [site.location.city, site.location.region].filter(Boolean).join(" · ");
  return (
    <footer id="rodape" className="bg-cream">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo lang={lang} specialty={t.specialty} />
          <p className="mt-6 max-w-xs text-[0.95rem] text-cocoa">
            {t.footer.blurb}
          </p>
          {site.crefito && <p className="mt-4 text-sm text-cocoa">CREFITO {site.crefito}</p>}
        </div>

        <nav aria-label={t.a11y.navFooter}>
          <h2 className="eyebrow">{t.footer.navigation}</h2>
          <ul className="mt-5 space-y-2.5">
            {[
              ...navItems(lang).slice(1),
              { path: "/privacidade/", href: href(lang, "/privacidade/"), label: t.nav.privacy },
            ].map((n) => (
              <li key={n.path}>
                <Link href={n.href} className="link-u text-[0.95rem] text-cocoa-deep">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">{t.footer.contact}</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem] text-cocoa-deep">
            {wa ? (
              <li>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u inline-flex items-center gap-2"
                >
                  <WhatsAppIcon width={18} height={18} /> WhatsApp
                </a>
              </li>
            ) : (
              <li className="text-cocoa">{t.footer.waSoon}</li>
            )}
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-u inline-flex items-center gap-2"
                >
                  <InstagramIcon width={18} height={18} /> @{site.contact.instagram}
                </a>
              </li>
            )}
            {loc && <li className="text-cocoa">{loc}</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="wrap flex flex-col gap-2 py-6 text-[0.82rem] text-cocoa sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {fullName}. {t.footer.rights}
          </p>
          <p>
            {t.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
