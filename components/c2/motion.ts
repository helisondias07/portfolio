/* Movimento das seções.
   Um único requestAnimationFrame amortece a cor e o deslocamento, então a troca
   de mundo acompanha o dedo no celular e o scroll do desktop sem pular de tom.
   As fitas no começo de "Sobre" entram cruzadas no primeiro scroll; o texto
   corre no sentido da rolagem. Sem dependências.
   Com prefers-reduced-motion (ou ?static) o movimento some e o wash de cor fica. */
import { CHAPTER_WORLDS, damp, dampRgb, formatRgb, inkOn, parseHex, washAt, type RGB } from "./blend";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function splitWords(el: HTMLElement) {
  let i = 0;
  const walk = (node: Node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const parts = (c.textContent || "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          const o = document.createElement("span"); o.className = "lw";
          const n = document.createElement("span"); n.textContent = p; n.style.setProperty("--i", String(i++));
          o.appendChild(n); frag.appendChild(o);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && (c as HTMLElement).tagName !== "BR") walk(c);
    });
  };
  walk(el);
}

function roundRgb(rgb: RGB): RGB {
  return [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])];
}

type Tape = {
  el: HTMLElement;
  track: HTMLElement;
  dir: number;
  rot: number;
  x: number;
  w: number;
  heading: number;
};

function scrollTop() {
  return document.scrollingElement?.scrollTop || window.scrollY || 0;
}

function parseCssRgb(value: string): RGB {
  const m = value.match(/\d+/g);
  if (!m || m.length < 3) return [0, 0, 0];
  return [Number(m[0]), Number(m[1]), Number(m[2])];
}

