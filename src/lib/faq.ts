import { getDict, type Lang } from "@/i18n";

/** Perguntas da home: [grupo, item] dentro de faqGroups (mesma posição em todos os idiomas). */
const featured = [
  [0, 0],
  [0, 1],
  [1, 1],
  [1, 3],
  [2, 0],
  [2, 2],
];
export const homeFaq = (lang: Lang) => {
  const g = getDict(lang).faqGroups;
  return featured.map(([a, b]) => g[a!]!.items[b!]!);
};
