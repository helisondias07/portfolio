import { NextResponse } from "next/server";
import { resend, FROM, getIp, sha256 } from "@/lib/server/resend";
import { once, rateLimit } from "@/lib/server/kv";

export const runtime = "nodejs";

const BOT_RE =
  /bot|crawl|spider|slurp|bing|google|facebookexternalhit|whatsapp|telegram|discord|slack|twitter|linkedin|preview|headless|lighthouse|pagespeed|vercel|uptime|monitor|curl|wget|python|axios|node-fetch|go-http/i;

function dec(v: string | null): string | null {
  if (!v) return null;
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

const empty = () => new NextResponse(null, { status: 204 });

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  // Silently ignore bots, prefetches and empty UAs (204 so sendBeacon is happy).
  if (!ua || BOT_RE.test(ua) || req.headers.get("purpose") === "prefetch") return empty();

  const to = process.env.NOTIFY_EMAIL;
  if (!resend || !to) return empty(); // not configured: no-op

  const ipHash = await sha256(getIp(req) + (process.env.IP_SALT ?? ""));
  const day = new Date().toISOString().slice(0, 10);

  // Global cap so a flood can't burn the Resend quota, then one notification per IP per day.
  if (!(await rateLimit(`visit:global:${day}`, Number(process.env.VISIT_DAILY_CAP ?? 200), 86400))) return empty();
  if (!(await once(`visit:${day}:${ipHash}`, 86400))) return empty();

  const city = dec(req.headers.get("x-vercel-ip-city"));
  const region = req.headers.get("x-vercel-ip-country-region");
  const countryCode = req.headers.get("x-vercel-ip-country");
  let country = countryCode ?? "";
  try {
    if (countryCode) country = new Intl.DisplayNames(["pt-BR"], { type: "region" }).of(countryCode) ?? countryCode;
  } catch {}
  const where = [city, region && city ? null : region, country].filter(Boolean).join(", ") || "local desconhecido";

  let path = "/";
  let ref: string | null = null;
  try {
    ({ path = "/", ref = null } = await req.json());
  } catch {}

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject: "Você tem uma nova visita no seu portfólio",
      text:
        `Você tem uma nova visita no seu portfólio — alguém em ${where} acessou seu portfólio.\n\n` +
        `Página: ${path}\nOrigem: ${ref ?? "direto"}\nNavegador: ${ua.slice(0, 160)}\n` +
        `Horário: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
    });
    if (error) console.error("visit", error);
  } catch (e) {
    console.error("visit", e);
  }
  return empty();
}
