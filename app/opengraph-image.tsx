import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Ginástica do Cérebro Camboriú: treino cognitivo para todas as idades";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const raiz = process.cwd();
  const [fonte, simbolo] = await Promise.all([
    readFile(join(raiz, "node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff")),
    readFile(join(raiz, "public/brand/simbolo.svg"), "utf8"),
  ]);
  const simboloSrc = `data:image/svg+xml;base64,${Buffer.from(simbolo).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "72px 88px",
          background: "#04170F",
          color: "#EBF8F3",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ fontSize: 24, letterSpacing: 4, color: "#D4F2E9", textTransform: "uppercase" }}>
            Unidade Camboriú · SC
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: -5, marginTop: 28 }}>
            <span>Cérebro também</span>
            <span style={{ color: "#FE8340" }}>se treina.</span>
          </div>
          <div style={{ fontSize: 28, marginTop: 36, color: "rgba(235,248,243,.75)" }}>
            Ginástica do Cérebro · crianças, adultos e +60
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={simboloSrc} width={300} height={344} alt="" />
      </div>
    ),
    { ...size, fonts: [{ name: "Poppins", data: fonte, weight: 600, style: "normal" }] },
  );
}
