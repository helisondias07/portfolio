import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import LayoutSwitcher from "@/components/projects/LayoutSwitcher";
import ProjectsPreview from "@/components/projects/ProjectsPreview";
import { parseProjectLayout } from "@/components/projects/layout-types";
import Projects from "@/components/Projects";
import { isFilterId } from "@/lib/projects/explore";

export const metadata: Metadata = {
  title: "Projetos · Helison Dias",
  description: "Vitrine de projetos — opções de layout em prévia.",
  robots: { index: false, follow: false },
};

export default async function ProjetosIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; lane?: string }>;
}) {
  const sp = await searchParams;
  const layout = parseProjectLayout(sp.layout);
  const lane = isFilterId(sp.lane) ? sp.lane : "*";

  return (
    <>
      <Nav />
      <main id="conteudo">
        <LayoutSwitcher active={layout} />
        {layout === "current" ? <Projects /> : <ProjectsPreview layout={layout} lane={lane} />}
      </main>
      <Footer />
    </>
  );
}
