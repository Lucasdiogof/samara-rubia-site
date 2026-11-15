# Avaliações do Google — regras e fluxo

Estado (15/11/2026): **nenhuma avaliação publicada**. As fictícias foram removidas do código, do build e do
`.env.production`. A seção só aparece com avaliações reais em `reviews` (`src/config/content.ts`); sem elas e
sem `googleProfileUrl`, some. Com o link do perfil, vira só o link "Ver avaliações no Google".

## Perfil correto
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
