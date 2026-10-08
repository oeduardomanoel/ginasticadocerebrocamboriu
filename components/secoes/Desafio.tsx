import { Stroop } from "../Stroop";

export function Desafio() {
  return (
    <section id="desafio" className="secao desafio" aria-labelledby="desafio-titulo">
      <div className="wrap desafio-grid">
        <div>
          <span className="etiqueta" data-reveal>
            Desafio rápido
          </span>
          <h2 id="desafio-titulo" className="titulo" data-split>
            Teste sua atenção em <em>30 segundos.</em>
          </h2>
          <p className="lead suave" data-reveal style={{ marginTop: 24 }}>
            Clique na cor da tinta, não na palavra escrita. Parece fácil até o cérebro precisar frear a leitura
            automática. Esse conflito se chama efeito Stroop e mede atenção seletiva e controle inibitório.
          </p>
          <p className="suave" data-reveal style={{ marginTop: 18, fontSize: 15 }}>
            No computador, use as teclas 1, 2, 3 e 4.
          </p>
        </div>
        <div data-reveal>
          <Stroop />
        </div>
      </div>
    </section>
  );
}
