import { dict } from "@/lib/i18n/dict";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import Tx from "./Tx";

export default function Nav() {
  return (
    <nav>
      <b className="lg">
        Helison Dias<span style={{ color: "var(--g)" }}>.</span>
      </b>
      <div className="ls">
        <a href="#sobre"><Tx pt={dict.pt.nav.about} en={dict.en.nav.about} /></a>
        <a href="#projetos"><Tx pt={dict.pt.nav.projects} en={dict.en.nav.projects} /></a>
        <a href="#contato"><Tx pt={dict.pt.nav.contact} en={dict.en.nav.contact} /></a>
        <span className="lsd" aria-hidden="true" />
        <LangToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
