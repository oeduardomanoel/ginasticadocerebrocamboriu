import Image from "next/image";
import { fotos, site, whatsLink } from "@/lib/site";
import { Foto } from "../Foto";

export function Unidade() {
  const e = site.endereco;
  return (
    <section id="unidade" className="secao" aria-labelledby="unidade-titulo">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <span className="etiqueta" data-reveal>
              A unidade
            </span>
            <h2 id="unidade-titulo" className="titulo" data-split>
              Um espaço pensado para <em>concentrar.</em>
            </h2>
          </div>
          <p className="lead suave" data-reveal style={{ maxWidth: "46ch" }}>
            Cores claras, organização visual e poucas informações nas paredes, um ambiente que favorece a concentração,
            inclusive de quem tem TDAH. Cadeiras estofadas, mesas que aproximam a turma e um clima em que todo mundo se
            sente à vontade para aprender no próprio ritmo.
          </p>
        </div>

        <div className="galeria">
          {fotos.unidade.map((f, i) => (
            <Foto
              key={f}
              src={f}
              className={`g${i + 1}`}
              alt={`Unidade Ginástica do Cérebro Camboriú, foto ${i + 1}`}
              rotulo={`Unidade Camboriú · 0${i + 1}`}
              sizes="(max-width: 760px) 50vw, 50vw"
              parallax
            />
          ))}
        </div>

        <div className="unidade-info">
          <div className="cartao-info" data-reveal>
            <h3>Ginástica do Cérebro Camboriú</h3>
            <div className="info-linha">
              <span className="mono">Endereço</span>
              <address style={{ fontStyle: "normal" }}>
                {e.rua}, {e.bairro}
                <br />
                {e.cidade}/{e.uf} · CEP {e.cep}
              </address>
            </div>
            <div className="info-linha">
              <span className="mono">Horário de atendimento</span>
              <div className="horarios">
                {site.horarios.map((h) => (
                  <div key={h.dias}>
                    <span>{h.dias}</span>
                    <span>{h.horas}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="info-linha">
              <span className="mono">Contato</span>
              <a href={site.telefoneLink}>{site.telefone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <div className="acoes">
              <a className="btn btn-laranja" href={whatsLink()} target="_blank" rel="noopener" data-sorrir>
                Agendar aula
                <span className="seta" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn-contorno" href={site.mapsLink} target="_blank" rel="noopener">
                Como chegar
              </a>
            </div>
          </div>

          <div className="mapa" data-reveal data-delay="0.1">
            <div className="mapa-selo">
              <Image src="/brand/simbolo.svg" alt="" width={26} height={30} />
              Estamos aqui
            </div>
            <iframe
              src={site.mapsEmbed}
              title="Mapa da unidade Ginástica do Cérebro Camboriú"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
