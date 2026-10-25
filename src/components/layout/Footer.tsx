import Link from "next/link";
import { fullName, site } from "@/config/site";
import { instagramUrl, whatsappUrl } from "@/lib/contact";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { nav } from "./nav";

export function Footer() {
  const wa = whatsappUrl();
  const loc = [site.location.city, site.location.region].filter(Boolean).join(" · ");
  return (
    <footer id="rodape" className="bg-cream">
      <div className="wrap grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-[0.95rem] text-cocoa">
            Fisioterapia pélvica com escuta, privacidade e cuidado individualizado, para homens e
            mulheres.
          </p>
          {site.crefito && <p className="mt-4 text-sm text-cocoa">CREFITO {site.crefito}</p>}
        </div>

        <nav aria-label="Rodapé">
          <h2 className="eyebrow">Navegação</h2>
          <ul className="mt-5 space-y-2.5">
            {[...nav.slice(1), { href: "/privacidade/", label: "Política de privacidade" }].map(
              (n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-u text-[0.95rem] text-cocoa-deep">
                    {n.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Contato</h2>
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
              <li className="text-cocoa">WhatsApp em breve</li>
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
            © {new Date().getFullYear()} {fullName}. Todos os direitos reservados.
          </p>
          <p>
            O conteúdo deste site é educativo e não substitui a avaliação de um profissional de
            saúde.
          </p>
        </div>
      </div>
    </footer>
  );
}
