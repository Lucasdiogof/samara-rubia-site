# Avaliações do Google — regras e fluxo

Estado (15/11/2026): **nenhuma avaliação publicada**. As fictícias foram removidas do código, do build e do
`.env.production`. A seção só aparece com avaliações reais em `reviews` (`src/config/content.ts`); sem elas e
sem `googleProfileUrl`, some. Com o link do perfil, vira só o link "Ver avaliações no Google".

## Perfil (identificado em 15/11/2026)
"Samara Rúbia - Fisioterapia Pélvica", Goiânia (kgmid /g/11nvh9twcg, CID 2387843673426098565), nota 5,0 e 6 avaliações.
Link oficial da Samara: https://share.google/0U02eVQQcknDOJqB7. Configurados em `src/config/content.ts`
(`googleProfileUrl`, `googleShareUrl`, `googleRating`) e em `sameAs` dos dados estruturados. A nota e a
contagem são **manuais**: ao conferir o perfil, atualizar `googleRating` (valor, total, data).

## Perfil correto (histórico)
O perfil é o do **atendimento da Samara Rúbia** no Google Maps, não o da La Femme Consultórios (o local).
Falta a Samara enviar o link do perfil (Google Maps → Compartilhar → link curto, ou o link "Ver todas as
avaliações"). Colar em `googleProfileUrl`. Nunca usar scraping.

## Regras de publicação
- Só 5 estrelas (o código filtra `rating === 5`) e só com `authorized: true`.
- Autorização escrita de quem escreveu (print de WhatsApp/e-mail), guardada fora do repositório.
- Texto original, sem editar nem traduzir; `author` como a pessoa autorizou (ex.: "Maria S."); `date`; `url` se houver.
- O site informa que são avaliações **selecionadas**. Sem dados estruturados de avaliação (o Google não aceita
  avaliações próprias selecionadas em rich results).

## Fluxo manual (mensal ou quando a Samara quiser)
1. A Samara abre o perfil e copia as avaliações novas de 5 estrelas que quer exibir.
2. Pede autorização ao autor e guarda a prova.
3. Adicionar item em `reviews`; remover o que o autor apagou/editou no Google.
4. `npm run deploy`.

## Google Business Profile API (investigação)
A leitura (`accounts.locations.reviews.list`) existe, mas exige: acesso aprovado à API (formulário de
solicitação ao Google, análise manual), projeto no Google Cloud, OAuth do **proprietário/gerente** do perfil
e refresh token guardado como secret. Os Termos limitam armazenar e republicar o conteúdo. Sem esse acesso
aprovado não há rotina automática possível; o único agendador viável seria Cloudflare Cron Trigger ou GitHub
Actions (ambos gratuitos), rodando só para **avisar** (detectar avaliações novas/editadas/removidas) e não
para publicar sozinho. Nada disso foi configurado: depende da Samara (acesso ao perfil) e da aprovação do Google.

## Carrossel (15/11/2026)
Todas as avaliações de `reviews` com `authorized: true` e 5 estrelas entram no carrossel (sem limite), com 3 cards no
desktop, 2 no tablet e 1 + parte do próximo no celular. Setas, arrastar (toque e mouse), indicadores. Estrelas
douradas, nome autorizado, texto original, data e "Avaliação no Google". Sem avaliações, a seção mostra só a nota,
o total e o botão. O título e o texto não dizem "selecionadas".

## API oficial: o que se sabe (pesquisa de 15/11/2026, confirmar na documentação do Google)
- Acesso: formulário de solicitação da Business Profile API (análise do Google, prazo informado de ~14 dias),
  concedido por projeto do Google Cloud; além disso a conta autenticada precisa ter acesso ao perfil da Samara.
- Leitura de avaliações: endpoint `mybusiness.googleapis.com/v4/accounts/{a}/locations/{l}/reviews` (ainda v4).
- Termos: valem os Termos Adicionais e as Políticas das APIs do Business Profile; o Google pode auditar o uso.
  Não achei regra explícita sobre guardar avaliações, então a conduta segura é: só ler, não guardar o que não for
  autorizado e exibir somente o que o autor autorizou.
- Plano sem custo: Cloudflare Cron Trigger semanal no Worker (gratuito), com o refresh token como secret, que apenas
  **compara** com `reviews` e avisa sobre novas, editadas e removidas. A publicação continua manual.
- Bloqueio: precisa da Samara (dona do perfil) para autorizar o OAuth e para pedir/obter o acesso à API.

## Rotina semanal (15/11/2026)
Sem acesso à API, a rotina possível e gratuita é um **lembrete**: `.github/workflows/avaliacoes-lembrete.yml` abre
toda segunda uma issue neste repositório com o passo a passo manual. Não lê o Google nem guarda credenciais.
Pendência: o perfil mostra 6 avaliações, mas só 5 aparecem sem login no Google; a 6ª precisa ser vista por quem
tem login (a Samara) e, se for de 5 estrelas e autorizada, cadastrada em `reviews`.
