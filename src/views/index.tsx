import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, Check, ClipboardList, Ear, TrendingUp } from "lucide-react";

const approachIcons = [ClipboardList, Ear, BookOpenCheck, TrendingUp];
import { PageHero, ReviewNotice, CtaBand } from "@/components/ui/PageParts";
import { AnimatedButton } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ContactRows } from "@/components/ui/ContactRows";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Portrait } from "@/components/ui/Portrait";
import {
  FadeInSection,
  RevealImage,
  RevealText,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Reveal";
import { Hero } from "@/components/sections/Hero";
import { PelvicHealth } from "@/components/sections/PelvicHealth";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Signals } from "@/components/sections/Signals";
import { Journey } from "@/components/sections/Journey";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContentSection } from "@/components/sections/ContentSection";
// Avaliações ocultas até haver casos reais e autorizados: reativar junto com o <ReviewsSection> mais abaixo.
// import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ArticleGrid } from "@/components/ui/ArticleGrid";
import { ReelGrid } from "@/components/ui/ReelGrid";
import { PostGrid } from "@/components/ui/PostGrid";
import { Photo } from "@/components/ui/Photo";
import type { Article } from "@/config/content";
import { allArticles, allPosts, allReels, categoryLabel, formatDate } from "@/lib/content";
import { LocationSection } from "@/components/sections/LocationSection";
import { FinalCta } from "@/components/sections/FinalCta";
import { OfficeGallery } from "@/components/sections/OfficeGallery";
import { JsonLd } from "@/components/seo/JsonLd";
import { fullName, site } from "@/config/site";
import { getDict, href, langMeta, type Lang } from "@/i18n";
import { Blob } from "@/components/ui/Portrait";
import { hasChannel, hasWhatsapp, whatsappUrl } from "@/lib/contact";
import { buildMetadata, localizedUrl, pageMetadata, siteDescription } from "@/lib/metadata";
import { enabledServices } from "@/lib/services";
import { faqLd } from "@/lib/structured-data";

type View = (p: { lang: Lang }) => ReactNode;
type Route = { meta: (lang: Lang) => Metadata; View: View };

function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <PelvicHealth lang={lang} />
      <AboutTeaser lang={lang} />
      <Signals lang={lang} />
      <ContentSection lang={lang} />
      <FaqSection lang={lang} />
      {/* <ReviewsSection lang={lang} /> */}
      <LocationSection lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}

function How({ lang }: { lang: Lang }) {
  const t = getDict(lang).how;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ name: t.crumb, path: "/como-funciona/" }]}
      />
      <Journey lang={lang} />
      <section className="bg-cream py-12">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {t.care.map(([title, d], i) => (
            <FadeInSection key={title} delay={i * 0.1}>
              <h2 className="font-display text-3xl text-cocoa-deep">{title}</h2>
              <p className="mt-3 text-cocoa">{d}</p>
            </FadeInSection>
          ))}
        </div>
      </section>
      <CtaBand lang={lang} here="/como-funciona/" />
    </>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = getDict(lang).contactPage;
  const wa = whatsappUrl(lang);
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={wa ? t.leadWa : hasChannel ? t.leadSome : t.leadNone}
        crumbs={[{ name: t.eyebrow, path: "/contato/" }]}
      />
      <section className="pb-16">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-5">
            <div className="rounded-[2rem] bg-cream p-8 sm:p-10">
              {wa ? (
                <>
                  <h2 className="t-h3">{t.schedule}</h2>
                  <p className="mt-4 text-cocoa">{t.scheduleText}</p>
                  <AnimatedButton href={wa} track="contact" className="mt-8">
                    <WhatsAppIcon /> {t.callWa}
                  </AnimatedButton>
                </>
              ) : (
                <>
                  <h2 className="t-h3">{t.preparing}</h2>
                  <p className="mt-4 text-cocoa">{t.preparingText}</p>
                </>
              )}
            </div>
          </FadeInSection>
          <FadeInSection delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <ContactRows lang={lang} />
            {site.location.mapsUrl && (
              <AnimatedButton href={site.location.mapsUrl} variant="ghost" className="mt-8">
                {getDict(lang).contactRows.directions}
              </AnimatedButton>
            )}
          </FadeInSection>
        </div>
      </section>
    </>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const p = t.faqPage;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={p.eyebrow}
        title={p.title}
        lead={hasWhatsapp ? p.leadWa : p.leadNoWa}
        crumbs={[{ name: p.crumb, path: "/perguntas-frequentes/" }]}
      >
        <ReviewNotice approved={site.approved.faq}>{p.review}</ReviewNotice>
      </PageHero>
      <section className="pb-14">
        <div className="wrap space-y-12">
          {t.faqGroups.map((g) => (
            <FadeInSection key={g.topic} className="grid gap-8 lg:grid-cols-12">
              <h2 className="t-h3 lg:col-span-4 lg:pt-5">{g.topic}</h2>
              <div className="lg:col-span-8">
                <Accordion items={g.items} />
              </div>
            </FadeInSection>
          ))}
        </div>
        <JsonLd data={faqLd(t.faqGroups.flatMap((g) => g.items))} />
      </section>
      <CtaBand lang={lang} here="/perguntas-frequentes/" />
    </>
  );
}

