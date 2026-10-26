import { AnimatedButton } from "@/components/ui/Button";
import { Blob } from "@/components/ui/Portrait";
import { hasChannel } from "@/lib/contact";

export const metadata = { title: "Página não encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32">
      <Blob
        className="pointer-events-none absolute -right-20 top-1/4 h-[30rem] w-[30rem] opacity-60"
        fill="var(--cream)"
      />
      <div className="wrap relative">
        <p className="eyebrow">Erro 404</p>
        <h1 className="t-display mt-6 max-w-3xl">Esse caminho não *existe.*</h1>
        <p className="t-lead mt-6">A página que você procura pode ter mudado de lugar.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <AnimatedButton href="/">Voltar ao início</AnimatedButton>
          <AnimatedButton
            href={hasChannel ? "/contato/" : "/como-funciona/"}
            variant="ghost"
            arrow={false}
          >
            {hasChannel ? "Falar com a Samara" : "Como funciona"}
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
