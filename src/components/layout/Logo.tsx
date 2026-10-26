import Link from "next/link";
import { fullName } from "@/config/site";
import { href, type Lang } from "@/i18n/config";

export function Logo({
  lang,
  specialty,
  tone = "dark",
}: {
  lang: Lang;
  specialty: string;
  tone?: "dark" | "light";
}) {
  const c = tone === "dark" ? "text-cocoa-deep" : "text-vanilla";
  return (
    <Link href={href(lang, "/")} className={`group inline-flex items-center gap-3 ${c}`}>
      <svg width="30" height="34" viewBox="0 0 30 34" aria-hidden="true" className="shrink-0">
        <path
          d="M2 33V15a13 13 0 0 1 26 0v18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M8 33V16a7 7 0 0 1 14 0v17"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity=".55"
        />
        <circle cx="15" cy="16" r="2" fill="currentColor" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.45rem] font-medium tracking-tight">
          {fullName}
        </span>
        <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] opacity-70">
          {specialty}
        </span>
      </span>
    </Link>
  );
}
