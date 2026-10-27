"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Carrossel horizontal por rolagem com encaixe (arraste no celular, setas no desktop). Sem dependências. */
export function Carousel({
  children,
  label,
  prev,
  next,
}: {
  children: ReactNode;
  label: string;
  prev: string;
  next: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [can, setCan] = useState({ left: false, right: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setCan({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn =
    "absolute top-[21rem] z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-vanilla text-cocoa-deep shadow-[var(--shadow-soft)] transition-opacity hover:bg-cream disabled:pointer-events-none disabled:opacity-0 md:grid";

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 sm:scroll-px-0 gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-0 sm:gap-8 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (c) => (
          <li className="w-[min(24.5rem,84vw)] shrink-0 snap-start sm:w-[27rem]">{c}</li>
        ))}
      </ul>
      <button type="button" aria-label={prev} disabled={!can.left} onClick={() => go(-1)} className={`${btn} -left-5`}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button type="button" aria-label={next} disabled={!can.right} onClick={() => go(1)} className={`${btn} -right-5`}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
