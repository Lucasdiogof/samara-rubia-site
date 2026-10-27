import { PostCard } from "@/components/ui/PostCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import type { Post } from "@/config/content";
import { getDict, type Lang } from "@/i18n";
import { formatDate, instagramCode } from "@/lib/content";

/** Legenda original: 1º parágrafo vira o título; o restante, o resumo. Sem tradução nem edição. */
function captionParts(caption: string | undefined, fallback: string) {
  const [first, ...rest] = (caption ?? "")
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);
  return { title: first ?? fallback, paragraphs: rest };
}

export function PostGrid({ posts, lang }: { posts: Post[]; lang: Lang }) {
  const t = getDict(lang).content;
  return (
    <>
      <StaggerContainer as="ul" className="grid gap-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
        {posts.map((p, i) => {
          const code = instagramCode(p.url);
          const { title, paragraphs } = captionParts(p.caption, t.postTitle(i + 1));
          return (
            <StaggerItem as="li" key={p.id}>
              <PostCard
                url={p.url}
                embedSrc={code ? `https://www.instagram.com/p/${code}/embed/` : null}
                cover={p.cover}
                title={title}
                paragraphs={paragraphs}
                captionLang={p.caption && lang !== "pt" ? "pt" : undefined}
                labels={{
                  date: p.date ? formatDate(lang, p.date) : "",
                  dateIso: p.date,
                  openIg: t.openIg,
                  player: t.playerPost(i + 1),
                }}
              />
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </>
  );
}
