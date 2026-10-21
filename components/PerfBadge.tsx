"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { lighthouse, type Device } from "@/data/lighthouse";
import { dict, type Lang } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import Tx from "./Tx";

const LABEL: Record<string, string> = { performance: "Perf", accessibility: "A11y", seo: "SEO" };
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function measured(lang: Lang) {
  const raw = lighthouse.measured;
  if (lang === "pt") return raw;
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(raw);
  if (!m) return raw;
  const month = MONTHS[Number(m[2]) - 1];
  return month ? `${month} ${Number(m[1])}, ${m[3]}` : raw;
}
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

  useLayoutEffect(() => {
    const apply = () => {
      const lang = getLang();
      const t = dict[lang].perf;
      ref.current?.setAttribute("aria-label", `${t.badge}, ${t.measured} ${measured(lang)}`);
      document.getElementById("perf-dev")?.setAttribute("aria-label", t.device);
    };
    apply();
    return subscribe(apply);
  }, []);

  if (!devices.length) return null;
  return (
    <div className="sel ok" ref={ref} aria-label={`${dict.pt.perf.badge}, ${dict.pt.perf.measured} ${lighthouse.measured}`}>
      <span className="selt">Lighthouse</span>
      <div className="tg2" id="perf-dev" role="group" aria-label={dict.pt.perf.device}>
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
            <small>{k === "best-practices" ? <Tx pt={dict.pt.perf.practices} en={dict.en.perf.practices} /> : LABEL[k]}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
