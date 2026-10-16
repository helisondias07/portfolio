"use client";
import { useEffect } from "react";

/** Fires /api/visit once per browser session (the API dedupes per IP/day and ignores bots). */
export default function VisitBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("hv")) return;
      sessionStorage.setItem("hv", "1");
      const data = JSON.stringify({ path: location.pathname, ref: document.referrer || null });
      if (navigator.sendBeacon) navigator.sendBeacon("/api/visit", new Blob([data], { type: "application/json" }));
      else fetch("/api/visit", { method: "POST", body: data, keepalive: true, headers: { "content-type": "application/json" } });
    } catch {}
  }, []);
  return null;
}
