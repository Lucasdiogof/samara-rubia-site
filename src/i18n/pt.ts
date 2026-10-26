import type { ArticleCategory } from "@/config/content";

/** Textos em português (idioma-base: en.ts e es.ts seguem exatamente este formato). */
export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  indications: string[];
  faq: { q: string; a: string }[];
};
export type FaqGroup = { topic: string; items: { q: string; a: string }[] };

export const pt = {
  specialty: "Fisioterapia Pélvica",
  siteDescription: (wa: boolean) =>
    `Fisioterapia Pélvica para homens e mulheres: avaliação individual, escuta e acolhimento.${wa ? " Agende pelo WhatsApp." : ""}`,

  a11y: {
    skip: "Pular para o conteúdo",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    navMain: "Principal",
    navMobile: "Menu mobile",
    navFooter: "Rodapé",
    navBreadcrumb: "Você está em",
    shortcut: "Atalho de agendamento",
    scheduleWa: "Agendar pelo WhatsApp",
    themeToDark: "Ativar tema escuro",
    themeToLight: "Ativar tema claro",
    language: "Idioma",
  },

  nav: {
    home: "Início",
    about: "Sobre",
    treatments: "Tratamentos",
    how: "Como funciona",
    faq: "Dúvidas",
    contact: "Contato",
    content: "Conteúdos",
    privacy: "Política de privacidade",
  },

  footer: {
    blurb:
      "Fisioterapia pélvica com escuta, privacidade e cuidado individualizado, para homens e mulheres.",
    navigation: "Navegação",
    contact: "Contato",
    waSoon: "WhatsApp em breve",
    rights: "Todos os direitos reservados.",
    disclaimer:
      "O conteúdo deste site é educativo e não substitui a avaliação de um profissional de saúde.",
  },

  hero: {
    title: "Cuidado que *acolhe,* atenção que *respeita* cada história.",
    lead: "Fisioterapia pélvica para homens e mulheres, com avaliação individual, escuta atenta e total respeito à sua privacidade.",
    about: "Conheça meu trabalho",
    points: ["Etapas explicadas", "Sigilo profissional", "Para homens e mulheres"],
    cardTitle: "Avaliação individual",
    cardText: "Cada etapa explicada, no seu ritmo.",
  },

  intro: {
    eyebrow: "O que é fisioterapia pélvica",
    text: "A fisioterapia pélvica cuida da região que sustenta e coordena funções essenciais do dia a dia: urinar, evacuar, se movimentar e viver a intimidade. É um cuidado para *homens e mulheres,* em qualquer fase da vida.",
    audiences: [
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
    ] as [string, string][],
  },

  areas: {
    eyebrow: "Áreas de atuação",
    title: "Onde a fisioterapia pélvica *pode* ajudar.",
    text: "Temas em que a avaliação costuma ser buscada. Cada caso é único e o plano nasce da sua avaliação individual.",
    all: "Ver todos os tratamentos",
  },

  aboutTeaser: {
    eyebrow: "Sobre mim",
    title: "Um espaço para falar do que é *delicado,* sem pressa.",
    summary: (name: string) =>
      `Sou ${name}, fisioterapeuta pélvica. Acredito num atendimento em que cada pessoa é ouvida com atenção, entende cada etapa e decide junto o caminho do seu cuidado.`,
    button: "Conhecer minha história",
  },

  journeySection: {
    eyebrow: "Como funciona o atendimento",
    title: "Do primeiro contato ao *acompanhamento,* passo a passo.",
    details: "Ver detalhes do atendimento",
  },
  journey: [
    {
      title: "Primeiro contato",
      text: "Você envia uma mensagem pelo canal de atendimento (previsto: WhatsApp). Sem formulários e sem precisar contar detalhes clínicos por escrito.",
    },
    {
      title: "Agendamento",
      text: "Combinamos o melhor dia e horário e você recebe as orientações para a avaliação.",
    },
    {
      title: "Avaliação individual",
      text: "Uma conversa sobre a sua história e as suas queixas. Cada etapa é explicada e só acontece com o seu consentimento.",
    },
    {
      title: "Conduta e acompanhamento",
      text: "Com base na avaliação, definimos juntos um plano individualizado e como será o acompanhamento.",
    },
  ],

  differentialsSection: { eyebrow: "Diferenciais", title: "O que você pode esperar do *atendimento.*" },
  differentials: [
    {
      title: "Atendimento individualizado",
      text: "Cada pessoa tem uma história. O cuidado parte da sua.",
    },
    {
      title: "Escuta e acolhimento",
      text: "Espaço para falar de assuntos delicados, sem pressa e sem julgamento.",
    },
    {
      title: "Respeito à privacidade",
      text: "Sigilo profissional e cuidado com cada informação compartilhada.",
    },
    {
      title: "Etapas explicadas",
      text: "Você entende o que será feito e por quê, antes de qualquer procedimento.",
    },
    {
      title: "Plano terapêutico individualizado",
      text: "Condutas definidas a partir da avaliação e ajustadas ao longo do caminho.",
    },
  ],

  faqSection: {
    eyebrow: "Dúvidas frequentes",
    title: "Perguntas que *costumam* surgir.",
    all: "Ver todas as perguntas",
  },

  location: {
    shortTitle: "Onde encontrar o atendimento",
    soon: "Endereço, modalidade e horários serão divulgados em breve.",
    seeContact: "Ver contato",
    eyebrow: "Localização",
    title: (place: string) =>
      place ? `${place}: onde *encontrar* o atendimento.` : "Onde *encontrar* o atendimento.",
    allChannels: "Todos os canais de contato",
  },

  finalCta: {
    eyebrow: "Próximo passo",
    titleWa: "Seu cuidado começa com uma *conversa.*",
    titleNoWa: "Em breve, o primeiro *contato.*",
    textWa:
      "Envie uma mensagem para agendar a sua avaliação. Sem compromisso e sem precisar detalhar nada por escrito.",
    textNoWa:
      "Os canais de contato e de agendamento ainda estão em preparação e serão divulgados aqui assim que forem confirmados.",
    buttonWa: "Agendar pelo WhatsApp",
    buttonNoWa: "Entenda como funciona",
  },

  office: { eyebrow: "Consultório", title: "Um espaço pensado para o *seu conforto.*" },

  contactRows: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    address: "Endereço",
    modality: "Modalidade",
    hours: "Horários",
    insurance: "Convênios",
    soon: "Em breve",
    callWa: "Chamar no WhatsApp",
    openMaps: "Abrir no Google Maps",
    and: "e",
    pending: (names: string) => `${names}: serão divulgados aqui assim que confirmados.`,
  },

  page: {
    breadcrumbHome: "Início",
    ctaBandTitle: "Vamos conversar sobre o seu cuidado?",
    ctaFaqTitle: "Ficou com dúvidas?",
    ctaFaqLabel: "Perguntas frequentes",
    ctaHowTitle: "Quer entender o atendimento?",
    ctaHowLabel: "Como funciona",
    otherAreas: "Outras áreas",
  },

  home: {
    title: (name: string, specialty: string) => `${name} | ${specialty}`,
  },

  how: {
    metaTitle: "Como funciona o atendimento",
    metaDescription:
      "Do primeiro contato pelo WhatsApp ao acompanhamento: veja como é a avaliação em fisioterapia pélvica, com privacidade e consentimento.",
    eyebrow: "Como funciona",
    title: "Um atendimento *claro* em cada etapa.",
    lead: "Saber o que vai acontecer ajuda a chegar mais tranquilo. Veja a jornada e os cuidados que a acompanham.",
    crumb: "Como funciona",
    care: [
      [
        "Privacidade",
        "Sigilo profissional. Pelo WhatsApp, envie apenas o necessário para o agendamento; detalhes clínicos são conversados na avaliação.",
      ],
      [
        "Consentimento",
        "Cada etapa é explicada antes de acontecer e só é realizada com a sua compreensão e concordância. Você pode pedir para parar a qualquer momento.",
      ],
      [
        "Acompanhamento",
        "O plano é individual e revisitado ao longo do caminho. Não há promessa de prazo ou de resultado.",
      ],
    ] as [string, string][],
  },

  contactPage: {
    metaTitleWa: "Contato e agendamento",
    metaTitleNoWa: "Contato",
    metaDescWa:
      "Agende sua avaliação de fisioterapia pélvica pelo WhatsApp e conheça os canais de contato.",
    metaDescNoWa:
      "Canais de contato de fisioterapia pélvica. As informações de atendimento serão divulgadas aqui assim que confirmadas.",
    eyebrow: "Contato",
    title: "Vamos *conversar?*",
    leadWa: "O agendamento é feito pelo WhatsApp, de forma simples e sem formulários.",
    leadSome:
      "O agendamento ainda não está disponível neste site. Veja abaixo os canais confirmados.",
    leadNone:
      "Os canais de atendimento ainda estão em preparação. Esta página será atualizada com as informações confirmadas.",
    schedule: "Agendar avaliação",
    scheduleText:
      "Clique para abrir uma conversa com uma mensagem inicial pronta. Não envie informações clínicas detalhadas por mensagem.",
    callWa: "Chamar no WhatsApp",
    preparing: "Canais em preparação",
    preparingText:
      "O número de WhatsApp para agendamento será divulgado aqui assim que for confirmado. Até lá, não há canal de agendamento disponível neste site.",
  },

  faqPage: {
    metaTitle: "Perguntas frequentes",
    metaDescription:
      "Respostas sobre fisioterapia pélvica, primeira consulta, agendamento e privacidade.",
    eyebrow: "Dúvidas",
    title: "Perguntas *frequentes.*",
    leadWa:
      "Respostas educativas, organizadas por assunto. Ficou com alguma dúvida? É só perguntar no contato.",
    leadNoWa: "Respostas educativas, organizadas por assunto.",
    review: "Versão de revisão: as respostas ainda serão validadas clinicamente pela profissional.",
    crumb: "Perguntas frequentes",
  },
  faqGroups: [
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
  ] as FaqGroup[],

  privacy: {
    metaTitle: "Política de privacidade",
    metaDescription:
      "Como este site trata dados: sem formulários, sem cadastro e sem rastreamento de terceiros.",
    eyebrow: "Institucional",
    title: "Política de *privacidade.*",
    lead: "Transparência sobre os poucos dados envolvidos na navegação deste site.",
    review:
      "Versão de revisão: texto preliminar, sujeito à validação da profissional e à identificação do responsável pelo tratamento. Não constitui declaração de conformidade jurídica integral.",
    crumb: "Política de privacidade",
    blocks: (name: string): [string, string[]][] => [
      [
        "Quais dados este site coleta",
        [
          "Este site não possui formulários, cadastro, área de login ou banco de dados. Ele não coleta, de forma própria, dados pessoais ou informações de saúde dos visitantes.",
          "Não utilizamos cookies de publicidade nem ferramentas de análise ou rastreamento de terceiros nesta versão.",
        ],
      ],
      [
        "Contato pelo WhatsApp",
        [
          "Quando o contato por WhatsApp estiver disponível, os botões de agendamento levarão você ao WhatsApp, serviço de terceiros com política de privacidade própria. A mensagem inicial é padronizada e não contém informações clínicas.",
          "Recomendamos não enviar detalhes de saúde por mensagem; eles são conversados na avaliação, sob sigilo profissional.",
        ],
      ],
      [
        "Links externos e hospedagem",
        [
          "Links para Instagram e Google Maps levam a serviços de terceiros, regidos por suas próprias políticas. Os vídeos (Reels) só são carregados do Instagram depois que você clica para assistir.",
          "O site é hospedado na Cloudflare, que pode registrar dados técnicos de acesso (como endereço IP) para segurança e funcionamento da rede. As fontes tipográficas são servidas pelo próprio site. A escolha de tema e de idioma fica salva apenas no seu navegador.",
        ],
      ],
      [
        "Seus direitos",
        [
          `Você pode solicitar informações sobre o tratamento de dados pelos canais de contato de ${name}, nos termos da Lei Geral de Proteção de Dados (LGPD).`,
        ],
      ],
    ],
  },

  about: {
    metaTitle: "Sobre",
    metaDescription: (name: string) =>
      `Conheça ${name}, fisioterapeuta pélvica: abordagem de atendimento, formação e valores.`,
    eyebrow: "Sobre",
    title: (first: string) => `Prazer, *${first}.*`,
    lead: "Fisioterapeuta pélvica, com um atendimento pensado para que cada pessoa se sinta ouvida e segura.",
    review:
      "Versão de revisão: história profissional, formação e fotografias serão inseridas após confirmação.",
    history: "História profissional",
    historyFallback:
      "A apresentação completa da trajetória profissional será publicada após a confirmação das informações pela própria Samara.",
    education: "Formação",
    specializations: "Especializações",
    courses: "Cursos e qualificações",
    approach: "Abordagem de atendimento",
    crumb: "Sobre",
  },

  treatments: {
    metaTitle: "Tratamentos e áreas de atuação",
    metaDescription:
      "Conheça as áreas da fisioterapia pélvica em que a avaliação costuma ser buscada: incontinência, dor pélvica, gestação, saúde masculina e feminina.",
    eyebrow: "Tratamentos",
    title: "Áreas da *fisioterapia pélvica.*",
    lead: "Temas em que a avaliação costuma ser buscada. O conteúdo é educativo e não substitui a avaliação individual.",
    review: "Versão de revisão: as áreas de atuação ainda serão confirmadas pela profissional.",
    crumb: "Tratamentos",
    reviewDetail:
      "Versão de revisão: este conteúdo está aguardando validação da profissional antes da publicação.",
    whenIndicated: "Quando a avaliação pode ser indicada",
    followUpTitle: "Como funciona o acompanhamento",
    followUp:
      "O acompanhamento é definido após a avaliação individual, de acordo com as suas queixas e objetivos. Frequência, duração e condutas são combinadas com você, sem promessa de prazo ou resultado.",
    disclaimer:
      "Este conteúdo é educativo e não substitui a avaliação de um profissional de saúde. Não há promessa de cura ou de resultado.",
    questions: "Dúvidas sobre este tema",
  },

  notFound: {
    title: "Página não encontrada",
    code: "Erro 404",
    heading: "Esse caminho não *existe.*",
    text: "A página que você procura pode ter mudado de lugar.",
    home: "Voltar ao início",
    contact: "Falar com a Samara",
    how: "Como funciona",
  },

  services: [
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
      faq: [
        {
          q: "O plano é igual para todo mundo?",
          a: "Não. O plano terapêutico é individualizado e ajustado ao longo do acompanhamento.",
        },
      ],
    },
  ] as Service[],

  content: {
    eyebrow: "Conteúdos educativos",
    title: "Informação clara para *cuidar* de você.",
    lead: "Vídeos e artigos informativos. Eles não substituem a avaliação individual.",
    videos: "Vídeos",
    articles: "Artigos",
    seeAll: "Ver todos os conteúdos",
    metaTitle: "Conteúdos educativos",
    metaDescription:
      "Vídeos e artigos informativos sobre fisioterapia pélvica. O conteúdo é educativo e não substitui a avaliação individual.",
    pageEyebrow: "Conteúdos",
    pageTitle: "Conteúdos *educativos.*",
    pageLead:
      "Vídeos e artigos sobre saúde pélvica. São informativos e não substituem a avaliação de um profissional de saúde.",
    crumb: "Conteúdos",
    empty: "Os conteúdos educativos serão publicados aqui após a revisão da profissional.",
    watch: "Assistir aqui",
    openIg: "Ver no Instagram",
    igNote:
      "O vídeo é carregado do Instagram só depois do clique; o Instagram pode registrar dados do seu acesso.",
    player: (title: string) => `Reprodutor do Reel: ${title}`,
    demo: "EXEMPLO DE DESENVOLVIMENTO",
    read: "Ler artigo",
    back: "Todos os conteúdos",
    disclaimer:
      "Este conteúdo é educativo e não substitui a avaliação de um profissional de saúde. Não há promessa de cura ou de resultado.",
    categories: {
      geral: "Saúde pélvica",
      gestacao: "Gestação e pós-parto",
      incontinencia: "Incontinência urinária",
      dor: "Dor pélvica",
      intimidade: "Saúde íntima",
    } as Record<ArticleCategory, string>,
  },
  reviews: {
    eyebrow: "Avaliações",
    title: "O que dizem *sobre* o atendimento.",
    lead: "Avaliações publicadas no Google, transcritas com autorização de quem as escreveu.",
    source: "Avaliação no Google",
    demo: "EXEMPLO FICTÍCIO — não é uma avaliação real",
    seeAll: "Ver avaliações no Google",
    stars: (n: number) => `${n} de 5 estrelas`,
  },

  jobTitle: "Fisioterapeuta pélvica",
};

export type Dict = typeof pt;
