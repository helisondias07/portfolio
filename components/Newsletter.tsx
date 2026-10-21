"use client";
import { useState, type FormEvent } from "react";
import { dict } from "@/lib/i18n/dict";
import { getLang, useLang } from "@/lib/i18n/store";
import Tx from "./Tx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Code = "" | "invalid" | "sending" | "ok" | "rate_limited" | "not_configured" | "fail";

function textFor(code: Code, email: string, lang: "pt" | "en") {
  const t = dict[lang].newsletter;
  if (code === "invalid") return t.invalid;
  if (code === "sending") return t.sending;
  if (code === "ok") return t.ok.replace("{email}", email);
  if (code === "rate_limited") return t.rate;
  if (code === "not_configured") return t.off;
  if (code === "fail") return t.fail;
  return "";
}

export default function Newsletter() {
  const lang = useLang();
  const [code, setCode] = useState<Code>("");
  const [sentTo, setSentTo] = useState("");
  const [busy, setBusy] = useState(false);
  const t = dict[lang].newsletter;
  const kind = code === "ok" ? "ok" : code === "sending" || code === "" ? "" : "err";

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = ev.currentTarget;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value.trim();
    const company = (f.elements.namedItem("company") as HTMLInputElement).value;
    if (!EMAIL_RE.test(email)) {
      setCode("invalid");
      (f.elements.namedItem("email") as HTMLInputElement).focus();
      return;
    }
    setBusy(true);
    setCode("sending");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company, lang: getLang() }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error ?? "falha");
      setSentTo(email);
      setCode("ok");
      f.reset();
    } catch (e) {
      const err = e instanceof Error ? e.message : "";
      setCode(err === "rate_limited" || err === "not_configured" ? err : "fail");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={`nl ${kind}`} id="nl" noValidate onSubmit={onSubmit}>
      <label htmlFor="nle" className="nlt">Newsletter</label>
      <p className="fp"><Tx pt={dict.pt.newsletter.blurb} en={dict.en.newsletter.blurb} /></p>
      <div className="nlr">
        <input id="nle" name="email" type="email" placeholder={t.placeholder} autoComplete="email" required suppressHydrationWarning />
        <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" disabled={busy}><Tx pt={dict.pt.newsletter.submit} en={dict.en.newsletter.submit} /></button>
      </div>
      <p className="nlm" id="nlm" role="status" aria-live="polite">{textFor(code, sentTo, lang)}</p>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var i=document.getElementById("nle");if(i&&document.documentElement.dataset.lang==="en")i.placeholder=${JSON.stringify(dict.en.newsletter.placeholder)}}catch(e){}})()`,
        }}
      />
    </form>
  );
}
