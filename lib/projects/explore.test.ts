import assert from "node:assert/strict";
import test from "node:test";
import { filterProjectIndexes, isFilterId, isGithubUrl, projectHash, projectIdFromHash } from "./explore";

const sample = [
  { id: "fiturban", tags: ["ecommerce"] },
  { id: "useloft", tags: ["ecommerce", "front"] },
  { id: "webcine", tags: ["pessoais", "front"] },
  { id: "emporio", tags: ["pessoais"] },
];

test("filter indexes keep authored work separate from storefronts", () => {
  assert.deepEqual(filterProjectIndexes(sample, "*"), [0, 1, 2, 3]);
  assert.deepEqual(filterProjectIndexes(sample, "ecommerce"), [0, 1]);
  assert.deepEqual(filterProjectIndexes(sample, "front"), [1, 2]);
  assert.deepEqual(filterProjectIndexes(sample, "pessoais"), [2, 3]);
});

test("hash only selects a known project id under #projetos/", () => {
  const ids = sample.map((p) => p.id);
  assert.equal(projectIdFromHash("#projetos/emporio", ids), "emporio");
  assert.equal(projectIdFromHash("#projetos/emporio/", ids), "emporio");
  assert.equal(projectIdFromHash("#projetos", ids), null);
  assert.equal(projectIdFromHash("#contato", ids), null);
  assert.equal(projectIdFromHash("#projetos/missing", ids), null);
  assert.equal(projectHash("webcine"), "#projetos/webcine");
});

test("filter ids and github host checks stay strict", () => {
  assert.equal(isFilterId("*"), true);
  assert.equal(isFilterId("pessoais"), true);
  assert.equal(isFilterId("lab"), false);
  assert.equal(isGithubUrl("https://github.com/helisondias07/emporio-da-musica-agente"), true);
  assert.equal(isGithubUrl("https://webcinetv.com.br/"), false);
});
