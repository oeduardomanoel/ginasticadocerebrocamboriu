"use client";

import { useEffect, useRef } from "react";

type No = { x: number; y: number; vx: number; vy: number; r: number };
type Pulso = { a: number; b: number; t: number; v: number };

// Rede de neurônios desenhada em canvas: nós em deriva, sinapses por proximidade
// e impulsos laranja correndo entre eles. O mouse vira um neurônio a mais.
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nos: No[] = [];
    const pulsos: Pulso[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raio = 150;
    let visivel = true;
    let frame = 0;

    const montar = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const qtd = Math.round(Math.min(90, Math.max(28, (w * h) / 16000)));
      raio = w < 700 ? 110 : 150;
      nos = Array.from({ length: qtd }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.9,
      }));
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, w, h);
      const r2 = raio * raio;

      for (const n of nos) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 220 * 220) {
          n.x += dx * 0.004;
          n.y += dy * 0.004;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nos.length; i++) {
        const a = nos[i];
        for (let j = i + 1; j < nos.length; j++) {
          const b = nos[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2) {
            const alpha = (1 - d2 / r2) * 0.32;
            ctx.strokeStyle = `rgba(212,242,233,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (!reduz && pulsos.length < 14 && Math.random() < 0.0009) {
              pulsos.push({ a: i, b: j, t: 0, v: 0.012 + Math.random() * 0.02 });
            }
          }
        }
        const mx = a.x - mouse.x;
        const my = a.y - mouse.y;
        const md = mx * mx + my * my;
        if (md < 200 * 200) {
          ctx.strokeStyle = `rgba(254,131,64,${(1 - md / (200 * 200)) * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nos) {
        ctx.fillStyle = "rgba(212,242,233,0.75)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let k = pulsos.length - 1; k >= 0; k--) {
        const p = pulsos[k];
        p.t += p.v;
        const a = nos[p.a];
        const b = nos[p.b];
        if (p.t >= 1 || !a || !b) {
          pulsos.splice(k, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 10);
        g.addColorStop(0, "rgba(254,131,64,1)");
        g.addColorStop(1, "rgba(249,95,28,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visivel) desenhar();
      frame = requestAnimationFrame(loop);
    };

    montar();
    if (reduz) desenhar();
    else frame = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const io = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      montar();
      if (reduz) desenhar();
    });
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}
