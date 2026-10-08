import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import "@fontsource-variable/sora";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/site";

const titulo = "Ginástica do Cérebro Camboriú | Treino cognitivo para todas as idades";
const descricao =
  "Treino cognitivo com soroban, apostilas e jogos para crianças, adolescentes, adultos e +60 em Camboriú/SC. Memória, atenção, foco e raciocínio em turmas de até 8 alunos. Agende sua aula experimental gratuita.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: titulo,
  description: descricao,
  keywords: [
    "ginástica do cérebro",
    "camboriú",
    "balneário camboriú",
    "treino cognitivo",
    "estimulação cognitiva",
    "soroban",
    "TDAH",
    "dislexia",
    "TEA",
    "memória idosos",
    "prevenção alzheimer",
    "reforço escolar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Ginástica do Cérebro Camboriú",
    title: titulo,
    description: descricao,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04170F",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  name: "Ginástica do Cérebro Camboriú",
  description: descricao,
  url: site.url,
  telephone: "+55 47 99137-2656",
  email: site.email,
  image: `${site.url}/brand/logo-oficial.png`,
  logo: `${site.url}/brand/logo-oficial.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Manoel Anastácio Pereira, 111",
    addressLocality: "Camboriú",
    addressRegion: "SC",
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "12:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "13:30",
      closes: "18:30",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "12:00" },
  ],
  sameAs: [site.instagram, site.facebook],
  parentOrganization: { "@type": "Organization", name: "Ginástica do Cérebro", url: site.redeSite },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={GeistMono.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__motionOk)document.documentElement.classList.remove('js')},4000);",
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
