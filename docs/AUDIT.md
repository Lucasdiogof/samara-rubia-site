# Auditoria de refinamento (25/10/2026)

## 1. Performance e LCP

**Método.** Lighthouse 12, perfil mobile padrão (4G simulado, CPU 4x), contra a URL publicada, Chrome real em
headless. Script: `/tmp/lh/multi.sh` (não versionado), que repete N execuções e calcula mediana, mínimo e máximo.

**Achado 1: ruído do ambiente de medição, não do site.** Com o Chrome padrão, o primeiro paint observado saltava
entre ~0,26 s, ~1,3 s e ~2,3 s, de forma quantizada em múltiplos de ~1 s. O mesmo ocorreu em uma página de teste
sem JavaScript e sem fontes (observado 0,69–2,5 s), e não ocorreu em `example.com`. Com `--disable-gpu
--disable-frame-rate-limit` o primeiro paint ficou estável em ~0,27 s. Conclusão: a produção de quadros do Chrome
headless com GPU, neste computador, gera atrasos de ~1 s que o Lighthouse incorpora ao cálculo simulado. Por isso a
medição "padrão" (Performance 77–98, LCP 2,3–4,1 s) não era repetível. Todas as medições abaixo usam os flags
estáveis.

**Achado 2: o que realmente pesa no LCP simulado** (variantes publicadas em Workers temporários, depois apagados):

Observação: estas variantes foram medidas ainda com o Chrome padrão (ruidoso, ver achado 1), então valem como ordem de grandeza, não como comparação precisa.

| Variante (5–6 execuções)        | LCP mediana                          | Performance mediana |
| ------------------------------- | ------------------------------------ | ------------------- |
| Site completo (antes)           | 3,08 s (2,27–4,12) com Chrome padrão | 91 (83–98)          |
| Sem JavaScript                  | 1,97 s                               | 99                  |
| Sem JavaScript e sem fontes web | 1,21 s                               | 100                 |
| Sem GSAP                        | 3,06 s                               | 91                  |
| Sem script de boot              | 3,87 s                               | 87                  |

- Fontes web (3 arquivos woff2, ~100 KB) custam ~0,6–0,8 s no LCP simulado, porque o texto do hero só é pintado
  depois delas. Mantive Cormorant Garamond e `font-display: swap`; trocar por `optional` ou fonte de sistema
  eliminaria esse custo, mas degradaria a tipografia na primeira visita, então não foi feito.
- JavaScript de hidratação (React/Next, ~210 KB) custa ~0,9 s adicionais. O GSAP não é o problema (removê-lo não
  mudou a mediana) e já carrega em ociosidade.
- A animação do título (CSS) e o CSS crítico não são gargalo: o CSS é um único arquivo de 9 KB, sem bloqueios
  além dele (`render-blocking-resources`: 0 ms de economia).

**Otimizações aplicadas:** `LazyMotion` (recursos do Motion carregados depois da hidratação; troca `motion` por
`m`); GSAP em `requestIdleCallback`; fontes reduzidas (Cormorant sem peso 600); animação do hero em CSS puro com
início parcialmente visível; regra de estado oculto restrita a `[data-reveal="lines"]` (o hero nunca depende de JS).
O efeito individual de `LazyMotion` ficou dentro do ruído.

**Resultado final** (7 execuções mobile, mesmas condições, URL publicada):

| Métrica      | Mediana | Mínimo | Máximo |
| ------------ | ------- | ------ | ------ |
| Performance  | 96      | 93     | 99     |
| LCP simulado | 2,72 s  | 2,11 s | 3,21 s |
| FCP simulado | 1,07 s  | 1,06 s | 1,10 s |

Referência "antes" nas mesmas condições estáveis (5 execuções): Performance 98 (94–100), LCP 2,27 s (1,56–2,92).
As duas séries são estatisticamente equivalentes (sobrepõem-se; n pequeno); **não houve ganho mensurável** com as
otimizações de JS, e o resultado não deve ser apresentado como melhora. Desktop (3 execuções): Performance 100,
LCP 0,57–0,74 s.

