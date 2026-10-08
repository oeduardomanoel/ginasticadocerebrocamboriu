"use client";

import { useEffect, useRef, useState } from "react";

const HASTES = 7;
const ESP = 64; // distância entre hastes
const X0 = 46;
const LARG = X0 * 2 + ESP * (HASTES - 1);
const ALT = 330;
const BARRA_Y = 104; // viga central
const PASSO = 30; // altura de cada conta + respiro
const CONTA_A = 13; // meia altura da conta

// Posições (centro das contas) em cada estado
const sup = (ativa: boolean) => (ativa ? BARRA_Y - 8 - CONTA_A : 34);
const inf = (j: number, ativas: number) => {
  const base = BARRA_Y + 8 + CONTA_A + 4 + j * PASSO;
  return j < ativas ? base : base + 62;
};

const conta = (x: number) =>
  `M${x - 26} 0 L${x - 9} -${CONTA_A} L${x + 9} -${CONTA_A} L${x + 26} 0 L${x + 9} ${CONTA_A} L${x - 9} ${CONTA_A} Z`;

function paraDigitos(n: number) {
  const s = String(Math.max(0, Math.min(n, 10 ** HASTES - 1))).padStart(HASTES, "0");
  return s.split("").map(Number);
}

// Soroban de verdade: 1 conta vale 5 em cima, 4 contas valem 1 embaixo.
// Dá para jogar tocando nas contas, e ele também recebe valores do scroll (evento soroban:set).
export function Soroban() {
  const [digitos, setDigitos] = useState<number[]>(() => paraDigitos(0));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const valor = Number(digitos.join(""));

  useEffect(() => {
    const animarPara = (n: number) => {
      timers.current.forEach(clearTimeout);
      const alvo = paraDigitos(n);
      // anima da direita (unidades) para a esquerda, como no cálculo real
      for (let i = HASTES - 1; i >= 0; i--) {
        const t = setTimeout(
          () => setDigitos((d) => d.map((v, k) => (k === i ? alvo[i] : v))),
          (HASTES - 1 - i) * 90,
        );
        timers.current.push(t);
      }
    };
    const onSet = (e: Event) => animarPara((e as CustomEvent<number>).detail);
    window.addEventListener("soroban:set", onSet);
    return () => {
      window.removeEventListener("soroban:set", onSet);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const tocarSuperior = (i: number) =>
    setDigitos((d) => d.map((v, k) => (k === i ? (v >= 5 ? v - 5 : v + 5) : v)));

  const tocarInferior = (i: number, j: number) =>
    setDigitos((d) =>
      d.map((v, k) => {
        if (k !== i) return v;
        const cinco = v >= 5 ? 5 : 0;
        const ativas = v - cinco;
        return cinco + (j < ativas ? j : j + 1);
      }),
    );

  return (
    <div className="soroban">
      <div className="soroban-topo">
        <span>Soroban · ábaco japonês</span>
        <span>{HASTES} hastes</span>
      </div>
      <div className="soroban-valor" aria-live="polite">
        {valor.toLocaleString("pt-BR")}
      </div>
      <svg viewBox={`0 0 ${LARG} ${ALT}`} role="group" aria-label="Soroban interativo">
        <defs>
          <linearGradient id="conta-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FE8340" />
            <stop offset="1" stopColor="#F95F1C" />
          </linearGradient>
          <linearGradient id="conta-brilho" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="4" y="4" width={LARG - 8} height={ALT - 8} rx="18" fill="none" stroke="#1d4a35" strokeWidth="8" />
        {digitos.map((_, i) => (
          <line
            key={`h${i}`}
            x1={X0 + i * ESP}
            x2={X0 + i * ESP}
            y1="10"
            y2={ALT - 10}
            stroke="#2c5a45"
            strokeWidth="4"
          />
        ))}
        <rect x="8" y={BARRA_Y - 6} width={LARG - 16} height="12" rx="3" fill="#1d4a35" />
        {digitos.map((_, i) =>
          (HASTES - 1 - i) % 3 === 0 ? (
            <circle key={`p${i}`} cx={X0 + i * ESP} cy={BARRA_Y} r="3" fill="#d4f2e9" />
          ) : null,
        )}

        {digitos.map((d, i) => {
          const x = X0 + i * ESP;
          const cincoAtivo = d >= 5;
          const ativas = d % 5;
          return (
            <g key={`c${i}`}>
              <g
                className="conta"
                style={{ transform: `translateY(${sup(cincoAtivo)}px)` }}
                onClick={() => tocarSuperior(i)}
                role="button"
                tabIndex={0}
                aria-label={`Haste ${i + 1}, conta de cinco`}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tocarSuperior(i))}
              >
                <path d={conta(x)} fill="url(#conta-g)" stroke="#c94a12" strokeWidth="1" strokeLinejoin="round" />
                <path d={conta(x)} fill="url(#conta-brilho)" />
              </g>
              {[0, 1, 2, 3].map((j) => (
                <g
                  key={j}
                  className="conta"
                  style={{ transform: `translateY(${inf(j, ativas)}px)` }}
                  onClick={() => tocarInferior(i, j)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Haste ${i + 1}, conta ${j + 1} de um`}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), tocarInferior(i, j))}
                >
                  <path d={conta(x)} fill="url(#conta-g)" stroke="#c94a12" strokeWidth="1" strokeLinejoin="round" />
                  <path d={conta(x)} fill="url(#conta-brilho)" />
                </g>
              ))}
            </g>
          );
        })}
      </svg>
      <div className="soroban-rodape">
        <span>Toque nas contas e forme um número.</span>
        <button type="button" onClick={() => setDigitos(paraDigitos(0))}>
          Zerar
        </button>
      </div>
    </div>
  );
}
