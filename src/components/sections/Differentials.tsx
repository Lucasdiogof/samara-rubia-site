import { Ear, HeartHandshake, ListChecks, Lock, Sprout } from "lucide-react";
import { RevealText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { getDict, type Lang } from "@/i18n";

const icons = [HeartHandshake, Ear, Lock, ListChecks, Sprout];

/** Bento: dois cartões largos (o primeiro escuro, de destaque) e três menores; brilho que segue o cursor. */
export function Differentials({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <section className="section lap bg-cream" aria-labelledby="dif-title">
      <div className="wrap">
        <p className="eyebrow">{t.differentialsSection.eyebrow}</p>
        <RevealText as="h2" id="dif-title" className="t-h2 mt-5 max-w-3xl">
          {t.differentialsSection.title}
        </RevealText>
        <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 sm:mt-12 lg:grid-cols-6">
          {t.differentials.map((d, i) => {
            const Icon = icons[i] ?? Sprout;
            const featured = i === 0;
            return (
              <StaggerItem key={d.title} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <SpotlightCard
                  className={`flex h-full min-h-[11rem] flex-col justify-between gap-8 rounded-[1.75rem] border p-6 sm:p-8 ${
                    featured
                      ? "on-dark grain border-transparent bg-[linear-gradient(150deg,#2f241f,#3d2d26_65%,#34281f)] text-vanilla"
                      : "border-border bg-vanilla"
                  }`}
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={0.8}
                    className={`spot-mark pointer-events-none absolute -bottom-6 -right-4 h-36 w-36 ${
                      featured ? "text-vanilla opacity-[0.07]" : "text-cocoa opacity-[0.07]"
                    }`}
                  />
                  <span
                    className={`spot-icon grid h-12 w-12 place-items-center rounded-full ${
                      featured ? "bg-[var(--warm)] text-cocoa-deep" : "bg-cream text-[var(--warm)]"
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <div className="relative">
                    <h3
                      className={`font-display leading-tight ${
                        featured ? "text-[2rem] text-vanilla sm:text-[2.2rem]" : "text-[1.6rem] text-cocoa-deep"
                      }`}
                    >
                      {d.title}
                    </h3>
                    <p className={`mt-2 max-w-sm ${featured ? "text-cream/80" : "text-cocoa"}`}>{d.text}</p>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
