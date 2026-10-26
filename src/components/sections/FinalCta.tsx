import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob } from "@/components/ui/Portrait";
import { hasWhatsapp, primaryCta } from "@/lib/contact";

export function FinalCta() {
  return (
    <section
      className="on-dark lap relative overflow-hidden bg-cocoa py-[var(--space-section)] text-vanilla"
      aria-labelledby="cta-title"
    >
      <Blob
        className="drift pointer-events-none absolute -bottom-40 -left-24 h-[34rem] w-[34rem] opacity-[0.14]"
        fill="var(--sand)"
      />
      <Blob
        className="pointer-events-none absolute -right-20 -top-32 h-[26rem] w-[26rem] opacity-[0.1]"
        fill="var(--cream)"
      />
      <div className="wrap relative max-w-4xl">
        <p className="eyebrow !text-cream">Próximo passo</p>
        <RevealText as="h2" id="cta-title" className="t-display mt-6">
          {hasWhatsapp
            ? "Seu cuidado começa com uma *conversa.*"
            : "Em breve, o primeiro *contato.*"}
        </RevealText>
        <FadeInSection delay={0.2}>
          <p className="mt-8 max-w-xl text-lg text-cream">
            {hasWhatsapp
              ? "Envie uma mensagem para agendar a sua avaliação. Sem compromisso e sem precisar detalhar nada por escrito."
              : "Os canais de contato e de agendamento ainda estão em preparação e serão divulgados aqui assim que forem confirmados."}
          </p>
          <AnimatedButton
            href={primaryCta?.href ?? "/como-funciona/"}
            variant="light"
            track="final"
            className="mt-10"
          >
            {hasWhatsapp ? "Agendar pelo WhatsApp" : (primaryCta?.label ?? "Entenda como funciona")}
          </AnimatedButton>
        </FadeInSection>
      </div>
    </section>
  );
}
