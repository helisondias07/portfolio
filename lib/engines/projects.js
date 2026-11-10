/* eslint-disable */
// Coverflow carousel + "Case em destaque" crossfade. Same interaction as production,
// with PNG thumbnails and an extra demo link when a project publishes one.
import { dict } from "../i18n/dict";
import { getLang, subscribe } from "../i18n/store";
import { localizeProject } from "../i18n/localize";

let started = false;

const esc = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function isGithub(url) {
  return /^https?:\/\/(www\.)?github\.com\//i.test(url || "");
}

function thumb(file) {
  return `/thumbnails/${file}`;
}

function sourcesFor(file, w, h, media) {
  if (!file) return "";
  const mediaAttr = media ? ` media="${media}"` : "";
  if (/\.webp$/i.test(file)) {
    const avif = file.replace(/\.webp$/i, ".avif");
    return `<source${mediaAttr} type="image/avif" srcset="${thumb(avif)}" width="${w}" height="${h}"><source${mediaAttr} type="image/webp" srcset="${thumb(file)}" width="${w}" height="${h}">`;
  }
  return `<source${mediaAttr} srcset="${thumb(file)}" width="${w}" height="${h}">`;
}

function picture(img, mimg, dw, dh, mw, mh, alt, loading) {
  if (!img) return "";
  const lazy = loading === "eager" ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"';
  return `<picture>${sourcesFor(mimg, mw, mh, "(max-width:767px)")}${sourcesFor(img, dw, dh, "")}<img src="${thumb(img)}" width="${dw}" height="${dh}" alt="${alt}" ${lazy}></picture>`;
}

