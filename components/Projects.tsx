"use client";
import { useEffect } from "react";
import { projects } from "@/data/projects";

/** Coverflow carousel (12 real projects) + "Case em destaque" that crossfades with the active card. */
export default function Projects() {
  useEffect(() => {
    import("@/lib/engines/projects").then((m) => m.startProjects(projects));
  }, []);
  return (
    <section className="s pj4" id="projetos">
      <div className="abw">
        <span className="mo abk">Cases selecionados</span>
        <div className="p4h">
          <h2>Projetos</h2>
          <p>Projetos em e-commerce, integrações e automação aplicados a interfaces reais.</p>
        </div>
      </div>
      <ul className="sr">
        {projects.map((p) => (
          <li key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.overview[0]}</p>
            {p.url ? <a href={p.url}>{p.url}</a> : null}
          </li>
        ))}
      </ul>
      <div className="cf" id="cf" tabIndex={0} aria-roledescription="carrossel" aria-label="Projetos">
        <div className="cft" id="cft" />
        <button className="cfa l" id="cfl" aria-label="Projeto anterior">←</button>
        <button className="cfa r" id="cfr" aria-label="Próximo projeto">→</button>
      </div>
      <div className="cfn">
        <button className="cfa m" id="cfl2" aria-label="Projeto anterior">←</button>
        <div className="dots" id="dots" role="group" aria-label="Indicadores de projeto" />
        <span className="cnt mo" id="cnt">01 / {String(projects.length).padStart(2, "0")}</span>
        <button className="cfa m" id="cfr2" aria-label="Próximo projeto">→</button>
      </div>
      <div className="abw">
        <div className="cdh">
          <span className="mo abk">Case em destaque</span>
          <span className="cdn" id="cdn" />
        </div>
        <article className="csd" id="csd" />
      </div>
    </section>
  );
}
