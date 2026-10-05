(function () {
  "use strict";
  var D = window.DADOS;
  var $ = function (id) { return document.getElementById(id); };

  var ICONES = {
    estrela: '<svg viewBox="0 0 24 24"><path d="m12 2 3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.5 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    adulto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M9 7h6l1 7h-2l-1 8h-2l-1-8H8z"/></svg>',
    crianca: '<svg viewBox="0 0 24 24"><circle cx="8" cy="5" r="2"/><path d="M5.5 8h5l.8 6H10l-.7 7H6.7L6 14H4.7z"/><circle cx="17" cy="9" r="1.6"/><path d="M15 11.5h4l.6 4.5h-1l-.6 5h-2l-.6-5h-1z"/></svg>',
    fone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    whats: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 6 9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    local: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function estrelas(nota) {
    var h = "";
    for (var i = 1; i <= 5; i++) h += i <= Math.round(nota) ? ICONES.estrela : ICONES.estrela.replace("<svg", '<svg class="vazia"');
    return h;
  }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }
  function iniciais(nome) {
    var p = nome.trim().split(/\s+/);
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase();
  }
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.hidden = true; }, 3000);
  }
  function guardar(chave, valor) { try { localStorage.setItem(chave, valor); } catch (e) {} }
  function ler(chave) { try { return localStorage.getItem(chave); } catch (e) { return null; } }

  // ---------- PERFIL ----------
  $("nome").textContent = D.nome;
  $("profissao").textContent = D.profissao;
  $("cidade").textContent = D.cidade;
  var nEnd = D.consultorios.filter(function (c) { return c.tipo === "endereco"; }).length;
  $("qtd-enderecos").textContent = plural(nEnd, "endereço", "endereços");
  $("registro").textContent = D.registro;
  $("estrelas-topo").innerHTML = estrelas(D.nota);
  $("qtd-opinioes").textContent = plural(D.totalOpinioes, "opinião", "opiniões");
  document.querySelector(".avatar-iniciais").textContent = iniciais(D.nome);

  var avatar = document.querySelector(".avatar");
  var foto = $("foto");
  foto.onerror = function () { avatar.classList.add("sem-foto"); };
  if (D.foto) foto.src = D.foto; else avatar.classList.add("sem-foto");

  function miniAvatar() {
    var ini = esc(iniciais(D.nome));
    if (!D.foto || avatar.classList.contains("sem-foto")) return '<span class="mini-avatar">' + ini + "</span>";
    return '<span class="mini-avatar"><img src="' + esc(D.foto) + '" alt="" onerror="this.parentNode.textContent=\'' + ini + '\'"></span>';
  }

  var fav = $("favorito");
  function pintarFav(on) { fav.setAttribute("aria-pressed", on ? "true" : "false"); }
  pintarFav(ler("favorito") === "1");
  fav.addEventListener("click", function () {
    var on = fav.getAttribute("aria-pressed") !== "true";
    pintarFav(on); guardar("favorito", on ? "1" : "0");
    toast(on ? "Salvo nos favoritos" : "Removido dos favoritos");
  });

  // ---------- EXPERIÊNCIA ----------
  $("n-formacao").textContent = D.formacao.length;
  $("n-planos").textContent = D.planos.length;
  $("sobre-resumo").textContent = D.sobreResumo;
  $("sobre-texto").textContent = D.sobreTexto;

  var sobre = document.querySelector(".sobre-texto");
  sobre.classList.add("recolhido");
  var expandido = false;
  function alternarDetalhes() {
    expandido = !expandido;
    sobre.classList.toggle("recolhido", !expandido);
    $("sobre-mais").textContent = expandido ? "menos" : "mais";
    $("detalhes-extra").hidden = !expandido;
    $("btn-mais-exp").textContent = expandido ? "Mostrar menos detalhes" : "Mostrar mais detalhes";
    pintarDoencas(expandido);
  }
  $("sobre-mais").addEventListener("click", alternarDetalhes);
  $("btn-mais-exp").addEventListener("click", alternarDetalhes);

  $("abordagens").innerHTML = D.abordagens.map(function (a) { return "<li>" + ICONES.check + esc(a) + "</li>"; }).join("");
  $("experiencia-em").innerHTML = D.experienciaEm.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
  var listaFormacao = D.formacao.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
  $("formacao-lista").innerHTML = listaFormacao;
  $("formacao-modal").innerHTML = listaFormacao;
  $("pacientes").innerHTML = D.pacientes.map(function (p) {
    return "<li>" + (ICONES[p.icone] || "") + esc(p.texto) + "</li>";
  }).join("");

  var VISIVEIS = 5;
  function pintarDoencas(todas) {
    var lista = todas ? D.doencas : D.doencas.slice(0, VISIVEIS);
    var h = lista.map(function (d) { return '<span class="tag">' + esc(d) + "</span>"; }).join("");
    var resto = D.doencas.length - VISIVEIS;
    if (resto > 0) h += '<button class="link-btn link" id="mais-doencas">' + (todas ? "mostrar menos" : "+" + resto) + "</button>";
    $("doencas").innerHTML = h;
    var b = $("mais-doencas");
    if (b) b.addEventListener("click", function () { pintarDoencas(!todas); });
  }
  pintarDoencas(false);

  // ---------- SERVIÇOS ----------
  var servicosAbertos = false;
  function pintarServicos() {
    var lista = servicosAbertos ? D.servicos : D.servicos.slice(0, VISIVEIS);
    $("lista-servicos").innerHTML = lista.map(function (s, i) {
      var preco = s.preco ? '<span class="preco">' + esc(s.preco) + "</span>" : '<span class="preco consultar">Consultar valores</span>';
      return "<li><strong>" + esc(s.nome) + "</strong>" + preco +
        '<button class="link-btn detalhes-btn" data-servico="' + i + '" aria-expanded="false">Detalhes</button>' +
        '<p class="detalhes" hidden>' + esc(s.detalhes || "") + "</p></li>";
    }).join("");
    var resto = D.servicos.length - VISIVEIS;
    var btn = $("btn-mais-servicos");
    btn.hidden = resto <= 0;
    btn.textContent = servicosAbertos ? "Mostrar menos" : "+ " + plural(resto, "serviço", "serviços");
  }
  $("lista-servicos").addEventListener("click", function (e) {
    var b = e.target.closest(".detalhes-btn");
    if (!b) return;
    var p = b.nextElementSibling;
    p.hidden = !p.hidden;
    b.setAttribute("aria-expanded", String(!p.hidden));
    b.textContent = p.hidden ? "Detalhes" : "Ocultar";
  });
  $("btn-mais-servicos").addEventListener("click", function () { servicosAbertos = !servicosAbertos; pintarServicos(); });
  pintarServicos();
  $("sel-servico").innerHTML = D.servicos.map(function (s) { return "<option>" + esc(s.nome) + "</option>"; }).join("");

  // ---------- CONSULTÓRIOS ----------
  $("n-consultorios").textContent = D.consultorios.length;
  var ILUSTRACAO =
    '<div class="ilustracao"><svg viewBox="0 0 260 64" style="fill:none">' +
    '<path d="M40 44 C80 10 110 54 130 30 S190 10 225 22" stroke="#7fc6bb" stroke-width="2" stroke-dasharray="4 4"/>' +
    '<circle cx="40" cy="44" r="12" fill="#f6d36b"/><rect x="36" y="37" width="8" height="11" rx="4" fill="#fff"/>' +
    '<rect x="105" y="8" width="52" height="52" rx="4" fill="#fff" stroke="#00796b" stroke-width="2"/>' +
    '<circle cx="131" cy="28" r="8" fill="#e8b89a"/><path d="M117 58c2-12 26-12 28 0" fill="#00796b"/>' +
    '<circle cx="225" cy="22" r="12" fill="#5cc8b6"/><rect x="219" y="17" width="9" height="9" rx="2" fill="#fff"/><path d="m228 21 4-3v8l-4-3z" fill="#fff"/>' +
    "</svg></div>";

  function painelConsultorio(c) {
    if (c.tipo === "teleconsulta") {
      return '<div class="consultorio"><div class="consultorio-titulo">' + miniAvatar() + esc(c.titulo) + "</div>" + ILUSTRACAO +
        "<p>Atendimento online por chamada de vídeo, de onde você estiver.</p>" +
        '<p><button class="link-btn link-verde" data-abrir="modal-atendimento">Solicite uma teleconsulta</button></p></div>';
    }
    var q = encodeURIComponent(c.endereco);
    return '<div class="consultorio"><div class="consultorio-titulo">' + ICONES.local + esc(c.titulo) + "</div>" +
      "<p>" + esc(c.endereco) + "</p>" +
      '<iframe class="mapa" loading="lazy" title="Mapa do consultório" src="https://maps.google.com/maps?q=' + q + '&output=embed"></iframe>' +
      '<p><a class="link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + q + '">Como chegar</a></p></div>';
  }
  function selecionarAba(i) {
    Array.prototype.forEach.call($("abas").children, function (b, j) { b.setAttribute("aria-selected", String(i === j)); });
    $("painel-consultorio").innerHTML = painelConsultorio(D.consultorios[i]);
  }
  $("abas").innerHTML = D.consultorios.map(function (c, i) {
    return '<button class="aba" role="tab" data-aba="' + i + '">' + (c.tipo === "teleconsulta" ? "Teleconsulta" : "Endereço") + "</button>";
  }).join("");
  $("abas").addEventListener("click", function (e) {
    var b = e.target.closest(".aba");
    if (b) selecionarAba(Number(b.dataset.aba));
  });
  selecionarAba(0);

  $("pagamentos").innerHTML = D.formasPagamento.map(function (p) {
    return '<li>' + esc(p) + ' <a href="#planos" class="link">Detalhes</a></li>';
  }).join("");
  var planosHtml = D.planos.map(function (p) {
    return "<li><strong>" + esc(p.nome) + "</strong> <span class=\"cinza\">" + esc(p.obs || "") + "</span></li>";
  }).join("");
  $("lista-planos").innerHTML = planosHtml;
  $("planos-modal").innerHTML = planosHtml;

  // ---------- OPINIÕES ----------
  $("estrelas-opinioes").innerHTML = estrelas(D.nota);
  $("qtd-opinioes-2").textContent = plural(D.totalOpinioes, "opinião", "opiniões");
  $("link-original").href = D.linkPerfilOriginal;

  function dataBR(iso) {
    var d = new Date(iso + "T12:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
  }
  function pintarOpinioes() {
    var filtro = $("filtro-nota").value;
    var termo = $("busca-opiniao").value.trim().toLowerCase();
    var lista = D.opinioes.filter(function (o) {
      if (filtro === "5" && o.nota !== 5) return false;
      if (filtro === "4" && o.nota !== 4) return false;
      if (filtro === "3" && o.nota > 3) return false;
      return !termo || o.texto.toLowerCase().indexOf(termo) !== -1;
    });
    if (!lista.length) {
      $("lista-opinioes").innerHTML = D.opinioes.length
        ? '<li class="vazio">Nenhuma opinião encontrada.</li>'
        : '<li class="vazio">' + esc(D.nome.split(" ")[0]) + " tem " + plural(D.totalOpinioes, "opinião", "opiniões") +
          ' com nota ' + D.nota + '. <a class="link" target="_blank" rel="noopener" href="' + esc(D.linkPerfilOriginal) + '">Ver todas as opiniões</a></li>';
      return;
    }
    $("lista-opinioes").innerHTML = lista.map(function (o) {
      return '<li><div class="opiniao-cab"><span class="mini-avatar">' + esc(iniciais(o.autor)) + "</span><div><strong>" + esc(o.autor) +
        "</strong><small>" + esc(dataBR(o.data)) + '</small></div></div><span class="estrelas">' + estrelas(o.nota) + "</span><p>" + esc(o.texto) + "</p></li>";
    }).join("");
  }
  $("filtro-nota").addEventListener("change", pintarOpinioes);
  $("busca-opiniao").addEventListener("input", pintarOpinioes);
  pintarOpinioes();

  // ---------- AGENDA ----------
  var SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  var MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  var POR_PAGINA = 4, TOTAL_DIAS = 28, paginaDias = 0, diaEscolhido = null;

  function isoLocal(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function pintarDias() {
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    var h = "";
    for (var i = paginaDias * POR_PAGINA; i < (paginaDias + 1) * POR_PAGINA; i++) {
      var d = new Date(hoje); d.setDate(hoje.getDate() + i);
      var rotulo = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : SEMANA[d.getDay()];
      var iso = isoLocal(d);
      h += '<button class="dia" data-dia="' + iso + '" aria-pressed="' + (iso === diaEscolhido) + '">' + rotulo +
        "<small>" + d.getDate() + " " + MESES[d.getMonth()] + "</small></button>";
    }
    $("dias").innerHTML = h;
    $("dias-ant").disabled = paginaDias === 0;
    $("dias-prox").disabled = (paginaDias + 1) * POR_PAGINA >= TOTAL_DIAS;
  }
  $("dias-ant").addEventListener("click", function () { paginaDias--; pintarDias(); });
  $("dias-prox").addEventListener("click", function () { paginaDias++; pintarDias(); });
  $("dias").addEventListener("click", function (e) {
    var b = e.target.closest(".dia");
    if (!b) return;
    diaEscolhido = b.dataset.dia;
    pintarDias();
    $("campo-dia").value = diaEscolhido;
    abrir("modal-atendimento");
  });
  $("campo-dia").min = isoLocal(new Date());
  pintarDias();

  // No celular a agenda aparece logo abaixo do perfil.
  var agenda = $("agenda"), lateral = document.querySelector(".coluna-lateral"), slotMobile = document.querySelector(".agenda-mobile");
  var mq = window.matchMedia("(max-width: 820px)");
  function posicionarAgenda() { (mq.matches ? slotMobile : lateral).appendChild(agenda); }
  if (mq.addEventListener) mq.addEventListener("change", posicionarAgenda); else mq.addListener(posicionarAgenda);
  posicionarAgenda();

  // ---------- CONTATO ----------
  function linkWhats(texto) {
    return "https://wa.me/" + D.whatsapp.replace(/\D/g, "") + (texto ? "?text=" + encodeURIComponent(texto) : "");
  }
  var c = "";
  if (D.telefone) c += '<div class="contato-item">' + ICONES.fone + '<a class="link" href="tel:' + esc(D.telefone.replace(/[^\d+]/g, "")) + '">' + esc(D.telefone) + "</a></div>";
  if (D.whatsapp) c += '<div class="contato-item">' + ICONES.whats + '<a class="link" target="_blank" rel="noopener" href="' + linkWhats("Olá, gostaria de agendar uma consulta.") + '">Conversar no WhatsApp</a></div>';
  if (D.email) c += '<div class="contato-item">' + ICONES.email + '<a class="link" href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a></div>";
  D.consultorios.forEach(function (x) {
    if (x.endereco) c += '<div class="contato-item">' + ICONES.local + "<span>" + esc(x.endereco) + "</span></div>";
  });
  c += '<button class="btn btn-verde btn-largo" data-abrir="modal-atendimento">Solicite um atendimento</button>';
  $("contato-conteudo").innerHTML = c;

  function enviar(texto, assunto) {
    if (D.whatsapp) { window.open(linkWhats(texto), "_blank", "noopener"); return true; }
    if (D.email) { location.href = "mailto:" + D.email + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(texto); return true; }
    return false;
  }

  $("form-atendimento").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    var dia = f.dia.value ? f.dia.value.split("-").reverse().join("/") : "a combinar";
    var texto = "Olá, " + D.nome.split(" ")[0] + "! Gostaria de solicitar um atendimento.\n" +
      "Nome: " + f.nome.value + "\nTelefone: " + f.telefone.value + "\nServiço: " + f.servico.value +
      "\nModalidade: " + f.modalidade.value + "\nDia de preferência: " + dia +
      (f.mensagem.value ? "\nMensagem: " + f.mensagem.value : "");
    if (enviar(texto, "Solicitação de atendimento")) {
      fechar(); e.target.reset(); toast("Solicitação enviada!");
    } else {
      $("form-aviso").textContent = "O contato ainda não foi configurado. Preencha WhatsApp ou e-mail em dados.js.";
    }
  });

  var notaEscolhida = 5;
  function pintarNota() {
    var h = "";
    for (var i = 1; i <= 5; i++) h += '<button type="button" role="radio" aria-checked="' + (i === notaEscolhida) + '" aria-label="' + i + ' estrelas" data-nota="' + i + '"' + (i <= notaEscolhida ? ' class="ativa"' : "") + ">" + ICONES.estrela + "</button>";
    $("nota-escolha").innerHTML = h;
  }
  $("nota-escolha").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (b) { notaEscolhida = Number(b.dataset.nota); pintarNota(); }
  });
  pintarNota();
  $("form-opiniao").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    var texto = "Opinião sobre o atendimento (" + notaEscolhida + " estrelas)\nNome: " + f.nome.value + "\n" + f.texto.value;
    if (enviar(texto, "Opinião sobre o atendimento")) { fechar(); e.target.reset(); notaEscolhida = 5; pintarNota(); toast("Obrigado pela sua opinião!"); }
    else toast("O contato ainda não foi configurado.");
  });

  // ---------- MODAIS ----------
  var aberto = null, focoAnterior = null;
  function abrir(id) {
    fechar();
    focoAnterior = document.activeElement;
    aberto = $(id); aberto.hidden = false;
    document.body.style.overflow = "hidden";
    var campo = aberto.querySelector("input, select, textarea, button:not(.fechar), a");
    (campo || aberto.querySelector(".fechar")).focus();
  }
  function fechar() {
    if (!aberto) return;
    aberto.hidden = true; aberto = null;
    document.body.style.overflow = "";
    if (focoAnterior && focoAnterior.focus) focoAnterior.focus();
  }
  document.addEventListener("click", function (e) {
    var gatilho = e.target.closest("[data-abrir]");
    if (gatilho) { e.preventDefault(); abrir(gatilho.dataset.abrir); return; }
    if (e.target.closest(".fechar") || e.target.classList.contains("modal")) fechar();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fechar(); });

  $("ano").textContent = new Date().getFullYear();
})();
