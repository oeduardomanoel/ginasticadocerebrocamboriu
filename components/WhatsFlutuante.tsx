"use client";

import { useEffect, useState } from "react";
import { whatsLink } from "@/lib/site";
import { Whats } from "./Icones";

export function WhatsFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contato = document.getElementById("contato");
      const noContato = contato ? contato.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setVisivel(window.scrollY > window.innerHeight * 0.8 && !noContato);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`whats-flutuante ${visivel ? "visivel" : ""}`}
      href={whatsLink()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      tabIndex={visivel ? 0 : -1}
    >
      <Whats />
      <span>Falar no WhatsApp</span>
    </a>
  );
}
