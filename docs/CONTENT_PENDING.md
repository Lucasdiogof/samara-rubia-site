# Conteúdo pendente para o lançamento

Tudo abaixo é editado em **`src/config/site.ts`** (dados) ou nos arquivos de `src/content/` (textos).
Enquanto o item for `null`, o site omite a informação ou desativa o recurso. Nada foi inventado.

## Dados profissionais (`src/config/site.ts`)

| Dado                                | Campo                              | Efeito enquanto pendente                                                  |
| ----------------------------------- | ---------------------------------- | ------------------------------------------------------------------------- |
| Nome profissional completo          | `professionalName`                 | usa "Samara Rúbia"; sem JSON-LD de pessoa                                 |
| CREFITO                             | `crefito`                          | omitido do rodapé                                                         |
| WhatsApp (somente dígitos, DDI 55)  | `contact.whatsapp`                 | CTAs levam a `/contato/`; botão flutuante oculto; página de contato avisa |
| Instagram (usuário sem @)           | `contact.instagram`                | omitido                                                                   |
| Cidade / região                     | `location.city`, `location.region` | seção Localização mostra aviso                                            |
| Endereço                            | `location.address`                 | omitido; sem JSON-LD de negócio local                                     |
| Link do Google Maps                 | `location.mapsUrl`                 | omitido                                                                   |
| Horários                            | `location.hours`                   | omitido                                                                   |
| Modalidade (presencial/online)      | `location.modality`                | omitida                                                                   |
| Biografia                           | `bio.summary`                      | texto genérico provisório (revisar!)                                      |
| Formação e especializações          | `bio.education`                    | bloco omitido                                                             |
| Foto principal                      | `images.portrait`                  | composição gráfica abstrata                                               |
| Fotos do consultório                | `images.office`                    | ainda não exibidas                                                        |
| Convênios / depoimentos autorizados | —                                  | não implementados (só entram se houver autorização)                       |

## Conteúdo a validar clinicamente (Samara)

Marque em `site.approved` ao aprovar. Enquanto `false`, a página mostra o aviso "versão de revisão".

- `approved.services`: lista de áreas de atuação (`src/content/services.ts`). **Remova de `enabledServices` o que ela não atende.** Os textos descrevem áreas educativas e não afirmam que a Samara oferece cada serviço.
- `approved.faq`: perguntas e respostas (`src/content/faq.ts`).
- `approved.about`: página Sobre; a história profissional hoje é um texto provisório.
- `approved.privacy`: política de privacidade, que precisa de identificação do responsável pelo tratamento e validação jurídica.
- Jornada de atendimento e diferenciais (`src/content/journey.ts`): confirmar que refletem a prática real.
- Mensagem padrão do WhatsApp (`whatsappMessage`).

## Antes de abrir para o Google

1. Definir o domínio final e `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph).
2. Definir `NEXT_PUBLIC_INDEXABLE=true` somente após aprovação de todo o conteúdo.
3. Inserir fotos reais (otimizadas, com `alt` apropriado) e uma imagem Open Graph.
4. Rodar o checklist de publicação em `docs/DOCUMENTATION.md`.
5. Conferir normas do COFFITO/CREFITO para divulgação profissional.
