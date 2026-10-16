import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav>
      <b style={{ font: "700 19px 'General Sans'", letterSpacing: "-.03em" }}>
        Helison Dias<span style={{ color: "var(--g)" }}>.</span>
      </b>
      <div className="ls">
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
      </div>
      <div className="nvr">
        <a className="mo" href="#contato">
          <span className="dot" />
          Disponível<span className="pj"> para projetos</span>
        </a>
        <ThemeToggle />
      </div>
    </nav>
  );
}
