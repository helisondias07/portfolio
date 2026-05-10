import { Layout, MonitorSmartphone, Plug } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ValueProp = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const valueProps: ValueProp[] = [
  {
    icon: Layout,
    title: "Interfaces que funcionam de verdade",
    desc: "Entrego UIs responsivas, acessíveis e performáticas, testadas em múltiplos browsers e dispositivos.",
  },
  {
    icon: Plug,
    title: "Integração com APIs do zero",
    desc: "Conecto frontend a REST APIs para listagens dinâmicas, filtros, checkout e fluxos de produto.",
  },
  {
    icon: MonitorSmartphone,
    title: "Design responsivo em todos os dispositivos",
    desc: "Crio experiências consistentes para desktop, tablet e mobile, com layouts adaptáveis e testados em diferentes telas.",
  },
];
