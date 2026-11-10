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
    demo: null,
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
        "MVP local de um rascunho revisável de brag document. Fixtures sintéticas passam por normalização, deduplicação com proveniência, candidatos só com evidência e revisão humana — incluir ou excluir.",
        "Os dados são fictícios. Nada no repositório descreve realizações reais. Sem GitHub, ClickUp, Notion, contas, tokens ou deploy.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Pipeline TypeScript + UI Vite/React na mesma máquina (demo local).",
        "Revisor humano inclui ou exclui candidatos antes de qualquer uso.",
        "Adaptadores GitHub/ClickUp existem no código e ficam inativos neste recorte.",
      ],
      problem: "Manter um brag document na mão costuma falhar por falta de hábito — não por falta de ferramenta.",
      approach: "Gerar candidatos a partir de entradas locais e deixar a decisão no revisor. A UI não envia nada para fora.",
      learnings: ["Sem rotina semanal, sem Notion, sem integração live."],
      limits:
        "MVP local com fixtures sintéticas. Sem integrações live. GitHub/ClickUp inativos; sem Notion, contas, tokens ou deploy. A UI não envia dados.",
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
        "Local MVP of a revisable brag-document draft. Synthetic fixtures go through normalization, provenance-aware deduplication, evidence-only candidates, and a human include/exclude review.",
        "The data is fictitious. Nothing in the repo describes real accomplishments. No GitHub, ClickUp, Notion, accounts, tokens, or deploy.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "TypeScript pipeline plus a Vite/React UI on the same machine (local demo).",
        "A human reviewer includes or excludes candidates before any use.",
        "GitHub/ClickUp adapters exist in code and stay inactive in this cut.",
      ],
      problem: "Keeping a brag document by hand usually fails for lack of habit — not lack of a tool.",
      approach: "Generate candidates from local inputs and leave the decision with the reviewer. The UI does not send anything out.",
      learnings: ["No weekly routine, no Notion, no live integration."],
      limits:
        "Local MVP with synthetic fixtures. No live integrations. GitHub/ClickUp inactive; no Notion, accounts, tokens, or deploy. The UI sends no data.",
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
    demo: null,
    mvp: true,
    stack: ["TypeScript", "Node.js", "MCP"],
    pt: {
      name: "Crítica de planos",
      cat: "Experimento · protocolo",
      eyebrow: experimentEye,
      title: "Crítica de planos — segunda leitura local",
      association: authored,
      overview: [
        "MVP em TypeScript/Node: protocolo JSON, CLI e bancada na mesma máquina. O crítico padrão é heurístico e determinístico — não é um segundo LLM.",
        "A ferramenta MCP critique_plan é um instrumento, não um gate Plan→Build. Sem E2E com modelo ou host real.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Contrato JSON + CLI + UI local; nunca aprova o plano nem executa sugestões.",
        "http-chat fica NOT_CONFIGURED até o utilizador ligar um endpoint — não há modelo hospedado neste recorte.",
        "A bancada usa um plano de fixture para mostrar o fluxo; a lista de achados é qualitativa, não uma métrica.",
      ],
      problem: "Planos misturam passo útil com pressuposto, risco e trabalho que ainda não existe.",
      approach: "Separar o plano do parecer. O utilizador lê o JSON e decide; o crítico não tem autoridade de execução.",
      learnings: ["Heurística local não substitui um modelo; o recorte deixa isso explícito."],
      limits:
        "MVP. Sem modelo hospedado real; análise local. Sem E2E com LLM. Nunca aprova o plano nem executa sugestões.",
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
        "TypeScript/Node MVP: a JSON protocol, CLI, and bench on the same machine. The default critic is heuristic and deterministic — not a second LLM.",
        "The critique_plan MCP tool is an instrument, not a Plan→Build gate. No E2E with a real model or host.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "JSON contract plus CLI plus local UI; it never approves a plan or executes suggestions.",
        "http-chat stays NOT_CONFIGURED until the user wires an endpoint — no hosted model in this cut.",
        "The bench uses a fixture plan to show the flow; the findings list is qualitative, not a metric.",
      ],
      problem: "Plans mix useful steps with assumptions, risk, and work that does not exist yet.",
      approach: "Keep the plan and the critique apart. The user reads the JSON and decides; the critic has no execution authority.",
      learnings: ["Local heuristics are not a model; this cut makes that explicit."],
      limits:
        "MVP. No real hosted model; local analysis. No LLM E2E. It never approves a plan or executes suggestions.",
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
    demo: null,
    mvp: true,
    stack: ["TypeScript", "Node.js", "Vitest"],
    pt: {
      name: "Loop de agentes",
      cat: "Experimento · orquestração",
      eyebrow: experimentEye,
      title: "Loop de agentes — simulação com gates",
      association: authored,
      overview: [
        "Controlador de fluxo spec → plan → implementação → verificação → review. A simulação é determinística: zero LLM, zero rede, zero autenticação.",
        "A tarefa é sintética (filtrar um catálogo local). O adapter live do Cursor CLI não está implementado.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "Contratos tipados e gates humanos só no controlador — o adapter não aprova sozinho.",
        "Runner determinístico: verificação é o JSON do harness mais o código de saída, não um KPI de produtividade.",
        "Sem baseline executado, sem loja real, sem evidência de velocidade de entrega.",
      ],
      problem: "Loops de agente misturam fase, aprovação e a frase «o modelo disse que passou».",
      approach: "Separar fases, exigir aprovação humana no controlador e verificar com um harness local — não com um LLM.",
      learnings: ["Simulação controlada não é evidência de produtividade."],
      limits:
        "Simulação controlada com gates. Sem agentes LLM live. Não é evidência de produtividade. Sem baseline, sem loja real.",
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
        "A flow controller: spec → plan → implementation → verification → review. The simulation is deterministic: zero LLM, zero network, zero auth.",
        "The task is synthetic (filter a local catalog). The live Cursor CLI adapter is not implemented.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "Typed contracts and human gates only in the controller — the adapter does not approve on its own.",
        "Deterministic runner: verification is the harness JSON plus the exit code, not a productivity KPI.",
        "No executed baseline, no real store, no delivery-speed evidence.",
      ],
      problem: "Agent loops mix phase, approval, and the line “the model said it passed”.",
      approach: "Split phases, require human approval in the controller, and verify with a local harness — not with an LLM.",
      learnings: ["A controlled simulation is not productivity evidence."],
      limits:
        "Controlled simulation with gates. No live LLM agents. Not productivity evidence. No baseline, no real store.",
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
    demo: null,
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
        "Experimento sintético de JSON versus Protobuf em Node.js, com payloads inspirados em storefront. Mede esta máquina — não mede loja real, HTTP, compressão, browser nem dados de clientes.",
        "Hipótese: vantagens de tamanho e tempo dependem da forma e da cardinalidade. Sem vencedor antecipado. O 14× do artigo de João Raul é cenário .NET, não é resultado deste repositório.",
      ],
      contributionsTitle: "O que o repositório faz",
      contributions: [
        "JSON nativo versus @bufbuild/protobuf com codegen; warmup, processos em série, Node 22 nesta VM.",
        "Painel e artigo são derivados dos brutos já medidos — não relançam o loop.",
        "O README não publica uma tabela de resultado nesta vitrine — sem número inventado.",
      ],
      problem: "Tamanho e tempo de serialização mudam com a forma do payload; copiar um múltiplo de outro runtime não prova o caso Node.",
      approach: "Medir JSON e Protobuf no mesmo processo Node, nesta máquina, com protocolo de warmup — e deixar o caminho pré-construído de fora quando não há série.",
      learnings: ["Resultados de uma máquina. Sem tráfego de loja real."],
      limits:
        "JSON × Protobuf em Node. O caminho mensagem pré-construída → bytes não foi medido. Resultados de uma máquina. Não mede loja real.",
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
        "A synthetic JSON versus Protobuf experiment in Node.js, with storefront-inspired payloads. It measures this machine — not a real store, HTTP, compression, the browser, or customer data.",
        "Hypothesis: size and time advantages depend on shape and cardinality. No predetermined winner. João Raul’s 14× figure is a .NET scenario, not a result of this repo.",
      ],
      contributionsTitle: "What the repo does",
      contributions: [
        "Native JSON versus @bufbuild/protobuf with codegen; warmup, serial processes, Node 22 on this VM.",
        "The dashboard and article are derived from already-measured raw files — they do not rerun the loop.",
        "The README does not publish a results table on this site — no invented number.",
      ],
      problem: "Serialization size and time change with payload shape; copying a multiple from another runtime does not prove the Node case.",
      approach: "Measure JSON and Protobuf in the same Node process, on this machine, with a warmup protocol — and omit the pre-built path when there is no series.",
      learnings: ["One-machine results. No real store traffic."],
      limits:
        "JSON × Protobuf in Node. The pre-built message → bytes path was not measured. One-machine results. Does not measure a real store.",
      inspiration: {
        text: "Inspiration: João Raul, Protobuf vs JSON — independent implementation; the article’s 14× is not from this repo.",
        href: "https://joaoraul.dev/writing/protobuf-vs-json/",
      },
    },
  },
  {
    id: "timesheet",
    public: false,
    github: null,
    demo: null,
    mvp: true,
    stack: ["TypeScript"],
    pt: {
      name: "Timesheet inteligente",
      cat: "Experimento",
      eyebrow: experimentEye,
      title: "Timesheet inteligente",
      association: authored,
      overview: ["Rascunho interno. Ainda não publicado."],
      contributionsTitle: "Papel",
      contributions: [],
      problem: "",
      approach: "",
      learnings: [],
      limits: "Unpublished.",
      inspiration: { text: "", href: "" },
    },
    en: {
      name: "Smart timesheet",
      cat: "Experiment",
      eyebrow: experimentEyeEn,
      title: "Smart timesheet",
      association: authoredEn,
      overview: ["Internal draft. Not published yet."],
      contributionsTitle: "Role",
      contributions: [],
      problem: "",
      approach: "",
      learnings: [],
      limits: "Unpublished.",
      inspiration: { text: "", href: "" },
    },
  },
];
