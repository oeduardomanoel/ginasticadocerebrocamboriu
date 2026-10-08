import Image from "next/image";
import { site, whatsLink } from "@/lib/site";

export function Rodape() {
  const e = site.endereco;
  return (
    <footer className="rodape">
      <div className="wrap">
        <div className="rodape-grid">
          <div>
            <a href="#inicio" className="rodape-logo" aria-label="Voltar ao início">
              <Image src="/brand/logo-oficial.png" alt="Ginástica do Cérebro" width={1024} height={287} />
            </a>
            <p className="suave" style={{ marginTop: 18, maxWidth: "36ch", fontSize: 15 }}>
              Unidade Camboriú da rede Ginástica do Cérebro. Desenvolvimento cognitivo para todas as fases da vida.
            </p>
          </div>
          <div>
            <h4>Visite</h4>
            <ul>
              <li>{e.rua}</li>
              <li>
                {e.bairro}, {e.cidade}/{e.uf}
              </li>
              <li>CEP {e.cep}</li>
              <li>
                <a href={site.mapsLink} target="_blank" rel="noopener">
                  Abrir no mapa
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Fale com a gente</h4>
            <ul>
              <li>
                <a href={whatsLink()} target="_blank" rel="noopener">
                  WhatsApp {site.telefone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Acompanhe</h4>
            <ul>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener">
                  Instagram {site.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noopener">
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.redeSite} target="_blank" rel="noopener">
                  Rede Ginástica do Cérebro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rodape-marca" aria-hidden="true" data-marca>
          Camboriú<span>.</span>
        </div>

        <div className="rodape-base">
          <span>© {new Date().getFullYear()} Ginástica do Cérebro Camboriú. Unidade franqueada.</span>
          <span>Treino cognitivo para crianças, adultos e +60.</span>
        </div>
      </div>
    </footer>
  );
}
