import Link from "next/link";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Baby,
  CircleDot,
  Droplets,
  Flower2,
  Heart,
  Hourglass,
  ShieldPlus,
  Timer,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "disfuncoes-sexuais-femininas": Heart,
  "dor-pelvica": Activity,
  endometriose: Flower2,
  "incontinencia-urinaria": Droplets,
  "bexiga-hiperativa": Timer,
  "retencao-urinaria": Hourglass,
  "prolapso-de-orgaos-pelvicos": ArrowDownToLine,
  constipacao: CircleDot,
  "prostatectomia-radical": ShieldPlus,
  "gestacao-e-pos-parto": Baby,
};

/** Card de tratamento: só o nome (home) ou nome + frase curta (página de tratamentos). */
export function ServiceCard({
  slug,
  title,
  short,
  href,
}: {
  slug: string;
  title: string;
  short?: string;
  href: string;
}) {
  const Icon = icons[slug] ?? Heart;
  return (
    <Link
      href={href}
      className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-vanilla/70 px-4 py-3.5 transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[var(--warm)] hover:bg-vanilla hover:shadow-soft focus-visible:-translate-y-0.5 focus-visible:border-[var(--warm)]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-[var(--warm)] transition-colors duration-300 group-hover:bg-[var(--warm)] group-hover:text-vanilla">
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <span className="flex-1 self-center">
        <span className="block font-display text-[1.3rem] leading-tight text-cocoa-deep">{title}</span>
        {short && <span className="mt-1.5 block text-[0.93rem] leading-snug text-cocoa">{short}</span>}
      </span>
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="mt-3 shrink-0 text-cocoa opacity-60 transition-[transform,opacity] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </Link>
  );
}
