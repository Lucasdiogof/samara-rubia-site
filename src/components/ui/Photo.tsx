import type { PhotoConfig } from "@/config/site";

type Props = {
  photo: PhotoConfig;
  /** atributo `sizes` conforme a largura real da imagem no layout */
  sizes: string;
  /** true apenas para a imagem do hero (LCP): carrega já e com prioridade alta */
  priority?: boolean;
  className?: string;
};

const srcSet = (p: PhotoConfig, ext: string) =>
  p.widths.map((w) => `/images/${p.name}-${w}.${ext} ${w}w`).join(", ");

/**
 * Imagem responsiva (AVIF → WebP → JPG) que preenche o contêiner pai sem distorcer.
 * O contêiner define a proporção (aspect-ratio) e o `object-position` aplica o ponto focal.
 * width/height reservam o espaço e evitam deslocamento de layout.
 */
export function Photo({ photo, sizes, priority = false, className = "" }: Props) {
  const fallback = photo.widths[Math.min(2, photo.widths.length - 1)] ?? photo.widths[0];
  const { x, y } = photo.focal ?? { x: 50, y: 50 };
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(photo, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(photo, "webp")} sizes={sizes} />
      <img
        src={`/images/${photo.name}-${fallback}.${photo.alpha ? "png" : "jpg"}`}
        srcSet={srcSet(photo, photo.alpha ? "png" : "jpg")}
        sizes={sizes}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        className={`absolute w-full ${photo.alpha ? "inset-x-0 bottom-0 h-[92%] object-contain" : "inset-0 h-full object-cover"} ${className}`}
        style={{ objectPosition: photo.alpha ? "50% 100%" : `${x}% ${y}%` }}
      />
    </picture>
  );
}