function Privacy({ lang }: { lang: Lang }) {
  const t = getDict(lang).privacy;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ name: t.crumb, path: "/privacidade/" }]}
      >
        <ReviewNotice approved={site.approved.privacy}>{t.review}</ReviewNotice>
      </PageHero>
      <section className="pb-16">
        <div className="wrap max-w-3xl space-y-12">
          {t.blocks(fullName).map(([title, ps]) => (
            <div key={title}>
              <h2 className="t-h3">{title}</h2>
              <div className="prose-calm mt-4">
                {ps.map((x) => (
                  <p key={x}>{x}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <FadeInSection>
      <h2 className="t-h3">{title}</h2>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {items.map((e) => (
          <li key={e} className="py-3 text-cocoa-deep">
            {e}
          </li>
        ))}
      </ul>
    </FadeInSection>
  );
}

function About({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const a = t.about;
  const { bio } = site;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={a.eyebrow}
        title={a.pageTitle}
        lead={a.lead}
        crumbs={[{ name: a.crumb, path: "/sobre/" }]}
      >
        <ReviewNotice approved={site.approved.about}>{a.review}</ReviewNotice>
      </PageHero>

      <section className="pb-10">
        <div className="wrap grid items-start gap-8 lg:grid-cols-12">
          <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none">
            <RevealImage className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
              <div className="relative h-full w-full">
                <Portrait slot="model" sizes="(min-width: 1024px) 40vw, 90vw" />
              </div>
            </RevealImage>
          </div>
          <div className="space-y-8 lg:col-span-7 lg:pl-8">
            <FadeInSection>
              <h2 className="t-h3">{a.history}</h2>
              <div className="prose-calm mt-4">
                {a.story.map((p, i) => (
                  <p key={p} className={i === 0 ? "text-[1.15rem] leading-[1.7] text-cocoa-deep" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </FadeInSection>
            <List title={a.education} items={bio.education} />
            <List title={a.specializations} items={bio.specializations} />
            <List title={a.courses} items={bio.courses} />
            <div>
              <RevealText as="h2" className="t-h3">
                {a.approach}
              </RevealText>
              {bio.approach.length > 0 && (
                <div className="prose-calm mt-5">
                  {bio.approach.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              )}
              <StaggerContainer as="ul" className="mt-5 grid gap-3">
                {a.approachItems.map((d, i) => {
                  const Icon = approachIcons[i] ?? ClipboardList;
                  return (
                    <StaggerItem
                      as="li"
                      key={d.title}
                      className="flex gap-4 rounded-2xl border border-border bg-cream/60 p-4 sm:p-5"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream text-[var(--warm)]">
                        <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.35rem] leading-tight text-cocoa-deep">{d.title}</h3>
                        <p className="mt-1 text-[0.97rem] text-cocoa">{d.text}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
      <OfficeGallery lang={lang} />
      <CtaBand lang={lang} />
    </>
  );
}

function Treatments({ lang }: { lang: Lang }) {
  const t = getDict(lang).treatments;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ name: t.crumb, path: "/tratamentos/" }]}
      >
        <ReviewNotice approved={site.approved.services}>{t.review}</ReviewNotice>
      </PageHero>
      <section className="pb-14">
        <div className="wrap">
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {enabledServices(lang).map((s) => (
              <li key={s.slug}>
                <ServiceCard
                  slug={s.slug}
                  title={s.title}
                  short={s.short}
                  href={href(lang, `/tratamentos/${s.slug}/`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

function Treatment({ lang, slug }: { lang: Lang; slug: string }) {
  const t = getDict(lang).treatments;
  const all = enabledServices(lang);
  const s = all.find((x) => x.slug === slug)!;
  const others = all.filter((x) => x.slug !== s.slug).slice(0, 4);

  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.eyebrow}
        title={s.title}
        lead={s.description}
        crumbs={[
          { name: t.crumb, path: "/tratamentos/" },
          { name: s.title, path: `/tratamentos/${s.slug}/` },
        ]}
      >
        <ReviewNotice approved={site.approved.services}>{t.reviewDetail}</ReviewNotice>
      </PageHero>

      <section className="pb-12">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <RevealText as="h2" className="t-h3">
              {t.whenIndicated}
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
              <h2 className="t-h3">{t.followUpTitle}</h2>
              <p className="mt-4 text-cocoa">{t.followUp}</p>
            </FadeInSection>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap">
          <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-cocoa">
            {getDict(lang).page.otherAreas}
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={href(lang, `/tratamentos/${o.slug}/`)}
                  className="btn btn-ghost !min-h-11 !px-5 text-sm"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/** Conteúdo do 404.html (o postbuild copia /nao-encontrada/ para 404.html). Sempre em português. */
function NotFoundView({ lang }: { lang: Lang }) {
  const t = getDict(lang).notFound;
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32">
      <Blob
        className="pointer-events-none absolute -right-20 top-1/4 h-[30rem] w-[30rem] opacity-60"
        fill="var(--cream)"
      />
      <div className="wrap relative">
        <p className="eyebrow">{t.code}</p>
        <RevealText as="h1" className="t-display mt-6 max-w-3xl" intro>
          {t.heading}
        </RevealText>
        <p className="t-lead mt-6">{t.text}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <AnimatedButton href="/">{t.home}</AnimatedButton>
          <AnimatedButton
            href={hasChannel ? "/contato/" : "/como-funciona/"}
            variant="ghost"
            arrow={false}
          >
            {hasChannel ? t.contact : t.how}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

function Conteudos({ lang }: { lang: Lang }) {
  const t = getDict(lang).content;
  const reels = allReels();
  const posts = allPosts();
  const articles = allArticles();
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={t.pageEyebrow}
        title={t.pageTitle}
        crumbs={[{ name: t.crumb, path: "/conteudos/" }]}
      />
      <section className="pb-14">
        <div className="wrap space-y-12">
          {reels.length + posts.length + articles.length === 0 && <p className="prose-calm">{t.empty}</p>}
          {reels.length > 0 && (
            <div>
              <h2 className="t-h3 mb-8">{t.videos}</h2>
              <ReelGrid reels={reels} lang={lang} />
            </div>
          )}
          {posts.length > 0 && (
            <div>
              <PostGrid posts={posts} lang={lang} />
            </div>
          )}
          {articles.length > 0 && (
            <div>
              <h2 className="t-h3 mb-8">{t.articles}</h2>
              <ArticleGrid articles={articles} lang={lang} />
            </div>
          )}
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

function ArticlePage({ lang, article }: { lang: Lang; article: Article }) {
  const t = getDict(lang).content;
  const a = article.i18n[lang];
  const base = `/conteudos/${article.slug}/`;
  return (
    <>
      <PageHero
        lang={lang}
        eyebrow={categoryLabel(lang, article.category)}
        title={a.title}
        lead={a.summary}
        crumbs={[
          { name: t.crumb, path: "/conteudos/" },
          { name: a.title, path: base },
        ]}
      >
        <p className="mt-6 text-sm text-cocoa">
          <time dateTime={article.date}>{formatDate(lang, article.date)}</time>
          {article.demo && <span className="ml-3 font-semibold">{t.demo}</span>}
        </p>
      </PageHero>
      <article className="pb-14">
        <div className="wrap max-w-3xl">
          {article.cover && (
            <div className="relative mb-12 aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-cream">
              <Photo photo={article.cover} sizes="(min-width: 768px) 48rem, 94vw" />
            </div>
          )}
          <div className="prose-calm !max-w-none space-y-0">
            {a.body.map((b) =>
              b.startsWith("## ") ? (
                <h2 key={b} className="t-h3 mb-4 mt-12 !text-cocoa-deep">
                  {b.slice(3)}
                </h2>
              ) : (
                <p key={b}>{b}</p>
              ),
            )}
          </div>
          <Link href={href(lang, "/conteudos/")} className="link-u mt-8 inline-block font-semibold text-cocoa-deep">
            {t.back}
          </Link>
        </div>
        {!article.demo && (
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: a.title,
              description: a.summary,
              datePublished: article.date,
              inLanguage: langMeta[lang].htmlLang,
              mainEntityOfPage: localizedUrl(lang, base),
              ...(site.professionalName
                ? { author: { "@type": "Person", name: site.professionalName } }
                : {}),
            }}
          />
        )}
      </article>
      <CtaBand lang={lang} />
    </>
  );
}

/** Rotas neutras (sem prefixo de idioma); o prefixo /en/ e /es/ é resolvido em app/[[...slug]]. */
const routes: Record<string, Route> = {
  "/": {
    meta: (lang) =>
      buildMetadata({
        title: getDict(lang).home.title(fullName, getDict(lang).specialty),
        description: siteDescription(lang),
        path: "/",
        lang,
      }),
    View: Home,
  },
  "/sobre/": {
    meta: (lang) => {
      const a = getDict(lang).about;
      return pageMetadata({
        title: a.metaTitle,
        description: a.metaDescription(fullName),
        path: "/sobre/",
        lang,
      });
    },
    View: About,
  },
  "/tratamentos/": {
    meta: (lang) => {
      const t = getDict(lang).treatments;
      return pageMetadata({
        title: t.metaTitle,
        description: t.metaDescription,
        path: "/tratamentos/",
        lang,
      });
    },
    View: Treatments,
  },
  "/como-funciona/": {
    meta: (lang) => {
      const t = getDict(lang).how;
      return pageMetadata({
        title: t.metaTitle,
        description: t.metaDescription,
        path: "/como-funciona/",
        lang,
      });
    },
    View: How,
  },
  "/perguntas-frequentes/": {
    meta: (lang) => {
      const t = getDict(lang).faqPage;
      return pageMetadata({
        title: t.metaTitle,
        description: t.metaDescription,
        path: "/perguntas-frequentes/",
        lang,
      });
    },
    View: Faq,
  },
  "/contato/": {
    meta: (lang) => {
      const t = getDict(lang).contactPage;
      return pageMetadata({
        title: hasWhatsapp ? t.metaTitleWa : t.metaTitleNoWa,
        description: hasWhatsapp ? t.metaDescWa : t.metaDescNoWa,
        path: "/contato/",
        lang,
      });
    },
    View: Contact,
  },
  "/privacidade/": {
    meta: (lang) => {
      const t = getDict(lang).privacy;
      return pageMetadata({
        title: t.metaTitle,
        description: t.metaDescription,
        path: "/privacidade/",
        lang,
      });
    },
    View: Privacy,
  },
};

for (const s of enabledServices("pt")) {
  const path = `/tratamentos/${s.slug}/`;
  routes[path] = {
    meta: (lang) => {
      const x = enabledServices(lang).find((v) => v.slug === s.slug)!;
      return pageMetadata({ title: x.title, description: x.short, path, lang });
    },
    View: ({ lang }) => <Treatment lang={lang} slug={s.slug} />,
  };
}

routes["/conteudos/"] = {
  meta: (lang) => {
    const t = getDict(lang).content;
    return pageMetadata({
      title: t.metaTitle,
      description: t.metaDescription,
      path: "/conteudos/",
      lang,
    });
  },
  View: Conteudos,
};

for (const article of allArticles()) {
  const path = `/conteudos/${article.slug}/`;
  routes[path] = {
    meta: (lang) => {
      const a = article.i18n[lang];
      return pageMetadata({
        title: a.seoTitle ?? a.title,
        description: a.seoDescription ?? a.summary,
        path,
        lang,
      });
    },
    View: ({ lang }) => <ArticlePage lang={lang} article={article} />,
  };
}

/** Rota interna do 404: fora do sitemap e dos idiomas, sem indexação. */
export const notFoundPath = "/nao-encontrada/";
routes[notFoundPath] = {
  meta: () => ({ title: getDict("pt").notFound.title, robots: { index: false, follow: false } }),
  View: NotFoundView,
};

export const routePaths = Object.keys(routes).filter((p) => p !== notFoundPath);
export const getRoute = (path: string): Route | undefined => routes[path];
