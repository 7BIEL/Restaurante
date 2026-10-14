/*
 * Conteúdo do site do Bistrô Sabor&Magia
 * ------------------------------------------------------------------
 * Este é o ÚNICO arquivo que precisa ser editado para atualizar
 * horários, serviços, destaque gastronômico, avaliações, contatos e fotos.
 *
 * Regras:
 * - Campos com `null` ficam ocultos no site. Preencha-os somente com
 *   informações confirmadas pelo restaurante.
 * - Para remover uma seção opcional, troque `ativo: true` por `ativo: false`.
 * - Datas no formato AAAA-MM-DD; horários no formato HH:MM (24 horas).
 *
 * Origem dos dados atuais: perfis comerciais consultados em 14/10/2026,
 * informados pelo solicitante. Ainda NÃO confirmados diretamente pelo
 * estabelecimento.
 */
window.CONTEUDO = {
  estabelecimento: {
    nome: "Bistrô Sabor&Magia",
    bairro: "Camburi",
    cidade: "São Sebastião",
    uf: "SP",
    // Slogan usado pelo próprio bistrô (faixa e materiais da casa).
    slogan: "Magia que você sente no paladar",
  },

  /* Texto institucional editável. Substitua pela apresentação oficial do
   * restaurante quando ela for fornecida (história, equipe, proposta). */
  sobre: {
    apresentacao: [
      "O Bistrô Sabor&Magia fica na Praia de Camburí, em São Sebastião, no litoral norte de São Paulo. A casa de madeira, cercada pela mata, recebe moradores e visitantes para almoço e jantar.",
      "Há mesas na varanda e na cobertura, música ao vivo e um ambiente casual e tranquilo, pensado para famílias, grupos e para quem chega sem pressa.",
    ],
    // Atribuído ao perfil comercial — não é uma declaração verificada pelo site.
    notaPerfil:
      "Segundo o perfil comercial do estabelecimento, o Bistrô Sabor&Magia se identifica como uma empresa de empreendedoras.",
  },

  /* Horários — fonte única. `null` em `abre`/`fecha` significa fechado. */
  horarios: {
    fonte: "Horários informados no perfil comercial do bistrô",
    dias: [
      { dia: "Segunda-feira", abre: null, fecha: null },
      { dia: "Terça-feira", abre: null, fecha: null },
      { dia: "Quarta-feira", abre: null, fecha: null },
      { dia: "Quinta-feira", abre: "13:00", fecha: "21:00" },
      { dia: "Sexta-feira", abre: "13:00", fecha: "22:00" },
      { dia: "Sábado", abre: "13:00", fecha: "22:00" },
      { dia: "Domingo", abre: "13:30", fecha: "21:00" },
    ],
    observacao:
      "Horários sujeitos a alteração, inclusive em feriados. Na dúvida, confirme com o restaurante.",
  },

  /* Serviços e comodidades informados no perfil comercial. */
  experiencia: {
    fonte:
      "Características informadas no perfil comercial do estabelecimento. Se algum item for decisivo para a sua visita, confirme com o restaurante.",
    // Destaques visuais. `icone` deve existir no sprite de ícones do index.html.
    destaques: [
      // `faixa: true` também exibe o item na faixa logo abaixo da abertura.
      { icone: "mesa", titulo: "Mesas externas e na cobertura", faixa: true },
      { icone: "musica", titulo: "Música ao vivo", faixa: true },
      { icone: "tela", titulo: "Transmissão de esportes" },
      { icone: "folha", titulo: "Opções vegetarianas", faixa: true },
      { icone: "buffet", titulo: "Serviço de buffet" },
      { icone: "pata", titulo: "Aceita cães, inclusive na área externa", faixa: true },
      { icone: "wifi", titulo: "Wi-Fi gratuito" },
    ],
    grupos: [
      {
        titulo: "Refeições",
        itens: [
          "Almoço e jantar",
          "Refeição no local e para viagem",
          "Serviço de buffet",
          "Sobremesas e porções pequenas",
          "Opções vegetarianas",
        ],
      },
      {
        titulo: "Bebidas e bar",
        itens: [
          "Café",
          "Cerveja, vinho e coquetéis",
          "Bebidas alcoólicas e destilados",
          "Bebidas para happy hour",
          "Bar no local e garçons",
        ],
      },
      {
        titulo: "Ambiente",
        itens: [
          "Casual, tranquilo e atual",
          "Mesas externas e mesas na cobertura",
          "Música ao vivo e transmissão de esportes",
          "Adequado para famílias, grupos, turistas e para quem vai comer sem companhia",
          "O perfil informa que o bistrô acolhe a comunidade LGBTQ+ e é um espaço seguro para pessoas trans",
        ],
      },
      {
        titulo: "Crianças e pets",
        itens: [
          "O perfil indica que é bom para ir com crianças",
          "Cadeirinhas altas e cardápio infantil",
          "Aceita cães, inclusive na área externa",
        ],
      },
      {
        titulo: "Comodidades",
        itens: [
          "Aceita reservas",
          "Wi-Fi gratuito",
          "Banheiro",
          "Estacionamento gratuito no local e na rua",
          "Cartões de crédito e débito",
        ],
      },
    ],
  },

  /* Destaque gastronômico — menção de cliente, não item de cardápio.
   * Para remover a seção, use `ativo: false`. */
  destaquePrato: {
    ativo: true,
    nome: "Risoto de queijo brie com presunto de Parma",
    observacao:
      "Prato recomendado por um cliente em maio de 2026. Consulte o restaurante para confirmar a disponibilidade.",
  },

  /* Cardápio — transcrito da foto do cardápio enviada em 14/10/2026 e
   * confirmado pelo solicitante como atual, com preços em vigor.
   * A foto mostra uma parte do cardápio (sem sobremesas e bebidas).
   * Preços em reais; `precos` aceita um valor único ou porções. */
  cardapio: {
    ativo: true,
    atualizadoEm: "2026-10-14",
    observacao:
      "Preços em reais, sujeitos a alteração sem aviso. Disponibilidade dos pratos pode variar; confirme com a equipe ao fazer o pedido.",
    secoes: [
      {
        titulo: "Entradas",
        itens: [
          { nome: "Bolinho de peixe seco", precos: [{ valor: 34 }] },
          { nome: "Lula à provençal", descricao: "Lula salteada ao alho e ervas.", precos: [{ valor: 55 }] },
          {
            nome: "Ceviche de linguado",
            descricao: "Linguado marinado em caldos cítricos, manga, uva verde, cebola roxa, pimenta dedo-de-moça e chips de batata-doce.",
            precos: [{ valor: 47 }],
          },
          { nome: "Pasteizinhos de camarão com alho-poró", precos: [{ valor: 46 }] },
          { nome: "Pasteizinhos de dois queijos", precos: [{ valor: 34 }] },
          {
            nome: "Dadinho de tapioca com queijo coalho",
            descricao: "Dadinho crocante de tapioca com queijo coalho, servido com geleia de pimenta.",
            precos: [{ valor: 45 }],
          },
          { nome: "Fritas", precos: [{ valor: 34 }] },
          { nome: "Bolinho de costela", descricao: "Bolinho de costela desfiada recheado com muçarela.", precos: [{ valor: 53 }] },
        ],
      },
      {
        titulo: "Pratos triviais",
        nota: "Acompanham arroz, feijão, fritas e salada.",
        itens: [
          { nome: "Frango grelhado", precos: [{ valor: 49 }] },
          { nome: "Peixe (merluza) grelhado", precos: [{ valor: 49 }] },
          { nome: "Carne (contrafilé) grelhada", precos: [{ valor: 49 }] },
        ],
      },
      {
        titulo: "Pratos à la carte",
        itens: [
          {
            nome: "Scalope de filé-mignon ao molho de queijo",
            descricao: "Medalhões de filé-mignon grelhados com molho cremoso de queijos, servidos com arroz branco e fritas.",
            precos: [{ rotulo: "Individual", valor: 96 }, { rotulo: "2 pessoas", valor: 166 }],
          },
          {
            nome: "Medalhão de filé-mignon ao molho Dijon",
            descricao: "Filé-mignon ao delicado molho Dijon, servido com arroz de salsa e purê de abóbora cabotiá.",
            precos: [{ rotulo: "Individual", valor: 118 }, { rotulo: "2 pessoas", valor: 188 }],
          },
          {
            nome: "Filé-mignon à parmegiana",
            descricao: "Filé-mignon empanado ao molho de tomate fresco, gratinado com muçarela, catupiry e parmesão.",
            precos: [{ rotulo: "Individual", valor: 105 }, { rotulo: "2 pessoas", valor: 182 }],
          },
          {
            nome: "Filé de frango à parmegiana",
            descricao: "Filé de frango empanado ao molho de tomate fresco, gratinado com muçarela, catupiry e parmesão.",
            precos: [{ rotulo: "Individual", valor: 85 }, { rotulo: "2 pessoas", valor: 155 }],
          },
        ],
      },
      {
        titulo: "Peixes",
        itens: [
          {
            nome: "Sororoca com vinagrete de abacaxi",
            // Conferir com o restaurante: na foto lê-se "mosseline de abóbora camboja".
            descricao: "Sororoca grelhada com vinagrete de abacaxi, arroz de salsa e musseline de abóbora camboja.",
            precos: [{ rotulo: "Individual", valor: 85 }, { rotulo: "2 pessoas", valor: 148 }],
          },
          {
            nome: "Linguado à moda do chef",
            descricao: "Linguado grelhado com banana-da-terra, molho branco e queijos gratinados, batatas douradas e arroz de brócolis.",
            precos: [{ rotulo: "Individual", valor: 95 }, { rotulo: "2 pessoas", valor: 150 }],
          },
          {
            nome: "Moqueca de linguado e camarão",
            descricao: "Linguado e camarões ao molho de moqueca, arroz de coco e farofa de banana-da-terra.",
            precos: [{ rotulo: "Individual", valor: 111 }, { rotulo: "2 pessoas", valor: 198 }],
          },
          {
            nome: "Strogonoff de camarão",
            descricao: "Camarões ao molho cremoso estilo strogonoff; acompanha arroz e fritas.",
            precos: [{ rotulo: "Individual", valor: 98 }],
          },
        ],
      },
    ],
  },

  /* Avaliações — números exibidos nas plataformas NA DATA DA CONSULTA.
   * Não são atualizados automaticamente. Para remover, use `ativo: false`. */
  avaliacoes: {
    ativo: true,
    consultadoEm: "2026-10-14",
    plataformas: [
      // TODO: substituir pelo nome da plataforma do cadastro comercial, quando confirmado.
      { nome: "Cadastro comercial", nota: 4.8, escala: 5, total: 73 },
      { nome: "Tripadvisor", nota: 5.0, escala: 5, total: 1 },
    ],
  },

  /* Contato — tudo oculto até confirmação do restaurante.
   * Exemplos de preenchimento:
   *   endereco: "Rua Exemplo, 123 – Camburi, São Sebastião – SP, 11600-000"
   *   telefone: { exibicao: "(12) 0000-0000", link: "+551200000000" }
   *   whatsapp: { exibicao: "(12) 90000-0000", link: "5512900000000" }
   *   mapaUrl: "https://…" (link de rota oficial)
   *   redesSociais: [{ nome: "Instagram", url: "https://…" }]
   *   reservas: { instrucao: "Reservas pelo WhatsApp oficial." } */
  contato: {
    // Endereço confirmado pelo solicitante em 14/10/2026.
    endereco: {
      logradouro: "R. Reginaldo Flávio Corrêa, 293",
      bairro: "Praia de Camburí",
      cidade: "São Sebastião",
      uf: "SP",
      cep: "11619-395",
    },
    // Rota no Google Maps a partir do endereço confirmado.
    mapaUrl: "https://www.google.com/maps/search/?api=1&query=R.%20Reginaldo%20Fl%C3%A1vio%20Corr%C3%AAa%2C%20293%20-%20Praia%20de%20Cambur%C3%AD%2C%20S%C3%A3o%20Sebasti%C3%A3o%20-%20SP%2C%2011619-395",
    telefone: null,
    whatsapp: null,
    email: null,
    redesSociais: [],
    reservas: null,
  },

  /* Fotos aprovadas pelo estabelecimento. Enquanto `null`, o site mostra um
   * espaço reservado identificado como tal. Formato:
   *   { src: "assets/img/ambiente.webp", alt: "Descrição real da foto", largura: 1600, altura: 1200 } */
  /* Equipe — texto institucional editável. Nomes só devem ser incluídos
   * com autorização das pessoas retratadas. */
  equipe: {
    titulo: "Quem está na cozinha",
    texto: [
      "Do preparo dos ingredientes ao prato servido à mesa, a cozinha do Sabor&Magia é feita pela equipe da casa.",
    ],
  },

  /* Fotos enviadas pelo solicitante e publicadas pelo próprio bistrô
   * (perfil comercial e Instagram), em 14/10/2026.
   * Formato: { src, alt, largura, altura }. Para remover uma foto, apague o item. */
  fotos: {
    hero: {
      src: "assets/img/hero-noite.jpg",
      alt: "Fachada de madeira do Bistrô Sabor&Magia à noite, com varanda iluminada, cordões de luz e céu estrelado.",
      largura: 1440,
      altura: 1440,
    },
    sobre: [
      {
        src: "assets/img/varanda.jpg",
        alt: "Varanda de madeira do bistrô ao entardecer, com luzes acesas, plantas pendentes e mesas ao fundo.",
        largura: 1000,
        altura: 1000,
      },
      {
        src: "assets/img/placa.jpg",
        alt: "Placa de madeira entalhada com o nome Sabor&Magia Bistrô, pendurada em correntes entre palmeiras e árvores.",
        largura: 800,
        altura: 1061,
      },
    ],
    equipe: [
      {
        src: "assets/img/chefs.jpg",
        alt: "Dois chefs do Bistrô Sabor&Magia sorrindo diante de uma parede de tijolos: uma mulher de dólmã bege e touca preta e um homem de dólmã branco.",
        largura: 900,
        altura: 1194,
      },
      {
        src: "assets/img/chef-prato.jpg",
        alt: "Chef de dólmã bege e bandana estendendo um prato de risoto com camarões na cozinha do bistrô.",
        largura: 800,
        altura: 800,
      },
      {
        src: "assets/img/preparo.jpg",
        alt: "Chef organizando tigelas com ingredientes picados — tomate, pimentão, cebola e cheiro-verde — na bancada da cozinha.",
        largura: 800,
        altura: 853,
      },
    ],
    // Pratos já servidos no bistrô; não substituem o cardápio.
    pratos: [
      { src: "assets/img/massa-frutos-do-mar.jpg", alt: "Massa fresca com camarões, mexilhões, tomates-cereja e salsinha, com queijo ralado ao lado.", largura: 700, altura: 700 },
      { src: "assets/img/strogonoff.jpg", alt: "Strogonoff de camarão servido com arroz branco e batatas fritas em prato quadrado.", largura: 700, altura: 700 },
      { src: "assets/img/espaguete-camarao.jpg", alt: "Ninhos de espaguete ao molho branco com camarões e salsinha.", largura: 700, altura: 700 },
      { src: "assets/img/ravioli.jpg", alt: "Ravióli ao molho de tomate com manjericão em travessa de barro, com queijo ralado ao lado.", largura: 700, altura: 700 },
    ],
    prato: {
      src: "assets/img/risoto.jpg",
      alt: "Risoto cremoso coberto com lascas crocantes de presunto e folhas de manjericão, em prato branco.",
      largura: 335,
      altura: 537,
    },
    // `forma`: "grande" ocupa 2×2 na grade; "alta" ocupa duas linhas.
    galeria: [
      { forma: "grande", src: "assets/img/fachada.jpg", alt: "Fachada do bistrô ao entardecer, com a varanda iluminada, a torre de madeira e a mata ao fundo.", largura: 1000, altura: 1000 },
      { src: "assets/img/lousa.jpg", alt: "Lousa de giz com o nome Bistrô Sabor & Magia escrito à mão.", largura: 700, altura: 700 },
      { forma: "alta", src: "assets/img/cozinha.jpg", alt: "Foto em preto e branco de dois chefs trabalhando na cozinha, diante de um painel de azulejos pintados.", largura: 800, altura: 994 },
      { src: "assets/img/flor.jpg", alt: "Cacho de flores vermelhas e amarelas pendendo da varanda, com o jardim ao fundo.", largura: 700, altura: 700 },
    ],
  },
};
