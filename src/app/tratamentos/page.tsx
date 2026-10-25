import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import { AreaRow } from "@/components/ui/AreaRow";
import { enabledServices } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Tratamentos e áreas de atuação",
  description:
    "Conheça as áreas da fisioterapia pélvica em que a avaliação costuma ser buscada: incontinência, dor pélvica, gestação, saúde masculina e feminina.",
  path: "/tratamentos/",
});

export default function Tratamentos() {
  const list = enabledServices();
  return (
    <>
      <PageHero
        eyebrow="Tratamentos"
        title="Áreas da *fisioterapia pélvica.*"
        lead="Temas em que a avaliação costuma ser buscada. O conteúdo é educativo e não substitui a avaliação individual."
        crumbs={[{ name: "Tratamentos", path: "/tratamentos/" }]}
      >
        <ReviewNotice approved={site.approved.services}>
          Versão de revisão: as áreas de atuação ainda serão confirmadas pela profissional.
        </ReviewNotice>
      </PageHero>
      <section className="pb-24">
        <div className="wrap">
          <ul className="border-t border-border">
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
      <CtaBand />
    </>
  );
}
