import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { WhatsFlutuante } from "@/components/WhatsFlutuante";
import { Hero } from "@/components/secoes/Hero";
import { Faixa } from "@/components/secoes/Faixa";
import { Manifesto } from "@/components/secoes/Manifesto";
import { Publicos } from "@/components/secoes/Publicos";
import { Metodo } from "@/components/secoes/Metodo";
import { Desafio } from "@/components/secoes/Desafio";
import { Diferenciais } from "@/components/secoes/Diferenciais";
import { Unidade } from "@/components/secoes/Unidade";
import { Depoimentos } from "@/components/secoes/Depoimentos";
import { Ciencia } from "@/components/secoes/Ciencia";
import { Faq } from "@/components/secoes/Faq";
import { Contato } from "@/components/secoes/Contato";
import { Rodape } from "@/components/secoes/Rodape";

export default function Home() {
  return (
    <>
      <Motion />
      <Nav />
      <main>
        <Hero />
        <Faixa />
        <Manifesto />
        <Metodo />
        <Publicos />
        <Desafio />
        <Diferenciais />
        <Unidade />
        <Depoimentos />
        <Ciencia />
        <Faq />
        <Contato />
      </main>
      <Rodape />
      <WhatsFlutuante />
    </>
  );
}
