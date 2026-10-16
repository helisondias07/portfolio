import { NextResponse } from "next/server";
import { resend, FROM, getIp, sha256 } from "@/lib/server/resend";
import { rateLimit } from "@/lib/server/kv";

export const runtime = "nodejs";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string; company?: string };
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
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      // Store the contact in a Resend Audience (dedupes by email).
      const { error } = await resend.contacts.create({ audienceId, email, unsubscribed: false });
      if (error && !/already exists/i.test(error.message)) throw error;
    } else {
      console.warn("newsletter: RESEND_AUDIENCE_ID not set, contact not stored");
    }

    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Inscrição confirmada — Helison Dias",
      html: `<p>Oi! Obrigado por se inscrever.</p><p>Vou mandar novidades sobre projetos e o que ando construindo, sem spam.</p><p>— Helison</p>`,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("newsletter", e);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
