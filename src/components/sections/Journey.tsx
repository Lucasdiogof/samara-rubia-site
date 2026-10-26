import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { journey } from "@/content/journey";

/** Storytelling: a linha de progresso e as etapas acompanham o scroll. */
export function Journey({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`section ${compact ? "lap bg-background" : ""}`}
      aria-labelledby="jornada-title"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">Como funciona o atendimento</p>
            <RevealText as="h2" id="jornada-title" className="t-h2 mt-5">
              Do primeiro contato ao *acompanhamento,* passo a passo.
            </RevealText>
            {compact && (
              <FadeInSection delay={0.2}>
                <Link
                  href="/como-funciona/"
                  className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
                >
                  Ver detalhes do atendimento
                </Link>
              </FadeInSection>
            )}
          </div>
        </div>
        <ol data-story className="relative lg:col-span-7">
          <span
            className="absolute bottom-3 left-[1.15rem] top-3 w-px bg-border"
            aria-hidden="true"
          />
          <span
            data-progress
            className="absolute bottom-3 left-[1.15rem] top-3 w-px origin-top bg-cocoa"
            aria-hidden="true"
          />
          {journey.map((s, i) => (
            <li key={s.title} data-step className="relative pb-14 pl-14 last:pb-0">
              <span className="absolute left-0 top-1 grid h-9 w-9 place-items-center rounded-full step-dot font-display text-lg">
                {i + 1}
              </span>
              <h3 className="t-h3">{s.title}</h3>
              <p className="mt-3 max-w-md text-cocoa">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
