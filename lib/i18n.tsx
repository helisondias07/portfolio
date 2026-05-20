"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export type Language = "pt" | "en";

export const dictionary = {
  pt: {
    nav: {
      about: "Sobre",
      skills: "Skills",
      experience: "Experiência",
      projects: "Projetos",
      contact: "Contato",
      downloadCv: "Download CV",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Open to work",
      role: "Fullstack Developer",
      location: "Nova Friburgo, RJ",
      education: "Ciência da Computação · Estácio",
      availability: "Júnior-Pleno · Fullstack",
      intro:
        "Transformo interfaces em experiências de e-commerce rápidas, responsivas e prontas para produção. Trabalho com React, Next.js, TypeScript, Wake e Node.js, usando IA para acelerar desenvolvimento, refatoração e automações.",
      viewProjects: "Ver projetos",
      storesValue: "React + E-commerce",
      storesLabel: "Interfaces comerciais",
      storesText:
        "Interfaces responsivas, vitrines, landing pages e módulos comerciais para lojas reais.",
      automationValue: "APIs + IA",
      automationLabel: "Fluxos mais eficientes",
      automationText:
        "Integração com REST APIs e uso de IA para acelerar refatoração, documentação e entregas.",
    },
    valueProps: [
      {
        title: "Interfaces que funcionam de verdade",
        desc: "Entrego UIs responsivas, acessíveis e performáticas, testadas em múltiplos browsers e dispositivos.",
      },
      {
        title: "Integração com APIs do zero",
        desc: "Conecto frontend a REST APIs para listagens dinâmicas, filtros, checkout e fluxos de produto.",
      },
      {
        title: "Design responsivo em todos os dispositivos",
        desc: "Crio experiências consistentes para desktop, tablet e mobile, com layouts adaptáveis e testados em diferentes telas.",
      },
    ],
    about: {
      eyebrow: "Sobre",
      title: "Interfaces web para e-commerce e produtos digitais",
      description:
        "Desenvolvo telas responsivas, integrações com APIs e experiências prontas para uso real em desktop, tablet e mobile.",
      imageAlt: "Retrato ilustrado de Helison Dias",
      paragraphs: [
        "Sou desenvolvedor de software com mais de 2 anos de experiência criando aplicações de e-commerce em produção com React, JavaScript e Node.js. Tenho foco em integração com REST APIs, customização da plataforma Wake e templates Scriban, entregando vitrines e interfaces responsivas para múltiplos clientes em ambiente remoto e ágil. Além do frontend, venho expandindo minha atuação em backend, automação e desenvolvimento assistido por IA, usando ferramentas como Claude Code e Codex CLI para acelerar geração de código, refatoração e tarefas repetitivas. Atualmente curso Ciência da Computação na Estácio, com interesse em oportunidades frontend, backend, fullstack e engenharia com IA.",
      ],
      stackTitle: "Stack principal",
      stack: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python"],
      stats: ["Anos de experiência", "Clientes atendidos e lojas publicadas"],
      languages: "Português nativo · Inglês avançado C1",
    },
    skills: {
      eyebrow: "Skills",
      title: "Stack técnica organizada por contexto",
      description:
        "Ferramentas que uso para criar interfaces, integrações, automações e soluções fullstack.",
      featuredTitle: "Stack principal",
      previous: "Categoria anterior",
      next: "Próxima categoria",
      indicators: "Indicadores de skills",
      goTo: "Ir para categoria",
      categories: {
        frontend: "Frontend & UI",
        backend: "Backend & Integrações",
        tools: "E-commerce & Ferramentas",
        ai: "IA & Automação",
      },
      categoryDescriptions: {
        frontend: "Interfaces responsivas, componentes reutilizáveis e experiências de produto.",
        backend: "APIs, dados dinâmicos, serviços e integrações entre sistemas.",
        tools: "Fluxo de entrega, design, plataforma Wake e organização ágil do trabalho.",
        ai: "Ferramentas e agentes para acelerar refatoração, documentação e rotinas.",
      },
    },
    experience: {
      eyebrow: "Experiência",
      title: "E-commerce, frontend e automação em time remoto",
      description:
        "Trajetória recente na Agência Oásis, evoluindo de estágio para atuação frontend em projetos de produção.",
      current: "Atual",
      items: [
        {
          company: "Grupo Oásis (Agência Oásis)",
          role: "Desenvolvedor de Software - Frontend",
          period: "Jan 2025 - Presente",
          location: "Nova Friburgo, RJ - Remoto",
          bullets: [
            "Desenvolvimento de interfaces e-commerce responsivas e acessíveis com React, Next.js, TypeScript, JavaScript, HTML5, CSS3, SCSS e Tailwind CSS para mais de 10 lojas na plataforma Wake.",
            "Integração de REST APIs para listagens dinâmicas de produtos, filtros de busca em tempo real e fluxos de checkout.",
            "Desenvolvimento e manutenção de módulos Wake personalizados e templates Scriban para landing pages e vitrines específicas.",
            "Uso diário de Claude Code e Codex CLI para automatizar geração de código, refatoração e tarefas repetitivas, reduzindo trabalho manual em cerca de 40%.",
            "Gestão de bases versionadas via Git e GitLab em equipe ágil remota com sprints quinzenais.",
          ],
        },
        {
          company: "Grupo Oásis (Agência Oásis)",
          role: "Estagiário de Desenvolvimento Frontend",
          period: "Abr 2024 - Jan 2025",
          location: "Nova Friburgo, RJ - Remoto",
          bullets: [
            "Colaboração com desenvolvedores sênior em múltiplos projetos de e-commerce utilizando React, Vue.js, JavaScript e Wake Platform.",
            "Desenvolvimento de componentes de UI reutilizáveis e correção de bugs em releases de produção.",
            "Testes cross-browser e responsivos em campanhas promocionais de alto tráfego, garantindo paridade visual entre dispositivos.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Cases selecionados",
      title: "Projetos",
      description: "Projetos em e-commerce, integrações e automação aplicados a interfaces reais.",
      previous: "Projeto anterior",
      next: "Próximo projeto",
      select: "Selecionar projeto",
      previewAlt: "Prévia do projeto",
      indicators: "Indicadores de projeto",
      goTo: "Ir para",
      details: "Clique para ver detalhes",
      visit: "Visitar site",
      caseStudies: {
        fiturban: {
          eyebrow: "Case em destaque",
          title: "Fit Urban - E-commerce de moda fitness feminina",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend do storefront da Fit Urban, marca de moda fitness feminina especializada em peças de alta performance para treino.",
            "Atuei na implementação da experiência de compra na Wake Platform, com foco em responsividade, refinamento visual e navegação clara para um catálogo amplo com coleções como Zenith, Seamless, Fit Run, Vitality e Fit Basic.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção de listagens de produto, páginas de coleção e navegação por categorias com HTML5, CSS3, JavaScript e templates Scriban.",
            "Implementação de UI para variantes de cor e layouts responsivos mobile-first.",
            "Ajustes de compatibilidade cross-browser, performance e SEO para e-commerce.",
            "Refinamento visual alinhado à identidade da marca e ao público de moda fitness.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Scriban",
            "Responsive Web Design",
            "Web Performance",
            "Cross-browser Compatibility",
            "E-commerce SEO",
            "Git",
          ],
        },
        hotrio: {
          eyebrow: "Case em destaque",
          title: "HotRio - E-commerce de produtos adultos",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce HotRio, marca do segmento de produtos adultos.",
            "Atuei na implementação de interfaces responsivas com foco em aderência à identidade visual, acessibilidade e compatibilidade cross-browser, em colaboração com um time multidisciplinar de tecnologia, design e produto.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção da estrutura responsiva de layout com HTML5, CSS3 e JavaScript.",
            "Ajustes de compatibilidade nos principais navegadores.",
            "Implementação visual alinhada às diretrizes de marca e design.",
            "Suporte técnico durante QA e ajustes finais de entrega.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Responsive Web Design",
            "Cross-browser Compatibility",
            "Web Performance",
            "Git",
          ],
        },
        mckhome: {
          eyebrow: "Case em destaque",
          title: "Mck Home - E-commerce de casa e presentes",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Mck Home, marca especializada em presentes, utilidades domésticas e produtos para casa.",
            "Atuei na construção de interfaces responsivas e acessíveis, alinhadas à identidade visual da marca, com foco em uma navegação fluida e intuitiva para o usuário final.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Implementação de boas práticas de acessibilidade e performance web.",
            "Colaboração com times de design e produto em ambiente ágil.",
            "Versionamento e organização de código com Git.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        serralheria: {
          eyebrow: "Case em destaque",
          title: "Loja Serralheria - E-commerce de ferragens e ferramentas",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Loja Serralheria, voltada a profissionais de ferragens, construção e varejo de ferramentas.",
            "Atuei na entrega de interfaces responsivas e alinhadas à marca, com foco em usabilidade, performance e clareza de navegação para um público técnico e recorrente.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção de componentes e layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Aplicação de técnicas de otimização de performance e acessibilidade.",
            "Colaboração com times de design, produto e engenharia durante o ciclo de desenvolvimento.",
            "Manutenção do código versionado e organizado com Git.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        lojaultra: {
          eyebrow: "Case em destaque",
          title: "Loja Ultra - E-commerce de peças e acessórios para caminhões",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Loja Ultra, especializada em peças e acessórios para caminhões e veículos pesados.",
            "Atuei na criação de uma interface clara e funcional para um público técnico, priorizando navegação rápida, consistência visual e comportamento responsivo entre dispositivos.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção de componentes frontend responsivos com HTML5, CSS3 e JavaScript.",
            "Melhoria da experiência de navegação para um catálogo técnico de produtos.",
            "Manutenção da consistência visual e alinhamento com a identidade da marca em toda a UI.",
            "Colaboração com times de design e produto em ambiente ágil.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Git",
            "Agile",
          ],
        },
        tubaraocenter: {
          eyebrow: "Case em destaque",
          title: "Tubarão Center - E-commerce de pesca e airsoft",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Tubarão Center, especializada em artigos de pesca, camping, airsoft e equipamentos técnicos para atividades outdoor.",
            "Atuei na construção de interfaces responsivas e consistentes com a marca, entregando uma experiência de compra fluida e eficiente para um público de nicho.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Otimização de performance e acessibilidade para um catálogo com alta variedade de produtos.",
            "Colaboração com times de design, produto e tecnologia em fluxo ágil.",
            "Versionamento e organização da base de código com Git.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        useloft: {
          eyebrow: "Case em destaque",
          title: "Useloft - E-commerce de moda premium",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Useloft, uma marca voltada à moda refinada e sofisticada.",
            "Implementei soluções frontend com foco em refinamento visual, responsividade mobile-first e acessibilidade, garantindo uma experiência de navegação fluida e premium alinhada à identidade da marca.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Desenvolvimento de interfaces responsivas e otimizadas para mobile com HTML5, CSS3 e JavaScript.",
            "Aplicação de boas práticas de acessibilidade e experiência do usuário.",
            "Implementação de UI alinhada a diretrizes visuais de uma marca de posicionamento premium.",
            "Colaboração com um time multidisciplinar de design, tecnologia e produto.",
          ],
          stackTitle: "Stack",
          stack: [
            "Frontend Development",
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
          ],
        },
        viaveneto: {
          eyebrow: "Case em destaque",
          title: "ViaVeneto - E-commerce de moda masculina",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce ViaVeneto, marca tradicional de moda masculina e alfaiataria.",
            "Colaborei em um time multidisciplinar para entregar uma storefront performática, acessível e responsiva, alinhada à identidade clássica da marca e aos padrões de experiência do usuário.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Implementação frontend responsiva com HTML5, CSS3 e JavaScript.",
            "Aderência às diretrizes visuais da marca e aos padrões de acessibilidade.",
            "Aplicação de boas práticas de SEO para melhorar a descoberta orgânica.",
            "Versionamento e manutenção da base de código com Git.",
          ],
          stackTitle: "Stack",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Responsive Web Design",
            "Accessibility",
            "E-commerce SEO",
            "Git",
          ],
        },
        yamuna: {
          eyebrow: "Case em destaque",
          title: "Yamuna - E-commerce de produtos naturais e bem-estar",
          association: "Associado ao Grupo Oásis (Agência Oásis)",
          overview: [
            "Desenvolvimento frontend da plataforma de e-commerce Yamuna, marca especializada em alimentos naturais, chás, especiarias e produtos voltados ao bem-estar.",
            "Atuei com foco em responsividade, performance, acessibilidade e otimização de SEO, entregando uma experiência de compra intuitiva e agradável alinhada à identidade wellness da marca.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção de frontend responsivo com HTML5, CSS3 e JavaScript.",
            "Aplicação de boas práticas de SEO para ampliar a visibilidade orgânica.",
            "Otimização de performance para uma experiência fluida e mobile-friendly.",
            "Colaboração com o time multidisciplinar da Agência Oásis.",
          ],
          stackTitle: "Stack",
          stack: [
            "Frontend Development",
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "SEO",
            "Web Performance",
            "Accessibility",
          ],
        },
        webcine: {
          eyebrow: "Projeto autoral",
          title: "WebCine TV - Sala de cinema online em tempo real",
          association: "Projeto criado por Helison Dias",
          overview: [
            "Desenvolvimento de uma plataforma web para assistir vídeos online em salas compartilhadas, com foco em sincronização da experiência, conversa em tempo real e acesso simples sem instalação.",
            "A interface foi construída para funcionar bem em desktop e mobile, com experiência imersiva, visual cinematográfico, criação rápida de salas e apresentação clara dos recursos principais da plataforma.",
          ],
          contributionsTitle: "Minha atuação",
          contributions: [
            "Construção da interface responsiva para criação de salas, navegação e apresentação dos recursos.",
            "Implementação de experiência mobile-first para acesso rápido em diferentes dispositivos.",
            "Organização visual de cards, etapas de uso e estados de interação com foco em clareza.",
            "Publicação da aplicação web com identidade visual própria e fluxo direto de entrada.",
          ],
          stackTitle: "Stack",
          stack: [
            "Frontend Development",
            "Responsive Web Design",
            "Real-time UX",
            "Web Performance",
            "Accessibility",
            "Git",
          ],
        },
        rickmorty: {
          eyebrow: "Desafio técnico",
          title: "Rick & Morty Wiki - Aplicação interativa de personagens",
          association: "Projeto autoral criado por Helison Dias",
          overview: [
            "Aplicação front-end desenvolvida como desafio técnico para explorar os recursos da API oficial de Rick and Morty, com listagem de personagens, episódios e localizações.",
            "O projeto conta com uma página dedicada ao Esquadrão, onde é possível comparar personagens, calcular chance de sobrevivência e simular missões interdimensionais com análise sarcástica do Rick. Tudo com suporte a dois idiomas (PT/EN) e alternância entre modo escuro e claro.",
          ],
          contributionsTitle: "Destaques técnicos",
          contributions: [
            "Scroll infinito com Intersection Observer API para performance otimizada.",
            "Fetch em lote de personagens via regex nos IDs de URL, reduzindo requisições à API drasticamente.",
            "Focus Trap manual nos modais via hook dedicado, garantindo acessibilidade por teclado.",
            "Sistema de tema e idioma persistidos no localStorage com Context API.",
            "Animações fluidas com Framer Motion e testes unitários com Vitest e Testing Library.",
          ],
          stackTitle: "Stack",
          stack: [
            "React 19",
            "TypeScript",
            "Vite",
            "styled-components",
            "React Router DOM",
            "Framer Motion",
            "Fetch API",
            "Vitest",
            "Testing Library",
            "Context API",
          ],
        },
      },
      items: [
        {
          storeName: "Fit Urban",
          category: "Fashion E-commerce",
          description:
            "Storefront responsiva para uma marca de moda fitness feminina, com catálogo amplo, coleções curadas e navegação orientada à conversão.",
          highlight: "E-commerce Wake de moda fitness feminina",
          myContributions: [
            "Implementação de vitrines, categorias, listagens e navegação usando Wake e templates Scriban.",
            "UI responsiva para variantes de cor, coleções e experiência mobile-first.",
            "Compatibilidade cross-browser, performance e refinamento visual alinhado à marca.",
          ],
        },
        {
          storeName: "HotRio",
          category: "Adult Products E-commerce",
          description:
            "Storefront responsiva para uma marca de produtos adultos, com foco em identidade visual, acessibilidade e compatibilidade entre navegadores.",
          highlight: "E-commerce Wake para produtos adultos",
          myContributions: [
            "Implementação de estrutura responsiva com HTML5, CSS3 e JavaScript.",
            "Ajustes cross-browser e refinamento visual alinhado à marca.",
            "Suporte técnico durante QA e ajustes finais.",
          ],
        },
        {
          storeName: "Mck Home",
          category: "Home & Gifts E-commerce",
          description:
            "Storefront responsiva para uma marca de casa e presentes, com foco em navegação clara, acessibilidade e identidade visual.",
          highlight: "E-commerce para casa, decoração e presentes",
          myContributions: [
            "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Boas práticas de acessibilidade, performance e experiência de navegação.",
            "Colaboração com design e produto em fluxo ágil.",
          ],
        },
        {
          storeName: "Loja Serralheria",
          category: "Hardware & Tools E-commerce",
          description:
            "Storefront responsiva para profissionais de ferragens e ferramentas, com foco em usabilidade, performance e navegação técnica clara.",
          highlight: "E-commerce para ferragens, construção e ferramentas",
          myContributions: [
            "Construção de componentes e layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Ajustes de performance, acessibilidade e compatibilidade para navegação recorrente.",
            "Colaboração com design, produto e engenharia em fluxo ágil.",
          ],
        },
        {
          storeName: "Loja Ultra",
          category: "Truck Parts E-commerce",
          description:
            "Storefront responsiva para peças e acessórios de caminhões, com foco em navegação rápida e catálogo técnico bem organizado.",
          highlight: "E-commerce para caminhões e veículos pesados",
          myContributions: [
            "Construção de componentes responsivos com HTML5, CSS3 e JavaScript.",
            "Melhoria do fluxo de navegação para um catálogo técnico de autopeças.",
            "Consistência visual e alinhamento de marca em diferentes dispositivos.",
          ],
        },
        {
          storeName: "Tubarão Center",
          category: "Fishing & Airsoft E-commerce",
          description:
            "Storefront responsiva para pesca, camping e airsoft, com foco em navegação fluida para um catálogo técnico e de nicho.",
          highlight: "E-commerce para pesca, camping e airsoft",
          myContributions: [
            "Desenvolvimento de layouts responsivos com HTML5, CSS3 e JavaScript.",
            "Otimização de performance, acessibilidade e clareza de navegação.",
            "Colaboração com design, produto e tecnologia em ambiente ágil.",
          ],
        },
        {
          storeName: "Useloft",
          category: "Luxury Fashion E-commerce",
          description:
            "Storefront responsiva para moda premium, com foco em refinamento visual, experiência mobile-first e navegação sofisticada.",
          highlight: "E-commerce de moda com experiência premium",
          myContributions: [
            "Desenvolvimento de interfaces responsivas com HTML5, CSS3 e JavaScript.",
            "Boas práticas de acessibilidade, UX e performance visual.",
            "Implementação alinhada a diretrizes de marca premium.",
          ],
        },
        {
          storeName: "ViaVeneto",
          category: "Men's Fashion E-commerce",
          description:
            "Storefront responsiva para moda masculina e alfaiataria, alinhada à identidade clássica da marca e às boas práticas de SEO.",
          highlight: "E-commerce Wake de moda masculina",
          myContributions: [
            "Implementação frontend responsiva com HTML5, CSS3 e JavaScript.",
            "Aderência a design de marca, acessibilidade e UX.",
            "Aplicação de boas práticas de SEO para e-commerce.",
          ],
        },
        {
          storeName: "Yamuna",
          category: "Natural & Health Products E-commerce",
          description:
            "Storefront responsiva para produtos naturais, chás e bem-estar, com foco em performance, SEO e experiência mobile agradável.",
          highlight: "E-commerce de produtos naturais e wellness",
          myContributions: [
            "Construção de frontend responsivo com HTML5, CSS3 e JavaScript.",
            "Aplicação de boas práticas de SEO, acessibilidade e performance.",
            "Experiência de compra alinhada à identidade natural e wellness da marca.",
          ],
        },
        {
          storeName: "WebCine TV",
          category: "Real-time Streaming Platform",
          description:
            "Plataforma autoral para criar salas de cinema online, assistir vídeos e conversar com amigos em tempo real.",
          highlight: "Cinema online com salas compartilhadas",
          myContributions: [
            "Construção de interface responsiva para desktop e mobile.",
            "Experiência visual cinematográfica com navegação simples.",
            "Fluxo direto para criação de salas e apresentação dos recursos da plataforma.",
          ],
        },
        {
          storeName: "Rick & Morty Wiki",
          category: "Desafio Técnico · React App",
          description:
            "Wiki interativa de personagens com scroll infinito, filtros, modal de detalhes, sistema de Esquadrão e suporte a dois idiomas.",
          highlight: "SPA autoral com React, TypeScript e API Rick & Morty",
          myContributions: [
            "Scroll infinito com Intersection Observer e fetch em lote otimizado.",
            "Página de Esquadrão com comparador, score de sobrevivência e missões.",
            "Tema dark/light e idioma PT/EN persistidos via Context API e localStorage.",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Entre em contato comigo",
      description:
        "Disponível para vagas Júnior-Pleno de tempo integral e projetos freelancer.",
      emailTitle: "Email",
      emailText: "Clique para abrir seu app de email com meu endereço como destinatário.",
      copyEmail: "Copiar email",
      copiedEmail: "Email copiado",
      linkedinTitle: "LinkedIn",
      linkedinText:
        "Acesse meu perfil para conversar, ver minha trajetória e acompanhar atualizações.",
    },
    footer: {
      availabilityPrefix: "Aberto a oportunidades de",
      role: "Fullstack",
      availabilitySuffix: "- Júnior e Pleno · Remoto ou Nova Friburgo, RJ",
      response: "Respondo em até 24h via e-mail ou LinkedIn.",
      madeWith: "Feito com Next.js + Tailwind",
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      downloadCv: "Download CV",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "Open to work",
      role: "Fullstack Developer",
      location: "Nova Friburgo, RJ",
      education: "Computer Science · Estácio",
      availability: "Junior-Mid · Fullstack",
      intro:
        "I turn interfaces into fast, responsive, production-ready e-commerce experiences. I work with React, Next.js, TypeScript, Wake, and Node.js, using AI to speed up development, refactoring, and automation.",
      viewProjects: "View projects",
      storesValue: "React + E-commerce",
      storesLabel: "Commerce interfaces",
      storesText:
        "Responsive interfaces, storefronts, landing pages, and commerce modules for real stores.",
      automationValue: "APIs + AI",
      automationLabel: "More efficient workflows",
      automationText:
        "REST API integration and AI-assisted workflows to speed up refactoring, documentation, and delivery.",
    },
    valueProps: [
      {
        title: "Interfaces that work in real life",
        desc: "I build responsive, accessible, high-performing UIs tested across browsers and devices.",
      },
      {
        title: "API integration from scratch",
        desc: "I connect frontends to REST APIs for dynamic listings, filters, checkout, and product flows.",
      },
      {
        title: "Responsive design across every device",
        desc: "I create consistent experiences for desktop, tablet, and mobile with adaptable layouts tested across different screens.",
      },
    ],
    about: {
      eyebrow: "About",
      title: "Web interfaces for e-commerce and digital products",
      description:
        "I build responsive screens, API integrations, and real-world experiences for desktop, tablet, and mobile.",
      imageAlt: "Illustrated portrait of Helison Dias",
      paragraphs: [
        "I am a software developer with over 2 years of experience building production-grade e-commerce applications with React, JavaScript, and Node.js. I specialize in REST API integration, Wake Platform customization, and Scriban templating, delivering responsive storefronts and interfaces for multiple clients in an agile remote environment. Beyond frontend development, I am growing my backend, automation, and AI-assisted engineering experience, using tools such as Claude Code and Codex CLI to speed up code generation, refactoring, and repetitive development tasks. I am currently pursuing a B.Sc. in Computer Science at Estácio and open to frontend, backend, fullstack, and AI-augmented engineering opportunities.",
      ],
      stackTitle: "Core stack",
      stack: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Python"],
      stats: ["Years of experience", "Clients served and stores launched"],
      languages: "Native Portuguese · Advanced English C1",
    },
    skills: {
      eyebrow: "Skills",
      title: "Technical stack organized by context",
      description:
        "Tools I use to build interfaces, integrations, automations, and fullstack solutions.",
      featuredTitle: "Core stack",
      previous: "Previous category",
      next: "Next category",
      indicators: "Skill indicators",
      goTo: "Go to category",
      categories: {
        frontend: "Frontend & UI",
        backend: "Backend & Integrations",
        tools: "E-commerce & Tools",
        ai: "AI & Automation",
      },
      categoryDescriptions: {
        frontend: "Responsive interfaces, reusable components, and product experiences.",
        backend: "APIs, dynamic data, services, and system integrations.",
        tools: "Delivery workflow, design, Wake Platform, and agile work organization.",
        ai: "Tools and agents to speed up refactoring, documentation, and routines.",
      },
    },
    experience: {
      eyebrow: "Experience",
      title: "E-commerce, frontend, and automation in a remote team",
      description:
        "Recent journey at Agência Oásis, moving from internship to frontend work on production projects.",
      current: "Current",
      items: [
        {
          company: "Grupo Oásis (Agência Oásis)",
          role: "Software Developer - Frontend",
          period: "Jan 2025 - Present",
          location: "Nova Friburgo, RJ - Remote",
          bullets: [
            "Built responsive and accessible e-commerce interfaces with React, Next.js, TypeScript, JavaScript, HTML5, CSS3, SCSS, and Tailwind CSS for 10+ stores on the Wake Platform.",
            "Integrated REST APIs for dynamic product listings, real-time search filters, and checkout flows.",
            "Developed and maintained custom Wake modules and Scriban templates for landing pages and tailored storefronts.",
            "Used Claude Code and Codex CLI daily to automate code generation, refactoring, and repetitive tasks, reducing manual work by around 40%.",
            "Managed Git and GitLab codebases in a fully remote agile team with biweekly sprints.",
          ],
        },
        {
          company: "Grupo Oásis (Agência Oásis)",
          role: "Frontend Development Intern",
          period: "Apr 2024 - Jan 2025",
          location: "Nova Friburgo, RJ - Remote",
          bullets: [
            "Collaborated with senior developers across multiple e-commerce projects using React, Vue.js, JavaScript, and Wake Platform.",
            "Built reusable UI components and fixed production bugs across releases.",
            "Performed cross-browser and responsive testing for high-traffic promotional campaigns.",
          ],
        },
      ],
    },
    projects: {
      eyebrow: "Selected cases",
      title: "Projects",
      description: "E-commerce, integrations, and automation projects applied to real interfaces.",
      previous: "Previous project",
      next: "Next project",
      select: "Select project",
      previewAlt: "Project preview",
      indicators: "Project indicators",
      goTo: "Go to",
      details: "Click to see details",
      visit: "Visit site",
      caseStudies: {
        fiturban: {
          eyebrow: "Featured case",
          title: "Fit Urban - Women's Fitness Fashion E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Fit Urban storefront, a women's fitness fashion brand specialized in high-performance workout apparel.",
            "I worked on the shopping experience implementation on the Wake Platform, focusing on responsiveness, visual polish, and clear navigation for an extensive catalog with collections such as Zenith, Seamless, Fit Run, Vitality, and Fit Basic.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built responsive product listing pages, collection pages, and category navigation using HTML5, CSS3, JavaScript, and Wake's Scriban templating engine.",
            "Implemented UI for product color variants and mobile-first responsive layouts.",
            "Improved cross-browser compatibility, storefront performance, and e-commerce SEO.",
            "Polished the visual experience to match the brand identity and women's fitness fashion audience.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Scriban",
            "Responsive Web Design",
            "Web Performance",
            "Cross-browser Compatibility",
            "E-commerce SEO",
            "Git",
          ],
        },
        hotrio: {
          eyebrow: "Featured case",
          title: "HotRio - Adult Products E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the HotRio e-commerce platform, a brand operating in the adult products segment.",
            "I worked on responsive interface implementation with a strong focus on brand identity adherence, accessibility, and cross-browser compatibility, collaborating with a multidisciplinary team across technology, design, and product.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built responsive layout structure with HTML5, CSS3, and JavaScript.",
            "Ensured cross-browser compatibility across major browsers.",
            "Aligned visual implementation with brand design guidelines.",
            "Provided technical support during QA and final adjustments.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Responsive Web Design",
            "Cross-browser Compatibility",
            "Web Performance",
            "Git",
          ],
        },
        mckhome: {
          eyebrow: "Featured case",
          title: "Mck Home - Home & Gifts E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Mck Home e-commerce platform, a brand specializing in gifts, home goods, and decor-oriented products.",
            "I focused on building responsive, accessible interfaces aligned with the brand's visual identity, providing a smooth and intuitive browsing experience for end users.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Developed responsive layouts using HTML5, CSS3, and JavaScript.",
            "Implemented accessibility and web performance best practices.",
            "Collaborated with design and product teams in an Agile environment.",
            "Managed code versioning and organization via Git.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        serralheria: {
          eyebrow: "Featured case",
          title: "Loja Serralheria - Hardware & Tools E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Loja Serralheria e-commerce platform, serving hardware professionals, construction buyers, and tools retailers.",
            "I delivered responsive, brand-aligned interfaces optimized for usability, performance, and clear navigation for a technical, recurring-purchase audience.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built responsive frontend components and layouts with HTML5, CSS3, and JavaScript.",
            "Applied performance and accessibility optimization techniques.",
            "Coordinated with design, product, and engineering teams throughout the development cycle.",
            "Maintained a versioned and organized codebase using Git.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        lojaultra: {
          eyebrow: "Featured case",
          title: "Loja Ultra - Truck Parts & Accessories E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Loja Ultra e-commerce platform, specializing in parts and accessories for trucks and heavy vehicles.",
            "I focused on creating a clear, functional interface tailored for a technical audience, prioritizing fast navigation, visual consistency, and responsive behavior across devices.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built responsive frontend components with HTML5, CSS3, and JavaScript.",
            "Improved user experience and navigation flow for a technical product catalog.",
            "Maintained visual consistency and brand alignment throughout the UI.",
            "Collaborated with design and product teams in an Agile environment.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Git",
            "Agile",
          ],
        },
        tubaraocenter: {
          eyebrow: "Featured case",
          title: "Tubarão Center - Fishing & Airsoft E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Tubarão Center e-commerce platform, specializing in fishing gear, camping, airsoft, and technical outdoor equipment.",
            "I built responsive, brand-consistent interfaces that deliver a fluid and efficient shopping experience for a niche technical audience.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Developed responsive layouts with HTML5, CSS3, and JavaScript.",
            "Optimized UI performance and accessibility for a product-heavy catalog.",
            "Collaborated across design, product, and tech teams in an Agile workflow.",
            "Managed codebase versioning and organization with Git.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
            "Agile",
          ],
        },
        useloft: {
          eyebrow: "Featured case",
          title: "Useloft - Luxury Fashion E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Useloft e-commerce platform, a brand focused on refined and sophisticated fashion.",
            "I implemented frontend solutions emphasizing visual refinement, mobile-first responsiveness, and accessibility, ensuring a fluid and premium browsing experience that reflects the brand identity.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Developed responsive, mobile-optimized interfaces with HTML5, CSS3, and JavaScript.",
            "Focused on accessibility and user experience best practices.",
            "Aligned UI implementation with high-end brand design guidelines.",
            "Collaborated in a multidisciplinary team covering design, technology, and product.",
          ],
          stackTitle: "Tech",
          stack: [
            "Frontend Development",
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "Web Performance",
            "Accessibility",
            "Git",
          ],
        },
        viaveneto: {
          eyebrow: "Featured case",
          title: "ViaVeneto - Men's Fashion E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the ViaVeneto e-commerce platform, a traditional men's fashion and tailoring brand.",
            "I collaborated in a multidisciplinary team to deliver a performant, accessible, and responsive storefront aligned with the brand's classic identity and user experience standards.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Implemented responsive frontend with HTML5, CSS3, and JavaScript.",
            "Ensured adherence to brand design guidelines and accessibility standards.",
            "Applied SEO best practices to improve organic discoverability.",
            "Managed codebase versioning and maintenance with Git.",
          ],
          stackTitle: "Tech",
          stack: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Wake Platform",
            "Responsive Web Design",
            "Accessibility",
            "E-commerce SEO",
            "Git",
          ],
        },
        yamuna: {
          eyebrow: "Featured case",
          title: "Yamuna - Natural & Health Products E-commerce",
          association: "Associated with Grupo Oásis (Agência Oásis)",
          overview: [
            "Frontend development of the Yamuna e-commerce platform, a brand specializing in natural foods, teas, spices, and wellness products.",
            "I focused on responsiveness, performance, accessibility, and SEO optimization, delivering an intuitive and pleasant shopping experience aligned with the brand's wellness-focused identity.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built responsive frontend with HTML5, CSS3, and JavaScript.",
            "Applied SEO best practices to enhance search engine visibility.",
            "Optimized page performance for a smooth, mobile-friendly experience.",
            "Collaborated with the Agência Oásis multidisciplinary team.",
          ],
          stackTitle: "Tech",
          stack: [
            "Frontend Development",
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Web Design",
            "SEO",
            "Web Performance",
            "Accessibility",
          ],
        },
        webcine: {
          eyebrow: "Personal project",
          title: "WebCine TV - Real-time Online Cinema Room",
          association: "Project created by Helison Dias",
          overview: [
            "Development of a web platform for watching online videos in shared rooms, focused on synchronized viewing, real-time conversation, and simple access without installation.",
            "The interface was designed to work well across desktop and mobile, with an immersive cinematic look, quick room creation, and a clear presentation of the platform's core features.",
          ],
          contributionsTitle: "Key contributions",
          contributions: [
            "Built the responsive interface for room creation, navigation, and feature presentation.",
            "Implemented a mobile-first experience for quick access across devices.",
            "Organized cards, usage steps, and interaction states with a focus on clarity.",
            "Published the web application with its own visual identity and direct entry flow.",
          ],
          stackTitle: "Tech",
          stack: [
            "Frontend Development",
            "Responsive Web Design",
            "Real-time UX",
            "Web Performance",
            "Accessibility",
            "Git",
          ],
        },
        rickmorty: {
          eyebrow: "Technical challenge",
          title: "Rick & Morty Wiki - Interactive Character Application",
          association: "Personal project by Helison Dias",
          overview: [
            "A front-end application built as a technical challenge to explore the official Rick and Morty API, featuring character listings, episodes, and locations.",
            "The project includes a dedicated Squad page where you can compare characters, calculate survival scores, and simulate interdimensional missions with Rick's sarcastic analysis. Fully bilingual (PT/EN) with dark/light mode toggling.",
          ],
          contributionsTitle: "Technical highlights",
          contributions: [
            "Infinite scroll powered by the Intersection Observer API for optimal performance.",
            "Batch character fetching via URL ID extraction with regex, drastically reducing API calls.",
            "Manual Focus Trap in modals via a dedicated hook, ensuring full keyboard accessibility.",
            "Theme and language preferences persisted in localStorage via Context API.",
            "Smooth animations with Framer Motion and unit tests with Vitest and Testing Library.",
          ],
          stackTitle: "Tech",
          stack: [
            "React 19",
            "TypeScript",
            "Vite",
            "styled-components",
            "React Router DOM",
            "Framer Motion",
            "Fetch API",
            "Vitest",
            "Testing Library",
            "Context API",
          ],
        },
      },
      items: [
        {
          storeName: "Fit Urban",
          category: "Fashion E-commerce",
          description:
            "Responsive storefront for a women's fitness fashion brand, with an extensive catalog, curated collections, and conversion-oriented navigation.",
          highlight: "Wake e-commerce for women's fitness fashion",
          myContributions: [
            "Implemented storefront sections, categories, product listings, and navigation with Wake and Scriban templates.",
            "Built responsive UI for color variants, collections, and mobile-first shopping flows.",
            "Improved cross-browser compatibility, performance, and visual polish aligned with the brand.",
          ],
        },
        {
          storeName: "HotRio",
          category: "Adult Products E-commerce",
          description:
            "Responsive storefront for an adult products brand, focused on brand identity, accessibility, and cross-browser compatibility.",
          highlight: "Wake e-commerce for adult products",
          myContributions: [
            "Built responsive layout structure with HTML5, CSS3, and JavaScript.",
            "Improved cross-browser compatibility and visual consistency.",
            "Provided technical support during QA and final adjustments.",
          ],
        },
        {
          storeName: "Mck Home",
          category: "Home & Gifts E-commerce",
          description:
            "Responsive storefront for a home and gifts brand, focused on clear navigation, accessibility, and visual identity.",
          highlight: "E-commerce for home, decor, and gifts",
          myContributions: [
            "Developed responsive layouts using HTML5, CSS3, and JavaScript.",
            "Applied accessibility, performance, and browsing experience best practices.",
            "Collaborated with design and product teams in an Agile workflow.",
          ],
        },
        {
          storeName: "Loja Serralheria",
          category: "Hardware & Tools E-commerce",
          description:
            "Responsive storefront for hardware professionals and tools retailers, focused on usability, performance, and clear technical navigation.",
          highlight: "E-commerce for hardware, construction, and tools",
          myContributions: [
            "Built responsive frontend components and layouts with HTML5, CSS3, and JavaScript.",
            "Improved performance, accessibility, and compatibility for recurring navigation.",
            "Collaborated with design, product, and engineering in an Agile workflow.",
          ],
        },
        {
          storeName: "Loja Ultra",
          category: "Truck Parts E-commerce",
          description:
            "Responsive storefront for truck parts and heavy vehicle accessories, focused on fast navigation and a well-structured technical catalog.",
          highlight: "E-commerce for trucks and heavy vehicles",
          myContributions: [
            "Built responsive components with HTML5, CSS3, and JavaScript.",
            "Improved navigation flow for a technical auto parts catalog.",
            "Kept visual consistency and brand alignment across devices.",
          ],
        },
        {
          storeName: "Tubarão Center",
          category: "Fishing & Airsoft E-commerce",
          description:
            "Responsive storefront for fishing, camping, and airsoft products, focused on fluid navigation for a niche technical catalog.",
          highlight: "E-commerce for fishing, camping, and airsoft",
          myContributions: [
            "Developed responsive layouts with HTML5, CSS3, and JavaScript.",
            "Optimized performance, accessibility, and navigation clarity.",
            "Collaborated with design, product, and tech teams in an Agile workflow.",
          ],
        },
        {
          storeName: "Useloft",
          category: "Luxury Fashion E-commerce",
          description:
            "Responsive storefront for premium fashion, focused on visual refinement, mobile-first experience, and sophisticated browsing.",
          highlight: "Fashion e-commerce with a premium experience",
          myContributions: [
            "Developed responsive interfaces with HTML5, CSS3, and JavaScript.",
            "Applied accessibility, UX, and visual performance best practices.",
            "Implemented UI aligned with premium brand guidelines.",
          ],
        },
        {
          storeName: "ViaVeneto",
          category: "Men's Fashion E-commerce",
          description:
            "Responsive storefront for men's fashion and tailoring, aligned with the brand's classic identity and e-commerce SEO best practices.",
          highlight: "Wake e-commerce for men's fashion",
          myContributions: [
            "Implemented responsive frontend with HTML5, CSS3, and JavaScript.",
            "Followed brand design, accessibility, and UX standards.",
            "Applied SEO best practices for e-commerce discoverability.",
          ],
        },
        {
          storeName: "Yamuna",
          category: "Natural & Health Products E-commerce",
          description:
            "Responsive storefront for natural products, teas, and wellness, focused on performance, SEO, and a pleasant mobile shopping experience.",
          highlight: "Natural and wellness products e-commerce",
          myContributions: [
            "Built responsive frontend with HTML5, CSS3, and JavaScript.",
            "Applied SEO, accessibility, and performance best practices.",
            "Aligned the shopping experience with the brand's natural wellness identity.",
          ],
        },
        {
          storeName: "WebCine TV",
          category: "Real-time Streaming Platform",
          description:
            "Personal platform for creating online cinema rooms, watching videos, and chatting with friends in real time.",
          highlight: "Online cinema with shared rooms",
          myContributions: [
            "Built a responsive interface for desktop and mobile.",
            "Created a cinematic visual experience with simple navigation.",
            "Designed a direct room creation flow and clear feature presentation.",
          ],
        },
        {
          storeName: "Rick & Morty Wiki",
          category: "Technical Challenge · React App",
          description:
            "Interactive character wiki with infinite scroll, filters, detail modals, a Squad system, and full bilingual support (PT/EN).",
          highlight: "Personal SPA with React, TypeScript & Rick and Morty API",
          myContributions: [
            "Infinite scroll via Intersection Observer and optimized batch fetching.",
            "Squad page with character comparison, survival score, and mission simulator.",
            "Dark/light theme and PT/EN language persisted via Context API and localStorage.",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Get in touch with me",
      description:
        "Available for Junior-Mid full-time roles and freelance projects.",
      emailTitle: "Email",
      emailText: "Click to open your email app with my address as the recipient.",
      copyEmail: "Copy email",
      copiedEmail: "Email copied",
      linkedinTitle: "LinkedIn",
      linkedinText: "Open my profile to connect, see my experience, and follow updates.",
    },
    footer: {
      availabilityPrefix: "Open to",
      role: "Fullstack",
      availabilitySuffix: "- Junior and Mid-level · Remote or Nova Friburgo, RJ",
      response: "I reply within 24h via email or LinkedIn.",
      madeWith: "Built with Next.js + Tailwind",
    },
  },
} as const;

