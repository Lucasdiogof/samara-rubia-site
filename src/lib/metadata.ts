import type { Metadata } from "next";
import { fullName, site } from "@/config/site";

export function pageMetadata(opts: { title: string; description: string; path: string }): Metadata {
  const url = new URL(opts.path, site.url).toString();
  const title = `${opts.title} | ${fullName}`;
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: `${fullName} — ${site.specialty}`,
      locale: "pt_BR",
      type: "website",
    },
    twitter: { card: "summary", title, description: opts.description },
  };
}
