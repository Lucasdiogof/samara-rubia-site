import type { Dict } from "./pt";

/** English draft: to be reviewed by Samara before the language is released for indexing. */
export const en: Dict = {
  specialty: "Pelvic Physiotherapy",
  siteDescription: (wa) =>
    `Pelvic physiotherapist in Goiânia, Brazil (Setor Marista). Pelvic physiotherapy for women and men with individual assessment and a welcoming approach.${wa ? " Book via WhatsApp." : ""}`,

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
  },

  hero: {
    eyebrow: "Pelvic Physiotherapy in Goiânia",
    about: "See my work",
    title: "*Samara Rúbia* Pelvic Physiotherapist",
    lead: "Humanised care for women and men, focused on intimate health, function, well-being and quality of life.",
  },

  pelvic: {
    eyebrow: "Pelvic health",
    title: "What is Pelvic Physiotherapy and what does it *treat?*",
    text: "Pelvic physiotherapy works in the prevention and treatment of pelvic floor disorders related to urinary, bowel and sexual function, promoting health and quality of life for men and women.",
    all: "Explore all treatments",
  },

  aboutTeaser: {
    eyebrow: "About me",
    heading: "Specialised care for your *pelvic floor*",
    body: [
      "Graduated in Physiotherapy from the Pontifical Catholic University of Goiás, with specialised training in Pelvic Physiotherapy and five years of professional practice in Goiânia.",
      "My work is dedicated to the pelvic health of women and men, aiming to promote comfort, autonomy and quality of life.",
      "I believe in care that combines scientific knowledge, attentive listening and respect for the individuality of each patient.",
    ] as string[],
    title: "A space to talk about what is *delicate,* without rushing.",
    summary: (name) =>
      `I'm ${name}, a pelvic physiotherapist. I believe in care where each person is listened to attentively, understands every step and decides together the path of their care.`,
    button: "Get to know my story",
  },

  signals: {
    eyebrow: "A moment for you",
    title: "Do you relate to any of these *situations?*",
    subtitle: "Select the situations that are part of your daily life.",
    group: "Everyday situations",
    of: "of",
    selected: ["0 selected", "1 selected", "{n} selected"],
    counter: "Situations selected",
    items: [
      { title: "Urinary leakage", text: "I leak urine when I laugh, cough, sneeze or exercise." },
      { title: "Urinary urgency", text: "I feel a sudden urge to urinate and have to rush to the bathroom." },
      { title: "Interrupted sleep", text: "I wake up at night to urinate and it disrupts my rest." },
      { title: "Prevention", text: "I wear pads or liners for fear of leaking urine." },
      { title: "Movement", text: "I avoid physical activity for fear of leaks or discomfort." },
      { title: "Pelvic discomfort", text: "I feel pain, pressure or heaviness in the pelvic area." },
      { title: "Intimate health", text: "I feel pain or discomfort during sexual intercourse." },
      { title: "Bowel function", text: "I have difficulty passing stool or feel I haven't emptied completely." },
    ],
    /** 0, 1, 2–3, 4–5, 6–8 selecionados. Mensagens educativas: nunca pontuação, risco ou gravidade. */
    states: [
      { title: "Is any of this part of your routine?", text: "Select the options you relate to." },
      { title: "Has this ever happened to you?", text: "If this happens often or causes discomfort, it's worth looking into." },
      { title: "Is this getting in the way of your day-to-day life?", text: "Understanding what is causing these symptoms is important to choose the right treatment." },
      { title: "How long have you been living with these symptoms?", text: "A physiotherapy assessment can help understand your complaints and guide treatment." },
      { title: "How about talking about what you're feeling?", text: "In the appointment, we can assess these complaints calmly and work out which care makes sense for your case." },
    ],
  },

  journeySection: {
    eyebrow: "How care works",
    title: "From first contact to *follow-up,* step by step.",
    details: "See care details",
  },
  journey: [
    {
      title: "First contact",
      text: "You send a message to the professional WhatsApp number. No forms, and no need to share clinical details in writing.",
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
    hoursText: (open, close) => `${open} to ${close}`,
    hoursNote: "Monday to Friday",
    modalities: { presencial: "In person", online: "Online" },
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
    title: (name, specialty) => `${name} | ${specialty} in Goiânia`,
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
        "The plan is revisited along the way.",
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
          a: "It depends on each person and each goal. The plan is defined after the assessment.",
        },
      ],
    },
    {
      topic: "Booking and privacy",
      items: [
        {
          q: "How do I book an assessment?",
          a: "To book an assessment, message the professional WhatsApp number, agree on an appointment time and receive guidance for the day.",
        },
        {
          q: "Is care in person? What about fees and insurance?",
          a: "Care is offered in person in Goiânia (address in the Location section) and also online, Monday to Friday. Please confirm fees and insurance directly via WhatsApp.",
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
          "When you select a booking button, you are taken to WhatsApp, a third-party service with its own privacy policy. The first message is standardised and contains no clinical information.",
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
    eyebrow: "About me",
    title: (first) => `Nice to meet you, *${first}.*`,
    pageTitle: "My professional *journey.*",
    lead: "Learn about my training, experience and the way I work in pelvic physiotherapy.",
    review:
      "Review version: professional background, training and photographs will be added once confirmed.",
    history: "Professional background",
    historyFallback:
      "The full presentation of the professional background will be published once the information is confirmed by Samara herself.",
    education: "Education",
    specializations: "Specialisations",
    courses: "Courses and qualifications",
    approach: "How I conduct my appointments",
    crumb: "About",
    story: [
      "I graduated in Physiotherapy from the Pontifical Catholic University of Goiás (PUC Goiás) and have worked in Goiânia for five years, with specialised training in Pelvic Physiotherapy.",
      "My clinical practice is dedicated to the pelvic health of women and men, focusing on the prevention and treatment of urinary, bowel and sexual dysfunctions.",
      "I constantly work to improve my knowledge so that I can offer treatments grounded in scientific evidence and suited to each patient's needs.",
    ] as string[],
    approachItems: [
      { title: "Detailed assessment", text: "Investigation of symptoms, clinical history and lifestyle habits." },
      { title: "Listening and respect", text: "Freedom to talk about intimate matters, without embarrassment or judgement." },
      { title: "Evidence-based practice", text: "Therapeutic approaches grounded in scientific knowledge." },
      { title: "Monitoring progress", text: "Reassessment and adjustment of treatment as the clinical picture evolves." },
    ],
  },

  treatments: {
    metaTitle: "Treatments and areas of practice",
    metaDescription:
      "Explore the pelvic physiotherapy services: urinary incontinence, overactive bladder, endometriosis, chronic pelvic pain, prolapse, pregnancy and postpartum, and more.",
    eyebrow: "Treatments",
    title: "Areas of *pelvic physiotherapy.*",
    lead: "Explore the areas where pelvic physiotherapy can help and choose a topic to learn more.",
    review: "Review version: the areas of practice are still to be confirmed by the professional.",
    crumb: "Treatments",
    reviewDetail:
      "Review version: this content is awaiting validation by the professional before publication.",
    whenIndicated: "When an assessment may be advised",
    followUpTitle: "How follow-up works",
    followUp:
      "Follow-up is defined after the individual assessment, according to your symptoms and goals. Frequency, duration and approaches are agreed with you.",
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
      title: "Sexual dysfunctions",
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
      slug: "dor-na-relacao",
      title: "Pain during intercourse",
      short: "Assessment of pain or discomfort during or after sexual intercourse.",
      description:
        "Pain during intercourse can be linked to tension or increased sensitivity of the pelvic floor muscles, among other factors. The assessment helps understand where the complaint comes from and define the treatment, through a calm conversation and at your own pace.",
      indications: [
        "Pain on penetration",
        "Pain during or after intercourse",
        "Burning or sensitivity at the vaginal entrance",
        "Apprehension or tension before intercourse because of pain",
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
      title: "Urinary incontinence",
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
    videos: "Videos",
    articles: "Articles",
    seeAll: "See all content",
    metaTitle: "Educational content",
    metaDescription:
      "Informative videos and articles about pelvic physiotherapy.",
    pageEyebrow: "Content",
    pageTitle: "Educational *content.*",
    crumb: "Content",
    empty: "Educational content will be published here once reviewed by the professional.",
    watch: "Watch here",
    postTitle: (n) => `Post ${n}`,
    postHint: "Original post on Instagram.",
    playerPost: (n) => `Instagram post ${n}`,
    openIg: "View on Instagram",
    postsCarousel: "Instagram posts",
    prev: "Previous post",
    next: "Next post",
    goTo: (n) => `Go to post ${n}`,
    igNote:
      "The content is loaded from Instagram only after you click; Instagram may record data about your visit.",
    player: (title) => `Reel player: ${title}`,
    demo: "DEVELOPMENT SAMPLE",
    read: "Read article",
    back: "All content",
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
    lead: "Selected 5-star Google reviews, published with the authors' permission. Original texts; not all reviews are shown.",
    source: "Google review",
    demo: "TEST REVIEW — fictional, not from a real patient",
    seeAll: "See reviews on Google",
    stars: (n) => `${n} out of 5 stars`,
  },

  jobTitle: "Pelvic physiotherapist",
};
