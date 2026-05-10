import { Hero } from "@/components/sections/Hero";

export function Intro() {
  return (
    <section className="intro-bg relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,242,238,0.92)_0%,rgba(232,243,255,0.58)_52%,rgba(244,242,238,0.92)_100%)] dark:bg-[linear-gradient(135deg,rgba(9,9,11,0.92)_0%,rgba(10,102,194,0.22)_46%,rgba(9,9,11,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f4f2ee] dark:to-[#09090b]" />
      <div className="relative z-10">
        <Hero />
      </div>
    </section>
  );
}
