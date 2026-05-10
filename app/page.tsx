import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Intro } from "@/components/sections/Intro";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Helison Dias",
  url: "https://helisondias.vercel.app",
  image: "https://helisondias.vercel.app/profile.jpg",
  jobTitle: "Fullstack Developer",
  email: "mailto:helisondias07@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nova Friburgo",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  sameAs: ["https://linkedin.com/in/helisondias"],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Wake Platform",
    "E-commerce",
    "AI-assisted development",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f2ee] text-[#191919] dark:bg-zinc-950 dark:text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <Intro />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
