"use client";
import { useEffect } from "react";

/**
 * Hero: typed headline + 3D keyboard (desktop, lazy three.js) + terminal; phone/tablet chat below 1024px.
 * The stage area is reserved in CSS from first paint, so the lazy 3D never shifts layout.
 */
export default function Hero() {
  useEffect(() => {
    import("@/lib/engines/hero").then((m) => m.startHero());
  }, []);
  return (
    <header className="hero g3" id="hero">
      <p className="tag mo">Desenvolvedor Frontend &amp; IA Engineer</p>
      <h1 className="hl" aria-label="interfaces que vendem, automações que trabalham por você.">
        <span className="hli">
          <span id="hl" />
          <span className="car" />
          <span id="hlr" className="hlr" aria-hidden="true">interfaces que vendem, automações que trabalham por você.</span>
        </span>
      </h1>
      <div className="hrow">
        <div className="stage" id="stage" aria-hidden="true">
          <div className="kb3" />
        </div>
        <aside className="term" aria-label="Terminal">
          <div className="tb">
            <i />
            <i />
            <i />
            <span>helison@portfolio — zsh</span>
          </div>
          <div className="bd" id="tbd" />
        </aside>
      </div>
      <div className="foot mo" hidden style={{ display: "none" }}>
        <span>Nova Friburgo, RJ</span>
        <span id="hint">Digite no seu teclado</span>
        <span>15+ projetos publicados</span>
      </div>
    </header>
  );
}
