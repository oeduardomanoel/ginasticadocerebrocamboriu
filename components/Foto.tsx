import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  rotulo?: string;
  priority?: boolean;
  parallax?: boolean;
};

// Mostra a foto oficial se ela existir em /public/fotos. Se ainda não foi baixada,
// renderiza um placeholder com o símbolo da marca para nunca exibir imagem quebrada.
export function Foto({ src, alt, sizes, className, rotulo, priority, parallax }: Props) {
  const existe = existsSync(join(process.cwd(), "public", "fotos", src));
  return (
    <div className={`foto ${className ?? ""}`}>
      {existe ? (
        <Image
          src={`/fotos/${src}`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          data-parallax-img={parallax ? "" : undefined}
        />
      ) : (
        <div className="foto-ph" role="img" aria-label={alt}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/simbolo.svg" alt="" width={120} height={138} />
          <span>{rotulo ?? alt}</span>
        </div>
      )}
    </div>
  );
}
