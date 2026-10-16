import { Resend } from "resend";

export const resend: Resend | null = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
/** Must be a sender on a domain verified in Resend. onboarding@resend.dev only delivers to the account owner. */
export const FROM = process.env.RESEND_FROM ?? "Helison Dias <onboarding@resend.dev>";

export function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "0.0.0.0").trim();
}

export async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
