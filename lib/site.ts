// Fonte única de dados da unidade. Alterou telefone, horário ou endereço? Mude só aqui.

const WHATS_NUMERO = "5547991372656";

export const site = {
  nome: "Ginástica do Cérebro",
  unidade: "Camboriú",
  // Defina NEXT_PUBLIC_SITE_URL na Vercel quando o domínio próprio estiver no ar.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  telefone: "(47) 99137-2656",
  telefoneLink: "tel:+5547991372656",
  email: "camboriu@ginasticadocerebro.com.br",
  instagram: "https://www.instagram.com/gccamboriu/",
  instagramHandle: "@gccamboriu",
  facebook: "https://www.facebook.com/gccamboriu/",
  redeSite: "https://ginasticadocerebro.com.br/",
  endereco: {
    rua: "R. Manoel Anastácio Pereira, 111",
    bairro: "Centro",
    cidade: "Camboriú",
    uf: "SC",
    cep: "88340-299",
  },
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Gin%C3%A1stica+do+C%C3%A9rebro+R.+Manoel+Anast%C3%A1cio+Pereira+111+Camboriú+SC",
  mapsEmbed:
    "https://www.google.com/maps?q=R.+Manoel+Anast%C3%A1cio+Pereira,+111+-+Centro,+Cambori%C3%BA+-+SC,+88340-299&z=16&output=embed",
  horarios: [
    { dias: "Segunda a sexta", horas: "08h às 12h  ·  13h30 às 18h30" },
    { dias: "Sábado", horas: "08h às 12h" },
    { dias: "Domingo", horas: "Fechado" },
  ],
};

export function whatsLink(texto = "Olá! Gostaria de agendar uma aula experimental gratuita na Ginástica do Cérebro Camboriú.") {
  return `https://wa.me/${WHATS_NUMERO}?text=${encodeURIComponent(texto)}`;
}

// Fotos oficiais. O script scripts/baixar-fotos.mjs baixa cada uma para /public/fotos.
// Enquanto o arquivo não existir, o componente <Foto> mostra um placeholder com a identidade da marca.
export const fotos = {
  unidade: [
    "unidade-1.jpg",
    "unidade-2.jpg",
    "unidade-3.jpg",
    "unidade-4.jpg",
    "unidade-5.jpg",
    "unidade-6.jpg",
  ],
  criancas: "criancas.jpg",
  adultos: "adultos.webp",
  sessenta: "sessenta.jpg",
  soroban: "soroban.webp",
  apostilas: "apostilas.webp",
  jogos: "jogos.webp",
  ambiente: ["ambiente-1.webp", "ambiente-2.webp", "ambiente-3.webp", "ambiente-4.webp"],
};

export const numeros = [
  { valor: 15, prefixo: "+", sufixo: " mil", rotulo: "alunos transformados pela rede no Brasil" },
  { valor: 43, prefixo: "+", sufixo: "", rotulo: "unidades ativas e em expansão" },
  { valor: 14, prefixo: "", sufixo: " anos", rotulo: "de metodologia própria" },
  { valor: 8, prefixo: "", sufixo: "", rotulo: "alunos no máximo por sala" },
];
