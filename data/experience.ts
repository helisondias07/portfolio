export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Grupo Oásis (Agência Oásis)",
    role: "Desenvolvedor de Software - Frontend",
    period: "Jan 2025 - Presente",
    location: "Nova Friburgo, RJ - Remoto",
    current: true,
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
];