type Dictionary = (typeof dictionary)[Language];
const languageStorageKey = "helison-language";

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: Dictionary;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const hasLoadedStoredLanguage = useRef(false);
  const pendingStoredLanguage = useRef<Language | null>(null);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageStorageKey);
    let frame = 0;

    if (storedLanguage === "pt" || storedLanguage === "en") {
      pendingStoredLanguage.current = storedLanguage;
      frame = window.requestAnimationFrame(() => {
        setLanguage(storedLanguage);
      });
    }

    hasLoadedStoredLanguage.current = true;

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    if (pendingStoredLanguage.current === language) {
      pendingStoredLanguage.current = null;
    }

    if (hasLoadedStoredLanguage.current && pendingStoredLanguage.current === null) {
      window.localStorage.setItem(languageStorageKey, language);
    }

    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  const updateLanguage = useCallback((nextLanguage: Language) => {
    hasLoadedStoredLanguage.current = true;
    setLanguage(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    hasLoadedStoredLanguage.current = true;
    setLanguage((current) => (current === "pt" ? "en" : "pt"));
  }, []);

  const value = useMemo(() => {
    const t = dictionary[language];

    return {
      language,
      setLanguage: updateLanguage,
      toggleLanguage,
      t,
    };
  }, [language, toggleLanguage, updateLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }

  return context;
}
