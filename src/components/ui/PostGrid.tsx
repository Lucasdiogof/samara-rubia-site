import { PostCard } from "@/components/ui/PostCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import type { Post } from "@/config/content";
import { getDict, type Lang } from "@/i18n";
import { formatDate, instagramCode } from "@/lib/content";

/** Legenda original: 1º parágrafo vira o título; o restante, o resumo. Sem tradução nem edição. */
function captionParts(caption: string | undefined, fallback: string) {
  const [first, ...rest] = (caption ?? "").split("\n\n").map((p) => p.trim()).filter(Boolean);
  return { title: first ?? fallback, excerpt: rest.join(" ") };
}

export function PostGrid({ posts, lang }: { posts: Post[]; lang: Lang }) {
  const t = getDict(lang).content;
  return (
    <StaggerContainer as="ul" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts.map((p, i) => {
        const code = instagramCode(p.url);
        const { title, excerpt } = captionParts(p.caption, t.postTitle(i + 1));
        return (
          <StaggerItem as="li" key={p.id}>
            <PostCard
              url={p.url}
              embedSrc={code ? `https://www.instagram.com/p/${code}/embed/` : null}
              cover={p.cover}
              title={title}
              excerpt={excerpt}
              captionLang={p.caption && lang !== "pt" ? "pt" : undefined}
              labels={{
                kind: p.kind ? t.kinds[p.kind] : "",
                date: p.date ? formatDate(lang, p.date) : "",
                dateIso: p.date,
                watch: t.watchPost,
                openIg: t.openIg,
                note: t.igNote,
                player: t.playerPost(i + 1),
              }}
            />
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
