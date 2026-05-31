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
    role: "Desenvolvedor Frontend",
    period: "Abr 2024 - Presente",
    location: "Nova Friburgo, RJ - Remoto",
    current: true,
    bullets: [
      "Desenvolvimento de interfaces e-commerce responsivas e acessíveis com React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, SCSS e Tailwind CSS para mais de 10 lojas de clientes na plataforma Wake.",
      "Integração de REST APIs para listagens dinâmicas de produtos, filtros de busca em tempo real e fluxos de checkout em múltiplos projetos simultâneos.",
      "Desenvolvimento e manutenção de módulos Wake personalizados e templates Scriban para landing pages e vitrines por cliente.",
      "Desenvolvimento de componentes de UI reutilizáveis e implementação de testes com Jest e React Testing Library, aumentando a consistência visual e a estabilidade em releases de produção.",
      "Execução de testes cross-browser e responsivos em campanhas promocionais de alto tráfego, garantindo paridade visual entre dispositivos.",
      "Automação de tarefas repetitivas no pipeline de desenvolvimento via scripts e ferramentas de CLI, acelerando o ciclo de entregas.",
      "Gestão de base de código versionada via Git e GitLab em equipe ágil totalmente remota, com fluxo baseado em Scrum e Kanban.",
    ],
  },
];
