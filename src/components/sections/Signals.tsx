import { RevealText } from "@/components/animations/Reveal";
import { SignalsQuiz } from "@/components/sections/SignalsQuiz";
import { primaryCta } from "@/lib/contact";
import { getDict, href, type Lang } from "@/i18n";

/** Questionário educativo da home (substitui a jornada; /como-funciona/ segue existindo). */
export function Signals({ lang }: { lang: Lang }) {
  const { eyebrow, title, subtitle, ...quiz } = getDict(lang).signals;
  // CTA genérico: a mensagem do WhatsApp nunca inclui o que foi marcado.
  const cta = primaryCta(lang) ?? { href: href(lang, "/como-funciona/"), label: getDict(lang).journeySection.details };
  return (
    <section className="section lap bg-background" aria-labelledby="signals-title">
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <RevealText as="h2" id="signals-title" className="t-h2 mt-5 text-balance">
            {title}
          </RevealText>
          <p className="mt-5 text-lg text-cocoa">{subtitle}</p>
        </div>
        <div className="mt-10 sm:mt-12">
          <SignalsQuiz t={quiz} cta={cta} />
        </div>
      </div>
    </section>
  );
}
