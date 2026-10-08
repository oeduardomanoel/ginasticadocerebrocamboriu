import { FormWhats } from "../FormWhats";

export function Contato() {
  return (
    <section id="contato" className="secao contato" aria-labelledby="contato-titulo">
      <div className="wrap contato-grid">
        <div>
          <span className="etiqueta" data-reveal>
            Aula experimental gratuita
          </span>
          <h2 id="contato-titulo" className="titulo" data-split>
            Seu cérebro merece esse treino.
          </h2>
          <p className="lead" data-reveal>
            Conte rapidinho para quem é a aula e o melhor período. A gente responde pelo WhatsApp e reserva seu horário
            na unidade Camboriú.
          </p>
        </div>
        <FormWhats />
      </div>
    </section>
  );
}
