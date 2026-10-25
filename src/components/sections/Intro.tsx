import { ScrubText, StaggerContainer, StaggerItem } from "@/components/animations/Reveal";

const audiences = [
  [
    "Quem tem queixas",
    "Perda de urina, dor, desconfortos íntimos ou alterações intestinais que atrapalham a rotina.",
  ],
  [
    "Quem tem dúvidas",
    "Pessoas que querem entender melhor o próprio corpo e o que é possível fazer por ele.",
  ],
  [
    "Quem foi encaminhado",
    "Pacientes indicados por outros profissionais de saúde para uma avaliação especializada.",
  ],
];

export function Intro() {
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className="wrap">
        <p className="eyebrow" id="intro-title">
          O que é fisioterapia pélvica
        </p>
        <ScrubText
          as="p"
          className="mt-8 max-w-5xl font-display text-[clamp(1.9rem,1.2rem+3vw,3.6rem)] leading-[1.12] text-cocoa-deep"
        >
          A fisioterapia pélvica cuida da região que sustenta e coordena funções essenciais do dia a
          dia: urinar, evacuar, se movimentar e viver a intimidade. É um cuidado para *homens e
          mulheres,* em qualquer fase da vida.
        </ScrubText>
        <StaggerContainer className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-12">
          {audiences.map(([t, d]) => (
            <StaggerItem key={t}>
              <h3 className="font-display text-2xl text-cocoa-deep">{t}</h3>
              <p className="mt-3 text-cocoa">{d}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
