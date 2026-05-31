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
    title: "Integração com APIs e dados em tempo real",
    desc: "Conecto frontends a REST APIs, WebSockets e serviços de terceiros para listagens, filtros, checkout e experiências sincronizadas.",
  },
  {
    icon: MonitorSmartphone,
    title: "Qualidade para releases em produção",
    desc: "Crio componentes reutilizáveis, cubro fluxos com Jest e React Testing Library e valido a experiência em diferentes browsers e telas.",
  },
];
