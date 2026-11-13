#!/usr/bin/env node
/**
 * Local HTTP + Chrome checks via puppeteer-core (devDependency).
 * Needs a system Chrome: CHROME_PATH or /usr/bin/google-chrome.
 * CI does not run this script.
 */
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { createConnection, createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import puppeteer from "puppeteer-core";

const CHROME =
  process.env.CHROME_PATH ||
  [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].find((p) => existsSync(p));

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
  return { status: res.status, text, location: res.headers.get("location") };
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
    const visibleCopy = (h1?.getAttribute("aria-label") || h1?.textContent || "").replace(/\s+/g, " ").trim();
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
  assert.match(layout.copy, /Helison Dias/i, `${width}px H1 text missing: ${layout.copy}`);
  assert.match(layout.copy, /full stack|full-stack/i, `${width}px role missing: ${layout.copy}`);
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

const nextCli = join(process.cwd(), "node_modules/next/dist/bin/next");
const server = spawn(process.execPath, [nextCli, "start", "-H", "127.0.0.1", "-p", String(PORT)], {
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
  assert.match(home.text, /c2-ch /);
  assert.match(home.text, /class="site"/);
  assert.match(home.text, /Helison Dias/);
  assert.match(home.text, /dev full stack com foco em IA/);
  assert.match(home.text, /full-stack developer focused on AI/);
  assert.match(home.text, /Bom Jardim, RJ/);
  assert.match(home.text, /LangGraph, Wake, Next\.js, React, TypeScript/);
  assert.match(home.text, /data-cv/);
  assert.doesNotMatch(home.text, /Nova Friburgo/);
  if (/EADDRINUSE/.test(stderr)) throw new Error("stale next start");
  assert.doesNotMatch(home.text, /id="pix"/);
  assert.doesNotMatch(home.text, /Opções de layout|Layout options \(preview\)/);
  assert.match(home.text, /Brag semanal/);
  assert.match(home.text, /Crítica de planos/);
  assert.match(home.text, /Loop de agentes/);
  assert.match(home.text, /Benchmark de serialização/);
  assert.match(home.text, /Timesheet inteligente/);
  assert.match(home.text, /ShopMind/);
  assert.match(home.text, /Sneakers New/);
  assert.match(home.text, /Empório da Música/);
  assert.match(home.text, /WebCine TV/);
  assert.match(home.text, /https:\/\/shopmind-agent\.vercel\.app/);
  assert.match(home.text, /https:\/\/github\.com\/helisondias07\/shopmind-agent/);
  assert.match(home.text, /https:\/\/sneakersnew\.com\.br\//);
  assert.match(home.text, /\/projetos\/shopmind/);
  assert.match(home.text, /\/projetos\/sneakers/);
  assert.doesNotMatch(home.text, /Supfy|supfy/);
  assert.doesNotMatch(home.text, /github\.com\/helisondias07\/sneakers/);
  assert.match(home.text, /https:\/\/brag-semanal\.vercel\.app/);
  assert.match(home.text, /https:\/\/critica-de-planos\.vercel\.app/);
  assert.match(home.text, /https:\/\/loop-de-agentes\.vercel\.app/);
  assert.match(home.text, /https:\/\/benchmark-serializacao\.vercel\.app/);
  assert.match(home.text, /https:\/\/timesheet-inteligente\.vercel\.app/);
  assert.doesNotMatch(home.text, /Caderno de Talhão|Counter-Strike|Fazenda/i);
  assert.doesNotMatch(home.text, /oasis-bot|Méliuz|Meliuz/i);
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
  assert.ok(gallery.status >= 300 && gallery.status < 400, `projetos index should redirect, got ${gallery.status}`);
  assert.match(gallery.location ?? "", /#projetos/);
  assert.doesNotMatch(gallery.text, /Opções de layout|layout=a/);
  for (const layout of ["a", "b", "c", "d", "e"]) {
    const res = await http(`/projetos?layout=${layout}`);
    assert.ok(res.status >= 300 && res.status < 400, `layout ${layout} should redirect, got ${res.status}`);
    assert.doesNotMatch(res.text, /Opções de layout|Editorial|Bento/);
  }

  const sitemap = await http("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.text, /\/projetos\/emporio/);
  assert.match(sitemap.text, /\/projetos\/shopmind/);
  assert.match(sitemap.text, /\/projetos\/sneakers/);
  assert.match(sitemap.text, /\/projetos\/brag/);
  assert.match(sitemap.text, /\/projetos\/timesheet/);
  assert.doesNotMatch(sitemap.text, /fazenda|supfy/);

  const shopmind = await http("/projetos/shopmind");
  assert.equal(shopmind.status, 200, "shopmind case");
  assert.match(shopmind.text, /shopmind-agent\.vercel\.app/);
  assert.match(shopmind.text, /github\.com\/helisondias07\/shopmind-agent/);
  assert.match(shopmind.text, /17/);
  assert.doesNotMatch(shopmind.text, /Supfy|Nova Friburgo/);

  const sneakers = await http("/projetos/sneakers");
  assert.equal(sneakers.status, 200, "sneakers case");
  assert.match(sneakers.text, /Visitar site/);
  assert.match(sneakers.text, /href="https:\/\/sneakersnew\.com\.br\/"/);
  assert.match(sneakers.text, /checkout/);
  assert.doesNotMatch(sneakers.text, /github\.com\/helisondias07\/sneakers/);

  const supfy = await http("/projetos/supfy");
  assert.equal(supfy.status, 404, "supfy must 404");

  console.log("e2e http: ok");

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    headless: true,
  });
  const page = await browser.newPage();

  async function assertTitleTypes(width, height) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    const start = await page.evaluate(() => {
      const rest = document.getElementById("hlrest");
      const hlr = document.getElementById("hlr");
      return {
        n: (document.getElementById("hl")?.textContent || "").length,
        rest: rest ? getComputedStyle(rest).visibility : "missing",
        hlr: hlr ? getComputedStyle(hlr).visibility : "missing",
      };
    });
    assert.equal(start.rest, "hidden", `${width}px remainder visible`);
    assert.equal(start.hlr, "hidden", `${width}px static headline visible`);
    assert.ok(start.n < 8, `${width}px title already written (${start.n} chars)`);
    await delay(2000);
    const mid = await page.evaluate(() => (document.getElementById("hl")?.textContent || "").length);
    assert.ok(mid > start.n, `${width}px title did not type: ${start.n} → ${mid}`);
  }

  await assertTitleTypes(1440, 900);
  await assertTitleTypes(390, 844);

  async function assertCaretFollows(width, height, lang) {
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.setCookie({ name: "lang", value: lang, url: ORIGIN });
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    await page.evaluate((value) => {
      localStorage.setItem("lang", value);
      document.cookie = `lang=${value};path=/`;
    }, lang);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => (document.getElementById("hl")?.textContent || "").length > 20);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const box = await page.evaluate(() => {
      const hl = document.getElementById("hl");
      const h1 = document.querySelector(".hero .hl");
      const car = document.querySelector(".hero .hl .car");
      const node = hl.firstChild;
      const range = document.createRange();
      range.setStart(node, node.length - 1);
      range.setEnd(node, node.length);
      const last = [...range.getClientRects()].filter((r) => r.width || r.height).at(-1);
      range.selectNodeContents(hl);
      const lines = [...range.getClientRects()].filter((r) => r.width > 1);
      const tops = [];
      for (const r of lines) if (!tops.some((t) => Math.abs(t - r.top) < 2)) tops.push(r.top);
      const textBottom = Math.max(...lines.map((r) => r.bottom));
      const hb = h1.getBoundingClientRect();
      const cb = car.getBoundingClientRect();
      return {
        dx: Math.abs(cb.left - last.right),
        dy: Math.abs(cb.top - last.top),
        overflow: textBottom - hb.bottom,
        lines: tops.length,
        h1h: hb.height,
        font: parseFloat(getComputedStyle(h1).fontSize),
      };
    });
    assert.ok(box.dx < 6, `${lang} ${width}px caret is ${box.dx.toFixed(1)}px off the last glyph`);
    assert.ok(box.dy < 8, `${lang} ${width}px caret is ${box.dy.toFixed(1)}px off the last line`);
    assert.ok(box.overflow < 8, `${lang} ${width}px title overflows the headline box by ${box.overflow.toFixed(1)}px`);
    assert.ok(box.h1h + 1 >= box.lines * box.font * 0.9, `${lang} ${width}px box ${box.h1h}px is shorter than ${box.lines} lines`);
    assert.ok(box.lines >= 1 && box.lines <= 3, `${lang} ${width}px stack line count ${box.lines}`);
    if (width >= 1280) assert.equal(box.lines, 1, `${lang} ${width}px stack terms should stay on one line, got ${box.lines}`);
  }

  for (const lang of ["pt", "en"]) {
    for (const [width, height] of [[320, 700], [360, 740], [390, 844], [430, 932], [768, 1024], [1280, 800], [1440, 900]]) {
      await assertCaretFollows(width, height, lang);
    }
  }
  await page.evaluate(() => {
    localStorage.removeItem("lang");
    document.cookie = "lang=;path=/;max-age=0";
  });
  await page.deleteCookie({ name: "lang" });

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

  await assertFoldClear(page, 1440, 900);
  await assertFoldClear(page, 768, 1024);
  await assertFoldClear(page, 390, 844);

  async function assertHeroFits(width, height) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto(`${ORIGIN}/`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const fit = await page.evaluate(() => {
      const box = (sel) => document.querySelector(sel)?.getBoundingClientRect();
      const name = box(".who-name");
      const cv = box("[data-cv]");
      const keys = box(".hrow");
      const fold = window.innerHeight;
      return {
        nameTop: name?.top ?? -1,
        nameBottom: name?.bottom ?? -1,
        cvTop: cv?.top ?? -1,
        cvBottom: cv?.bottom ?? -1,
        keysBottom: keys?.bottom ?? -1,
        fold,
        scroll: document.documentElement.scrollWidth - window.innerWidth,
        role: document.querySelector(".who-role")?.textContent || "",
      };
    });
    assert.ok(fit.nameTop >= 0 && fit.nameBottom <= fit.fold, `${width}x${height} name outside the fold`);
    assert.ok(fit.cvTop >= 0 && fit.cvBottom <= fit.fold + 1, `${width}x${height} Baixar CV outside the fold (${fit.cvBottom} > ${fit.fold})`);
    assert.ok(fit.keysBottom <= fit.fold + 1, `${width}x${height} keyboard outside the fold (${fit.keysBottom} > ${fit.fold})`);
    assert.ok(fit.scroll <= 1, `${width}x${height} horizontal overflow ${fit.scroll}px`);
    assert.match(fit.role, /full stack|full-stack/i);
  }

  await assertHeroFits(1366, 768);
  await assertHeroFits(390, 844);

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
  await page.waitForFunction(() => document.querySelectorAll(".c2-ch img, .c2-card img").length > 0);
  const chapters = await page.evaluate(async () => {
    const titles = [...document.querySelectorAll(".c2-ch h3")].map((el) => (el.textContent || "").replace(/\s+/g, " ").trim());
    const rail = [...document.querySelectorAll(".c2-card")].map((el) => (el.textContent || "").replace(/\s+/g, " ").trim());
    const imgs = [...document.querySelectorAll(".c2-ch img, .c2-card img")];
    const loaded = await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            const probe = new Image();
            probe.onload = () => resolve({ src: img.getAttribute("src"), w: probe.naturalWidth });
            probe.onerror = () => resolve({ src: img.getAttribute("src"), w: 0 });
            probe.src = img.currentSrc || img.src;
          }),
      ),
    );
    return {
      titles,
      rail: rail.join(" | "),
      broken: loaded.filter((img) => !img.w || !img.src).map((img) => img.src),
      switcher: Boolean(document.querySelector(".lo-switch")),
    };
  });
  assert.equal(chapters.switcher, false, "preview layout switcher is visible");
  assert.equal(chapters.broken.length, 0, `broken thumbnails: ${chapters.broken.join(", ")}`);
  assert.deepEqual(chapters.titles, ["ShopMind", "Sneakers New", "Empório da Música", "WebCine TV"]);
  const bar = await page.$eval(".scroll-progress", (el) => {
    const cs = getComputedStyle(el);
    return { h: cs.height, bg: cs.backgroundColor, top: cs.top, z: cs.zIndex };
  });
  assert.equal(bar.h, "3px", "progress bar thickness");
  assert.equal(bar.bg, "rgb(68, 214, 44)", "progress bar color");
  assert.equal(bar.top, "0px");
  assert.ok(Number(bar.z) > 50, "progress bar sits above the nav");
  const navTop = await page.$eval("nav.site", (el) => getComputedStyle(el).top);
  assert.equal(navTop, "3px", "nav clears the progress bar");
  const barBefore = await page.$eval(".scroll-progress", (el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.45));
  await page.waitForFunction((start) => {
    const el = document.querySelector(".scroll-progress");
    const raw = el ? getComputedStyle(el).transform : "";
    const m = raw.match(/matrix\(([^,]+)/);
    return m ? Number(m[1]) > 0.2 && raw !== start : false;
  }, {}, barBefore);
  await page.evaluate(() => window.scrollTo(0, 0));
  for (const name of [/King Imports/, /Brag semanal/, /Crítica de planos/, /Loop de agentes/, /Benchmark de serialização/, /Timesheet inteligente/, /HotRio/, /Empório da Música/]) {
    if (name.source.startsWith("Empório")) assert.match(chapters.titles.join(" "), name);
    else assert.match(chapters.rail, name, `missing rail card ${name}`);
  }
  assert.doesNotMatch(chapters.rail, /Supfy|ShopMind|Sneakers New|WebCine/);
  const shopLinks = await page.$$eval("#p-shopmind a", (els) => els.map((a) => a.getAttribute("href")));
  assert.ok(shopLinks.includes("https://shopmind-agent.vercel.app"));
  assert.ok(shopLinks.includes("https://github.com/helisondias07/shopmind-agent"));
  assert.ok(shopLinks.includes("/projetos/shopmind"));
  const sneakLinks = await page.$$eval("#p-sneakers a", (els) => els.map((a) => a.getAttribute("href")));
  assert.ok(sneakLinks.includes("https://sneakersnew.com.br/"));
  assert.ok(sneakLinks.includes("/projetos/sneakers"));
  assert.equal(sneakLinks.some((href) => (href || "").includes("github.com")), false);
  await page.click("#lang");
  await page.waitForFunction(() => (document.querySelector(".who-role")?.textContent || "").includes("full-stack developer focused on AI"));
  await page.waitForFunction(() => (document.querySelector("#c2-more-h")?.textContent || "").includes("Other projects"));
  const enRail = await page.$eval(".c2-rail", (el) => el.textContent || "");
  assert.match(enRail, /Weekly brag/);
  assert.match(enRail, /Serialization benchmark/);
  await page.click("#lang");

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

  const shotDir = process.env.E2E_SHOTS || (existsSync("/opt/cursor/artifacts") ? "/opt/cursor/artifacts" : join(tmpdir(), "portfolio-e2e"));
  mkdirSync(shotDir, { recursive: true });
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

  await shot("/#projetos", "projects_carousel_1440.png", 1440, 900);
  await shot("/projetos/brag", "case_brag_1440.png", 1440, 900);
  await shot("/projetos/timesheet", "after_desktop_case_timesheet.png", 1440, 900);
  await shot("/projetos/shopmind", "case_shopmind_1440.png", 1440, 900);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${ORIGIN}/`, { waitUntil: "networkidle0" });
  await page.screenshot({ path: `${shotDir}/after_mobile_home.png`, fullPage: false });
  await page.waitForFunction(() => document.querySelector(".nb") && getComputedStyle(document.querySelector(".nb")).display !== "none");
  await page.$eval(".nb", (el) => el instanceof HTMLElement && el.click());
  await page.screenshot({ path: `${shotDir}/after_mobile_menu.png`, fullPage: false });
  await page.keyboard.press("Escape");

  await shot("/#projetos", "projects_carousel_390.png", 390, 844);
  await shot("/projetos/brag", "case_brag_390.png", 390, 844);
  await shot("/projetos/timesheet", "after_mobile_case_timesheet.png", 390, 844);
  await shot("/projetos/shopmind", "case_shopmind_390.png", 390, 844);

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
