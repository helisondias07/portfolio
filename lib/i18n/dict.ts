export type Lang = "pt" | "en";

export type Segment = readonly [text: string, em: boolean];
export type TermLine = readonly [label: string, value: string];
export type TermCmd = readonly [command: string, lines: readonly TermLine[]];

export type Skill = { readonly title: string; readonly body: string; readonly wide?: boolean };
export type Role = {
  readonly title: string;
  readonly when: string;
  readonly where: string;
  readonly bullets: readonly string[];
};
export type Listed = { readonly name: string; readonly detail: string; readonly href?: string };

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
    counters: { projects: string; since: string; yearsAria: string; experience: string };
    experienceKicker: string;
    roles: readonly Role[];
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
    alsoKicker: string;
    alsoLede: string;
    also: readonly Listed[];
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

const iaPt =
  "Supfy: rota Next.js (POST /api/orders) que envia pedidos de WhatsApp em texto livre a um webhook n8n autenticado por segredo, com validação de corpo (400), timeout de 15 s, type guards e fallback para parser local. Preço e estoque são sempre conferidos na aplicação. Painel que orquestra agentes de IA via Cursor SDK, com streaming, cancelamento, heartbeat de progresso e verificação visual automática. Integração com a API oficial do WhatsApp Business. Oasis-bot: bot/agente interno com n8n e IA na Agência Oásis. Uso diário de Claude Code e Codex CLI para geração, refatoração e automação de tarefas. Noções de MCP (Model Context Protocol).";

const iaEn =
  "Supfy: a Next.js route (POST /api/orders) sends free-text WhatsApp orders to an n8n webhook authenticated with a secret, with body validation (400), a 15s timeout, type guards, and a fallback to the local parser. Price and stock are always checked in the application. A panel that orchestrates AI agents through the Cursor SDK, with streaming, cancellation, a progress heartbeat, and automatic visual verification. Integration with the official WhatsApp Business API. Oasis-bot: an internal bot/agent at Agência Oásis, using n8n and AI. Daily use of Claude Code and Codex CLI to generate, refactor, and automate tasks. Working knowledge of MCP (Model Context Protocol).";

