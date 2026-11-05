export type Project = {
  id: string; url: string; img: string; mimg: string; name: string; cat: string; eyebrow: string; title: string;
  association: string; overview: string[]; contributionsTitle: string; contributions: string[]; stackTitle: string; stack: string[];
  /** image intrinsic sizes (desktop / mobile) to avoid layout shift */
  dw: number; dh: number; mw: number; mh: number;
  tags: ("ecommerce" | "front" | "pessoais")[];
  /** Optional measured result. Leave empty unless there is a real number. */
  resultado: string;
};

export const projects: Project[] = [
  {
    "id": "fiturban",
    "url": "https://www.fiturban.com.br/",
    "img": "fiturban-screenshot.webp",
    "mimg": "fiturban-screenshot-mobile.webp",
    "name": "Fit Urban",
    "cat": "E-commerce fitness",
    "eyebrow": "Case em destaque",
    "title": "Fit Urban - Storefront fitness",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Storefront fitness na Wake: listagens, coleções, variantes e responsividade.",
      "Implementação da experiência de compra com foco em navegação clara para um catálogo com várias coleções."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de listagens de produto, páginas de coleção e navegação por categorias com HTML5, CSS3, JavaScript e templates Scriban.",
      "Implementação de UI para variantes de cor e layouts responsivos mobile-first.",
      "Ajustes de compatibilidade cross-browser, performance e SEO para e-commerce.",
      "Refinamento visual alinhado à identidade da marca e ao público de moda fitness."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Scriban",
      "Responsive Web Design",
      "Web Performance",
      "Cross-browser Compatibility",
      "E-commerce SEO",
      "Git"
    ],
    "dw": 1437,
    "dh": 1074,
    "mw": 383,
    "mh": 970,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "hotrio",
    "url": "https://www.hotrio.com.br/",
    "img": "hotrio-screenshot-card.webp",
    "mimg": "hotrio-screenshot-mobile.webp",
    "name": "HotRio",
    "cat": "Adult Products E-commerce",
    "eyebrow": "Case em destaque",
    "title": "HotRio - E-commerce de produtos adultos",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce HotRio, marca do segmento de produtos adultos.",
      "Atuei na implementação de interfaces responsivas com foco em aderência à identidade visual, acessibilidade e compatibilidade cross-browser, em colaboração com um time multidisciplinar de tecnologia, design e produto."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção da estrutura responsiva de layout com HTML5, CSS3 e JavaScript.",
      "Ajustes de compatibilidade nos principais navegadores.",
      "Implementação visual alinhada às diretrizes de marca e design.",
      "Suporte técnico durante QA e ajustes finais de entrega."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Responsive Web Design",
      "Cross-browser Compatibility",
      "Web Performance",
      "Git"
    ],
    "dw": 1256,
    "dh": 754,
    "mw": 699,
    "mh": 754,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "mckhome",
    "url": "https://www.mckhome.com.br/",
    "img": "mckhome-screenshot-card.webp",
    "mimg": "mckhome-screenshot-mobile.webp",
    "name": "Mck Home",
    "cat": "Home & Gifts E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Mck Home - E-commerce de casa e presentes",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Mck Home, marca especializada em presentes, utilidades domésticas e produtos para casa.",
      "Atuei na construção de interfaces responsivas e acessíveis, alinhadas à identidade visual da marca, com foco em uma navegação fluida e intuitiva para o usuário final."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Implementação de boas práticas de acessibilidade e performance web.",
      "Colaboração com times de design e produto em ambiente ágil.",
      "Versionamento e organização de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1437,
    "dh": 1078,
    "mw": 314,
    "mh": 1063,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "serralheria",
    "url": "https://www.serralheria.com.br/",
    "img": "serralheria-screenshot-card.webp",
    "mimg": "serralheria-screenshot-mobile.webp",
    "name": "Loja Serralheria",
    "cat": "Hardware & Tools E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Loja Serralheria - E-commerce de ferragens e ferramentas",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Loja Serralheria, voltada a profissionais de ferragens, construção e varejo de ferramentas.",
      "Atuei na entrega de interfaces responsivas e alinhadas à marca, com foco em usabilidade, performance e clareza de navegação para um público técnico e recorrente."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de componentes e layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Aplicação de técnicas de otimização de performance e acessibilidade.",
      "Colaboração com times de design, produto e engenharia durante o ciclo de desenvolvimento.",
      "Manutenção do código versionado e organizado com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1435,
    "dh": 1076,
    "mw": 387,
    "mh": 1198,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "lojaultra",
    "url": "https://www.lojadaultra.com.br/",
    "img": "lojaultra-screenshot-card.webp",
    "mimg": "lojaultra-screenshot-mobile.webp",
    "name": "Loja Ultra",
    "cat": "Truck Parts E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Loja Ultra - E-commerce de peças e acessórios para caminhões",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Loja Ultra, especializada em peças e acessórios para caminhões e veículos pesados.",
      "Atuei na criação de uma interface clara e funcional para um público técnico, priorizando navegação rápida, consistência visual e comportamento responsivo entre dispositivos."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Construção de componentes frontend responsivos com HTML5, CSS3 e JavaScript.",
      "Melhoria da experiência de navegação para um catálogo técnico de produtos.",
      "Manutenção da consistência visual e alinhamento com a identidade da marca em toda a UI.",
      "Colaboração com times de design e produto em ambiente ágil."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Git",
      "Agile"
    ],
    "dw": 1434,
    "dh": 1075,
    "mw": 387,
    "mh": 1174,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "tubaraocenter",
    "url": "https://tubaraocenter.com.br/",
    "img": "tubaraocenter-screenshot-card.webp",
    "mimg": "tubaraocenter-screenshot-mobile.webp",
    "name": "Tubarão Center",
    "cat": "Fishing & Airsoft E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Tubarão Center - E-commerce de pesca e airsoft",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Tubarão Center, especializada em artigos de pesca, camping, airsoft e equipamentos técnicos para atividades outdoor.",
      "Atuei na construção de interfaces responsivas e consistentes com a marca, entregando uma experiência de compra fluida e eficiente para um público de nicho."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
      "Otimização de performance e acessibilidade para um catálogo com alta variedade de produtos.",
      "Colaboração com times de design, produto e tecnologia em fluxo ágil.",
      "Versionamento e organização da base de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git",
      "Agile"
    ],
    "dw": 1426,
    "dh": 1069,
    "mw": 386,
    "mh": 1194,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "useloft",
    "url": "https://viaveneto.com.br/pages/loft",
    "img": "useloft-screenshot-card.webp",
    "mimg": "useloft-screenshot-mobile.webp",
    "name": "Useloft",
    "cat": "Luxury Fashion E-commerce",
    "eyebrow": "Case em destaque",
    "title": "Useloft - E-commerce de moda premium",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Desenvolvimento frontend da plataforma de e-commerce Useloft, uma marca voltada à moda refinada e sofisticada.",
      "Implementei soluções frontend com foco em refinamento visual, responsividade mobile-first e acessibilidade, garantindo uma experiência de navegação fluida e premium alinhada à identidade da marca."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Desenvolvimento de interfaces responsivas e otimizadas para mobile com HTML5, CSS3 e JavaScript.",
      "Aplicação de boas práticas de acessibilidade e experiência do usuário.",
      "Implementação de UI alinhada a diretrizes visuais de uma marca de posicionamento premium.",
      "Colaboração com um time multidisciplinar de design, tecnologia e produto."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git"
    ],
    "dw": 1440,
    "dh": 1080,
    "mw": 387,
    "mh": 1197,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "id": "viaveneto",
    "url": "https://viaveneto.com.br/",
    "img": "viaveneto-screenshot-card.webp",
    "mimg": "viaveneto-screenshot-mobile.webp",
    "name": "ViaVeneto",
    "cat": "Moda masculina",
    "eyebrow": "Case em destaque",
    "title": "ViaVeneto - Moda masculina",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Moda masculina na Wake: UI premium, acessibilidade, performance e SEO.",
      "Storefront responsiva alinhada à identidade da marca, em um time multidisciplinar."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Implementação frontend responsiva com HTML5, CSS3 e JavaScript.",
      "Aderência às diretrizes visuais da marca e aos padrões de acessibilidade.",
      "Aplicação de boas práticas de SEO para melhorar a descoberta orgânica.",
      "Versionamento e manutenção da base de código com Git."
    ],
    "stackTitle": "Stack",
    "stack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Wake Platform",
      "Responsive Web Design",
      "Accessibility",
      "E-commerce SEO",
      "Git"
    ],
    "dw": 1434,
    "dh": 1075,
    "mw": 389,
    "mh": 1195,
    "tags": [
      "ecommerce"
    ],
    "resultado": ""
  },
  {
    "id": "yamuna",
    "url": "https://www.yamuna.com.br/",
    "img": "yamuna-screenshot-card.webp",
    "mimg": "yamuna-screenshot-mobile.webp",
    "name": "Yamuna",
    "cat": "Naturais e bem-estar · Nuvemshop",
    "eyebrow": "Case em destaque",
    "title": "Yamuna - Migração Wake para Nuvemshop",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Migração do storefront de naturais e bem-estar da Wake para a Nuvemshop.",
      "Tema em Go Template com foco em identidade, responsividade, performance, acessibilidade e SEO."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Migração do storefront Wake para a Nuvemshop.",
      "Tema em Go Template orientado a identidade, responsividade, performance, acessibilidade e SEO."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Nuvemshop",
      "Go Template",
      "JavaScript",
      "CSS",
      "Web Performance",
      "Acessibilidade",
      "SEO"
    ],
    "dw": 1438,
    "dh": 1078,
    "mw": 390,
    "mh": 1191,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "url": "https://www.kingimports.com.br/",
    "eyebrow": "Case em destaque",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "contributionsTitle": "Minha atuação",
    "stackTitle": "Stack",
    "resultado": "",
    "tags": [
      "ecommerce",
      "front"
    ],
    "id": "kingimports",
    "img": "kingimports-screenshot-card.webp",
    "mimg": "kingimports-screenshot-mobile.webp",
    "name": "King Imports",
    "cat": "Autopeças",
    "title": "King Imports - Frontend de autopeças",
    "overview": [
      "Frontend de autopeças na Wake: layouts responsivos e performance.",
      "Páginas, componentes e vitrines do storefront, com ajustes de carrinho e página de produto."
    ],
    "contributions": [
      "Construção e evolução de páginas, componentes e snippets em Scriban com dados via queries GraphQL.",
      "Estilização com Tailwind CSS e fluxo de desenvolvimento local com watch do storefront.",
      "Correções de layout e comportamento em carrinho, vitrines e páginas de produto.",
      "Templates de e-mail transacional da loja."
    ],
    "stack": [
      "Wake Storefront SSR",
      "Scriban",
      "GraphQL",
      "Tailwind CSS",
      "JavaScript",
      "Git"
    ],
    "dw": 1440,
    "dh": 1080,
    "mw": 390,
    "mh": 1190
  },
  {
    "id": "venari",
    "url": "https://www.venari.com.br/",
    "img": "venari-screenshot-card.webp",
    "mimg": "venari-screenshot-mobile.webp",
    "name": "Venari",
    "cat": "Fitness feminino",
    "eyebrow": "Case em destaque",
    "title": "Venari - Storefront fitness feminino",
    "association": "Associado ao Grupo Oásis (Agência Oásis)",
    "overview": [
      "Storefront fitness feminino na Wake: PLPs, coleções, variantes de cor e layout mobile-first.",
      "Frontend responsivo com HTML5, CSS3 e JavaScript, alinhado à identidade da marca."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "PLPs, coleções e variantes de cor com HTML5, CSS3 e JavaScript.",
      "Layout mobile-first para leitura do catálogo e destaque dos produtos.",
      "Ajustes de responsividade no storefront Wake."
    ],
    "stackTitle": "Stack",
    "stack": [
      "Frontend Development",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Web Design",
      "Web Performance",
      "Accessibility",
      "Git"
    ],
    "dw": 1364,
    "dh": 1022,
    "mw": 425,
    "mh": 907,
    "tags": [
      "ecommerce",
      "front"
    ],
    "resultado": ""
  },
  {
    "id": "webcine",
    "url": "https://webcinetv.com.br/",
    "img": "webcine-screenshot-card.webp",
    "mimg": "webcine-screenshot-mobile.webp",
    "name": "WebCine TV",
    "cat": "Cinema online",
    "eyebrow": "Projeto autoral",
    "title": "WebCine TV - Salas sincronizadas",
    "association": "Projeto criado por Helison Dias",
    "overview": [
      "Plataforma de cinema online com salas sincronizadas (play/pause/seek e chat), YouTube, Twitch/HLS, screen share e navegador virtual.",
      "V2 com Docker multi-stage, Node.js 24 e E2E em Playwright. Desenvolvimento com Claude e Codex."
    ],
    "contributionsTitle": "Minha atuação",
    "contributions": [
      "Salas sincronizadas com play, pause, seek e chat.",
      "YouTube, Twitch/HLS, screen share e navegador virtual.",
      "V2 com Docker multi-stage, Node.js 24 e testes E2E em Playwright."
    ],
    "stackTitle": "Stack",
    "stack": [
      "React",
      "TypeScript",
      "Vite",
      "Mantine",
      "Firebase",
      "Playwright",
      "Docker",
      "Node.js"
    ],
    "dw": 1428,
    "dh": 1071,
    "mw": 383,
    "mh": 1192,
    "tags": [
      "pessoais",
      "front"
    ],
    "resultado": ""
  }
];
