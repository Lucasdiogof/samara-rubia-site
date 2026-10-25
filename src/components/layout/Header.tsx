"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { nav } from "./nav";
import { bookingHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha ao navegar (ajuste de estado durante o render, sem efeito).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500",
        scrolled || open
          ? "bg-vanilla/90 py-3 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap py-2 text-[0.95rem] font-medium text-cocoa-deep after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-cocoa-deep after:transition-transform after:duration-300",
                    isActive(n.href)
                      ? "after:scale-x-100"
                      : "after:scale-x-0 hover:after:scale-x-100",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <AnimatedButton
            href={bookingHref}
            track="header"
            className="hidden !min-h-11 !px-5 sm:inline-flex"
            arrow={false}
          >
            Agendar avaliação
          </AnimatedButton>
          <button
            ref={toggle}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-cocoa-deep xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto bg-vanilla xl:hidden"
          >
            <nav
              aria-label="Menu mobile"
              className="wrap flex min-h-full flex-col justify-between pb-10 pt-8"
            >
              <ul>
                {nav.map((n, i) => (
                  <motion.li
                    key={n.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
                    className="border-b border-border"
                  >
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={n.href}
                      aria-current={isActive(n.href) ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-tight",
                        isActive(n.href) ? "italic text-cocoa" : "text-cocoa-deep",
                      )}
                    >
                      {n.label}
                      <span className="text-sm font-sans text-cocoa" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <AnimatedButton href={bookingHref} track="menu" className="mt-10 w-full">
                Agendar avaliação
              </AnimatedButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
