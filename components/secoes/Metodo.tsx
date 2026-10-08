import { fotos } from "@/lib/site";
import { Foto } from "../Foto";
import { Soroban } from "../Soroban";

const PILARES = [
  {
    titulo: "Soroban, o ábaco japonês",
    texto:
      "Desenvolve foco, planejamento, cálculo mental e coordenação motora, ativando as funções executivas superiores. Cada movimento das contas é uma decisão do cérebro.",
    foto: fotos.soroban,
    valor: 2026,
  },
  {
    titulo: "Apostilas com progressão cognitiva",
    texto:
      "Material estruturado que estimula linguagem, memória, lógica e percepção, com níveis diferentes para crianças, jovens, adultos e idosos.",
    foto: fotos.apostilas,
    valor: 15000,
  },
  {
    titulo: "Jogos de desenvolvimento",
    texto:
      "Jogos modernos que trabalham emoção, interação social, tomada de decisão e, principalmente, o prazer de aprender.",
    foto: fotos.jogos,
    valor: 314159,
  },
];

export function Metodo() {
  return (
    <section id="metodo" className="secao escura" aria-labelledby="metodo-titulo">
      <div className="wrap">
        <span className="etiqueta" data-reveal>
          O método
        </span>
        <h2 id="metodo-titulo" className="titulo" data-split style={{ maxWidth: "16ch" }}>
          Jogos, lógica e neurociência na <em>mesma aula.</em>
        </h2>
        <p className="lead suave" data-reveal style={{ marginTop: 24 }}>
          Mais do que um curso, um treino para o cérebro. A metodologia exclusiva da Ginástica do Cérebro une três
          ferramentas de forma acessível, estruturada e divertida.
        </p>

        <div className="metodo-grid">
          <div className="metodo-fixo" data-reveal>
            <div className="soroban-caixa">
              <Soroban />
            </div>
          </div>

          <div className="pilares">
            {PILARES.map((p, i) => (
              <article className="pilar" key={p.titulo} data-pilar={p.valor}>
                <span className="num">Ferramenta 0{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p className="suave">{p.texto}</p>
                <Foto src={p.foto} alt={p.titulo} rotulo={p.titulo} sizes="(max-width: 900px) 100vw, 600px" parallax />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
