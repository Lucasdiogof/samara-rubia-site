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
