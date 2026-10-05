// Assistente virtual: conversa com a IA (Supabase Edge Function "assistente")
// e, enquanto ela não estiver configurada, responde com base nos dados do site.
(function () {
  "use strict";
  var D = window.DADOS, S = window.SITE;
  var $ = function (id) { return document.getElementById(id); };
  var chat = $("chat"), msgsEl = $("chat-msgs"), form = $("chat-form"), input = $("chat-input"), btnEnviar = $("chat-enviar");
  var CHAVE = "assistente-conversa";
  var usaIA = !!(D.supabaseUrl && D.supabaseChave);
  var conversa = [];
  var ocupado = false;

  var SUGESTOES = ["Quanto custa a consulta?", "Atende online?", "Onde fica o consultório?", "Aceita plano de saúde?", "Como faço para agendar?", "Atende casal?"];
  var BOAS_VINDAS = "Olá! Sou o assistente virtual da psicóloga " + D.nome + ". Posso tirar suas dúvidas sobre consultas, valores, teleconsulta, endereço e agendamento. Como posso te ajudar?";
  var MSG_WHATS = "Olá, " + D.primeiroNome + "! Vim pelo seu site e fiquei com uma dúvida.";

  function semAcento(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function ler() { try { return JSON.parse(sessionStorage.getItem(CHAVE) || "[]"); } catch (e) { return []; } }
  function salvar() { try { sessionStorage.setItem(CHAVE, JSON.stringify(conversa.slice(-30))); } catch (e) {} }

  // ---------- respostas locais (sem IA) ----------
  var CRISE = /suicid|me matar|matar a mim|tirar (a )?minha vida|nao quero mais viver|quero morrer|vontade de morrer|me machucar|automutila|me cortar|acabar com tudo|emergencia/;
  function precos(nomes) {
    return D.servicos.filter(function (s) { return nomes.indexOf(s.nome) !== -1; })
      .map(function (s) { return "• " + s.nome + ": " + (s.preco || "consultar valores"); }).join("\n");
  }
  var REGRAS = [
    [CRISE, function () {
      return { t: "Sinto muito que você esteja passando por isso. Você não está sozinho(a). Por favor, ligue agora para o CVV no 188 (gratuito, 24 horas) ou acesse cvv.org.br. Em emergência, ligue 192 (SAMU) ou vá ao pronto-socorro mais próximo.\n\nQuando se sentir em segurança, a " + D.primeiroNome + " pode te acompanhar.", acoes: ["tel188", "whats"] };
    }],
    [/^(oi|ola|bom dia|boa tarde|boa noite|eai|e ai|hey|opa)\b/, function () { return { t: "Olá! Que bom ter você por aqui. Me conta: qual é a sua dúvida? Posso falar sobre valores, teleconsulta, endereço, planos de saúde ou agendamento." }; }],
    [/obrigad|valeu|agradec/, function () { return { t: "Por nada! Se surgir outra dúvida, é só perguntar. Quando quiser agendar, fale com a " + D.primeiroNome + " pelo WhatsApp.", acoes: ["whats"] }; }],
    [/primeira consulta|primeira sessao|como funciona|como e a consulta|quanto tempo|duracao/, function () {
      return { t: "A primeira consulta (R$ 200) é o momento de a " + D.primeiroNome + " conhecer a sua história e entender o que você procura. Na psicoterapia presencial, a primeira consulta custa R$ 280: ela é mais longa e serve para avaliar e planejar o trabalho. As sessões seguintes podem ser negociadas com ela.", acoes: ["agendar", "whats"] };
    }],
    [/casal|relacionamento|namor|marido|esposa|conjuge/, function () { return { t: "Sim! A " + D.primeiroNome + " atende terapia de casal, presencial ou online. O valor é R$ 400. Ela também trabalha com dificuldades nos relacionamentos e conflitos de casal na terapia individual.", acoes: ["agendar", "whats"] }; }],
    [/famil|filho|pais\b|orientacao aos pais/, function () { return { t: "Ela atende terapia familiar e orientação aos pais. Os valores desses atendimentos são combinados diretamente com ela.", acoes: ["whats"] }; }],
    [/vocacional|profissional|carreira|profissao/, function () { return { t: "Sim, a " + D.primeiroNome + " faz orientação vocacional e orientação profissional. Os valores são combinados diretamente com ela.", acoes: ["whats"] }; }],
    [/preco|valor|quanto|custa|cobra|caro|barato/, function () {
      return { t: "Estes são os principais valores (consulta particular):\n" + precos(["Primeira consulta psicologia", "Psicoterapia", "Psicoterapia adulto", "Teleconsulta", "Terapia de Casal", "Tratamento da ansiedade", "Tratamento da depressão"]) + "\n\nOs outros serviços estão na seção \"Serviços e preços\" do site.", acoes: ["agendar", "whats"] };
    }],
    [/online|tele|video|distancia|outra cidade|outro estado|longe|remot/, function () {
      return { t: "Sim! A " + D.primeiroNome + " atende por teleconsulta, por chamada de vídeo, inclusive pacientes de outros estados. A teleconsulta custa a partir de R$ 200. Dica: entre 10 minutos antes, com o celular ou notebook carregado e internet, câmera e microfone funcionando.", acoes: ["agendar", "whats"] };
    }],
    [/onde|endereco|local|fica|chegar|consultorio|presencial|sala/, function () { return { t: "O consultório fica na R. Joaquim Nabuco, 541, 1º andar, sala 108, no Empresarial Trade Center Dom Campelo, em Petrolina (PE). Também há atendimento online.", acoes: ["mapa", "agendar"] }; }],
    [/plano|convenio|unimed|bradesco|amil|sulamerica|hapvida|reembols/, function () { return { t: "A consulta é particular, mas a " + D.primeiroNome + " fornece recibo para você pedir reembolso ao seu plano de saúde. O valor devolvido depende das regras do seu plano, então vale consultar antes.", acoes: ["whats"] }; }],
    [/pagamento|pagar|pix|cartao|dinheiro|deposito|transferencia|parcel/, function () { return { t: "Ela aceita PIX, dinheiro e depósito bancário. Para outras formas de pagamento, confirme diretamente com ela.", acoes: ["whats"] }; }],
    [/agend|marcar|horario|disponib|vaga|quando|dia /, function () { return { t: "Para agendar, fale com a " + D.primeiroNome + " pelo WhatsApp " + D.telefone + " ou toque em \"Agendar consulta\" e escolha o dia de sua preferência. Ela confirma o horário com você.", acoes: ["whats", "agendar"] }; }],
    [/ansiedade|ansios|panico|crise de|depress|triste|luto|perda|insonia|dormir|estresse|angustia|medo/, function () {
      return { t: "Sinto muito que você esteja passando por isso. A " + D.primeiroNome + " tem experiência com ansiedade, pânico, depressão, luto, angústia e insônia, e pode te ajudar na consulta. O tratamento da ansiedade começa em R$ 250 e o da depressão em R$ 300.", acoes: ["agendar", "whats"] };
    }],
    [/idade|crianca|adolescente|jovem|idoso|anos/, function () { return { t: "Ela atende adultos, idosos e jovens a partir de 16 anos. Há consulta específica para adolescentes (a partir de R$ 250) e para idosos (R$ 250)." }; }],
    [/formacao|formada|experiencia|crp|registro|faculdade|especiali|quem e/, function () { return { t: D.nome + " é psicóloga (CRP PE 07436), formada pela UNICAP e especialista em psicologia clínica, saúde mental e psicologia organizacional. Trabalha com psicoterapia e terapia de casal." }; }],
    [/avaliac|opini|recomend|\be boa\b|\be bom\b|confiavel/, function () { return { t: "O atendimento dela tem nota 5 de 5, com 18 avaliações. Os pacientes elogiam o acolhimento, a escuta atenta, a pontualidade e os resultados. Você pode ler todas na seção \"Avaliações\" do site." }; }],
    [/robo|humano|\bia\b|inteligencia artificial|quem e voce|voce e (um|uma|a)/, function () { return { t: "Sou o assistente virtual do site da " + D.primeiroNome + ". Para falar com ela pessoalmente, use o WhatsApp.", acoes: ["whats"] }; }],
  ];
  function respostaLocal(texto) {
    var q = semAcento(texto);
    for (var i = 0; i < REGRAS.length; i++) if (REGRAS[i][0].test(q)) return REGRAS[i][1]();
    return { t: "Não tenho essa informação aqui, mas a " + D.primeiroNome + " pode te responder pessoalmente. Quer falar com ela pelo WhatsApp?", acoes: ["whats"] };
  }

  // ---------- IA ----------
  function respostaIA() {
    var historico = conversa.filter(function (m) { return !m.local; }).slice(-16).map(function (m) { return { role: m.de === "eu" ? "user" : "assistant", content: m.t }; });
    while (historico.length && historico[0].role !== "user") historico.shift();
    return fetch(D.supabaseUrl.replace(/\/$/, "") + "/functions/v1/assistente", {
      method: "POST", headers: window.SITE_SUPABASE_HEADERS(), body: JSON.stringify({ mensagens: historico }),
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.resposta) throw new Error(j.erro || r.status); return j.resposta; }); });
  }

  // ---------- interface ----------
  function rolar() { msgsEl.scrollTop = msgsEl.scrollHeight; }
  function htmlAcoes(acoes) {
    if (!acoes || !acoes.length) return "";
    return '<div class="msg-acoes">' + acoes.map(function (a) {
      if (a === "whats") return '<a class="a-whats" target="_blank" rel="noopener" href="' + S.linkWhats(MSG_WHATS) + '">Falar com a ' + S.esc(D.primeiroNome) + "</a>";
      if (a === "agendar") return '<button type="button" class="a-agendar" data-chat="agendar">Agendar consulta</button>';
      if (a === "tel188") return '<a class="a-tel" href="tel:188">Ligar 188 (CVV)</a>';
      if (a === "mapa") return '<a class="a-agendar" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(D.consultorios.end.mapa) + '">Ver no mapa</a>';
      return "";
    }).join("") + "</div>";
  }
  function pintarMsg(m) {
    var el = document.createElement("div");
    el.className = "msg " + (m.de === "eu" ? "msg-eu" : "msg-bot");
    el.innerHTML = S.esc(m.t) + htmlAcoes(m.acoes);
    msgsEl.appendChild(el);
  }
  function adicionar(m) { conversa.push(m); salvar(); pintarMsg(m); rolar(); }
  function pintarTudo() {
    msgsEl.innerHTML = "";
    conversa.forEach(pintarMsg);
    $("chat-sugestoes").hidden = conversa.length > 1;
    rolar();
  }
  $("chat-sugestoes").innerHTML = SUGESTOES.map(function (s) { return '<button type="button">' + S.esc(s) + "</button>"; }).join("");
  $("chat-sugestoes").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) enviar(b.textContent); });

  function enviar(texto) {
    texto = texto.trim();
    if (!texto || ocupado) return;
    adicionar({ de: "eu", t: texto });
    input.value = ""; ajustarAltura();
    $("chat-sugestoes").hidden = true;
    var digitando = document.createElement("div");
    digitando.className = "msg msg-bot digitando";
    digitando.innerHTML = "<span></span><span></span><span></span>";
    msgsEl.appendChild(digitando); rolar();
    ocupado = true; btnEnviar.disabled = true;

    var crise = CRISE.test(semAcento(texto));
    var p = (usaIA && !crise) ? respostaIA().then(function (t) { return { t: t, acoes: /agend|whats/i.test(t) ? ["whats"] : [] }; })
      : new Promise(function (ok) { setTimeout(function () { ok(respostaLocal(texto)); }, 600 + Math.random() * 500); });
    p.catch(function () { var r = respostaLocal(texto); r.local = true; return r; })
      .then(function (r) {
        digitando.remove();
        adicionar({ de: "bot", t: r.t, acoes: r.acoes, local: r.local });
      })
      .then(function () { ocupado = false; btnEnviar.disabled = false; input.focus(); });
  }

  function ajustarAltura() { input.style.height = "auto"; input.style.height = Math.min(input.scrollHeight, 110) + "px"; }
  input.addEventListener("input", ajustarAltura);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(input.value); } });
  form.addEventListener("submit", function (e) { e.preventDefault(); enviar(input.value); });
  msgsEl.addEventListener("click", function (e) {
    if (e.target.closest('[data-chat="agendar"]')) { fechar(); S.folhaSolicitar(); }
  });

  function abrir() {
    if (!conversa.length) conversa = ler();
    if (!conversa.length) conversa = [{ de: "bot", t: BOAS_VINDAS }];
    pintarTudo();
    chat.hidden = false;
    if (window.matchMedia("(max-width: 600px)").matches) document.body.classList.add("travado");
    setTimeout(function () { input.focus(); }, 50);
  }
  function fechar() { chat.hidden = true; document.body.classList.remove("travado"); }
  $("chat-fechar").addEventListener("click", fechar);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !chat.hidden) fechar(); });
  window.abrirAssistente = abrir;
})();
