"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { trackCta } from "@/lib/contact";
import { cn } from "@/lib/utils";

const MotionLink = m.create(Link);

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
  /** nome do evento para mensuração futura (evento "site:cta") */
  track?: string;
  className?: string;
  arrow?: boolean;
};

/** Botão/link com microinteração (Motion). Links externos abrem em nova aba. */
export function AnimatedButton({
  href,
  children,
  variant = "primary",
  track,
  className,
  arrow = true,
}: Props) {
  const external = /^https?:/.test(href);
  const cls = cn("btn group", `btn-${variant}`, className);
  const inner = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
  };
  const onClick = track ? () => trackCta(track) : undefined;

  return external ? (
    <m.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      onClick={onClick}
      {...motionProps}
    >
      {inner}
    </m.a>
  ) : (
    <MotionLink href={href} className={cls} onClick={onClick} {...motionProps}>
      {inner}
    </MotionLink>
  );
}
