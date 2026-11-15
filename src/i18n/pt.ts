import type { ArticleCategory } from "@/config/content";

/** Textos em português (idioma-base: en.ts e es.ts seguem exatamente este formato). */
export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  indications: string[];
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
    eyebrow: "Fisioterapia Pélvica em Goiânia",
    about: "Conheça meu trabalho",
    title: "*Samara Rúbia* — Fisioterapeuta Pélvica",
    lead: "Atendimento humanizado para mulheres e homens, com foco em saúde íntima, funcionalidade, bem-estar e qualidade de vida.",
  },

  pelvic: {
    eyebrow: "Saúde pélvica",
    title: "O que é a Fisioterapia Pélvica e como ela pode *ajudar?*",
    text: "A fisioterapia pélvica atua na prevenção e no tratamento de alterações do assoalho pélvico, relacionadas às funções urinária, intestinal e sexual, promovendo saúde e qualidade de vida para homens e mulheres.",
    all: "Conheça todos os tratamentos",
  },

  aboutTeaser: {
    eyebrow: "Sobre mim",
    heading: "Cuidado especializado para seu *assoalho pélvico*",
    body: [
      "Formada em Fisioterapia pela Pontifícia Universidade Católica de Goiás, com formação em Fisioterapia Pélvica e cinco anos de atuação profissional em Goiânia.",
      "Minha atuação é dedicada à saúde pélvica de mulheres e homens, buscando promover conforto, autonomia e qualidade de vida.",
      "Acredito em um cuidado que une conhecimento científico, escuta atenta e respeito à individualidade de cada paciente.",
    ] as string[],
    title: "Um espaço para falar do que é *delicado,* sem pressa.",
    summary: (name: string) =>
      `Sou ${name}, fisioterapeuta pélvica. Acredito num atendimento em que cada pessoa é ouvida com atenção, entende cada etapa e decide junto o caminho do seu cuidado.`,
    button: "Conhecer minha história",
  },

  signals: {
    eyebrow: "Um momento para você",
    title: "Você se identifica com alguma destas *situações?*",
    subtitle: "Selecione as situações que fazem parte do seu dia a dia.",
    group: "Situações do dia a dia",
    of: "de",
    selected: ["0 selecionados", "1 selecionado", "{n} selecionados"],
    counter: "Situações selecionadas",
    disclaimer: "Este questionário é educativo e não substitui uma avaliação profissional. A quantidade de itens selecionados não indica gravidade.",
    items: [
      { title: "Escapes urinários", text: "Perco urina ao rir, tossir, espirrar ou praticar exercícios." },
      { title: "Urgência urinária", text: "Sinto uma vontade repentina de urinar e preciso correr ao banheiro." },
      { title: "Sono interrompido", text: "Acordo durante a noite para urinar e isso atrapalha meu descanso." },
      { title: "Prevenção", text: "Uso absorventes ou protetores por receio de perder urina." },
      { title: "Movimento", text: "Evito atividades físicas por medo de escapes ou desconfortos." },
      { title: "Desconforto pélvico", text: "Sinto dor, pressão ou peso na região pélvica." },
      { title: "Saúde íntima", text: "Sinto dor ou desconforto durante as relações sexuais." },
      { title: "Função intestinal", text: "Tenho dificuldade para evacuar ou sinto um esvaziamento incompleto." },
    ],
    /** 0, 1, 2–3, 4–5, 6–8 selecionados. Mensagens educativas: nunca pontuação, risco ou gravidade. */
    states: [
      { title: "Alguma dessas situações faz parte da sua rotina?", text: "Selecione as opções com as quais você se identifica." },
      { title: "Já passou por isso alguma vez?", text: "Se essa situação acontece com frequência ou causa desconforto, vale investigar." },
      { title: "Isso tem interferido no seu dia a dia?", text: "Entender o que está causando esses sintomas é importante para definir o tratamento adequado." },
      { title: "Há quanto tempo você convive com esses sintomas?", text: "Uma avaliação fisioterapêutica pode ajudar a entender suas queixas e orientar o tratamento." },
      { title: "Que tal conversar sobre o que você está sentindo?", text: "Na consulta, podemos avaliar essas queixas com calma e entender quais cuidados fazem sentido para o seu caso." },
    ],
  },

  journeySection: {
    eyebrow: "Como funciona o atendimento",
    title: "Do primeiro contato ao *acompanhamento,* passo a passo.",
    details: "Ver detalhes do atendimento",
  },
  journey: [
    {
      title: "Primeiro contato",
      text: "Você envia uma mensagem pelo WhatsApp profissional. Sem formulários e sem precisar contar detalhes clínicos por escrito.",
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
    hoursText: (open: string, close: string) => `Das ${open} às ${close}`,
    hoursNote: "Segunda a sexta",
    modalities: { presencial: "Presencial", online: "Online" },
    directions: "Como chegar",
    venueAt: (venue: string) => `Atendimento na ${venue}`,
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
          a: "O agendamento é feito pelo WhatsApp profissional: você envia uma mensagem, combina o melhor horário e recebe as orientações para o dia.",
        },
        {
          q: "O atendimento é presencial? E valores e convênios?",
          a: "O atendimento é presencial, em Goiânia (endereço na seção Localização), e também online, de segunda a sexta. Valores e convênios devem ser confirmados diretamente pelo WhatsApp profissional.",
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
          "Ao clicar nos botões de agendamento, você será direcionado ao WhatsApp, serviço de terceiros com política de privacidade própria. A mensagem inicial é padronizada e não contém informações clínicas.",
          "Recomendamos não enviar detalhes de saúde por mensagem; eles são conversados na avaliação, sob sigilo profissional.",
        ],
      ],
      [
        "Links externos e hospedagem",
        [
          "Links para Instagram e Google Maps levam a serviços de terceiros, regidos por suas próprias políticas. Os vídeos (Reels) só são carregados do Instagram depois que você clica para assistir. As publicações do Instagram são carregadas direto do Instagram quando você chega a essa parte da página.",
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
    eyebrow: "Sobre mim",
    title: (first: string) => `Prazer, *${first}.*`,
    pageTitle: "Minha trajetória *profissional.*",
    lead: "Conheça minha formação, experiência e forma de atuar na fisioterapia pélvica.",
    review:
      "Versão de revisão: história profissional, formação e fotografias serão inseridas após confirmação.",
    history: "História profissional",
    historyFallback:
      "A apresentação completa da trajetória profissional será publicada após a confirmação das informações pela própria Samara.",
    education: "Formação",
    specializations: "Especializações",
    courses: "Cursos e qualificações",
    approach: "Como conduzo meus atendimentos",
    crumb: "Sobre",
    story: [
      "Graduada em Fisioterapia pela Pontifícia Universidade Católica de Goiás (PUC Goiás), atuo há cinco anos em Goiânia, com formação em Fisioterapia Pélvica.",
      "Minha prática clínica é dedicada à saúde pélvica de mulheres e homens, com foco na prevenção e no tratamento de disfunções urinárias, intestinais e sexuais.",
      "Busco constantemente aprimorar meus conhecimentos para oferecer tratamentos fundamentados em evidências científicas e adequados às necessidades de cada paciente.",
    ] as string[],
    approachItems: [
      { title: "Avaliação detalhada", text: "Investigação dos sintomas, do histórico clínico e dos hábitos de vida." },
      { title: "Escuta e respeito", text: "Liberdade para falar sobre questões íntimas, sem constrangimentos ou julgamentos." },
      { title: "Prática baseada em evidências", text: "Condutas terapêuticas fundamentadas no conhecimento científico." },
      { title: "Acompanhamento da evolução", text: "Reavaliação e adaptação do tratamento conforme a evolução clínica." },
    ],
  },

  treatments: {
    metaTitle: "Tratamentos e áreas de atuação",
    metaDescription:
      "Conheça os atendimentos de fisioterapia pélvica: incontinência urinária, bexiga hiperativa, endometriose, dor pélvica crônica, prolapso, gestação e pós-parto, entre outros.",
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
      slug: "disfuncoes-sexuais-femininas",
      title: "Disfunções sexuais femininas",
      short: "Um espaço sem julgamento para falar de dor e desconforto íntimos.",
      description:
        "Dor ou desconforto na vida sexual podem estar relacionados ao assoalho pélvico. A conversa é conduzida com respeito, privacidade e no seu ritmo.",
      indications: [
        "Dor durante a penetração ou após a relação",
        "Contração involuntária que dificulta ou impede a penetração",
        "Sensação de tensão ou dificuldade de relaxamento da região pélvica",
        "Desconforto que interfere na vida íntima",
      ],
    },
    {
      slug: "dor-pelvica",
      title: "Dor pélvica crônica",
      short: "Escuta e avaliação para dores persistentes na região da pelve.",
      description:
        "A dor pélvica crônica pode ter diferentes origens e impactar o sono, o trabalho e a vida íntima. A avaliação fisioterapêutica considera o seu histórico e a sua rotina para orientar os próximos passos.",
      indications: [
        "Dor persistente na região pélvica, lombar baixa ou perineal",
        "Dor ao sentar por períodos prolongados",
        "Dor associada à menstruação, quando orientada por avaliação",
        "Desconforto ao urinar ou evacuar sem causa já esclarecida",
      ],
    },
    {
      slug: "endometriose",
      title: "Endometriose",
      short: "Apoio no manejo da dor e dos sintomas, junto com o acompanhamento médico.",
      description:
        "A endometriose é uma condição em que um tecido semelhante ao do útero cresce fora dele e pode causar dor e outros sintomas. A fisioterapia pélvica pode complementar o tratamento médico, cuidando da musculatura e da dor associadas.",
      indications: [
        "Dor pélvica ou cólica intensa associada à endometriose",
        "Dor durante as relações sexuais",
        "Sintomas urinários ou intestinais que acompanham o ciclo menstrual",
        "Tensão da musculatura do assoalho pélvico e da região lombar",
      ],
    },
    {
      slug: "incontinencia-urinaria",
      title: "Incontinência urinária feminina e masculina",
      short: "Avaliação de queixas de perda involuntária de urina, em mulheres e homens.",
      description:
        "A perda involuntária de urina é uma queixa comum, mas não precisa ser tratada como algo normal ou inevitável. A avaliação fisioterapêutica ajuda a entender o contexto de cada pessoa, seja mulher ou homem.",
      indications: [
        "Perda de urina ao tossir, espirrar, rir ou se exercitar",
        "Urgência intensa para urinar",
        "Perda de urina após cirurgias da região pélvica, como a da próstata",
        "Receio de sair de casa ou praticar atividades por causa do problema",
      ],
    },
    {
      slug: "bexiga-hiperativa",
      title: "Bexiga hiperativa",
      short: "Avaliação da urgência e da frequência urinária que atrapalham a rotina.",
      description:
        "Na bexiga hiperativa, a vontade de urinar surge de repente e com intensidade, às vezes com perda de urina. Quando isso passa a limitar a rotina, é possível investigar a causa e tratar.",
      indications: [
        "Urgência súbita e intensa para urinar",
        "Idas ao banheiro com frequência acima do habitual",
        "Acordar várias vezes à noite para urinar",
        "Perda de urina que acompanha a urgência",
      ],
    },
    {
      slug: "retencao-urinaria",
      title: "Retenção urinária",
      short: "Avaliação de dificuldades para esvaziar a bexiga.",
      description:
        "Na retenção urinária, a bexiga não se esvazia por completo ou a pessoa tem dificuldade para iniciar a urina. A avaliação ajuda a entender o papel do assoalho pélvico e a orientar quando buscar também avaliação médica.",
      indications: [
        "Dificuldade para começar a urinar",
        "Jato fraco ou que para e recomeça",
        "Sensação de que a bexiga não esvaziou por completo",
        "Necessidade de fazer força para urinar",
      ],
    },
    {
      slug: "prolapso-de-orgaos-pelvicos",
      title: "Prolapso de órgãos pélvicos",
      short: "Avaliação de queixas de peso ou de \"descida\" dos órgãos da pelve.",
      description:
        "No prolapso, órgãos como a bexiga, o útero ou o reto descem em direção à vagina por falta de sustentação. A fisioterapia pélvica pode fazer parte do cuidado conservador, e a avaliação orienta quando outras condutas são necessárias.",
      indications: [
        "Sensação de peso ou de \"bola\" na região genital",
        "Sensação de que algo está saindo pela vagina",
        "Desconforto que piora ao ficar muito tempo em pé",
        "Sintomas urinários ou intestinais associados",
      ],
    },
    {
      slug: "constipacao",
      title: "Constipação",
      short: "Avaliação do intestino preso e da dificuldade para evacuar.",
      description:
        "A constipação pode estar ligada à coordenação e ao relaxamento da musculatura do assoalho pélvico, além de hábitos e outros fatores. A avaliação ajuda a entender o que está contribuindo no seu caso.",
      indications: [
        "Esforço excessivo para evacuar",
        "Fezes endurecidas ou evacuação incompleta",
        "Sensação de bloqueio ao tentar evacuar",
        "Intestino preso que persiste ao longo do tempo",
      ],
    },
    {
      slug: "prostatectomia-radical",
      title: "Pré e pós-operatório de prostatectomia radical",
      short: "Preparo e recuperação do assoalho pélvico na cirurgia da próstata.",
      description:
        "A prostatectomia radical é a cirurgia de retirada da próstata. A fisioterapia pélvica pode orientar o preparo do assoalho pélvico antes da cirurgia e acompanhar a recuperação depois, respeitando a liberação da equipe médica.",
      indications: [
        "Preparo do assoalho pélvico antes da cirurgia",
        "Perda de urina após a prostatectomia",
        "Orientações para a recuperação, conforme liberação médica",
        "Dúvidas sobre o que esperar no pré e no pós-operatório",
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
    },
  ] as Service[],

  content: {
    eyebrow: "Conteúdos educativos",
    title: "Informação clara para *cuidar* de você.",
    lead: "Vídeos, publicações e artigos informativos. Eles não substituem a avaliação individual.",
    videos: "Vídeos",
    articles: "Artigos",
    seeAll: "Ver todos os conteúdos",
    metaTitle: "Conteúdos educativos",
    metaDescription:
      "Vídeos e artigos informativos sobre fisioterapia pélvica. O conteúdo é educativo e não substitui a avaliação individual.",
    pageEyebrow: "Conteúdos",
    pageTitle: "Conteúdos *educativos.*",
    pageLead:
      "Vídeos, publicações e artigos sobre saúde pélvica. São informativos e não substituem a avaliação de um profissional de saúde.",
    crumb: "Conteúdos",
    empty: "Os conteúdos educativos serão publicados aqui após a revisão da profissional.",
    watch: "Assistir aqui",
    posts: "Publicações",
    postTitle: (n: number) => `Publicação ${n}`,
    postHint: "Publicação original no Instagram.",
    playerPost: (n: number) => `Publicação do Instagram ${n}`,
    openIg: "Ver no Instagram",
    postsCarousel: "Publicações do Instagram",
    prev: "Publicação anterior",
    next: "Próxima publicação",
    goTo: (n: number) => `Ir para a publicação ${n}`,
    igNote:
      "O conteúdo é carregado do Instagram só depois do clique; o Instagram pode registrar dados do seu acesso.",
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
    demo: "AVALIAÇÃO DE TESTE — fictícia, não é de uma paciente real",
    seeAll: "Ver avaliações no Google",
    stars: (n: number) => `${n} de 5 estrelas`,
  },

  jobTitle: "Fisioterapeuta pélvica",
};

export type Dict = typeof pt;
