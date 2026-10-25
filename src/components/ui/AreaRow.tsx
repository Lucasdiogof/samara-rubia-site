"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";

/** Linha editorial de área de atuação com hover em Motion. */
export function AreaRow({
  index,
  title,
  short,
  href,
}: {
  index: number;
  title: string;
  short: string;
  href: string;
}) {
  return (
    <m.li
      whileHover={{ x: 8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border"
    >
      <Link
        href={href}
        className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-6 sm:grid-cols-[4rem_1fr_1.1fr_auto] sm:gap-x-8 sm:py-8"
      >
        <span className="font-display text-xl italic text-cocoa" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display text-[1.6rem] leading-tight text-cocoa-deep sm:text-[2.1rem]">
          {title}
        </span>
        <span className="col-start-2 mt-2 text-[0.95rem] text-cocoa sm:col-start-3 sm:mt-0">
          {short}
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="col-start-3 row-start-1 text-cocoa transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:col-start-4"
        />
      </Link>
    </m.li>
  );
}
