import { site } from "@/config/site";
import { Photo } from "./Photo";

type Props = {
  /** qual foto da configuração ocupa este espaço */
  slot?: "hero" | "portrait";
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Retrato do espaço indicado. Com a foto configurada em `site.images`, usa a foto real;
 * enquanto isso, mostra uma composição gráfica (decorativa, sem pessoa simulada).
 * O contêiner pai define a proporção e deve ser `relative`.
 */
export function Portrait({
  slot = "portrait",
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority = false,
  className = "",
}: Props) {
  const photo = site.images[slot];
  // Foto recortada (transparente): entra sobre o cenário em arco, como se saísse dele.
  if (photo?.alpha)
    return (
      <>
        <ArchBackdrop />
        <Photo photo={photo} sizes={sizes} priority={priority} className={className} />
      </>
    );
  if (photo) return <Photo photo={photo} sizes={sizes} priority={priority} className={className} />;
  return <ArchBackdrop letter />;
}

/** Cenário em arco (areia, sol cacau, ondas e fios): fundo da foto recortada e placeholder sem foto. */
function ArchBackdrop({ letter = false }: { letter?: boolean }) {
  return (
    <svg
      viewBox="0 0 480 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="arch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3D3BC" />
          <stop offset="1" stopColor="#D6C2A7" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#arch-sky)" />
      <circle cx="352" cy="176" r="96" fill="#735C4C" />
      <path d="M-20 600V420c70-60 150-70 230-30s170 40 270-20v230Z" fill="#B1977C" />
      <path d="M-20 600V500c90-40 170-30 250 10s150 30 250-10v100Z" fill="#EEE4D5" />
      <path
        d="M70 600V300a170 170 0 0 1 340 0v300"
        fill="none"
        stroke="#FCF8F1"
        strokeWidth="1.5"
        opacity=".85"
      />
      <path
        d="M110 600V310a130 130 0 0 1 260 0v290"
        fill="none"
        stroke="#372C27"
        strokeWidth="1"
        opacity=".35"
      />
      {letter && (
        <text
          x="240"
          y="360"
          textAnchor="middle"
          fontFamily="var(--font-cormorant), Georgia, serif"
          fontStyle="italic"
          fontSize="190"
          fill="#FCF8F1"
        >
          S
        </text>
      )}
    </svg>
  );
}

/** Forma orgânica decorativa reutilizável. */
export function Blob({
  className = "",
  fill = "var(--sand)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        fill={fill}
        d="M43.6 -57.6C56.7 -47.5 67.6 -33.7 72.4 -17.6C77.2 -1.5 75.9 16.9 67.4 30.5C58.9 44.1 43.2 52.9 27.2 59.5C11.2 66.1 -5.1 70.6 -21.5 67.5C-37.9 64.4 -54.4 53.7 -63.4 38.9C-72.4 24.1 -73.9 5.2 -69.2 -11.6C-64.5 -28.4 -53.6 -43.1 -40.2 -53.2C-26.8 -63.3 -10.9 -68.7 3.4 -72.9C17.7 -77.1 30.5 -67.7 43.6 -57.6Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
