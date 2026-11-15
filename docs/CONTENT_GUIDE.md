# Conteúdos, Reels, artigos e avaliações

Tudo é opcional e começa **vazio**: sem itens reais, a home não mostra a seção de conteúdos nem a de
avaliações, o menu não ganha "Conteúdos" e o sitemap não lista artigos. `/conteudos/` existe com um aviso
honesto. Tudo fica em `src/config/content.ts`.

## Exemplos de desenvolvimento (nunca públicos)
`src/content/demo.ts` tem Reels, artigos e avaliações FICTÍCIOS, sempre com selo visível. Só aparecem em
`npm run dev` ou num build local com `NEXT_PUBLIC_CONTENT_DEMO=true`:

```bash
NEXT_PUBLIC_CONTENT_DEMO=true npm run build   # só para revisar o layout; depois rode o build normal
```
O `npm run deploy` usa o build normal (sem exemplos). O teste `tests/content.spec.ts` confere isso.

## Adicionar um Reel
1. Em `reels`, acrescente `{ id, url, title: {pt,en,es}, cover, date }`. `url` é o link original do Reel.
2. Capa 9:16 (opcional): `npm run images -- caminho/capa.jpg reel-1 --alt="..."` e cole o bloco gerado em `cover`
   (largura mínima 1080 px). Sem capa, o card usa uma composição gráfica.
3. O vídeo só é carregado do Instagram depois do clique em "Assistir aqui" (sem autoplay, sem script
   prévio). O link para o Reel original fica sempre visível. Não há scraping nem serviço pago.
4. Mostram-se 3 na home (os mais recentes) e todos em `/conteudos/`. Valide o embed com um Reel real
   (perfil e Reels precisam ser públicos).

## Adicionar um artigo
Em `articles`, um item com `slug`, `category` (`geral|gestacao|incontinencia|dor|intimidade`), `date`, `cover`
(ou `null`) e `i18n` com **pt, en e es** (`title`, `summary`, `body`, `seoTitle?`, `seoDescription?`).
No `body`, uma linha começando com `## ` vira subtítulo. **`approved: true` só depois da aprovação da Samara**
(conteúdo clínico). Cada artigo gera `/conteudos/<slug>/`, `/en/...` e `/es/...`, com canonical, hreflang,
sitemap e JSON-LD `Article`.

## Adicionar avaliações do Google
Em `reviews`, copie o texto **original** (sem editar nem traduzir), com `author` como a pessoa autorizou,
`date`, `lang`, `rating?`, `url?` e `authorized: true` **somente com autorização documentada** da pessoa.
Preencha `googleProfileUrl` para exibir "Ver avaliações no Google". Sem avaliações, a seção some (ou vira só
esse link). O site **nunca** emite dados estruturados de avaliação/estrelas (o Google não aceita
marcação própria de avaliações e isso evita qualquer dado falso). Respeite as normas do CREFITO/CFM sobre
publicidade em saúde: sem promessa de resultado, sem antes/depois.

## Fotografia profissional
Já integrada (componente `Photo`): `hero`, `portrait` e `office` em `site.images`, como em `docs/IMAGES.md`.
Falta apenas receber as fotos reais da Samara.

## Publicações do Instagram (`/p/`)
`posts` em `src/config/content.ts` guarda publicações normais (imagem, carrossel ou vídeo; o tipo não é
assumido). Cada item é só `{ id, url, cover }`: o site NÃO inventa título, legenda ou data, e mostra
"Publicação 1/2/3" com o link original (mantenha `?img_index=` se existir). Sem capa, o card é neutro.
O embed (`/p/<código>/embed/`) só carrega após o clique, um card por vez. Para uma capa autorizada:
`npm run images -- capa.jpg post-1 --alt="..."` e cole o bloco em `cover` (proporção 4:5).

## Avaliações do Google
Ver `docs/REVIEWS.md` (fluxo manual, regras e API). As avaliações fictícias foram removidas em 15/11/2026.

## Cadastro único das 3 publicações (Apify)
Os dados (legenda, data, tipo) e as capas das 3 publicações foram extraídos uma vez com o Apify (Instagram
Scraper, plano gratuito) e gravados em `posts`; as capas ficam em `public/images/ig-post-*`. Não há token nem
Cron no site. Para um post novo: rode o actor com a URL, baixe a imagem logo (o link expira em dias),
`npm run images -- arquivo ig-post-4 --alt=""` e acrescente o item em `posts`. Comentários de terceiros não são guardados.
