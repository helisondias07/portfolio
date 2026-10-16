"use client";
import { Fragment, useEffect, useRef } from "react";
import Counters from "./Counters";

// [text, highlighted]
const BIO: [string, boolean][] = [
  ["Sou Helison, desenvolvedor", false], ["frontend", true], ["há mais de 2 anos na Agência Oásis, de estagiário a júnior, unindo", false],
  ["e-commerce", true], ["e", false], ["automação com IA", true], [". Entrego storefronts em", false], ["React, Next.js, Vue.js e TypeScript", true],
  ["na plataforma", false], ["Wake", true], ["e participei da publicação de", false], ["mais de 10 lojas", true],
  ["em produção, com listagens dinâmicas, filtros em tempo real, checkout e campanhas de alto tráfego. Também atuo com migrações e temas na", false],
  ["Nuvemshop", true], [". No dia a dia, trabalho com", false], ["agentes de IA", true],
  ["e seus ecossistemas para automatizar tarefas e acelerar o desenvolvimento. Estou em Nova Friburgo, RJ, trabalhando remoto.", false],
];

const words = (t: string) => t.split(/\s+/).filter(Boolean).map((w, i) => <span key={i} className="w">{w}</span>).reduce<React.ReactNode[]>((a, w, i) => (i ? [...a, " ", w] : [w]), []);

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);

  // Scroll-linked word reveal.
  useEffect(() => {
    const bio = ref.current!;
    const ws = [...bio.querySelectorAll<HTMLElement>(".w")];
    const ems = [...bio.querySelectorAll<HTMLElement>("em")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ws.forEach((w) => w.classList.add("on"));
      ems.forEach((e) => e.classList.add("lit"));
      return;
    }
    let tick = false;
    const up = () => {
      tick = false;
      const r = bio.getBoundingClientRect();
      const vh = innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const n = Math.round(p * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
      ems.forEach((e) => e.classList.toggle("lit", !!e.querySelector(".w:last-child")?.classList.contains("on")));
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(up);
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", up);
    up();
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", up);
    };
  }, []);

  return (
    <section className="s ab" id="sobre">
      <div className="abw">
        <span className="mo abk">Sobre</span>
        <p className="bio" id="bio" ref={ref}>
          {BIO.map(([t, em], i) => {
            const glue = i > 0 && !t.startsWith(".") ? " " : "";
            return (
              <Fragment key={i}>
                {glue}
                {em ? <em>{words(t)}</em> : words(t)}
              </Fragment>
            );
          })}
        </p>
        <Counters />
        <dl className="skl">
          <div><dt>Stack</dt><dd>React, Next.js, Vue.js, TypeScript, JavaScript, HTML5, CSS3, Scriban, Python, N8N</dd></div>
          <div><dt>Plataformas</dt><dd>Wake, Nuvemshop, integrações REST</dd></div>
          <div><dt>IA no fluxo</dt><dd>Agentes e LLMs, Claude Code, Codex</dd></div>
          <div><dt>Formação</dt><dd>Ciência da Computação (Estácio), em andamento. Inglês C1</dd></div>
        </dl>
      </div>
    </section>
  );
}
