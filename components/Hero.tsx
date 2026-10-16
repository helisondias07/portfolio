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
      <p className="tag mo">Frontend · E-commerce · Automação com IA</p>
      <h1 className="hl" aria-label="helison dias, dev frontend & ia engineer">
        <span className="hli">
          <span id="hl" />
          <span className="car" />
        </span>
        <span id="hlr" hidden />
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
        <span>Nova Friburgo, RJ — Remoto</span>
        <span id="hint">Digite no seu teclado</span>
        <span>10+ lojas Wake em produção</span>
      </div>
    </header>
  );
}
