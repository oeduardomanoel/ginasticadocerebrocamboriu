const CASOS = [
  { quem: "Situação 01 · Escola", frase: "Meu filho precisava melhorar na escola." },
  { quem: "Situação 02 · Atenção", frase: "Precisamos de uma solução para o déficit de atenção do nosso filho." },
  { quem: "Situação 03 · Memória", frase: "A Maria estava esquecendo tudo e dizia que precisava de um remédio para memória." },
];

export function Manifesto() {
  return (
    <section className="secao" aria-labelledby="manifesto-titulo">
      <div className="wrap">
        <span className="etiqueta" data-reveal>
          Por que treinar o cérebro
        </span>
        <h2 id="manifesto-titulo" className="manifesto-texto" data-scrub-words>
          A escola ensina conteúdo. A gente treina o instrumento que aprende todos eles: <span className="destaque">o cérebro.</span>
        </h2>

        <div className="casos">
          {CASOS.map((c, i) => (
            <figure className="caso" key={c.frase} data-reveal data-delay={i * 0.1} style={{ margin: 0 }}>
              <span className="mono">{c.quem}</span>
              <p>“{c.frase}”</p>
            </figure>
          ))}
        </div>

        <div className="manifesto-fecho">
          <p className="lead suave" data-reveal>
            Nenhuma dessas situações é um desejo passageiro. São necessidades reais de desenvolvimento cognitivo, que
            mexem com o desempenho na escola e no trabalho, com a autonomia e com o bem-estar emocional.
          </p>
          <p className="lead suave" data-reveal data-delay="0.1">
            Na Ginástica do Cérebro, cada aula estimula habilidades cognitivas de forma prática, divertida e estratégica,
            respeitando o ritmo de cada pessoa.
          </p>
        </div>
      </div>
    </section>
  );
}
