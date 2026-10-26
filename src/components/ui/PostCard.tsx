"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import type { PhotoConfig } from "@/config/site";

export type PostLabels = {
  /** tipo (Vídeo, Carrossel, Imagem) já traduzido; vazio se desconhecido */
  kind: string;
  /** data por extenso já formatada; vazio se desconhecida */
  date: string;
  dateIso?: string;
  watch: string;
  openIg: string;
  note: string;
  player: string;
};

/**
 * Card de uma publicação real do Instagram: capa hospedada no site, legenda original (idioma em que
 * foi escrita, sem tradução), tipo e data. O embed do Instagram só é carregado depois do clique;
 * o link para a publicação original fica sempre visível.
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
  const [playing, setPlaying] = useState(false);
  return (
    <article className="flex h-full flex-col">
      {playing && embedSrc ? (
        <iframe
          src={embedSrc}
          title={labels.player}
          loading="lazy"
          allow="encrypted-media; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-[38rem] w-full rounded-[1.5rem] border border-border bg-vanilla"
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
          {cover && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          )}
          {labels.kind && (
            <span className="absolute left-3 top-3 rounded-full bg-vanilla px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-cocoa-deep">
              {labels.kind}
            </span>
          )}
          {embedSrc && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-x-4 bottom-4 inline-flex min-h-12 items-center justify-center rounded-full bg-vanilla px-5 text-[0.95rem] font-semibold text-cocoa-deep shadow-[var(--shadow-soft)]"
            >
              {labels.watch}
            </button>
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
      {playing && <p className="mt-2 text-[0.8rem] text-cocoa">{labels.note}</p>}
    </article>
  );
}
