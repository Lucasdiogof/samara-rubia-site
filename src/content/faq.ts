export type FaqItem = { q: string; a: string };
export type FaqGroup = { topic: string; items: FaqItem[] };

/** Texto em revisão: validar clinicamente com a Samara antes de publicar. */
export const faqGroups: FaqGroup[] = [
  {
    topic: "Sobre a fisioterapia pélvica",
    items: [
      {
        q: "O que é fisioterapia pélvica?",
        a: "É a área da fisioterapia dedicada à saúde da região pélvica. Ela cuida do assoalho pélvico, um conjunto de músculos e tecidos que sustenta órgãos como a bexiga e o intestino e participa do controle urinário, intestinal e da função sexual.",
      },
      {
        q: "Homens também podem fazer?",
        a: "Sim. A avaliação é voltada a pessoas de qualquer gênero que tenham queixas ou dúvidas sobre a saúde pélvica.",
      },
      {
        q: "Preciso ter um diagnóstico antes de procurar?",
        a: "Você pode buscar uma avaliação mesmo com dúvidas ou queixas ainda não esclarecidas. Se for necessário encaminhamento ou exames complementares, isso será orientado durante o atendimento.",
      },
    ],
  },
  {
    topic: "Sobre o atendimento",
    items: [
      {
        q: "Como é a primeira consulta?",
        a: "A avaliação começa com uma conversa sobre a sua história e as suas queixas. Os procedimentos de avaliação adequados ao seu caso são explicados antes de qualquer etapa, e nada é realizado sem a sua compreensão e o seu consentimento.",
      },
      {
        q: "A avaliação causa dor ou constrangimento?",
        a: "O objetivo é que você se sinta seguro. Cada etapa é explicada antes de acontecer e só é realizada com o seu consentimento. Se algo incomodar, é possível ajustar ou interromper.",
      },
      {
        q: "Preciso de encaminhamento médico?",
        a: "A necessidade de encaminhamento será confirmada pela profissional. Se for indicada avaliação médica ou exames, isso será orientado durante o atendimento.",
      },
      {
        q: "Quantas sessões vou precisar?",
        a: "Depende de cada pessoa e de cada objetivo. O plano é definido após a avaliação, sem promessas de prazo ou de resultado.",
      },
      {
        q: "O conteúdo do site substitui uma consulta?",
        a: "Não. As informações do site são educativas e não substituem a avaliação de um profissional de saúde.",
      },
    ],
  },
  {
    topic: "Agendamento e privacidade",
    items: [
      {
        q: "Como agendo uma avaliação?",
        a: "O primeiro contato será feito pelo canal de atendimento divulgado neste site (previsto: WhatsApp). Você envia uma mensagem, combina o melhor horário e recebe as orientações para o dia.",
      },
      {
        q: "O atendimento é presencial? E valores e convênios?",
        a: "Modalidade de atendimento, valores e convênios ainda serão confirmados e divulgados neste site.",
      },
      {
        q: "Minhas informações de saúde ficam em sigilo?",
        a: "Informações de saúde são tratadas com sigilo profissional. Pelo WhatsApp, envie apenas o necessário para o agendamento; os detalhes clínicos são conversados na avaliação.",
      },
    ],
  },
];

const featured = [
  "O que é fisioterapia pélvica?",
  "Homens também podem fazer?",
  "A avaliação causa dor ou constrangimento?",
  "Quantas sessões vou precisar?",
  "Como agendo uma avaliação?",
  "Minhas informações de saúde ficam em sigilo?",
];
export const homeFaq: FaqItem[] = faqGroups
  .flatMap((g) => g.items)
  .filter((i) => featured.includes(i.q));
