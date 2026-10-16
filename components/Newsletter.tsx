"use client";
import { useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type State = { kind: "" | "ok" | "err"; msg: string };

export default function Newsletter() {
  const [st, setSt] = useState<State>({ kind: "", msg: "" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const f = ev.currentTarget;
    const email = (f.elements.namedItem("email") as HTMLInputElement).value.trim();
    const company = (f.elements.namedItem("company") as HTMLInputElement).value;
    if (!EMAIL_RE.test(email)) {
      setSt({ kind: "err", msg: "Digite um e-mail válido." });
      (f.elements.namedItem("email") as HTMLInputElement).focus();
      return;
    }
    setBusy(true);
    setSt({ kind: "", msg: "Enviando…" });
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error ?? "falha");
      setSt({ kind: "ok", msg: `Pronto! Enviei uma confirmação para ${email}.` });
      f.reset();
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setSt({
        kind: "err",
        msg:
          code === "rate_limited"
            ? "Muitas tentativas. Tente novamente mais tarde."
            : code === "not_configured"
              ? "A newsletter ainda não está ativa. Fale comigo pelo WhatsApp ou LinkedIn."
              : "Não foi possível inscrever agora. Tente novamente em instantes.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={`nl ${st.kind}`} id="nl" noValidate onSubmit={onSubmit}>
      <label htmlFor="nle" className="nlt">Newsletter</label>
      <p className="fp">Novidades sobre projetos e o que ando construindo. Sem spam.</p>
      <div className="nlr">
        <input id="nle" name="email" type="email" placeholder="seu@email.com" autoComplete="email" required />
        <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" disabled={busy}>Inscrever</button>
      </div>
      <p className="nlm" id="nlm" role="status" aria-live="polite">{st.msg}</p>
    </form>
  );
}
