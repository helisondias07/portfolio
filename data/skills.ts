import {
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siJavascript,
  siJest,
  siJson,
  siNextdotjs,
  siReact,
  siRedux,
  siSass,
  siTailwindcss,
  siTestinglibrary,
  siTypescript,
  siVercel,
  siVite,
  siVscodium,
  siVuedotjs,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type SkillCategory = "frontend" | "backend" | "tools" | "quality";

export type Skill = {
  name: string;
  icon?: SimpleIcon;
  category: SkillCategory;
  badgeColor?: string;
};

export const skillCategories: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Integrações & Dados",
  tools: "Plataformas & Ferramentas",
  quality: "Qualidade & Estado",
};

export const skills: Skill[] = [
  { name: "React", icon: siReact, category: "frontend" },
  { name: "Next.js", icon: siNextdotjs, category: "frontend" },
  { name: "Vite", icon: siVite, category: "frontend" },
  { name: "TypeScript", icon: siTypescript, category: "frontend" },
  { name: "Vue.js", icon: siVuedotjs, category: "frontend" },
  { name: "JavaScript", icon: siJavascript, category: "frontend" },
  { name: "Tailwind CSS", icon: siTailwindcss, category: "frontend" },
  { name: "SCSS/Sass", icon: siSass, category: "frontend" },
  { name: "REST APIs", category: "backend", badgeColor: "0A66C2" },
  { name: "WebSockets", category: "backend", badgeColor: "0A66C2" },
  { name: "JSON", icon: siJson, category: "backend" },
  { name: "Wake Platform", category: "tools", badgeColor: "0A66C2" },
  { name: "Scriban", category: "tools", badgeColor: "0A66C2" },
  { name: "Vercel", icon: siVercel, category: "tools" },
  { name: "CI/CD", category: "tools", badgeColor: "0A66C2" },
  { name: "SEO", category: "tools", badgeColor: "0A66C2" },
  { name: "Open Graph", category: "tools", badgeColor: "0A66C2" },
  { name: "Figma", icon: siFigma, category: "tools" },
  { name: "Git", icon: siGit, category: "tools" },
  { name: "GitLab", icon: siGitlab, category: "tools" },
  { name: "GitHub", icon: siGithub, category: "tools" },
  { name: "VS Code", icon: siVscodium, category: "tools" },
  { name: "Metodologias Ágeis", category: "tools", badgeColor: "0A66C2" },
  { name: "Scrum", category: "tools", badgeColor: "0A66C2" },
  { name: "Kanban", category: "tools", badgeColor: "0A66C2" },
  { name: "Jest", icon: siJest, category: "quality" },
  { name: "React Testing Library", icon: siTestinglibrary, category: "quality" },
  { name: "Redux", icon: siRedux, category: "quality" },
  { name: "Zustand", category: "quality", badgeColor: "0A66C2" },
  { name: "Context API", category: "quality", badgeColor: "0A66C2" },
  { name: "Cross-browser Testing", category: "quality", badgeColor: "0A66C2" },
  { name: "Component-Driven Development", category: "quality", badgeColor: "0A66C2" },
];
