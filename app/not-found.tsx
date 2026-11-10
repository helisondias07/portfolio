import Link from "next/link";
import Nav from "@/components/Nav";
import Tx from "@/components/Tx";
import { dict } from "@/lib/i18n/dict";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="conteudo" className="czpage">
        <h1>404</h1>
        <p>
          <Tx pt={dict.pt.projectsUi.notFound} en={dict.en.projectsUi.notFound} />
        </p>
        <p>
          <Link href="/#projetos">
            <Tx pt={dict.pt.projectsUi.backToWork} en={dict.en.projectsUi.backToWork} />
          </Link>
        </p>
      </main>
    </>
  );
}
