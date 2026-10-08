// Baixa as fotos e o logo oficiais publicados pela rede Ginástica do Cérebro para /public.
// Roda sozinho antes de cada build (npm run build / Vercel) e também via `npm run fotos`.
// Arquivo que já existe não é baixado de novo. Se a rede falhar, o build segue normalmente
// e o site mostra placeholders com a identidade da marca no lugar das fotos.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://ginasticadocerebro.com.br/wp-content/uploads";

// destino em /public  ->  candidatos na origem (o primeiro que responder é usado)
const arquivos = {
  "brand/logo-oficial.png": [
    "2026/01/Logo-Ginastica-do-Cerebro-2-copiar.png",
    "2026/01/Logo-Ginastica-do-Cerebro-2-copiar-1024x287.png",
  ],
  "fotos/unidade-1.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.20.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.20-768x432.jpeg"],
  "fotos/unidade-2.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.21.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.21-768x432.jpeg"],
  "fotos/unidade-3.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.21-1.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.21-1-768x432.jpeg"],
  "fotos/unidade-4.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.22.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.22-768x432.jpeg"],
  "fotos/unidade-5.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.22-1.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.22-1-768x432.jpeg"],
  "fotos/unidade-6.jpg": ["2026/01/WhatsApp-Image-2026-03-30-at-16.15.22-2.jpeg", "2026/01/WhatsApp-Image-2026-03-30-at-16.15.22-2-768x432.jpeg"],
  "fotos/criancas.jpg": ["2026/01/CRIANCAS.jpg", "2026/01/CRIANCAS-768x512.jpg"],
  "fotos/adultos.webp": ["2026/01/img-24.webp"],
  "fotos/sessenta.jpg": ["2026/01/60-scaled.jpg"],
  "fotos/soroban.webp": ["2026/01/img-2.webp"],
  "fotos/apostilas.webp": ["2026/01/img-3.webp"],
  "fotos/jogos.webp": ["2026/01/img-1.webp"],
  "fotos/ambiente-1.webp": ["2026/01/2025-11-14-1.webp"],
  "fotos/ambiente-2.webp": ["2026/01/2025-11-14-7.webp"],
  "fotos/ambiente-3.webp": ["2026/01/2025-12-09.webp"],
  "fotos/ambiente-4.webp": ["2026/01/2025-11-14-2.webp"],
  "fotos/ambiente-5.webp": ["2026/01/2025-11-14-3.webp"],
  "fotos/ambiente-6.webp": ["2026/01/2025-11-14-6.webp"],
  "fotos/ambiente-7.webp": ["2026/01/2025-11-14.webp"],
  "fotos/ambiente-8.webp": ["2026/01/2025-12-09-1.webp"],
  "fotos/rede-alunos.webp": ["2026/01/img-11.webp"],
  "fotos/rede-quem-somos.webp": ["2026/01/nova-1.webp"],
  "fotos/rede-historia.webp": ["2026/01/img-21.webp"],
  "fotos/depo-carla.webp": ["2026/01/img-17.webp"],
  "fotos/depo-wanderley.webp": ["2026/01/img-18.webp"],
  "fotos/depo-rodrigo.webp": ["2026/01/img-16.webp"],
  "fotos/depo-patricia.png": ["2026/01/0110.png"],
};

const cabecalhos = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/png,image/jpeg,*/*",
};

async function baixar(caminho) {
  const res = await fetch(`${BASE}/${caminho}`, { headers: cabecalhos, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const tipo = res.headers.get("content-type") ?? "";
  if (!tipo.startsWith("image/")) throw new Error(`resposta não é imagem (${tipo})`);
  return Buffer.from(await res.arrayBuffer());
}

let ok = 0;
let pulados = 0;
let falhas = 0;

await Promise.all(
  Object.entries(arquivos).map(async ([destino, candidatos]) => {
    const alvo = join(raiz, "public", destino);
    if (existsSync(alvo)) {
      pulados++;
      return;
    }
    for (const c of candidatos) {
      try {
        const dados = await baixar(c);
        mkdirSync(dirname(alvo), { recursive: true });
        writeFileSync(alvo, dados);
        ok++;
        return;
      } catch {
        // tenta o próximo candidato
      }
    }
    falhas++;
  }),
);

console.log(`[fotos] baixadas: ${ok}  ·  já existiam: ${pulados}  ·  indisponíveis: ${falhas}`);
if (falhas) console.log("[fotos] As que faltaram aparecem como placeholder da marca. Rode `npm run fotos` de novo quando quiser.");
