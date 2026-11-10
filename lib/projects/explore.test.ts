import assert from "node:assert/strict";
import test from "node:test";
import { FILTERS, filterButtonSnapshot, filterProjectIndexes, isFilterId, isGithubUrl, projectHash, projectIdFromHash, syncFilterButtons } from "./explore";

function fakeButtons(active: string) {
  return FILTERS.map((id) => {
    const classes = new Set(id === active ? ["on"] : []);
    const attrs: Record<string, string> = { "data-f": id, "aria-pressed": id === active ? "true" : "false" };
    const btn = {
      dataset: { f: id },
      ariaPressed: id === active ? "true" : "false",
      classList: {
        toggle(token: string, force?: boolean) {
          if (force) classes.add(token);
          else classes.delete(token);
        },
        contains(token: string) {
          return classes.has(token);
        },
      },
      setAttribute(name: string, value: string) {
        attrs[name] = value;
      },
      getAttribute(name: string) {
        return attrs[name] ?? null;
      },
    };
    return btn;
  });
}

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
  assert.equal(projectIdFromHash("#projetos/critica", ids), null);
  assert.equal(projectHash("webcine"), "#projetos/webcine");
});

test("every filter keeps aria-pressed in lockstep with visual .on, including a stale initial chip", () => {
  const buttons = fakeButtons("*");
  assert.deepEqual(
    filterButtonSnapshot(buttons).map((row) => [row.id, row.on, row.ariaPressed]),
    [
      ["*", true, "true"],
      ["ecommerce", false, "false"],
      ["front", false, "false"],
      ["pessoais", false, "false"],
    ],
  );
  for (const filter of FILTERS) {
    syncFilterButtons(buttons, filter);
    const snap = filterButtonSnapshot(buttons);
    assert.equal(snap.filter((row) => row.on).length, 1, filter);
    for (const row of snap) {
      assert.equal(row.on, row.id === filter, `${filter} ${row.id} class`);
      assert.equal(row.ariaPressed, row.on ? "true" : "false", `${filter} ${row.id} aria-pressed`);
    }
  }
  syncFilterButtons(buttons, "lab");
  const fallback = filterButtonSnapshot(buttons);
  assert.equal(fallback.find((row) => row.id === "*")?.ariaPressed, "true");
  assert.equal(fallback.filter((row) => row.ariaPressed === "true").length, 1);
});

test("filter ids and github host checks stay strict", () => {
  assert.equal(isFilterId("*"), true);
  assert.equal(isFilterId("pessoais"), true);
  assert.equal(isFilterId("lab"), false);
  assert.equal(isGithubUrl("https://github.com/helisondias07/emporio-da-musica-agente"), true);
  assert.equal(isGithubUrl("https://webcinetv.com.br/"), false);
});
