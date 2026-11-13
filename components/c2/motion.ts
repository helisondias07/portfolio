/* Movimento das seções novas.
   - Eduardo: parágrafo tingido palavra por palavra, títulos subindo por palavra, blocos entrando em cascata,
     capítulos subindo como folhas, trilho horizontal fixado com contador, linha do tempo que se desenha.
   - Kenji: faixas de imagens que entram vindas de fora da tela e deslizam com a rolagem, zoom leve no hover.
   Sem dependências. Com prefers-reduced-motion (ou ?static) o movimento some e o wash de cor permanece. */
import { washAt } from "./blend";

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
    frame();
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
  let dist = 0, wide = false;

  const measure = () => {
    wide = innerWidth > 900;
    if (!wide || reduce) {
      sheets.forEach((s) => s.style.removeProperty("--sy"));
      strips.forEach(({ inner }) => { inner.style.transform = ""; });
    }
    if (rail && pin && track) {
      if (wide && !reduce) {
        dist = Math.max(0, track.scrollWidth - innerWidth);
        pin.style.position = "sticky"; pin.style.top = "0";
        rail.style.height = `${pin.offsetHeight + dist}px`;
      } else {
        dist = 0; pin.style.position = ""; rail.style.height = ""; track.style.transform = "";
      }
    }
  };

  const frame = () => {
    const vh = innerHeight;
    const wash = washAt(chapters.map((el) => el.getBoundingClientRect().top), vh);
    if (wash) {
      root.style.setProperty("--ch-bg", wash.bg);
      root.style.setProperty("--ch-ink", wash.fg);
      document.documentElement.style.setProperty("--nav-world-bg", wash.bg);
      root.classList.toggle("c2-wash-live", wash.live);
    }
    if (!reduce) inks.forEach(({ el, ws, ems }) => {
      if (!el.offsetParent) return;
      const r = el.getBoundingClientRect();
      const n = Math.round(clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3)) * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
      ems.forEach((e) => e.classList.toggle("lit", !!e.querySelector(".w:last-child")?.classList.contains("on")));
    });
    if (wide && !reduce) sheets.forEach((s) => {
      const r = s.getBoundingClientRect();
      const current = parseFloat(s.style.getPropertyValue("--sy")) || 0;
      s.style.setProperty("--sy", `${(1 - clamp((vh - (r.top - current)) / (vh * 0.6))) * 96}px`);
    });
    if (wide && !reduce) strips.forEach(({ s, inner }) => {
      const r = s.getBoundingClientRect();
      const start = vh * 0.9;
      const end = vh * 0.1;
      const p = clamp((start - r.top) / Math.max(1, start - end));
      const naturalOver = Math.max(0, inner.scrollWidth - s.clientWidth);
      const over = naturalOver || (inner.children.length > 1 ? Math.round(s.clientWidth * 0.18) : 0);
      inner.style.transform = `translate3d(${-p * over}px,0,0)`;
    });
    if (tl && !reduce) {
      const r = tl.getBoundingClientRect();
      tl.style.setProperty("--tl", String(clamp((vh * 0.7 - r.top) / r.height)));
      tlItems.forEach((li) => li.classList.toggle("passed", li.getBoundingClientRect().top < vh * 0.7));
    }
    if (rail && track && wide && !reduce && dist > 0) {
      const r = rail.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, rail.offsetHeight - (pin?.offsetHeight || 0)));
      track.style.transform = `translate3d(${-p * dist}px,0,0)`;
      if (count) count.textContent = String(Math.min(total, 1 + Math.round(p * (total - 1)))).padStart(2, "0");
      if (bar) bar.style.transform = `scaleX(${Math.max(0.08, p)})`;
    }
  };

  let raf = 0;
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; frame(); }); };
  const onResize = () => { measure(); frame(); };
  measure(); frame();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  // imagens carregadas mudam a largura do trilho
  addEventListener("load", onResize);
  return () => {
    root.classList.remove("c2-wash", "c2-wash-live", "c2-static");
    root.style.removeProperty("--ch-bg");
    root.style.removeProperty("--ch-ink");
    root.style.removeProperty("--sneak-ink");
    document.documentElement.style.removeProperty("--nav-world-bg");
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onResize);
    removeEventListener("load", onResize);
    stripObserver?.disconnect();
    io?.disconnect();
  };
}
