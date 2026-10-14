# Bistrô Sabor&Magia

Site institucional do Bistrô Sabor&Magia, na Praia de Camburí, São Sebastião – SP.

Site estático em HTML, CSS e JavaScript, sem dependências nem etapa de build.

## Estrutura

- `index.html` — estrutura da página
- `assets/css/styles.css` — estilos (tokens de cor e tipografia no `:root`)
- `assets/js/main.js` — preenche a página a partir dos dados
- `assets/img/` — fotos do bistrô
- `data/conteudo.js` — **todo o conteúdo editável**: horários, cardápio, serviços, avaliações, endereço, contatos e fotos

## Como atualizar o conteúdo

Edite apenas `data/conteudo.js`. Campos com `null` ficam ocultos no site; seções opcionais têm `ativo: true/false`.
Preencha telefone, WhatsApp, redes sociais e reservas somente com informações confirmadas pelo restaurante.

## Como visualizar

Abra `index.html` no navegador ou publique a pasta em qualquer hospedagem de site estático (por exemplo, GitHub Pages).
