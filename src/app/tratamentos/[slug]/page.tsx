import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import { Accordion } from "@/components/ui/Accordion";
import {
  FadeInSection,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { enabledServices } from "@/lib/services";
import { pageMetadata } from "@/lib/metadata";
import { faqLd } from "@/lib/structured-data";
import { site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return enabledServices().map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = enabledServices().find((x) => x.slug === slug);
  if (!s) return {};
  return pageMetadata({ title: s.title, description: s.short, path: `/tratamentos/${s.slug}/` });
}

export default async function Tratamento({ params }: Props) {
  const { slug } = await params;
  const all = enabledServices();
  const s = all.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = all.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow="Tratamentos"
        title={s.title}
        lead={s.description}
        crumbs={[
          { name: "Tratamentos", path: "/tratamentos/" },
          { name: s.title, path: `/tratamentos/${s.slug}/` },
        ]}
      >
        <ReviewNotice approved={site.approved.services} />
      </PageHero>

      <section className="pb-20">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RevealText as="h2" className="t-h3">
              Quando a avaliação pode ser indicada
            </RevealText>
            <StaggerContainer as="ul" className="mt-8 space-y-4">
              {s.indications.map((i) => (
                <StaggerItem as="li" key={i} className="flex gap-3 text-cocoa-deep">
                  <Check size={20} className="mt-1 shrink-0 text-cocoa" aria-hidden="true" />
                  {i}
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <FadeInSection className="rounded-3xl bg-cream p-8">
              <h2 className="t-h3">Como funciona o acompanhamento</h2>
              <p className="mt-4 text-cocoa">{s.followUp}</p>
              <p className="mt-6 border-t border-border pt-5 text-sm text-cocoa">
                Este conteúdo é educativo e não substitui a avaliação de um profissional de saúde.
                Não há promessa de cura ou de resultado.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap">
          <h2 className="t-h3 mb-6">Dúvidas sobre este tema</h2>
          <Accordion items={s.faq} />
          <JsonLd data={faqLd(s.faq)} />
          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-cocoa">
            Outras áreas
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/tratamentos/${o.slug}/`}
                  className="btn btn-ghost !min-h-11 !px-5 text-sm"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
