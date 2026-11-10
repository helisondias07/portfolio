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
  unpublishedExperimentIds,
} from "./catalog";
import { FILTERS } from "./explore";

test("five remaining experiments stay unpublished and never leak into public lists", () => {
  assert.deepEqual(
    unpublishedExperimentIds().slice().sort(),
    ["benchmark", "brag", "critica", "loop", "timesheet"],
  );
  assert.equal(publicExperimentCount(), 0);
  for (const id of unpublishedExperimentIds()) {
    assert.equal(isPublishedProjectId(id), false);
    assert.equal(projectById(id), undefined);
    assert.equal(publishedProjectIds().includes(id), false);
  }
  for (const item of experiments) {
    assert.equal(item.public, false);
    assert.equal(item.github, null);
    assert.equal(item.demo, null);
  }
});

test("retired Fazenda and Counter-Strike scopes are absent from catalog source", () => {
  const blob = catalogBlob() + JSON.stringify(experiments);
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
  assert.equal(publishedProjectIds().length, projects.length);
});

test("filters only return published projects and empty lists stay empty", () => {
  const authored = filterPublished(projects, "pessoais");
  assert.deepEqual(
    authored.map((p) => p.id).sort(),
    ["emporio", "webcine"],
  );
  assert.equal(filterPublished([], "ecommerce").length, 0);
  for (const filter of FILTERS) {
    const rows = filterPublished(projects, filter);
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

test("case and gallery paths stay on the public site", () => {
  assert.equal(casePath("emporio"), "/projetos/emporio");
  assert.equal(galleryPath("*"), "/#projetos");
  assert.equal(galleryPath("pessoais"), "/?lane=pessoais#projetos");
  assert.equal(laneFromSearch("?lane=ecommerce"), "ecommerce");
  assert.equal(laneFromSearch("?lane=lab"), "*");
  assert.equal(laneFromSearch(""), "*");
});
