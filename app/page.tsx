import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import C2Sections from "@/components/c2/C2Sections";
import { chapterFonts } from "@/components/c2/fonts";
import Footer from "@/components/Footer";

/* Hero and footer stay; the middle is the approved chapter layout. */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo" className={chapterFonts}>
        <Hero />
        <C2Sections />
      </main>
      <Footer />
    </>
  );
}
