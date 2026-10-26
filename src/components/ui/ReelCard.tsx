"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { PhotoConfig } from "@/config/site";

export type ReelLabels = {
  watch: string;
  openIg: string;
  note: string;
  player: string;
  demo: string;
};

/**
 * Card vertical 9:16 de um Reel. O player do Instagram só é carregado depois do clique
 * (sem autoplay, sem requisição ao Instagram antes disso); o link original fica sempre visível.
 */
export function ReelCard({
  title,
  url,
  embedSrc,
  cover,
  demo,
  labels,
}: {
  title: string;
  url: string;
  /** null = não dá para incorporar (o card só leva ao Instagram) */
  embedSrc: string | null;
  cover: PhotoConfig | null;
  demo: boolean;
  labels: ReelLabels;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <article className="flex h-full flex-col" data-demo={demo || undefined}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-cream">
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
              <>
                <Photo photo={cover} sizes="(min-width: 768px) 28vw, 70vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </>
            ) : (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(160deg,var(--cream),var(--sand))]"
              />
            )}
            {embedSrc && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="absolute inset-x-4 bottom-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-vanilla px-5 text-[0.95rem] font-semibold text-cocoa-deep shadow-[var(--shadow-soft)]"
              >
                <Play size={16} aria-hidden="true" fill="currentColor" /> {labels.watch}
              </button>
            )}
            {demo && (
              <span className="absolute left-3 top-3 rounded-full bg-cocoa-deep px-3 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-vanilla">
                {labels.demo}
              </span>
            )}
          </>
        )}
      </div>
      <h3 className="mt-4 font-display text-[1.35rem] leading-snug text-cocoa-deep">{title}</h3>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link-u mt-2 inline-flex w-fit items-center gap-1.5 text-[0.92rem] font-semibold text-cocoa-deep"
      >
        {labels.openIg} <ExternalLink size={14} aria-hidden="true" />
      </a>
      {playing && <p className="mt-2 text-[0.8rem] text-cocoa">{labels.note}</p>}
    </article>
  );
}
