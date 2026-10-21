"use client";
import { useEffect, useRef, useState } from "react";
import { dict } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/store";

type Theme = "light" | "dark";
const KEY = "theme";

function applyTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem(KEY, t);
  } catch {}
}

/** Light/dark toggle with a circular reveal from the button (View Transitions API + fallback). */
export default function ThemeToggle() {
  const btn = useRef<HTMLButtonElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.dataset.theme === "dark");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(KEY)) root.dataset.theme = e.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onChange);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const toggle = () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const r = btn.current!.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return applyTheme(next);
    if (document.startViewTransition) {
      const vt = document.startViewTransition(() => applyTheme(next));
      vt.ready
        .then(() =>
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
            { duration: 560, easing: "cubic-bezier(.4,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
          ),
        )
        .catch(() => {});
      return;
    }
    const o = document.createElement("div");
    o.className = "thx";
    o.style.background = next === "dark" ? "#0f1011" : "#ecebe6";
    o.style.setProperty("--x", `${x}px`);
    o.style.setProperty("--y", `${y}px`);
    document.body.appendChild(o);
    o.getBoundingClientRect();
    o.style.clipPath = `circle(${rad}px at ${x}px ${y}px)`;
    setTimeout(() => {
      applyTheme(next);
      o.style.transition = "opacity .25s";
      o.style.opacity = "0";
      setTimeout(() => o.remove(), 260);
    }, 560);
  };

  const lang = useLang();
  return (
    <button ref={btn} id="thm" className="thm" type="button" aria-label={dict[lang].theme.label} aria-pressed={dark} onClick={toggle}>
      <svg className="sn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="mn" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
