import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import type { PhotoConfig } from "@/config/site";

export type PostLabels = {
  /** data por extenso já formatada; vazio se desconhecida */
  date: string;
  dateIso?: string;
  openIg: string;
  player: string;
};

/**
 * Card de uma publicação real do Instagram: o player oficial (embed) já aparece no card, com o botão
 * de play do próprio Instagram, e só é carregado quando o visitante rola até perto dele (`lazy`).
 * Abaixo, a legenda original (idioma em que foi escrita, sem tradução) e o link para o post.
 * Sem embed possível, mostra a capa (ou um card neutro) com o link original.
 */
export function PostCard({
  url,
  embedSrc,
  cover,
  title,
  excerpt,
  captionLang,
  labels,
}: {
  url: string;
  embedSrc: string | null;
  cover: PhotoConfig | null;
  /** primeiro parágrafo da legenda original */
  title: string;
  /** demais parágrafos da legenda original */
  excerpt: string;
  /** idioma da legenda (marcado com `lang` quando diferente do da página) */
  captionLang?: string;
  labels: PostLabels;
}) {
  return (
    <article className="flex h-full flex-col">
      {embedSrc ? (
        <iframe
          src={embedSrc}
          title={labels.player}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-[41rem] w-full rounded-[1.5rem] border border-border bg-vanilla"
        />
      ) : (
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-cream">
          {cover ? (
            <Photo photo={cover} sizes="(min-width: 1024px) 30vw, 90vw" />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,var(--cream),var(--sand))] text-cocoa"
            >
              <InstagramIcon width={44} height={44} />
            </div>
          )}
        </div>
      )}
      {labels.date && (
        <p className="mt-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
          <time dateTime={labels.dateIso}>{labels.date}</time>
        </p>
      )}
      <h3
        lang={captionLang}
        className="mt-2 font-display text-[1.4rem] leading-snug text-cocoa-deep"
      >
        {title}
      </h3>
      {excerpt && (
        <p lang={captionLang} className="mt-2 line-clamp-3 text-[0.95rem] text-cocoa">
          {excerpt}
        </p>
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-u mt-3 inline-flex w-fit items-center gap-1.5 text-[0.92rem] font-semibold text-cocoa-deep"
      >
        {labels.openIg} <ExternalLink size={14} aria-hidden="true" />
      </a>
    </article>
  );
}
