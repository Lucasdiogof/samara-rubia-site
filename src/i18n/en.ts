import type { Dict } from "./pt";

/** English draft: to be reviewed by Samara before the language is released for indexing. */
export const en: Dict = {
  specialty: "Pelvic Physiotherapy",
  siteDescription: (wa) =>
    `Pelvic physiotherapy for men and women: individual assessment, attentive listening and a welcoming approach.${wa ? " Book via WhatsApp." : ""}`,

  a11y: {
    skip: "Skip to content",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navMain: "Main",
    navMobile: "Mobile menu",
    navFooter: "Footer",
    navBreadcrumb: "You are here",
    shortcut: "Booking shortcut",
    scheduleWa: "Book via WhatsApp",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    language: "Language",
  },

  nav: {
    home: "Home",
    about: "About",
    treatments: "Treatments",
    how: "How it works",
    faq: "FAQ",
    contact: "Contact",
    content: "Content",
    privacy: "Privacy policy",
  },

  footer: {
    blurb:
      "Pelvic physiotherapy with attentive listening, privacy and individualised care, for men and women.",
    navigation: "Navigation",
    contact: "Contact",
    waSoon: "WhatsApp coming soon",
    rights: "All rights reserved.",
    disclaimer:
      "The content of this website is educational and does not replace an assessment by a healthcare professional.",
  },

  hero: {
    title: "Care that *welcomes,* attention that *respects* every story.",
    lead: "Pelvic physiotherapy for men and women, with individual assessment, attentive listening and full respect for your privacy.",
    about: "See my work",
    points: ["Every step explained", "Professional confidentiality", "For men and women"],
  },

  intro: {
    eyebrow: "What is pelvic physiotherapy",
    text: "Pelvic physiotherapy looks after the region that supports and coordinates essential everyday functions: urinating, bowel movements, moving around and enjoying intimacy. It is care for *men and women,* at any stage of life.",
  },

  areas: {
    eyebrow: "Areas of practice",
    title: "Where pelvic physiotherapy *can* help.",
    text: "Topics for which an assessment is commonly sought. Every case is unique, and the plan comes from your individual assessment.",
    all: "See all treatments",
  },

  /** Apresentação profissional (texto da Samara), exibida em Sobre mim e na página Sobre. */
  bio: [
    "I'm Samara Rúbia, a physiotherapist who graduated from the Pontifical Catholic University of Goiás (PUC Goiás), with 5 years of practice in Goiânia and training in Pelvic Physiotherapy.",
    "My work focuses on the care of women and men who have conditions related to the pelvic floor.",
    "I believe in individualised, welcoming care grounded in scientific evidence. Every patient has different needs, which is why I carry out a detailed assessment to understand each case and define a personalised treatment.",
    "I keep up with continuous professional development to offer safe, individualised care suited to each patient's needs, helping to improve symptoms, pelvic floor function and quality of life.",
  ] as string[],

  aboutTeaser: {
    eyebrow: "About me",
    title: "A space to talk about what is *delicate,* without rushing.",
    summary: (name) =>
      `I'm ${name}, a pelvic physiotherapist. I believe in care where each person is listened to attentively, understands every step and decides together the path of their care.`,
    button: "Get to know my story",
  },

  journeySection: {
    eyebrow: "How care works",
    title: "From first contact to *follow-up,* step by step.",
    details: "See care details",
  },
  journey: [
    {
      title: "First contact",
      text: "You send a message through the contact channel (planned: WhatsApp). No forms, and no need to give clinical details in writing.",
    },
    {
      title: "Scheduling",
      text: "We agree on the best day and time, and you receive guidance for the assessment.",
    },
    {
      title: "Individual assessment",
      text: "A conversation about your history and your symptoms. Each step is explained and only happens with your consent.",
    },
    {
      title: "Plan and follow-up",
      text: "Based on the assessment, we define together an individual plan and how follow-up will work.",
    },
  ],

  differentialsSection: { eyebrow: "What sets it apart", title: "What you can expect from *the care.*" },
  differentials: [
    {
      title: "Individualised care",
      text: "Everyone has a story. Care starts from yours.",
    },
    {
      title: "Listening and support",
      text: "A space to talk about delicate subjects, without hurry and without judgement.",
    },
    {
      title: "Respect for privacy",
      text: "Professional confidentiality and care with every piece of information shared.",
    },
    {
      title: "Steps explained",
      text: "You understand what will be done and why, before any procedure.",
    },
    {
      title: "Individual treatment plan",
      text: "Approaches defined from the assessment and adjusted along the way.",
    },
  ],

  faqSection: {
    eyebrow: "Frequently asked",
    title: "Questions that *often* come up.",
    all: "See all questions",
  },

  location: {
    shortTitle: "Where to find the service",
    soon: "Address, appointment format and opening hours will be announced soon.",
    seeContact: "See contact",
    eyebrow: "Location",
    allChannels: "All contact channels",
  },

  finalCta: {
    eyebrow: "Next step",
    titleWa: "Your care starts with a *conversation.*",
    titleNoWa: "Soon, the first *contact.*",
    textWa:
      "Send a message to book your assessment. No commitment, and no need to detail anything in writing.",
    textNoWa:
      "Contact and booking channels are still being prepared and will be announced here as soon as they are confirmed.",
    buttonWa: "Book via WhatsApp",
    buttonNoWa: "See how it works",
  },

  office: { eyebrow: "Clinic", title: "A space designed for *your comfort.*" },

  contactRows: {
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    address: "Address",
    modality: "Appointment format",
    hours: "Opening hours",
    insurance: "Insurance",
    soon: "Coming soon",
    callWa: "Message on WhatsApp",
    hoursText: (open, close) => `${open} to ${close} (days to be confirmed)`,
    directions: "Get directions",
    venueAt: (venue) => `Appointments at ${venue}`,
    and: "and",
    pending: (names) => `${names}: will be announced here as soon as confirmed.`,
  },

  page: {
    breadcrumbHome: "Home",
    ctaBandTitle: "Shall we talk about your care?",
    ctaFaqTitle: "Still have questions?",
    ctaFaqLabel: "Frequently asked questions",
    ctaHowTitle: "Want to understand the care?",
    ctaHowLabel: "How it works",
    otherAreas: "Other areas",
  },

  home: {
    title: (name, specialty) => `${name} | ${specialty}`,
  },

  how: {
    metaTitle: "How care works",
    metaDescription:
      "From first contact on WhatsApp to follow-up: see what a pelvic physiotherapy assessment is like, with privacy and consent.",
    eyebrow: "How it works",
    title: "Care that is *clear* at every step.",
    lead: "Knowing what will happen helps you arrive more at ease. See the journey and the safeguards that go with it.",
    crumb: "How it works",
    care: [
      [
        "Privacy",
        "Professional confidentiality. On WhatsApp, send only what is needed to book; clinical details are discussed at the assessment.",
      ],
      [
        "Consent",
        "Each step is explained before it happens and only takes place with your understanding and agreement. You can ask to stop at any time.",
      ],
      [
        "Follow-up",
        "The plan is individual and revisited along the way. There is no promise of timeframe or outcome.",
      ],
    ],
  },

  contactPage: {
    metaTitleWa: "Contact and booking",
    metaTitleNoWa: "Contact",
    metaDescWa:
      "Book your pelvic physiotherapy assessment on WhatsApp and see the contact channels.",
    metaDescNoWa:
      "Pelvic physiotherapy contact channels. Service information will be published here as soon as it is confirmed.",
    eyebrow: "Contact",
    title: "Shall we *talk?*",
    leadWa: "Booking is done on WhatsApp, simply and without forms.",
    leadSome: "Booking is not yet available on this website. See the confirmed channels below.",
    leadNone:
      "The contact channels are still being prepared. This page will be updated with confirmed information.",
    schedule: "Book an assessment",
    scheduleText:
      "Click to open a chat with a ready-made first message. Please do not send detailed clinical information by message.",
    callWa: "Message on WhatsApp",
    preparing: "Channels in preparation",
    preparingText:
      "The WhatsApp number for booking will be announced here as soon as it is confirmed. Until then, there is no booking channel available on this website.",
  },

  faqPage: {
    metaTitle: "Frequently asked questions",
    metaDescription:
      "Answers about pelvic physiotherapy, the first appointment, booking and privacy.",
    eyebrow: "FAQ",
    title: "Frequently asked *questions.*",
    leadWa:
      "Educational answers, organised by topic. Still have a question? Just ask through the contact page.",
    leadNoWa: "Educational answers, organised by topic.",
    review: "Review version: the answers are still to be clinically validated by the professional.",
    crumb: "Frequently asked questions",
  },
  faqGroups: [
    {
      topic: "About pelvic physiotherapy",
      items: [
        {
          q: "What is pelvic physiotherapy?",
          a: "It is the area of physiotherapy dedicated to the health of the pelvic region. It looks after the pelvic floor, a group of muscles and tissues that supports organs such as the bladder and bowel and takes part in urinary and bowel control and in sexual function.",
        },
        {
          q: "Can men do it too?",
          a: "Yes. The assessment is for people of any gender who have symptoms or questions about pelvic health.",
        },
        {
          q: "Do I need a diagnosis before seeking care?",
          a: "You can seek an assessment even with questions or symptoms that are not yet clear. If a referral or additional tests are needed, you will be guided during the appointment.",
        },
      ],
    },
    {
      topic: "About the care",
      items: [
        {
          q: "What is the first appointment like?",
          a: "The assessment starts with a conversation about your history and your symptoms. The assessment procedures suited to your case are explained before any step, and nothing is done without your understanding and consent.",
        },
        {
          q: "Does the assessment cause pain or embarrassment?",
          a: "The aim is for you to feel safe. Each step is explained before it happens and only carried out with your consent. If anything is uncomfortable, it can be adjusted or stopped.",
        },
        {
          q: "Do I need a medical referral?",
          a: "The need for a referral will be confirmed by the professional. If a medical assessment or tests are advised, you will be guided during the appointment.",
        },
        {
          q: "How many sessions will I need?",
          a: "It depends on each person and each goal. The plan is defined after the assessment, with no promises of timeframe or outcome.",
        },
        {
          q: "Does the website content replace an appointment?",
          a: "No. The information on this website is educational and does not replace an assessment by a healthcare professional.",
        },
      ],
    },
    {
      topic: "Booking and privacy",
      items: [
        {
          q: "How do I book an assessment?",
          a: "First contact will be through the channel published on this website (planned: WhatsApp). You send a message, agree on the best time and receive guidance for the day.",
        },
        {
          q: "Is care in person? What about fees and insurance?",
          a: "Appointment format, fees and insurance are still to be confirmed and will be published on this website.",
        },
        {
          q: "Is my health information kept confidential?",
          a: "Health information is handled with professional confidentiality. On WhatsApp, send only what is needed to book; clinical details are discussed at the assessment.",
        },
      ],
    },
  ],

  privacy: {
    metaTitle: "Privacy policy",
    metaDescription:
      "How this website handles data: no forms, no sign-up and no third-party tracking.",
    eyebrow: "About the site",
    title: "Privacy *policy.*",
    lead: "Transparency about the little data involved in browsing this website.",
    review:
      "Review version: preliminary text, subject to validation by the professional and to identification of the data controller. It is not a statement of full legal compliance.",
    crumb: "Privacy policy",
    blocks: (name) => [
      [
        "What data this website collects",
        [
          "This website has no forms, sign-up, login area or database. It does not itself collect personal data or health information from visitors.",
          "We do not use advertising cookies or third-party analytics or tracking tools in this version.",
        ],
      ],
      [
        "Contact via WhatsApp",
        [
          "When WhatsApp contact is available, the booking buttons will take you to WhatsApp, a third-party service with its own privacy policy. The first message is standardised and contains no clinical information.",
          "We recommend not sending health details by message; they are discussed at the assessment, under professional confidentiality.",
        ],
      ],
      [
        "External links and hosting",
        [
          "Links to Instagram and Google Maps lead to third-party services governed by their own policies. Videos (Reels) are only loaded from Instagram after you click to watch. Instagram posts are loaded directly from Instagram when you scroll to that part of the page.",
          "The site is hosted on Cloudflare, which may record technical access data (such as IP address) for security and network operation. Typefaces are served by the site itself. Your theme and language choice is saved only in your browser.",
        ],
      ],
      [
        "Your rights",
        [
          `You may request information about how data is handled through the contact channels of ${name}, under the Brazilian General Data Protection Law (LGPD).`,
        ],
      ],
    ],
  },

  about: {
    metaTitle: "About",
    metaDescription: (name) =>
      `Meet ${name}, pelvic physiotherapist: approach to care, training and values.`,
    eyebrow: "About",
    title: (first) => `Nice to meet you, *${first}.*`,
    lead: "A pelvic physiotherapist, with care designed so that each person feels heard and safe.",
    review:
      "Review version: professional background, training and photographs will be added once confirmed.",
    history: "Professional background",
    historyFallback:
      "The full presentation of the professional background will be published once the information is confirmed by Samara herself.",
    education: "Education",
    specializations: "Specialisations",
    courses: "Courses and qualifications",
    approach: "Approach to care",
    crumb: "About",
  },

  treatments: {
    metaTitle: "Treatments and areas of practice",
    metaDescription:
      "Explore the pelvic physiotherapy services: urinary incontinence, overactive bladder, endometriosis, chronic pelvic pain, prolapse, pregnancy and postpartum, and more.",
    eyebrow: "Treatments",
    title: "Areas of *pelvic physiotherapy.*",
    lead: "Topics for which an assessment is commonly sought. The content is educational and does not replace an individual assessment.",
    review: "Review version: the areas of practice are still to be confirmed by the professional.",
    crumb: "Treatments",
    reviewDetail:
      "Review version: this content is awaiting validation by the professional before publication.",
    whenIndicated: "When an assessment may be advised",
    followUpTitle: "How follow-up works",
    followUp:
      "Follow-up is defined after the individual assessment, according to your symptoms and goals. Frequency, duration and approaches are agreed with you, with no promise of timeframe or outcome.",
    disclaimer:
      "This content is educational and does not replace an assessment by a healthcare professional. There is no promise of cure or outcome.",
  },

  notFound: {
    title: "Page not found",
    code: "Error 404",
    heading: "This path doesn't *exist.*",
    text: "The page you are looking for may have moved.",
    home: "Back to home",
    contact: "Talk to Samara",
    how: "How it works",
  },

  services: [
    {
      slug: "disfuncoes-sexuais-femininas",
      title: "Female sexual dysfunction",
      short: "A judgement-free space to talk about intimate pain and discomfort.",
      description:
        "Pain or discomfort in sexual life can be related to the pelvic floor. The conversation is handled with respect, privacy and at your pace.",
      indications: [
        "Pain during penetration or after intercourse",
        "Involuntary muscle contraction that makes penetration difficult or impossible",
        "Feeling of tension or difficulty relaxing the pelvic region",
        "Discomfort that interferes with intimate life",
      ],
    },
    {
      slug: "dor-pelvica",
      title: "Chronic pelvic pain",
      short: "Listening and assessment for persistent pain in the pelvic area.",
      description:
        "Chronic pelvic pain can have different origins and affect sleep, work and intimate life. The physiotherapy assessment considers your history and routine to guide the next steps.",
      indications: [
        "Persistent pain in the pelvic, lower back or perineal region",
        "Pain when sitting for long periods",
        "Pain associated with menstruation, when guided by an assessment",
        "Discomfort when urinating or having a bowel movement with no cause yet identified",
      ],
    },
    {
      slug: "endometriose",
      title: "Endometriosis",
      short: "Support in managing pain and symptoms, alongside medical follow-up.",
      description:
        "Endometriosis is a condition in which tissue similar to the lining of the uterus grows outside it and can cause pain and other symptoms. Pelvic physiotherapy can complement medical treatment by addressing the associated muscle tension and pain.",
      indications: [
        "Pelvic pain or intense cramps associated with endometriosis",
        "Pain during sexual intercourse",
        "Urinary or bowel symptoms that follow the menstrual cycle",
        "Tension in the pelvic floor muscles and lower back",
      ],
    },
    {
      slug: "incontinencia-urinaria",
      title: "Urinary incontinence in women and men",
      short: "Assessment of involuntary urine leakage, in women and men.",
      description:
        "Involuntary urine leakage is a common concern, but it need not be treated as normal or inevitable. A physiotherapy assessment helps to understand each person's context, whether a woman or a man.",
      indications: [
        "Urine leakage when coughing, sneezing, laughing or exercising",
        "Strong urgency to urinate",
        "Urine leakage after pelvic surgery, such as prostate surgery",
        "Fear of leaving home or doing activities because of the problem",
      ],
    },
    {
      slug: "bexiga-hiperativa",
      title: "Overactive bladder",
      short: "Assessment of urinary urgency and frequency that get in the way of your routine.",
      description:
        "With an overactive bladder, the urge to urinate comes on suddenly and strongly, sometimes with urine leakage. When this starts to limit your routine, it is possible to investigate the cause and treat it.",
      indications: [
        "Sudden, intense urgency to urinate",
        "Going to the bathroom more often than usual",
        "Waking up several times at night to urinate",
        "Urine leakage that comes with the urgency",
      ],
    },
    {
      slug: "retencao-urinaria",
      title: "Urinary retention",
      short: "Assessment of difficulty emptying the bladder.",
      description:
        "In urinary retention, the bladder does not empty completely or it is hard to start urinating. The assessment helps to understand the role of the pelvic floor and to indicate when it is also important to seek a medical evaluation.",
      indications: [
        "Difficulty starting to urinate",
        "A weak stream, or one that stops and starts",
        "Feeling that the bladder has not emptied completely",
        "Needing to strain to urinate",
      ],
    },
    {
      slug: "prolapso-de-orgaos-pelvicos",
      title: "Pelvic organ prolapse",
      short: "Assessment of heaviness or \"dropping\" of the pelvic organs.",
      description:
        "In prolapse, organs such as the bladder, uterus or rectum descend towards the vagina because of reduced support. Pelvic physiotherapy can be part of conservative care, and the assessment indicates when other approaches are needed.",
      indications: [
        "Feeling of heaviness or a \"bulge\" in the genital area",
        "Feeling that something is coming out of the vagina",
        "Discomfort that gets worse after standing for a long time",
        "Associated urinary or bowel symptoms",
      ],
    },
    {
      slug: "constipacao",
      title: "Constipation",
      short: "Assessment of constipation and difficulty having a bowel movement.",
      description:
        "Constipation can be linked to the coordination and relaxation of the pelvic floor muscles, as well as habits and other factors. The assessment helps to understand what is contributing in your case.",
      indications: [
        "Excessive straining to have a bowel movement",
        "Hard stools or incomplete emptying",
        "Feeling of a blockage when trying to go",
        "Constipation that persists over time",
      ],
    },
    {
      slug: "prostatectomia-radical",
      title: "Pre- and post-operative care for radical prostatectomy",
      short: "Preparing and recovering the pelvic floor around prostate surgery.",
      description:
        "Radical prostatectomy is surgery to remove the prostate. Pelvic physiotherapy can guide preparation of the pelvic floor before surgery and support recovery afterwards, in line with clearance from the medical team.",
      indications: [
        "Preparing the pelvic floor before surgery",
        "Urine leakage after prostatectomy",
        "Guidance for recovery, as cleared by your doctor",
        "Questions about what to expect before and after the operation",
      ],
    },
    {
      slug: "gestacao-e-pos-parto",
      title: "Pregnancy and postpartum",
      short: "Support for the body during and after pregnancy.",
      description:
        "Pregnancy and childbirth bring important changes to the body. Pelvic physiotherapy can guide care of the pelvic floor before and after birth, respecting your moment.",
      indications: [
        "Questions about preparing the body for birth",
        "Urine leakage during or after pregnancy",
        "Pelvic or lower back pain during pregnancy",
        "Care for recovery after birth, as cleared by your professionals",
      ],
    },
  ],

  content: {
    eyebrow: "Educational content",
    title: "Clear information to *look after* yourself.",
    lead: "Informative videos, posts and articles. They do not replace an individual assessment.",
    videos: "Videos",
    articles: "Articles",
    seeAll: "See all content",
    metaTitle: "Educational content",
    metaDescription:
      "Informative videos and articles about pelvic physiotherapy. The content is educational and does not replace an individual assessment.",
    pageEyebrow: "Content",
    pageTitle: "Educational *content.*",
    pageLead:
      "Videos, posts and articles about pelvic health. They are informative and do not replace an assessment by a healthcare professional.",
    crumb: "Content",
    empty: "Educational content will be published here once reviewed by the professional.",
    watch: "Watch here",
    posts: "Posts",
    postTitle: (n) => `Post ${n}`,
    postHint: "Original post on Instagram.",
    playerPost: (n) => `Instagram post ${n}`,
    openIg: "View on Instagram",
    igNote:
      "The content is loaded from Instagram only after you click; Instagram may record data about your visit.",
    player: (title) => `Reel player: ${title}`,
    demo: "DEVELOPMENT SAMPLE",
    read: "Read article",
    back: "All content",
    disclaimer:
      "This content is educational and does not replace an assessment by a healthcare professional. There is no promise of cure or outcome.",
    categories: {
      geral: "Pelvic health",
      gestacao: "Pregnancy and postpartum",
      incontinencia: "Urinary incontinence",
      dor: "Pelvic pain",
      intimidade: "Intimate health",
    },
  },
  reviews: {
    eyebrow: "Reviews",
    title: "What people say *about* the care.",
    lead: "Reviews published on Google, transcribed with the permission of the people who wrote them.",
    source: "Google review",
    demo: "TEST REVIEW — fictional, not from a real patient",
    seeAll: "See reviews on Google",
    stars: (n) => `${n} out of 5 stars`,
  },

  jobTitle: "Pelvic physiotherapist",
};
