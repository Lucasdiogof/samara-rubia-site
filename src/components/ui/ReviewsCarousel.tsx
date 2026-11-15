"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Carrossel horizontal com rolagem nativa (snap). Setas, arrastar com o mouse e indicadores por página. */
export function ReviewsCarousel({
  children,
  label,
  prev,
  next,
  goTo,
}: {
  children: ReactNode[];
  label: string;
  prev: string;
  next: string;
  goTo: string[];
}) {
  const track = useRef<HTMLUListElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const step = () => {
    const el = track.current;
    const li = el?.firstElementChild as HTMLElement | undefined;
    return li ? li.offsetWidth + 24 : 1; // largura do card + gap (1.5rem)
  };

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const st = step();
    const max = el.scrollWidth - el.clientWidth;
    setPages(max <= 4 ? 1 : Math.ceil((max - 4) / st) + 1);
    setPage(max <= 4 ? 0 : el.scrollLeft >= max - 4 ? Math.ceil((max - 4) / st) : Math.round(el.scrollLeft / st));
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, children.length]);

  const scrollToPage = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: Math.min(i * step(), el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current!;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) < 6) return;
    d.moved = true;
    const el = track.current!;
    el.style.scrollSnapType = "none";
    el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (drag.current && el) {
      el.style.scrollSnapType = "";
      if (drag.current.moved) {
        const w = step();
        el.scrollTo({ left: Math.round(el.scrollLeft / w) * w, behavior: "smooth" });
      }
    }
    drag.current = null;
  };

  const multi = pages > 1;
  return (
    <div role="region" aria-label={label}>
      <ul
        ref={track}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        tabIndex={0}
        className="reviews-track -mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[var(--space-gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:cursor-grab lg:w-[calc(100%+7rem)] lg:pr-[7rem] lg:[mask-image:linear-gradient(to_right,#000_calc(100%-7rem),transparent)]"
      >
        {children.map((c, i) => (
          <li
            key={i}
            className="flex min-w-0 shrink-0 basis-[84%] snap-start sm:basis-[calc((100%-1.5rem)/1.6)] lg:basis-[calc((100%-3rem)/3)]"
          >
            {c}
          </li>
        ))}
      </ul>
      {multi && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="group">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                aria-label={goTo[i] ?? String(i + 1)}
                aria-current={i === page}
                onClick={() => scrollToPage(i)}
                className="grid h-6 w-5 place-items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-cocoa-deep" : "w-1.5 bg-cocoa/35"}`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {([[prev, ChevronLeft, -1], [next, ChevronRight, 1]] as const).map(([l, Icon, dir]) => (
              <button
                key={dir}
                type="button"
                aria-label={l}
                disabled={(dir < 0 && page === 0) || (dir > 0 && page === pages - 1)}
                onClick={() => scrollToPage(page + dir)}
                className="grid h-11 w-11 place-items-center rounded-full border border-border text-cocoa-deep transition-colors hover:bg-vanilla disabled:opacity-35"
              >
                <Icon size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
