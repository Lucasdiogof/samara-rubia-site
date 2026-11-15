# Checklist de lançamento

Tudo é editado em **`src/config/site.ts`** (dados e flags) ou em `src/content/` (textos). Enquanto um campo
estiver vazio (`null`, `[]`), o site omite a informação ou mostra "A confirmar". Nada foi inventado.
Fotos: [`IMAGES.md`](IMAGES.md). Estado atual: versão de revisão, **`noindex` ativo**, `approved.*` = `false`.

## 1. Obrigatórios para lançamento

Sem estes itens o site não deve ser divulgado como definitivo.

### Informações da Samara

- [ ] Nome profissional completo (`professionalName`)
- [x] **CREFITO** 338376-F (confirmado pelo dono em 15/11, corrigindo o 3383766-F de 27/10)
- [x] **WhatsApp** 5562982388209 (NEXT_PUBLIC_WHATSAPP em .env.production): CTAs, botão flutuante e mensagem pronta ativos
- [x] Cidade e região (Goiânia, GO)
- [x] Endereço (La Femme Consultórios, Rua 1123, nº 359, Quadra 220, Setor Marista, Goiânia – GO) e "Como chegar" no Google Maps. Faltam: sala, estacionamento, convênios
- [x] Modalidades: presencial e online (`location.modalities`)
- [x] Horários: 07:30–18:00, segunda a sexta (`location.hours` + texto `hoursNote`)
- [x] Biografia/apresentação (texto dela, 4 parágrafos)
- [ ] Formação (`bio.education`), com instituição e ano, apenas o que for verificável

### Conteúdo clínico: aprovação profissional (marque em `site.approved` ao aprovar)

- [ ] **Tratamentos (`approved.services`)**: conferir os 8 cadastrados em `src/content/services.ts` e **remover de `enabledServices` o que a Samara não atende**. Os textos são educativos e não afirmam oferta de serviço, mas precisam de validação clínica
- [ ] **Perguntas frequentes (`approved.faq`)**: validar clinicamente `src/content/faq.ts` (inclui respostas sobre dor/consentimento, encaminhamento e sessões)
- [ ] **Sobre (`approved.about`)**: história profissional, abordagem e fotos
- [ ] **Jornada e diferenciais** (`src/content/journey.ts`): confirmar que descrevem a prática real
- [ ] **Mensagem do WhatsApp** (`waMessage` em `src/i18n/config.ts`, pt/en/es): confirmar os textos
- [ ] Conferir as normas do COFFITO/CREFITO para divulgação (sem promessa de resultado, sem "antes e depois" sem autorização)

### Política de privacidade (`approved.privacy`)

- [ ] Identificar o responsável pelo tratamento e o canal para solicitações de titulares (LGPD)
- [ ] Revisão jurídica do texto preliminar em `src/app/privacidade/page.tsx`
- [ ] Reconfirmar o texto se algum analytics, formulário ou rastreador for adicionado no futuro (hoje não há)

### Fotos mínimas

- [ ] Foto principal do hero (4:5) e retrato para "Sobre" (3:4). Detalhes e passo a passo em `IMAGES.md`
- [ ] Autorização de uso de imagem assinada por quem aparecer

### Domínio, SEO e indexação (somente depois de todos os itens acima)

- [ ] Definir o domínio final e apontá-lo ao Worker (painel Cloudflare: Settings → Domains & Routes → Custom domain)
- [ ] Atualizar `NEXT_PUBLIC_SITE_URL` em `.env.production` (canonical, sitemap, Open Graph)
- [ ] Definir `NEXT_PUBLIC_INDEXABLE=true` em `.env.production` **somente após a aprovação final**
- [ ] `npm run check`, publicar, e conferir `robots.txt` (sem `Disallow: /`), `sitemap.xml` e ausência de `noindex`
- [ ] Rodar `BASE_URL=https://dominio npm run test:e2e`; validar dados estruturados (Rich Results Test)
- [ ] Enviar o sitemap ao Google Search Console

## 2. Recomendados

Melhoram a apresentação, mas não impedem o lançamento.

- [x] Instagram @samara.rubiaa
- [ ] Fotos do consultório, de 1 a 4, 3:2 (`images.office`), que ativam a galeria na página Sobre
- [ ] Especializações (`bio.specializations`), cursos e qualificações (`bio.courses`)
- [ ] Parágrafos sobre a abordagem profissional (`bio.approach`)
- [ ] Convênios aceitos (`insurance`), se aplicável; vazio = não é exibido
- [ ] Imagem para compartilhamento social (Open Graph) com a identidade do site
- [ ] Revisar o tom dos textos com a voz da Samara (primeira pessoa, expressões próprias)
- [ ] Ajustar `src/content/services.ts` com exemplos reais de situações que ela atende

## 3. Opcionais/futuros

- [ ] Blog/artigos revisados (estrutura pronta em `docs/templates/articles/`; passo a passo em `DOCUMENTATION.md`)
- [ ] Depoimentos, **somente com autorização escrita** e conformidade com o COFFITO
- [ ] Mensuração de cliques nos CTAs (o evento `site:cta` já é emitido; falta escolher a ferramenta, respeitando a LGPD e atualizando a política de privacidade)
- [ ] Páginas de SEO local por cidade, apenas para cidades onde ela realmente atende
- [ ] Vídeo curto de apresentação (sem autoplay)
- [ ] Samara revisar o inglês (`src/i18n/en.ts`) e o espanhol (`src/i18n/es.ts`): são rascunhos, e o conteúdo é de saúde
