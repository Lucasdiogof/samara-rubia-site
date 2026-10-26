import { ArticleCard } from "@/components/ui/ArticleCard";
import { StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import type { Article } from "@/config/content";
import type { Lang } from "@/i18n";

export function ArticleGrid({ articles, lang }: { articles: Article[]; lang: Lang }) {
  return (
    <StaggerContainer as="ul" className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {articles.map((a) => (
        <StaggerItem as="li" key={a.slug}>
          <ArticleCard article={a} lang={lang} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
