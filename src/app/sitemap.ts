import type { MetadataRoute } from "next";
import { langs } from "@/i18n";
import { languageAlternates, localizedUrl } from "@/lib/metadata";
import { routePaths } from "@/views";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.flatMap((p) =>
    langs.map((lang) => ({
      url: localizedUrl(lang, p),
      alternates: { languages: languageAlternates(p) },
    })),
  );
}
