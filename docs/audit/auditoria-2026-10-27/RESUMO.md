# Auditoria visual de 27/10/2026

Escopo: 7 páginas × 3 idiomas × desktop (1440), tablet (820) e celular (390) × tema claro e escuro (126 capturas de página inteira), mais testes de cada correção.

## Encontrado e corrigido
1. **Menu mobile quebrado** (crítico): com o menu aberto, o `backdrop-blur` do cabeçalho virava o bloco de contenção do painel `fixed`, que ficava com ~2 px de altura (os links não apareciam). Afetava celular e tablet nos 3 idiomas. Corrigido em `Header.tsx`; o teste de menu agora exige altura > 300 px. Ver `menu-mobile_antes-depois.png`.
2. **Links quebrados na página 404**: o seletor de idioma apontava para `/en/nao-encontrada/` e `/es/nao-encontrada/` (cabeçalho e menu mobile = 4 links). Agora, em página inexistente, EN/ES levam à home do idioma (`Controls.tsx`), com teste.
3. **FAQ**: título do grupo desalinhado em ~20 px do primeiro item (`lg:pt-5`). Ver `faq_antes-depois.png`.

## Verificado e sem problema
- Sem rolagem horizontal em nenhuma das 126 combinações.
- Cards do Instagram: o embed oficial carrega e cabe na moldura (altura fixa de 42rem); o vazio visto em capturas era só o carregamento preguiçoso. Nada alterado.
- Contraste/acessibilidade: axe passa em claro e escuro nos 3 idiomas.
- 58 páginas e 1.927 links internos: 0 quebrados.

## Pendente de confirmação
- **CREFITO**: o rodapé mostra `3383766-F` (7 dígitos) e a logo atual traz `338376-F` (6 dígitos). Não alterei; confirmar o número correto.
- **Logo rose gold sobre cacau**: o arquivo da versão escolhida não está no repositório nem no disco (só a versão terracota/creme, `design/brand/src-20.png`). Preciso do arquivo (PNG/SVG de alta resolução) para trocar header, rodapé, favicon, Apple Touch e OG sem redesenhar.
- Moldura (contorno) deslocada atrás da foto do hero: parece intencional (offset de 16 px); deixei como está.
