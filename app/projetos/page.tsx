import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import LayoutSwitcher from "@/components/projects/LayoutSwitcher";
import ProjectsPreview from "@/components/projects/ProjectsPreview";
import { layoutLabEnabled, resolvePublicLayout } from "@/components/projects/layout-types";
import { isFilterId } from "@/lib/projects/explore";

export const metadata: Metadata = {
  title: "Projetos · Helison Dias",
  description: "Vitrine de projetos de Helison Dias.",
  robots: { index: false, follow: false },
};

export default async function ProjetosIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; lane?: string }>;
}) {
  if (!layoutLabEnabled()) redirect("/#projetos");

  const sp = await searchParams;
  const layout = resolvePublicLayout(sp.layout);
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
