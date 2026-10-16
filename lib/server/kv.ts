// Upstash Redis (Vercel Marketplace). Env: KV_REST_API_URL, KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL/TOKEN).
// Optional: when not configured, rate limiting and dedupe are skipped (fail open) instead of crashing.
import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
export const kv: Redis | null = url && token ? new Redis({ url, token }) : null;

/** True the first time `key` is seen within `ttlSec` (atomic SET NX). Without KV: always true. */
export async function once(key: string, ttlSec: number): Promise<boolean> {
  if (!kv) return true;
  try {
    return (await kv.set(key, 1, { nx: true, ex: ttlSec })) === "OK";
  } catch (e) {
    console.warn("kv.once failed", e);
    return true;
  }
}

/** Fixed-window rate limit. True if allowed. Without KV: always allowed. */
export async function rateLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  if (!kv) return true;
  try {
    const n = await kv.incr(key);
    if (n === 1) await kv.expire(key, windowSec);
    return n <= max;
  } catch (e) {
    console.warn("kv.rateLimit failed", e);
    return true;
  }
}
