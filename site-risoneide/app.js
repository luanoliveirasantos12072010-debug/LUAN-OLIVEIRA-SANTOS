(function () {
  "use strict";
  var D = window.DADOS;
  var $ = function (id) { return document.getElementById(id); };
  var LOCAIS = D.consultorios;
  // Chaves novas do Supabase ("sb_publishable_...") não são JWT: vão só no cabeçalho apikey.
  window.SITE_SUPABASE_HEADERS = function () {
    var h = { apikey: D.supabaseChave, "Content-Type": "application/json" };
    if (/^eyJ/.test(D.supabaseChave)) h.Authorization = "Bearer " + D.supabaseChave;
    return h;
  };

  var I = {
    pix: '<svg viewBox="0 0 24 24"><path d="M12 2.5 9.2 5.3a2.6 2.6 0 0 1 1.8.8l1 1 1-1a2.6 2.6 0 0 1 1.8-.8zM5.3 9.2 2.5 12l2.8 2.8a2.6 2.6 0 0 1 .8-1.8l1-1-1-1a2.6 2.6 0 0 1-.8-1.8zm13.4 0a2.6 2.6 0 0 1-.8 1.8l-1 1 1 1a2.6 2.6 0 0 1 .8 1.8l2.8-2.8zM12 16.9l-1 1a2.6 2.6 0 0 1-1.8.8l2.8 2.8 2.8-2.8a2.6 2.6 0 0 1-1.8-.8zM7.4 8.2h.7a1.6 1.6 0 0 1 1.1.5L11 10.5a1.4 1.4 0 0 0 2 0l1.8-1.8a1.6 1.6 0 0 1 1.1-.5h.7l-2.9-2.9a2.6 2.6 0 0 0-3.6 0zm9.2 7.6h-.7a1.6 1.6 0 0 1-1.1-.5L13 13.5a1.4 1.4 0 0 0-2 0l-1.8 1.8a1.6 1.6 0 0 1-1.1.5h-.7l2.9 2.9a2.6 2.6 0 0 0 3.6 0z"/></svg>',
    estrela: '<svg viewBox="0 0 24 24"><path d="m12 2 3 6.6 7.2.7-5.4 4.8 1.6 7.1L12 17.5 5.6 21.2l1.6-7.1L1.8 9.3 9 8.6z"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
    adulto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M9 7h6l1 7h-2l-1 8h-2l-1-8H8z"/></svg>',
    crianca: '<svg viewBox="0 0 24 24"><circle cx="8" cy="5" r="2"/><path d="M5.5 8h5l.8 6H10l-.7 7H6.7L6 14H4.7z"/><circle cx="17" cy="9" r="1.6"/><path d="M15 11.5h4l.6 4.5h-1l-.6 5h-2l-.6-5h-1z"/></svg>',
    grupo: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5zM15.5 19c0-2-.6-3.6-1.7-4.7 3.3-.6 7.2.8 7.2 4.7z"/></svg>',
    local: '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>',
    video: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-4v12l-6-4z"/></svg>',
    fone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>',
    whats: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 6 9 7 9-7" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  };

  var ILU_TELE =
    '<div class="ilustracao"><svg viewBox="0 0 300 90" style="fill:none">' +
    '<path d="M50 60 C90 24 120 68 150 42 S220 18 255 32" stroke="#3d6f63" stroke-width="2" stroke-dasharray="5 5"/>' +
    '<circle cx="50" cy="60" r="15" fill="#e3a73b"/><rect x="46" y="51" width="8" height="13" rx="4" fill="#fff"/>' +
    '<rect x="116" y="8" width="68" height="76" rx="6" fill="#fff" stroke="#3d6f63" stroke-width="2"/><path d="M116 18h68" stroke="#3d6f63" stroke-width="2"/>' +
    '<path d="M136 52c0-14 7-22 14-22s14 8 14 22" fill="#3a2e2a"/><circle cx="150" cy="45" r="10" fill="#e8b89a"/><path d="M128 84c2-18 42-18 44 0" fill="#c98b7a"/>' +
    '<circle cx="255" cy="32" r="16" fill="#3d6f63"/><rect x="247" y="26" width="11" height="12" rx="2" fill="#fff"/><path d="m258 30 5-3v11l-5-3z" fill="#fff"/>' +
    "</svg></div>";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function estrelas(n) {
    var h = "", r = Math.round(n);
    for (var i = 1; i <= 5; i++) h += i <= r ? I.estrela : I.estrela.replace("<svg", '<svg class="vazia"');
    return h;
  }
  function plural(n, um, varios) { return n + " " + (n === 1 ? um : varios); }
  function toast(msg) {
    var t = $("toast"); t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.hidden = true; }, 3400);
  }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function rolarPara(id) { var el = $(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  var A_COMBINAR = "Valor a combinar";
  function precoLista(s) { return s.preco ? '<span class="preco">' + esc(s.preco) + "</span>" : '<span class="preco consultar">' + A_COMBINAR + "</span>"; }
  function precoModal(s) { return s.preco ? esc(s.preco) : '<span class="consultar">' + A_COMBINAR + "</span>"; }
  function lista(itens) { return '<ul class="lista-ponto">' + itens.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }
  function dataHoje(d) { return (d || new Date()).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); }

  // =================== JANELA (bottom sheet) ===================
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
  folha.addEventListener("click", function (e) { if (e.target === folha || e.target.closest(".fechar")) fecharFolha(); });

  // =================== CONTATO ===================
  function linkWhats(texto) { return "https://wa.me/" + D.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(texto); }
  function enviar(texto, assunto) {
    if (D.whatsapp) { window.open(linkWhats(texto), "_blank", "noopener"); return true; }
    if (D.email) { location.href = "mailto:" + D.email + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(texto); return true; }
    toast("O WhatsApp da psicóloga ainda não foi configurado no site.");
    return false;
  }

  var MSG_PADRAO = "Olá, " + D.primeiroNome + "! Vim pelo seu site e gostaria de agendar uma consulta.";
  function btnWhats(texto, msg) {
    if (!D.whatsapp) return "";
    return '<a class="btn btn-whats btn-largo" target="_blank" rel="noopener" href="' + linkWhats(msg || MSG_PADRAO) + '">' + I.whats + esc(texto || "Chamar no WhatsApp") + "</a>";
  }
  document.querySelectorAll(".js-whats").forEach(function (a) {
    if (D.whatsapp) a.href = linkWhats(MSG_PADRAO); else a.hidden = true;
  });
  if ($("tel-rodape")) $("tel-rodape").textContent = D.telefone || D.whatsapp;

  // =================== PERFIL ===================
  $("nome").textContent = D.nome;
  $("profissao").textContent = D.profissao;
  $("cidade").textContent = D.cidade;
  $("registro").textContent = D.registro;

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
  $("sobre-resumo").textContent = D.sobreResumo;
  $("abordagens").innerHTML = D.abordagens.map(function (a) { return "<li>" + I.check + esc(a) + "</li>"; }).join("");
  $("experiencia-em").innerHTML = D.experienciaEm.map(function (a) { return '<span class="tag">' + esc(a) + "</span>"; }).join("");
  $("pacientes").innerHTML = D.pacientes.map(function (p) { return "<li>" + I[p.icone] + esc(p.texto) + "</li>"; }).join("");

  function folhaMaisDetalhes(completo) {
    var h = "<h3>Trabalho como</h3>" + lista(D.trabalhoComo) + "<h3>Mais de 30 anos trabalhando com</h3>" + lista(D.experienciaEm);
    if (completo) h += "<h3>Formação</h3>" + lista(D.formacao) + "<h3>Idiomas</h3>" + lista(D.idiomas);
    h += '<button class="btn btn-verde btn-largo" data-acao="solicitar">Agendar consulta</button>' + btnWhats();
    abrirFolha("Mais detalhes", h);
  }

  // =================== SERVIÇOS ===================
  var servicosAbertos = false;
  function pintarServicos() {
    var l = servicosAbertos ? D.servicos : D.servicos.slice(0, 5);
    $("lista-servicos").innerHTML = l.map(function (s) {
      return '<li><button class="servico-linha" data-acao="servico" data-i="' + D.servicos.indexOf(s) + '"><span><strong>' + esc(s.nome) + "</strong>" + precoLista(s) +
        '</span><span class="detalhes-btn">Agendar ›</span></button></li>';
    }).join("");
    var resto = D.servicos.length - 5, b = $("btn-mais-servicos");
    b.hidden = resto <= 0;
    b.textContent = servicosAbertos ? "Mostrar menos" : "+ " + plural(resto, "serviço", "serviços");
  }
  $("btn-mais-servicos").addEventListener("click", function () { servicosAbertos = !servicosAbertos; pintarServicos(); });
  pintarServicos();
  $("btn-precos").addEventListener("click", function () { var p = $("precos-texto"); p.hidden = !p.hidden; this.setAttribute("aria-expanded", String(!p.hidden)); });

  function cabLocal(chave) {
    if (chave === "tele") return '<div class="f-local">' + I.video + "<span><b>Teleconsulta</b><span>Online, por chamada de vídeo</span></span></div>";
    return '<div class="f-local">' + I.local + "<span><b>" + esc(LOCAIS.end.titulo) + "</b><span>" + esc(LOCAIS.end.local) + "</span></span></div>";
  }

  // =================== CONSULTÓRIOS ===================
  var localAtual = "tele";
  function painel(chave) {
    if (chave === "tele") {
      return '<div class="consultorio"><div class="consultorio-titulo"><img class="mini-foto" src="' + esc(D.foto) + '" alt="">Teleconsulta<small>&nbsp;· online, de onde você estiver</small></div>' + ILU_TELE +
        "<p>Atendimento por chamada de vídeo, com o mesmo cuidado da consulta presencial. Ideal para quem mora longe ou tem a rotina corrida.</p>" +
        '<button class="btn btn-verde" data-acao="solicitar" data-modalidade="Teleconsulta">Agendar teleconsulta</button>' +
        btnWhats("Agendar teleconsulta pelo WhatsApp", "Olá, " + D.primeiroNome + "! Vim pelo seu site e gostaria de agendar uma teleconsulta.") + "</div>";
    }
    var L = LOCAIS.end;
    return '<div class="consultorio"><div class="consultorio-titulo">' + I.local + "<div>" + esc(L.titulo) + "<small>" + esc(L.local) + "</small></div></div>" +
      '<iframe class="mapa" loading="lazy" title="Mapa do consultório" src="https://maps.google.com/maps?q=' + encodeURIComponent(L.mapa) + '&output=embed"></iframe>' +
      '<p><a class="link" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(L.mapa) + '">Como chegar</a></p>' +
      '<button class="btn btn-verde" data-acao="solicitar" data-modalidade="Presencial">Agendar consulta presencial</button>' +
      btnWhats("Agendar presencial pelo WhatsApp", "Olá, " + D.primeiroNome + "! Vim pelo seu site e gostaria de agendar uma consulta presencial.") + "</div>";
  }
  function selecionarLocal(chave) {
    localAtual = chave;
    document.querySelectorAll(".aba").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.local === chave)); });
    $("painel-consultorio").innerHTML = painel(chave);
  }
  document.querySelectorAll(".aba").forEach(function (b) { b.addEventListener("click", function () { selecionarLocal(b.dataset.local); }); });
  selecionarLocal("tele");
  $("lista-pagamentos").innerHTML = D.pagamentos.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");

  function folhaEndereco(chave) {
    var h = '<h3>Pacientes atendidos</h3><ul class="f-lista-icone"><li>' + I.adulto + "Adultos</li><li>" + I.crianca + "Crianças a partir dos 16 anos de idade</li></ul>";
    if (chave === "tele") h += "<h3>Como se preparar para a consulta online</h3><p>" + esc(LOCAIS.tele.preparo) + "</p>";
    else h += "<h3>Endereço</h3><p>" + esc(LOCAIS.end.titulo) + '<br><span class="cinza">' + esc(LOCAIS.end.local) + "</span></p>";
    var servs = D.servicos.filter(function (s) { return s.locais.indexOf(chave) !== -1; });
    h += '<h3>Serviços neste local</h3><button class="link-btn link" id="ver-servicos">Ver serviços</button><ul class="lista-ponto f-servicos" id="f-servicos" hidden>' +
      servs.map(function (s) { return "<li>" + esc(s.nome) + " • " + (s.preco ? esc(s.preco) : A_COMBINAR) + "</li>"; }).join("") + "</ul>";
    h += '<button class="btn btn-verde btn-largo" data-acao="solicitar">Agendar consulta</button>' + btnWhats();
    abrirFolha(chave === "tele" ? "Teleconsulta" : "Consultório presencial", h, function (c) {
      c.querySelector("#ver-servicos").onclick = function () { var u = c.querySelector("#f-servicos"); u.hidden = !u.hidden; };
    });
  }

  function folhaContato(chave) {
    chave = chave || localAtual;
    var h = '<select class="f-select" id="sel-local" aria-label="Consultório"><option value="tele"' + (chave === "tele" ? " selected" : "") + '>Teleconsulta</option><option value="end"' +
      (chave === "end" ? " selected" : "") + ">" + esc(LOCAIS.end.titulo) + "</option></select>";
    h += chave === "tele" ? '<div class="f-linha">' + I.video + "<span>Teleconsulta — online, por chamada de vídeo</span></div>"
      : '<div class="f-linha">' + I.local + "<span>" + esc(LOCAIS.end.titulo) + '<br><span class="cinza">' + esc(LOCAIS.end.local) + "</span></span></div>";
    h += '<div class="f-linha">' + I.grupo + "<span>Atende: adultos, crianças a partir dos 16 anos de idade</span></div>";
    if (D.whatsapp) h += '<div class="f-linha">' + I.whats + '<a target="_blank" rel="noopener" href="' + linkWhats("Olá, " + D.primeiroNome + "! Gostaria de agendar uma consulta.") + '">Conversar no WhatsApp</a></div>';
    if (D.telefone) h += '<div class="f-linha">' + I.fone + '<a href="tel:' + esc(D.telefone.replace(/[^\d+]/g, "")) + '">' + esc(D.telefone) + "</a></div>";
    if (D.email) h += '<div class="f-linha">' + I.email + '<a href="mailto:' + esc(D.email) + '">' + esc(D.email) + "</a></div>";
    h += btnWhats("Chamar no WhatsApp") + '<button class="btn btn-verde btn-largo" data-acao="solicitar">Agendar consulta</button>';
    abrirFolha("Informações de contato", h, function (c) { c.querySelector("#sel-local").onchange = function () { folhaContato(this.value); }; });
  }

  // =================== PLANOS ===================
  $("lista-planos").innerHTML = D.planos.map(function (p) { return "<li><strong>" + esc(p.nome) + "</strong></li>"; }).join("");
  function folhaPlanos() {
    abrirFolha("Como funciona o reembolso",
      '<ul class="lista-ponto"><li>Você agenda e paga a consulta particular (PIX, dinheiro ou depósito).</li><li>Ao final, recebe o recibo com os dados da psicóloga e o CRP.</li>' +
      "<li>Envia o recibo para o seu plano de saúde, pelo aplicativo ou site dele.</li><li>O plano devolve o valor conforme as regras do seu contrato.</li></ul>" +
      '<p class="cinza" style="margin-top:12px">Dica: consulte seu plano antes para saber quanto ele reembolsa por sessão de psicoterapia.</p>' +
      '<button class="btn btn-verde btn-largo" data-acao="solicitar">Agendar consulta</button>' +
      btnWhats("Tirar dúvidas no WhatsApp", "Olá, " + D.primeiroNome + "! Vim pelo seu site e tenho uma dúvida sobre reembolso do plano de saúde."));
  }

  // =================== AGENDAR E PAGAR (passo a passo) ===================
  var diaPreferido = "";
  var PX = D.pix;
  var ped = null; // pedido em andamento
  var TURNOS = ["Qualquer horário", "Manhã", "Tarde", "Noite"];
  function hojeISO() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function brl(v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
  function modalidadesDe(s) { return s.locais.map(function (c) { return c === "tele" ? "Teleconsulta" : "Presencial"; }); }
  function valorTexto() {
    var s = D.servicos[ped.servico];
    return s.valor ? brl(s.valor) : A_COMBINAR;
  }
  function etapas(n) {
    return '<ol class="etapas">' + ["Serviço", "Seus dados", "Pagamento"].map(function (t, i) {
      return '<li class="' + (i + 1 < n ? "feita" : i + 1 === n ? "atual" : "") + '"><span>' + (i + 1 < n ? "✓" : i + 1) + "</span>" + t + "</li>";
    }).join("") + "</ol>";
  }
  function cartaoModalidade(m) {
    var on = ped.modalidade === m;
    var sub = m === "Presencial" ? esc(LOCAIS.end.titulo) + " — " + esc(LOCAIS.end.local) : "Online, por chamada de vídeo, de onde você estiver";
    return '<button type="button" class="opcao-radio" role="radio" aria-checked="' + on + '" data-mod="' + m + '"><span class="bolinha"></span>' +
      '<span class="opcao-radio-icone">' + (m === "Presencial" ? I.local : I.video) + "</span><span><strong>" + m + "</strong><small>" + sub + "</small></span></button>";
  }
  function mensagemPedido(final) {
    var s = D.servicos[ped.servico];
    var dia = ped.dia ? ped.dia.split("-").reverse().join("/") : "a combinar";
    return "Olá, " + D.primeiroNome + "! Vim pelo seu site e quero agendar.\n\n" +
      "*Serviço:* " + s.nome + "\n*Modalidade:* " + ped.modalidade + (ped.modalidade === "Presencial" ? " (" + LOCAIS.end.local + ")" : "") +
      "\n*Valor:* " + valorTexto() + "\n\n*Nome:* " + ped.nome + "\n*WhatsApp:* " + ped.tel + (ped.email ? "\n*E-mail:* " + ped.email : "") +
      "\n*Dia de preferência:* " + dia + " (" + ped.turno + ")" + (ped.msg ? "\n*Mensagem:* " + ped.msg : "") + "\n\n" + final;
  }

  function agendar(servicoIdx, modalidade) {
    var i = servicoIdx === undefined || servicoIdx === "" || isNaN(+servicoIdx) ? 0 : +servicoIdx;
    var s = D.servicos[i], mods = modalidadesDe(s);
    var anterior = ped || {};
    ped = { servico: i, modalidade: mods.indexOf(modalidade) !== -1 ? modalidade : mods[0], nome: anterior.nome || "", tel: anterior.tel || "",
      email: anterior.email || "", dia: diaPreferido || anterior.dia || "", turno: anterior.turno || TURNOS[0], msg: "" };
    passo1();
  }

  function passo1() {
    var s = D.servicos[ped.servico], mods = modalidadesDe(s);
    if (mods.indexOf(ped.modalidade) === -1) ped.modalidade = mods[0];
    var opts = D.servicos.map(function (x, i) { return '<option value="' + i + '"' + (i === ped.servico ? " selected" : "") + ">" + esc(x.nome) + "</option>"; }).join("");
    var h = etapas(1) +
      '<label class="rotulo" for="ck-serv">Serviço</label><select class="f-select" id="ck-serv">' + opts + "</select>" +
      '<div class="ck-servico"><strong>' + esc(s.nome) + "</strong>" + (s.descricao ? "<p>" + esc(s.descricao) + "</p>" : "") +
      '<div class="ck-valor"><span>Valor</span><b>' + (s.preco ? esc(s.preco) : A_COMBINAR) + "</b></div>" +
      (s.valor ? "" : '<p class="ck-nota">O valor deste serviço é combinado diretamente com a psicóloga.</p>') + "</div>" +
      '<p class="rotulo">Como você prefere ser atendido(a)?</p><div class="opcoes-radio" role="radiogroup" aria-label="Modalidade">' + mods.map(cartaoModalidade).join("") + "</div>" +
      '<button class="btn btn-verde btn-largo" id="ck-1">Continuar</button>';
    abrirFolha("Agendar: " + s.nome, h, function (c) {
      c.querySelector("#ck-serv").onchange = function () { ped.servico = +this.value; passo1(); };
      c.querySelectorAll(".opcao-radio").forEach(function (b) {
        b.onclick = function () { ped.modalidade = b.dataset.mod; c.querySelectorAll(".opcao-radio").forEach(function (x) { x.setAttribute("aria-checked", String(x === b)); }); };
      });
      c.querySelector("#ck-1").onclick = passo2;
    });
  }

  function passo2() {
    var h = etapas(2) +
      '<div class="ck-como"><strong>Como funciona</strong><ol>' +
      "<li>Você preenche seus dados e escolhe como pagar.</li>" +
      "<li>Os dados chegam no WhatsApp de " + esc(D.primeiroNome) + ", que confirma com você o dia e o horário.</li>" +
      (D.servicos[ped.servico].valor
        ? "<li>O pagamento pode ser feito agora, por PIX aqui no site, ou combinado pelo WhatsApp. Você recebe recibo para pedir reembolso ao plano de saúde.</li>"
        : "<li>O valor deste serviço é combinado com a psicóloga pelo WhatsApp, junto com o horário. Você recebe recibo para pedir reembolso ao plano de saúde.</li>") + "</ol></div>" +
      '<form class="form" id="ck-form" novalidate>' +
      '<label for="ck-nome">Seu nome *</label><input type="text" id="ck-nome" autocomplete="name" value="' + esc(ped.nome) + '">' +
      '<div class="duas"><div><label for="ck-tel">WhatsApp *</label><input type="tel" id="ck-tel" autocomplete="tel" placeholder="(87) 99999-9999" value="' + esc(ped.tel) + '"></div>' +
      '<div><label for="ck-email">E-mail <em>(opcional)</em></label><input type="email" id="ck-email" autocomplete="email" value="' + esc(ped.email) + '"></div></div>' +
      '<div class="duas"><div><label for="ck-dia">Dia de preferência</label><input type="date" id="ck-dia" min="' + hojeISO() + '" value="' + esc(ped.dia) + '"></div>' +
      '<div><label for="ck-turno">Horário de preferência</label><select id="ck-turno">' + TURNOS.map(function (t) { return "<option" + (t === ped.turno ? " selected" : "") + ">" + t + "</option>"; }).join("") + "</select></div></div>" +
      '<label for="ck-msg">Mensagem <em>(opcional)</em></label><textarea id="ck-msg" rows="3" placeholder="Se quiser, conte brevemente o que você procura.">' + esc(ped.msg) + "</textarea>" +
      '<label class="check"><input type="checkbox" id="ck-ok"' + (ped.ok ? " checked" : "") + '> <span>Concordo com a <a href="#" data-acao="privacidade">política de privacidade</a>.</span></label>' +
      '<p class="form-erro" id="ck-erro" hidden></p>' +
      '<div class="ck-botoes"><button type="button" class="btn btn-bege" id="ck-voltar">Voltar</button><button type="submit" class="btn btn-verde">Continuar</button></div></form>';
    abrirFolha("Seus dados", h, function (c) {
      function guardarCampos() {
        ped.nome = c.querySelector("#ck-nome").value.trim(); ped.tel = c.querySelector("#ck-tel").value.trim();
        ped.email = c.querySelector("#ck-email").value.trim(); ped.dia = c.querySelector("#ck-dia").value;
        ped.turno = c.querySelector("#ck-turno").value; ped.msg = c.querySelector("#ck-msg").value.trim(); ped.ok = c.querySelector("#ck-ok").checked;
      }
      c.querySelector("#ck-voltar").onclick = function () { guardarCampos(); passo1(); };
      c.querySelector('[data-acao="privacidade"]').addEventListener("click", guardarCampos);
      c.querySelector("#ck-form").onsubmit = function (e) {
        e.preventDefault(); guardarCampos();
        var erro = c.querySelector("#ck-erro");
        var falta = ped.nome.length < 2 ? "Escreva seu nome." : ped.tel.replace(/\D/g, "").length < 10 ? "Escreva seu WhatsApp com DDD." : !ped.ok ? "Marque que concorda com a política de privacidade." : "";
        if (falta) { erro.textContent = falta; erro.hidden = false; return; }
        passo3();
      };
    });
  }

  function passo3() {
    var s = D.servicos[ped.servico];
    var dia = ped.dia ? ped.dia.split("-").reverse().join("/") : "A combinar";
    var linhas = [["Serviço", s.nome], ["Modalidade", ped.modalidade + (ped.modalidade === "Presencial" ? " — " + LOCAIS.end.local : "")],
      ["Dia de preferência", dia + " · " + ped.turno], ["Nome", ped.nome], ["WhatsApp", ped.tel]];
    if (ped.email) linhas.push(["E-mail", ped.email]);
    var h = etapas(3) +
      '<div class="ck-resumo">' + linhas.map(function (l) { return "<div><span>" + l[0] + "</span><b>" + esc(l[1]) + "</b></div>"; }).join("") +
      '<div class="ck-total"><span>Valor</span><b>' + (s.valor ? esc(brl(s.valor)) : A_COMBINAR) + "</b></div>" +
      (s.valor ? '<p class="ck-nota">' + esc(s.descricao || "") + "</p>" : '<p class="ck-nota">O valor deste serviço é combinado com a psicóloga pelo WhatsApp.</p>') + "</div>" +
      (s.valor ? '<p class="rotulo">Como você quer finalizar?</p>' : "") +
      (D.whatsapp ? '<button class="opcao-pag" id="ck-whats"><span class="opcao-pag-icone whats">' + I.whats + "</span><span><strong>" +
        (s.valor ? "Finalizar e pagar pelo WhatsApp" : "Combinar o valor e agendar pelo WhatsApp") + "</strong>" +
        "<small>Envia seus dados para a " + esc(D.primeiroNome) + " e vocês combinam " + (s.valor ? "o horário e o pagamento" : "o valor e o horário") + " por lá.</small></span></button>" : "") +
      (s.valor ? '<button class="opcao-pag" id="ck-pix"><span class="opcao-pag-icone pix">' + I.pix + "</span><span><strong>Pagar agora pelo site (PIX)</strong>" +
        "<small>Gera o QR Code de " + esc(brl(s.valor)) + " para você pagar no app do seu banco.</small></span></button>" : "") +
      '<button class="btn btn-bege btn-largo" id="ck-voltar">Voltar</button>';
    abrirFolha("Resumo e pagamento", h, function (c) {
      c.querySelector("#ck-voltar").onclick = passo2;
      var w = c.querySelector("#ck-whats");
      if (w) w.onclick = function () {
        var fim = s.valor ? "Gostaria de confirmar o horário e combinar o pagamento por aqui." : "Gostaria de combinar o valor e o horário por aqui.";
        window.open(linkWhats(mensagemPedido(fim)), "_blank", "noopener");
        fecharFolha(); toast("Abrimos o WhatsApp com seus dados. É só enviar a mensagem!");
      };
      var px = c.querySelector("#ck-pix");
      if (px) px.onclick = function () { passo4(s.valor); };
    });
  }

  function copiar(texto, msg) {
    function ok() { toast(msg); }
    function velho() {
      var t = document.createElement("textarea"); t.value = texto; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select(); try { document.execCommand("copy"); ok(); } catch (e) { toast("Não foi possível copiar. Selecione o código e copie manualmente."); }
      t.remove();
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(ok, velho); else velho();
  }
  function passo4(valor) {
    var s = D.servicos[ped.servico];
    var codigo = window.PIX.brCode({ chave: PX.chave, nome: PX.nome, cidade: PX.cidade, valor: valor });
    var qr = window.qrcode(0, "M"); qr.addData(codigo); qr.make();
    var msgFinal = mensagemPedido("Fiz o pagamento de " + brl(valor) + " por PIX pelo site. Segue o comprovante:");
    abrirFolha("Pagar com PIX", etapas(3) +
      '<div class="pix-caixa"><p class="pix-valor-grande">' + esc(brl(valor)) + '</p><p class="cinza">' + esc(s.nome) + " · " + esc(ped.modalidade) + "</p>" +
      '<div class="pix-qr"><img alt="QR Code PIX de ' + esc(brl(valor)) + '" src="' + qr.createDataURL(6, 2) + '"></div>' +
      '<p class="pix-dados">Recebedor: <strong>' + esc(PX.nome) + "</strong><br>Chave PIX: " + esc(PX.chaveExibicao) + "</p>" +
      '<p style="margin:14px 0 6px;font-weight:500">PIX copia e cola</p><textarea class="pix-codigo" id="pix-codigo" rows="3" readonly>' + esc(codigo) + "</textarea>" +
      '<button class="btn btn-verde btn-largo" id="pix-copiar">Copiar código PIX</button>' +
      '<ol class="pix-passos"><li>Abra o app do seu banco e escolha <strong>Pix → Pagar com QR Code</strong> ou <strong>Pix copia e cola</strong>.</li>' +
      "<li>Confira o nome do recebedor e o valor, e pague.</li><li>Toque no botão abaixo para enviar o comprovante e seus dados no WhatsApp.</li></ol>" +
      (D.whatsapp ? '<a class="btn btn-whats btn-largo" id="pix-enviar" target="_blank" rel="noopener" href="' + linkWhats(msgFinal) + '">' + I.whats + "Já paguei — enviar comprovante</a>" : "") +
      '<button class="btn btn-bege btn-largo" id="pix-voltar">Voltar</button></div>',
      function (c) {
        c.querySelector("#pix-copiar").onclick = function () { copiar(codigo, "Código PIX copiado! Cole no app do seu banco."); };
        c.querySelector("#pix-codigo").onclick = function () { this.select(); };
        c.querySelector("#pix-voltar").onclick = passo3;
        var env = c.querySelector("#pix-enviar");
        if (env) env.addEventListener("click", function () { setTimeout(function () { fecharFolha(); toast("Obrigado! Envie o comprovante na conversa do WhatsApp."); }, 300); });
      });
  }
  function folhaPrivacidade() {
    abrirFolha("Política de privacidade",
      "<p>Os dados informados nos formulários deste site (nome, telefone, e-mail e mensagens) são usados apenas para que " + esc(D.nome) +
      " entre em contato com você sobre o atendimento. Eles não são compartilhados com terceiros e são tratados com sigilo profissional.</p>" +
      "<p>Nas avaliações, apenas o nome que você escolher e o texto da avaliação ficam públicos.</p>" +
      '<button class="btn btn-bege btn-largo" id="priv-voltar">Voltar</button>', function (c) {
        c.querySelector("#priv-voltar").onclick = function () { if (ped) passo2(); else fecharFolha(); };
      });
  }

  // =================== AVALIAÇÕES (salvas no site) ===================
  var CHAVE_LOCAL = "avaliacoes-risoneide";
  var usaSupabase = !!(D.supabaseUrl && D.supabaseChave);
  var novas = [];
  function cabecalhosSupabase() { return window.SITE_SUPABASE_HEADERS(); }
  function carregarNovas() {
    if (usaSupabase) {
      return fetch(D.supabaseUrl.replace(/\/$/, "") + "/rest/v1/avaliacoes?select=autor,nota,servico,texto,created_at&order=created_at.desc&limit=500", { headers: cabecalhosSupabase() })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
        .then(function (l) { return l.map(function (o) { return { autor: o.autor, nota: o.nota, servico: o.servico, texto: o.texto, data: dataHoje(new Date(o.created_at)), nova: true }; }); })
        .catch(function () { return lerLocal(); });
    }
    return Promise.resolve(lerLocal());
  }
  function lerLocal() { try { return JSON.parse(ler(CHAVE_LOCAL) || "[]"); } catch (e) { return []; } }
  function salvarNova(o) {
    if (usaSupabase) {
      return fetch(D.supabaseUrl.replace(/\/$/, "") + "/rest/v1/avaliacoes", {
        method: "POST", headers: Object.assign({ Prefer: "return=minimal" }, cabecalhosSupabase()),
        body: JSON.stringify({ autor: o.autor, nota: o.nota, servico: o.servico, texto: o.texto }),
      }).then(function (r) { if (!r.ok) throw new Error(r.status); });
    }
    var l = lerLocal(); l.unshift(o); guardar(CHAVE_LOCAL, JSON.stringify(l));
    return Promise.resolve();
  }

  function todas() { return novas.concat(D.opinioes.map(function (o) { return Object.assign({ nota: 5 }, o); })); }
  function pintarResumo() {
    var l = todas(), soma = 0, cont = [0, 0, 0, 0, 0, 0];
    l.forEach(function (o) { soma += o.nota; cont[o.nota]++; });
    var media = l.length ? soma / l.length : 0, mediaTxt = media.toFixed(1).replace(".", ",");
    $("estrelas-topo").innerHTML = estrelas(media);
    $("media-topo").textContent = mediaTxt;
    $("qtd-opinioes").textContent = plural(l.length, "avaliação", "avaliações");
    $("aba-opinioes").textContent = "Avaliações (" + l.length + ")";
    $("n-avaliacoes").textContent = l.length;
    $("media-grande").textContent = mediaTxt;
    $("estrelas-opinioes").innerHTML = estrelas(media);
    $("qtd-opinioes-2").textContent = plural(l.length, "avaliação", "avaliações");
    var h = "";
    for (var n = 5; n >= 1; n--) {
      h += '<button class="barra" data-nota="' + n + '" aria-label="Ver avaliações com ' + n + ' estrelas">' + n + " " + (n === 1 ? "estrela" : "estrelas") +
        '<span class="trilho"><span class="cheio" style="width:' + (l.length ? (cont[n] / l.length) * 100 : 0) + '%"></span></span>' + cont[n] + "</button>";
    }
    $("barras").innerHTML = h;
    var servs = {}; l.forEach(function (o) { servs[o.servico] = (servs[o.servico] || 0) + 1; });
    var atual = $("filtro-op").value;
    $("filtro-op").innerHTML = '<option value="">Todas as avaliações</option><optgroup label="Por nota">' +
      [5, 4, 3, 2, 1].map(function (n) { return '<option value="n' + n + '">' + n + " estrela" + (n > 1 ? "s" : "") + " (" + cont[n] + ")</option>"; }).join("") +
      '</optgroup><optgroup label="Por serviço">' + Object.keys(servs).map(function (s) { return '<option value="s' + esc(s) + '">' + esc(s) + " (" + servs[s] + ")</option>"; }).join("") + "</optgroup>";
    $("filtro-op").value = atual;
  }
  $("barras").addEventListener("click", function (e) { var b = e.target.closest(".barra"); if (b) { $("filtro-op").value = "n" + b.dataset.nota; pintarOpinioes(); } });

  var POR_PAGINA = 10, mostrarTodas = false;
  function marcar(texto, termo) {
    var t = esc(texto); if (!termo) return t;
    return t.replace(new RegExp("(" + esc(termo).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), '<mark class="marca">$1</mark>');
  }
  function pintarOpinioes() {
    var f = $("filtro-op").value, termo = $("busca-op").value.trim();
    var l = todas().filter(function (o) {
      if (f.charAt(0) === "n" && o.nota !== +f.slice(1)) return false;
      if (f.charAt(0) === "s" && o.servico !== f.slice(1)) return false;
      return !termo || o.texto.toLowerCase().indexOf(termo.toLowerCase()) !== -1;
    });
    var vis = (mostrarTodas || f || termo) ? l : l.slice(0, POR_PAGINA);
    $("btn-veja-mais").hidden = vis.length >= l.length;
    if (!l.length) { $("lista-opinioes").innerHTML = '<li class="vazio">Nenhuma avaliação encontrada.</li>'; return; }
    $("lista-opinioes").innerHTML = vis.map(function (o) {
      var badge = o.nova ? '<span class="badge badge-nova">Nova</span>' : '<span class="badge">' + I.check + " Paciente atendido</span>";
      return '<li><div class="op-cab"><span class="op-letra">' + esc(o.autor.charAt(0).toUpperCase()) + '</span><span class="op-nome"><span class="op-autor">' + esc(o.autor) +
        '</span><span class="op-data">' + esc(o.data) + "</span></span>" + badge + '<span class="estrelas">' + estrelas(o.nota) + "</span></div>" +
        '<p class="op-texto">' + marcar(o.texto, termo) + '</p><p class="op-meta">' + esc(o.servico) + "</p></li>";
    }).join("");
  }
  $("filtro-op").addEventListener("change", pintarOpinioes);
  $("busca-op").addEventListener("input", pintarOpinioes);
  $("busca-op-form").addEventListener("submit", function (e) { e.preventDefault(); pintarOpinioes(); });
  $("btn-veja-mais").addEventListener("click", function () { mostrarTodas = true; pintarOpinioes(); });
  pintarResumo(); pintarOpinioes();
  carregarNovas().then(function (l) { novas = l; pintarResumo(); pintarOpinioes(); });

  var ROTULOS = ["", "Ruim", "Regular", "Bom", "Muito bom", "Excelente"];
  function folhaAvaliar() {
    var nota = 0;
    var opts = '<option value="Outro">Outro</option>' + D.servicos.map(function (s) { return "<option>" + esc(s.nome) + "</option>"; }).join("");
    abrirFolha("Avaliar atendimento",
      '<form class="form" id="form-av" novalidate><p>Como foi o seu atendimento com ' + esc(D.primeiroNome) + "?</p>" +
      '<div class="nota-escolha" id="nota-escolha" role="radiogroup" aria-label="Sua nota"></div><p class="nota-rotulo" id="nota-rotulo">Toque nas estrelas para dar sua nota</p>' +
      '<label for="av-nome">Seu nome *</label><input type="text" id="av-nome" maxlength="60" placeholder="Pode usar só as iniciais, ex.: M. S." required>' +
      '<label for="av-serv">Serviço</label><select id="av-serv">' + opts + "</select>" +
      '<label for="av-texto">Sua avaliação *</label><textarea id="av-texto" rows="4" maxlength="1000" placeholder="Conte como foi sua experiência" required></textarea>' +
      '<input type="text" id="av-site" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">' +
      '<p class="form-erro" id="av-erro" hidden></p>' +
      '<button class="btn btn-verde btn-largo" type="submit" id="av-enviar">Publicar avaliação</button>' +
      '<p class="aviso-salvo">' + (usaSupabase ? "Sua avaliação será publicada no site para todos os visitantes."
        : "Sua avaliação fica salva neste aparelho. (Para aparecer para todos, a dona do site precisa ativar o banco de avaliações.)") + "</p></form>",
      function (c) {
        var box = c.querySelector("#nota-escolha"), erro = c.querySelector("#av-erro");
        function pintar() {
          var h = ""; for (var i = 1; i <= 5; i++) h += '<button type="button" role="radio" aria-checked="' + (i === nota) + '" aria-label="' + i + " estrela" + (i > 1 ? "s" : "") + '" data-n="' + i + '"' + (i <= nota ? ' class="ativa"' : "") + ">" + I.estrela + "</button>";
          box.innerHTML = h; c.querySelector("#nota-rotulo").textContent = nota ? ROTULOS[nota] : "Toque nas estrelas para dar sua nota";
        }
        box.onclick = function (e) { var b = e.target.closest("button"); if (b) { nota = +b.dataset.n; pintar(); } };
        pintar();
        c.querySelector("#form-av").onsubmit = function (e) {
          e.preventDefault();
          var nome = c.querySelector("#av-nome").value.trim(), txt = c.querySelector("#av-texto").value.trim();
          function falha(m) { erro.textContent = m; erro.hidden = false; }
          if (c.querySelector("#av-site").value) return;
          if (!nota) return falha("Escolha de 1 a 5 estrelas.");
          if (nome.length < 2) return falha("Escreva seu nome ou suas iniciais.");
          if (txt.length < 10) return falha("Escreva um pouco mais sobre o atendimento (mínimo de 10 letras).");
          var ultimo = +ler("ultima-avaliacao") || 0;
          if (Date.now() - ultimo < 60000) return falha("Aguarde um minuto antes de enviar outra avaliação.");
          var o = { autor: nome, nota: nota, servico: c.querySelector("#av-serv").value, texto: txt, data: dataHoje(), nova: true };
          var btn = c.querySelector("#av-enviar"); btn.disabled = true; btn.textContent = "Publicando...";
          salvarNova(o).then(function () {
            guardar("ultima-avaliacao", String(Date.now()));
            novas.unshift(o); pintarResumo(); $("filtro-op").value = ""; $("busca-op").value = ""; pintarOpinioes();
            fecharFolha(); rolarPara("opinioes"); toast("Obrigado! Sua avaliação foi publicada.");
          }).catch(function () { btn.disabled = false; btn.textContent = "Publicar avaliação"; falha("Não foi possível publicar agora. Tente de novo em instantes."); });
        };
      });
  }

  // =================== DÚVIDAS ===================
  $("sub-duvidas").textContent = plural(D.duvidas.length, "dúvida de paciente respondida", "dúvidas de pacientes respondidas") + " pela psicóloga";
  $("aba-duvidas").textContent = "Dúvidas respondidas (" + D.duvidas.length + ")";
  $("lista-duvidas").innerHTML = D.duvidas.map(function (d, i) {
    return '<div class="duvida"><div class="duvida-pergunta recolhida" id="dq-' + i + '"><span>' + esc(d.pergunta) + "</span>" +
      (d.pergunta.length > 200 ? ' <button class="link-btn link" data-acao="duvida-mais" data-i="' + i + '">mais</button>' : "") + "</div>" +
      '<p class="duvida-rotulo">Resposta da psicóloga</p><div class="duvida-resp"><img src="' + esc(D.foto) + '" alt=""><div class="balao">' + esc(d.resposta) + "</div></div></div>";
  }).join("");

  // =================== PERGUNTAS FREQUENTES ===================
  var N = D.nome;
  var FAQ = [
    ["Quais são as principais especialidades de " + N + "?", esc(N) + " é psicóloga, formada pela UNICAP e especialista em psicologia clínica, saúde mental e organizacional, com mais de 30 anos de experiência. Trabalha com " + esc(D.experienciaEm.join(", ").toLowerCase()) + "."],
    ["Onde fica o consultório de " + N + "?", esc(N) + " atende em:<ul><li>" + esc(LOCAIS.end.titulo) + " — " + esc(LOCAIS.end.local) + "</li><li>Teleconsulta (online)</li></ul>"],
    ["Posso ser atendido online, sem ter que ir até o consultório?", "Sim. " + esc(N) + " atende por teleconsulta, por chamada de vídeo. <button class=\"link-btn link-verde\" data-acao=\"solicitar\" data-modalidade=\"Teleconsulta\">Agendar teleconsulta</button>"],
    ["Quais métodos de pagamento são aceitos?", esc(D.pagamentos.join(", ")) + ". A primeira consulta pode ser paga na hora por PIX aqui no site, ao agendar (QR Code ou copia e cola). Os demais valores são combinados pelo WhatsApp."],
    ["Em quais idiomas " + N + " atende?", esc(N) + " atende em " + esc(D.idiomas.join(", ")) + "."],
    ["Como posso marcar uma consulta?", "Pelo WhatsApp " + esc(D.telefone) + " (<a class=\"link-verde\" target=\"_blank\" rel=\"noopener\" href=\"" + linkWhats(MSG_PADRAO) + "\">clique aqui para chamar</a>) ou tocando em <button class=\"link-btn link-verde\" data-acao=\"solicitar\">Agendar consulta</button> e escolhendo o dia de sua preferência."],
    ["O que outros pacientes dizem sobre " + N + "?", '<span id="faq-media"></span>'],
    ["Quais são os convênios aceitos?", "As consultas são particulares, com recibo para reembolso pelo seu plano de saúde. <button class=\"link-btn link\" data-acao=\"planos\">Veja como funciona o reembolso.</button>"],
  ];
  $("lista-faq").innerHTML = FAQ.map(function (f, i) {
    return '<details class="faq-item"' + (i === 0 ? " open" : "") + "><summary>" + esc(f[0]) + '</summary><div class="resp">' + f[1] + "</div></details>";
  }).join("");
  function pintarFaqMedia() {
    var l = todas(), m = l.reduce(function (a, o) { return a + o.nota; }, 0) / l.length;
    $("faq-media").textContent = "Um total de " + l.length + " pacientes já avaliou o atendimento de " + N + ", com média de " + m.toFixed(1).replace(".", ",") + " estrelas (de 5).";
  }
  pintarFaqMedia();
  var _pr = pintarResumo; pintarResumo = function () { _pr(); pintarFaqMedia(); };

  // =================== AGENDA ===================
  var SEM = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"], MES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  var pagDias = 0;
  function pintarDias() {
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0); var h = "";
    for (var i = pagDias * 4; i < pagDias * 4 + 4; i++) {
      var d = new Date(hoje); d.setDate(hoje.getDate() + i);
      var iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      h += '<button class="dia" data-dia="' + iso + '">' + (i === 0 ? "Hoje" : i === 1 ? "Amanhã" : SEM[d.getDay()]) + "<small>" + d.getDate() + " " + MES[d.getMonth()] + "</small></button>";
    }
    $("dias").innerHTML = h;
    $("dias-ant").disabled = pagDias === 0;
    $("dias-prox").disabled = pagDias >= 6;
  }
  $("dias-ant").onclick = function () { pagDias--; pintarDias(); };
  $("dias-prox").onclick = function () { pagDias++; pintarDias(); };
  $("dias").onclick = function (e) { var b = e.target.closest(".dia"); if (b) { diaPreferido = b.dataset.dia; agendar(); } };
  pintarDias();
  var agenda = $("agenda"), lateral = document.querySelector(".coluna-lateral"), slot = document.querySelector(".agenda-mobile");
  var mq = window.matchMedia("(max-width: 860px)");
  function posAgenda() { (mq.matches ? slot : lateral).appendChild(agenda); }
  if (mq.addEventListener) mq.addEventListener("change", posAgenda); else mq.addListener(posAgenda);
  posAgenda();

  // =================== ABAS (scroll-spy) ===================
  var abas = Array.prototype.slice.call(document.querySelectorAll(".abas-secoes a"));
  var secoes = abas.map(function (a) { return $(a.getAttribute("href").slice(1)); });
  function marcarAba() {
    var topo = $("abas-secoes").getBoundingClientRect().bottom + 24, ativa = 0;
    secoes.forEach(function (s, i) { if (s.getBoundingClientRect().top <= topo) ativa = i; });
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
  D.servicos.forEach(function (s, i) { itensBusca.push({ t: s.nome, sub: "Serviço · " + (s.preco || A_COMBINAR), acao: function () { agendar(i); } }); });
  D.experienciaEm.forEach(function (d) { itensBusca.push({ t: d, sub: "Experiência", acao: function () { rolarPara("experiencia"); } }); });
  [["Agendar consulta", null], ["Experiência", "experiencia"], ["Consultórios / Endereço", "consultorios"], ["Teleconsulta", "consultorios"], ["Planos de saúde / Reembolso", "planos"], ["Avaliações", "opinioes"], ["Dúvidas respondidas", "duvidas"], ["Perguntas frequentes", "faq"]]
    .forEach(function (x) { itensBusca.push({ t: x[0], sub: x[1] ? "Seção" : "Ação", acao: function () { if (x[1]) rolarPara(x[1]); else agendar(); } }); });
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
  function escolher(x) { sug.hidden = true; inp.value = ""; inp.blur(); x.acao(); }
  inp.addEventListener("input", buscar);
  inp.addEventListener("focus", buscar);
  sug.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) escolher(achados[+b.dataset.k]); });
  $("busca-topo").addEventListener("submit", function (e) { e.preventDefault(); buscar(); if (achados[0]) escolher(achados[0]); });
  document.addEventListener("click", function (e) { if (!e.target.closest("#busca-topo")) sug.hidden = true; });

  // =================== MENU ===================
  var menu = $("menu"), menuBtn = $("menu-btn");
  function abrirMenu(on) { menu.hidden = !on; menuBtn.setAttribute("aria-expanded", String(on)); document.body.classList.toggle("travado", on); }
  menuBtn.onclick = function () { abrirMenu(true); };
  menu.addEventListener("click", function (e) { if (e.target === menu || e.target.closest("[data-fechar-menu]")) abrirMenu(false); });

  // =================== FICOU COM DÚVIDA? ===================
  function opcoesDuvida() {
    return '<button class="opcao" data-acao="assistente"><span class="opcao-icone"><svg viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><circle cx="8" cy="11" r="1.3" fill="#3d6f63"/><circle cx="12" cy="11" r="1.3" fill="#3d6f63"/><circle cx="16" cy="11" r="1.3" fill="#3d6f63"/></svg></span>' +
      "<span><strong>Assistente virtual</strong><small>Tire suas dúvidas agora, a qualquer hora, sobre consultas, valores e endereço.</small></span></button>" +
      (D.whatsapp ? '<a class="opcao opcao-whats" target="_blank" rel="noopener" href="' + linkWhats("Olá, " + D.primeiroNome + "! Vim pelo seu site e fiquei com uma dúvida.") + '"><span class="opcao-icone"><img src="' + esc(D.foto) + '" alt=""></span>' +
        "<span><strong>Falar com a " + esc(D.primeiroNome) + "</strong><small>Converse comigo diretamente pelo WhatsApp.</small><span class=\"opcao-selo\">" + I.whats + esc(D.telefone) + "</span></span></a>" : "");
  }
  $("opcoes-duvida-secao").innerHTML = opcoesDuvida();
  function folhaDuvida() {
    abrirFolha("Ficou com alguma dúvida?", '<p class="cinza">Fale com o nosso assistente virtual ou comigo mesma.</p><div class="opcoes-duvida" style="grid-template-columns:1fr">' + opcoesDuvida() + "</div>");
  }

  window.SITE = { abrirFolha: abrirFolha, fecharFolha: fecharFolha, linkWhats: linkWhats, folhaSolicitar: function () { diaPreferido = ""; agendar(); }, toast: toast, esc: esc };

  // =================== AÇÕES ===================
  var ACOES = {
    "mais-detalhes": function (b) { folhaMaisDetalhes(!!b.closest("#experiencia")); },
    "ir-endereco": function () { selecionarLocal("end"); rolarPara("consultorios"); },
    "ir-tele": function () { selecionarLocal("tele"); rolarPara("consultorios"); },
    "ir-planos": function () { rolarPara("planos"); },
    "ir-opinioes": function () { rolarPara("opinioes"); },
    "formacao": function () { abrirFolha("Formação", lista(D.formacao)); },
    "contato": function () { folhaContato(); },
    "solicitar": function (b) { if (!b.closest(".agenda")) diaPreferido = ""; agendar(b.dataset.servico, b.dataset.modalidade); },
    "servico": function (b) { diaPreferido = ""; agendar(+b.dataset.i); },
    "detalhes-endereco": function () { folhaEndereco(localAtual); },
    "planos": folhaPlanos,
    "privacidade": folhaPrivacidade,
    "enviar-opiniao": folhaAvaliar,
    "duvida": folhaDuvida,
    "assistente": function () { fecharFolha(); if (window.abrirAssistente) window.abrirAssistente(); },
    "duvida-mais": function (b) { var rec = $("dq-" + b.dataset.i).classList.toggle("recolhida"); b.textContent = rec ? "mais" : "menos"; },
  };
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-acao]");
    if (!b || !ACOES[b.dataset.acao]) return;
    e.preventDefault();
    ACOES[b.dataset.acao](b);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!lightbox.hidden) lightbox.click(); else if (!menu.hidden) abrirMenu(false); else fecharFolha();
  });

  $("ano").textContent = new Date().getFullYear();
})();
