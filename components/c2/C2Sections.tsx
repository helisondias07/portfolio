"use client";
import { Fragment, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { dict, type Segment } from "@/lib/i18n/dict";
import { getLang, subscribe } from "@/lib/i18n/store";
import { FEATURED_ORDER, railItems } from "@/lib/projects/rail";
import Tx from "../Tx";
import { startC2 } from "./motion";
import "./c2.css";

type Shot = { src: string; alt: [string, string]; m?: boolean };
type Feature = {
  id: string; world: string; title: React.ReactNode; meta: [string, string]; desc: [string, string];
  stack: string; links: { href: string; pt: string; en: string }[]; shots: Shot[]; note?: [string, string];
};

const FEATURED_BY_ID: Record<(typeof FEATURED_ORDER)[number], Feature> = {
  shopmind: {
    id: "shopmind", world: "w-shop", title: "ShopMind",
    meta: ["Projeto autoral · agente de atendimento para e-commerce", "Personal project · e-commerce support agent"],
    desc: [
      "Agente de atendimento da Lume, loja fictícia de mesa e casa. O cliente pergunta preço, estoque, pedido ou frete e o balcão responde só com o que a base confirma, citando a fonte.",
      "Support agent for Lume, a fictional home-goods shop. The customer asks about price, stock, an order or shipping, and the counter answers only with what the data confirms, citing the source.",
    ],
    stack: "Python · LangGraph · LangChain · RAG · FastAPI · Next.js",
    links: [
      { href: "https://shopmind-agent.vercel.app", pt: "Abrir demo ↗", en: "Open demo ↗" },
      { href: "https://github.com/helisondias07/shopmind-agent", pt: "Código ↗", en: "Code ↗" },
      { href: "/projetos/shopmind", pt: "Ver case", en: "View case" },
    ],
    shots: [
      { src: "/c2/shopmind-1.jpg", alt: ["ShopMind, vitrine da Lume", "ShopMind, the Lume showroom"] },
      { src: "/c2/shopmind-m.jpg", alt: ["ShopMind no celular", "ShopMind on a phone"], m: true },
      { src: "/c2/showroom-handoff.png", alt: ["ShopMind, handoff para atendente", "ShopMind, handoff to an agent"] },
    ],
  },
  sneakers: {
    id: "sneakers", world: "w-sneak", title: <>Sneakers<br /> New</>,
    meta: ["Agência Oásis · storefront de tênis na Wake", "Agência Oásis · sneaker storefront on Wake"],
    desc: [
      "Desenvolvimento frontend do storefront da Sneakers New, loja de tênis no ar em sneakersnew.com.br: layout mobile-first, fluxos de checkout e de endereço, e correções que saem dos cenários de QA.",
      "Frontend work on the Sneakers New storefront, live at sneakersnew.com.br: mobile-first layout, checkout and address flows, and fixes that come out of QA scenarios.",
    ],
    stack: "HTML5 · CSS3 · JavaScript · Wake Platform",
    links: [
      { href: "https://sneakersnew.com.br/", pt: "Visitar site ↗", en: "Visit site ↗" },
      { href: "/projetos/sneakers", pt: "Ver case", en: "View case" },
    ],
    shots: [
      { src: "/c2/sneakers-home.jpg", alt: ["Sneakers New, home", "Sneakers New, home"] },
      { src: "/c2/sneakers-m.jpg", alt: ["Sneakers New no celular", "Sneakers New on a phone"], m: true },
      { src: "/c2/sneakers-home2.jpg", alt: ["Sneakers New, vitrine", "Sneakers New, storefront"] },
      { src: "/c2/sneakers-home3.jpg", alt: ["Sneakers New, categorias", "Sneakers New, categories"] },
    ],
  },
  supfy: {
    id: "supfy", world: "w-supfy", title: "Supfy",
    meta: ["Projeto autoral · pedidos estruturados com n8n", "Personal project · structured orders with n8n"],
    desc: [
      "MVP que transforma pedidos em texto livre, no estilo WhatsApp, em pedidos estruturados e validados contra um catálogo central. Preço e estoque são decididos pela aplicação, sem LLM.",
      "An MVP that turns free-text, WhatsApp-style requests into structured orders validated against a central catalog. Price and stock are decided by the application, without an LLM.",
    ],
    stack: "Next.js · React · TypeScript · n8n · Vitest",
    links: [
      { href: "https://supfy-mvp.vercel.app", pt: "Abrir demo ↗", en: "Open demo ↗" },
      { href: "https://github.com/helisondias07/supfy-mvp", pt: "Código ↗", en: "Code ↗" },
    ],
    shots: [
      { src: "/thumbnails/supfy-screenshot-card.webp", alt: ["Supfy, demonstração", "Supfy, demo"] },
      { src: "/thumbnails/supfy-screenshot-mobile.webp", alt: ["Supfy no celular", "Supfy on a phone"], m: true },
      { src: "/c2/supfy-catalog.png", alt: ["Supfy, catálogo central de produtos", "Supfy, central product catalog"] },
    ],
  },
};

const FEATURED = FEATURED_ORDER.map((id) => FEATURED_BY_ID[id]);

const OTHERS = railItems();

const words = (t: string) =>
  t.split(/\s+/).filter(Boolean).map((w, i) => <span key={i} className="w">{w}</span>)
    .reduce<React.ReactNode[]>((a, w, i) => (i ? [...a, " ", w] : [w]), []);

function Bio({ segments, cls }: { segments: readonly Segment[]; cls: string }) {
  return (
    <p className={`c2-bio ${cls}`} data-ink>
      {segments.map(([t, em], i) => (
        <Fragment key={i}>
          {i > 0 && !t.startsWith(".") ? " " : ""}
          {em ? <em>{words(t)}</em> : words(t)}
        </Fragment>
      ))}
    </p>
  );
}

function Head({ k, pt, en, id }: { k: [string, string]; pt: string; en: string; id?: string }) {
  return (
    <div className="c2-head">
      <span className="mo abk" data-rise><Tx pt={k[0]} en={k[1]} /></span>
      <h2 className="c2-h2" id={id} data-lines><Tx pt={pt} en={en} /></h2>
    </div>
  );
}

function applyAlts() {
  const en = getLang() === "en";
  document.querySelectorAll<HTMLImageElement>("[data-alt-pt]").forEach((img) => {
    img.alt = (en ? img.dataset.altEn : img.dataset.altPt) || "";
  });
}

export default function C2Sections() {
  useLayoutEffect(() => {
    applyAlts();
    return subscribe(applyAlts);
  }, []);
  useEffect(() => {
    applyAlts();
    return startC2();
  }, []);
  return (
    <div className="c2">
      <section id="sobre" className="c2-sec c2-about">
        <div className="c2-wrap">
          <span className="mo abk" data-rise><Tx pt="Sobre" en="About" /></span>
          <Bio segments={dict.pt.about.bio} cls="i18n-pt" />
          <Bio segments={dict.en.about.bio} cls="i18n-en" />
          <dl className="c2-facts" data-stagger>
            <div><dt><Tx pt="Hoje" en="Now" /></dt><dd><Tx pt="Dev Frontend Júnior na Agência Oásis, desde jan 2025" en="Junior Frontend Developer at Agência Oásis, since Jan 2025" /></dd></div>
            <div><dt>Stack</dt><dd>React, Next.js, Vue.js, TypeScript, Python, LangGraph</dd></div>
            <div><dt><Tx pt="Plataformas" en="Platforms" /></dt><dd>Wake, Nuvemshop, REST</dd></div>
            <div><dt><Tx pt="Formação" en="Education" /></dt><dd><Tx pt="Ciência da Computação, Estácio (EAD, cursando) · Inglês C1" en="Computer Science, Estácio (online, in progress) · English C1" /></dd></div>
          </dl>
        </div>
      </section>

      <section id="projetos" className="c2-sec c2-work">
        <div className="c2-wrap"><Head k={["Projetos", "Work"]} pt="Em destaque" en="Featured" /></div>
        {FEATURED.map((f, n) => (
          <article key={f.id} id={`p-${f.id}`} className={`c2-ch ${f.world}`} data-sheet>
            <div className="c2-wrap c2-ch-top">
              <div className="c2-ch-id">
                <span className="c2-n" data-rise>{String(n + 1).padStart(2, "0")} / {String(FEATURED.length).padStart(2, "0")}</span>
                <h3 className="c2-t" data-lines>{f.title}</h3>
              </div>
              <div className="c2-ch-info" data-stagger>
                <p className="c2-meta"><Tx pt={f.meta[0]} en={f.meta[1]} /></p>
                <p className="c2-desc"><Tx pt={f.desc[0]} en={f.desc[1]} /></p>
                <p className="c2-stack">{f.stack}</p>
                <p className="c2-links">{f.links.map((l) => (
                  <a key={l.href} href={l.href} {...(l.href.startsWith("/") ? {} : { target: "_blank", rel: "noopener" })}>
                    <Tx pt={l.pt} en={l.en} />
                  </a>
                ))}</p>
              </div>
            </div>
            <div className="c2-strip" data-strip data-gallery={f.id} role="region" aria-label={`${f.id} project gallery`}>
              <div className="c2-strip-in">
                {f.shots.map((s, i) => (
                  <figure key={s.src} className={s.m ? "m" : ""}>
                    <Image src={s.src} alt={s.alt[0]} data-alt-pt={s.alt[0]} data-alt-en={s.alt[1]} width={s.m ? 390 : 1440} height={s.m ? 844 : 900} sizes={s.m ? "390px" : "(max-width: 900px) 88vw, 70vw"} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
                  </figure>
                ))}
                {f.note && <figure className="note"><p><Tx pt={f.note[0]} en={f.note[1]} /></p></figure>}
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="c2-sec c2-more" aria-labelledby="c2-more-h" data-rail>
        <div className="c2-rail-pin">
          <div className="c2-wrap c2-more-head">
            <Head k={["Mais trabalho", "More work"]} pt="Outros projetos" en="Other projects" id="c2-more-h" />
            <p className="c2-count mo"><b data-count>01</b> / {String(OTHERS.length).padStart(2, "0")}</p>
          </div>
          <div className="c2-rail" data-rail-track>
            {OTHERS.map((o) => (
              <a key={o.id} className="c2-card" href={o.href} target="_blank" rel="noopener">
                <span className="c2-card-img">
                  <Image src={`/thumbnails/${o.img}`} alt={o.name} data-alt-pt={o.name} data-alt-en={o.nameEn} width={640} height={480} sizes="(max-width: 900px) 80vw, 320px" loading="lazy" />
                </span>
                <strong><Tx pt={o.name} en={o.nameEn} /></strong>
                <span><Tx pt={o.kind[0]} en={o.kind[1]} /></span>
              </a>
            ))}
          </div>
          <div className="c2-wrap"><div className="c2-progress"><i data-progress /></div></div>
        </div>
      </section>

      <section id="experiencia" className="c2-sec c2-exp">
        <div className="c2-wrap">
          <Head k={["Trajetória", "Background"]} pt="Experiência" en="Experience" />
          <div className="c2-exp-grid">
            <ol className="c2-tl" data-tl>
              <li className="now" data-rise>
                <span className="c2-when">jan 2025 – <Tx pt="atual" en="present" /></span>
                <h3><Tx pt="Desenvolvedor Frontend Júnior" en="Junior Frontend Developer" /></h3>
                <p className="c2-org">Grupo Oásis (Agência Oásis) · <Tx pt="remoto" en="remote" /></p>
                <ul>
                  <li><Tx pt="Storefronts em React, Next.js, Vue.js e TypeScript na Wake Platform para marcas como King Imports, Venari, Fit Urban e ViaVeneto." en="Storefronts in React, Next.js, Vue.js and TypeScript on the Wake Platform for brands like King Imports, Venari, Fit Urban and ViaVeneto." /></li>
                  <li><Tx pt="Tema da Yamuna (Go Template) na migração da loja de Wake para Nuvemshop." en="Yamuna theme (Go Template) in the store's migration from Wake to Nuvemshop." /></li>
                  <li><Tx pt="Chatbots de atendimento no WhatsApp com LLM, n8n e a API oficial do WhatsApp Business, com transferência para atendente humano." en="WhatsApp support chatbots with an LLM, n8n and the official WhatsApp Business API, with handoff to a human agent." /></li>
                </ul>
              </li>
              <li data-rise>
                <span className="c2-when">abr 2024 – jan 2025</span>
                <h3><Tx pt="Estagiário de Desenvolvimento Frontend" en="Frontend Development Intern" /></h3>
                <p className="c2-org">Grupo Oásis (Agência Oásis)</p>
                <ul><li><Tx pt="Componentes reutilizáveis e correções em produção em lojas React/JavaScript na Wake, junto a desenvolvedores seniores." en="Reusable components and production fixes on React/JavaScript stores on Wake, alongside senior developers." /></li></ul>
              </li>
              <li data-rise>
                <span className="c2-when">out 2023 – abr 2024</span>
                <h3><Tx pt="Desenvolvedor Web Freelancer" en="Freelance Web Developer" /></h3>
                <p className="c2-org"><Tx pt="Projetos independentes" en="Independent projects" /></p>
                <ul><li><Tx pt="Sites e projetos web com HTML, CSS, JavaScript e React." en="Websites and web projects with HTML, CSS, JavaScript and React." /></li></ul>
              </li>
            </ol>
            <aside className="c2-side" data-stagger>
              <div><h3><Tx pt="Ciência da Computação" en="Computer Science" /></h3><p><Tx pt="Estácio, EAD · ago 2023 – dez 2027 (previsão)" en="Estácio, online · Aug 2023 – Dec 2027 (expected)" /></p></div>
              <div><h3><Tx pt="Inglês C1" en="English C1" /></h3><p><Tx pt="Português nativo" en="Native Portuguese" /></p></div>
              <div><h3><Tx pt="Certificações" en="Certifications" /></h3><p>Wake Técnico e Wake Learning (Wake, 2025) · Fundamentos do React (Rocketseat, 2024)</p></div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
