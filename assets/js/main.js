/* Bistrô Sabor&Magia — preenche a página a partir de data/conteudo.js
 * e alterna entre português e inglês (data/conteudo.en.js e data/textos.js). */
(function () {
  "use strict";

  var BASE = window.CONTEUDO;
  var TEXTOS = window.TEXTOS || {};
  var SVG = "http://www.w3.org/2000/svg";
  var CHAVE_IDIOMA = "saboremagia-idioma";
  var IDIOMAS = { pt: "pt-BR", en: "en" };

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

  /* Sobrepõe os textos traduzidos ao conteúdo-base: objetos por chave, listas por posição. */
  function mesclar(base, extra) {
    if (extra === undefined || extra === null) return base;
    if (Array.isArray(base)) {
      return base.map(function (b, i) { return mesclar(b, extra[i]); });
    }
    if (base && typeof base === "object") {
      var r = {};
      Object.keys(base).forEach(function (k) { r[k] = mesclar(base[k], extra[k]); });
      return r;
    }
    return extra;
  }

  function formatar(modelo, valores) {
    return modelo.replace(/\{(\w+)\}/g, function (_, k) { return valores[k]; });
  }

  /* pt: "13:00" → "13h", "13:30" → "13h30"; en: mantém "13:00" */
  function hora(hhmm, idioma) {
    if (idioma === "en") return hhmm;
    var p = hhmm.split(":");
    return Number(p[0]) + "h" + (p[1] && p[1] !== "00" ? p[1] : "");
  }

  function dataLonga(iso, locale) {
    var p = iso.split("-").map(Number);
    return new Date(p[0], p[1] - 1, p[2]).toLocaleDateString(locale, {
      day: "numeric", month: "long", year: "numeric",
    });
  }

  /* Índice do dia da semana em São Paulo, com segunda-feira = 0 (ordem dos dados). */
  function indiceHoje() {
    var curto = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "America/Sao_Paulo" })
      .format(new Date());
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(curto);
  }

  /* ---------- Menu compacto ---------- */

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

  /* ---------- Textos fixos do HTML ---------- */

  // Guarda o português original do HTML para poder voltar a ele.
  var originais = $$("[data-i18n]").map(function (n) { return { n: n, html: n.innerHTML }; });
  var originaisAria = $$("[data-i18n-aria]").map(function (n) { return { n: n, v: n.getAttribute("aria-label") }; });
  var metaDescricao = $('meta[name="description"]');

  function aplicarTextosFixos(idioma) {
    var T = TEXTOS[idioma] || {};
    originais.forEach(function (o) {
      var chave = o.n.getAttribute("data-i18n");
      if (idioma === "pt" || !T[chave]) o.n.innerHTML = o.html;
      else o.n.textContent = T[chave];
    });
    originaisAria.forEach(function (o) {
      var chave = o.n.getAttribute("data-i18n-aria");
      o.n.setAttribute("aria-label", idioma === "pt" || !T[chave] ? o.v : T[chave]);
    });
    document.documentElement.lang = IDIOMAS[idioma];
    if (T.titulo) document.title = T.titulo;
    if (T.descricao && metaDescricao) metaDescricao.setAttribute("content", T.descricao);
  }

  /* ---------- Conteúdo ---------- */

  function renderizar(idioma) {
    var T = TEXTOS[idioma] || TEXTOS.pt;
    var C = idioma === "en" ? mesclar(BASE, window.CONTEUDO_EN) : BASE;
    var locale = T.locale;

    aplicarTextosFixos(idioma);

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
      var atual = alvo.querySelector("img");
      if (foto && foto.src && atual && atual.getAttribute("src") === foto.src) {
        atual.alt = foto.alt || ""; // troca de idioma: só o texto alternativo muda
        return;
      }
      alvo.textContent = "";
      if (foto && foto.src) {
        alvo.appendChild(imagem(foto, alvo.getAttribute("data-foto") === "hero"));
      } else if (alvo.hasAttribute("data-foto-opcional") || indice !== null) {
        alvo.hidden = true;
      } else {
        // Espaço reservado: decorativo, não representa o estabelecimento.
        alvo.appendChild(el("div", { class: "reservado", "aria-hidden": "true" }, [T.fotoEmBreve]));
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
      var real = new Intl.NumberFormat(locale, { style: "currency", currency: "BRL" });
      preencher("cardapio-intro",
        formatar(T.cardapioAtualizado, { data: dataLonga(cd.atualizadoEm, locale) }) + " " + cd.observacao);
      if (fotos.pratos && fotos.pratos.length) {
        preencher("pratos-fotos", fotos.pratos.map(function (f) { return el("figure", {}, [imagem(f, false)]); }));
        preencher("pratos-nota", T.pratosNota);
      }
      preencher("cardapio", cd.secoes.map(function (s) {
        return el("div", { class: "cardapio__secao" }, [
          el("h3", { texto: s.titulo }),
          s.nota ? el("p", { class: "cardapio__nota", texto: s.nota }) : null,
          el("ul", {}, s.itens.map(function (i) {
            var precos = i.precos.length === 1 && !i.precos[0].rotulo
              ? el("p", { class: "item__preco", texto: real.format(i.precos[0].valor) })
              : el("dl", { class: "item__precos" }, i.precos.map(function (p) {
                  return el("div", {}, [el("dt", { texto: p.rotulo }), el("dd", { texto: real.format(p.valor) })]);
                }));
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
    var hoje = indiceHoje();
    preencher("horarios-fonte", h.fonte + ".");
    preencher("horarios-obs", h.observacao);
    preencher("horarios", h.dias.map(function (d, i) {
      var fechado = !d.abre || !d.fecha;
      var valor = fechado
        ? el("td", { texto: T.fechado })
        : el("td", {}, [
            el("time", { datetime: d.abre, texto: hora(d.abre, idioma) }),
            T.intervalo,
            el("time", { datetime: d.fecha, texto: hora(d.fecha, idioma) }),
          ]);
      return el("tr", fechado ? { class: "fechado" } : {}, [
        el("th", { scope: "row" }, [d.dia, i === hoje ? el("span", { class: "hoje", texto: T.hoje }) : null]),
        valor,
      ]);
    }));

    /* Avaliações — números da data da consulta, não em tempo real. */
    var av = C.avaliacoes;
    if (av && av.ativo && av.plataformas.length) {
      var umaCasa = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      preencher("avaliacoes-intro", formatar(T.avaliacoesIntro, { data: dataLonga(av.consultadoEm, locale) }));
      preencher("avaliacoes", av.plataformas.map(function (p) {
        return el("li", {}, [
          el("p", { class: "notas__plataforma", texto: p.nome }),
          el("p", { class: "notas__valor" }, [
            umaCasa.format(p.nota),
            el("small", { texto: formatar(T.deEscala, { escala: p.escala }) }),
          ]),
          el("p", { class: "notas__total", texto: p.total + " " + (p.total === 1 ? T.avaliacao : T.avaliacoes) }),
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
    if (ct.mapaUrl) canais.push(link(ct.mapaUrl, "pin", T.rotaMapa, true, "botao--claro"));
    if (ct.telefone) canais.push(link("tel:" + ct.telefone.link, "telefone", ct.telefone.exibicao));
    if (ct.whatsapp) canais.push(link("https://wa.me/" + ct.whatsapp.link, "conversa", "WhatsApp " + ct.whatsapp.exibicao, true));
    if (ct.email) canais.push(link("mailto:" + ct.email, "email", ct.email));
    (ct.redesSociais || []).forEach(function (r) { canais.push(link(r.url, "link", r.nome, true)); });
    canais = canais.map(function (a) { return el("li", {}, [a]); });

    // Atalho de rota no cabeçalho, só com link confirmado.
    preencher("cta-rota", ct.mapaUrl ? [link(ct.mapaUrl, "pin", T.comoChegar, true)] : []);

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
    preencher("contato-pendente", !end ? T.pendenteTudo : !temCanal ? T.pendenteCanais : "");
    preencher("reservas", ct.reservas && ct.reservas.instrucao ? ct.reservas.instrucao : T.reservasPadrao);

    preencher("redes", (ct.redesSociais || []).map(function (r) {
      return el("li", {}, [el("a", { href: r.url, target: "_blank", rel: "noopener", texto: r.nome })]);
    }));

    /* Botão de idioma: mostra o idioma para o qual o clique leva. */
    var botao = $("[data-idioma]");
    if (botao) {
      botao.textContent = T.idiomaBotao;
      botao.setAttribute("lang", T.idiomaBotaoLang);
      botao.setAttribute("aria-label", T.idiomaBotaoRotulo);
    }
  }

  /* Dados estruturados — somente com informações confirmadas nos dados. */
  function dadosEstruturados() {
    var end = BASE.contato.endereco;
    if (!end) return;
    var dias = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var ld = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: BASE.estabelecimento.nome,
      address: {
        "@type": "PostalAddress",
        streetAddress: end.logradouro,
        addressLocality: end.cidade,
        addressRegion: end.uf,
        postalCode: end.cep,
        addressCountry: "BR",
      },
      openingHoursSpecification: BASE.horarios.dias
        .map(function (d, i) { return { d: d, dia: dias[i] }; })
        .filter(function (x) { return x.d.abre && x.d.fecha; })
        .map(function (x) {
          return { "@type": "OpeningHoursSpecification", dayOfWeek: x.dia, opens: x.d.abre, closes: x.d.fecha };
        }),
    };
    if (BASE.fotos.hero) ld.image = new URL(BASE.fotos.hero.src, location.href).href;
    if (BASE.contato.telefone) ld.telephone = "+" + BASE.contato.telefone.link.replace(/^\+/, "");
    var s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* ---------- Idioma ---------- */

  function idiomaInicial() {
    var param = new URLSearchParams(location.search).get("lang");
    if (param === "en" || param === "pt") return param;
    try {
      var salvo = localStorage.getItem(CHAVE_IDIOMA);
      if (salvo === "en" || salvo === "pt") return salvo;
    } catch (e) { /* armazenamento indisponível: segue o padrão */ }
    return "pt";
  }

  function definirIdioma(idioma) {
    renderizar(idioma);
    try { localStorage.setItem(CHAVE_IDIOMA, idioma); } catch (e) { /* sem persistência */ }
    // Mantém o idioma no endereço para links compartilhados.
    var url = new URL(location.href);
    if (idioma === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState(null, "", url);
  }

  iniciarMenu();
  if (!BASE) return;

  var idiomaAtual = idiomaInicial();
  renderizar(idiomaAtual);
  dadosEstruturados();

  var botaoIdioma = $("[data-idioma]");
  if (botaoIdioma && window.CONTEUDO_EN) {
    botaoIdioma.hidden = false;
    botaoIdioma.addEventListener("click", function () {
      idiomaAtual = idiomaAtual === "pt" ? "en" : "pt";
      definirIdioma(idiomaAtual);
    });
  }
})();