export const dict: Record<Lang, Dict> = {
  pt: {
    meta: {
      title: "Helison Dias — Desenvolvedor Fullstack / Frontend",
      description:
        "Helison Dias — desenvolvedor fullstack e frontend desde 2023. React, Next.js, TypeScript, Node.js e IA aplicada (LLMs, agentes, n8n). Bom Jardim, RJ — remoto.",
      htmlLang: "pt-BR",
      locale: "pt_BR",
    },
    nav: { about: "Sobre", projects: "Projetos", contact: "Contato" },
    langToggle: { label: "Idioma: português. Mudar para inglês" },
    theme: { label: "Alternar tema claro/escuro" },
    hero: {
      tag: "Desenvolvedor Fullstack / Frontend · IA aplicada",
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
      location: "Bom Jardim, RJ — Remoto",
      published: "10+ e-commerces em produção",
      cmds: [
        ["sobreMim", [
          ["", "Helison Dias"],
          ["", "Fullstack / Frontend · IA aplicada"],
          ["", "Bom Jardim, RJ — Remoto"],
        ]],
        ["exp", [
          ["jan/2025 – atual", "Dev Frontend Júnior · Agência Oásis"],
          ["abr/2024 – jan/2025", "Estagiário Frontend · Agência Oásis"],
          ["out/2023 – abr/2024", "Freelancer web · projetos independentes"],
        ]],
        ["stack", [
          ["frontend", "React · Next.js · TypeScript · Node.js"],
          ["e-commerce", "Wake · Nuvemshop · Scriban"],
          ["ia", "LLMs · n8n · Claude Code · Cursor"],
          ["testes", "Jest · RTL · Vitest · Playwright"],
        ]],
        ["contato", [
          ["email", "helisondias07@gmail.com"],
          ["telefone", "+55 22 98104-0084"],
          ["linkedin", "linkedin.com/in/helisondias"],
          ["github", "github.com/helisondias07"],
        ]],
      ],
      messages: [
        "Helison Dias",
        "Desenvolvedor Fullstack / Frontend",
        "IA aplicada: LLMs, agentes e n8n",
        "Desde 2023 · Agência Oásis desde abr/2024",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Wake",
        "Nuvemshop",
        "n8n",
        "Claude Code",
        "Cursor",
      ],
    },
    about: {
      kicker: "Sobre",
      bio: [
        ["Sou Helison, desenvolvedor", false],
        ["fullstack e frontend", true],
        ["desde 2023. Freelas a partir de outubro de 2023; na Agência Oásis, estágio desde abril de 2024 e júnior desde janeiro de 2025. Entrego interfaces em", false],
        ["React, Next.js, TypeScript e Node.js", true],
        ["com REST APIs e", false],
        ["mais de 10 e-commerces", true],
        ["em produção (Wake e Nuvemshop), com performance, acessibilidade, SEO e testes. Em IA aplicada, integro LLMs por API e construo", false],
        ["automações e agentes", true],
        ["com n8n, webhooks e a API oficial do WhatsApp Business, usando Claude Code, Codex CLI e Cursor. Trabalho remoto em Bom Jardim, RJ. Curso Ciência da Computação na Estácio, com conclusão prevista para dezembro de 2027, e busco vagas remotas júnior ou pleno em Frontend, Fullstack ou IA e automação.", false],
      ],
      counters: {
        projects: "e-commerces em produção",
        since: "desde",
        yearsAria: "desde 2023",
        experience: "desenvolvimento web",
      },
      experienceKicker: "Experiência",
      roles: [
        {
          title: "Desenvolvedor Frontend (Júnior) · Grupo Oásis (Agência Oásis)",
          when: "jan/2025 – atual",
          where: "Remoto — Bom Jardim, RJ. Efetivado após o estágio. Lojas Wake em time ágil remoto (Scrum/Kanban, ClickUp, Git/GitLab, Figma).",
          bullets: [
            "UIs de e-commerce responsivas com React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3/SCSS e Tailwind CSS em várias lojas ao mesmo tempo.",
            "REST APIs para listagens dinâmicas, filtros em tempo real e fluxos de checkout. Módulos Wake e templates Scriban para landing pages e vitrines.",
            "Componentes reutilizáveis e testes com Jest e React Testing Library. Testes cross-browser em campanhas de alto tráfego.",
            "Claude Code e Codex CLI no fluxo diário para geração, refatoração e automação. Workflows de agente no pipeline de desenvolvimento e conteúdo.",
            "Código versionado em Git/GitLab, sprints quinzenais. Contribuição para 10+ lojas em produção na Wake Platform.",
          ],
        },
        {
          title: "Estagiário de Desenvolvimento Frontend · Grupo Oásis (Agência Oásis)",
          when: "abr/2024 – jan/2025",
          where: "Remoto — Bom Jardim, RJ.",
          bullets: [
            "Colaboração com seniores em e-commerce React/JavaScript/Wake. Componentes reutilizáveis e correções em produção.",
            "Testes cross-browser e responsivos para campanhas promocionais.",
          ],
        },
        {
          title: "Desenvolvedor Web Freelancer · Projetos independentes",
          when: "out/2023 – abr/2024",
          where: "Remoto.",
          bullets: [
            "Estudo e desenvolvimento de projetos web freelancer com HTML, CSS, JavaScript e React.",
          ],
        },
      ],
      skills: [
        { title: "IA aplicada e automação", wide: true, body: iaPt },
        { title: "Linguagens", body: "JavaScript, TypeScript, HTML5, CSS3, SQL (PostgreSQL, MySQL), Python (FastAPI)" },
        { title: "Frontend", body: "React, Next.js, Vue.js, Vite, Redux, Zustand, Tailwind CSS, Sass/SCSS, Styled-components, Framer Motion, Mantine, Design System, acessibilidade (WCAG), SEO, performance e Core Web Vitals, responsividade" },
        { title: "Backend e APIs", body: "Node.js, Express, NestJS, REST APIs, GraphQL, Webhooks, WebSockets, Firebase (Firestore, Auth), microsserviços, mensageria (RabbitMQ, Kafka, SQS)" },
        { title: "Bancos de dados", body: "SQL (PostgreSQL, MySQL), ORM (Prisma), MongoDB, Redis, Firestore, pgvector" },
        { title: "IA e automação", body: "IA generativa (GenAI), LLMs, Machine Learning (fundamentos), OpenAI API, Claude/Anthropic API, agentes de IA, Prompt Engineering, RAG, Embeddings, LangChain, LangGraph, MCP, n8n, Make/Zapier, API oficial do WhatsApp Business, Cursor, Claude Code, Codex CLI, GitHub Copilot" },
        { title: "Testes e qualidade", body: "Jest, Testing Library, Vitest, Playwright, pytest, testes E2E, Clean Code, SOLID" },
        { title: "DevOps e cloud", body: "Git, GitHub, GitLab, CI/CD (GitHub Actions), Docker, Kubernetes, cloud (AWS, Azure, GCP), Vercel, Linux" },
        { title: "Dados", body: "pandas, scipy, testes A/B" },
        { title: "E-commerce", body: "Wake Platform, Scriban, Nuvemshop, Go Template, VTEX" },
        { title: "Métodos e ferramentas", body: "Scrum, Kanban, Figma, ClickUp, trabalho remoto, trabalho em equipe, autonomia, comunicação" },
        { title: "Formação", body: "Bacharelado em Ciência da Computação, Estácio, ago/2023–dez/2027 (previsão)." },
        { title: "Certificações", body: "Wake Learning (Wake, ago/2025); Wake Técnico (Wake, ago/2025); Fundamentos do React (Rocketseat, jul/2024); Inglês e JavaScript (Curso em Vídeo, dez/2023); HTML5 e CSS3 (jun/2023); Git e GitHub e Python 3 (Curso em Vídeo, mai/2023)." },
        { title: "Idiomas", body: "Português (nativo), Inglês avançado" },
      ],
    },
    projectsUi: {
      kicker: "Cases selecionados",
      title: "Projetos",
      lede: "Cases de lojas em produção. Os outros projetos do currículo ficam listados abaixo, sem case expandido.",
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
      alsoKicker: "Também no currículo",
      alsoLede: "Itens do CV que ainda não têm case nesta página. Sem estudo de caso inventado.",
      also: [
        { name: "Case Méliuz", detail: "Análise A/B de cashback. Python, pandas, pytest e Next.js. Pipeline para decidir a variante a escalar, com guardrails de margem e bootstrap pareado por data. Dashboard Next.js. Nos 3 datasets do case, recomendação de escalar o Grupo 1.", href: "https://meliuz-case.vercel.app" },
        { name: "Supfy MVP", detail: "Next.js 16, React 19, TypeScript, Tailwind e n8n. Pedidos em texto livre viram itens validados pelo catálogo, com integração opcional n8n.", href: "https://github.com/helisondias07/supfy-mvp" },
        { name: "Oasis-bot", detail: "Bot/agente no contexto da Agência Oásis (automação e IA), com desenvolvimento e empacotamento desktop. Repositório privado." },
        { name: "sneakers", detail: "Storefront de e-commerce no contexto dos repositórios da Agência Oásis." },
        { name: "Wolf Consultoria", detail: "React, Vite e Tailwind." },
        { name: "Rick and Morty Wiki", detail: "React, TypeScript, Vite e Vitest." },
        { name: "Portfólio", detail: "Este site, em Next.js.", href: "https://helisondias.vercel.app" },
        { name: "gitlab-sync", detail: "Contribuições de GitLab para GitHub." },
      ],
    },
    contact: {
      kicker: "Contato",
      lets: "Vamos",
      talk: "conversar?",
      lede: "Desenvolvedor fullstack e frontend, com IA aplicada. Aberto a vagas remotas júnior ou pleno em Frontend, Fullstack ou IA e automação.",
      email: "E-mail",
      cv: "Baixar CV",
      location: "Bom Jardim, RJ — Remoto · +55 22 98104-0084",
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
      title: "Helison Dias — Fullstack / Frontend Developer",
      description:
        "Helison Dias — fullstack and frontend developer since 2023. React, Next.js, TypeScript, Node.js, and applied AI (LLMs, agents, n8n). Based in Bom Jardim, Brazil — remote.",
      htmlLang: "en",
      locale: "en_US",
    },
    nav: { about: "About", projects: "Projects", contact: "Contact" },
    langToggle: { label: "Language: English. Switch to Portuguese" },
    theme: { label: "Toggle light and dark theme" },
    hero: {
      tag: "Fullstack / Frontend Developer · Applied AI",
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
      location: "Bom Jardim, Brazil — Remote",
      published: "10+ production e-commerces",
      cmds: [
        ["about", [
          ["", "Helison Dias"],
          ["", "Fullstack / Frontend · Applied AI"],
          ["", "Bom Jardim, Brazil — Remote"],
        ]],
        ["exp", [
          ["Jan 2025 – present", "Junior Frontend Developer · Agência Oásis"],
          ["Apr 2024 – Jan 2025", "Frontend Intern · Agência Oásis"],
          ["Oct 2023 – Apr 2024", "Freelance web · independent projects"],
        ]],
        ["stack", [
          ["frontend", "React · Next.js · TypeScript · Node.js"],
          ["e-commerce", "Wake · Nuvemshop · Scriban"],
          ["ai", "LLMs · n8n · Claude Code · Cursor"],
          ["testing", "Jest · RTL · Vitest · Playwright"],
        ]],
        ["contact", [
          ["email", "helisondias07@gmail.com"],
          ["phone", "+55 22 98104-0084"],
          ["linkedin", "linkedin.com/in/helisondias"],
          ["github", "github.com/helisondias07"],
        ]],
      ],
      messages: [
        "Helison Dias",
        "Fullstack / Frontend Developer",
        "Applied AI: LLMs, agents, and n8n",
        "Since 2023 · Agência Oásis since Apr 2024",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "Wake",
        "Nuvemshop",
        "n8n",
        "Claude Code",
        "Cursor",
      ],
    },
    about: {
      kicker: "About",
      bio: [
        ["I'm Helison, a", false],
        ["fullstack and frontend", true],
        ["developer since 2023. Freelance from October 2023; at Agência Oásis, an internship from April 2024 and a junior role from January 2025. I ship interfaces in", false],
        ["React, Next.js, TypeScript, and Node.js", true],
        ["with REST APIs and", false],
        ["10+ e-commerces", true],
        ["in production (Wake and Nuvemshop), covering performance, accessibility, SEO, and tests. In applied AI I connect LLMs through APIs and build", false],
        ["automations and agents", true],
        ["with n8n, webhooks, and the official WhatsApp Business API, using Claude Code, Codex CLI, and Cursor. I work remotely from Bom Jardim, RJ, Brazil. I'm studying Computer Science at Estácio, expected December 2027, and I'm looking for remote junior or mid-level roles in Frontend, Fullstack, or AI and automation.", false],
      ],
      counters: {
        projects: "production e-commerces",
        since: "since",
        yearsAria: "since 2023",
        experience: "web development",
      },
      experienceKicker: "Experience",
      roles: [
        {
          title: "Junior Frontend Developer · Grupo Oásis (Agência Oásis)",
          when: "Jan 2025 – present",
          where: "Remote — Bom Jardim, RJ. Hired after the internship. Wake stores on a remote agile team (Scrum/Kanban, ClickUp, Git/GitLab, Figma).",
          bullets: [
            "Responsive e-commerce UIs with React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3/SCSS, and Tailwind CSS across several stores at once.",
            "REST APIs for dynamic listings, real-time filters, and checkout flows. Wake modules and Scriban templates for landing pages and showcases.",
            "Reusable components and tests with Jest and React Testing Library. Cross-browser tests on high-traffic campaigns.",
            "Claude Code and Codex CLI in the daily flow for generation, refactoring, and automation. Agent workflows in the development and content pipeline.",
            "Versioned code in Git/GitLab, biweekly sprints. Contribution to 10+ production stores on the Wake Platform.",
          ],
        },
        {
          title: "Frontend Development Intern · Grupo Oásis (Agência Oásis)",
          when: "Apr 2024 – Jan 2025",
          where: "Remote — Bom Jardim, RJ.",
          bullets: [
            "Worked with seniors on React/JavaScript/Wake e-commerce. Shipped reusable components and production fixes.",
            "Cross-browser and responsive tests for promotional campaigns.",
          ],
        },
        {
          title: "Freelance Web Developer · Independent projects",
          when: "Oct 2023 – Apr 2024",
          where: "Remote.",
          bullets: [
            "Studied and built freelance web projects with HTML, CSS, JavaScript, and React.",
          ],
        },
      ],
      skills: [
        { title: "Applied AI and automation", wide: true, body: iaEn },
        { title: "Languages", body: "JavaScript, TypeScript, HTML5, CSS3, SQL (PostgreSQL, MySQL), Python (FastAPI)" },
        { title: "Frontend", body: "React, Next.js, Vue.js, Vite, Redux, Zustand, Tailwind CSS, Sass/SCSS, Styled-components, Framer Motion, Mantine, design systems, accessibility (WCAG), SEO, performance and Core Web Vitals, responsive layout" },
        { title: "Backend and APIs", body: "Node.js, Express, NestJS, REST APIs, GraphQL, webhooks, WebSockets, Firebase (Firestore, Auth), microservices, messaging (RabbitMQ, Kafka, SQS)" },
        { title: "Databases", body: "SQL (PostgreSQL, MySQL), ORM (Prisma), MongoDB, Redis, Firestore, pgvector" },
        { title: "AI and automation", body: "Generative AI (GenAI), LLMs, machine learning (fundamentals), OpenAI API, Claude/Anthropic API, AI agents, prompt engineering, RAG, embeddings, LangChain, LangGraph, MCP, n8n, Make/Zapier, official WhatsApp Business API, Cursor, Claude Code, Codex CLI, GitHub Copilot" },
        { title: "Testing and quality", body: "Jest, Testing Library, Vitest, Playwright, pytest, E2E tests, clean code, SOLID" },
        { title: "DevOps and cloud", body: "Git, GitHub, GitLab, CI/CD (GitHub Actions), Docker, Kubernetes, cloud (AWS, Azure, GCP), Vercel, Linux" },
        { title: "Data", body: "pandas, scipy, A/B tests" },
        { title: "E-commerce", body: "Wake Platform, Scriban, Nuvemshop, Go Template, VTEX" },
        { title: "Methods and tools", body: "Scrum, Kanban, Figma, ClickUp, remote work, teamwork, autonomy, communication" },
        { title: "Education", body: "B.Sc. in Computer Science, Estácio, Aug 2023–Dec 2027 (expected)." },
        { title: "Certifications", body: "Wake Learning (Wake, Aug 2025); Wake Técnico (Wake, Aug 2025); React Fundamentals (Rocketseat, Jul 2024); English and JavaScript (Curso em Vídeo, Dec 2023); HTML5 and CSS3 (Jun 2023); Git and GitHub, and Python 3 (Curso em Vídeo, May 2023)." },
        { title: "Languages", body: "Portuguese (native), English (advanced)" },
      ],
    },
    projectsUi: {
      kicker: "Selected work",
      title: "Projects",
      lede: "Production store cases. Other CV projects are listed below, without an expanded case study.",
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
      alsoKicker: "Also on the CV",
      alsoLede: "CV items that do not have a case study on this page. No invented case study.",
      also: [
        { name: "Méliuz case", detail: "Cashback A/B analysis. Python, pandas, pytest, and Next.js. A pipeline to choose which variant to scale, with margin guardrails and date-paired bootstrap. Next.js dashboard. Across the 3 case datasets, the recommendation was to scale Group 1.", href: "https://meliuz-case.vercel.app" },
        { name: "Supfy MVP", detail: "Next.js 16, React 19, TypeScript, Tailwind, and n8n. Free-text orders become catalog-validated items, with optional n8n integration.", href: "https://github.com/helisondias07/supfy-mvp" },
        { name: "Oasis-bot", detail: "Bot/agent in the Agência Oásis context (automation and AI), including desktop packaging. Private repository." },
        { name: "sneakers", detail: "E-commerce storefront in the Agência Oásis repositories." },
        { name: "Wolf Consultoria", detail: "React, Vite, and Tailwind." },
        { name: "Rick and Morty Wiki", detail: "React, TypeScript, Vite, and Vitest." },
        { name: "Portfolio", detail: "This site, built with Next.js.", href: "https://helisondias.vercel.app" },
        { name: "gitlab-sync", detail: "GitLab to GitHub contributions." },
      ],
    },
    contact: {
      kicker: "Contact",
      lets: "Let's",
      talk: "talk?",
      lede: "Fullstack and frontend developer working with applied AI. Open to remote junior or mid-level roles in Frontend, Fullstack, or AI and automation.",
      email: "Email",
      cv: "Download CV",
      location: "Bom Jardim, Brazil — Remote · +55 22 98104-0084",
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
