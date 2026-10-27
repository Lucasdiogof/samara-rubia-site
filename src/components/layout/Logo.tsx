import Link from "next/link";
import { fullName } from "@/config/site";
import { href, type Lang } from "@/i18n/config";

/** Uma imagem por tema: `.logo-light` (cores originais) e `.logo-dark` (marrom vira creme), ver globals.css. */
function Themed({
  name,
  width,
  height,
  className = "",
  priority = false,
}: {
  name: "mark" | "lockup";
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const common = {
    width,
    height,
    "aria-hidden": true as const,
    decoding: "async" as const,
    loading: priority ? ("eager" as const) : ("lazy" as const),
  };
  /* eslint-disable @next/next/no-img-element -- export estático: a logo já vem em WebP no tamanho certo */
  return (
    <>
      <img alt="" src={`/brand/${name}-light.webp`} className={`logo-light ${className}`} {...common} />
      <img alt="" src={`/brand/${name}-dark.webp`} className={`logo-dark ${className}`} {...common} />
    </>
  );
  /* eslint-enable @next/next/no-img-element */
}

/**
 * Logo da Samara. `header`: monograma SR + nome em texto (cabeçalho compacto).
 * `lockup`: logo completa (monograma, nome e "Fisioterapeuta pélvica"), usada no rodapé.
 */
export function Logo({
  lang,
  specialty,
  variant = "header",
}: {
  lang: Lang;
  specialty: string;
  variant?: "header" | "lockup";
}) {
  if (variant === "lockup")
    return (
      <Link href={href(lang, "/")} aria-label={`${fullName} — ${specialty}`} className="inline-block">
        <Themed name="lockup" width={236} height={180} className="h-auto w-[14.75rem]" />
      </Link>
    );
  return (
    <Link href={href(lang, "/")} className="group inline-flex items-center gap-3 text-cocoa-deep">
      <Themed name="mark" width={46} height={46} className="h-[2.9rem] w-[2.9rem] shrink-0" priority />
      <span className="leading-none">
        <span className="block font-display text-[1.45rem] font-medium tracking-tight">
          {fullName}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[0.62rem] font-semibold uppercase tracking-[0.22em] opacity-70">
          {specialty}
        </span>
      </span>
    </Link>
  );
}
