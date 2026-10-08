import { fotos, whatsLink } from "@/lib/site";
import { Foto } from "../Foto";

const PUBLICOS = [
  {
    titulo: "Crianças e adolescentes",
    texto:
      "Típicos e atípicos. Olhar especializado para TDAH, TEA nível 1, dislexia e dificuldades em leitura, escrita e matemática, sempre no ritmo de cada um.",
    tags: ["Atenção", "Leitura e escrita", "Lógica", "Autonomia"],
    foto: fotos.criancas,
    alt: "Crianças em atividade de treino cognitivo",
  },
  {
    titulo: "Adultos",
    texto:
      "Foco, memória e controle emocional para render mais nos estudos e no trabalho. Mais agilidade para criar, resolver problemas e decidir.",
    tags: ["Foco", "Memória", "Tomada de decisão"],
    foto: fotos.adultos,
    alt: "Adultos em aula na Ginástica do Cérebro",
  },
  {
    titulo: "+60",
    texto:
      "Estimulação cognitiva para um envelhecimento ativo e saudável. Cuidar da memória antes que os esquecimentos apareçam, com amizade e muita risada na turma.",
    tags: ["Memória", "Prevenção", "Convivência"],
    foto: fotos.sessenta,
    alt: "Alunos acima de 60 anos em aula",
  },
];

export function Publicos() {
  return (
    <section id="para-quem" className="publicos" aria-labelledby="publicos-titulo">
      <div data-hscroll style={{ paddingBlock: "clamp(88px, 10vw, 140px)" }}>
        <div className="wrap publicos-topo">
          <div>
            <span className="etiqueta" data-reveal>
              Para quem é
            </span>
            <h2 id="publicos-titulo" className="titulo" data-split>
              Não existe idade certa para <em>começar.</em>
            </h2>
          </div>
          <p className="lead suave" data-reveal style={{ maxWidth: "38ch" }}>
            Programas personalizados para cada fase da vida, com material próprio para cada faixa etária.
          </p>
        </div>

        <div className="h-scroll">
          <div className="h-trilho" data-hscroll-track>
            {PUBLICOS.map((p, i) => (
              <article className="publico" key={p.titulo}>
                <Foto src={p.foto} alt={p.alt} rotulo={p.titulo} sizes="(max-width: 900px) 100vw, 560px" parallax />
                <div className="publico-corpo">
                  <span className="publico-num">0{i + 1} / 03</span>
                  <h3>{p.titulo}</h3>
                  <p className="suave">{p.texto}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            <article className="publico publico-cta">
              <span className="publico-num" style={{ color: "var(--laranja-2)" }}>
                Próximo passo
              </span>
              <h3>Descubra em uma aula o que o treino pode fazer por você ou pela sua família.</h3>
              <a className="btn btn-laranja" href={whatsLink()} target="_blank" rel="noopener" data-sorrir>
                Agendar aula grátis
                <span className="seta" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
