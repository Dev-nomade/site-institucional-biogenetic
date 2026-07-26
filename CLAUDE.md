# CLAUDE.md — Contexto do Projeto: Site Institucional Bio Genétic (UC15)

Este arquivo é lido automaticamente pelo Claude Code no início de cada sessão e
durante o Plan Mode. Ele contém as regras e decisões já travadas com a aluna
(Janaina Figueiredo da Silva) em sessões anteriores com o Dimmy (assistente no
Claude.ai). **Não reabra nenhuma decisão marcada como travada sem perguntar
primeiro.**

## Regra de trabalho obrigatória
- **Sempre entre em Plan Mode antes de qualquer alteração que toque mais de um
  arquivo, mude estrutura, cores, tipografia, conteúdo de negócio (preços,
  horários, dados de contato) ou comportamento do formulário.**
- Edições de uma linha, correções de bug isoladas e ajustes puramente
  estéticos sem mudança de decisão podem ser feitas direto, sem plano.
- Se uma tarefa pedir para mudar algo marcado como "decisão travada" abaixo,
  pare e pergunte à aluna antes de planejar ou executar.

## O que é este projeto
Site institucional (landing page) da academia fictícia **Bio Genétic**,
desenvolvido pela aluna como UC15 do Projeto Integrador (Técnico em
Informática, Senac Osasco). Empresa fictícia de desenvolvimento: **Vórtice**.

## Escopo — o que este site NÃO é
- **100% estático.** Sem back-end, sem banco de dados, sem CMS.
- **Sem CRUD.** CRUD é requisito da UC10 (banco) e UC12 (Desktop), já
  entregues em outro projeto — não duplicar aqui.
- **Separado do sistema Web (UC13).** Não compartilha código, banco ou
  autenticação com ele.
- Formulário de contato é **decorativo**: valida no JS, nunca envia de
  verdade. Isso é intencional, não é bug.

## Decisões de design travadas (não alterar sem autorização)
- **Paleta invertida só nesta UC15:** fundo `#F8F8F8`, elementos `#051f20`.
  As demais partes do projeto (UC12 Desktop, UC13 Web, Figma da UC14) usam a
  paleta oficial ao contrário (fundo `#051f20` / elementos `#F8F8F8`) e **não
  devem ser tocadas por este projeto**.
- **Rodapé escuro** (`#051f20` com texto `#F8F8F8`) — funciona como
  "fechamento" contrastante de cada página. Não é o único bloco escuro do
  site: a seção `.estrutura` da Home (carrossel de fotos) também usa
  `#051f20` como painel de fundo, decisão explícita da aluna. Os dois nunca
  ficam colados — sempre há respiro com o fundo claro `#F8F8F8` entre um
  bloco escuro e outro.
- **Tipografia:** Sora (títulos/headlines) · Poppins (corpo e botões) · Inter
  (só elementos utilitários: rótulos de formulário, rodapé/copyright).
  Pesos realmente usados hoje (import enxuto, sem peso órfão): Sora 600 ·
  Poppins 400/500/700 · Inter 400/500.
- **Breakpoints gerais:** mobile ≤767px, tablet 768–1024px, desktop >1024px.
- **Exceção do menu hambúrguer:** ativo em mobile **e** tablet (<1024px). Nav
  completo só aparece em desktop (>1024px). Isso é diferente do breakpoint
  geral acima, de propósito.
- **Referências de estilo (não copiar conteúdo/imagens, só estrutura):**
  Bio Ritmo (hero em foto cheia, blocos alternados foto/texto, cards de
  modalidade com foto) e Equinox (nav com CTA destacado, rodapé
  multi-coluna).
- **Piso mínimo de opacidade para texto secundário: 0,65** (não usar 0,6 ou
  menos) — auditoria de contraste WCAG AA encontrou falha real em 0,6
  (4,48:1, abaixo do mínimo de 4,5:1). Em 0,65 o resultado fica entre 5,27:1
  e 6,49:1 dependendo do par de cores, sempre seguro — reconfirmado em
  2026-07 testando os 9 pares de texto secundário do site num navegador real.
- **Botões e áreas de toque: mínimo 44×44px** (WCAG — tamanho de toque).
  Onde o alvo visual é menor que isso por decisão de design (links de texto
  do menu/rodapé, logo do cabeçalho), a área de toque é ampliada de forma
  invisível (pseudo-elemento `::before` absolutamente posicionado) em vez de
  aumentar o elemento visível — técnica usada em `.nav__links a`,
  `.footer__grid a` e `.nav__logo`.

