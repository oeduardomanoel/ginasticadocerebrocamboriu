"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { whatsLink } from "@/lib/site";

const CORES = [
  { nome: "LARANJA", cor: "#FE8340" },
  { nome: "VERDE", cor: "#3DDC97" },
  { nome: "AZUL", cor: "#5B9BFF" },
  { nome: "ROXO", cor: "#B48CFF" },
];
const RODADAS = 12;

type Rodada = { palavra: number; tinta: number };
type Estado = "inicio" | "jogando" | "fim";

function sortear(): Rodada {
  const palavra = Math.floor(Math.random() * CORES.length);
  let tinta = palavra;
  // 80% das vezes a palavra e a tinta entram em conflito
  if (Math.random() < 0.8) {
    while (tinta === palavra) tinta = Math.floor(Math.random() * CORES.length);
  }
  return { palavra, tinta };
}

// Teste de Stroop: medir atenção seletiva e controle inibitório em 30 segundos.
export function Stroop() {
  const [estado, setEstado] = useState<Estado>("inicio");
  const [rodada, setRodada] = useState<Rodada>({ palavra: 0, tinta: 1 });
  const [n, setN] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [tempos, setTempos] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<"" | "ok" | "erro">("");
  const inicio = useRef(0);

  const comecar = () => {
    setN(0);
    setAcertos(0);
    setTempos([]);
    setRodada(sortear());
    setEstado("jogando");
    inicio.current = performance.now();
  };

  const responder = useCallback(
    (i: number) => {
      if (estado !== "jogando") return;
      const t = performance.now() - inicio.current;
      const certo = i === rodada.tinta;
      setFeedback(certo ? "ok" : "erro");
      setTimeout(() => setFeedback(""), 350);
      if (certo) setAcertos((a) => a + 1);
      setTempos((ts) => [...ts, t]);
      if (n + 1 >= RODADAS) {
        setEstado("fim");
        return;
      }
      setN(n + 1);
      setRodada(sortear());
      inicio.current = performance.now();
    },
    [estado, rodada, n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      const k = Number(e.key);
      if (k >= 1 && k <= CORES.length) responder(k - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [responder]);

  const media = tempos.length ? Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length) : 0;
  const mensagem =
    acertos >= 11
      ? "Atenção afiada. Mesmo assim, repara como algumas respostas demoraram mais quando a palavra brigava com a cor? É esse conflito que o treino cognitivo ensina o cérebro a resolver mais rápido."
      : acertos >= 8
        ? "Bom resultado. Os erros aparecem justamente quando o automático da leitura atropela a atenção. Treinar controle inibitório faz parte de cada aula."
        : "O cérebro leu antes de enxergar a cor, e isso é normal. A boa notícia: atenção e controle inibitório são habilidades treináveis, como um músculo.";

  return (
    <div className="stroop">
      <div className="stroop-topo">
        <span>Teste de Stroop</span>
        <span>
          {estado === "jogando" ? `${String(n + 1).padStart(2, "0")} / ${RODADAS}` : estado === "fim" ? "Resultado" : "30 segundos"}
        </span>
      </div>
      <div className="stroop-barra" aria-hidden="true">
        <i style={{ width: `${estado === "fim" ? 100 : (n / RODADAS) * 100}%` }} />
      </div>

      {estado === "inicio" && (
        <>
          <div className="stroop-palco">
            <div>
              <div className="stroop-palavra" style={{ color: CORES[2].cor }}>
                VERDE
              </div>
              <p className="mono" style={{ marginTop: 22, fontSize: 13, color: "rgba(212,242,233,.7)" }}>
                Qual é a cor da tinta? Resposta: azul.
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-laranja" onClick={comecar} style={{ width: "100%" }}>
            Começar o desafio
            <span className="seta" aria-hidden="true">
              →
            </span>
          </button>
        </>
      )}

      {estado === "jogando" && (
        <>
          <div className={`stroop-palco ${feedback ? `stroop-feedback-${feedback}` : ""}`} aria-live="polite">
            <div
              key={n}
              className="stroop-palavra"
              style={{ color: CORES[rodada.tinta].cor }}
            >
              {CORES[rodada.palavra].nome}
            </div>
          </div>
          <div className="stroop-opcoes">
            {CORES.map((c, i) => (
              <button key={c.nome} type="button" onClick={() => responder(i)}>
                <span className="bolinha" style={{ background: c.cor }} aria-hidden="true" />
                {c.nome.charAt(0) + c.nome.slice(1).toLowerCase()}
                <kbd>{i + 1}</kbd>
              </button>
            ))}
          </div>
        </>
      )}

      {estado === "fim" && (
        <div className="stroop-palco">
          <div className="stroop-resultado">
            <div className="metrica">
              <b>
                {acertos}/{RODADAS}
              </b>
              <span>Acertos</span>
            </div>
            <div className="metrica">
              <b>{(media / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}s</b>
              <span>Tempo médio</span>
            </div>
            <p>{mensagem}</p>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                className="btn btn-laranja"
                href={whatsLink(
                  `Olá! Fiz o teste de atenção no site (${acertos}/${RODADAS} acertos) e quero agendar uma aula experimental gratuita.`,
                )}
                target="_blank"
                rel="noopener"
              >
                Quero treinar de verdade
                <span className="seta" aria-hidden="true">
                  →
                </span>
              </a>
              <button type="button" className="btn btn-contorno" onClick={comecar}>
                Jogar de novo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
