/* Bistrô Sabor&Magia — preenche a página a partir de data/conteudo.js */
(function () {
  "use strict";

  var C = window.CONTEUDO;
  var SVG = "http://www.w3.org/2000/svg";

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "texto") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (filhos || []).forEach(function (f) {
      if (f) n.appendChild(typeof f === "string" ? document.createTextNode(f) : f);
    });
    return n;
  }

  function icone(nome, classe) {
    var svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("class", "icone" + (classe ? " " + classe : ""));
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(SVG, "use");
    use.setAttribute("href", "#i-" + nome);
    svg.appendChild(use);
    return svg;
  }

  function preencher(sel, conteudo) {
    $$('[data-render="' + sel + '"]').forEach(function (alvo) {
      alvo.textContent = "";
      if (typeof conteudo === "string") alvo.textContent = conteudo;
      else (conteudo || []).forEach(function (f) { alvo.appendChild(f); });
    });
  }

  /* "13:00" → "13h"; "13:30" → "13h30" */
  function hora(hhmm) {
    var p = hhmm.split(":");
    return Number(p[0]) + "h" + (p[1] && p[1] !== "00" ? p[1] : "");
  }

  function dataLonga(iso) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString("pt-BR", {
      day: "numeric", month: "long", year: "numeric",
    });
  }

  function numero(n, casas) {
    return n.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }

  function iniciarMenu() {
    var botao = $(".menu-botao");
    var nav = $("#navegacao");
    if (!botao || !nav) return;

    function definir(aberto) {
      botao.setAttribute("aria-expanded", String(aberto));
      if (aberto) nav.setAttribute("data-aberto", "");
      else nav.removeAttribute("data-aberto");
    }

    botao.addEventListener("click", function () {
      definir(botao.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) definir(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        definir(false);
        botao.focus();
      }
    });
    window.matchMedia("(min-width: 64rem)").addEventListener("change", function () { definir(false); });
  }

  iniciarMenu();
  if (!C) return;

  var est = C.estabelecimento;
  var localidade = est.bairro + ", " + est.cidade + " – " + est.uf;

  /* Campos simples */
  $$('[data-campo="nome"]').forEach(function (n) { n.textContent = est.nome; });
  $$('[data-campo="bairro"]').forEach(function (n) { n.textContent = est.bairro; });
  $$('[data-campo="localidade"]').forEach(function (n) { n.textContent = localidade; });
  $$('[data-campo="slogan"]').forEach(function (n) {
    if (est.slogan) n.textContent = est.slogan;
    else n.hidden = true;
  });

  /* Fotos: <img> com dimensões definidas; carregamento sob demanda, exceto a abertura. */
  var fotos = C.fotos || {};
  function imagem(foto, prioritaria) {
    return el("img", {
      class: "foto",
      src: foto.src,
      alt: foto.alt || "",
      width: foto.largura,
      height: foto.altura,
      loading: prioritaria ? "eager" : "lazy",
      fetchpriority: prioritaria ? "high" : "auto",
      decoding: "async",
    });
  }
  $$("[data-foto]").forEach(function (alvo) {
    var grupo = fotos[alvo.getAttribute("data-foto")];
    var indice = alvo.getAttribute("data-foto-indice");
    var foto = indice === null ? grupo : grupo && grupo[Number(indice)];
    alvo.textContent = "";
    if (foto && foto.src) {
      alvo.appendChild(imagem(foto, alvo.getAttribute("data-foto") === "hero"));
    } else if (alvo.hasAttribute("data-foto-opcional") || indice !== null) {
      alvo.hidden = true;
    } else {
      // Espaço reservado: decorativo, não representa o estabelecimento.
      alvo.appendChild(el("div", { class: "reservado", "aria-hidden": "true" }, ["Foto em breve"]));
    }
  });

  /* Sobre */
  preencher("sobre", C.sobre.apresentacao.map(function (t) { return el("p", { texto: t }); }));
  preencher("sobre-nota", C.sobre.notaPerfil || "");

  /* Equipe */
  if (C.equipe) {
    preencher("equipe-titulo", C.equipe.titulo);
    preencher("equipe", C.equipe.texto.map(function (t) { return el("p", { texto: t }); }));
  }

  /* Galeria */
  if (fotos.galeria && fotos.galeria.length) {
    preencher("galeria", fotos.galeria.map(function (f) {
      return el("figure", f.forma ? { class: "forma-" + f.forma } : {}, [imagem(f, false)]);
    }));
    $('[data-secao="galeria"]').hidden = false;
  }

  /* Experiência */
  var exp = C.experiencia;
  preencher("experiencia-fonte", exp.fonte);
  preencher("faixa", exp.destaques.filter(function (d) { return d.faixa; }).map(function (d) {
    return el("li", {}, [icone(d.icone), d.titulo]);
  }));
  preencher("destaques", exp.destaques.map(function (d) {
    return el("li", {}, [icone(d.icone), d.titulo]);
  }));
  preencher("grupos", exp.grupos.map(function (g) {
    return el("div", {}, [
      el("h3", { texto: g.titulo }),
      el("ul", {}, g.itens.map(function (i) { return el("li", { texto: i }); })),
    ]);
  }));

  /* Destaque gastronômico */
  var prato = C.destaquePrato;
  if (prato && prato.ativo) {
    preencher("prato-nome", prato.nome);
    preencher("prato-obs", prato.observacao);
    $('[data-secao="destaquePrato"]').hidden = false;
  }

  /* Cardápio */
  var cd = C.cardapio;
  if (cd && cd.ativo && cd.secoes.length) {
    var real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
    preencher("cardapio-intro",
      "Cardápio atualizado em " + dataLonga(cd.atualizadoEm) + ". " + cd.observacao);
    if (fotos.pratos && fotos.pratos.length) {
      preencher("pratos-fotos", fotos.pratos.map(function (f) { return el("figure", {}, [imagem(f, false)]); }));
      preencher("pratos-nota", "Fotos de pratos já servidos no bistrô. Os itens disponíveis são os do cardápio abaixo.");
    }
    preencher("cardapio", cd.secoes.map(function (s) {
      return el("div", { class: "cardapio__secao" }, [
        el("h3", { texto: s.titulo }),
        s.nota ? el("p", { class: "cardapio__nota", texto: s.nota }) : null,
        el("ul", {}, s.itens.map(function (i) {
          var precos = i.precos.length === 1 && !i.precos[0].rotulo
            ? el("p", { class: "item__preco", texto: real.format(i.precos[0].valor) })
            : el("dl", { class: "item__precos" }, i.precos.reduce(function (acc, p) {
                acc.push(el("div", {}, [el("dt", { texto: p.rotulo }), el("dd", { texto: real.format(p.valor) })]));
                return acc;
              }, []));
          return el("li", { class: "item" }, [
            el("div", { class: "item__texto" }, [
              el("p", { class: "item__nome", texto: i.nome }),
              i.descricao ? el("p", { class: "item__desc", texto: i.descricao }) : null,
            ]),
            precos,
          ]);
        })),
      ]);
    }));
    $('[data-secao="cardapio"]').hidden = false;
  }

  /* Horários — apenas exibe o que foi informado; não calcula "aberto agora". */
  var h = C.horarios;
  var hojeNome = new Intl.DateTimeFormat("pt-BR", { weekday: "long", timeZone: "America/Sao_Paulo" })
    .format(new Date()).toLowerCase();
  preencher("horarios-fonte", h.fonte + ".");
  preencher("horarios-obs", h.observacao);
  preencher("horarios", h.dias.map(function (d) {
    var fechado = !d.abre || !d.fecha;
    var ehHoje = d.dia.toLowerCase() === hojeNome;
    var valor = fechado
      ? el("td", { texto: "Fechado" })
      : el("td", {}, [
          el("time", { datetime: d.abre, texto: hora(d.abre) }),
          " às ",
          el("time", { datetime: d.fecha, texto: hora(d.fecha) }),
        ]);
    return el("tr", fechado ? { class: "fechado" } : {}, [
      el("th", { scope: "row" }, [d.dia, ehHoje ? el("span", { class: "hoje", texto: "hoje" }) : null]),
      valor,
    ]);
  }));

  /* Avaliações — números da data da consulta, não em tempo real. */
  var av = C.avaliacoes;
  if (av && av.ativo && av.plataformas.length) {
    preencher("avaliacoes-intro",
      "Nota e quantidade de avaliações exibidas em cada plataforma na consulta de " +
      dataLonga(av.consultadoEm) + ". Os números podem ter mudado desde então.");
    preencher("avaliacoes", av.plataformas.map(function (p) {
      return el("li", {}, [
        el("p", { class: "notas__plataforma", texto: p.nome }),
        el("p", { class: "notas__valor" }, [
          numero(p.nota, 1),
          el("small", { texto: "de " + p.escala }),
        ]),
        el("p", { class: "notas__total", texto: p.total + (p.total === 1 ? " avaliação" : " avaliações") }),
      ]);
    }));
    $('[data-secao="avaliacoes"]').hidden = false;
  }

  /* Contato — só exibe canais confirmados (preenchidos em data/conteudo.js). */
  var ct = C.contato;
  var canais = [];
  function link(href, ic, texto, externo, estilo) {
    var a = el("a", { href: href, class: "botao " + (estilo || "botao--contorno") }, [icone(ic), texto]);
    if (externo) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  if (ct.mapaUrl) canais.push(link(ct.mapaUrl, "pin", "Abrir rota no Google Maps", true, "botao--claro"));
  if (ct.telefone) canais.push(link("tel:" + ct.telefone.link, "telefone", ct.telefone.exibicao));
  if (ct.whatsapp) canais.push(link("https://wa.me/" + ct.whatsapp.link, "conversa", "WhatsApp " + ct.whatsapp.exibicao, true));
  if (ct.email) canais.push(link("mailto:" + ct.email, "email", ct.email));
  (ct.redesSociais || []).forEach(function (r) { canais.push(link(r.url, "link", r.nome, true)); });
  canais = canais.map(function (a) { return el("li", {}, [a]); });

  // Atalho de rota no cabeçalho, só com link confirmado.
  preencher("cta-rota", ct.mapaUrl ? [link(ct.mapaUrl, "pin", "Como chegar", true)] : []);

  var end = ct.endereco;
  var enderecoTexto = end
    ? end.logradouro + " – " + end.bairro + ", " + end.cidade + " – " + end.uf + ", " + end.cep
    : "";
  var temCanal = ct.telefone || ct.whatsapp || ct.email || (ct.redesSociais || []).length;
  preencher("endereco", enderecoTexto);
  if (end) {
    preencher("rodape-endereco", enderecoTexto);
    $(".contato__localidade").hidden = true; // o endereço completo já inclui a cidade
  }
  preencher("canais", canais);
  preencher("contato-pendente",
    !end ? "O endereço completo e os canais oficiais de contato serão publicados aqui assim que forem confirmados pelo restaurante."
    : !temCanal ? "Telefone, WhatsApp e redes sociais oficiais serão publicados aqui assim que forem confirmados pelo restaurante."
    : "");
  preencher("reservas", ct.reservas && ct.reservas.instrucao
    ? ct.reservas.instrucao
    : "O perfil comercial informa que o bistrô aceita reservas. O canal oficial para reservar será publicado aqui após confirmação.");

  /* Dados estruturados — somente com informações confirmadas nos dados. */
  if (end) {
    var dias = { "Segunda-feira": "Monday", "Terça-feira": "Tuesday", "Quarta-feira": "Wednesday", "Quinta-feira": "Thursday", "Sexta-feira": "Friday", "Sábado": "Saturday", "Domingo": "Sunday" };
    var ld = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: est.nome,
      address: {
        "@type": "PostalAddress",
        streetAddress: end.logradouro,
        addressLocality: end.cidade,
        addressRegion: end.uf,
        postalCode: end.cep,
        addressCountry: "BR",
      },
      openingHoursSpecification: h.dias.filter(function (d) { return d.abre && d.fecha; }).map(function (d) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: dias[d.dia], opens: d.abre, closes: d.fecha };
      }),
    };
    if (C.fotos.hero) ld.image = new URL(C.fotos.hero.src, location.href).href;
    if (ct.telefone) ld.telephone = "+" + ct.telefone.link.replace(/^\+/, "");
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  preencher("redes", (ct.redesSociais || []).map(function (r) {
    return el("li", {}, [el("a", { href: r.url, target: "_blank", rel: "noopener", texto: r.nome })]);
  }));
})();
