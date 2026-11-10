import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  );
}
