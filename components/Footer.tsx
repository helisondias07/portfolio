import Newsletter from "./Newsletter";
import PerfBadge from "./PerfBadge";

export default function Footer() {
  return (
    <footer className="ft2" id="contato">
      <div className="abw">
        <div className="ftop">
          <div>
            <span className="mo abk">Contato</span>
            <h2 className="fh">
              Vamos <span className="ser">conversar?</span>
            </h2>
            <p className="fp">Frontend Developer, e-commerce e automação com IA. Aberto a oportunidades remotas. Fale comigo por onde preferir.</p>
            <div className="btns">

              <a className="btn" href="mailto:helisondias07@gmail.com">E-mail</a>
              <a className="btn" href="https://www.linkedin.com/in/helisondias" target="_blank" rel="noopener">LinkedIn ↗</a>
              <a className="btn" href="https://github.com/helisondias07" target="_blank" rel="noopener">GitHub ↗</a>
              <a className="btn wa" href="https://wa.me/5522981040084" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="fside">
            <Newsletter />
            <a className="cvx" href="/cv/helison-dias-cv.pdf" download>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M12 11v6" />
                <path d="m9 14.5 3 3 3-3" />
              </svg>
              <span>Baixar CV <small>PDF</small></span>
            </a>
          </div>
        </div>
        <PerfBadge />
        <div className="fbot mo">
          <span>© 2026 Helison Dias</span>
          <span>Nova Friburgo, RJ</span>
        </div>
      </div>
    </footer>
  );
}
