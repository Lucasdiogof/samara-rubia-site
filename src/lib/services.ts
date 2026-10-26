import { site } from "@/config/site";
import { getDict, type Lang } from "@/i18n";

export const enabledServices = (lang: Lang) =>
  getDict(lang).services.filter((s) => site.enabledServices.includes(s.slug));
