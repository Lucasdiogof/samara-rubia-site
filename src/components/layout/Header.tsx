"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Menu, X } from "lucide-react";
import { AnimatedButton } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { Controls, type ControlLabels } from "./Controls";
import { splitPath, type Lang } from "@/i18n/config";
import { cn } from "@/lib/utils";

export type HeaderText = {
  specialty: string;
  navMain: string;
  navMobile: string;
  menuOpen: string;
  menuClose: string;
  links: { path: string; href: string; label: string }[];
  controls: ControlLabels;
  cta: { href: string; label: string } | null;
};

export function Header({ lang, t }: { lang: Lang; t: HeaderText }) {
  const pathname = splitPath(usePathname()).path;
  const primaryCta = t.cta;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

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
    // Mantém o foco dentro do cabeçalho/menu enquanto o menu está aberto.
    const behind = ["pular", "conteudo", "rodape"].map((id) => document.getElementById(id));
    behind.forEach((el) => el?.setAttribute("inert", ""));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" && headerRef.current) {
        const items = [
          ...headerRef.current.querySelectorAll<HTMLElement>("a[href], button"),
        ].filter((el) => el.offsetParent !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500",
        scrolled || open
          ? "bg-vanilla/90 py-3 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Logo lang={lang} specialty={t.specialty} />
        <nav aria-label={t.navMain} className="hidden xl:block">
          <ul className="flex items-center gap-9">
            {t.links.map((n) => (
              <li key={n.path}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.path) ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap py-2 text-[0.95rem] font-medium text-cocoa-deep after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-cocoa-deep after:transition-transform after:duration-300",
                    isActive(n.path)
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
          <Controls labels={t.controls} className="hidden xl:flex" />
          {primaryCta && (
            <AnimatedButton
              href={primaryCta.href}
              track="header"
              className="hidden !min-h-11 !px-5 sm:inline-flex"
              arrow={false}
            >
              {primaryCta.label}
            </AnimatedButton>
          )}
          <button
            ref={toggle}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border text-cocoa-deep xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto bg-vanilla xl:hidden"
          >
            <nav
              aria-label={t.navMobile}
              className="wrap flex min-h-full flex-col justify-between pb-10 pt-8"
            >
              <ul>
                {t.links.map((n, i) => (
                  <m.li
                    key={n.path}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.45 }}
                    className="border-b border-border"
                  >
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={n.href}
                      aria-current={isActive(n.path) ? "page" : undefined}
                      className={cn(
                        "flex items-baseline justify-between py-4 font-display text-[2.1rem] leading-tight",
                        isActive(n.path) ? "italic text-cocoa" : "text-cocoa-deep",
                      )}
                    >
                      {n.label}
                      <span className="text-sm font-sans text-cocoa" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="mt-10 space-y-6">
                <Controls labels={t.controls} className="justify-center" />
                {primaryCta && (
                  <AnimatedButton href={primaryCta.href} track="menu" className="w-full">
                    {primaryCta.label}
                  </AnimatedButton>
                )}
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
