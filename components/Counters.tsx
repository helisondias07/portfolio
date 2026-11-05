"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { dict } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import Tx from "./Tx";

/** Animated counter for production stores. The start year is static: since 2023, not a rounded year count. */
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
  useLayoutEffect(() => {
    const apply = () => document.getElementById("exp-yrs")?.setAttribute("aria-label", dict[getLang()].about.counters.yearsAria);
    apply();
    return subscribe(apply);
  }, []);

  const pt = dict.pt.about.counters;
  const en = dict.en.about.counters;
  return (
    <dl className="stt" id="stt" ref={ref}>
      <div>
        <dt>
          <span data-to="10">10</span>
          <em>+</em>
        </dt>
        <dd><Tx pt={pt.projects} en={en.projects} /></dd>
      </div>
      <div>
        <dt id="exp-yrs" aria-label={pt.yearsAria}>
          <small><Tx pt={pt.since} en={en.since} /></small>
          <span>2023</span>
        </dt>
        <dd><Tx pt={pt.experience} en={en.experience} /></dd>
      </div>
    </dl>
  );
}
