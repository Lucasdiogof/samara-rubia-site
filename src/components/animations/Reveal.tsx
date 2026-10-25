import { Fragment, type CSSProperties, type ElementType, type ReactNode } from "react";

/*
 * Componentes de animação declarativos (Server Components).
 * Eles só emitem atributos `data-*`; quem anima é <MotionRoot /> (GSAP).
 * Conteúdo permanece no HTML estático e visível sem JS (ver globals.css).
 */

type Token = { w: string; em: boolean };

/** "um *cuidado* que acolhe" → palavras, com *itálico* editorial. */
function tokenize(text: string): Token[] {
  const out: Token[] = [];
  let em = false;
  for (const raw of text.split(" ")) {
    let w = raw;
    if (w.startsWith("*")) {
      em = true;
      w = w.slice(1);
    }
    const closes = w.endsWith("*");
    if (closes) w = w.slice(0, -1);
    out.push({ w, em });
    if (closes) em = false;
  }
  return out;
}

const plain = (text: string) => text.replaceAll("*", "");

type TextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  /** atraso em segundos */
  delay?: number;
  id?: string;
  /** Entrada por CSS puro (sem JS): use no conteúdo acima da dobra. */
  intro?: boolean;
};

/** Título que sobe palavra a palavra por máscara. */
export function RevealText({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  id,
  intro,
}: TextProps) {
  const mode = intro
    ? { "data-intro": "lines", style: { "--d": `${delay}s` } }
    : { "data-reveal": "lines", "data-delay": delay || undefined };
  return (
    <Tag id={id} className={className} {...mode}>
      <span className="sr-only">{plain(children)}</span>
      <span aria-hidden="true">
        {tokenize(children).map((t, i) => (
          <Fragment key={i}>
            <span className="rw">
              <span className="rwi" style={{ "--i": i } as CSSProperties}>
                {t.em ? <em>{t.w}</em> : t.w}
              </span>
            </span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/** Texto cujas palavras acendem conforme o scroll. */
export function ScrubText({ children, as: Tag = "p", className }: Omit<TextProps, "delay" | "id">) {
  return (
    <Tag className={className} data-scrub>
      <span className="sr-only">{plain(children)}</span>
      <span aria-hidden="true">
        {tokenize(children).map((t, i) => (
          <Fragment key={i}>
            <span className="sw">{t.em ? <em>{t.w}</em> : t.w}</span>{" "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

type BoxProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  intro?: boolean;
};

/** Entrada suave (fade + deslocamento curto). */
export function FadeInSection({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  intro,
}: BoxProps) {
  const mode = intro
    ? { "data-intro": "fade", style: { "--d": `${delay}s` } }
    : { "data-reveal": "fade", "data-delay": delay || undefined };
  return (
    <Tag className={className} {...mode}>
      {children}
    </Tag>
  );
}

/** Filhos diretos recebem `data-item` e entram em sequência. */
export function StaggerContainer({
  children,
  className,
  as: Tag = "div",
}: Omit<BoxProps, "delay">) {
  return (
    <Tag className={className} data-reveal="stagger">
      {children}
    </Tag>
  );
}
export const StaggerItem = ({ children, className, as: Tag = "div" }: Omit<BoxProps, "delay">) => (
  <Tag className={className} data-item>
    {children}
  </Tag>
);

/** Revelação de imagem por máscara; o filho recebe um zoom suave. */
export function RevealImage({ children, className, intro }: Omit<BoxProps, "as" | "delay">) {
  const mode = intro ? { "data-intro": "image" } : { "data-reveal": "image" };
  return (
    <div className={className} {...mode}>
      {children}
    </div>
  );
}

/** Parallax sutil (apenas ≥768px). `amount` = % de deslocamento. */
export function ParallaxMedia({
  children,
  className,
  amount = 7,
}: Omit<BoxProps, "as" | "delay"> & { amount?: number }) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div data-parallax={amount} className="absolute inset-x-0 -top-[10%] h-[120%]">
        {children}
      </div>
    </div>
  );
}
