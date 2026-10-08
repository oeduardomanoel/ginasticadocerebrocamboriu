import { numeros } from "@/lib/site";
import { IconeGrafico, IconeMetodo, IconeRede, IconeSala } from "../Icones";

export function Diferenciais() {
  return (
    <>
      <section className="secao" aria-labelledby="dif-titulo">
        <div className="wrap">
          <span className="etiqueta" data-reveal>
            Diferenciais
          </span>
          <h2 id="dif-titulo" className="titulo" data-split style={{ maxWidth: "18ch" }}>
            Um sistema completo, não exercícios <em>soltos.</em>
          </h2>

          <div className="bento">
            <article className="bloco b-a" data-reveal>
              <div className="icone">
                <IconeRede />
              </div>
              <h3>Neuroplasticidade direcionada</h3>
              <p className="suave">
                Estimulamos conexões neurais específicas para a necessidade de cada aluno, com base nas descobertas mais
                recentes da neurociência.
              </p>
            </article>
            <article className="bloco bloco-oito b-b" data-reveal data-delay="0.08">
              <span className="gigante" aria-hidden="true">
                8
              </span>
              <div className="bolinhas-turma" aria-hidden="true">
                {Array.from({ length: 8 }, (_, i) => (
                  <i key={i} />
                ))}
              </div>
              <h3>No máximo 8 alunos por sala</h3>
              <p className="suave">Atenção individualizada de verdade. O professor acompanha cada aluno de perto, aula após aula.</p>
            </article>
            <article className="bloco b-c" data-reveal>
              <div className="icone">
                <IconeMetodo />
              </div>
              <h3>Metodologia exclusiva</h3>
              <p className="suave">Técnicas combinadas e material próprio por faixa etária.</p>
            </article>
            <article className="bloco b-d" data-reveal data-delay="0.08">
              <div className="icone">
                <IconeGrafico />
              </div>
              <h3>Evolução mensurável</h3>
              <p className="suave">Avaliação cognitiva no início do curso mostra o cenário real e guia o acompanhamento.</p>
            </article>
            <article className="bloco b-e" data-reveal data-delay="0.16">
              <div className="icone">
                <IconeSala />
              </div>
              <h3>Salas humanizadas</h3>
              <p className="suave">Mesas que favorecem a interação e a socialização, em um clima acolhedor.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="escura" aria-label="Números da rede" style={{ paddingBlock: "clamp(64px, 8vw, 112px)" }}>
        <div className="wrap">
          <span className="etiqueta" data-reveal>
            A rede Ginástica do Cérebro
          </span>
          <div className="numeros" style={{ marginTop: 32 }}>
            {numeros.map((n) => (
              <div className="numero" key={n.rotulo} data-reveal>
                <b>
                  {n.prefixo && <em>{n.prefixo}</em>}
                  <span data-count={n.valor}>{n.valor}</span>
                  {n.sufixo}
                </b>
                <span className="rotulo">{n.rotulo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
