# Documentação técnica

## Stack

Next.js 16 (App Router, `output: "export"`), React 19, TypeScript strict, Tailwind CSS 4, GSAP + ScrollTrigger,
Motion (`motion/react`), Lucide React, Wrangler (Cloudflare Workers Static Assets).
Sem backend, banco, autenticação ou analytics. Fontes (Cormorant Garamond e Manrope) via `next/font`, que as
baixa no build e as serve do próprio domínio.

Decisões: Lenis **não** foi adicionado (rolagem nativa + `scroll-behavior` já atende, sem custo de JS);
TypeScript 5.9 e ESLint 9 por compatibilidade com `eslint-config-next`; ícones de marca (WhatsApp/Instagram)
são SVGs próprios porque o Lucide recente não os inclui.

## Estrutura

```
src/app/            rotas (home, sobre, tratamentos, tratamentos/[slug], como-funciona, perguntas-frequentes,
                    contato, privacidade, 404), robots.ts, sitemap.ts
src/components/
  layout/           Header, Footer, Logo, FloatingWhatsApp, nav
  ui/               Button (AnimatedButton), Accordion, AreaRow, Portrait, PageParts, Icons
  sections/         seções da home (Hero, Intro, Areas, AboutTeaser, Journey, Differentials, ...)
  animations/       Reveal.tsx (componentes declarativos) + MotionRoot.tsx (GSAP)
  seo/              JsonLd
src/config/site.ts  dados profissionais e flags (fonte única)
src/content/        serviços, FAQ, jornada, artigos
src/lib/            contact (WhatsApp), metadata, structured-data, services
src/styles/         globals.css (tokens + utilitários)
scripts/postbuild.mjs  ajuste dos arquivos RSC para hospedagem estática
```

## Design system (Cacau & Baunilha)

Tokens em `src/styles/globals.css`: paleta (`--vanilla #FCF8F1`, `--cream #EEE4D5`, `--sand #D6C2A7`,
`--taupe #B1977C`, `--cocoa #735C4C`, `--cocoa-deep #372C27`), semânticos (`--background`, `--foreground`,
`--surface`, `--surface-alt`, `--primary`, `--primary-hover`, `--accent`, `--muted`, `--text-primary`,
`--text-secondary`, `--border`, `--focus-ring`), além de espaçamento, tipografia fluida (`clamp`), raios,
sombras e durações. Taupe/areia não são usados em texto pequeno. Classes: `.t-display/.t-h1/.t-h2/.t-h3`,
`.t-lead`, `.eyebrow`, `.wrap`, `.section`, `.btn(-primary|-ghost|-light)`, `.link-u`.
Em títulos, `*palavra*` vira itálico editorial.

## Animações

| Efeito                                                     | Componente                                         | Motor                               |
| ---------------------------------------------------------- | -------------------------------------------------- | ----------------------------------- |
| Título por palavras com máscara                            | `RevealText`                                       | GSAP (scroll) / CSS (`intro`, hero) |
| Fade + deslocamento                                        | `FadeInSection`                                    | GSAP / CSS (`intro`)                |
| Lista em sequência                                         | `StaggerContainer` + `StaggerItem`                 | GSAP                                |
| Imagem revelada por máscara + zoom                         | `RevealImage`                                      | GSAP / CSS (`intro`)                |
| Parallax (≥768px)                                          | `ParallaxMedia`                                    | GSAP ScrollTrigger                  |
| Palavras acendendo no scroll                               | `ScrubText`                                        | GSAP scrub                          |
| Storytelling da jornada (linha de progresso + etapas)      | `Journey` (`data-story`)                           | GSAP scrub                          |
| Hover/tap de botões, linhas de área, menu mobile, acordeão | `AnimatedButton`, `AreaRow`, `Header`, `Accordion` | Motion                              |
| Deriva de formas orgânicas                                 | classe `.drift`                                    | CSS                                 |

Princípios: componentes de animação são Server Components que só emitem `data-*`; `MotionRoot` (único client
component do GSAP, carregado por import dinâmico) anima e limpa tudo no unmount (`gsap.context().revert()`).
Estado inicial oculto só existe com JS ativo, sem `prefers-reduced-motion` e sem a falha-segura: se o GSAP não
iniciar em 3,5 s, a classe `anim-fail` revela tudo. Conteúdo acima da dobra usa `intro` (CSS puro) para não
depender de JS (LCP). GSAP anima apenas transform/opacity/clip-path; Motion cuida de elementos diferentes.

**Novo efeito:** 1) emita um `data-reveal="novo"` em um componente de `Reveal.tsx`; 2) trate o seletor em
`MotionRoot.tsx` dentro do `gsap.context`; 3) se precisar de estado inicial oculto, adicione a regra no bloco
`@media (prefers-reduced-motion: no-preference)` de `globals.css`.

## Como editar

