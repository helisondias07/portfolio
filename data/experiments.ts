export type ExperimentId = "critica" | "timesheet" | "benchmark" | "loop" | "brag";

export type ExperimentCopy = {
  name: string;
  cat: string;
  eyebrow: string;
  title: string;
  association: string;
  overview: string[];
  contributionsTitle: string;
  contributions: string[];
  problem: string;
  approach: string;
  learnings: string[];
  limits: string;
  inspiration: { text: string; href: string };
};

export type ExperimentRecord = {
  id: ExperimentId;
  public: boolean;
  github: string | null;
  demo: string | null;
  mvp: true;
  stack: string[];
  img?: string;
  mimg?: string;
  dw?: number;
  dh?: number;
  mw?: number;
  mh?: number;
  pt: ExperimentCopy;
  en: ExperimentCopy;
};

export function publicExperiments(): ExperimentRecord[] {
  return experiments.filter((item) => item.public && Boolean(item.github));
}

const authored = "Projeto criado por Helison Dias";
const authoredEn = "Project created by Helison Dias";
const experimentEye = "Experimento";
const experimentEyeEn = "Experiment";

export const experiments: ExperimentRecord[] = [
  {
    id: "brag",
    public: true,
    github: "https://github.com/helisondias07/brag-semanal",
    demo: "https://brag-semanal.vercel.app",
    mvp: true,
    stack: ["TypeScript", "React", "Vite", "Vitest", "Playwright"],
    img: "brag-screenshot.png",
    mimg: "brag-screenshot-m.png",
    dw: 1280,
    dh: 800,
    mw: 422,
    mh: 890,
    pt: {
      name: "Brag semanal",
      cat: "Experimento · texto",
      eyebrow: experimentEye,
      title: "Brag semanal — rascunho revisável",
      association: authored,
      overview: [
        "MVP de um rascunho revisável de brag document. Fixtures sintéticas passam por normalização, deduplicação com proveniência, candidatos só com evidência e revisão humana.",
        "A demo ao vivo roda só no browser, com dados sintéticos e estado em localStorage. Nada descreve realizações reais. Sem GitHub, ClickUp ou Notion live.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Pipeline TypeScript + UI Vite/React; a demo pública não sai do browser.",
        "Revisor humano inclui ou exclui candidatos antes de qualquer uso.",
        "Adaptadores GitHub/ClickUp existem no código e ficam inativos neste recorte.",
      ],
      problem: "Manter um brag document na mão costuma falhar por falta de hábito — não por falta de ferramenta.",
      approach: "Gerar candidatos a partir de entradas locais e deixar a decisão no revisor.",
      learnings: ["A demo ao vivo é estática no browser; não há rotina semanal nem integração live."],
      limits:
        "Demo só no browser, com dados sintéticos e estado em localStorage. Sem integrações live GitHub/ClickUp. Sem Notion, contas ou tokens.",
      inspiration: {
        text: "Inspiração: João Raul, Automated brag document — implementação independente, sem código copiado.",
        href: "https://joaoraul.dev/writing/automated-brag-document/",
      },
    },
    en: {
      name: "Weekly brag",
      cat: "Experiment · writing",
      eyebrow: experimentEyeEn,
      title: "Weekly brag — a revisable draft",
      association: authoredEn,
      overview: [
        "MVP of a revisable brag-document draft. Synthetic fixtures go through normalization, provenance-aware deduplication, evidence-only candidates, and a human review.",
        "The live demo runs in the browser only, with synthetic data and state in localStorage. Nothing describes real accomplishments. No live GitHub, ClickUp, or Notion.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "TypeScript pipeline plus a Vite/React UI; the public demo never leaves the browser.",
        "A human reviewer includes or excludes candidates before any use.",
        "GitHub/ClickUp adapters exist in code and stay inactive in this cut.",
      ],
      problem: "Keeping a brag document by hand usually fails for lack of habit — not lack of a tool.",
      approach: "Generate candidates from local inputs and leave the decision with the reviewer.",
      learnings: ["The live demo is a static browser app; no weekly routine, no live integration."],
      limits:
        "Browser-only demo with synthetic data and state in localStorage. No live GitHub/ClickUp integrations. No Notion, accounts, or tokens.",
      inspiration: {
        text: "Inspiration: João Raul, Automated brag document — independent implementation, no copied code.",
        href: "https://joaoraul.dev/writing/automated-brag-document/",
      },
    },
  },
  {
    id: "critica",
    public: true,
    github: "https://github.com/helisondias07/critica-de-planos",
    demo: "https://critica-de-planos.vercel.app",
    mvp: true,
    stack: ["TypeScript", "Node.js", "MCP"],
    pt: {
      name: "Crítica de planos",
      cat: "Experimento · protocolo",
      eyebrow: experimentEye,
      title: "Crítica de planos — segunda leitura local",
      association: authored,
      overview: [
        "MVP: protocolo JSON, CLI e uma bancada. O crítico padrão é heurístico e determinístico — não é um segundo LLM.",
        "A demo ao vivo analisa no browser, sem modelo de IA hospedado. A ferramenta MCP critique_plan é um instrumento, não um gate Plan→Build.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Contrato JSON + CLI + UI; nunca aprova o plano nem executa sugestões.",
        "A demo pública é heurística local no browser — sem modelo hospedado.",
        "A bancada usa um plano de fixture; a lista de achados é qualitativa, não uma métrica.",
      ],
      problem: "Planos misturam passo útil com pressuposto, risco e trabalho que ainda não existe.",
      approach: "Separar o plano do parecer. O utilizador lê o JSON e decide; o crítico não tem autoridade de execução.",
      learnings: ["Heurística no browser não substitui um modelo; o recorte deixa isso explícito."],
      limits:
        "Demo estática no browser: análise heurística local. Sem modelo de IA hospedado. Nunca aprova o plano nem executa sugestões.",
      inspiration: {
        text: "Inspiração do problema: segunda opinião sobre o plano (jrlucas1/claude-critique-hook) — implementação independente.",
        href: "https://github.com/jrlucas1/claude-critique-hook",
      },
    },
    en: {
      name: "Plan critique",
      cat: "Experiment · protocol",
      eyebrow: experimentEyeEn,
      title: "Plan critique — a local second read",
      association: authoredEn,
      overview: [
        "MVP: a JSON protocol, CLI, and bench. The default critic is heuristic and deterministic — not a second LLM.",
        "The live demo analyzes in the browser, with no hosted AI model. The critique_plan MCP tool is an instrument, not a Plan→Build gate.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "JSON contract plus CLI plus UI; it never approves a plan or executes suggestions.",
        "The public demo is a local heuristic in the browser — no hosted model.",
        "The bench uses a fixture plan; the findings list is qualitative, not a metric.",
      ],
      problem: "Plans mix useful steps with assumptions, risk, and work that does not exist yet.",
      approach: "Keep the plan and the critique apart. The user reads the JSON and decides; the critic has no execution authority.",
      learnings: ["In-browser heuristics are not a model; this cut makes that explicit."],
      limits:
        "Static browser demo: local heuristic analysis. No hosted AI model. It never approves a plan or executes suggestions.",
      inspiration: {
        text: "Problem inspiration: a second opinion on the plan (jrlucas1/claude-critique-hook) — independent implementation.",
        href: "https://github.com/jrlucas1/claude-critique-hook",
      },
    },
  },
  {
    id: "loop",
    public: true,
    github: "https://github.com/helisondias07/loop-de-agentes",
    demo: "https://loop-de-agentes.vercel.app",
    mvp: true,
    stack: ["TypeScript", "Node.js", "Vitest"],
    pt: {
      name: "Loop de agentes",
      cat: "Experimento · orquestração",
      eyebrow: experimentEye,
      title: "Loop de agentes — simulação com gates",
      association: authored,
      overview: [
        "Controlador de fluxo spec → plan → implementação → verificação → review. A simulação é determinística: zero LLM live.",
        "A demo ao vivo é uma simulação no browser, com gates e verificação simulada. Não é evidência de produtividade.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Contratos tipados e gates humanos só no controlador — o adapter não aprova sozinho.",
        "Verificação na demo é simulada no browser, não um KPI de entrega.",
        "Sem baseline executado, sem loja real, sem evidência de velocidade.",
      ],
      problem: "Loops de agente misturam fase, aprovação e a frase «o modelo disse que passou».",
      approach: "Separar fases, exigir aprovação humana no controlador e verificar com um harness — não com um LLM.",
      learnings: ["Simulação controlada, mesmo no browser, não é evidência de produtividade."],
      limits:
        "Simulação determinística com gates e verificação simulada no browser. Sem agentes LLM live. Não é evidência de produtividade.",
      inspiration: {
        text: "Inspiração: João Raul, Superpowered Ralph — implementação independente, sem código copiado.",
        href: "https://joaoraul.dev/writing/superpowered-ralph/",
      },
    },
    en: {
      name: "Agent loop",
      cat: "Experiment · orchestration",
      eyebrow: experimentEyeEn,
      title: "Agent loop — a gated simulation",
      association: authoredEn,
      overview: [
        "A flow controller: spec → plan → implementation → verification → review. The simulation is deterministic: no live LLM.",
        "The live demo is a browser simulation with gates and simulated verification. It is not productivity evidence.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "Typed contracts and human gates only in the controller — the adapter does not approve on its own.",
        "Verification in the demo is simulated in the browser, not a delivery KPI.",
        "No executed baseline, no real store, no speed evidence.",
      ],
      problem: "Agent loops mix phase, approval, and the line “the model said it passed”.",
      approach: "Split phases, require human approval in the controller, and verify with a harness — not with an LLM.",
      learnings: ["A controlled simulation, even in the browser, is not productivity evidence."],
      limits:
        "Deterministic simulation with gates and simulated browser verification. No live LLM agents. Not productivity evidence.",
      inspiration: {
        text: "Inspiration: João Raul, Superpowered Ralph — independent implementation, no copied code.",
        href: "https://joaoraul.dev/writing/superpowered-ralph/",
      },
    },
  },
  {
    id: "benchmark",
    public: true,
    github: "https://github.com/helisondias07/benchmark-serializacao",
    demo: "https://benchmark-serializacao.vercel.app",
    mvp: true,
    stack: ["Node.js", "TypeScript", "Protobuf"],
    img: "benchmark-screenshot.png",
    mimg: "benchmark-screenshot-m.png",
    dw: 1440,
    dh: 900,
    mw: 1024,
    mh: 2161,
    pt: {
      name: "Benchmark de serialização",
      cat: "Experimento · medição",
      eyebrow: experimentEye,
      title: "JSON × Protobuf em Node — um ensaio",
      association: authored,
      overview: [
        "Experimento sintético de JSON versus Protobuf em Node.js, com payloads inspirados em storefront. Mede uma máquina — não mede loja real, HTTP, compressão, browser nem dados de clientes.",
        "A demo ao vivo é o painel desse ensaio. Hipótese: vantagens dependem da forma e da cardinalidade. O 14× do artigo de João Raul é cenário .NET, não é resultado deste repositório.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "JSON nativo versus @bufbuild/protobuf com codegen; warmup, processos em série, Node 22.",
        "O painel deriva dos brutos já medidos — não relança o loop.",
        "O README não publica uma tabela de resultado nesta vitrine — sem número inventado.",
      ],
      problem: "Tamanho e tempo de serialização mudam com a forma do payload; copiar um múltiplo de outro runtime não prova o caso Node.",
      approach: "Medir JSON e Protobuf no mesmo processo Node, nesta máquina, com protocolo de warmup — e deixar o caminho pré-construído de fora quando não há série.",
      learnings: ["Resultados de uma máquina. Sem tráfego de loja real."],
      limits:
        "Painel de resultados de uma máquina. JSON × Protobuf em Node. O caminho mensagem pré-construída → bytes não foi medido. Não mede loja real.",
      inspiration: {
        text: "Inspiração: João Raul, Protobuf vs JSON — implementação independente; o 14× do artigo não é deste repo.",
        href: "https://joaoraul.dev/writing/protobuf-vs-json/",
      },
    },
    en: {
      name: "Serialization benchmark",
      cat: "Experiment · measurement",
      eyebrow: experimentEyeEn,
      title: "JSON × Protobuf in Node — one run",
      association: authoredEn,
      overview: [
        "A synthetic JSON versus Protobuf experiment in Node.js, with storefront-inspired payloads. It measures one machine — not a real store, HTTP, compression, the browser, or customer data.",
        "The live demo is that run’s dashboard. Hypothesis: advantages depend on shape and cardinality. João Raul’s 14× figure is a .NET scenario, not a result of this repo.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "Native JSON versus @bufbuild/protobuf with codegen; warmup, serial processes, Node 22.",
        "The dashboard is derived from already-measured raw files — it does not rerun the loop.",
        "The README does not publish a results table on this site — no invented number.",
      ],
      problem: "Serialization size and time change with payload shape; copying a multiple from another runtime does not prove the Node case.",
      approach: "Measure JSON and Protobuf in the same Node process, on this machine, with a warmup protocol — and omit the pre-built path when there is no series.",
      learnings: ["One-machine results. No real store traffic."],
      limits:
        "Results dashboard from one machine. JSON × Protobuf in Node. The pre-built message → bytes path was not measured. Does not measure a real store.",
      inspiration: {
        text: "Inspiration: João Raul, Protobuf vs JSON — independent implementation; the article’s 14× is not from this repo.",
        href: "https://joaoraul.dev/writing/protobuf-vs-json/",
      },
    },
  },
  {
    id: "timesheet",
    public: true,
    github: "https://github.com/helisondias07/timesheet-inteligente",
    demo: "https://timesheet-inteligente.vercel.app",
    mvp: true,
    stack: ["TypeScript", "Next.js", "React"],
    img: "timesheet-screenshot.png",
    mimg: "timesheet-screenshot-m.png",
    dw: 1440,
    dh: 900,
    mw: 1024,
    mh: 2218,
    pt: {
      name: "Timesheet inteligente",
      cat: "Experimento · evidências",
      eyebrow: experimentEye,
      title: "Timesheet inteligente — mesa de evidências",
      association: authored,
      overview: [
        "Mesa de evidências que agrupa atividades sintéticas por dia em America/Sao_Paulo, pede revisão humana e exporta JSON/CSV. A fixture vem marcada como demonstração.",
        "Demo sintético: não consulta contas reais, não chama GitHub/ClickUp, não usa LLM e não preenche horas sozinho. Duração sugerida fica vazia até a pessoa preencher.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Normaliza commits, PRs e tarefas sintéticos e agrupa no calendário sem reescrever o timestamp original.",
        "Exige revisão humana por dia (aprovar / marcar revisão / rejeitar) antes do export.",
        "Portas GitHub/ClickUp só leem fixtures offline; fetchRemote() lança erro de propósito.",
      ],
      problem: "Timesheet à mão mistura evidência, duração inventada e conta real — este recorte separa as três coisas.",
      approach: "Importar JSON sintético, deixar horas vazias, e só exportar depois da revisão humana.",
      learnings: ["Não inventar trabalho nem distribuir 8h. Sem LLM neste MVP."],
      limits:
        "Demo sintético. Sem integração live GitHub/ClickUp. Sem LLM. Não inventa horas.",
      inspiration: {
        text: "Inspiração contextual: João Raul, We Built a Timesheet Auto-Filler… — implementação independente, sem cópia de código.",
        href: "https://joaoraul.dev/writing/timesheet-auto-filler/",
      },
    },
    en: {
      name: "Smart timesheet",
      cat: "Experiment · evidence",
      eyebrow: experimentEyeEn,
      title: "Smart timesheet — an evidence desk",
      association: authoredEn,
      overview: [
        "An evidence desk that groups synthetic activities by day in America/Sao_Paulo, asks for a human review, and exports JSON/CSV. The fixture is labeled as a demonstration.",
        "Synthetic demo: it does not query real accounts, call GitHub/ClickUp, use an LLM, or fill hours on its own. Suggested duration stays empty until a person types it.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "Normalizes synthetic commits, PRs, and tasks and groups them on the calendar without rewriting the original timestamp.",
        "Requires a human review per day (approve / flag / reject) before export.",
        "GitHub/ClickUp ports only read offline fixtures; fetchRemote() throws on purpose.",
      ],
      problem: "A handmade timesheet mixes evidence, invented duration, and a real account — this cut keeps the three apart.",
      approach: "Import synthetic JSON, leave hours empty, and export only after a human review.",
      learnings: ["Do not invent work or spread 8h. No LLM in this MVP."],
      limits:
        "Synthetic demo. No live GitHub/ClickUp integration. No LLM. Does not invent hours.",
      inspiration: {
        text: "Contextual inspiration: João Raul, We Built a Timesheet Auto-Filler… — independent implementation, no copied code.",
        href: "https://joaoraul.dev/writing/timesheet-auto-filler/",
      },
    },
  },
];
