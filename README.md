# Ginástica do Cérebro Camboriú

Site da unidade Camboriú da rede Ginástica do Cérebro. Next.js 16 (App Router), GSAP (ScrollTrigger + SplitText), Lenis para scroll suave. Página 100% estática, pronta para a Vercel.

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploy na Vercel

1. Importe este repositório na Vercel. O framework é detectado sozinho (Next.js), sem configuração extra.
2. Opcional: em Settings > Environment Variables, crie `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://gccamboriu.com.br`). Isso ajusta canonical, sitemap e Open Graph.
3. Deploy.

## Fotos

Antes de cada build, `scripts/baixar-fotos.mjs` baixa as fotos oficiais publicadas pela rede (unidade Camboriú, crianças, adultos, +60, soroban, apostilas, jogos) para `public/fotos`. Se alguma não baixar, o site mostra um placeholder com o símbolo da marca, nunca imagem quebrada.

Para trocar ou adicionar fotos próprias, basta salvar o arquivo em `public/fotos` com o mesmo nome listado em `lib/site.ts` e commitar. Rodar `npm run fotos` localmente baixa tudo de uma vez para você revisar e commitar.

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Telefone, endereço, horários, links, fotos | `lib/site.ts` |
| Textos de cada seção | `components/secoes/*.tsx` |
| Cores e tipografia | `app/globals.css` (tokens no topo) |
| SEO e dados estruturados | `app/layout.tsx` |

## Identidade

Cores tiradas do logo oficial: laranja em degradê `#FE8340 → #F95F1C`, verde `#003D27`, menta `#D4F2E9`. Títulos em Sora (praticamente idêntica ao wordmark), corpo em Poppins (fonte usada no site da rede), detalhes técnicos em Geist Mono. Fontes servidas pelo próprio site, sem depender do Google Fonts.
