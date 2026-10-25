export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  indications: string[];
  followUp: string;
  faq: { q: string; a: string }[];
};

const FOLLOW =
  "O acompanhamento é definido após a avaliação individual, de acordo com as suas queixas e objetivos. Frequência, duração e condutas são combinadas com você, sem promessa de prazo ou resultado.";

/** Texto educativo em revisão: precisa da validação da Samara antes da publicação final. */
export const services: Service[] = [
  {
    slug: "saude-pelvica-feminina",
    title: "Saúde pélvica feminina",
    short: "Cuidado com o assoalho pélvico nas diferentes fases da vida.",
    description:
      "A fisioterapia pélvica olha para os músculos e tecidos que sustentam e coordenam a região pélvica. Na saúde feminina, a avaliação pode fazer sentido em diferentes fases da vida, da juventude à menopausa.",
    indications: [
      "Perda involuntária de urina",
      "Dor ou desconforto na região pélvica",
      "Sensação de peso ou pressão na pelve",
      "Dor durante relações sexuais",
      "Dúvidas sobre o funcionamento do assoalho pélvico",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "Preciso estar com algum sintoma para fazer uma avaliação?",
        a: "Não necessariamente. Quem tem dúvidas sobre a saúde pélvica também pode buscar orientação. A necessidade de acompanhamento é definida na avaliação.",
      },
    ],
  },
  {
    slug: "saude-pelvica-masculina",
    title: "Saúde pélvica masculina",
    short: "Atenção ao assoalho pélvico também para homens, com discrição e respeito.",
    description:
      "Homens também têm assoalho pélvico e também podem apresentar queixas nessa região. A fisioterapia pélvica oferece uma avaliação respeitosa e individualizada, em um ambiente de escuta.",
    indications: [
      "Perda involuntária de urina",
      "Dor ou desconforto na região pélvica ou perineal",
      "Queixas urinárias ou intestinais persistentes",
      "Acompanhamento relacionado a cirurgias da região pélvica, quando indicado",
      "Queixas sexuais",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "A fisioterapia pélvica é só para mulheres?",
        a: "Não. A avaliação é voltada a pessoas de qualquer gênero que tenham queixas ou dúvidas sobre a saúde pélvica.",
      },
    ],
  },
  {
    slug: "incontinencia-urinaria",
    title: "Incontinência urinária",
    short: "Avaliação de queixas de perda involuntária de urina.",
    description:
      "A perda involuntária de urina é uma queixa comum, mas não precisa ser tratada como algo normal ou inevitável. A avaliação fisioterapêutica ajuda a entender o contexto de cada pessoa.",
    indications: [
      "Perda de urina ao tossir, espirrar, rir ou se exercitar",
      "Urgência intensa para urinar",
      "Idas frequentes ao banheiro que interferem na rotina",
      "Receio de sair de casa ou praticar atividades por causa do problema",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "A incontinência urinária é normal com a idade?",
        a: "Ela é frequente, mas isso não significa que deva ser ignorada. Vale buscar avaliação profissional para entender o que está acontecendo.",
      },
    ],
  },
  {
    slug: "dor-pelvica",
    title: "Dor pélvica",
    short: "Escuta e avaliação para dores na região da pelve.",
    description:
      "A dor pélvica pode ter diferentes origens e impactar o sono, o trabalho e a vida íntima. A avaliação fisioterapêutica considera o seu histórico e a sua rotina para orientar os próximos passos.",
    indications: [
      "Dor persistente na região pélvica, lombar baixa ou perineal",
      "Dor ao sentar por períodos prolongados",
      "Dor associada à menstruação, quando orientada por avaliação",
      "Desconforto ao urinar ou evacuar sem causa já esclarecida",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "A fisioterapia substitui a consulta médica?",
        a: "Não. A fisioterapia pode atuar junto com outros profissionais de saúde, e a avaliação orienta quando é importante buscar também acompanhamento médico.",
      },
    ],
  },
  {
    slug: "disfuncoes-do-assoalho-pelvico",
    title: "Disfunções do assoalho pélvico",
    short: "Força, relaxamento e coordenação dos músculos da pelve.",
    description:
      "Os músculos do assoalho pélvico precisam de força, mas também de capacidade de relaxar e coordenar-se. Alterações nesse equilíbrio podem estar relacionadas a diferentes queixas.",
    indications: [
      "Sensação de peso na região genital",
      "Dificuldade para esvaziar a bexiga ou o intestino",
      "Constipação persistente",
      "Perda de gases ou fezes",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "O que é o assoalho pélvico?",
        a: "É o conjunto de músculos e tecidos na base da pelve que sustenta órgãos como bexiga e intestino e participa do controle urinário, intestinal e da função sexual.",
      },
    ],
  },
  {
    slug: "gestacao-e-pos-parto",
    title: "Gestação e pós-parto",
    short: "Acompanhamento do corpo durante e depois da gestação.",
    description:
      "A gestação e o parto trazem mudanças importantes para o corpo. A fisioterapia pélvica pode orientar o cuidado com o assoalho pélvico antes e depois do nascimento, respeitando o seu momento.",
    indications: [
      "Dúvidas sobre preparo do corpo para o parto",
      "Perda de urina durante ou após a gestação",
      "Dor na região pélvica ou lombar durante a gestação",
      "Cuidados com a recuperação após o parto, conforme liberação profissional",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "Quando posso começar o acompanhamento após o parto?",
        a: "O momento adequado depende de cada caso e da liberação dos profissionais que acompanham você. Isso é conversado na avaliação.",
      },
    ],
  },
  {
    slug: "queixas-sexuais",
    title: "Queixas sexuais",
    short: "Um espaço sem julgamento para falar de dor e desconforto íntimos.",
    description:
      "Dor ou desconforto na vida sexual podem estar relacionados ao assoalho pélvico. A conversa é conduzida com respeito, privacidade e no seu ritmo.",
    indications: [
      "Dor durante a penetração ou após a relação",
      "Sensação de tensão ou dificuldade de relaxamento da região pélvica",
      "Desconforto que interfere na vida íntima",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "É constrangedor falar sobre esse assunto?",
        a: "É comum sentir isso. O atendimento é individual e reservado, e você decide o quanto e quando compartilhar.",
      },
    ],
  },
  {
    slug: "reabilitacao-funcional",
    title: "Reabilitação funcional",
    short: "Retomada gradual de atividades do dia a dia com orientação.",
    description:
      "Quando uma queixa pélvica limita a rotina, o trabalho ou a prática de exercícios, a avaliação ajuda a construir um plano de retomada gradual das atividades.",
    indications: [
      "Limitação de atividades por desconforto ou perda urinária",
      "Retorno à prática de exercícios com orientação",
      "Recuperação após procedimentos, conforme liberação médica",
    ],
    followUp: FOLLOW,
    faq: [
      {
        q: "O plano é igual para todo mundo?",
        a: "Não. O plano terapêutico é individualizado e ajustado ao longo do acompanhamento.",
      },
    ],
  },
];
