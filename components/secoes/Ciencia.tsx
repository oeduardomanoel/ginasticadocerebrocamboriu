import { SetaDiagonal } from "../Icones";

const ESTUDOS = [
  {
    titulo: "Efeitos de um treino de atenção, memória e funções executivas na cognição de idosos saudáveis",
    url: "https://www.scielo.br/j/prc/a/yYZ7Lpywz8sTxfycHW3Cfnd/?format=pdf&lang=pt",
  },
  {
    titulo: "Efeitos de um treino de atenção, memória e funções executivas na cognição, na qualidade de vida e no bem-estar psicológico de idosos saudáveis",
    url: "https://tede2.pucrs.br/tede2/bitstream/tede/2587/1/411193.pdf",
  },
  {
    titulo: "Efeitos da intervenção com jogos de tabuleiro no estado mental do idoso",
    url: "https://portalperiodicos.unoesc.edu.br/siepe/article/view/8093/4258",
  },
  {
    titulo: "Treino cerebral para adultos",
    url: "https://ginasticadocerebro.com.br/wp-content/uploads/2025/08/238-Texto-Original-_-Manuscrito-Original-1319-1-10-20091130.pdf",
  },
  {
    titulo: "Efeito do jogo Senha em funções executivas",
    url: "https://ginasticadocerebro.com.br/wp-content/uploads/2025/08/efeito_do_jogo_senha_em_fun__es_executivas___disserta__o_joana_oliveira.pdf",
  },
  {
    titulo: "Exercícios de memória: uma estratégia para a promoção do idoso",
    url: "https://www.editorarealize.com.br/editora/anais/cieh/2017/TRABALHO_EV075_MD4_SA12_ID889_16102017111823.pdf",
  },
];

export function Ciencia() {
  return (
    <section className="secao" aria-labelledby="ciencia-titulo">
      <div className="wrap ciencia-grid">
        <div>
          <span className="etiqueta" data-reveal>
            Evidências científicas
          </span>
          <h2 id="ciencia-titulo" className="titulo" data-split>
            Ciência por trás de <em>cada aula.</em>
          </h2>
          <blockquote className="citacao" data-reveal>
            <p>
              “O que diferencia programas eficazes de treinamento cognitivo dos ineficazes é a capacidade de promover
              transferência de habilidades. Não basta melhorar em jogos específicos; é preciso que essas melhorias se
              traduzam em benefícios para a vida real.”
            </p>
            <cite>Dr. Roberto Lent · Neurocientista, professor da UFRJ e autor de “Cem Bilhões de Neurônios”</cite>
          </blockquote>
        </div>

        <ul className="estudos">
          {ESTUDOS.map((e, i) => (
            <li key={e.url} data-reveal data-delay={i * 0.05}>
              <a href={e.url} target="_blank" rel="noopener">
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{e.titulo}</strong>
                <span className="ir" aria-hidden="true">
                  <SetaDiagonal />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
