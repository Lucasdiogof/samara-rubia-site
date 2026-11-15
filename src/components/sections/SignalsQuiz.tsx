"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AnimatedButton } from "@/components/ui/Button";
import type { Dict } from "@/i18n";

type Signals = Dict["signals"];

/** 0 → 0, 1 → 1, 2–3 → 2, 4–5 → 3, 6–8 → 4 */
const stateIndex = (n: number) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 5 ? 3 : 4);

/**
 * Seleção de situações do dia a dia. Privacidade: as respostas vivem só neste useState;
 * nada vai para storage, cookies, analytics nem para a mensagem do WhatsApp (que é genérica).
 */
export function SignalsQuiz({
  t,
  cta,
}: {
  t: Pick<Signals, "items" | "states" | "of" | "selected" | "counter" | "group" | "disclaimer">;
  cta: { href: string; label: string };
}) {
  const [picked, setPicked] = useState<ReadonlySet<number>>(new Set());
  const n = picked.size;
  const state = t.states[stateIndex(n)]!;
  const total = t.items.length;
  const toggle = (i: number) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (!next.delete(i)) next.add(i);
      return next;
    });

  return (
    <div>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">{t.group}</legend>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((it, i) => (
            <label
              key={it.title}
              className="group relative flex cursor-pointer flex-col gap-3 rounded-[1.5rem] border border-border bg-surface p-5 shadow-soft transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--warm)] has-[:checked]:border-[var(--warm)] has-[:checked]:bg-[color-mix(in_srgb,var(--warm)_11%,var(--surface))] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus-ring)] sm:p-6"
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={picked.has(i)}
                onChange={() => toggle(i)}
              />
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-full border-2 border-[var(--warm)]/55 text-vanilla transition-colors duration-300 group-has-[:checked]:border-[var(--warm)] group-has-[:checked]:bg-[var(--warm)]"
              >
                <Check
                  size={16}
                  strokeWidth={3}
                  className="scale-50 opacity-0 transition-[opacity,transform] duration-300 group-has-[:checked]:scale-100 group-has-[:checked]:opacity-100"
                />
              </span>
              <span className="font-display text-[1.45rem] leading-tight text-cocoa-deep sm:text-[1.6rem]">
                {it.title}
              </span>
              <span className="text-[0.95rem] leading-relaxed text-cocoa">{it.text}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="on-dark grain relative mt-8 overflow-hidden rounded-[2rem] bg-[radial-gradient(40rem_24rem_at_12%_0%,rgba(181,96,63,0.22),transparent_70%),linear-gradient(150deg,#2f241f,#3d2d26_60%,#34281f)] p-7 text-vanilla shadow-[0_40px_70px_-40px_rgba(55,44,39,0.7)] sm:p-10">
        <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto] md:gap-12">
          <p className="font-display leading-none" aria-hidden="true">
            <span key={n} className="q-num text-[clamp(4rem,3rem+4vw,6.5rem)] text-[var(--warm)]">
              {n}
            </span>
            <span className="ml-3 text-[clamp(1.5rem,1.2rem+1vw,2.2rem)] text-sand">
              {t.of} {total}
            </span>
          </p>
          <div aria-live="polite" aria-atomic="true">
            <p className="sr-only">
              {t.counter}: {n} {t.of} {total}
            </p>
            <div key={stateIndex(n)} className="q-fade">
              <p className="font-display text-[clamp(1.7rem,1.3rem+1.4vw,2.4rem)] leading-tight">
                {state.title}
              </p>
              <p className="mt-3 max-w-xl text-cream/80">{state.text}</p>
            </div>
          </div>
          <AnimatedButton href={cta.href} variant="light" track="signals">
            {cta.label}
          </AnimatedButton>
        </div>
      </div>
      <p className="mt-5 text-center text-[0.9rem] text-cocoa">{t.disclaimer}</p>
    </div>
  );
}
