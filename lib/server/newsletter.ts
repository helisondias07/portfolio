import type { Resend } from "resend";

/** Segment id for newsletter signups. RESEND_AUDIENCE_ID kept for backward compat. */
export const SEGMENT_ID = process.env.RESEND_SEGMENT_ID || process.env.RESEND_AUDIENCE_ID || "";

const isAlreadyExists = (m?: string) => /already exist/i.test(m ?? "");

/**
 * Upsert a contact and make sure it belongs to the newsletter segment.
 * Resend contacts are now global; segments replace audiences.
 */
export async function subscribeContact(resend: Resend, email: string, segmentId = SEGMENT_ID) {
  if (!segmentId) return { stored: false as const };

  const created = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });
  if (!created.error) return { stored: true as const, created: true };
  if (!isAlreadyExists(created.error.message)) throw created.error;

  // Existing contact: attach it to the segment (idempotent enough for our use).
  const added = await resend.contacts.segments.add({ email, segmentId });
  if (added.error && !isAlreadyExists(added.error.message)) throw added.error;
  return { stored: true as const, created: false };
}