## Estrutura de pastas e arquivos
```
site_institucional_biogenetic/
├── CLAUDE.md
├── html/
│   ├── index.html          → Home (Hero + Sobre integrada: Missão/Visão/Valores + Estrutura)
│   ├── planos.html         → Planos (SEM mídia nenhuma — decisão travada)
│   ├── modalidades.html    → Modalidades (hero + grade de horários estilo calendário)
│   ├── cardapio.html       → Cardápio (SEM mídia nenhuma — decisão travada)
│   └── contato.html        → Contato (imagem de fundo + formulário sobreposto)
├── css/
│   ├── estilo.css            → reset, nav, botões, cards, rodapé, tipografia, layout por página
│   └── estrutura-midia.css   → variáveis de espaçamento/dimensão/cor + estrutura de mídia por página
├── js/
│   └── script.js            → vídeo de fundo, menu hambúrguer, validação do formulário, carrossel
├── img/                      → mídia real já selecionada (11 fotos: sobre, estrutura, hero de modalidades, contato)
└── midia/
    └── video_hero.mp4        → vídeo de fundo do hero da Home
```
Não há build/templating: cabeçalho, rodapé e os dois logos em SVG são
duplicados manualmente, byte a byte, nos 5 arquivos HTML — mudança em um
desses blocos precisa ser replicada nos outros 4.

## Conteúdo de negócio (não inventar — já está definido)
- **Planos:** Diário R$99,90 (1 dia) · Mensal R$139,90 (30 dias) ·
  Trimestral R$399,90 (90 dias) · Anual R$1.199,90 (365 dias).
- **Modalidades (15):** Pilates, Natação Adulto, Yoga, Full Body, Recovery,
  Muay Thai, Jiu Jitsu, Race, Body Pump, Hot Yoga, Torq, Lower Body, Upper
  Body, Fit Dance, CrossFit. Grade semanal com instrutor por aula já
  definida e auditada contra sobreposição de horário/duração — ver
  `modalidades.html` para os horários e nomes exatos.
- **Cardápio (27 itens, 3 categorias):** Bebidas naturais, Sanduíches leves e
  naturais, Marmitas fitness — todos com preço definido. Ver `cardapio.html`.
- **Contato:** Rua Copacabana, nº 1123 – Jardim Jasmine, São Paulo – CEP:
  01001-505 · (11) 98300-1111 · horários por dia da semana em `contato.html`
  e no rodapé de todas as páginas (bloco "Horário de Funcionamento").
- **Formulário de Contato, 6 campos nesta ordem:** Nome, E-mail, Telefone,
  "Já é aluno?" (radio Sim/Não), Assunto, Mensagem.

## Implementações já feitas (histórico — não refazer do zero)

### Estrutura e conteúdo
- **Carrossel de fotos da seção Estrutura (Home):** 8 fotos reais em
  `.estrutura__carrossel`, setas prev/next (`#estrutura-prev`/`#estrutura-next`),
  legenda com contador ("Recepção · 2/8") que acompanha o slide atual,
  painel de fundo escuro (`#051f20`). Lógica em `js/script.js`.
