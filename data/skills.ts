import {
  siAngular,
  siAnthropic,
  siClaude,
  siDjango,
  siFigma,
  siFlask,
  siGit,
  siGithub,
  siGitlab,
  siJavascript,
  siJson,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siSass,
  siTailwindcss,
  siTypescript,
  siVscodium,
  siVuedotjs,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

export type SkillCategory = "frontend" | "backend" | "tools" | "ai";

export type Skill = {
  name: string;
  icon?: SimpleIcon;
  category: SkillCategory;
  badgeColor?: string;
};

export const skillCategories: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend & Runtime",
  tools: "Plataformas & Ferramentas",
  ai: "IA & Automação",
};

export const skills: Skill[] = [
  { name: "React", icon: siReact, category: "frontend" },
  { name: "Next.js", icon: siNextdotjs, category: "frontend" },
  { name: "TypeScript", icon: siTypescript, category: "frontend" },
  { name: "Vue.js", icon: siVuedotjs, category: "frontend" },
  { name: "Angular", icon: siAngular, category: "frontend" },
  { name: "JavaScript", icon: siJavascript, category: "frontend" },
  { name: "Tailwind CSS", icon: siTailwindcss, category: "frontend" },
  { name: "SCSS/Sass", icon: siSass, category: "frontend" },
  { name: "Node.js", icon: siNodedotjs, category: "backend" },
  { name: "Python", icon: siPython, category: "backend" },
  { name: "Django", icon: siDjango, category: "backend" },
  { name: "Flask", icon: siFlask, category: "backend" },
  { name: "REST APIs", category: "backend", badgeColor: "0A66C2" },
  { name: "JSON", icon: siJson, category: "backend" },
  { name: "Wake Platform", category: "tools", badgeColor: "0A66C2" },
  { name: "Scriban", category: "tools", badgeColor: "0A66C2" },
  { name: "Figma", icon: siFigma, category: "tools" },
  { name: "Git", icon: siGit, category: "tools" },
  { name: "GitLab", icon: siGitlab, category: "tools" },
  { name: "GitHub", icon: siGithub, category: "tools" },
  { name: "VS Code", icon: siVscodium, category: "tools" },
  { name: "Metodologias Ágeis", category: "tools", badgeColor: "0A66C2" },
  { name: "Scrum", category: "tools", badgeColor: "0A66C2" },
  { name: "Kanban", category: "tools", badgeColor: "0A66C2" },
  { name: "Claude Code", icon: siClaude, category: "ai" },
  { name: "Codex CLI", icon: siAnthropic, category: "ai" },
  { name: "AI Agent Workflows", category: "ai", badgeColor: "0A66C2" },
  { name: "LLM-augmented Development", category: "ai", badgeColor: "0A66C2" },
];
