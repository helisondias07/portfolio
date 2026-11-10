#!/usr/bin/env node
/**
 * Local HTTP + Chrome checks via puppeteer-core (devDependency).
 * Needs a system Chrome: CHROME_PATH or /usr/bin/google-chrome.
 * CI does not run this script.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createConnection, createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find((p) => existsSync(p));

function portOpen(port) {
  return new Promise((resolve) => {
    const sock = createConnection({ port, host: "127.0.0.1" }, () => {
      sock.end();
      resolve(true);
    });
    sock.on("error", () => resolve(false));
  });
}

function allocatePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      server.close((err) => (err ? reject(err) : resolve(port)));
    });
    server.on("error", reject);
  });
}

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
  return { status: res.status, text };
}

function hitAt(page, x, y) {
  return page.evaluate((px, py) => {
    const el = document.elementFromPoint(px, py);
    if (!el) return { tag: null, id: null, className: null, pix: false, siteNav: false };
    return {
      tag: el.tagName,
      id: el.id,
      className: String(el.className),
      pix: Boolean(el.closest("#pix")),
      siteNav: Boolean(el.closest("nav.site")),
      href: el.closest("a")?.getAttribute("href") ?? null,
    };
  }, x, y);
}

async function assertFoldClear(page, width, height) {
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
  const layout = await page.evaluate(() => {
    const pix = document.getElementById("pix");
    const hero = document.querySelector("#hero-title, h1.hl, #hero");
    const nav = document.querySelector("nav.site");
    const pixCs = pix ? getComputedStyle(pix) : null;
    const heroBox = hero?.getBoundingClientRect();
    const midX = Math.round(window.innerWidth / 2);
    const heroY = heroBox ? Math.round(heroBox.top + Math.min(80, heroBox.height / 3)) : 160;
    const hit = document.elementFromPoint(midX, heroY);
    const h1 = document.querySelector("#hero-title, h1.hl");
    const h1cs = h1 ? getComputedStyle(h1) : null;
    const h1box = h1?.getBoundingClientRect();
    const hlr = document.getElementById("hlr");
    const hlrcs = hlr ? getComputedStyle(hlr) : null;
    const visibleCopy = h1?.innerText?.replace(/\s+/g, " ").trim() || "";
    return {
      pixPosition: pixCs?.position ?? "missing",
      pixFixed: pixCs?.position === "fixed",
      navPosition: nav ? getComputedStyle(nav).position : null,
      heroY,
      midX,
      hitPix: Boolean(hit?.closest("#pix")),
      hitTag: hit?.tagName ?? null,
      hitClass: String(hit?.className ?? ""),
      h1Display: h1cs?.display ?? "missing",
      h1Visibility: h1cs?.visibility ?? "missing",
      h1Width: h1box?.width ?? 0,
      h1Height: h1box?.height ?? 0,
      h1Top: h1box?.top ?? -1,
      h1Bottom: h1box?.bottom ?? -1,
      hlrVisibility: hlrcs?.visibility ?? "missing",
      hlrDisplay: hlrcs?.display ?? "missing",
      copy: visibleCopy,
      fold: window.innerHeight,
    };
  });
  assert.equal(layout.pixFixed, false, `${width}px pix must not be position:fixed`);
  assert.notEqual(layout.pixPosition, "fixed");
  assert.equal(layout.navPosition, "fixed");
  assert.equal(layout.hitPix, false, `${width}px hero covered by #pix`);
  assert.notEqual(layout.h1Display, "none", `${width}px H1 display`);
  assert.notEqual(layout.h1Visibility, "hidden", `${width}px H1 visibility`);
  assert.ok(layout.h1Height > 24, `${width}px H1 height ${layout.h1Height}`);
  assert.ok(layout.h1Width > 80, `${width}px H1 width ${layout.h1Width}`);
  assert.ok(layout.h1Top >= 0 && layout.h1Bottom <= layout.fold + 1, `${width}px H1 not in first fold: top=${layout.h1Top} bottom=${layout.h1Bottom} fold=${layout.fold}`);
  assert.match(layout.copy, /interfaces/i, `${width}px H1 text missing: ${layout.copy}`);
  const mid = await hitAt(page, layout.midX, layout.heroY);
  assert.equal(mid.pix, false, `${width}px elementFromPoint hero is a project chip`);
}

if (!CHROME) {
  console.error("e2e: Chrome not found. Set CHROME_PATH or install google-chrome.");
  process.exit(1);
}

let PORT;
if (process.env.E2E_PORT) {
  PORT = Number(process.env.E2E_PORT);
  if (!Number.isInteger(PORT) || PORT <= 0) {
    console.error(`e2e: invalid E2E_PORT=${process.env.E2E_PORT}`);
    process.exit(1);
  }
  if (await portOpen(PORT)) {
    console.error(`e2e: port ${PORT} is already in use by another process`);
    process.exit(1);
  }
} else {
  PORT = await allocatePort();
}

const ORIGIN = `http://127.0.0.1:${PORT}`;

const server = spawn("npx", ["next", "start", "-H", "127.0.0.1", "-p", String(PORT)], {
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
  if (/EADDRINUSE/.test(stderr)) throw new Error(`port ${PORT} in use\n${stderr}`);
  const home = await http("/");
  assert.equal(home.status, 200, "home 200");
  assert.match(home.text, /id="projetos"/);
  assert.match(home.text, /class="site"/);
  if (/EADDRINUSE/.test(stderr)) throw new Error("stale next start");
  assert.match(home.text, /id="pix"/);
  assert.doesNotMatch(home.text, /<nav class="pix"/);
  assert.match(home.text, /Brag semanal/);
  assert.match(home.text, /Crítica de planos/);
  assert.match(home.text, /Loop de agentes/);
  assert.match(home.text, /Benchmark de serialização/);
  assert.match(home.text, /Timesheet inteligente/);
  assert.doesNotMatch(home.text, /Caderno de Talhão|Counter-Strike|Fazenda/i);
  assert.doesNotMatch(home.text, /127\.0\.0\.1:4721|OPENAI_API_KEY/);

  const emporio = await http("/projetos/emporio");
  assert.equal(emporio.status, 200, "emporio case");
  assert.match(emporio.text, /Problema/);
  assert.match(emporio.text, /30 testes/);
  assert.doesNotMatch(emporio.text, /127\.0\.0\.1:4721|OPENAI_API_KEY|python main\.py/);

  const webcine = await http("/projetos/webcine");
  assert.equal(webcine.status, 200, "webcine case");
  assert.match(webcine.text, /webcinetv.com.br/);

  const store = await http("/projetos/fiturban");
  assert.equal(store.status, 200, "storefront case");

  for (const id of ["brag", "critica", "loop", "benchmark", "timesheet"]) {
    const res = await http(`/projetos/${id}`);
    assert.equal(res.status, 200, `${id} case`);
    assert.match(res.text, /Limitações/);
    assert.match(res.text, /github.com\/helisondias07/);
    assert.match(res.text, /vercel\.app/);
    assert.match(res.text, /Demo ao vivo|Live demo/);
  }
  const brag = await http("/projetos/brag");
  assert.match(brag.text, /joaoraul\.dev\/writing\/automated-brag-document/);
  assert.match(brag.text, /localStorage/);
  const timesheet = await http("/projetos/timesheet");
  assert.match(timesheet.text, /Não inventa horas/);
  assert.match(timesheet.text, /joaoraul\.dev\/writing\/timesheet-auto-filler/);

  for (const id of ["fazenda", "cs"]) {
    const res = await http(`/projetos/${id}`);
    assert.equal(res.status, 404, `${id} must 404, got ${res.status}`);
  }

  const gallery = await http("/projetos");
  assert.equal(gallery.status, 200, "projetos index");
  for (const layout of ["a", "b", "c", "d", "e"]) {
    const res = await http(`/projetos?layout=${layout}`);
    assert.equal(res.status, 200, `layout ${layout}`);
    assert.doesNotMatch(res.text, /Caderno de Talhão|Counter-Strike|Fazenda/i);
  }

  const sitemap = await http("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.text, /\/projetos\/emporio/);
  assert.match(sitemap.text, /\/projetos\/brag/);
  assert.match(sitemap.text, /\/projetos\/timesheet/);
  assert.doesNotMatch(sitemap.text, /fazenda/);

  console.log("e2e http: ok");

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    headless: true,
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

  await assertFoldClear(page, 1440, 900);
  await assertFoldClear(page, 768, 1024);
  await assertFoldClear(page, 390, 844);

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });

  const langBefore = await page.$eval("html", (el) => el.getAttribute("data-lang"));
  await page.click("#lang");
  const langAfter = await page.$eval("html", (el) => el.getAttribute("data-lang"));
  assert.notEqual(langAfter, langBefore, "language toggle click intercepted");
  await page.click("#lang");

  const projectsLink = await page.$('nav.site .ls a[href="#projetos"]');
  assert.ok(projectsLink, "Projects link in site nav");
  const box = await projectsLink.boundingBox();
  assert.ok(box);
  const over = await hitAt(page, box.x + box.width / 2, box.y + box.height / 2);
  assert.equal(over.pix, false, "Projects link covered by #pix");
  assert.match(String(over.href), /#projetos/);
  await projectsLink.click();
  await page.waitForFunction(() => window.location.hash === "#projetos");

  await page.goto(`${ORIGIN}/#projetos`, { waitUntil: "networkidle0" });
  const pressed = await page.$$eval("#flt2 button", (btns) =>
    btns.map((b) => ({ f: b.getAttribute("data-f"), pressed: b.getAttribute("aria-pressed"), on: b.classList.contains("on") })),
  );
  assert.equal(pressed.length, 4);
  assert.equal(pressed.filter((row) => row.pressed === "true").length, 1);
  const filterName = await page.$eval("#flt2-label", (el) => el.textContent);
  const htmlLang = await page.$eval("html", (el) => el.getAttribute("data-lang"));
  if (htmlLang === "en") assert.match(filterName, /Filter projects/);
  else assert.match(filterName, /Filtrar projetos/);

  await page.click('#flt2 button[data-f="pessoais"]');
  const after = await page.$$eval("#flt2 button", (btns) =>
    btns.map((b) => ({ f: b.getAttribute("data-f"), pressed: b.getAttribute("aria-pressed"), on: b.classList.contains("on") })),
  );
  const on = after.find((row) => row.f === "pessoais");
  assert.equal(on?.pressed, "true");
  assert.equal(on?.on, true);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => {
    const btn = document.querySelector(".nb");
    return btn && getComputedStyle(btn).display !== "none";
  });
  await page.$eval(".nb", (el) => el instanceof HTMLElement && el.click());
  assert.equal(await page.$eval(".nb", (el) => el.getAttribute("aria-expanded")), "true");

  const drawer = await page.evaluate(() => {
    const link = document.querySelector('nav.site .ls.open a[href="#sobre"]');
    if (!link) return { ok: false, reason: "missing sobre" };
    const r = link.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return {
      ok: Boolean(hit?.closest("a")?.getAttribute("href") === "#sobre"),
      href: hit?.closest("a")?.getAttribute("href") ?? null,
      pix: Boolean(hit?.closest("#pix")),
      text: (hit?.textContent || "").trim(),
    };
  });
  assert.equal(drawer.pix, false, "drawer covered by project chips");
  assert.equal(drawer.ok, true, `drawer Sobre not clickable: ${JSON.stringify(drawer)}`);

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const focusId = await page.evaluate(() => document.activeElement?.id || document.activeElement?.getAttribute("href") || "");
  assert.notEqual(focusId, "lang", "Tab escaped drawer to language toggle");
  assert.notEqual(focusId, "thm", "Tab escaped drawer to theme toggle");

  await page.keyboard.press("Escape");
  assert.equal(await page.$eval(".nb", (el) => el.getAttribute("aria-expanded")), "false");

  const shotDir = process.env.E2E_SHOTS || "/opt/cursor/artifacts";
  async function shot(path, file, width, height) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`${ORIGIN}${path}`, { waitUntil: "networkidle0" });
    if (path.includes("#projetos") || path.startsWith("/projetos")) {
      await page.evaluate(() => document.getElementById("projetos")?.scrollIntoView());
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    assert.equal(overflow, false, `horizontal scroll at ${width} ${path}`);
    await page.screenshot({ path: `${shotDir}/${file}`, fullPage: true });
  }

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: `${shotDir}/after_desktop_home.png`, fullPage: false });

  await shot("/projetos", "layout_current_1440.png", 1440, 900);
  await shot("/projetos?layout=a", "layout_a_1440.png", 1440, 900);
  await shot("/projetos?layout=b", "layout_b_1440.png", 1440, 900);
  await shot("/projetos?layout=c", "layout_c_1440.png", 1440, 900);
  await shot("/projetos?layout=d", "layout_d_1440.png", 1440, 900);
  await shot("/projetos?layout=e", "layout_e_1440.png", 1440, 900);
  await shot("/projetos/timesheet", "after_desktop_case_timesheet.png", 1440, 900);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: `${shotDir}/after_mobile_home.png`, fullPage: false });
  await page.waitForFunction(() => document.querySelector(".nb") && getComputedStyle(document.querySelector(".nb")).display !== "none");
  await page.$eval(".nb", (el) => el instanceof HTMLElement && el.click());
  await page.screenshot({ path: `${shotDir}/after_mobile_menu.png`, fullPage: false });
  await page.keyboard.press("Escape");

  await shot("/projetos", "layout_current_390.png", 390, 844);
  await shot("/projetos?layout=a", "layout_a_390.png", 390, 844);
  await shot("/projetos?layout=b", "layout_b_390.png", 390, 844);
  await shot("/projetos?layout=c", "layout_c_390.png", 390, 844);
  await shot("/projetos?layout=d", "layout_d_390.png", 390, 844);
  await shot("/projetos?layout=e", "layout_e_390.png", 390, 844);
  await shot("/projetos/timesheet", "after_mobile_case_timesheet.png", 390, 844);

  await browser.close();
  console.log("e2e browser: ok (puppeteer-core +", CHROME, ")");
} catch (err) {
  failed = 1;
  console.error(err);
  if (stderr) console.error(stderr.slice(-2000));
} finally {
  server.kill("SIGTERM");
  await delay(300);
  process.exit(failed);
}
