#!/usr/bin/env node
/**
 * Local HTTP + optional Chrome checks. CI does not run this (no Chrome in GHA).
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createConnection } from "node:net";
import { setTimeout as delay } from "node:timers/promises";

const PORT = Number(process.env.E2E_PORT || 3010);
const ORIGIN = `http://127.0.0.1:${PORT}`;

function waitPort(port, ms = 20000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      const sock = createConnection({ port, host: "127.0.0.1" }, () => {
        sock.end();
        resolve();
      });
      sock.on("error", () => {
        if (Date.now() - start > ms) reject(new Error(`port ${port} not ready`));
        else setTimeout(tryOnce, 250);
      });
    };
    tryOnce();
  });
}

async function http(path) {
  const res = await fetch(`${ORIGIN}${path}`, { redirect: "manual" });
  const text = await res.text();
  return { status: res.status, text, headers: res.headers };
}

try {
  const { execSync } = await import("node:child_process");
  execSync(`fuser -k ${PORT}/tcp`, { stdio: "ignore" });
} catch {
  /* port free */
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT: String(PORT) },
});
let stderr = "";
server.stderr.on("data", (chunk) => {
  stderr += chunk.toString();
});

let failed = 0;
try {
  await waitPort(PORT);
  const home = await http("/");
  assert.equal(home.status, 200, "home 200");
  assert.match(home.text, /id="projetos"/);
  assert.match(home.text, /Empório da Música/);
  assert.match(home.text, /WebCine TV/);
  assert.doesNotMatch(home.text, /Crítica de planos|Timesheet inteligente|Benchmark de serialização|Loop de agentes|Brag semanal|Caderno de Talhão|Counter-Strike|Fazenda/i);

  const emporio = await http("/projetos/emporio");
  assert.equal(emporio.status, 200, "emporio case");
  assert.match(emporio.text, /Problema/);
  assert.match(emporio.text, /30 testes/);

  const webcine = await http("/projetos/webcine");
  assert.equal(webcine.status, 200, "webcine case");
  assert.match(webcine.text, /webcinetv.com.br/);

  const store = await http("/projetos/fiturban");
  assert.equal(store.status, 200, "storefront case");

  for (const id of ["critica", "timesheet", "benchmark", "loop", "brag", "fazenda", "cs"]) {
    const res = await http(`/projetos/${id}`);
    assert.ok(res.status === 404 || res.status === 307 || res.status === 308, `${id} hidden, got ${res.status}`);
    if (res.status === 200) throw new Error(`${id} leaked as 200`);
  }

  const sitemap = await http("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.text, /\/projetos\/emporio/);
  assert.doesNotMatch(sitemap.text, /critica|timesheet|benchmark|loop|brag/);

  console.log("e2e http: ok");

  try {
    const puppeteer = await import("puppeteer-core");
    const bin =
      process.env.CHROME_PATH ||
      ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((p) => existsSync(p));
    if (!bin) {
      console.log("e2e browser: skipped (no Chrome)");
    } else {
        const browser = await puppeteer.default.launch({
          executablePath: bin,
          args: ["--no-sandbox", "--disable-dev-shm-usage"],
          headless: true,
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
        await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
        await page.evaluate(() => document.body.focus());
        await page.keyboard.press("Tab");
        const skip = await page.evaluate(() => document.activeElement?.className || "");
        assert.match(String(skip), /skip/);

        await page.goto(`${ORIGIN}/#projetos`, { waitUntil: "networkidle0" });
        const pressed = await page.$$eval("#flt2 button", (btns) =>
          btns.map((b) => ({ f: b.getAttribute("data-f"), pressed: b.getAttribute("aria-pressed"), on: b.classList.contains("on") })),
        );
        assert.ok(pressed.length === 4);
        assert.equal(pressed.filter((row) => row.pressed === "true").length, 1);

        await page.click('#flt2 button[data-f="pessoais"]');
        const after = await page.$$eval("#flt2 button", (btns) =>
          btns.map((b) => ({ f: b.getAttribute("data-f"), pressed: b.getAttribute("aria-pressed"), on: b.classList.contains("on") })),
        );
        const on = after.find((row) => row.f === "pessoais");
        assert.equal(on?.pressed, "true");
        assert.equal(on?.on, true);
        assert.equal(after.filter((row) => row.pressed === "true").length, 1);
        const names = await page.$$eval(".wk-card h3", (els) => els.map((el) => el.textContent));
        assert.ok(names.some((n) => /Empório/.test(n)));
        assert.ok(names.some((n) => /WebCine/.test(n)));
        assert.ok(!names.some((n) => /Fit Urban/.test(n)));

        await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
        await page.waitForFunction(() => {
          const btn = document.querySelector(".nb");
          return btn && getComputedStyle(btn).display !== "none";
        });
        await page.$eval(".nb", (el) => el instanceof HTMLElement && el.click());
        const open = await page.$eval(".nb", (el) => el.getAttribute("aria-expanded"));
        assert.equal(open, "true");
        await page.keyboard.press("Escape");
        const closed = await page.$eval(".nb", (el) => el.getAttribute("aria-expanded"));
        assert.equal(closed, "false");

        await page.goto(`${ORIGIN}/projetos/emporio`, { waitUntil: "networkidle0" });
        const h1 = await page.$eval("h1", (el) => el.textContent);
        assert.match(h1, /Empório/);

        const shotDir = process.env.E2E_SHOTS || "/opt/cursor/artifacts";
        await page.setViewport({ width: 1440, height: 900 });
        await page.goto(`${ORIGIN}/#projetos`, { waitUntil: "networkidle0" });
        await page.screenshot({ path: `${shotDir}/after_desktop_work.png`, fullPage: true });
        await page.setViewport({ width: 390, height: 844 });
        await page.screenshot({ path: `${shotDir}/after_mobile_work.png`, fullPage: true });
        await page.goto(`${ORIGIN}/projetos/emporio`, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1440, height: 900 });
        await page.screenshot({ path: `${shotDir}/after_desktop_case_emporio.png`, fullPage: true });
        await page.setViewport({ width: 390, height: 844 });
        await page.screenshot({ path: `${shotDir}/after_mobile_case_emporio.png`, fullPage: true });

        await browser.close();
        console.log("e2e browser: ok");
    }
  } catch (err) {
    if (String(err).includes("Cannot find package 'puppeteer-core'")) {
      console.log("e2e browser: skipped (no puppeteer-core)");
    } else {
      throw err;
    }
  }
} catch (err) {
  failed = 1;
  console.error(err);
  if (stderr) console.error(stderr.slice(-2000));
} finally {
  server.kill("SIGTERM");
  await delay(300);
  process.exit(failed);
}