export function startC2() {
  const root = document.querySelector<HTMLElement>(".c2");
  if (!root) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]static\b/.test(location.search);
  let io: IntersectionObserver | null = null;
  if (reduce) root.classList.add("c2-static");
  if (!reduce) {
    root.classList.add("c2-js");
    root.querySelectorAll<HTMLElement>("[data-lines]").forEach(splitWords);
    root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((p) => [...p.children].forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i))));
    root.querySelectorAll<HTMLElement>(".c2-strip").forEach((s) => s.querySelectorAll("figure").forEach((f, i) => f.style.setProperty("--i", String(i))));

    io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io?.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0 });
    root.querySelectorAll("[data-rise],[data-stagger],[data-lines],.c2-strip").forEach((el) => {
      io?.observe(el);
      const r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight * 0.92) { el.classList.add("in"); io?.unobserve(el); }
    });
  }

  const chapters = [...root.querySelectorAll<HTMLElement>(".c2-ch")];
  root.classList.add("c2-wash");
  const inks = [...root.querySelectorAll<HTMLElement>("[data-ink]")].map((el) => ({ el, ws: [...el.querySelectorAll<HTMLElement>(".w")], ems: [...el.querySelectorAll<HTMLElement>("em")] }));
  const sheets = [...root.querySelectorAll<HTMLElement>("[data-sheet]")];
  const strips = [...root.querySelectorAll<HTMLElement>("[data-strip]")].map((s) => ({
    s,
    inner: s.firstElementChild as HTMLElement,
    chapter: s.closest<HTMLElement>(".c2-ch"),
  }));
  const stripObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
    measure();
    frame(16);
  }) : null;
  strips.forEach(({ s, inner }) => {
    stripObserver?.observe(s);
    stripObserver?.observe(inner);
    [...inner.children].forEach((child) => stripObserver?.observe(child));
  });
  const tl = root.querySelector<HTMLElement>("[data-tl]");
  const tlItems = tl ? [...tl.children] as HTMLElement[] : [];
  const rail = root.querySelector<HTMLElement>("[data-rail]");
  const pin = rail?.querySelector<HTMLElement>(".c2-rail-pin");
  const track = rail?.querySelector<HTMLElement>("[data-rail-track]");
  const count = rail?.querySelector<HTMLElement>("[data-count]");
  const bar = rail?.querySelector<HTMLElement>("[data-progress]");
  const total = track?.children.length || 1;
  const about = root.querySelector<HTMLElement>("#sobre");
  const tapes: Tape[] = [...root.querySelectorAll<HTMLElement>(".c2-tape")].map((el) => ({
    el,
    track: el.querySelector(".c2-tape-track") as HTMLElement,
    dir: Number(el.dataset.dir) || 1,
    rot: el.classList.contains("c2-tape--ink") ? -2.2 : 2.15,
    x: 0,
    w: 1,
    heading: 1,
  }));
  const narrow = matchMedia("(max-width: 900px)");
  let dist = 0, wide = !narrow.matches;
  let vh = innerHeight;
  let lastW = innerWidth;
  let lastH = innerHeight;
  let sy = scrollTop();
  let vy = 0;
  let shownBg: RGB = parseHex(CHAPTER_WORLDS["w-shop"].bg);
  let colorReady = false;
  let lastBg = "";
  let lastFg = "";
  let tlShown = 0;
  let railP = 0;
  const sheetY = new WeakMap<HTMLElement, number>();
  const stripX = new WeakMap<HTMLElement, number>();

  const measureTapes = () => {
    const viewW = Math.max(root.clientWidth, innerWidth);
    tapes.forEach((t) => {
      if (!t.track) return;
      t.track.querySelectorAll("[data-clone]").forEach((n) => n.remove());
      const source = [...t.track.querySelectorAll<HTMLElement>(".c2-tape-set")].find((el) => el.getClientRects().length > 0);
      if (!source) { t.w = 1; return; }
      t.w = Math.max(1, source.getBoundingClientRect().width);
      const copies = Math.ceil((viewW * 1.35) / t.w) + 1;
      for (let i = 0; i < copies; i++) {
        const clone = source.cloneNode(true) as HTMLElement;
        clone.dataset.clone = "1";
        t.track.appendChild(clone);
      }
    });
  };

  const measure = () => {
    wide = !narrow.matches;
    vh = innerHeight || 1;
    if (!wide || reduce) {
      strips.forEach(({ inner }) => { inner.style.transform = ""; });
    }
    if (reduce) sheets.forEach((s) => s.style.removeProperty("--sy"));
    if (rail && pin && track) {
      if (wide && !reduce) {
        dist = Math.max(0, track.scrollWidth - innerWidth);
        pin.style.position = "sticky"; pin.style.top = "0";
        rail.style.height = `${pin.offsetHeight + dist}px`;
      } else {
        dist = 0; pin.style.position = ""; rail.style.height = ""; track.style.transform = "";
      }
    }
    measureTapes();
  };

  const paintRail = (p: number) => {
    if (count) count.textContent = String(Math.min(total, 1 + Math.round(p * (total - 1)))).padStart(2, "0");
    if (bar) bar.style.transform = `scaleX(${Math.max(0.08, p)})`;
  };

  const frame = (dt: number) => {
    let busy = false;
    const y = scrollTop();
    if (reduce) {
      sy = y;
      vy = 0;
    } else {
      const prev = sy;
      sy = Math.abs(y - sy) < 0.35 ? y : damp(sy, y, 85, dt);
      vy = damp(vy, ((sy - prev) / Math.max(dt, 1)) * 16.67, 90, dt);
      if (Math.abs(vy) > 0.2 || Math.abs(y - sy) > 0.6) busy = true;
    }

    const wash = washAt(chapters.map((el) => el.getBoundingClientRect().top), vh);
    if (wash) {
      const blendTarget = parseCssRgb(wash.bg);
      if (!colorReady || reduce) {
        shownBg = blendTarget;
        colorReady = true;
      } else {
        shownBg = dampRgb(shownBg, blendTarget, wide ? 420 : 480, dt);
        if (Math.abs(shownBg[0] - blendTarget[0]) < 0.45 && Math.abs(shownBg[1] - blendTarget[1]) < 0.45 && Math.abs(shownBg[2] - blendTarget[2]) < 0.45) {
          shownBg = blendTarget;
        }
      }
      const rounded = roundRgb(shownBg);
      const ink = inkOn(rounded, parseHex(CHAPTER_WORLDS[wash.from].fg), parseHex(CHAPTER_WORLDS[wash.to].fg));
      const bgStr = formatRgb(rounded);
      const fgStr = formatRgb(ink);
      if (bgStr !== lastBg) {
        root.style.setProperty("--ch-bg", bgStr);
        document.documentElement.style.setProperty("--nav-world-bg", bgStr);
        lastBg = bgStr;
      }
      if (fgStr !== lastFg) {
        root.style.setProperty("--ch-ink", fgStr);
        document.documentElement.style.setProperty("--nav-world-fg", fgStr);
        lastFg = fgStr;
      }
      const washing = wash.live || bgStr !== wash.bg;
      root.classList.toggle("c2-wash-live", washing);
      if (washing) busy = true;
    }

    if (!reduce) inks.forEach(({ el, ws, ems }) => {
      if (!el.offsetParent) return;
      const r = el.getBoundingClientRect();
      const n = Math.round(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3)) * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
      ems.forEach((e) => e.classList.toggle("lit", !!e.querySelector(".w:last-child")?.classList.contains("on")));
    });

    if (!reduce) {
      const rise = wide ? 96 : 36;
      sheets.forEach((s) => {
        const r = s.getBoundingClientRect();
        const current = sheetY.get(s) ?? 0;
        const layoutTop = r.top - current;
        const p = clamp((vh - layoutTop) / (vh * 0.62));
        const next = damp(current, (1 - p) * rise, wide ? 90 : 120, dt);
        sheetY.set(s, next);
        s.style.setProperty("--sy", `${next.toFixed(2)}px`);
      });
    }

    if (wide && !reduce) strips.forEach(({ s, inner }) => {
      const r = s.getBoundingClientRect();
      const start = vh * 0.9;
      const end = vh * 0.1;
      const p = clamp((start - r.top) / Math.max(1, start - end));
      const naturalOver = Math.max(0, inner.scrollWidth - s.clientWidth);
      const over = naturalOver || (inner.children.length > 1 ? Math.round(s.clientWidth * 0.18) : 0);
      const current = stripX.get(inner) ?? 0;
      const next = damp(current, -p * over, 80, dt);
      stripX.set(inner, next);
      inner.style.transform = `translate3d(${next.toFixed(1)}px,0,0)`;
    });

    if (tl && !reduce) {
      const r = tl.getBoundingClientRect();
      const target = clamp((vh * 0.7 - r.top) / Math.max(1, r.height));
      tlShown = damp(tlShown, target, 110, dt);
      tl.style.setProperty("--tl", tlShown.toFixed(4));
      tlItems.forEach((li) => li.classList.toggle("passed", li.getBoundingClientRect().top < vh * 0.7));
    } else if (tl && reduce) {
      tl.style.setProperty("--tl", "1");
    }

    if (rail && track && wide && !reduce && dist > 0) {
      const r = rail.getBoundingClientRect();
      const target = clamp(-r.top / Math.max(1, rail.offsetHeight - (pin?.offsetHeight || 0)));
      railP = damp(railP, target, 80, dt);
      track.style.transform = `translate3d(${(-railP * dist).toFixed(1)}px,0,0)`;
      paintRail(railP);
    } else if (rail && track && !wide) {
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      paintRail(max > 0 ? track.scrollLeft / max : 0);
    }

    if (about && !reduce) {
      const covered = about.getBoundingClientRect().top < 20;
      document.documentElement.classList.toggle("hero-covered", covered);
    }

    if (tapes.length) {
      const seam = (about ?? root).getBoundingClientRect().top;
      const reveal = reduce ? 1 : clamp((vh * 0.98 - seam) / (vh * 0.5));
      const near = seam < vh + 280 && seam > -520;
      tapes.forEach((t) => {
        const slide = reduce ? 0 : (1 - reveal) * 82 * t.dir;
        const drop = reduce ? 0 : (1 - reveal) * 36;
        t.el.style.transform = `rotate(${t.rot}deg) translate3d(${slide.toFixed(2)}%,${drop.toFixed(1)}px,0)`;
        if (!reduce && near) busy = true;
        if (reduce || !near || !t.track || t.w < 2) return;
        if (Math.abs(vy) > 0.45) t.heading = vy > 0 ? 1 : -1;
        const speed = 0.045 + Math.min(Math.abs(vy), 72) * 0.026;
        t.x -= t.dir * t.heading * speed * dt;
        if (t.x <= -t.w) t.x += t.w;
        if (t.x > 0) t.x -= t.w;
        t.track.style.transform = `translate3d(${t.x.toFixed(2)}px,0,0)`;
      });
    }
    return busy;
  };

  let raf = 0;
  let last = performance.now();
  let alive = true;
  let idle = 0;
  const loop = (now: number) => {
    if (!alive) return;
    if (document.hidden) { raf = 0; return; }
    const dt = Math.min(34, Math.max(1, now - last));
    last = now;
    const busy = frame(dt);
    idle = busy ? 0 : idle + 1;
    if (idle > 40) { raf = 0; return; }
    raf = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!alive || reduce) return;
    idle = 0;
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };
  const onScroll = () => { frame(16); };
  const onResize = () => {
    const w = innerWidth;
    const h = innerHeight;
    if (w === lastW && Math.abs(h - lastH) < 140) return;
    lastW = w;
    lastH = h;
    measure();
    frame(16);
  };
  const onLoad = () => { measure(); frame(16); };
  const onLang = () => { measureTapes(); frame(16); };
  const langObs = new MutationObserver(onLang);
  langObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  const onRailScroll = () => {
    if (wide || !track) return;
    const max = Math.max(0, track.scrollWidth - track.clientWidth);
    paintRail(max > 0 ? track.scrollLeft / max : 0);
  };

  measure();
  frame(16);
  if (reduce) {
    addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });
  } else {
    addEventListener("scroll", wake, { passive: true });
    document.addEventListener("scroll", wake, { passive: true });
    addEventListener("pointerdown", wake, { passive: true });
    addEventListener("wheel", wake, { passive: true });
    raf = requestAnimationFrame(loop);
  }
  const onVis = () => { if (!document.hidden) wake(); };
  document.addEventListener("visibilitychange", onVis);
  addEventListener("resize", onResize);
  addEventListener("load", onLoad);
  track?.addEventListener("scroll", onRailScroll, { passive: true });

  return () => {
    alive = false;
    cancelAnimationFrame(raf);
    root.classList.remove("c2-wash", "c2-wash-live", "c2-static", "c2-js");
    root.style.removeProperty("--ch-bg");
    root.style.removeProperty("--ch-ink");
    document.documentElement.style.removeProperty("--nav-world-bg");
    document.documentElement.style.removeProperty("--nav-world-fg");
    document.documentElement.classList.remove("hero-covered");
    removeEventListener("scroll", onScroll);
    document.removeEventListener("scroll", onScroll);
    removeEventListener("scroll", wake);
    document.removeEventListener("scroll", wake);
    removeEventListener("pointerdown", wake);
    removeEventListener("wheel", wake);
    document.removeEventListener("visibilitychange", onVis);
    removeEventListener("resize", onResize);
    removeEventListener("load", onLoad);
    track?.removeEventListener("scroll", onRailScroll);
    langObs.disconnect();
    stripObserver?.disconnect();
    io?.disconnect();
  };
}
