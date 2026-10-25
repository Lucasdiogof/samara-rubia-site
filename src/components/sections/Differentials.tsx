import { Ear, HeartHandshake, ListChecks, Lock, Sprout } from "lucide-react";
import { RevealText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";
import { differentials } from "@/content/journey";

const icons = [HeartHandshake, Ear, Lock, ListChecks, Sprout];

export function Differentials() {
  return (
    <section className="section bg-cream" aria-labelledby="dif-title">
      <div className="wrap">
        <p className="eyebrow">Diferenciais</p>
        <RevealText as="h2" id="dif-title" className="t-h2 mt-5 max-w-3xl">
          O que você pode esperar do *atendimento.*
        </RevealText>
        <StaggerContainer className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-6">
          {differentials.map((d, i) => {
            const Icon = icons[i] ?? Sprout;
            const span = i < 2 ? "lg:col-span-3" : "lg:col-span-2";
            return (
              <StaggerItem key={d.title} className={`${span} ${i % 2 ? "lg:mt-12" : ""}`}>
                <Icon size={30} strokeWidth={1.25} className="text-cocoa" aria-hidden="true" />
                <h3 className="mt-5 font-display text-[1.7rem] leading-tight text-cocoa-deep">
                  {d.title}
                </h3>
                <p className="mt-3 max-w-sm text-cocoa">{d.text}</p>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
