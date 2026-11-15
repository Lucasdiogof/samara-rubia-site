# Mensuração e tráfego pago (sem campanhas)

Hoje o site **não carrega nenhum script de analytics ou anúncios** (a política de privacidade diz isso).
Cada CTA dispara só `window` event `site:cta` com o nome do botão (`floating`, `hero`...), sem dados pessoais.

Regras antes de ligar qualquer ferramenta (GA4, Google Ads, Meta):
- Só contar cliques em WhatsApp/agendar e visualização de página. Nunca enviar respostas do questionário
  (`SignalsQuiz`), sintomas, áreas de interesse clicadas nem o texto da mensagem do WhatsApp.
- Sem remarketing/públicos baseados em páginas de condição de saúde.
- Carregar a tag só após consentimento (banner) e atualizar `src/app/privacidade/page.tsx`.
- Precisa dos IDs (tag Google, pixel) e de revisão jurídica: pendentes com o dono.
