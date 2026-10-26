"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { href, langMeta, langs, splitPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

const root = () => document.documentElement;
// O tema é um atributo do <html> (definido por script no <head> e pelo botão): observamos o atributo.
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(root(), { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

export type ControlLabels = { language: string; toDark: string; toLight: string };

/** Seletor de idioma (mesma página nos outros idiomas) e alternador de tema claro/escuro. */
export function Controls({ labels, className }: { labels: ControlLabels; className?: string }) {
  const { lang, path } = splitPath(usePathname());
  const dark = useSyncExternalStore(subscribe, () => root().dataset.theme === "dark", () => false);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    root().dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <nav aria-label={labels.language}>
        <ul className="flex items-center">
          {langs.map((l) => (
            <li key={l}>
              <Link
                href={href(l, path)}
                lang={langMeta[l].htmlLang}
                hrefLang={langMeta[l].htmlLang}
                title={langMeta[l].name}
                aria-current={l === lang ? "true" : undefined}
                className={cn(
                  "grid h-11 min-w-9 place-items-center rounded-full px-2 text-[0.78rem] font-semibold tracking-[0.12em]",
                  l === lang ? "text-cocoa-deep underline underline-offset-4" : "text-cocoa hover:text-cocoa-deep",
                )}
              >
                {langMeta[l].label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        type="button"
        onClick={toggle}
        aria-label={dark ? labels.toLight : labels.toDark}
        className="grid h-11 w-11 place-items-center rounded-full border border-border text-cocoa-deep"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}
