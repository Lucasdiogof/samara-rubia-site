import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { homeFaq } from "@/lib/faq";
import { getDict, href, type Lang } from "@/i18n";

export function FaqSection({ lang }: { lang: Lang }) {
  const t = getDict(lang).faqSection;
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">{t.eyebrow}</p>
          <RevealText as="h2" id="faq-title" className="t-h2 mt-5">
            {t.title}
          </RevealText>
          <FadeInSection delay={0.2}>
            <Link
              href={href(lang, "/perguntas-frequentes/")}
              className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
            >
              {t.all}
            </Link>
          </FadeInSection>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={homeFaq(lang)} />
        </div>
      </div>
    </section>
  );
}
