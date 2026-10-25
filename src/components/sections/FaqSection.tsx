import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { homeFaq } from "@/content/faq";

export function FaqSection() {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Dúvidas frequentes</p>
          <RevealText as="h2" id="faq-title" className="t-h2 mt-5">
            Perguntas que *costumam* surgir.
          </RevealText>
          <FadeInSection delay={0.2}>
            <Link
              href="/perguntas-frequentes/"
              className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
            >
              Ver todas as perguntas
            </Link>
          </FadeInSection>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={homeFaq} />
        </div>
      </div>
    </section>
  );
}
