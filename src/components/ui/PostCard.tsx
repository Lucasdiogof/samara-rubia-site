"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import type { PhotoConfig } from "@/config/site";

export type PostLabels = {
  /** data por extenso já formatada; vazio se desconhecida */
  date: string;
  dateIso?: string;
  openIg: string;
  load: string;
  note: string;
  player: string;
};

/**
 * Card de uma publicação real do Instagram: o embed só é montado após clique explícito,
 * evitando requisições e cookies de terceiros antes da interação.
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
  const [playing, setPlaying] = useState(false);
  return (
    <article className="mx-auto flex h-full w-full max-w-[24.5rem] flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-border bg-cream shadow-[var(--shadow-soft)]">
        {playing && embedSrc ? (
          <iframe
            src={embedSrc}
            title={labels.player}
            loading="lazy"
            allow="encrypted-media; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0 bg-vanilla"
          />
        ) : (
          <>
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
            {embedSrc && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-x-4 bottom-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-vanilla px-5 py-3 text-[0.92rem] font-semibold text-cocoa-deep shadow-[var(--shadow-soft)]"
              >
                <Play size={16} aria-hidden="true" />
                {labels.load}
              </button>
            )}
          </>
        )}
      </div>
      {embedSrc && !playing && <p className="mt-3 text-[0.82rem] text-cocoa">{labels.note}</p>}
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
        {(
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
