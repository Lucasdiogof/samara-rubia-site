import { PostCard } from "@/components/ui/PostCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import type { Post } from "@/config/content";
import { getDict, type Lang } from "@/i18n";
import { instagramCode } from "@/lib/content";

export function PostGrid({ posts, lang }: { posts: Post[]; lang: Lang }) {
  const t = getDict(lang).content;
  return (
    <StaggerContainer as="ul" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {posts.map((p, i) => {
        const code = instagramCode(p.url);
        return (
          <StaggerItem as="li" key={p.id}>
            <PostCard
              url={p.url}
              embedSrc={code ? `https://www.instagram.com/p/${code}/embed/` : null}
              cover={p.cover}
              labels={{
                title: t.postTitle(i + 1),
                hint: t.postHint,
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
