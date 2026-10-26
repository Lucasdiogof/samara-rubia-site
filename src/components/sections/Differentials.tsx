import { Ear, HeartHandshake, ListChecks, Lock, Sprout } from "lucide-react";
import { RevealText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { differentials } from "@/content/journey";

const icons = [HeartHandshake, Ear, Lock, ListChecks, Sprout];

/** Cinco diferenciais em grade de 6 colunas: 2 + 3, cada um sob um fio fino. */
export function Differentials() {
  return (
    <section className="section lap bg-cream" aria-labelledby="dif-title">
      <div className="wrap">
        <p className="eyebrow">Diferenciais</p>
        <RevealText as="h2" id="dif-title" className="t-h2 mt-5 max-w-3xl">
          O que você pode esperar do *atendimento.*
        </RevealText>
        <StaggerContainer className="mt-12 grid gap-x-10 gap-y-9 sm:mt-16 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-6">
          {differentials.map((d, i) => {
            const Icon = icons[i] ?? Sprout;
            return (
              <StaggerItem
                key={d.title}
                className={`flex gap-5 border-t border-border pt-6 sm:block ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
              >
                <Icon
                  size={28}
                  strokeWidth={1.25}
                  className="mt-1 shrink-0 text-cocoa sm:mt-0"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight text-cocoa-deep sm:mt-5 sm:text-[1.7rem]">
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-cocoa sm:mt-3">{d.text}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
