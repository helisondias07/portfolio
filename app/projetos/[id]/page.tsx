import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseView from "@/components/CaseView";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { casePath, isPublishedProjectId, projectById, publishedProjectIds } from "@/lib/projects/catalog";

export const dynamicParams = false;

export async function generateStaticParams() {
  return publishedProjectIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectById(id);
  if (!project) return { title: "Helison Dias" };
  return {
    title: `${project.name} · Helison Dias`,
    description: project.overview[0],
    alternates: { canonical: casePath(id) },
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isPublishedProjectId(id)) notFound();
  const project = projectById(id);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main id="conteudo" className="czpage">
        <CaseView project={project} />
      </main>
      <Footer />
    </>
  );
}
