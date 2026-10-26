import type { Lang } from "./config";
import { pt, type Dict } from "./pt";
import { en } from "./en";
import { es } from "./es";

export * from "./config";
export type { Dict, Service, FaqGroup } from "./pt";

const dicts: Record<Lang, Dict> = { pt, en, es };

/** Textos do idioma. Só para componentes de servidor: os de cliente recebem apenas o que usam. */
export const getDict = (lang: Lang): Dict => dicts[lang];