export function startProjects(base) {
  if (started) return;
  const cf = document.getElementById("cf");
  const tr = document.getElementById("cft");
  const dots = document.getElementById("dots");
  const cnt = document.getElementById("cnt");
  const csd = document.getElementById("csd");
  if (!cf || !tr || !dots || !cnt || !csd) return;
  started = true;

  let P = base.map((p) => localizeProject(p, getLang()));
  const ui = () => dict[getLang()].projectsUi;
  const N = P.length;
  let cur = 0;
  let L;
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(n).padStart(2, "0");

  function lay(w) {
    if (w < 375) return { cw: Math.round(w * 0.88), vo: 0, gap: 0.86, s1: 0.72, s2: 0.5, sy: 22, ro: 12 };
    if (w < 425) return { cw: Math.round(w * 0.86), vo: 0, gap: 0.84, s1: 0.72, s2: 0.5, sy: 22, ro: 12 };
    if (w < 640) return { cw: Math.min(Math.round(w * 0.84), 380), vo: 0, gap: 0.82, s1: 0.74, s2: 0.5, sy: 24, ro: 13 };
    if (w < 768) return { cw: Math.min(Math.round(w * 0.82), 560), vo: 1, gap: 0.82, s1: 0.74, s2: 0.52, sy: 26, ro: 14 };
    if (w < 1024) return { cw: Math.min(Math.round(w * 0.78), 650), vo: 1, gap: 0.82, s1: 0.74, s2: 0.52, sy: 28, ro: 15 };
    if (w < 1240) return { cw: 760, vo: 2, gap: 0.64, s1: 0.66, s2: 0.48, sy: 30, ro: 17 };
    if (w < 1520) return { cw: Math.min(860, Math.round(w * 0.6)), vo: 2, gap: 0.64, s1: 0.66, s2: 0.48, sy: 32, ro: 18 };
    return { cw: Math.min(Math.round(w * 0.5), 1000), vo: 2, gap: 0.63, s1: 0.65, s2: 0.47, sy: 34, ro: 18 };
  }

  const openOf = (p) => p.demo || p.url || "";

  const cards = P.map((p, i) => {
    const b = document.createElement("div");
    b.className = "cfc";
    b.setAttribute("role", "button");
    b.dataset.id = p.id;
    b.classList.toggle("long", (p.name || "").length > 12);
    const lz = i === 0 ? "eager" : "lazy";
    b.innerHTML = `<div class="im">${picture(p.img, p.mimg, p.dw, p.dh, p.mw, p.mh, esc(ui().preview + p.name), lz)}<div class="dim"></div><div class="ov"><div class="ct"></div><h3>${esc(p.name)}</h3><div class="vs">${esc(openOf(p) ? ui().visit : ui().clickDetails)}</div></div></div>`;
    if (!p.img) b.querySelector(".im").classList.add("im-empty");
    b.onclick = (e) => {
      if (dragged) return;
      const item = P[i];
      const open = openOf(item);
      if (off(i) === 0 && open) window.open(open, "_blank", "noopener");
      else go(F.indexOf(i));
    };
    b.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === b) {
        e.preventDefault();
        b.click();
      }
    });
    tr.appendChild(b);
    return b;
  });

  let F = P.map((_, i) => i);

  function mkDots() {
    dots.innerHTML = "";
    F.forEach((pi, k) => {
      const d = document.createElement("button");
      d.setAttribute("aria-label", ui().goTo + P[pi].name);
      d.onclick = () => go(k);
      dots.appendChild(d);
    });
  }

  document.querySelectorAll(".flt2 button").forEach((fb) => {
    fb.onclick = () => {
      document.querySelectorAll(".flt2 button").forEach((x) => x.classList.toggle("on", x === fb));
      const f = fb.dataset.f;
      F = P.map((_, i) => i).filter((i) => f === "*" || P[i].tags.includes(f));
      mkDots();
      go(0);
    };
  });
  mkDots();

  function off(i) {
    const k = F.indexOf(i);
    const n = F.length;
    if (k < 0) return null;
    let r = k - cur;
    if (r > n / 2) r -= n;
    if (r < -n / 2) r += n;
    return r;
  }

  function render() {
    const w = innerWidth;
    L = lay(w);
    if (w >= 1024) L.cw = Math.min(L.cw, Math.round((innerHeight - 300) * 4 / 3));
    cf.style.setProperty("--cw", L.cw + "px");
    const ih = L.cw * (w < 768 ? 4 / 3 : 3 / 4);
    cf.style.setProperty("--sh", Math.round(ih + L.sy + 60) + "px");
    cards.forEach((c, i) => {
      const o0 = off(i);
      c.classList.toggle("out", o0 === null);
      const o = o0 === null ? 0 : o0;
      if (o0 === null) {
        c.style.transform = "translateY(40px) scale(.6)";
        c.style.zIndex = 0;
        c.classList.remove("on", "mob");
        return;
      }
      const a = Math.abs(o);
      const act = o === 0;
      const sc = act ? 1 : a === 1 ? L.s1 : L.s2;
      c.style.transform = `translateX(${o * L.cw * L.gap}px) translateY(${act ? 0 : L.sy}px) rotateY(${o * -L.ro}deg) scale(${sc})`;
      c.style.opacity = a <= L.vo || act ? 1 : L.vo === 0 && a === 1 ? 0 : 0;
      c.style.zIndex = act ? 50 : 10 - a;
      c.style.pointerEvents = a <= L.vo ? "auto" : "none";
      const dim = c.querySelector(".dim");
      if (dim) dim.style.opacity = act ? 0 : a === 1 ? 0.35 : 0.55;
      c.classList.toggle("on", act);
      c.tabIndex = act ? 0 : -1;
    });
    [...dots.children].forEach((d, i) => {
      d.classList.toggle("on", i === cur);
      d.setAttribute("aria-current", i === cur ? "true" : "false");
    });
    cnt.textContent = pad(cur + 1) + " / " + pad(F.length);
  }

  function caseLinks(p, u) {
    if (p.demo) {
      const second = p.url
        ? `<a class="czx" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(isGithub(p.url) ? u.visitGithub : u.visitSite)}</a>`
        : "";
      return `<div class="czlinks"><a class="czv" href="${esc(p.demo)}" target="_blank" rel="noopener">${esc(u.visitDemo)} <span aria-hidden="true">↗</span></a>${second}</div>`;
    }
    if (p.url) {
      return `<a class="czv" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(u.visitSite)} <span aria-hidden="true">↗</span></a>`;
    }
    return "";
  }

  function detail() {
    const p = P[F[cur]];
    const E = esc;
    const has = (a) => (Array.isArray(a) ? a.length : !!(a && String(a).trim()));
    const u = ui();
    const host = (p.demo || p.url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
    let h = `<header class="czh"><div>${has(p.eyebrow) || has(p.cat) ? `<p class="czb">${[p.eyebrow, p.cat].filter(has).map(E).join(" · ")}</p>` : ""}<h3>${E(p.title || p.name)}</h3>${has(p.association) ? `<p class="cza">${E(p.association)}</p>` : ""}</div>${caseLinks(p, u)}</header>`;
    if (p.img) {
      const desk = picture(p.img, "", p.dw, p.dh, p.mw, p.mh, E(p.name + " — " + u.desktop), "lazy");
      const phone = p.mimg ? `<figure class="czp">${picture(p.mimg, "", p.mw, p.mh, p.mw, p.mh, E(p.name + " — " + u.mobile), "lazy")}</figure>` : "";
      h += `<div class="czm"><figure class="czd"><div class="czbar"><i></i><i></i><i></i>${host ? `<span>${E(host)}</span>` : ""}</div>${desk}</figure>${phone}</div>`;
    }
    h += `<div class="czg">${has(p.overview) ? `<div><h4>${E(u.overview)}</h4>${p.overview.map((x) => `<p>${E(x)}</p>`).join("")}${has(p.resultado) ? `<p class="czr">${E(p.resultado)}</p>` : ""}${has(p.limits) ? `<p class="czlim">${E(p.limits)}</p>` : ""}${p.inspiration && p.inspiration.href ? `<p class="czlim"><a href="${E(p.inspiration.href)}" target="_blank" rel="noopener">${E(p.inspiration.text)}</a></p>` : ""}</div>` : ""}${has(p.contributions) ? `<div><h4>${E(p.contributionsTitle || u.roleFallback)}</h4><ul>${p.contributions.map((x) => `<li>${E(x)}</li>`).join("")}</ul></div>` : ""}</div>`;
    if (has(p.stack)) h += `<div class="czs"><h4>${E(p.stackTitle || "Stack")}</h4><div class="kc">${p.stack.map((x) => `<span>${E(x)}</span>`).join("")}</div></div>`;
    const n = document.createElement("div");
    n.className = "cz";
    n.innerHTML = h;
    n.querySelectorAll("img").forEach((im) => {
      if (im.complete) im.classList.add("ld");
      else im.addEventListener("load", () => im.classList.add("ld"), { once: true });
    });
    const olds = [...csd.querySelectorAll(".cz:not(.lv)")];
    const h0 = csd.offsetHeight;
    olds.forEach((o) => {
      o.classList.add("lv");
      o.style.top = o.offsetTop + "px";
      setTimeout(() => o.remove(), 520);
    });
    csd.appendChild(n);
    const cdn = document.getElementById("cdn");
    if (cdn) cdn.textContent = pad(cur + 1) + " / " + pad(F.length) + " · " + p.name;
    if (!olds.length || rm) {
      n.classList.add("in");
    } else {
      const h1 = n.offsetHeight;
      csd.style.height = h0 + "px";
      void csd.offsetHeight;
      requestAnimationFrame(() => {
        csd.style.height = h1 + "px";
        n.classList.add("in");
      });
      clearTimeout(csd._t);
      csd._t = setTimeout(() => {
        csd.style.height = "";
      }, 540);
    }
    const cat = cards[F[cur]]?.querySelector(".ct");
    if (cat) type2(cat, p.cat);
  }

  let t2 = 0;
  function type2(el, t) {
    clearInterval(t2);
    if (rm || !el) {
      if (el) el.textContent = t;
      return;
    }
    let k = 0;
    el.textContent = "";
    t2 = setInterval(() => {
      el.textContent = t.slice(0, ++k);
      if (k >= t.length) clearInterval(t2);
    }, 32);
  }

  function go(i) {
    const n = F.length;
    if (!n) return;
    cur = ((i % n) + n) % n;
    render();
    detail();
  }

  function kp(id) {
    const b = document.getElementById(id);
    if (!b) return;
    b.classList.add("kp");
    setTimeout(() => b.classList.remove("kp"), 140);
  }

  ["cfl", "cfl2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.onclick = () => {
      kp(id);
      go(cur - 1);
    };
  });
  ["cfr", "cfr2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.onclick = () => {
      kp(id);
      go(cur + 1);
    };
  });

  let sx = null;
  let dragged = false;
  cf.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".cfa")) return;
    sx = e.clientX;
    dragged = false;
  });
  addEventListener("pointerup", (e) => {
    if (sx == null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) {
      dragged = true;
      go(cur + (dx < 0 ? 1 : -1));
      setTimeout(() => {
        dragged = false;
      }, 50);
    }
  });

  let rz;
  addEventListener("resize", () => {
    clearTimeout(rz);
    rz = setTimeout(render, 80);
  });

  function applyCard(b, p) {
    const u = ui();
    b.setAttribute("aria-label", u.select + p.name);
    const img = b.querySelector("img");
    if (img) img.alt = u.preview + p.name;
    const vs = b.querySelector(".vs");
    if (vs) vs.textContent = openOf(p) ? u.visit : u.clickDetails;
    const h3 = b.querySelector("h3");
    if (h3) h3.textContent = p.name;
    b.classList.toggle("long", (p.name || "").length > 12);
  }

  subscribe(() => {
    P = base.map((p) => localizeProject(p, getLang()));
    cards.forEach((b, i) => applyCard(b, P[i]));
    const fbtn = document.querySelector(".flt2 button.on");
    const f = fbtn && fbtn.dataset.f;
    F = P.map((_, i) => i).filter((i) => !f || f === "*" || P[i].tags.includes(f));
    if (cur >= F.length) cur = 0;
    mkDots();
    go(cur);
  });

  go(0);
  void N;
}
