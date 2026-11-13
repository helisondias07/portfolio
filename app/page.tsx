import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import C2Sections from "@/components/c2/C2Sections";
import Footer from "@/components/Footer";

/* Preview opção C2: hero e footer atuais, seções novas no meio. */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <C2Sections />
      </main>
      <Footer />
    </>
  );
}
