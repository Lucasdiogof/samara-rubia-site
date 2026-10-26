"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";
import { Photo } from "@/components/ui/Photo";
import type { PhotoConfig } from "@/config/site";

export type PostLabels = {
  title: string;
  hint: string;
  watch: string;
  openIg: string;
  note: string;
  player: string;
};

/**
 * Card de uma publicação do Instagram (imagem, carrossel ou vídeo; o formato não é assumido).
 * Sem título, legenda ou data inventados: só o rótulo neutro e o link original. O embed do
 * Instagram é carregado apenas depois do clique; o link original fica sempre visível.
 */
export function PostCard({
  url,
  embedSrc,
  cover,
  labels,
}: {
  url: string;
  embedSrc: string | null;
  cover: PhotoConfig | null;
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
      <h3 className="mt-4 font-display text-[1.35rem] leading-snug text-cocoa-deep">
        {labels.title}
      </h3>
      <p className="text-[0.9rem] text-cocoa">{labels.hint}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${labels.openIg} (${labels.title})`}
        className="link-u mt-2 inline-flex w-fit items-center gap-1.5 text-[0.92rem] font-semibold text-cocoa-deep"
      >
        {labels.openIg} <ExternalLink size={14} aria-hidden="true" />
      </a>
      {playing && <p className="mt-2 text-[0.8rem] text-cocoa">{labels.note}</p>}
    </article>
  );
}
