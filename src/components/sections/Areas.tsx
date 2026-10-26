import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AreaRow } from "@/components/ui/AreaRow";
import { enabledServices } from "@/lib/services";

export function Areas() {
  const list = enabledServices();
  if (list.length === 0) return null;
  return (
    <section className="section lap bg-cream" aria-labelledby="areas-title">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Áreas de atuação</p>
            <RevealText as="h2" id="areas-title" className="t-h2 mt-5">
              Onde a fisioterapia pélvica *pode* ajudar.
            </RevealText>
            <FadeInSection delay={0.2}>
              <p className="mt-6 text-cocoa">
                Temas em que a avaliação costuma ser buscada. Cada caso é único e o plano nasce da
                sua avaliação individual.
              </p>
              <Link
                href="/tratamentos/"
                className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
              >
                Ver todos os tratamentos
              </Link>
            </FadeInSection>
          </div>
        </div>
        <ul className="border-t border-border lg:col-span-8">
          {list.map((s, i) => (
            <AreaRow
              key={s.slug}
              index={i}
              title={s.title}
              short={s.short}
              href={`/tratamentos/${s.slug}/`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
