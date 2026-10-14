/*
 * English version of the bistro content.
 * ------------------------------------------------------------------
 * Contains ONLY text. Values such as opening hours, prices, dates,
 * address and photo files come from data/conteudo.js (single source).
 * The structure mirrors data/conteudo.js: objects are merged by key and
 * lists by position, so keep items in the same order as the Portuguese file.
 * Anything missing here falls back to the Portuguese text.
 */
window.CONTEUDO_EN = {
  estabelecimento: {
    slogan: "Magic you can taste",
  },

  sobre: {
    apresentacao: [
      "Bistrô Sabor&Magia is at Camburí Beach, in São Sebastião, on the north coast of São Paulo state. The wooden house, surrounded by the forest, welcomes locals and visitors for lunch and dinner.",
      "There are tables on the veranda and on the rooftop, live music and a relaxed, quiet atmosphere for families, groups and anyone who likes to take their time.",
    ],
    notaPerfil:
      "According to its business profile, Bistrô Sabor&Magia identifies itself as a women-owned business.",
  },

  horarios: {
    fonte: "Opening hours as listed on the bistro's business profile",
    dias: [
      { dia: "Monday" },
      { dia: "Tuesday" },
      { dia: "Wednesday" },
      { dia: "Thursday" },
      { dia: "Friday" },
      { dia: "Saturday" },
      { dia: "Sunday" },
    ],
    observacao:
      "Opening hours may change, including on public holidays. If in doubt, check with the restaurant.",
  },

  experiencia: {
    fonte:
      "Features listed on the bistro's business profile. If any of them is essential for your visit, please check with the restaurant.",
    destaques: [
      { titulo: "Outdoor and rooftop seating" },
      { titulo: "Live music" },
      { titulo: "Sports on TV" },
      { titulo: "Vegetarian options" },
      { titulo: "Buffet service" },
      { titulo: "Dogs welcome, including outdoors" },
      { titulo: "Free Wi-Fi" },
    ],
    grupos: [
      {
        titulo: "Meals",
        itens: [
          "Lunch and dinner",
          "Dine-in and takeaway",
          "Buffet service",
          "Desserts and small plates",
          "Vegetarian options",
        ],
      },
      {
        titulo: "Drinks and bar",
        itens: [
          "Coffee",
          "Beer, wine and cocktails",
          "Alcoholic drinks and spirits",
          "Happy hour drinks",
          "On-site bar and table service",
        ],
      },
      {
        titulo: "Atmosphere",
        itens: [
          "Casual, quiet and contemporary",
          "Outdoor tables and rooftop seating",
          "Live music and sports on TV",
          "Good for families, groups, tourists and solo diners",
          "The profile states that the bistro welcomes the LGBTQ+ community and is a safe space for trans people",
        ],
      },
      {
        titulo: "Kids and pets",
        itens: [
          "The profile says it is good for kids",
          "High chairs and kids' menu",
          "Dogs welcome, including outdoors",
        ],
      },
      {
        titulo: "Amenities",
        itens: [
          "Takes reservations",
          "Free Wi-Fi",
          "Restroom",
          "Free parking on site and on the street",
          "Credit and debit cards",
        ],
      },
    ],
  },

  destaquePrato: {
    nome: "Brie cheese risotto with Parma ham",
    observacao:
      "Dish recommended by a guest in May 2026. Please check with the restaurant whether it is currently available.",
  },

  cardapio: {
    observacao:
      "Prices in Brazilian reais (R$), subject to change without notice. Dishes may vary; please check with the staff when ordering.",
    secoes: [
      {
        titulo: "Starters",
        itens: [
          { nome: "Salt cod fritters" },
          { nome: "Squid Provençal", descricao: "Squid sautéed with garlic and herbs." },
          {
            nome: "Flounder ceviche",
            descricao: "Flounder marinated in citrus juices with mango, green grapes, red onion, chili pepper and sweet potato chips.",
          },
          { nome: "Shrimp and leek mini pastéis" },
          { nome: "Two-cheese mini pastéis" },
          {
            nome: "Tapioca and coalho cheese cubes",
            descricao: "Crispy tapioca cubes with coalho cheese, served with pepper jelly.",
          },
          { nome: "French fries" },
          { nome: "Beef rib croquettes", descricao: "Shredded beef rib croquettes filled with mozzarella." },
        ],
      },
      {
        titulo: "Everyday dishes",
        nota: "Served with rice, beans, fries and salad.",
        itens: [
          { nome: "Grilled chicken" },
          { nome: "Grilled fish (hake)" },
          { nome: "Grilled sirloin steak" },
        ],
      },
      {
        titulo: "À la carte",
        itens: [
          {
            nome: "Filet mignon escalope with cheese sauce",
            descricao: "Grilled filet mignon medallions with a creamy cheese sauce, served with white rice and fries.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Filet mignon medallion with Dijon sauce",
            descricao: "Filet mignon in a delicate Dijon sauce, served with parsley rice and kabocha squash purée.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Filet mignon parmigiana",
            descricao: "Breaded filet mignon in fresh tomato sauce, au gratin with mozzarella, catupiry cream cheese and parmesan.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Chicken parmigiana",
            descricao: "Breaded chicken fillet in fresh tomato sauce, au gratin with mozzarella, catupiry cream cheese and parmesan.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
        ],
      },
      {
        titulo: "Fish",
        itens: [
          {
            nome: "Sororoca mackerel with pineapple vinaigrette",
            descricao: "Grilled sororoca with pineapple vinaigrette, parsley rice and squash mousseline.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Chef's style flounder",
            descricao: "Grilled flounder with plantain, white sauce and melted cheese, golden potatoes and broccoli rice.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Flounder and shrimp moqueca",
            descricao: "Flounder and shrimp in Brazilian moqueca stew, with coconut rice and plantain farofa.",
            precos: [{ rotulo: "Single" }, { rotulo: "For two" }],
          },
          {
            nome: "Shrimp stroganoff",
            descricao: "Shrimp in a creamy stroganoff-style sauce, served with rice and fries.",
            precos: [{ rotulo: "Single" }],
          },
        ],
      },
    ],
  },

  avaliacoes: {
    plataformas: [
      { nome: "Business listing" },
      { nome: "Tripadvisor" },
    ],
  },

  equipe: {
    titulo: "Who's in the kitchen",
    texto: [
      "From prepping the ingredients to serving the plate at your table, the food at Sabor&Magia is made by the bistro's own team.",
    ],
  },

  fotos: {
    hero: {
      alt: "The wooden façade of Bistrô Sabor&Magia at night, with a lit veranda, string lights and a starry sky.",
    },
    sobre: [
      { alt: "The bistro's wooden veranda at dusk, with lights on, hanging plants and tables in the background." },
      { alt: "Carved wooden sign reading Sabor&Magia Bistrô, hanging from chains among palm trees." },
    ],
    equipe: [
      { alt: "Two Bistrô Sabor&Magia chefs smiling in front of a brick wall: a woman in a beige chef's jacket and black hat and a man in a white chef's jacket." },
      { alt: "A chef in a beige jacket and bandana holding out a plate of shrimp risotto in the bistro's kitchen." },
      { alt: "A chef arranging bowls of chopped ingredients — tomato, bell pepper, onion and herbs — on the kitchen counter." },
    ],
    pratos: [
      { alt: "Fresh pasta with shrimp, mussels, cherry tomatoes and parsley, with grated cheese on the side." },
      { alt: "Shrimp stroganoff served with white rice and French fries on a square plate." },
      { alt: "Nests of spaghetti in white sauce with shrimp and parsley." },
      { alt: "Ravioli in tomato sauce with basil in a clay dish, with grated cheese on the side." },
    ],
    prato: {
      alt: "Creamy risotto topped with crispy ham shavings and basil leaves on a white plate.",
    },
    galeria: [
      { alt: "The bistro's façade at dusk, with the lit veranda, the wooden tower and the forest behind." },
      { alt: "Chalkboard with Bistrô Sabor & Magia handwritten in chalk." },
      { alt: "Black-and-white photo of two chefs working in the kitchen in front of a painted tile panel." },
      { alt: "A cluster of red and yellow flowers hanging from the veranda, with the garden behind." },
    ],
  },
};
