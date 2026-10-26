"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";

/**
 * Linha editorial de área de atuação. Hover: leve deslocamento (Motion), fundo suave,
 * numeral e descrição ganham contraste e o indicador de seta se preenche.
 * `tint` define o fundo do hover conforme a cor da seção onde a lista está.
 */
export function AreaRow({
  index,
  title,
  short,
  href,
  tint = "onCream",
}: {
  index: number;
  title: string;
  short: string;
  href: string;
  tint?: "onCream" | "onVanilla";
}) {
  const hover =
    tint === "onCream"
      ? "hover:bg-vanilla/70 focus-visible:bg-vanilla/70"
      : "hover:bg-cream/70 focus-visible:bg-cream/70";
  return (
    <m.li
      whileHover={{ x: 4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border"
    >
      <Link
        href={href}
        className={`group -mx-4 grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 rounded-2xl px-4 py-6 transition-colors duration-300 sm:grid-cols-[4rem_1fr_1.1fr_auto] sm:items-center sm:gap-x-8 sm:py-7 ${hover}`}
      >
        <span
          className="pt-1.5 font-display text-xl italic text-cocoa transition-colors duration-300 group-hover:text-cocoa-deep sm:pt-0"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display text-[1.6rem] leading-tight text-cocoa-deep sm:text-[2.1rem]">
          {title}
        </span>
        <span className="col-start-2 mt-2 text-[0.95rem] text-cocoa transition-colors duration-300 group-hover:text-cocoa-deep sm:col-start-3 sm:mt-0">
          {short}
        </span>
        <span
          aria-hidden="true"
          className="col-start-3 row-start-1 grid h-10 w-10 place-items-center rounded-full border border-border text-cocoa transition-colors duration-300 group-hover:border-cocoa group-hover:bg-cocoa group-hover:text-vanilla sm:col-start-4 sm:h-11 sm:w-11"
        >
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </m.li>
  );
}
