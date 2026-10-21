import { NextResponse } from "next/server";
import { resend, FROM, getIp, sha256 } from "@/lib/server/resend";
import { rateLimit } from "@/lib/server/kv";
import { subscribeContact } from "@/lib/server/newsletter";
import type { Lang } from "@/lib/i18n/dict";

const MAIL: Record<Lang, { subject: string; html: string }> = {
  pt: {
    subject: "Inscrição confirmada — Helison Dias",
    html: "<p>Oi! Obrigado por se inscrever.</p><p>Vou mandar novidades sobre projetos e o que ando construindo, sem spam.</p><p>— Helison</p>",
  },
  en: {
    subject: "You're subscribed — Helison Dias",
    html: "<p>Hi! Thanks for subscribing.</p><p>I'll send updates on projects and what I'm building. No spam.</p><p>— Helison</p>",
  },
};

export const runtime = "nodejs";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string; company?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success.
  if (body.company) return NextResponse.json({ ok: true });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  if (!resend) {
    console.warn("newsletter: RESEND_API_KEY not set");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const ipHash = await sha256(getIp(req) + (process.env.IP_SALT ?? ""));
  if (!(await rateLimit(`nl:rl:${ipHash}`, 5, 3600))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    // Storing the contact must not block the confirmation (e.g. a send-only API key).
    try {
      const { stored } = await subscribeContact(resend, email);
      if (!stored) console.warn("newsletter: RESEND_SEGMENT_ID/RESEND_AUDIENCE_ID not set, contact not stored");
    } catch (e) {
      console.error("newsletter: failed to store contact in segment", e);
    }

    const mail = MAIL[body.lang === "en" ? "en" : "pt"];
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: mail.subject,
      html: mail.html,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("newsletter", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
