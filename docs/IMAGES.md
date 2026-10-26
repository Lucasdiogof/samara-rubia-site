# Fotografias: como preparar e trocar

Enquanto não houver fotos reais, o site usa composições gráficas. Para trocar, basta gerar os arquivos e
colar um bloco em `src/config/site.ts` (`images`). Nenhum componente precisa ser editado.

## O que pedir à fotógrafa/à Samara

| Slot (`site.images.…`) | Onde aparece                          | Proporção ideal                                                          | Largura mínima do original | Observações                                                             |
| ---------------------- | ------------------------------------- | ------------------------------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------- |
| `hero`                 | topo da home, dentro de um arco       | **4:5 vertical**                                                         | 1600 px (ideal 2400)       | rosto no terço superior; deixe ar acima da cabeça (o arco corta o topo) |
| `portrait`             | seção "Sobre" da home e página Sobre  | **3:4 vertical**                                                         | 1400 px (ideal 2000)       | pode ser outra foto, com expressão mais descontraída                    |
| `office` (1 a 4)       | galeria "Consultório" na página Sobre | **3:2 horizontal** (a 1ª é a principal; as demais são recortadas em 4:5) | 2000 px                    | luz natural, sem pessoas identificáveis sem autorização                 |

Enviar o **arquivo original da câmera** (JPG ou PNG de alta qualidade; se vier em HEIC do iPhone, exporte para JPG antes), não capturas do WhatsApp.
Autorização de uso de imagem por escrito para qualquer pessoa que apareça. Sem fotos de pacientes.

## Passo a passo

```bash
npm run images -- C:\fotos\samara-hero.jpg hero --focal=50,30 --alt="Samara sorrindo, de jaleco, no consultório"
```

O script:

1. aplica a orientação EXIF e **remove os metadados** (inclusive localização GPS);
2. gera 480, 768, 1080, 1600 e 2200 px (só até o tamanho do original) em **AVIF, WebP e JPG** em `public/images/`;
3. imprime o bloco de configuração. Cole em `site.ts`, por exemplo:

```ts
images: {
  hero: { name: "hero", alt: "…", width: 2400, height: 3000, widths: [480, 768, 1080, 1600, 2200], focal: { x: 50, y: 30 } },
  portrait: null,
  office: [],
},
```

Depois: `npm run check` (lint, tipos, build) e `npm run deploy`.

## Como o site usa a imagem

- **Sem distorção:** o contêiner define a proporção (`aspect-ratio`) e a foto usa `object-fit: cover`.
  O corte muda entre celular e desktop, mas nunca estica.
- **Ponto focal:** `focal: { x, y }` em % controla o `object-position`. Rosto em y entre 25 e 35 costuma
  funcionar; ajuste se o corte tirar o rosto.
- **Sem deslocamento de layout:** `width`/`height` reais e contêiner com proporção fixa (CLS medido: 0).
- **Carregamento:** a imagem do hero carrega com `fetchpriority="high"`; as demais são `lazy`.
  `sizes` reflete o tamanho real no layout, então o navegador baixa só o necessário.
- **Alt text:** obrigatório e específico, descrevendo a cena (sem "foto de"/"imagem de").
- **Animações:** a revelação por máscara e o parallax continuam funcionando com fotos; o parallax só
  atua em telas largas e a foto é ampliada 20% na altura para não deixar bordas vazias.

## Verificação feita (25/10/2026)

Com imagens sintéticas (abstratas, sem pessoas) em todos os slots: AVIF servido, tamanhos corretos em 390 e
1440 px, CLS 0, sem overflow, recorte correto no arco. As imagens de teste foram removidas.
