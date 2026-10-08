"use client";

import { useState } from "react";
import { whatsLink } from "@/lib/site";

const PARA_QUEM = ["Meu filho(a)", "Para mim", "Meus pais", "Outra pessoa"];
const PERIODOS = ["Manhã", "Tarde", "Sábado"];

// Formulário sem backend: monta a mensagem já qualificada e abre o WhatsApp da unidade.
export function FormWhats() {
  const [nome, setNome] = useState("");
  const [para, setPara] = useState(PARA_QUEM[0]);
  const [idade, setIdade] = useState("");
  const [periodo, setPeriodo] = useState(PERIODOS[0]);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const linhas = [
      "Olá! Quero agendar uma aula experimental gratuita na Ginástica do Cérebro Camboriú.",
      "",
      `Nome: ${nome.trim()}`,
      `A aula é para: ${para}`,
      idade.trim() ? `Idade do aluno: ${idade.trim()}` : "",
      `Melhor período: ${periodo}`,
    ].filter((l, i) => l !== "" || i === 1);
    window.open(whatsLink(linhas.join("\n")), "_blank", "noopener");
  };

  return (
    <form className="form" onSubmit={enviar} data-reveal>
      <h3>Agende sua aula experimental</h3>

      <label className="campo">
        <span>Seu nome</span>
        <input required value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" placeholder="Como podemos te chamar?" />
      </label>

      <fieldset className="campo">
        <legend>A aula é para</legend>
        <div className="chips">
          {PARA_QUEM.map((p) => (
            <label key={p}>
              <input type="radio" name="para" value={p} checked={para === p} onChange={() => setPara(p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="duas-col">
        <label className="campo">
          <span>Idade do aluno</span>
          <input inputMode="numeric" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Ex.: 9 anos" />
        </label>
        <fieldset className="campo">
          <legend>Melhor período</legend>
          <div className="chips">
            {PERIODOS.map((p) => (
              <label key={p}>
                <input type="radio" name="periodo" value={p} checked={periodo === p} onChange={() => setPeriodo(p)} />
                <span>{p}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button type="submit" className="btn btn-verde" data-sorrir>
        Enviar pelo WhatsApp
        <span className="seta" aria-hidden="true">
          →
        </span>
      </button>
      <small>Você será direcionado para o WhatsApp da unidade com a mensagem pronta.</small>
    </form>
  );
}
