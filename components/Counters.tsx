"use client";
import { useEffect, useRef } from "react";

/** Animated counters — real numbers only (10+ projetos publicados, 2 anos e 6 meses). */
export default function Counters() {
  const ref = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const nums = [...el.querySelectorAll<HTMLElement>("[data-to]")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nums.forEach((n) => (n.textContent = n.dataset.to!));
      return;
    }
    const r0 = el.getBoundingClientRect();
    if (r0.top < innerHeight && r0.bottom > 0) return;
    nums.forEach((n) => (n.textContent = "0"));
    const run = () =>
      nums.forEach((n, i) => {
        const to = Number(n.dataset.to);
        const t0 = performance.now() + i * 120;
        const f = (t: number) => {
          const k = Math.min(1, Math.max(0, (t - t0) / 1200));
          n.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 4))));
          if (k < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      });
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <dl className="stt" id="stt" ref={ref}>
      <div>
        <dt>
          <span data-to="10">10</span>
          <em>+</em>
        </dt>
        <dd>projetos publicados</dd>
      </div>
      <div>
        <dt aria-label="2 anos e 6 meses">
          <span data-to="2">2</span>
          <small>anos e</small>
          <span data-to="6">6</span>
          <small>meses</small>
        </dt>
        <dd>experiência em tecnologia</dd>
      </div>
    </dl>
  );
}
