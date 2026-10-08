"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SORRISO = "M70 250 Q133 274 196 250";
const SORRISAO = "M64 244 Q133 296 202 244";

// O símbolo oficial GC ganha vida: os ovais viram olhos, as letras acompanham o cursor,
// ele pisca de tempos em tempos e abre um sorriso maior quando você passa no botão de agendar.
export function Mascote() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduz) return;

    const olhos = svg.querySelectorAll<SVGGElement>("[data-olho]");
    const letras = svg.querySelectorAll<SVGPathElement>("[data-letra]");
    const sorriso = svg.querySelector<SVGPathElement>("[data-sorriso]")!;
    let piscada: gsap.core.Tween | gsap.core.Timeline | undefined;
    let timer: ReturnType<typeof setTimeout>;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.35 });
      tl.from(olhos, {
        scale: 0,
        transformOrigin: "50% 100%",
        duration: 1.4,
        ease: "elastic.out(1, 0.55)",
        stagger: 0.12,
      });
      letras.forEach((l) => {
        const len = l.getTotalLength();
        gsap.set(l, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(letras, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.15 }, 0.55);
      const lenS = sorriso.getTotalLength();
      gsap.set(sorriso, { strokeDasharray: lenS + 40, strokeDashoffset: lenS + 40 });
      tl.to(sorriso, { strokeDashoffset: 0, duration: 0.9, ease: "power3.out" }, 1.1);

      // flutuação suave
      gsap.to(svg, { y: -12, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, svg);

    const piscar = () => {
      piscada = gsap
        .timeline()
        .to(olhos, { scaleY: 0.08, transformOrigin: "50% 50%", duration: 0.09, ease: "power2.in" })
        .to(olhos, { scaleY: 1, duration: 0.22, ease: "power2.out" });
      timer = setTimeout(piscar, 2600 + Math.random() * 3200);
    };
    timer = setTimeout(piscar, 3200);

    const xTo = Array.from(letras).map((l) => gsap.quickTo(l, "x", { duration: 0.6, ease: "power3.out" }));
    const yTo = Array.from(letras).map((l) => gsap.quickTo(l, "y", { duration: 0.6, ease: "power3.out" }));
    const onMove = (e: PointerEvent) => {
      const r = svg.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.43;
      const dx = gsap.utils.clamp(-1, 1, (e.clientX - cx) / (window.innerWidth / 2));
      const dy = gsap.utils.clamp(-1, 1, (e.clientY - cy) / (window.innerHeight / 2));
      xTo.forEach((f) => f(dx * 14));
      yTo.forEach((f) => f(dy * 26));
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ctas = document.querySelectorAll<HTMLElement>("[data-sorrir]");
    const abrir = () => gsap.to(sorriso, { attr: { d: SORRISAO }, duration: 0.5, ease: "back.out(2.4)" });
    const fechar = () => gsap.to(sorriso, { attr: { d: SORRISO }, duration: 0.5, ease: "power3.out" });
    ctas.forEach((c) => {
      c.addEventListener("pointerenter", abrir);
      c.addEventListener("pointerleave", fechar);
    });

    return () => {
      clearTimeout(timer);
      piscada?.kill();
      window.removeEventListener("pointermove", onMove);
      ctas.forEach((c) => {
        c.removeEventListener("pointerenter", abrir);
        c.removeEventListener("pointerleave", fechar);
      });
      ctx.revert();
    };
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 244 280" fill="none" role="img" aria-label="Símbolo da Ginástica do Cérebro">
      <defs>
        <linearGradient id="mascote-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FE8340" />
          <stop offset="1" stopColor="#F95F1C" />
        </linearGradient>
        <clipPath id="clip-olho-e">
          <ellipse cx="70" cy="120" rx="53" ry="105" />
        </clipPath>
        <clipPath id="clip-olho-d">
          <ellipse cx="174" cy="120" rx="53" ry="105" />
        </clipPath>
      </defs>
      <g data-olho style={{ transformBox: "fill-box" }}>
        <ellipse cx="70" cy="120" rx="53" ry="105" fill="url(#mascote-g)" />
        <g clipPath="url(#clip-olho-e)">
          <path
            data-letra
            d="M88 84 A27 51 0 1 0 96 152 V131 H76"
            stroke="#fff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <g data-olho style={{ transformBox: "fill-box" }}>
        <ellipse cx="174" cy="120" rx="53" ry="105" fill="url(#mascote-g)" />
        <g clipPath="url(#clip-olho-d)">
          <path
            data-letra
            d="M201 86 A27 51 0 1 0 201 156"
            stroke="#fff"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <path data-sorriso d={SORRISO} stroke="#F96A2A" strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}
