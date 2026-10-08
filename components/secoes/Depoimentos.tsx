import { Estrela } from "../Icones";

const DEPOIMENTOS = [
  {
    nome: "Carla Mendes",
    quem: "Mãe do Miguel, 9 anos",
    texto:
      "Meu filho é super curioso e inquieto, e eu buscava algo que canalizasse essa energia de forma produtiva. A GC foi perfeita! Ele se diverte enquanto treina o cérebro e, o melhor de tudo, está lendo melhor, mais concentrado e com raciocínio mais rápido.",
  },
  {
    nome: "Wanderley Pekin",
    quem: "Aluno, 75 anos",
    texto:
      "As práticas da GC estão sendo uma oportunidade de me tornar mais alerta e objetivo nas tarefas do cotidiano, deixando o raciocínio mais rápido e atento. Tenho aproveitado esses exercícios para deixar meu dia a dia mais fluido.",
  },
  {
    nome: "Rodrigo Silva",
    quem: "Pai do Lucas, 11 anos",
    texto:
      "O Lucas é autista e sempre teve dificuldade com atenção, organização e interações sociais. Quando conhecemos a Ginástica do Cérebro, confesso que fiquei receoso se ele iria se adaptar. Mas foi surpreendente.",
  },
  {
    nome: "Patrícia Ruic",
    quem: "Aluna, 70 anos",
    texto:
      "Estou na Ginástica do Cérebro há muito tempo, desde antes da pandemia. Pausei, voltei e não fico sem. Tem me feito muito bem, estar aqui exercitando meu cérebro me anima. Encontro as amigas e damos muitas risadas.",
  },
];

export function Depoimentos() {
  return (
    <section className="secao escura" aria-labelledby="depo-titulo">
      <div className="wrap">
        <span className="etiqueta" data-reveal>
          Depoimentos
        </span>
        <h2 id="depo-titulo" className="titulo" data-split style={{ maxWidth: "16ch" }}>
          Quem treina sente no <em>dia a dia.</em>
        </h2>

        <div className="depoimentos">
          {DEPOIMENTOS.map((d, i) => (
            <figure className="depo" key={d.nome} data-reveal data-delay={(i % 2) * 0.1} style={{ margin: 0 }}>
              <div className="estrelas" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }, (_, k) => (
                  <Estrela key={k} />
                ))}
              </div>
              <blockquote>{d.texto}</blockquote>
              <footer>
                <span className="avatar" aria-hidden="true">
                  {d.nome.charAt(0)}
                </span>
                <figcaption>
                  <b>{d.nome}</b>
                  <span>{d.quem}</span>
                </figcaption>
              </footer>
            </figure>
          ))}
        </div>
        <p className="nota-rede">Depoimentos de alunos e famílias da rede Ginástica do Cérebro.</p>
      </div>
    </section>
  );
}
