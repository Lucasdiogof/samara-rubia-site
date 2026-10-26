import type { MetadataRoute } from "next";
import { fullName } from "@/config/site";
import { getDict } from "@/i18n";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${fullName} | ${getDict("pt").specialty}`,
    short_name: fullName,
    start_url: "/",
    display: "browser",
    background_color: "#FCF8F1",
    theme_color: "#FCF8F1",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