- **Hero de Modalidades reestruturado:** texto à esquerda (título "Horários
  das Modalidades", endereço, CTA "Matricule-se já") + foto à direita com
  borda vazada, seguindo referência visual aprovada pela aluna.
- **Grade de horários de Modalidades:** grade estilo calendário semanal (9
  horários × 7 dias, 37 aulas no total), substituindo a antiga grade de 15
  cards + tabela simples. Nome da modalidade em maiúsculas e negrito, nome
  do instrutor em negrito. Scroll horizontal sincronizado no mobile via
  `.grade-horarios__scroll`.
- **Rodapé — "Horário de Funcionamento":** coluna adicionada nas 5 páginas,
  texto corrido (não lista), com o mesmo tratamento do parágrafo do bloco
  Estrutura. Grid do rodapé em 5 colunas não-uniformes (`2fr 1fr 1fr 1fr 1fr`)
  para a coluna "Sobre" quebrar em exatamente 2 linhas.
- **Logos em SVG:** wordmark da Bio Genétic adicionado no cabeçalho
  (`.nav__logo`, link para Home) e no rodapé (`.footer__logo`, abaixo da
  coluna Sobre) das 5 páginas.
- **Mídia real:** todas as fotos e o vídeo do hero já foram selecionados
  pela aluna e estão em `img/` e `midia/` — não há mais placeholder
  (`src=""` / `.media--empty`) em nenhuma página.

### Limpeza e consolidação de código
- Auditoria completa de HTML/CSS/JS: removidos CSS morto, classes sem uso
  (`.media--empty`, `.h1_hero`, `.modalidades-hero__info`), variável CSS
  duplicada (`--radius-lg` consolidada em `--radius-md`, único valor de raio
  do site).
- `@import` de fontes do Google enxuto: só os pesos realmente usados em
  algum `font-family` do CSS (Sora 600 · Poppins 400/500/700 · Inter
  400/500) — sem peso órfão.
- Comentários desatualizados corrigidos em `estilo.css`, `estrutura-midia.css`,
  `script.js` e `index.html` (numeração de seção quebrada, referência a uma
  seção "Destaques" que não existe, referência a documentação externa sem
  contexto, jargão de "Etapa N" sem explicação).
- Bug de centralização do botão "ENVIAR" corrigido (`display:flex` +
  `margin-inline:auto` no lugar de `margin-inline:60%` com overflow).

### Testes e correções de acessibilidade/responsividade (2026-07, testado em navegador real via CDP/Chrome headless — não só lido no código)
**Responsividade — aprovada:** hambúrguer só em mobile+tablet (<1024px)
confirmado nos 3 breakpoints; `.home-sobre` e `.modalidades-hero` colapsam
para 1 coluna em ≤767px; grade de horários ganha scroll horizontal no
mobile; nenhuma quebra de layout nas 5 páginas.

**Pontos que já passavam:** contraste de todo texto secundário (5,27:1 a
6,49:1, acima do mínimo AA); foco de teclado visível e ordem de tabulação
correta nas 5 páginas; labels do formulário com nome acessível correto;
botões/setas/hambúrguer com área de toque ≥44×44px.

**Falhas encontradas e corrigidas:**
1. Logo em SVG sem nome acessível → `aria-label` no link do cabeçalho,
   `aria-hidden="true"` no SVG do cabeçalho e no do rodapé (decorativo,
   nome já existe como texto ao lado).
2. Logo do cabeçalho com 36px de largura (abaixo de 44px) → área de toque
   invisível de 44px via `::before`, sem alterar o visual.
3. Links de nav/rodapé com ~21-22px de altura de toque → `min-height:44px`
   no menu (não muda a altura da barra, o logo já era mais alto) e área de
   toque invisível via `::before` no rodapé (não muda a altura do rodapé).
4. Vídeo de fundo da Home ignorava `prefers-reduced-motion` → `script.js`
   agora pausa/retoma o vídeo conforme essa preferência do usuário.
5. `planos.html` pulava de `h1` direto pra `h3` (sem `h2`) → `h2` adicionado
   visualmente oculto (`.sr-only`) antes da grade de planos.
6. `alt=""` numa imagem de conteúdo (hero de `modalidades.html`, não
   decorativa) → alt text descritivo real.
7. Erros do formulário de contato não eram associados aos campos →
   `aria-describedby` ligando cada input ao seu `<span class="form-error">`
   (agora com `id`), e `aria-invalid` setado dinamicamente pelo JS na
   validação.
8. Mensagem de sucesso do formulário não era anunciada por leitor de tela →
   `role="status"` em `.form-success`.
9. Botão hambúrguer mantinha `aria-label="Abrir menu"` mesmo aberto →
   `script.js` alterna entre "Abrir menu"/"Fechar menu" junto com
   `aria-expanded`.
10. Grupo de rádio "Já é aluno?" sem associação formal ao grupo →
    convertido para `<fieldset>/<legend>` (CSS resetado pra manter a
    aparência idêntica à de antes).

## Pendências abertas (perguntar à aluna, não decidir sozinho)
1. **CTAs sem destino real:** 5 botões ainda usam `href="#"` — "Personal
   Training" (`index.html`) e as 4 "Quero esse plano" (`planos.html`). Falta
   saber se já existe URL pública do sistema Web (UC13) pra apontar esses
   CTAs, ou se mantém placeholder até a publicação.
2. **Repositório GitHub Pages:** ainda não existe (pasta local não é um
   repositório git). Será criado pela aluna via Claude Code quando ela
   decidir publicar.

## Primeira ação recomendada ao iniciar
Antes de qualquer mudança, rode um `/plan` para: (1) validar que os 5 HTML +
2 CSS + 1 JS acima existem e abrem sem erro de link quebrado, (2) conferir
se há trabalho não commitado/perdido caso um repositório git já exista, e
(3) listar as 2 pendências abertas acima para a aluna decidir antes de
prosseguir.
