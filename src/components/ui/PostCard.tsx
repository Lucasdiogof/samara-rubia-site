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
  paragraphs,
  captionLang,
  labels,
}: {
  url: string;
  embedSrc: string | null;
  cover: PhotoConfig | null;
  /** primeiro parágrafo da legenda original */
  title: string;
  /** demais parágrafos da legenda original (completos, sem cortar) */
  paragraphs: string[];
  /** idioma da legenda (marcado com `lang` quando diferente do da página) */
  captionLang?: string;
  labels: PostLabels;
}) {
  return (
    <article className="mx-auto flex h-full w-full max-w-[24.5rem] flex-col">
      {embedSrc ? (
        // Moldura creme: o embed do Instagram é uma caixa branca fixa e, assim, ganha a cara do site.
        <div className="relative rounded-[1.75rem] border border-border bg-cream p-3 shadow-[var(--shadow-soft)]">
          <div
            aria-hidden="true"
            className="absolute inset-3 grid place-items-center rounded-[1.25rem] bg-[linear-gradient(150deg,var(--cream),var(--sand))] text-cocoa"
          >
            <InstagramIcon width={40} height={40} />
          </div>
          <iframe
            src={embedSrc}
            title={labels.player}
            loading="lazy"
            scrolling="no"
            allow="encrypted-media; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="relative block h-[42rem] w-full rounded-[1.25rem] border-0 bg-transparent"
          />
        </div>
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
      <div className="flex flex-1 flex-col px-1">
        {labels.date && (
          <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
            <time dateTime={labels.dateIso}>{labels.date}</time>
          </p>
        )}
        <h3
          lang={captionLang}
          className="mt-2 font-display text-[1.4rem] leading-snug text-cocoa-deep"
        >
          {title}
        </h3>
        {paragraphs.length > 0 && (
          <div lang={captionLang} className="mt-2 space-y-3 text-[0.95rem] text-cocoa">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        )}
        {!embedSrc && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-u mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[0.92rem] font-semibold text-cocoa-deep"
          >
            {labels.openIg} <ExternalLink size={14} aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
