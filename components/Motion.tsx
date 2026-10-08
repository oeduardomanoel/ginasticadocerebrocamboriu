"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __motionOk?: boolean;
    __lenis?: Lenis;
  }
}

// Orquestra todas as animações de scroll do site a partir de data-attributes,
// assim as seções continuam sendo componentes de servidor (HTML pronto para SEO).
export function Motion() {
  useEffect(() => {
    window.__motionOk = true;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    const raf = (t: number) => lenis?.raf(t * 1000);
    if (!reduz) {
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: -90 } });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const splits: SplitText[] = [];
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      if (reduz) {
        gsap.set("[data-reveal], .hero [data-hero]", { opacity: 1 });
        return;
      }

      // ---------- hero (entrada no carregamento) ----------
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });
      const tituloHero = document.querySelector<HTMLElement>("[data-hero-titulo]");
      if (tituloHero) {
        gsap.set(tituloHero, { opacity: 1 });
        const s = SplitText.create(tituloHero, { type: "lines,chars", mask: "lines" });
        splits.push(s);
        tl.from(s.chars, { yPercent: 120, rotate: 6, duration: 1.3, stagger: 0.022 }, 0);
      }
      tl.fromTo(
        ".hero [data-hero]:not([data-hero-titulo])",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 },
        0.45,
      );

      // ---------- revelações genéricas ----------
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // ---------- títulos linha a linha ----------
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const s = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.25,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            });
          },
        });
        splits.push(s);
      });

      // ---------- manifesto: palavras acendem com o scroll ----------
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const s = SplitText.create(el, { type: "words" });
        splits.push(s);
        gsap.fromTo(
          s.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });

      // ---------- contadores ----------
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const alvo = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: alvo,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("pt-BR");
          },
        });
      });

      // ---------- parallax de fotos ----------
      gsap.utils.toArray<HTMLElement>("[data-parallax-img]").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // ---------- faixa infinita que reage à velocidade do scroll ----------
      const trilho = document.querySelector<HTMLElement>("[data-marquee]");
      if (trilho) {
        const loop = gsap.to(trilho, { xPercent: -50, ease: "none", duration: 28, repeat: -1 });
        let direcao = 1;
        ScrollTrigger.create({
          onUpdate(self) {
            const v = self.getVelocity();
            if (self.direction !== direcao) direcao = self.direction;
            gsap.to(loop, {
              timeScale: direcao * Math.min(1 + Math.abs(v) / 350, 6),
              duration: 0.25,
              overwrite: true,
              onComplete: () => {
                gsap.to(loop, { timeScale: direcao, duration: 1.2 });
              },
            });
          },
        });
      }

      // ---------- método: ativa pilares e manda valores para o soroban ----------
      gsap.utils.toArray<HTMLElement>("[data-pilar]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 60%",
          end: "bottom 60%",
          onToggle(self) {
            el.classList.toggle("ativo", self.isActive);
            if (self.isActive) {
              window.dispatchEvent(new CustomEvent("soroban:set", { detail: Number(el.dataset.pilar) }));
            }
          },
        });
      });

      // ---------- rolagem horizontal dos públicos (desktop) ----------
      mm.add("(min-width: 900px)", () => {
        const sec = document.querySelector<HTMLElement>("[data-hscroll]");
        const track = sec?.querySelector<HTMLElement>("[data-hscroll-track]");
        if (!sec || !track) return;
        const distancia = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });

      // ---------- rodapé: marca gigante sobe ----------
      const marca = document.querySelector<HTMLElement>("[data-marca]");
      if (marca) {
        gsap.from(marca, {
          yPercent: 40,
          ease: "none",
          scrollTrigger: { trigger: marca, start: "top bottom", end: "bottom bottom", scrub: true },
        });
      }
    });

    // spotlight dos cards (segue o mouse)
    const spot = (e: PointerEvent) => {
      const alvo = (e.target as HTMLElement).closest<HTMLElement>(".bloco");
      if (!alvo) return;
      const r = alvo.getBoundingClientRect();
      alvo.style.setProperty("--mx", `${e.clientX - r.left}px`);
      alvo.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", spot, { passive: true });

    // recalcula posições depois que fontes e imagens carregam
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("pointermove", spot);
      window.removeEventListener("load", refresh);
      splits.forEach((s) => s.revert());
      mm.revert();
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
