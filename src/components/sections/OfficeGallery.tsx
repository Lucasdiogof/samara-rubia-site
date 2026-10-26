import { RevealImage, RevealText } from "@/components/animations/Reveal";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";
import { getDict, type Lang } from "@/i18n";

// Proporções por posição: a primeira é a principal (paisagem), as demais variam.
const frames = [
  "aspect-[3/2] sm:col-span-2",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[3/2] sm:col-span-2",
];

/** Galeria do consultório: só aparece quando há fotos reais em `site.images.office`. */
export function OfficeGallery({ lang }: { lang: Lang }) {
  const t = getDict(lang).office;
  const photos = site.images.office.slice(0, 4);
  if (photos.length === 0) return null;
  return (
    <section className="pb-24" aria-labelledby="consultorio-title">
      <div className="wrap">
        <p className="eyebrow">{t.eyebrow}</p>
        <RevealText as="h2" id="consultorio-title" className="t-h2 mt-5 max-w-2xl">
          {t.title}
        </RevealText>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6">
          {photos.map((p, i) => (
            <RevealImage
              key={p.name}
              className={`relative overflow-hidden rounded-[1.5rem] bg-cream ${frames[i] ?? frames[1]}`}
            >
              <div className="relative h-full w-full">
                <Photo
                  photo={p}
                  sizes={
                    i === 0 || i === 3
                      ? "(min-width: 1280px) 1200px, 94vw"
                      : "(min-width: 1280px) 580px, (min-width: 640px) 46vw, 94vw"
                  }
                />
              </div>
            </RevealImage>
          ))}
        </div>
      </div>
    </section>
  );
}
