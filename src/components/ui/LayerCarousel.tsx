"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Slide = { key: string; label: string; /** rótulo do botão que traz este card ao centro */ goTo: string; node: ReactNode };

/** Valores por distância ao card ativo (0 = centro). Além do último nível, o card some. */
const SCALE = [1, 0.88, 0.76, 0.65] as const;
const BLUR = [0, 1, 2.5, 4] as const;
const OPACITY = [1, 0.94, 0.78, 0.5] as const;
const X = { wide: [0, 70, 122, 160], narrow: [0, 80, 118, 140] } as const; // % da largura do próprio card
type Level = 0 | 1 | 2 | 3;
const SPRING = { type: "spring", stiffness: 170, damping: 19, mass: 1 } as const;
const FADE = { duration: 0.45, ease: [0.22, 1, 0.36, 1] } as const;

/** Posição circular mais curta do card `i` em relação ao ativo: -n/2 … n/2. */
const offsetOf = (i: number, active: number, n: number) => {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
};

function Layer({
  slide,
  index,
  total,
  d,
  wrapped,
  narrow,
  reduce,
  onSelect,
}: {
  slide: Slide;
  index: number;
  total: number;
  d: number;
  wrapped: boolean;
  narrow: boolean;
  reduce: boolean;
  onSelect: (i: number) => void;
}) {
  const level = Math.min(Math.round(Math.abs(d)), 3) as Level;
  const sign = Math.sign(d);
  const hidden = Math.abs(d) > 3;
  const active = d === 0;
  const x = (narrow ? X.narrow : X.wide)[level] * sign;
  const opacity = hidden ? 0 : OPACITY[level];
  const target = {
    x: `${x}%`,
    scale: SCALE[level],
    rotateY: -sign * level * 7,
    opacity,
    filter: `blur(${BLUR[level]}px)`,
    boxShadow: active
      ? "0 44px 80px -34px rgba(55,44,39,0.5)"
      : `0 ${24 - level * 4}px ${44 - level * 8}px -30px rgba(55,44,39,0.28)`,
  };
  const transition = reduce
    ? { duration: 0 }
    : wrapped
      ? { duration: 0, opacity: { ...FADE, delay: 0.12 } }
      : { default: SPRING, opacity: FADE, filter: FADE, boxShadow: FADE };

  return (
    <m.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} / ${total}: ${slide.label}`}
      aria-current={active || undefined}
      initial={false}
      animate={wrapped && !reduce ? { ...target, opacity: [0, opacity] } : target}
      transition={transition}
      style={{ zIndex: 10 - level, willChange: "transform, opacity, filter" }}
      className="relative w-[min(28.5rem,78vw)] self-start rounded-[1.9rem] border border-border bg-[var(--background)] p-3 [grid-area:1/1] [transform-style:preserve-3d]"
    >
      {/* `inert` tira os cards de fundo do foco e dos leitores de tela; o botão abaixo os traz ao centro */}
      <div inert={!active}>{slide.node}</div>
      {!active && !hidden && (
        <button
          type="button"
          aria-label={slide.goTo}
          onClick={() => onSelect(index)}
          className="absolute -inset-px cursor-pointer rounded-[1.9rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cocoa)]"
        />
      )}
    </m.div>
  );
}

/**
 * Carrossel em camadas: o card ativo vem à frente e os demais recuam em escala, desfoque, opacidade e
 * profundidade (3D). Circular; setas, pontos, arraste (mouse/toque), teclado, roda horizontal, clique no
 * card lateral e autoplay (pausa com mouse/foco/interação). O conteúdo vem pronto em `slides`.
 */
export function LayerCarousel({
  slides,
  label,
  prev,
  next,
  autoplay = 0,
}: {
  slides: Slide[];
  label: string;
  prev: string;
  next: string;
  /** intervalo em ms; 0 desliga */
  autoplay?: number;
}) {
  const n = slides.length;
  const reduce = !!useReducedMotion();
  // `prev` guarda a posição anterior para detectar o card que dá a volta no círculo
  const [pos, setPos] = useState({ cur: 0, prev: 0 });
  const active = pos.cur;
  const setActive = useCallback((f: (a: number) => number) => setPos((p) => ({ cur: f(p.cur), prev: p.cur })), []);
  const [narrow, setNarrow] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const paused = hover || focus;
  const root = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0); // reinicia o contador após interação manual
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const wheelLock = useRef(0);

  const go = useCallback(
    (delta: number) => {
      setActive((a) => (((a + delta) % n) + n) % n);
      setTick((t) => t + 1);
    },
    [n, setActive],
  );
  const select = useCallback(
    (i: number) => {
      setActive(() => i);
      setTick((t) => t + 1);
    },
    [setActive],
  );

  // depois da transição, "esquece" a posição anterior (o aparecimento do card que deu a volta não repete)
  useEffect(() => {
    if (pos.prev === pos.cur) return;
    const id = window.setTimeout(() => setPos((p) => ({ cur: p.cur, prev: p.cur })), 800);
    return () => window.clearTimeout(id);
  }, [pos]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Autoplay: pausado com mouse, foco, interação, aba em segundo plano ou movimento reduzido.
  useEffect(() => {
    if (!autoplay || reduce || paused || n < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % n);
    }, autoplay);
    return () => window.clearInterval(id);
  }, [autoplay, reduce, paused, n, tick, setActive]);

  // Roda: só o movimento horizontal (trackpad / shift+roda), para não sequestrar a rolagem da página.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 12 || Math.abs(e.deltaX) < Math.abs(e.deltaY) * 1.2) return;
      e.preventDefault();
      const now = performance.now();
      if (now - wheelLock.current < 650) return;
      wheelLock.current = now;
      go(e.deltaX > 0 ? 1 : -1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go]);

  // Hover para o autoplay. O mouse sobre o iframe do Instagram não gera eventos na página, então o estado
  // vem da posição do mouse: dentro do retângulo do carrossel = "em cima", mesmo quando ele entra no iframe.
  useEffect(() => {
    if (!autoplay) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = root.current?.getBoundingClientRect();
      setHover(!!r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [autoplay]);

  // Dentro do iframe do Instagram o foco sai da página: conta como "em uso" e não avança sozinho.
  useEffect(() => {
    const onBlur = () => {
      if (stage.current?.contains(document.activeElement)) setFocus(true);
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const s = { x: e.clientX, moved: false };
    drag.current = s;
    const move = (ev: PointerEvent) => {
      if (Math.abs(ev.clientX - s.x) > 8) s.moved = true;
    };
    // o mouse pode soltar fora do carrossel: escuta na janela até o fim do gesto
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      const dx = ev.clientX - s.x;
      if (ev.type === "pointerup" && Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      // mantém `moved` até o clique sintético passar, para um arraste não virar clique no card lateral
      window.setTimeout(() => {
        if (drag.current === s) drag.current = null;
      }, 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  };
  const swallowDragClick = (e: React.MouseEvent) => {
    if (drag.current?.moved) e.stopPropagation();
  };

  const btn =
    "grid h-14 w-14 place-items-center rounded-full bg-[var(--cocoa)] text-[var(--vanilla)] shadow-[var(--shadow-soft)] transition-[background-color,transform] hover:bg-[var(--cocoa-deep)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--cocoa)]";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      ref={root}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
      }}
      onFocus={() => setFocus(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setFocus(false)}
      className="rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cocoa)]"
    >
      <div
        ref={stage}
        onPointerDown={onPointerDown}
        onClickCapture={swallowDragClick}
        className="-mx-5 grid touch-pan-y select-none justify-items-center overflow-x-clip pb-10 pt-2 [perspective:1400px] sm:mx-0"
      >
        {slides.map((s, i) => (
          <Layer
            key={s.key}
            slide={s}
            index={i}
            total={n}
            d={offsetOf(i, active, n)}
            wrapped={Math.abs(offsetOf(i, active, n) - offsetOf(i, pos.prev, n)) > 1.5}
            narrow={narrow}
            reduce={reduce}
            onSelect={select}
          />
        ))}
      </div>
      {n > 1 && (
        <div className="flex items-center justify-center gap-5">
          <button type="button" aria-label={prev} onClick={() => go(-1)} className={btn}>
            <ChevronLeft size={26} strokeWidth={2.25} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-1" role="group">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                aria-label={s.goTo}
                aria-current={i === active || undefined}
                onClick={() => select(i)}
                className="grid h-6 w-6 place-items-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-cocoa-deep" : "w-2.5 bg-taupe"}`}
                />
              </button>
            ))}
          </div>
          <button type="button" aria-label={next} onClick={() => go(1)} className={btn}>
            <ChevronRight size={26} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
