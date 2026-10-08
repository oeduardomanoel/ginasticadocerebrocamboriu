import { whatsLink } from "@/lib/site";
import { NeuralCanvas } from "../NeuralCanvas";
import { Mascote } from "../Mascote";

export function Hero() {
  return (
    <section id="inicio" className="hero escura">
      <NeuralCanvas />
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <span className="etiqueta" data-hero>
              Unidade Camboriú · SC
            </span>
            <h1 className="display" data-hero data-hero-titulo>
              <span className="linha-hero">Cérebro</span>
              <span className="linha-hero">também se</span>
              <span className="linha-hero">
                <em>treina.</em>
              </span>
            </h1>
            <p className="hero-sub" data-hero>
              Treino cognitivo com soroban, apostilas e jogos para crianças, adolescentes, adultos e +60. Mais memória,
              atenção e raciocínio em turmas de até 8 alunos, no Centro de Camboriú.
            </p>
            <div className="hero-acoes" data-hero>
              <a className="btn btn-laranja" href={whatsLink()} target="_blank" rel="noopener" data-sorrir>
                Agendar aula grátis
                <span className="seta" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-contorno" href="#metodo">
                Conhecer o método
              </a>
            </div>
          </div>

          <div className="hero-mascote" data-hero>
            <Mascote />
            <span className="hero-anota a1">Memória</span>
            <span className="hero-anota a2">Atenção</span>
            <span className="hero-anota a3">Raciocínio</span>
          </div>
        </div>

        <div className="hero-rodape" data-hero>
          <span className="ao-vivo">
            <i aria-hidden="true" /> Aula experimental gratuita
          </span>
          <span>Crianças · Adultos · +60</span>
          <span>Rede com +15 mil alunos no Brasil</span>
        </div>
      </div>
    </section>
  );
}