- **Textos de serviços:** `src/content/services.ts`; ativar/desativar: `enabledServices` em `site.ts`.
- **Contatos/endereço/horários/CREFITO:** `src/config/site.ts` (validação de WhatsApp em `src/lib/contact.ts`).
- **Fotos:** `npm run images -- arquivo nome --focal=50,30 --alt="..."` e cole o bloco em `site.images` (hero, portrait, office); ver [`IMAGES.md`](IMAGES.md).
- **Dados profissionais:** todos os campos (nome, CREFITO, bio, formação, especializações, cursos, abordagem, modalidades, endereço, horários, convênios, WhatsApp, Instagram) estão em `src/config/site.ts`; checklist em [`CONTENT_PENDING.md`](CONTENT_PENDING.md).
- **Testar o fluxo com WhatsApp (sem publicar):** `NEXT_PUBLIC_WHATSAPP=5511900000000 npm run build && WA_TEST=5511900000000 npx playwright test` (número fictício, só local; refaça o build normal antes de publicar).
- **Artigos:** a área pública está oculta. Para ativar, adicione itens em `src/content/articles.ts` e copie
  `docs/templates/articles/*` para `src/app/conteudos/` (índice e `[slug]` com `generateStaticParams`), depois
  inclua `/conteudos/` no menu e no `sitemap.ts`. Só publique conteúdo revisado.
- **Mensuração futura:** CTAs disparam `window` event `site:cta` (`detail.name`); basta um listener.

## Executar

```bash
npm install
npm run dev        # desenvolvimento
npm run check      # lint + typecheck + build estático (gera ./out)
npm run preview    # servidor local do Worker (wrangler dev)
```

## Publicar (Cloudflare Workers Static Assets)

```bash
npx wrangler login               # uma vez
NEXT_PUBLIC_SITE_URL=https://samara-rubia-site.<subdominio>.workers.dev npm run deploy
```

Configuração em `wrangler.jsonc` (worker `samara-rubia-site`, assets em `./out`, página 404 personalizada).
**Domínio próprio:** adicione o domínio ao Cloudflare, no painel do Worker em _Settings → Domains & Routes → Add →
Custom domain_ (ou `routes` com `custom_domain: true` no `wrangler.jsonc`), troque `NEXT_PUBLIC_SITE_URL` e
publique de novo. Não é preciso alterar o código.

## Checklist de publicação definitiva

1. Preencher `docs/CONTENT_PENDING.md` e marcar `approved.*`.
2. Definir `NEXT_PUBLIC_SITE_URL` real e `NEXT_PUBLIC_INDEXABLE=true`.
3. `npm run check`; conferir `out/robots.txt` (sem `Disallow: /`) e `out/sitemap.xml`.
4. Validar dados estruturados (Rich Results Test) e rodar Lighthouse em produção.
5. Enviar o sitemap ao Google Search Console.

## Verificações

Resultados completos, método e investigação de LCP em [`AUDIT.md`](AUDIT.md). Testes: `npm run build && npm run test:e2e`
(Playwright + axe; 24 testes: WCAG, overflow em 9 larguras, menu, acordeão, navegação, reduced motion, sem JS,
noindex/robots/sitemap, headings). Contra o site publicado: `BASE_URL=https://... npm run test:e2e`.
Screenshots: `BASE_URL=https://... node scripts/shots.mjs docs/audit`.


## Domínio definitivo (samararubia.com)

- `samararubia.com` e `www.samararubia.com` são Custom Domains do Worker `samara-rubia-site` (`routes` no `wrangler.jsonc`).
- `worker.js` só faz o 301 de `www` para `https://samararubia.com`; o resto vem dos assets estáticos.
- `NEXT_PUBLIC_SITE_URL=https://samararubia.com` em `.env.production`; `NEXT_PUBLIC_INDEXABLE` segue `false`.
- **Antes de liberar a indexação:** desativar o workers.dev (`"workers_dev": false` no `wrangler.jsonc` e novo deploy) ou redirecioná-lo para o domínio principal, para não duplicar conteúdo. Hoje ele continua ativo só para a revisão.
- Preview URLs desativadas (`preview_urls: false`).

## Compartilhamento, ícones e pré-lançamento

- `public/og.png` (1200×630) é usada por todas as páginas via `buildMetadata` em `src/lib/metadata.ts` (Open Graph e Twitter `summary_large_image`, com título/descrição de cada página). Para usar uma versão com fotografia, substitua o arquivo mantendo o nome e as dimensões.
- Ícones: `src/app/favicon.ico`, `icon.svg`, `apple-icon.png` e `public/icon-192.png`/`icon-512.png` (manifest em `src/app/manifest.ts`). Todos saem da marca do `Logo.tsx` com traço um pouco mais firme para ler em 16 px. `npm run build && npm run brand` regenera tudo (e a og.png, com as fontes do site).
- `npm run prelaunch:check` lista o que está pronto e o que falta (domínio, indexação, dados, contatos, fotos, aprovações, ícones, OG, canonical × sitemap, links, workers.dev). Só lê; sempre sai com 0 (use `--strict` para falhar). Não bloqueia o deploy de revisão.

## Worker e cota gratuita

`run_worker_first` é seletivo: o Worker (`worker.js`, só o 301 de www) roda para páginas e arquivos de texto, mas **não** para `/_next/*`, `/images/*`, `.png`, `.ico`, `.svg` e `.webmanifest`, que saem direto dos assets (grátis e ilimitados). Os padrões da Cloudflare só casam caminho, não host, então www/_next não redireciona (irrelevante: ninguém acessa assets por www). Preserva 301, caminho e query. Alternativa sem Worker: Redirect Rule no painel (Rules → Redirect Rules → www.samararubia.com → `concat("https://samararubia.com", http.request.uri.path)` com "Preserve query string", 301); exige um registro DNS proxied para www e permissão que o token do Wrangler não tem. Ao fazê-la, remova `main`, `worker.js` e `run_worker_first`.
