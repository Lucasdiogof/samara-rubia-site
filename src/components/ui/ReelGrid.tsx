import { ReelCard } from "@/components/ui/ReelCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import type { Reel } from "@/config/content";
import { getDict, type Lang } from "@/i18n";
import { instagramCode } from "@/lib/content";

/** Reels: no celular, faixa horizontal com snap; a partir de md, grade de 3 colunas. */
export function ReelGrid({ reels, lang }: { reels: Reel[]; lang: Lang }) {
  const t = getDict(lang).content;
  return (
    <StaggerContainer
      as="ul"
      className="-mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--space-gutter)] pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 md:pb-0"
    >
      {reels.map((r) => {
        const code = instagramCode(r.url);
        const title = r.title[lang];
        return (
          <StaggerItem
            as="li"
            key={r.id}
            className="w-[68vw] max-w-[19rem] shrink-0 snap-start md:w-auto md:max-w-none"
          >
            <ReelCard
              title={title}
              url={r.url}
              embedSrc={code ? `https://www.instagram.com/reel/${code}/embed/` : null}
              cover={r.cover}
              demo={!!r.demo}
              labels={{
                watch: t.watch,
                openIg: t.openIg,
                note: t.igNote,
                player: t.player(title),
                demo: t.demo,
              }}
            />
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
