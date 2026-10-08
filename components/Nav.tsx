"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { whatsLink } from "@/lib/site";

const LINKS = [
  { href: "#metodo", rotulo: "Método" },
  { href: "#para-quem", rotulo: "Para quem" },
  { href: "#desafio", rotulo: "Desafio" },
  { href: "#unidade", rotulo: "Unidade" },
  { href: "#duvidas", rotulo: "Dúvidas" },
];

export function Nav() {
  const [oculta, setOculta] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    let ultimo = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setOculta(y > 240 && y > ultimo);
      ultimo = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = aberto ? "hidden" : "";
    if (aberto) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [aberto]);

  return (
    <>
      <header className={`nav ${oculta && !aberto ? "oculta" : ""}`}>
        <div className="wrap">
          <div className="nav-barra">
            <a href="#inicio" className="nav-logo" aria-label="Ginástica do Cérebro Camboriú, início" onClick={() => setAberto(false)}>
              <Image src="/brand/logo-oficial.png" alt="Ginástica do Cérebro" width={1024} height={287} priority style={{ height: 36, width: "auto" }} />
            </a>
            <nav className="nav-links" aria-label="Principal">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.rotulo}
                </a>
              ))}
            </nav>
            <a className="btn btn-laranja" href={whatsLink()} target="_blank" rel="noopener" data-sorrir>
              Aula grátis
              <span className="seta" aria-hidden="true">
                →
              </span>
            </a>
            <button
              type="button"
              className="nav-menu-btn"
              aria-expanded={aberto}
              aria-controls="menu-movel"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              onClick={() => setAberto((a) => !a)}
            >
              <i>
                <span />
                <span />
              </i>
            </button>
          </div>
        </div>
      </header>

      <div id="menu-movel" className={`menu-movel ${aberto ? "aberto" : ""}`} aria-hidden={!aberto}>
        <nav aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setAberto(false)} tabIndex={aberto ? 0 : -1}>
              <span>0{i + 1}</span>
              {l.rotulo}
            </a>
          ))}
        </nav>
        <a className="btn btn-laranja" href={whatsLink()} target="_blank" rel="noopener" tabIndex={aberto ? 0 : -1}>
          Agendar aula grátis no WhatsApp
          <span className="seta" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </>
  );
}
