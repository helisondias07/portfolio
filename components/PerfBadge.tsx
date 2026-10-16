"use client";
import { useEffect, useRef, useState } from "react";
import { lighthouse, type Device } from "@/data/lighthouse";

const LABEL: Record<string, string> = { performance: "Perf", accessibility: "A11y", "best-practices": "Práticas", seo: "SEO" };
const C = 113.1;
const good = (d: Device) => Object.values(lighthouse[d]).every((v) => v >= 90);

/** Theme-adaptive Lighthouse badge. Renders only when every score is >= 90. */
export default function PerfBadge() {
  const devices = (["mobile", "desktop"] as Device[]).filter(good);
  const [dev, setDev] = useState<Device>(devices[0] ?? "mobile");
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          io.disconnect();
          requestAnimationFrame(() => setShown(true));
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!devices.length) return null;
  return (
    <div className="sel ok" ref={ref} aria-label={`Selo de performance Lighthouse, medido em ${lighthouse.measured}`}>
      <span className="selt">Lighthouse</span>
      <div className="tg2" role="group" aria-label="Dispositivo">
        {devices.map((d) => (
          <button key={d} className={d === dev ? "on" : ""} aria-pressed={d === dev} onClick={() => setDev(d)}>
            {d === "mobile" ? "Mobile" : "Desktop"}
          </button>
        ))}
      </div>
      <div className="rg">
        {Object.entries(lighthouse[dev]).map(([k, v]) => (
          <span key={k} title={`${k}: ${v}`}>
            <svg viewBox="0 0 42 42">
              <circle className="bg" cx="21" cy="21" r="18" />
              <circle className="fg" cx="21" cy="21" r="18" strokeDasharray={C} strokeDashoffset={shown ? C * (1 - v / 100) : C} />
            </svg>
            {v}
            <small>{LABEL[k]}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
