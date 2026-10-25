import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { enabledServices } from "@/lib/services";

export const dynamic = "force-static";

const pages = [
  "/",
  "/sobre/",
  "/tratamentos/",
  "/como-funciona/",
  "/perguntas-frequentes/",
  "/contato/",
  "/privacidade/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...enabledServices().map((s) => `/tratamentos/${s.slug}/`)];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