**Meta não atingida de forma consistente:** Performance acima de 90 foi atingida em todas as execuções
(mínimo 93), mas o LCP simulado de 2,5 s não: mediana 2,72 s. Motivo real: a cadeia HTML → CSS → fontes web →
hidratação, com CPU simulada 4x mais lenta, e o texto do hero (fonte do título) como elemento LCP. O LCP
_observado_ (sem simulação) fica em 0,33–0,51 s. Para chegar a ≤ 2,5 s de forma estável seria preciso abrir mão
da fonte do título no primeiro paint ou eliminar a hidratação (site sem React), o que foge do escopo.

## 2. Acessibilidade

- Lighthouse Accessibility: 100 (mobile e desktop). Best Practices 96. SEO 66 por `is-crawlable`, único item
  reprovado, de propósito (noindex da versão de revisão).
- axe-core (WCAG 2.0/2.1/2.2 A e AA + best practices) em 8 rotas: 0 violações.
- Problemas encontrados e corrigidos: contraste das etapas "apagadas" da jornada (opacidade) → agora só o marcador
  muda de estado; contraste do rótulo "Próximo passo" (areia sobre cacau); contraste dos numerais (taupe); nome
  acessível do logotipo diferente do texto visível; salto de heading na introdução; menu mobile sem armadilha
  de foco.
- Menu mobile: foco vai ao primeiro link, Tab/Shift+Tab ciclam dentro do cabeçalho, conteúdo e rodapé ficam
  `inert`, Esc fecha e devolve o foco ao botão. Acordeão operável por Enter e Espaço.
- Não executado: teste com leitor de tela real (NVDA/VoiceOver não disponíveis neste ambiente).

## 3. Animações verificadas (Playwright + inspeção no navegador)

Entrada do hero (CSS), reveals e stagger (GSAP/ScrollTrigger), `ScrubText`, storytelling da jornada, parallax
(≥768 px), hover/tap (Motion), menu mobile, acordeão, navegação entre páginas (sem erros de console; `MotionRoot`
refaz e reverte o `gsap.context` a cada rota), `prefers-reduced-motion` (nada oculto, sem transformações) e JS
desligado (todo o conteúdo visível; FAQ legível via `<noscript>`). Após rolar a página inteira nenhum
`[data-reveal]` permanece com opacidade < 0,95.

## 4. Contatos e conteúdo provisório

Sem WhatsApp configurado, nenhum CTA promete agendamento: o rótulo vira "Canais de contato", o CTA final e a
faixa das páginas internas dizem que os canais estão em preparação, e a página de contato explica o estado.
Jornada, FAQ e privacidade citam o WhatsApp como canal "previsto". As flags `site.approved.*` seguem `false`.

## 5. Comparação com a referência (Clínica Elara)

Estrutura observada: página única com âncoras (Serviços, Como funciona, Clínica, Equipe, Onde estamos, Dúvidas),
CTA de WhatsApp em todo bloco, números de prática, logotipos de convênios, depoimentos, equipe, endereço com mapa,
FAQ com dúvidas práticas (dor, exame, encaminhamento, convênio) e jornada curta de 3 passos.

Aproveitado (sem copiar identidade, textos ou imagens): FAQ com dúvidas práticas de paciente (dor/constrangimento,
encaminhamento, modalidade/valores/convênios); linha de confiança no hero (etapas explicadas, sigilo, para homens
e mulheres); jornada curta e visual; CTA recorrente.

Deliberadamente **não** adotado: números de atendimentos, avaliações, depoimentos, logotipos de convênios, equipe
e fotos (não há dados reais e inventar seria antiético); âncoras de página única (o site multipágina é melhor
para SEO por tema); carrossel ou cards extras. Quando a Samara fornecer dados reais, vale incluir: endereço e
mapa, horários, modalidade, valores/convênios (se aplicável) e, só com autorização escrita, depoimentos.
