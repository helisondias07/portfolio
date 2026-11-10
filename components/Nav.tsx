"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { dict } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/store";
import LangToggle from "./LangToggle";
import ThemeToggle from "./ThemeToggle";
import Tx from "./Tx";

const LINKS = [
  { href: "#sobre", pt: dict.pt.nav.about, en: dict.en.nav.about, id: "sobre" },
  { href: "#projetos", pt: dict.pt.nav.projects, en: dict.en.nav.projects, id: "projetos" },
  { href: "#contato", pt: dict.pt.nav.contact, en: dict.en.nav.contact, id: "contato" },
] as const;

export default function Nav() {
  const lang = useLang();
  const path = usePathname();
  const home = path === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.15, 0.4] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setOpen(false);
    };
    addEventListener("resize", onResize);
    return () => removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btn.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panel.current?.contains(t) || btn.current?.contains(t)) return;
      close();
    };
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = [
        ...(panel.current?.querySelectorAll<HTMLElement>("a,button") ?? []),
        btn.current,
      ].filter((n): n is HTMLElement => !!n && !n.hasAttribute("disabled"));
      if (!nodes.length) return;
      const i = nodes.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        nodes[nodes.length - 1].focus();
      } else if (!e.shiftKey && i === nodes.length - 1) {
        e.preventDefault();
        nodes[0].focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("keydown", trap);
    document.addEventListener("pointerdown", onClick);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", trap);
      document.removeEventListener("pointerdown", onClick);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const t = dict[lang].nav;

  return (
    <>
      <a className="skip" href="#conteudo">
        <Tx pt={dict.pt.nav.skip} en={dict.en.nav.skip} />
      </a>
      <nav aria-label="Helison Dias">
        <a className="lg" href={home ? "#hero" : "/"}>
          Helison Dias<span style={{ color: "var(--g)" }}>.</span>
        </a>
        <div className={`ls${open ? " open" : ""}`} id={panelId} ref={panel} role={open ? "dialog" : undefined} aria-modal={open || undefined} aria-label={open ? t.open : undefined}>
          {LINKS.map((l) => (
            <a key={l.id} href={home ? l.href : `/${l.href}`} aria-current={active === l.id ? "location" : undefined} onClick={close}>
              <Tx pt={l.pt} en={l.en} />
            </a>
          ))}
        </div>
        <div className="nvr">
          <LangToggle />
          <ThemeToggle />
          <button
            ref={btn}
            className="nb"
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? t.close : t.open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nb-bars" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </>
  );
}
