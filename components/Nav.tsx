import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav>
      <b className="lg">
        Helison Dias<span style={{ color: "var(--g)" }}>.</span>
      </b>
      <div className="ls">
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
        <span className="lsd" aria-hidden="true" />
        <ThemeToggle />
      </div>
    </nav>
  );
}
