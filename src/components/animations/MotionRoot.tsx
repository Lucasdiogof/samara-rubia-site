"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __animOk?: boolean;
  }
}

/**
 * Orquestra todas as animações GSAP/ScrollTrigger da página atual.
 * GSAP é carregado sob demanda (import dinâmico) e só aqui.
 * Para criar um novo efeito: emita um `data-*` em Reveal.tsx e trate-o abaixo.
 */
/** Rota anterior (módulo, não ref: o layout remonta a cada troca de página). */
let lastPath: string | null = null;

export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    // Troca de rota: volta ao topo ANTES de o GSAP recriar os gatilhos (o refresh do ScrollTrigger
    // restaura a posição antiga, e o link do fim da home caía no rodapé da página nova).
    const toTop = lastPath !== null && lastPath !== pathname && !window.location.hash;
    lastPath = pathname;
    let stopHold: (() => void) | undefined;
    if (toTop) {
      window.scrollTo({ top: 0, behavior: "instant" });
      // Por ~1,5 s mantém o topo: outros refresh (ScrollTrigger, mudança de altura) tentam devolver o
      // scroll antigo. Qualquer ação do visitante (roda, toque, tecla) encerra a trava na hora.
      const events = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
      const hold = () => window.scrollY > 0 && window.scrollTo({ top: 0, behavior: "instant" });
      const stop = () => {
        window.removeEventListener("scroll", hold);
        events.forEach((e) => window.removeEventListener(e, stop));
        clearTimeout(timer);
      };
      const timer = setTimeout(stop, 1500);
      window.addEventListener("scroll", hold, { passive: true });
      events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
      stopHold = stop;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let dead = false;
    let revert: (() => void) | undefined;

    // Adia o GSAP para o navegador ficar ocioso: não disputa com o LCP.
    const idle = (cb: () => void) =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(cb, { timeout: 1500 })
        : setTimeout(cb, 300);

    idle(async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (dead) return;
        gsap.registerPlugin(ScrollTrigger);
        // O ScrollTrigger grava a última posição de scroll e a restaura a cada refresh: limpa a memória
        // da página anterior, senão ele devolve o scroll antigo (preso no fim da página nova).
        if (toTop) {
          ScrollTrigger.clearScrollMemory();
          window.scrollTo({ top: 0, behavior: "instant" });
        }

        const ctx = gsap.context(() => {
          const all = <T extends Element>(sel: string) => gsap.utils.toArray<T>(sel);
          const delay = (el: HTMLElement) => Number(el.dataset.delay ?? 0);
          const once = (el: Element, start = "top 90%") => ({ trigger: el, start, once: true });

          all<HTMLElement>('[data-reveal="fade"]').forEach((el) =>
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              delay: delay(el),
              scrollTrigger: once(el),
            }),
          );

          all<HTMLElement>('[data-reveal="lines"]').forEach((el) =>
            gsap.to(el.querySelectorAll(".rwi"), {
              y: 0,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.06,
              delay: delay(el),
              scrollTrigger: once(el, "top 92%"),
            }),
          );

          all<HTMLElement>('[data-reveal="stagger"]').forEach((el) =>
            gsap.to(el.querySelectorAll(":scope > [data-item]"), {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.12,
              scrollTrigger: once(el, "top 85%"),
            }),
          );

          all<HTMLElement>('[data-reveal="image"]').forEach((el) => {
            const tl = gsap.timeline({ scrollTrigger: once(el, "top 88%") });
            tl.to(el, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" });
            if (el.firstElementChild)
              tl.to(el.firstElementChild, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
          });

          all<HTMLElement>("[data-scrub]").forEach((el) =>
            gsap.to(el.querySelectorAll(".sw"), {
              opacity: 1,
              ease: "none",
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 55%", scrub: true },
            }),
          );

          // Storytelling da jornada: linha de progresso + etapas que acendem.
          all<HTMLElement>("[data-story]").forEach((story) => {
            const line = story.querySelector("[data-progress]");
            if (line)
              gsap.fromTo(
                line,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  ease: "none",
                  transformOrigin: "top",
                  scrollTrigger: {
                    trigger: story,
                    start: "top 60%",
                    end: "bottom 60%",
                    scrub: true,
                  },
                },
              );
            story.querySelectorAll<HTMLElement>("[data-step]").forEach((step) =>
              ScrollTrigger.create({
                trigger: step,
                start: "top 68%",
                onEnter: () => step.classList.add("is-active"),
                onLeaveBack: () => step.classList.remove("is-active"),
              }),
            );
          });

          // Parallax só em telas largas (poupa o celular).
          const mm = gsap.matchMedia();
          mm.add("(min-width: 768px)", () => {
            all<HTMLElement>("[data-parallax]").forEach((el) => {
              const amp = Number(el.dataset.parallax ?? 6);
              gsap.fromTo(
                el,
                { yPercent: -amp },
                {
                  yPercent: amp,
                  ease: "none",
                  scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                  },
                },
              );
            });
          });
        }, document.body);

        revert = () => ctx.revert();
        window.__animOk = true;
        document.fonts?.ready.then(() => !dead && ScrollTrigger.refresh());
      } catch {
        document.documentElement.classList.add("anim-fail");
      }
    });

    return () => {
      dead = true;
      stopHold?.();
      revert?.();
    };
  }, [pathname]);

  return null;
}
