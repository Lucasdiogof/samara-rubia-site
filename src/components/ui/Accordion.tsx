"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";

type Item = { q: string; a: string };

/** Acordeão acessível. Respostas ficam no HTML (indexáveis); sem JS, <noscript> as expõe. */
export function Accordion({ items }: { items: Item[] }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="row-line">
      <noscript>
        <style>{`.faq-panel{height:auto!important;visibility:visible!important}`}</style>
      </noscript>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={it.q} className="border-b border-border">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-[1.45rem] leading-snug text-cocoa-deep sm:text-[1.7rem]">
                  {it.q}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-cocoa"
                >
                  <Plus size={18} />
                </motion.span>
              </button>
            </h3>
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq-panel overflow-hidden"
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, visibility: isOpen ? "visible" : "hidden" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: 0, visibility: "hidden" }}
            >
              <p className="max-w-2xl pb-7 text-cocoa">{it.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
