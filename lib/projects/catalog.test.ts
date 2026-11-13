import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { parseProjectLayout, resolvePublicLayout } from "../../components/projects/layout-types";
import { experiments } from "../../data/experiments";
import { enProjects } from "../i18n/projects-en";
import { projects } from "../../data/projects";
import {
  catalogBlob,
  casePath,
  filterPublished,
  galleryPath,
  isPublishedProjectId,
  laneFromSearch,
  projectById,
  projectLane,
  publicExperimentCount,
  publishedProjectIds,
  publishedProjects,
  unpublishedExperimentIds,
} from "./catalog";
import { FILTERS } from "./explore";

const publishedExperimentIds = ["benchmark", "brag", "critica", "loop", "timesheet"] as const;

test("five GitHub experiments are published with demos", () => {
  assert.deepEqual(unpublishedExperimentIds(), []);
  assert.equal(publicExperimentCount(), 5);
  for (const id of publishedExperimentIds) {
    const project = projectById(id);
    assert.ok(project, id);
    assert.equal(project.mvp, true);
    assert.ok(project.limits);
    assert.match(project.url, /^https:\/\/github\.com\/helisondias07\//);
    assert.match(project.demo ?? "", /^https:\/\/.+\.vercel\.app$/);
    assert.match(project.img ?? "", /\.(png|webp)$/);
    assert.match(project.mimg ?? "", /\.(png|webp)$/);
    assert.equal(isPublishedProjectId(id), true);
    assert.equal(projectLane(project), "authored");
  }
});

test("published experiment copy cites joaoraul.dev where the source already does", () => {
  assert.match(projectById("brag")!.inspiration!.href, /joaoraul\.dev\/writing\/automated-brag-document/);
  assert.match(projectById("loop")!.inspiration!.href, /joaoraul\.dev\/writing\/superpowered-ralph/);
  assert.match(projectById("benchmark")!.inspiration!.href, /joaoraul\.dev\/writing\/protobuf-vs-json/);
  assert.match(projectById("timesheet")!.inspiration!.href, /joaoraul\.dev\/writing\/timesheet-auto-filler/);
  assert.doesNotMatch(projectById("critica")!.inspiration!.href, /joaoraul\.dev/);
});

test("retired Fazenda and Counter-Strike scopes are absent from catalog source", () => {
  const blob = catalogBlob() + JSON.stringify(experiments) + JSON.stringify(publishedProjects());
  assert.equal(/fazenda|talh[aã]o|counter-?strike|\bcsgo\b/i.test(blob), false);
});

test("english copy covers storefronts, Supfy, Empório and the experiments", () => {
  for (const project of projects) {
    const copy = enProjects[project.id];
    assert.ok(copy, project.id);
    assert.ok(copy.overview[0]?.trim(), project.id);
    assert.ok(copy.title?.trim(), project.id);
  }
  assert.match(enProjects.supfy.title, /Supfy/);
  assert.match(enProjects.emporio.title, /Empório da Música/);
  assert.match(projectById("supfy")!.url, /supfy-mvp\.vercel\.app/);
  const enName: Record<string, string> = {
    brag: "Weekly brag",
    critica: "Plan critique",
    loop: "Agent loop",
    benchmark: "Serialization benchmark",
    timesheet: "Smart timesheet",
  };
  for (const [id, name] of Object.entries(enName)) {
    assert.equal(experiments.find((item) => item.id === id)?.en.name, name);
    assert.ok(experiments.find((item) => item.id === id)?.en.overview[0]);
  }
});

test("published catalog keeps Empório and WebCine as authored work", () => {
  const emporio = projectById("emporio");
  const webcine = projectById("webcine");
  assert.ok(emporio);
  assert.ok(webcine);
  assert.equal(projectLane(emporio), "authored");
  assert.equal(projectLane(webcine), "authored");
  assert.equal(projectLane(projectById("fiturban")!), "storefront");
  assert.equal(publishedProjectIds().length, projects.length + 5);
});

test("filters only return published projects and empty lists stay empty", () => {
  const authored = filterPublished(publishedProjects(), "pessoais");
  assert.deepEqual(
    authored.map((p) => p.id).sort(),
    ["benchmark", "brag", "critica", "emporio", "loop", "supfy", "timesheet", "webcine"],
  );
  assert.equal(filterPublished([], "ecommerce").length, 0);
  for (const filter of FILTERS) {
    const rows = filterPublished(publishedProjects(), filter);
    assert.ok(rows.every((row) => filter === "*" || row.tags.includes(filter)));
  }
});

test("Empório case copy stays a case, not a README", () => {
  const emporio = projectById("emporio");
  assert.ok(emporio);
  const blob = [
    emporio.overview.join(" "),
    emporio.build?.problem,
    emporio.build?.approach,
    ...(emporio.build?.decisions ?? []),
    ...(emporio.build?.learnings ?? []),
    ...emporio.contributions,
  ].join(" ");
  assert.equal(/127\.0\.0\.1|OPENAI_API_KEY|python main\.py/i.test(blob), false);
  const words = blob.split(/\s+/).filter(Boolean).length;
  assert.ok(words < 400, `Empório case is ${words} words`);
  assert.ok(emporio.overview.length <= 2);
  assert.match(emporio.resultado, /30/);
});

test("experiment pages keep honest limits and no invented metrics", () => {
  const blob = publishedExperimentIds.map((id) => JSON.stringify(projectById(id))).join(" ");
  assert.doesNotMatch(blob, /OPENAI_API_KEY|127\.0\.0\.1:4314|python main\.py/);
  assert.equal(projectById("benchmark")!.resultado, "");
  assert.match(projectById("benchmark")!.limits!, /pré-construída|pre-built/i);
  assert.match(projectById("loop")!.limits!, /Não é evidência de produtividade|Not productivity evidence/);
  assert.match(projectById("brag")!.limits!, /localStorage/);
  assert.match(projectById("critica")!.limits!, /browser/);
  assert.match(projectById("timesheet")!.limits!, /Não inventa horas|Does not invent hours/);
});

test("layout preview ids stay on the query string", () => {
  assert.equal(parseProjectLayout("a"), "a");
  assert.equal(parseProjectLayout("e"), "e");
  assert.equal(parseProjectLayout("z"), "current");
  assert.equal(parseProjectLayout(undefined), "current");
});

test("visitors never receive a preview layout unless the lab flag is on", () => {
  assert.notEqual(process.env.NEXT_PUBLIC_LAYOUT_LAB, "1");
  for (const id of ["a", "b", "c", "d", "e"]) {
    assert.equal(resolvePublicLayout(id), "current");
  }
  assert.equal(resolvePublicLayout(undefined), "current");
});

test("Sneakers New leads the carousel and links only to the live store", () => {
  const published = publishedProjects();
  const sneakers = published[0];
  assert.equal(sneakers?.id, "sneakers");
  assert.equal(published.some((project) => project.id === "shopmind"), false);
  assert.equal(sneakers?.url, "https://sneakersnew.com.br/");
  assert.equal(sneakers?.repo, undefined);
  assert.equal(sneakers?.demo, undefined);
  assert.equal(sneakers?.resultado, "");
  assert.equal(sneakers?.dw, 1440);
  assert.equal(sneakers?.mw, 390);
  assert.equal(projectLane(sneakers!), "storefront");
  assert.equal(sneakers?.tags.includes("ecommerce"), true);
  assert.match(sneakers?.association ?? "", /Grupo Oásis/);
  assert.equal(enProjects.sneakers.association, "With Grupo Oásis (Agência Oásis)");
  assert.match(enProjects.sneakers.title, /Sneakers New/);
  assert.equal(sneakers?.overview.length, 2);
  const blob = [
    sneakers?.overview.join(" "),
    ...(sneakers?.contributions ?? []),
    enProjects.sneakers.overview.join(" "),
    ...enProjects.sneakers.contributions,
  ].join(" ");
  assert.match(blob, /Wake/);
  assert.match(blob, /checkout/i);
  assert.match(blob, /QA/);
  assert.match(blob, /SNEAKERSNEW/);
  assert.doesNotMatch(blob, /github\.com|depoimento|ROI|conversão|\d+\s*%|\b\d{2,}\b/i);
  assert.equal(`01 / ${String(published.length).padStart(2, "0")}`, "01 / 20");
  assert.equal(published.length, projects.length + 5);
});

test("every published thumbnail file exists", () => {
  for (const project of publishedProjects()) {
    assert.ok(existsSync(`public/thumbnails/${project.img}`), `${project.id} ${project.img}`);
    assert.ok(existsSync(`public/thumbnails/${project.mimg}`), `${project.id} ${project.mimg}`);
    if (/\.webp$/i.test(project.img)) {
      assert.ok(existsSync(`public/thumbnails/${project.img.replace(/\.webp$/i, ".avif")}`), `${project.id} desktop avif`);
    }
    if (/\.webp$/i.test(project.mimg)) {
      assert.ok(existsSync(`public/thumbnails/${project.mimg.replace(/\.webp$/i, ".avif")}`), `${project.id} mobile avif`);
    }
  }
});

test("case and gallery paths stay on the public site", () => {
  assert.equal(casePath("emporio"), "/projetos/emporio");
  assert.equal(galleryPath("*"), "/#projetos");
  assert.equal(galleryPath("pessoais"), "/?lane=pessoais#projetos");
  assert.equal(laneFromSearch("?lane=ecommerce"), "ecommerce");
  assert.equal(laneFromSearch("?lane=lab"), "*");
  assert.equal(laneFromSearch(""), "*");
});
