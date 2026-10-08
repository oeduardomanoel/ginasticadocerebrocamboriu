import { site } from "@/lib/site";

const PERGUNTAS = [
  {
    p: "Quem pode fazer a Ginástica do Cérebro?",
    r: "Crianças, adolescentes, adultos e pessoas acima dos 60 anos. Não existe idade certa para começar a treinar o cérebro, e cada faixa etária tem material e níveis próprios.",
  },
  {
    p: "Vocês atendem crianças com TDAH, TEA ou dislexia?",
    r: "Sim. Atendemos crianças e adolescentes típicos e atípicos, incluindo TDAH, TEA nível 1, dislexia e dificuldades em leitura, escrita e matemática, sempre com olhar especializado e respeitando o ritmo de cada um. O treino cognitivo complementa o acompanhamento de saúde, não substitui.",
  },
  {
    p: "É reforço escolar?",
    r: "Não. O foco vai além do conteúdo da escola. Desenvolvemos as habilidades que sustentam qualquer aprendizado, como memória, atenção, lógica e linguagem. Por isso o resultado aparece na escola, no trabalho e na rotina.",
  },
  {
    p: "Como funciona a aula experimental?",
    r: "É gratuita. Você agenda pelo WhatsApp, conhece a unidade e a equipe e vive uma aula na prática, com soroban, apostilas e jogos.",
  },
  {
    p: "Quantos alunos tem cada turma?",
    r: "No máximo 8 alunos por sala, para que o professor consiga acompanhar cada pessoa de perto.",
  },
  {
    p: "Como vocês acompanham a evolução?",
    r: "No início do curso é feita uma avaliação cognitiva que mostra o cenário real do aluno. Ela serve de base para acompanhar o progresso ao longo das aulas.",
  },
  {
    p: "Qual o horário de atendimento?",
    r: `Segunda a sexta, das 8h às 12h e das 13h30 às 18h30. Sábado, das 8h às 12h. Fale com a gente pelo ${site.telefone}.`,
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((q) => ({
      "@type": "Question",
      name: q.p,
      acceptedAnswer: { "@type": "Answer", text: q.r },
    })),
  };

  return (
    <section id="duvidas" className="secao" style={{ background: "var(--menta-2)" }} aria-labelledby="faq-titulo">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap faq-grid">
        <div>
          <span className="etiqueta" data-reveal>
            Dúvidas frequentes
          </span>
          <h2 id="faq-titulo" className="titulo" data-split>
            Perguntas que a gente <em>sempre ouve.</em>
          </h2>
        </div>
        <div className="faq" data-reveal>
          {PERGUNTAS.map((q, i) => (
            <details key={q.p} open={i === 0}>
              <summary>
                {q.p}
                <i aria-hidden="true" />
              </summary>
              <p className="resposta">{q.r}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
