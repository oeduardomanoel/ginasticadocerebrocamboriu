import { IconeCerebro } from "../Icones";

const HABILIDADES = ["Memória", "Atenção", "Raciocínio lógico", "Concentração", "Criatividade", "Linguagem", "Autonomia"];

export function Faixa() {
  const grupo = (oculto: boolean) => (
    <span className="faixa-grupo" aria-hidden={oculto || undefined}>
      {HABILIDADES.map((h) => (
        <span className="faixa-item" key={h}>
          {h}
          <IconeCerebro />
        </span>
      ))}
    </span>
  );
  return (
    <div className="faixa" role="presentation">
      <div className="faixa-trilho" data-marquee>
        {grupo(false)}
        {grupo(true)}
      </div>
    </div>
  );
}
