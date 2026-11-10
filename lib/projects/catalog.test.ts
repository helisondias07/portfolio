import assert from "node:assert/strict";
import test from "node:test";
import { experiments } from "../../data/experiments";
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

const publishedExperimentIds = ["benchmark", "brag", "critica", "loop"] as const;

test("four GitHub experiments are published; timesheet stays unpublished", () => {
  assert.deepEqual(unpublishedExperimentIds(), ["timesheet"]);
  assert.equal(publicExperimentCount(), 4);
  for (const id of publishedExperimentIds) {
    const project = projectById(id);
    assert.ok(project, id);
    assert.equal(project.mvp, true);
    assert.ok(project.limits);
    assert.match(project.url, /^https:\/\/github\.com\/helisondias07\//);
    assert.equal(isPublishedProjectId(id), true);
    assert.equal(projectLane(project), "authored");
  }
  assert.equal(isPublishedProjectId("timesheet"), false);
  assert.equal(projectById("timesheet"), undefined);
  const timesheet = experiments.find((item) => item.id === "timesheet");
  assert.equal(timesheet?.public, false);
  assert.equal(timesheet?.github, null);
});

test("published experiment copy cites joaoraul.dev where the source already does", () => {
  assert.match(projectById("brag")!.inspiration!.href, /joaoraul\.dev\/writing\/automated-brag-document/);
  assert.match(projectById("loop")!.inspiration!.href, /joaoraul\.dev\/writing\/superpowered-ralph/);
  assert.match(projectById("benchmark")!.inspiration!.href, /joaoraul\.dev\/writing\/protobuf-vs-json/);
  assert.doesNotMatch(projectById("critica")!.inspiration!.href, /joaoraul\.dev/);
});

test("retired Fazenda and Counter-Strike scopes are absent from catalog source", () => {
  const blob = catalogBlob() + JSON.stringify(experiments) + JSON.stringify(publishedProjects());
  assert.equal(/fazenda|talh[aã]o|counter-?strike|\bcsgo\b/i.test(blob), false);
});

test("published catalog keeps Empório and WebCine as authored work", () => {
  const emporio = projectById("emporio");
  const webcine = projectById("webcine");
  assert.ok(emporio);
  assert.ok(webcine);
  assert.equal(projectLane(emporio), "authored");
  assert.equal(projectLane(webcine), "authored");
  assert.equal(projectLane(projectById("fiturban")!), "storefront");
  assert.equal(publishedProjectIds().length, projects.length + 4);
});

test("filters only return published projects and empty lists stay empty", () => {
  const authored = filterPublished(publishedProjects(), "pessoais");
  assert.deepEqual(
    authored.map((p) => p.id).sort(),
    ["benchmark", "brag", "critica", "emporio", "loop", "webcine"],
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

test("experiment pages do not invent benchmark multiples or live-agent claims", () => {
  const blob = publishedExperimentIds.map((id) => JSON.stringify(projectById(id))).join(" ");
  assert.doesNotMatch(blob, /OPENAI_API_KEY|127\.0\.0\.1:4314|python main\.py/);
  assert.equal(projectById("benchmark")!.resultado, "");
  assert.match(projectById("benchmark")!.limits!, /pré-construída/);
  assert.match(projectById("loop")!.limits!, /Não é evidência de produtividade/);
  assert.match(projectById("brag")!.limits!, /Sem integrações live/);
  assert.match(projectById("critica")!.limits!, /Sem modelo hospedado real/);
});

test("case and gallery paths stay on the public site", () => {
  assert.equal(casePath("emporio"), "/projetos/emporio");
  assert.equal(galleryPath("*"), "/#projetos");
  assert.equal(galleryPath("pessoais"), "/?lane=pessoais#projetos");
  assert.equal(laneFromSearch("?lane=ecommerce"), "ecommerce");
  assert.equal(laneFromSearch("?lane=lab"), "*");
  assert.equal(laneFromSearch(""), "*");
});
