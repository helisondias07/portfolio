export type Lang = "pt" | "en";

export type Segment = readonly [text: string, em: boolean];
export type TermLine = readonly [label: string, value: string];
export type TermCmd = readonly [command: string, lines: readonly TermLine[]];

export type Skill = { readonly title: string; readonly body: string; readonly wide?: boolean };

export type Dict = {
  meta: { title: string; description: string; htmlLang: string; locale: string };
  nav: { about: string; projects: string; contact: string };
  langToggle: { label: string };
  theme: { label: string };
  hero: {
    tag: string;
    headline: string;
    terminal: string;
    now: string;
    nowLine: string;
    online: string;
    message: string;
    space: string;
    hintKb: string;
    hintTab: string;
    hintPh: string;
    hintTabChat: string;
    hintPhChat: string;
    location: string;
    published: string;
    cmds: readonly TermCmd[];
    messages: readonly string[];
  };
  about: {
    kicker: string;
    bio: readonly Segment[];
    counters: { projects: string; years: string; months: string; yearsAria: string; experience: string };
    skills: readonly Skill[];
  };
  projectsUi: {
    kicker: string;
    title: string;
    lede: string;
    featured: string;
    carousel: string;
    carouselLabel: string;
    prev: string;
    next: string;
    dots: string;
    select: string;
    preview: string;
    visit: string;
    visitSite: string;
    clickDetails: string;
    goTo: string;
    desktop: string;
    mobile: string;
    overview: string;
    roleFallback: string;
  };
  contact: {
    kicker: string;
    lets: string;
    talk: string;
    lede: string;
    email: string;
    cv: string;
    location: string;
  };
  newsletter: {
    blurb: string;
    placeholder: string;
    submit: string;
    invalid: string;
    sending: string;
    ok: string;
    rate: string;
    off: string;
    fail: string;
  };
  perf: { badge: string; measured: string; device: string; practices: string };
};

const stackBody = "React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Scriban, Python, N8N";

