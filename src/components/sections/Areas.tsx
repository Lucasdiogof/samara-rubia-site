import Link from "next/link";
import { RevealText, FadeInSection } from "@/components/animations/Reveal";
import { AreaRow } from "@/components/ui/AreaRow";
import { enabledServices } from "@/lib/services";
import { getDict, href, type Lang } from "@/i18n";

export function Areas({ lang }: { lang: Lang }) {
  const t = getDict(lang).areas;
  const list = enabledServices(lang);
  if (list.length === 0) return null;
  return (
    <section className="section lap bg-cream" aria-labelledby="areas-title">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow">{t.eyebrow}</p>
            <RevealText as="h2" id="areas-title" className="t-h2 mt-5">
              {t.title}
            </RevealText>
            <FadeInSection delay={0.2}>
              <p className="mt-6 text-cocoa">
                {t.text}
              </p>
              <Link
                href={href(lang, "/tratamentos/")}
                className="link-u mt-6 inline-block font-semibold text-cocoa-deep"
              >
                {t.all}
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
              href={href(lang, `/tratamentos/${s.slug}/`)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
