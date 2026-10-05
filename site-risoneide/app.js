(function () {
  "use strict";
  var D = window.DADOS;
  var $ = function (id) { return document.getElementById(id); };
  var LOCAIS = D.consultorios;
  var TOTAL_OP = D.opinioes.length;

  var I = {
    estrela: '<svg viewBox="0 0 24 24"><path d="m12 2 3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.5 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    checkCirculo: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#fff" stroke-width="2.4"/></svg>',
    adulto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M9 7h6l1 7h-2l-1 8h-2l-1-8H8z"/></svg>',
    crianca: '<svg viewBox="0 0 24 24"><circle cx="8" cy="5" r="2"/><path d="M5.5 8h5l.8 6H10l-.7 7H6.7L6 14H4.7z"/><circle cx="17" cy="9" r="1.6"/><path d="M15 11.5h4l.6 4.5h-1l-.6 5h-2l-.6-5h-1z"/></svg>',
    grupo: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5zM15.5 19c0-2-.6-3.6-1.7-4.7 3.3-.6 7.2.8 7.2 4.7z"/></svg>',
    carrinho: '<svg viewBox="0 0 24 24"><path d="M13 3v8h8a8 8 0 0 0-8-8zM3 11h9v.5A7.5 7.5 0 0 1 4.6 19 2 2 0 1 1 3 22a2 2 0 0 1 1.8-2.9A7.5 7.5 0 0 1 3 11z"/><circle cx="15" cy="20" r="2"/></svg>',
    local: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
    fone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    whats: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 6 9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    calX: '<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 10h16M8 3v4M16 3v4M10 13l4 4M14 13l-4 4" stroke="currentColor" stroke-width="1.8"/></svg>',
    seta: '<svg viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    info: '<svg viewBox="0 0 24 24" style="width:13px;height:13px;color:#777;vertical-align:-1px"><circle cx="12" cy="12" r="10"/><path d="M12 10.5v6M12 7v1" stroke="#fff" stroke-width="2.4"/></svg>',
  };

  var ILU_TELE =
    '<div class="ilustracao"><svg viewBox="0 0 300 80" style="fill:none">' +
    '<path d="M50 56 C90 20 120 64 150 38 S220 14 255 28" stroke="#3aa98f" stroke-width="2"/>' +
    '<circle cx="50" cy="56" r="14" fill="#f6d36b"/><rect x="46" y="48" width="8" height="12" rx="4" fill="#fff"/>' +
    '<rect x="118" y="8" width="64" height="72" rx="3" fill="#fff" stroke="#00796b" stroke-width="2"/><path d="M118 16h64" stroke="#00796b" stroke-width="2"/>' +
    '<path d="M138 46c0-12 7-20 12-20s12 8 12 20" fill="#2b2b2b"/><circle cx="150" cy="40" r="9" fill="#e8b89a"/><path d="M130 80c2-16 38-16 40 0" fill="#6ec9b5"/>' +
    '<circle cx="255" cy="28" r="15" fill="#5cc8b6"/><rect x="248" y="22" width="10" height="11" rx="2" fill="#fff"/><path d="m258 26 5-3v10l-5-3z" fill="#fff"/>' +
    "</svg></div>";
  var ILU_CAL =
    '<div class="f-ilustracao"><svg viewBox="0 0 170 120" style="fill:none">' +
    '<ellipse cx="80" cy="66" rx="62" ry="42" fill="#fbe3d6"/>' +
    '<g transform="rotate(8 92 62)"><rect x="52" y="22" width="80" height="80" rx="4" fill="#fff" stroke="#2b2b2b" stroke-width="2"/>' +
    '<rect x="52" y="22" width="80" height="14" fill="#00a383"/>' +
    '<g fill="#00a383">' + (function () { var s = ""; for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) s += '<circle cx="' + (64 + c * 12) + '" cy="' + (50 + r * 13) + '" r="1.8"/>'; return s; })() + "</g></g>" +
    '<path d="M28 60l6 6m0-6-6 6M140 98l5 5m0-5-5 5" stroke="#00a383" stroke-width="1.6"/>' +
    '<circle cx="146" cy="20" r="5" fill="#ddd"/><circle cx="30" cy="92" r="4" fill="#ddd"/></svg></div>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function estrelas(n) { var h = ""; for (var i = 0; i < n; i++) h += I.estrela; return h; }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 3200);
  }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function rolarPara(id) { var el = $(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  function precoLista(s) { return s.preco ? esc(s.preco) : '<span class="consultar">Consultar valores</span>'; }
  function precoModal(s) { return s.precoModal ? esc(s.precoModal) : '<span class="consultar">Consultar valores</span>'; }

  // =================== FOLHA (bottom sheet) ===================
  var folha = $("folha"), folhaCorpo = $("folha-corpo"), focoAntes = null;
  function abrirFolha(titulo, html, aoMontar) {
    if (folha.hidden) focoAntes = document.activeElement;
    $("folha-titulo").textContent = titulo;
    folhaCorpo.innerHTML = html;
    folha.hidden = false;
    folha.querySelector(".folha").scrollTop = 0;
    document.body.classList.add("travado");
    if (aoMontar) aoMontar(folhaCorpo);
    folha.querySelector(".fechar").focus();
  }
  function fecharFolha() {
    if (folha.hidden) return;
    folha.hidden = true; folhaCorpo.innerHTML = "";
    document.body.classList.remove("travado");
    if (focoAntes && focoAntes.focus) focoAntes.focus();
  }
  folha.addEventListener("click", function (e) {
    if (e.target === folha || e.target.closest(".fechar")) fecharFolha();
  });

  // =================== CONTATO / ENVIO ===================
  function linkWhats(texto) { return "https://wa.me/" + D.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(texto); }
  function enviar(texto, assunto) {
    if (D.whatsapp) { window.open(linkWhats(texto), "_blank", "noopener"); return true; }
    if (D.email) { location.href = "mailto:" + D.email + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(texto); return true; }
    toast("O contato ainda não foi configurado no site (dados.js).");
    return false;
  }

  // =================== PERFIL ===================
  $("nome").textContent = D.nome;
  $("profissao").textContent = D.profissao;
  $("cidade").textContent = D.cidade;
  $("registro").textContent = D.registro;
  $("estrelas-topo").innerHTML = estrelas(D.nota);
  $("qtd-opinioes").textContent = plural(TOTAL_OP, "opinião", "opiniões");
  $("aba-opinioes").textContent = "Opiniões (" + TOTAL_OP + ")";
  $("aba-duvidas").textContent = "Dúvidas respondidas (" + D.duvidas.length + ")";

  var fav = $("favorito");
  fav.setAttribute("aria-pressed", ler("favorito") === "1" ? "true" : "false");
  fav.addEventListener("click", function () {
    var on = fav.getAttribute("aria-pressed") !== "true";
    fav.setAttribute("aria-pressed", String(on)); guardar("favorito", on ? "1" : "0");
    toast(on ? "Salvo nos favoritos" : "Removido dos favoritos");
  });

  var lightbox = $("lightbox");
  $("avatar").addEventListener("click", function () { lightbox.hidden = false; document.body.classList.add("travado"); lightbox.querySelector("button").focus(); });
  lightbox.addEventListener("click", function () { lightbox.hidden = true; document.body.classList.remove("travado"); $("avatar").focus(); });

  // =================== EXPERIÊNCIA ===================
  $("n-formacao").textContent = D.formacao.length;
  $("n-planos").textContent = D.planos.length;
  $("sobre-resumo").textContent = D.sobreResumo;
  $("sobre-texto").textContent = D.sobreTexto;
  $("sobre-mais").addEventListener("click", function () {
    var w = $("sobre-wrap"), aberto = w.classList.toggle("recolhido");
    this.textContent = aberto ? "mais" : "menos";
  });
  $("abordagens").innerHTML = D.abordagens.map(function (a) { return "<li>" + I.check + esc(a) + "</li>"; }).join("");
  $("experiencia-em").innerHTML = D.experienciaEm.map(function (a) { return "<li>" + esc(a) + "</li>"; }).join("");
  $("pacientes").innerHTML = D.pacientes.map(function (p) { return "<li>" + I[p.icone] + esc(p.texto) + "</li>"; }).join("");

  function tags(lista) { return lista.map(function (d) { return '<span class="tag">' + esc(d) + "</span>"; }).join(""); }
  function pintarDoencas(todas) {
    var resto = D.doencas.length - 5;
    $("doencas").innerHTML = tags(todas ? D.doencas : D.doencas.slice(0, 5)) +
      (resto > 0 ? '<button class="link-btn link" id="mais-doencas">' + (todas ? "menos" : "+" + resto) + "</button>" : "");
    var b = $("mais-doencas"); if (b) b.onclick = function () { pintarDoencas(!todas); };
  }
  pintarDoencas(false);

  function lista(itens) { return '<ul class="lista-ponto">' + itens.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function folhaMaisDetalhes(completo) {
    var h = "<h3>Trabalho como</h3>" + lista(D.trabalhoComo) + "<h3>Experiência em:</h3>" + lista(D.experienciaEmDetalhes);
    if (completo) {
      h += "<h3>Formação</h3>" + lista(D.formacao) + "<h3>Idiomas</h3>" + lista(D.idiomas) +
        '<h3>Principais doenças tratadas</h3><div class="tags">' + tags(D.doencas) + "</div>";
    }
    abrirFolha("Mais detalhes", h);
  }

  // =================== SERVIÇOS ===================
  var servicosAbertos = false;
  function pintarServicos() {
    var l = servicosAbertos ? D.servicos : D.servicos.slice(0, 5);
    $("lista-servicos").innerHTML = l.map(function (s) {
      var i = D.servicos.indexOf(s);
      return "<li><strong>" + esc(s.nome) + "</strong>" + precoLista(s) +
        ' <button class="link-btn detalhes-btn" data-acao="servico" data-i="' + i + '">Detalhes</button></li>';
    }).join("");
    var resto = D.servicos.length - 5, b = $("btn-mais-servicos");
    b.hidden = resto <= 0;
    b.textContent = servicosAbertos ? "Mostrar menos" : "+ " + plural(resto, "serviço", "serviços");
  }
  $("btn-mais-servicos").addEventListener("click", function () { servicosAbertos = !servicosAbertos; pintarServicos(); });
  pintarServicos();
  $("btn-precos").addEventListener("click", function () {
    var p = $("precos-texto"); p.hidden = !p.hidden; this.setAttribute("aria-expanded", String(!p.hidden));
  });

  function cabLocal(chave) {
    var L = LOCAIS[chave];
    return chave === "tele" ? '<p class="f-sub cinza" style="font-weight:400">Teleconsulta</p>'
      : '<div class="f-local"><b>' + esc(L.titulo) + "</b><span>" + esc(L.local) + "</span></div>";
  }
  function folhaServico(i) {
    var s = D.servicos[i];
    var h = '<p class="f-sub">Opções de serviço</p>';
    s.locais.forEach(function (chave) {
      h += cabLocal(chave) + '<div class="f-item"><strong>' + esc(s.nome) + "</strong>" + precoModal(s) +
        (s.descricao ? "<p>" + esc(s.descricao) + "</p>" : "") + "</div>";
    });
    h += '<button class="btn btn-verde btn-largo" data-acao="solicitar" data-servico="' + i + '">Solicite um atendimento</button>';
    abrirFolha(s.nome, h);
  }

  // =================== CONSULTÓRIOS ===================
  var localAtual = "tele";
  function painel(chave) {
    if (chave === "tele") {
      return '<div class="consultorio"><div class="consultorio-titulo"><img class="mini-foto" src="' + esc(D.foto) + '" alt="">Teleconsulta</div>' + ILU_TELE +
        "<p>Este especialista não oferece agendamento online neste endereço</p>" +
        '<p style="margin-top:6px"><button class="link-btn link-verde" data-acao="solicitar">O que eu posso fazer agora?</button></p></div>';
    }
    var L = LOCAIS.end;
    return '<div class="consultorio"><div class="consultorio-titulo">' + I.local + "<div>" + esc(L.titulo) + "<small>" + esc(L.local) + "</small></div></div>" +
      '<iframe class="mapa" loading="lazy" title="Mapa do consultório" src="https://maps.google.com/maps?q=' + encodeURIComponent(L.mapa) + '&output=embed"></iframe>' +
      "<p>Este especialista não oferece agendamento online neste endereço</p>" +
      '<p style="margin-top:6px"><button class="link-btn link-verde" data-acao="solicitar">O que eu posso fazer agora?</button> · ' +
      '<a class="link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L.mapa) + '">Como chegar</a></p></div>';
  }
  function selecionarLocal(chave) {
    localAtual = chave;
    document.querySelectorAll(".aba").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.local === chave)); });
    $("painel-consultorio").innerHTML = painel(chave);
  }
  document.querySelectorAll(".aba").forEach(function (b) { b.addEventListener("click", function () { selecionarLocal(b.dataset.local); }); });
  selecionarLocal("tele");

  function folhaEndereco(chave) {
    var h = "<h3>Doentes que vejo</h3><ul class=\"f-lista-icone\"><li>" + I.grupo + "Adultos</li><li>" + I.carrinho + "Crianças a partir dos 16 anos de idade</li></ul>";
    if (chave === "tele") h += "<h3>Como se preparar para a consulta online</h3><p>" + esc(LOCAIS.tele.preparo) + "</p>";
    else h += "<h3>Endereço</h3><p>" + esc(LOCAIS.end.titulo) + "<br><span class=\"cinza\">" + esc(LOCAIS.end.local) + "</span></p>";
    var servs = D.servicos.filter(function (s) { return s.locais.indexOf(chave) !== -1; });
    h += '<h3>Pesquisa de serviços relacionados</h3><button class="link-btn link" id="ver-servicos">Ver serviços</button>' +
      '<ul class="lista-ponto f-servicos" id="f-servicos" hidden>' + servs.map(function (s) {
        return "<li>" + esc(s.nome) + (s.temDescricao || s.descricao ? ' <span class="cinza">(descrição)</span>' : "") + " • " +
          (s.preco ? esc(s.preco) : "Consultar valores") + "</li>";
      }).join("") + "</ul>";
    abrirFolha("Detalhes do endereço", h, function (c) {
      c.querySelector("#ver-servicos").onclick = function () { var u = c.querySelector("#f-servicos"); u.hidden = !u.hidden; };
    });
  }

  function folhaContato(chave) {
    chave = chave || localAtual;
    var opts = '<option value="tele"' + (chave === "tele" ? " selected" : "") + ">Teleconsulta</option>" +
      '<option value="end"' + (chave === "end" ? " selected" : "") + ">" + esc(LOCAIS.end.titulo) + "</option>";
    var h = '<p class="f-sub" style="font-size:15px">Consultórios (2)</p><select class="f-select" id="sel-local" aria-label="Consultório">' + opts + "</select>";
    if (chave === "tele") h += '<div class="f-linha">' + I.local + "<span>Teleconsulta</span></div>";
    else h += '<div class="f-linha">' + I.local + "<span>" + esc(LOCAIS.end.titulo) + '<br><span class="cinza">' + esc(LOCAIS.end.local) + "</span></span></div>";
    h += '<div class="f-linha">' + I.grupo + "<span>Atende: adultos, crianças a partir dos 16 anos de idade</span></div>";
    if (D.telefone) h += '<div class="f-linha">' + I.fone + '<a href="tel:' + esc(D.telefone.replace(/[^\d+]/g, "")) + '">' + esc(D.telefone) + "</a></div>";
    if (D.whatsapp) h += '<div class="f-linha">' + I.whats + '<a target="_blank" rel="noopener" href="' + linkWhats("Olá, " + D.primeiroNome + "! Gostaria de agendar uma consulta.") + '">Conversar no WhatsApp</a></div>';
    if (D.email) h += '<div class="f-linha">' + I.email + '<a href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a></div>";
    h += '<button class="btn btn-verde btn-largo" data-acao="solicitar">Solicite um atendimento</button>';
    abrirFolha("Informações de contato", h, function (c) {
      c.querySelector("#sel-local").onchange = function () { folhaContato(this.value); };
    });
  }

  // =================== PLANOS ===================
  $("lista-planos").innerHTML = D.planos.map(function (p) {
    return '<li><strong>' + esc(p.nome) + '</strong> <span style="vertical-align:-3px">' + I.calX + '</span> <span class="cinza">(Não disponível para agendamentos online)</span></li>';
  }).join("");
  function folhaPlanos() {
    abrirFolha("Encontre o seu plano de saúde",
      "<p>Os planos de saúde são aceitos, mas a cobertura varia de acordo com o local e o serviço. Confirme durante a etapa de agendamento!</p>" +
      '<p class="cinza" style="font-size:14px;margin-bottom:8px">Atualmente indisponível para consultas online</p>' +
      D.planos.map(function (p) { return '<button class="f-planos-item" data-acao="convenio">' + I.calX + esc(p.nome) + I.seta + "</button>"; }).join(""));
  }
  function folhaConvenio() {
    abrirFolha("O convênio não está disponível para agendamento online",
      '<div class="f-centro">' + ILU_CAL +
      "<p>Esta especialista não tem vagas disponíveis online com convênio. Você pode pagar particular e solicitar o reembolso ao seu plano de saúde.</p>" +
      '<button class="btn btn-bege btn-largo" data-acao="planos">Ver planos de saúde</button>' +
      '<button class="btn btn-verde btn-largo" data-acao="solicitar">' + I.calX.replace('stroke="currentColor"', 'stroke="#fff"') + "Pagarei do meu bolso</button></div>");
  }

  // =================== SOLICITAR ATENDIMENTO ===================
  var diaPreferido = null;
  function folhaSolicitar(servicoIdx) {
    var opts = '<option value="">Selecione (opcional)</option>' + D.servicos.map(function (s, i) {
      return '<option value="' + i + '"' + (String(i) === String(servicoIdx) ? " selected" : "") + ">" + esc(s.nome) + "</option>";
    }).join("");
    var h = "<p>Esta especialista não permite agendamento online neste endereço. Deixe seus dados de contato e " + esc(D.primeiroNome) +
      " entrará em contato com você para combinar o melhor dia e horário." + (diaPreferido ? " <strong>Dia de preferência: " + esc(diaPreferido) + ".</strong>" : "") + "</p>" +
      '<p>* campos obrigatórios</p><form class="form" id="form-solicitar" novalidate>' +
      '<label for="f-email">E-mail *</label><input type="email" id="f-email" placeholder="Digite seu email aqui" required>' +
      '<label for="f-tel">Telefone <em>(opcional)</em> ' + I.info + '</label><input type="tel" id="f-tel" placeholder="Digite seu número de telefone. Exemplo: 11999999999">' +
      '<label for="f-serv">Serviço <em>(opcional)</em></label><select id="f-serv">' + opts + "</select>" +
      '<label class="check"><input type="checkbox" id="f-termos"> <span>Você aceita <a href="#" data-acao="termos">os termos de uso</a>, bem como declara ciência do conteúdo da <a href="#" data-acao="termos">política de privacidade</a> .</span></label>' +
      '<button class="btn btn-verde btn-largo" type="submit" id="f-enviar" disabled>Enviar</button></form>';
    abrirFolha("Solicite a este especialista para ativar o calendário", h, function (c) {
      var email = c.querySelector("#f-email"), termos = c.querySelector("#f-termos"), btn = c.querySelector("#f-enviar");
      function validar() { btn.disabled = !(email.value.trim() && email.checkValidity() && termos.checked); }
      email.oninput = validar; termos.onchange = validar;
      c.querySelector("#form-solicitar").onsubmit = function (e) {
        e.preventDefault(); validar(); if (btn.disabled) return;
        var serv = c.querySelector("#f-serv").value, tel = c.querySelector("#f-tel").value.trim();
        var texto = "Olá, " + D.primeiroNome + "! Gostaria de solicitar um atendimento.\nE-mail: " + email.value.trim() +
          (tel ? "\nTelefone: " + tel : "") + (serv !== "" ? "\nServiço: " + D.servicos[serv].nome : "") + (diaPreferido ? "\nDia de preferência: " + diaPreferido : "");
        if (enviar(texto, "Solicitação de atendimento")) { fecharFolha(); toast("Solicitação enviada!"); }
      };
    });
  }
  function folhaTermos() {
    abrirFolha("Termos de uso e privacidade",
      "<p>Os dados informados nos formulários deste site (e-mail, telefone e mensagens) são usados apenas para que " + esc(D.nome) +
      " entre em contato com você sobre o atendimento solicitado. Eles não são compartilhados com terceiros.</p>" +
      "<p>As informações deste site têm caráter informativo e não substituem uma consulta profissional.</p>" +
      '<button class="btn btn-bege btn-largo" data-acao="solicitar">Voltar</button>');
  }

  // =================== OPINIÕES ===================
  $("estrelas-opinioes").innerHTML = estrelas(D.nota);
  $("qtd-opinioes-2").textContent = plural(TOTAL_OP, "opinião", "opiniões");
  var contagem = {};
  D.opinioes.forEach(function (o) { contagem[o.servico] = (contagem[o.servico] || 0) + 1; });
  $("filtro-op").innerHTML = '<option value="">Todas as opiniões</option>' + Object.keys(contagem).map(function (s) {
    return '<option value="' + esc(s) + '">' + esc(s) + " (" + contagem[s] + ")</option>";
  }).join("");

  var POR_PAGINA = 10, mostrarTodas = false;
  function marcar(texto, termo) {
    var t = esc(texto); if (!termo) return t;
    var re = new RegExp("(" + esc(termo).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
    return t.replace(re, '<mark class="marca">$1</mark>');
  }
  function pintarOpinioes() {
    var filtro = $("filtro-op").value, termo = $("busca-op").value.trim();
    var l = D.opinioes.filter(function (o) {
      return (!filtro || o.servico === filtro) && (!termo || o.texto.toLowerCase().indexOf(termo.toLowerCase()) !== -1);
    });
    var visiveis = (mostrarTodas || filtro || termo) ? l : l.slice(0, POR_PAGINA);
    $("btn-veja-mais").hidden = visiveis.length >= l.length;
    if (!l.length) { $("lista-opinioes").innerHTML = '<li class="vazio">Nenhuma opinião encontrada.</li>'; return; }
    $("lista-opinioes").innerHTML = visiveis.map(function (o) {
      var i = D.opinioes.indexOf(o), longo = o.autor.length > 20;
      var badge = o.tipo === "consulta"
        ? '<span class="badge badge-consulta">Consulta verificada ' + I.checkCirculo + "</span>"
        : '<span class="badge badge-opiniao">Opinião Verificada</span>';
      return '<li><div class="op-cab' + (o.tipo === "consulta" ? " quebra" : "") + '"><span class="op-letra">' + esc(o.autor.charAt(0).toUpperCase()) +
        '</span><span class="op-autor">' + esc(o.autor) + "</span>" + (longo ? '<span style="flex-basis:100%"></span>' : "") + badge +
        '<span class="estrelas">' + estrelas(5) + "</span></div>" +
        '<p class="op-texto">' + marcar(o.texto, termo) + "</p>" +
        '<p class="op-meta">' + esc(o.data) + "<br>• " + esc(o.local) + " • " + esc(o.servico) + ' • <button class="link-btn link" data-acao="revisao" data-i="' + i + '">Solicitar revisão</button></p></li>';
    }).join("");
  }
  $("filtro-op").addEventListener("change", pintarOpinioes);
  $("busca-op").addEventListener("input", pintarOpinioes);
  $("busca-op-form").addEventListener("submit", function (e) { e.preventDefault(); pintarOpinioes(); });
  $("btn-veja-mais").addEventListener("click", function () { mostrarTodas = true; pintarOpinioes(); });
  pintarOpinioes();

  function folhaEnviarOpiniao() {
    var nota = 5;
    var opts = D.servicos.map(function (s) { return "<option>" + esc(s.nome) + "</option>"; }).join("");
    abrirFolha("Enviar opinião",
      '<form class="form" id="form-op"><p>Como foi o seu atendimento com ' + esc(D.primeiroNome) + '?</p><div class="nota-escolha" id="nota-escolha" role="radiogroup" aria-label="Sua nota"></div>' +
      '<label for="op-nome">Seu nome *</label><input type="text" id="op-nome" required>' +
      '<label for="op-serv">Serviço</label><select id="op-serv">' + opts + "</select>" +
      '<label for="op-texto">Sua opinião *</label><textarea id="op-texto" rows="4" required></textarea>' +
      '<p class="cinza" style="font-size:13px;margin-top:10px">Leia as <a href="#" class="link" data-acao="diretrizes">diretrizes sobre opiniões</a> antes de enviar.</p>' +
      '<button class="btn btn-verde btn-largo" type="submit">Enviar opinião</button></form>',
      function (c) {
        var box = c.querySelector("#nota-escolha");
        function pintar() {
          var h = ""; for (var i = 1; i <= 5; i++) h += '<button type="button" role="radio" aria-checked="' + (i === nota) + '" aria-label="' + i + ' estrelas" data-n="' + i + '"' + (i <= nota ? ' class="ativa"' : "") + ">" + I.estrela + "</button>";
          box.innerHTML = h;
        }
        box.onclick = function (e) { var b = e.target.closest("button"); if (b) { nota = +b.dataset.n; pintar(); } };
        pintar();
        c.querySelector("#form-op").onsubmit = function (e) {
          e.preventDefault();
          var nome = c.querySelector("#op-nome").value.trim(), txt = c.querySelector("#op-texto").value.trim();
          if (!nome || !txt) { toast("Preencha seu nome e sua opinião."); return; }
          if (enviar("Opinião sobre o atendimento (" + nota + " estrelas)\nNome: " + nome + "\nServiço: " + c.querySelector("#op-serv").value + "\n\n" + txt, "Opinião sobre o atendimento")) {
            fecharFolha(); toast("Obrigado pela sua opinião!");
          }
        };
      });
  }
  function folhaRevisao(i) {
    var o = D.opinioes[i];
    abrirFolha("Solicitar revisão",
      "<p>Você está solicitando a revisão da opinião de <strong>" + esc(o.autor) + "</strong> (" + esc(o.data) + ").</p>" +
      '<form class="form" id="form-rev"><label for="rev-motivo">Motivo *</label><textarea id="rev-motivo" rows="4" required></textarea>' +
      '<button class="btn btn-verde btn-largo" type="submit">Enviar</button></form>',
      function (c) {
        c.querySelector("#form-rev").onsubmit = function (e) {
          e.preventDefault(); var m = c.querySelector("#rev-motivo").value.trim(); if (!m) return;
          if (enviar("Pedido de revisão da opinião de " + o.autor + " (" + o.data + ")\nMotivo: " + m, "Revisão de opinião")) { fecharFolha(); toast("Pedido enviado!"); }
        };
      });
  }
  function folhaDiretrizes() {
    function card(t, faca, nao) {
      return '<div class="diretriz"><h4>' + I.estrela + t + "</h4><p><strong>FAÇA:</strong> " + faca + "</p>" + (nao ? "<p><strong>NÃO FAÇA:</strong> " + nao + "</p>" : "") + "</div>";
    }
    abrirFolha("Diretrizes sobre opiniões",
      '<p class="cinza">Ajude-nos a tornar a experiência de saúde mais humana.</p>' +
      card("SEJA HONESTO", "Seja justo e compartilhe sua experiência pessoal honestamente, sem mentir. Se você levou alguém (por exemplo, crianças, idosos) ao profissional, você pode escrever sobre isso, mas certifique-se de estar autorizado a escrever a opinião.",
        "Nunca escreva uma opinião se você recebeu incentivo ou qualquer outro benefício para fazê-lo. Evite declarações objetivas e opiniões baseadas no que outra pessoa lhe disse ou no que você leu na mídia.") +
      card("SEJA ESPECÍFICO", "Tente ser o mais claro possível. Isso ajudará os profissionais a refletirem sobre sua opinião e os usuários a tomarem decisões.") +
      card("SEJA RESPEITOSO", "Escreva com educação, mesmo quando a experiência não foi boa.", "Não publique conteúdo odioso, difamatório, discriminatório, agressivo ou obsceno.") +
      "<p><strong>Exemplos de tópicos sobre os quais você pode escrever:</strong></p><ul class=\"lista-ponto\"><li>Quão fácil e precisa foi a informação que você encontrou no perfil de um profissional.</li><li>Se a reserva foi cancelada, remarcada, atrasada ou se o profissional não compareceu.</li><li>Sua opinião sobre a experiência, sua percepção sobre o atendimento.</li></ul>");
  }

  // =================== DÚVIDAS ===================
  $("sub-duvidas").textContent = plural(D.duvidas.length, "dúvida de paciente respondida", "dúvidas de pacientes respondidas");
  $("lista-duvidas").innerHTML = D.duvidas.map(function (d, i) {
    return '<div class="duvida"><p class="duvida-titulo">' + esc(d.titulo) + "</p>" +
      '<div class="duvida-pergunta recolhida" id="dq-' + i + '"><span>' + esc(d.pergunta) + "</span>" +
      (d.pergunta.length > 260 ? ' <button class="link-btn link" data-acao="duvida-mais" data-i="' + i + '">mais</button>' : "") + "</div>" +
      '<p class="duvida-rotulo">Resposta do especialista da saúde :</p>' +
      '<div class="duvida-resp"><img src="' + esc(D.foto) + '" alt=""><div class="balao">' + esc(d.resposta) + "</div></div></div>";
  }).join("");

  // =================== FAQ ===================
  var servicosFaq = ["Orientação Vocacional", "Psicoterapia de Grupo", "Psicoterapia breve", "Tratamento da ansiedade", "Orientação profissional",
    "Consulta psicológica do adolescente", "Consulta psicológica do adulto", "Consulta psicológica do idoso", "Tratamento da síndrome do pânico", "Terapia Familiar"];
  var N = D.nome;
  var FAQ = [
    ["Quais são as principais especialidades de " + N + "?", esc(N) + " é psicóloga. Te mostramos alguns dos serviços oferecidos pela especialista graças à sua trajetória e vasta experiência: " + esc(servicosFaq.join(", ")) + "."],
    ["Onde fica o consultório de " + N + "?", esc(N) + " atende em:<ul><li>" + esc(LOCAIS.end.titulo.replace(", Petrolina", "")) + " Petrolina</li></ul>"],
    ["Posso passar por atendimento online com " + N + ", sem ter que ir até o consultório?", "Sim. " + esc(N) + " atende por teleconsulta (chamada de vídeo). Entre em contato para combinar o horário."],
    ["Quais métodos de pagamento são aceitos por " + N + "?", esc(N) + " aceita os seguintes métodos de pagamento: " + esc(D.pagamentos.join(", ")) + "."],
    ["Em quais idiomas " + N + " atende?", esc(N) + " atende em " + esc(D.idiomas.join(", ")) + "."],
    ["Como posso marcar uma consulta com " + N + "?", esc(N) + " ainda não indicou os horários que tem disponíveis neste endereço. Recomendamos que entre em contato diretamente com a especialista para conhecer sua disponibilidade. <button class=\"link-btn link-verde\" data-acao=\"solicitar\">Solicite um atendimento</button>"],
    ["Quando poderia me consultar com " + N + "?", "Entre em contato diretamente com " + esc(N) + " para verificar sua disponibilidade."],
    ["O que outros pacientes opinam sobre " + N + "?", "Um total de " + TOTAL_OP + " pacientes já deixou uma opinião honesta e real sobre " + esc(N) + ", que tem uma avaliação média de " + D.nota + " estrelas (de 5)."],
    ["Quais são os convênios aceitos por " + N + "?", "Estes são alguns dos convênios aceitos por " + esc(N) + ": " + esc(D.planos.map(function (p) { return p.nome; }).join(", ")) + ". <button class=\"link-btn link\" data-acao=\"planos\">Verifique a lista completa de convênios aceitos.</button>"],
  ];
  $("lista-faq").innerHTML = FAQ.map(function (f, i) {
    return '<details class="faq-item"' + (i === 0 ? " open" : "") + "><summary>" + esc(f[0]) + '</summary><div class="resp">' + f[1] + "</div></details>";
  }).join("");

  // =================== AGENDA ===================
  var SEM = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], MES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  var pagDias = 0;
  function pintarDias() {
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0); var h = "";
    for (var i = pagDias * 4; i < pagDias * 4 + 4; i++) {
      var d = new Date(hoje); d.setDate(hoje.getDate() + i);
      var rot = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : SEM[d.getDay()];
      var txt = d.getDate() + " " + MES[d.getMonth()];
      h += '<button class="dia" data-dia="' + rot + ", " + txt + '">' + rot + "<small>" + txt + "</small></button>";
    }
    $("dias").innerHTML = h;
    $("dias-ant").disabled = pagDias === 0;
    $("dias-prox").disabled = pagDias >= 6;
  }
  $("dias-ant").onclick = function () { pagDias--; pintarDias(); };
  $("dias-prox").onclick = function () { pagDias++; pintarDias(); };
  $("dias").onclick = function (e) { var b = e.target.closest(".dia"); if (b) { diaPreferido = b.dataset.dia; folhaSolicitar(); } };
  pintarDias();
  var agenda = $("agenda"), lateral = document.querySelector(".coluna-lateral"), slot = document.querySelector(".agenda-mobile");
  var mq = window.matchMedia("(max-width: 820px)");
  function posAgenda() { (mq.matches ? slot : lateral).appendChild(agenda); }
  if (mq.addEventListener) mq.addEventListener("change", posAgenda); else mq.addListener(posAgenda);
  posAgenda();

  // =================== ABAS DAS SEÇÕES (scroll-spy) ===================
  var abas = Array.prototype.slice.call(document.querySelectorAll(".abas-secoes a"));
  var secoes = abas.map(function (a) { return $(a.getAttribute("href").slice(1)); });
  function marcarAba() {
    var topo = $("abas-secoes").getBoundingClientRect().bottom + 20, ativa = 0;
    secoes.forEach(function (s, i) { if (s.getBoundingClientRect().top <= topo) ativa = i; });
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 4) ativa = abas.length - 1;
    abas.forEach(function (a, i) {
      var on = i === ativa;
      if (on && !a.classList.contains("ativa")) a.parentNode.scrollTo({ left: a.offsetLeft - 16, behavior: "smooth" });
      a.classList.toggle("ativa", on);
    });
  }
  window.addEventListener("scroll", marcarAba, { passive: true });
  marcarAba();

  // =================== BUSCA DO TOPO ===================
  var itensBusca = [];
  D.servicos.forEach(function (s, i) { itensBusca.push({ t: s.nome, sub: "Serviço · " + (s.preco || "Consultar valores"), acao: function () { folhaServico(i); } }); });
  D.doencas.forEach(function (d) { itensBusca.push({ t: d, sub: "Doença tratada", acao: function () { pintarDoencas(true); rolarPara("experiencia"); } }); });
  [["Experiência", "experiencia"], ["Consultórios / Endereço", "consultorios"], ["Planos de saúde", "planos"], ["Opiniões", "opinioes"], ["Dúvidas respondidas", "duvidas"], ["Perguntas frequentes", "faq"]]
    .forEach(function (x) { itensBusca.push({ t: x[0], sub: "Seção", acao: function () { rolarPara(x[1]); } }); });
  var sug = $("sugestoes"), inp = $("busca-topo-input"), achados = [];
  function semAcento(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function buscar() {
    var q = semAcento(inp.value.trim());
    if (!q) { sug.hidden = true; return; }
    achados = itensBusca.filter(function (x) { return semAcento(x.t).indexOf(q) !== -1; }).slice(0, 8);
    sug.innerHTML = achados.length ? achados.map(function (x, i) { return '<li><button type="button" data-k="' + i + '">' + esc(x.t) + "<small>" + esc(x.sub) + "</small></button></li>"; }).join("")
      : '<li class="vazio">Nada encontrado para "' + esc(inp.value.trim()) + '"</li>';
    sug.hidden = false;
  }
  inp.addEventListener("input", buscar);
  inp.addEventListener("focus", buscar);
  sug.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    var x = achados[+b.dataset.k]; sug.hidden = true; inp.value = ""; inp.blur(); x.acao();
  });
  $("busca-topo").addEventListener("submit", function (e) { e.preventDefault(); buscar(); if (achados[0]) { var x = achados[0]; sug.hidden = true; inp.value = ""; inp.blur(); x.acao(); } });
  document.addEventListener("click", function (e) { if (!e.target.closest("#busca-topo")) sug.hidden = true; });

  // =================== MENU ===================
  var menu = $("menu"), menuBtn = $("menu-btn");
  function abrirMenu(on) { menu.hidden = !on; menuBtn.setAttribute("aria-expanded", String(on)); document.body.classList.toggle("travado", on); }
  menuBtn.onclick = function () { abrirMenu(true); };
  menu.addEventListener("click", function (e) { if (e.target === menu || e.target.closest("[data-fechar-menu]")) abrirMenu(false); });

  // =================== AÇÕES (delegação) ===================
  var ACOES = {
    "mais-detalhes": function (b) { folhaMaisDetalhes(!!b.closest("#experiencia")); },
    "ir-endereco": function () { selecionarLocal("end"); rolarPara("consultorios"); },
    "ir-planos": function () { rolarPara("planos"); },
    "formacao": function () { abrirFolha("Formação", lista(D.formacao)); },
    "contato": function () { folhaContato(); },
    "solicitar": function (b) { if (!b.closest(".coluna-lateral, .agenda-mobile")) diaPreferido = null; folhaSolicitar(b.dataset.servico); },
    "servico": function (b) { folhaServico(+b.dataset.i); },
    "detalhes-endereco": function () { folhaEndereco(localAtual); },
    "planos": folhaPlanos,
    "convenio": folhaConvenio,
    "termos": folhaTermos,
    "enviar-opiniao": folhaEnviarOpiniao,
    "revisao": function (b) { folhaRevisao(+b.dataset.i); },
    "diretrizes": folhaDiretrizes,
    "duvida-mais": function (b) {
      var q = $("dq-" + b.dataset.i), rec = q.classList.toggle("recolhida"); b.textContent = rec ? "mais" : "menos";
    },
  };
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-acao]");
    if (!b || !ACOES[b.dataset.acao]) return;
    e.preventDefault();
    ACOES[b.dataset.acao](b);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!lightbox.hidden) lightbox.click();
    else if (!menu.hidden) abrirMenu(false);
    else fecharFolha();
  });

  $("ano").textContent = new Date().getFullYear();
})();
