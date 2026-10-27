import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/Button";
import { Blob } from "@/components/ui/Portrait";
import { hasWhatsapp, primaryCta as getCta } from "@/lib/contact";
import { getDict, href, type Lang } from "@/i18n";

export function FinalCta({ lang }: { lang: Lang }) {
  const t = getDict(lang).finalCta;
  const primaryCta = getCta(lang);
  return (
    <section
      className="on-dark grain lap relative overflow-hidden bg-cocoa py-[var(--space-section)] text-vanilla"
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
        <p className="eyebrow !text-cream">{t.eyebrow}</p>
        <RevealText as="h2" id="cta-title" className="t-display mt-6">
          {hasWhatsapp ? t.titleWa : t.titleNoWa}
        </RevealText>
        <FadeInSection delay={0.2}>
          <p className="mt-8 max-w-xl text-lg text-cream">
            {hasWhatsapp ? t.textWa : t.textNoWa}
          </p>
          <AnimatedButton
            href={primaryCta?.href ?? href(lang, "/como-funciona/")}
            variant="light"
            track="final"
            className="mt-10"
          >
            {hasWhatsapp ? t.buttonWa : (primaryCta?.label ?? t.buttonNoWa)}
          </AnimatedButton>
        </FadeInSection>
      </div>
    </section>
  );
}