export const dict: Record<Lang, Dict> = {
  pt: {
    meta: {
      title: "Helison Dias — Frontend Developer & IA Engineer",
      description:
        "Helison Dias — desenvolvedor frontend em e-commerce (Wake, Nuvemshop) e automação com IA. React, Next.js, Vue.js e TypeScript. Nova Friburgo, RJ.",
      htmlLang: "pt-BR",
      locale: "pt_BR",
    },
    nav: { about: "Sobre", projects: "Projetos", contact: "Contato" },
    langToggle: { label: "Idioma: português. Mudar para inglês" },
    theme: { label: "Alternar tema claro/escuro" },
    hero: {
      tag: "Desenvolvedor Frontend & IA Engineer",
      headline: "interfaces que vendem, automações que trabalham por você.",
      terminal: "Terminal",
      now: "AGORA",
      nowLine: "Helison · agora",
      online: "online",
      message: "Mensagem",
      space: "espaço",
      hintKb: "Digite no seu teclado",
      hintTab: "Tablet · teclado aberto",
      hintPh: "Celular · teclado aberto",
      hintTabChat: "Tablet · conversa",
      hintPhChat: "Celular · conversa",
      location: "Nova Friburgo, RJ",
      published: "15+ projetos publicados",
      cmds: [
        ["sobreMim", [
          ["", "Helison Dias"],
          ["", "Desenvolvedor Frontend e Automação com IA"],
          ["", "Nova Friburgo, RJ"],
        ]],
        ["exp", [
          ["jan/2025 – atual", "Dev Frontend Júnior · Agência Oásis"],
          ["abr/2024 – jan/2025", "Estagiário Frontend · Agência Oásis"],
          ["", "→ 15+ projetos publicados"],
        ]],
        ["stack", [
          ["frontend", "React · Next.js · Vue.js · TypeScript · Tailwind"],
          ["e-commerce", "Wake · Scriban · Nuvemshop"],
          ["ia", "Claude Code · Codex CLI · N8N"],
          ["testes", "Jest · RTL · Vitest · Playwright"],
        ]],
        ["contato", [
          ["email", "helisondias07@gmail.com"],
          ["linkedin", "linkedin.com/in/helisondias"],
          ["github", "github.com/helisondias07"],
        ]],
      ],
      messages: [
        "Helison Dias",
        "Desenvolvedor Frontend & Automação com IA",
        "2 anos e 6 meses de experiência, desde abr/2024 na Agência Oásis",
        "React",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Wake Platform",
        "Nuvemshop",
        "N8N",
        "Claude Code",
        "Codex CLI",
      ],
    },
    about: {
      kicker: "Sobre",
      bio: [
        ["Sou Helison, desenvolvedor", false],
        ["frontend", true],
        ["há mais de 2 anos na Agência Oásis, de estagiário a júnior, unindo", false],
        ["e-commerce", true],
        ["e", false],
        ["automação com IA", true],
        [". Entrego storefronts em", false],
        ["React, Next.js, Vue.js e TypeScript", true],
        ["na plataforma", false],
        ["Wake", true],
        ["e participei da publicação de", false],
        ["mais de 10 lojas", true],
        ["em produção, com listagens dinâmicas, filtros em tempo real, checkout e campanhas de alto tráfego. Também atuo com migrações e temas na", false],
        ["Nuvemshop", true],
        [". No dia a dia, trabalho com", false],
        ["agentes de IA", true],
        ["e seus ecossistemas para automatizar tarefas e acelerar o desenvolvimento. Estou em Nova Friburgo, RJ, trabalhando remoto.", false],
      ],
      counters: {
        projects: "projetos publicados",
        years: "anos e",
        months: "meses",
        yearsAria: "2 anos e 6 meses",
        experience: "experiência em tecnologia",
      },
      skills: [
        { title: "Stack", body: stackBody },
        { title: "Plataformas", body: "Wake, Nuvemshop, integrações REST" },
        {
          title: "IA no fluxo de trabalho",
          wide: true,
          body: "Construo ecossistemas de agentes de IA que trabalham em conjunto: agentes especializados por função, servidores MCP integrados às plataformas de e-commerce, revisão visual automatizada e memória com lições aprendidas. Uso IA generativa de código no dia a dia para transformar designs em interfaces, refatorar e acelerar entregas, sempre com revisão humana no fim.",
        },
        { title: "Formação", body: "Ciência da Computação (Estácio), em andamento. Inglês C1" },
      ],
    },
    projectsUi: {
      kicker: "Cases selecionados",
      title: "Projetos",
      lede: "Projetos em e-commerce, integrações e automação aplicados a interfaces reais.",
      featured: "Case em destaque",
      carousel: "carrossel",
      carouselLabel: "Projetos",
      prev: "Projeto anterior",
      next: "Próximo projeto",
      dots: "Indicadores de projeto",
      select: "Selecionar projeto: ",
      preview: "Prévia do projeto: ",
      visit: "Visitar site ↗",
      visitSite: "Visitar site",
      clickDetails: "Clique para ver detalhes",
      goTo: "Ir para ",
      desktop: "versão desktop",
      mobile: "versão mobile",
      overview: "Visão geral",
      roleFallback: "Minha atuação",
    },
    contact: {
      kicker: "Contato",
      lets: "Vamos",
      talk: "conversar?",
      lede: "Frontend Developer, e-commerce e automação com IA. Aberto a oportunidades remotas. Fale comigo por onde preferir.",
      email: "E-mail",
      cv: "Baixar CV",
      location: "Nova Friburgo, RJ",
    },
    newsletter: {
      blurb: "Novidades sobre projetos e o que ando construindo. Sem spam.",
      placeholder: "seu@email.com",
      submit: "Inscrever",
      invalid: "Digite um e-mail válido.",
      sending: "Enviando…",
      ok: "Pronto! Enviei uma confirmação para {email}.",
      rate: "Muitas tentativas. Tente novamente mais tarde.",
      off: "A newsletter ainda não está ativa. Fale comigo pelo WhatsApp ou LinkedIn.",
      fail: "Não foi possível inscrever agora. Tente novamente em instantes.",
    },
    perf: {
      badge: "Selo de performance Lighthouse",
      measured: "medido em",
      device: "Dispositivo",
      practices: "Práticas",
    },
  },
  en: {
    meta: {
      title: "Helison Dias — Frontend Developer & AI Engineer",
      description:
        "Helison Dias — frontend developer building e-commerce (Wake, Nuvemshop) and AI automation. React, Next.js, Vue.js, and TypeScript. Based in Nova Friburgo, Brazil.",
      htmlLang: "en",
      locale: "en_US",
    },
    nav: { about: "About", projects: "Projects", contact: "Contact" },
    langToggle: { label: "Language: English. Switch to Portuguese" },
    theme: { label: "Toggle light and dark theme" },
    hero: {
      tag: "Frontend Developer & AI Engineer",
      headline: "interfaces that sell, automation that works for you.",
      terminal: "Terminal",
      now: "NOW",
      nowLine: "Helison · now",
      online: "online",
      message: "Message",
      space: "space",
      hintKb: "Type on your keyboard",
      hintTab: "Tablet · keyboard open",
      hintPh: "Phone · keyboard open",
      hintTabChat: "Tablet · chat",
      hintPhChat: "Phone · chat",
      location: "Nova Friburgo, Brazil",
      published: "15+ shipped projects",
      cmds: [
        ["about", [
          ["", "Helison Dias"],
          ["", "Frontend Developer and AI Automation"],
          ["", "Nova Friburgo, Brazil"],
        ]],
        ["exp", [
          ["Jan 2025 – present", "Junior Frontend Developer · Agência Oásis"],
          ["Apr 2024 – Jan 2025", "Frontend Intern · Agência Oásis"],
          ["", "→ 15+ shipped projects"],
        ]],
        ["stack", [
          ["frontend", "React · Next.js · Vue.js · TypeScript · Tailwind"],
          ["e-commerce", "Wake · Scriban · Nuvemshop"],
          ["ai", "Claude Code · Codex CLI · N8N"],
          ["testing", "Jest · RTL · Vitest · Playwright"],
        ]],
        ["contact", [
          ["email", "helisondias07@gmail.com"],
          ["linkedin", "linkedin.com/in/helisondias"],
          ["github", "github.com/helisondias07"],
        ]],
      ],
      messages: [
        "Helison Dias",
        "Frontend Developer & AI Automation",
        "2 years and 6 months of experience, at Agência Oásis since Apr 2024",
        "React",
        "Next.js",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Wake Platform",
        "Nuvemshop",
        "N8N",
        "Claude Code",
        "Codex CLI",
      ],
    },
    about: {
      kicker: "About",
      bio: [
        ["I'm Helison, a", false],
        ["frontend", true],
        ["developer with over 2 years at Agência Oásis, from intern to junior, working across", false],
        ["e-commerce", true],
        ["and", false],
        ["AI automation", true],
        [". I ship storefronts in", false],
        ["React, Next.js, Vue.js, and TypeScript", true],
        ["on the", false],
        ["Wake", true],
        ["platform, and I've been part of launching", false],
        ["more than 10 stores", true],
        ["to production, with dynamic listings, real-time filters, checkout, and high-traffic campaigns. I also work on migrations and themes on", false],
        ["Nuvemshop", true],
        [". Day to day, I work with", false],
        ["AI agents", true],
        ["and their ecosystems to automate tasks and speed up development. I'm based in Nova Friburgo, RJ, Brazil, working remotely.", false],
      ],
      counters: {
        projects: "shipped projects",
        years: "years,",
        months: "months",
        yearsAria: "2 years and 6 months",
        experience: "experience in tech",
      },
      skills: [
        { title: "Stack", body: stackBody },
        { title: "Platforms", body: "Wake, Nuvemshop, REST integrations" },
        {
          title: "AI in the workflow",
          wide: true,
          body: "I build ecosystems of AI agents that work together: role-specific agents, MCP servers connected to the e-commerce platforms, automated visual review, and a memory of lessons learned. I use generative AI for code every day to turn designs into interfaces, refactor, and ship faster, always with a human review at the end.",
        },
        { title: "Education", body: "Computer Science (Estácio), in progress. English C1" },
      ],
    },
    projectsUi: {
      kicker: "Selected work",
      title: "Projects",
      lede: "E-commerce, integrations, and automation, applied to real interfaces.",
      featured: "Featured case",
      carousel: "carousel",
      carouselLabel: "Projects",
      prev: "Previous project",
      next: "Next project",
      dots: "Project indicators",
      select: "Select project: ",
      preview: "Project preview: ",
      visit: "Visit site ↗",
      visitSite: "Visit site",
      clickDetails: "Click for details",
      goTo: "Go to ",
      desktop: "desktop view",
      mobile: "mobile view",
      overview: "Overview",
      roleFallback: "What I did",
    },
    contact: {
      kicker: "Contact",
      lets: "Let's",
      talk: "talk?",
      lede: "Frontend developer working across e-commerce and AI automation. Open to remote roles. Get in touch however you prefer.",
      email: "Email",
      cv: "Download CV",
      location: "Nova Friburgo, Brazil",
    },
    newsletter: {
      blurb: "Updates on projects and what I'm building. No spam.",
      placeholder: "you@email.com",
      submit: "Subscribe",
      invalid: "Enter a valid email.",
      sending: "Sending…",
      ok: "You're subscribed. I sent a confirmation to {email}.",
      rate: "Too many attempts. Try again later.",
      off: "The newsletter isn't live yet. Reach me on WhatsApp or LinkedIn.",
      fail: "Couldn't subscribe right now. Try again in a moment.",
    },
    perf: {
      badge: "Lighthouse performance badge",
      measured: "measured on",
      device: "Device",
      practices: "Best",
    },
  },
};
