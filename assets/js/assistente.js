/* =========================================================
   Assistente Virtual — Real Clínica Integrada
   Responde SOMENTE com as informações oficiais abaixo.
   Para atualizar dados, edite apenas o objeto CLINICA.
   ========================================================= */
(function () {
  "use strict";

  var CLINICA = {
    nome: "Real Clínica Integrada",
    categoria: "Policlínica",
    slogan: "Acolhendo, Prevenindo, Reabilitando",
    endereco: "R. Júlio Paixão da Silva, 2122 - Baixa Grande, Arapiraca - AL, 57307-010",
    telefone: "(82) 3530-4187",
    telLink: "tel:+558235304187",
    instagram: "@realclinicaintegrada",
    instagramUrl: "https://www.instagram.com/realclinicaintegrada/",
    horarioGoogle: "abre às 06:00",
    nota: "4,9",
    avaliacoes: 7,
    mapa: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("R. Júlio Paixão da Silva, 2122 - Baixa Grande, Arapiraca - AL, 57307-010"),
    wa: "https://wa.me/558235304187?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre a Real Clínica Integrada."),
    waAgendar: "https://wa.me/558235304187?text=" + encodeURIComponent("Olá! Gostaria de agendar um atendimento na Real Clínica Integrada.")
  };

  var NAO_SEI = "Não tenho essa informação disponível no momento. Para confirmar, entre em contato diretamente com a Real Clínica Integrada pelo WhatsApp.";
  var AVISO = "Este assistente fornece informações gerais sobre a clínica e seus canais de atendimento. Ele não substitui avaliação ou orientação de um profissional de saúde.";

  var A = {
    wa: { label: "💬 Falar pelo WhatsApp", href: CLINICA.wa, cls: "wa" },
    agendar: { label: "📅 Agendar pelo WhatsApp", href: CLINICA.waAgendar, cls: "wa" },
    mapa: { label: "🧭 Como chegar", href: CLINICA.mapa },
    ligar: { label: "📞 Ligar", href: CLINICA.telLink },
    insta: { label: "📸 Ver Instagram", href: CLINICA.instagramUrl }
  };

  /* Cada intenção: palavras-chave (sem acento, minúsculas) e resposta. */
  var INTENTS = [
    { id: "medico", priority: 3,
      keys: ["dor ", "dores", "doendo", "sintoma", "remedio", "medicamento", "diagnost", "o que eu tenho", "devo tomar", "posso tomar", "tratamento para", "resultado de exame", "meu exame", "laudo", "receita", "febre", "inflamad", "lesao", "machuquei", "torci"],
      text: "Não posso dar orientação médica, diagnóstico ou indicar tratamentos e medicamentos. 🙏\n\nO ideal é passar por avaliação com um profissional de saúde. Se quiser, fale com a equipe da **Real Clínica Integrada** pelo WhatsApp para saber como agendar.\n\nEm caso de emergência, ligue **192 (SAMU)**.",
      actions: ["agendar"] },
    { id: "emergencia", priority: 4,
      keys: ["emergencia", "urgencia", "urgente", "socorro", "samu", "infarto", "desmaio", "acidente"],
      text: "Em caso de **emergência**, ligue imediatamente para o **192 (SAMU)** ou procure o pronto-socorro mais próximo.\n\nEste assistente é apenas informativo.",
      actions: [] },
    { id: "chegar", keys: ["como chegar", "chegar", "rota", "gps", "caminho", "trajeto", "maps", "mapa", "uber"],
      text: "🧭 Toque em **Como chegar** e o Google Maps abre com a rota até a clínica:\n\n" + CLINICA.endereco,
      actions: ["mapa"] },
    { id: "endereco", keys: ["endereco", "onde fica", "onde e", "onde voces", "localiza", "local", "rua", "bairro", "fica onde", "baixa grande", "cep", "onde esta"],
      text: "📍 A **Real Clínica Integrada** fica na:\n\n**" + CLINICA.endereco + "**",
      actions: ["mapa"] },
    { id: "telefone", keys: ["telefone", "numero", "ligar", "ligacao", "fone", "celular", "contato", "falar com voces"],
      text: "📞 O telefone e WhatsApp da clínica é **" + CLINICA.telefone + "**.",
      actions: ["ligar", "wa"] },
    { id: "whatsapp", keys: ["whats", "zap", "wpp", "whatsapp"],
      text: "💬 O WhatsApp da clínica é **" + CLINICA.telefone + "**. Toque abaixo para iniciar a conversa com a equipe.",
      actions: ["wa"] },
    { id: "humano", priority: 2, keys: ["atendente", "humano", "pessoa", "falar com alguem", "falar com a equipe", "recepcao", "secretaria"],
      text: "Claro! Para falar com a equipe da clínica, toque no botão abaixo e o WhatsApp abre com uma mensagem pronta. 😊",
      actions: ["wa"] },
    { id: "instagram", keys: ["instagram", "insta", "rede social", "redes sociais", "perfil"],
      text: "📸 O Instagram oficial é **" + CLINICA.instagram + "**.",
      actions: ["insta"] },
    { id: "horario", keys: ["horario", "hora", "abre", "fecha", "funciona", "funcionamento", "aberto", "expediente", "sabado", "domingo", "feriado"],
      text: "🕐 Pelo Google, a clínica **" + CLINICA.horarioGoogle + "**.\n\nNão tenho os horários completos de funcionamento. Para confirmar, fale com a equipe pelo WhatsApp.",
      actions: ["wa"] },
    { id: "agendar", priority: 1, keys: ["agend", "marcar", "consulta", "sessao", "vaga", "disponibilidade", "disponivel"],
      text: "📅 O agendamento é feito diretamente com a equipe pelo WhatsApp **" + CLINICA.telefone + "**.\n\nToque abaixo para enviar uma mensagem pronta.",
      actions: ["agendar"] },
    { id: "pilates", priority: 1, keys: ["pilates"],
      text: "Sim! No material oficial da clínica, o **Pilates** aparece dentro da **Fisioterapia** (Esportiva e Pilates).\n\nPara horários e disponibilidade, fale com a equipe.",
      actions: ["agendar"] },
    { id: "fisio", priority: 1, keys: ["fisio", "neurofuncional", "neuro", "ortoped", "traumato", "esportiva", "reabilita"],
      text: "Na **Fisioterapia**, a clínica informa atendimentos em:\n\n• Neurofuncional\n• Traumato-Ortopedia\n• Esportiva e Pilates\n\nPara saber a disponibilidade para o seu caso, fale com a equipe.",
      actions: ["agendar"] },
    { id: "fono", priority: 1, keys: ["fono", "linguagem", "fonoaudiolog"],
      text: "No momento, a **Fonoaudiologia** não está entre os atendimentos informados pela clínica.\n\nOs atendimentos informados são **Fisioterapia** e **Psicologia**. Para confirmar, fale com a equipe pelo WhatsApp.",
      actions: ["wa"] },
    { id: "psico", priority: 1, keys: ["psicolog", "psico", "terapia", "emocional", "ansiedade"],
      text: "Na **Psicologia**, a clínica informa atendimentos para **adultos e crianças**, incluindo **atendimentos em ABA**.\n\nPara mais detalhes, fale com a equipe.",
      actions: ["agendar"] },
    { id: "aba", priority: 1, keys: ["aba ", "autis", "tea ", "analise do comportamento"],
      text: "Segundo o material da clínica, há **atendimentos em ABA** na **Psicologia**, para **adultos e crianças**.\n\nPara detalhes sobre o atendimento, fale com a equipe.",
      actions: ["agendar"] },
    { id: "crianca", keys: ["crianca", "infantil", "filho", "filha", "bebe", "pediatr"],
      text: "Sim. Segundo o material da clínica, a **Psicologia** atende **adultos e crianças**, incluindo **atendimentos em ABA**.\n\nA recepção também tem um cantinho infantil. Para outras dúvidas, fale com a equipe.",
      actions: ["agendar"] },
    { id: "servicos", keys: ["atendimento", "servico", "especialidade", "oferece", "voces fazem", "o que voces", "tratamentos", "area", "tem o que"],
      text: "A **Real Clínica Integrada** informa os seguintes atendimentos:\n\n**Fisioterapia:** Neurofuncional, Traumato-Ortopedia, Esportiva e Pilates\n**Psicologia:** adulto e criança, atendimentos em ABA\n\nPara confirmar disponibilidade, fale com a equipe.",
      actions: ["agendar"] },
    { id: "avaliacao", keys: ["avaliac", "nota", "estrela", "review", "opiniao", "recomend", "e boa", "confiavel"],
      text: "⭐ A clínica tem nota **" + CLINICA.nota + "** no Google, com **" + CLINICA.avaliacoes + " avaliações**.",
      actions: [] },
    { id: "preco", priority: 1, keys: ["preco", "valor", "quanto custa", "custa", "quanto e", "pagamento", "pix", "cartao", "parcel", "orcamento"],
      text: NAO_SEI, actions: ["wa"] },
    { id: "convenio", priority: 1, keys: ["convenio", "plano de saude", "plano", "unimed", "hapvida", "bradesco", "sulamerica", "sus ", "particular"],
      text: NAO_SEI, actions: ["wa"] },
    { id: "profissional", priority: 2, keys: ["medico", "doutor", "doutora", "dra", "dr ", "profissional", "profissionais", "quem atende", "fisioterapeuta", "psicologa", "psicologo", "equipe"],
      text: NAO_SEI, actions: ["wa"] },
    { id: "sobre", keys: ["sobre", "clinica", "quem sao", "real clinica", "policlinica"],
      text: "A **Real Clínica Integrada** é uma policlínica em **Arapiraca - AL**, com atendimentos de Fisioterapia e Psicologia.\n\nNo letreiro da recepção: *“" + CLINICA.slogan + "”*.",
      actions: ["wa"] },
    { id: "obrigado", keys: ["obrigad", "valeu", "agradec", "show", "perfeito", "otimo"],
      text: "Por nada! 😊 Se precisar, é só perguntar. Para falar com a equipe, o WhatsApp é **" + CLINICA.telefone + "**.",
      actions: [] },
    { id: "oi", keys: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "eai", "hello", "opa"],
      text: "Olá! 👋 Como posso ajudar? Você pode perguntar sobre endereço, telefone, horários, atendimentos ou como agendar.",
      actions: [] }
  ];

  var QUICK = [
    { label: "📍 Onde fica a clínica?", q: "Onde fica a clínica?" },
    { label: "📞 Telefone", q: "Qual o telefone?" },
    { label: "📅 Como agendar?", q: "Como posso agendar?" },
    { label: "🕐 Horários", q: "Qual o horário?" },
    { label: "📸 Instagram", q: "Qual o Instagram?" },
    { label: "🩺 Atendimentos", q: "Quais atendimentos vocês oferecem?" },
    { label: "💬 Falar pelo WhatsApp", q: "Quero falar pelo WhatsApp" }
  ];

  function norm(s) {
    return (" " + s + " ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ");
  }

  function match(text) {
    var t = norm(text);
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      it.keys.forEach(function (k) {
        // palavra (ou início de palavra) / expressão
        if (t.indexOf(" " + k) !== -1) score += k.indexOf(" ") !== -1 ? 2 : 1;
      });
      if (score > 0) score += (it.priority || 0) * 0.6;
      if (score > bestScore) { bestScore = score; best = it; }
    });
    return best;
  }

  /* Monta HTML seguro a partir do texto estático (só **negrito** e *itálico*). */
  function rich(text) {
    var esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  }

  var SEND_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function mount(root, opts) {
    opts = opts || {};
    root.innerHTML =
      '<div class="chat">' +
        '<div class="chat__head">' +
          '<span class="chat__ava"><img src="assets/img/logo-mark.png" alt="" width="256" height="178"></span>' +
          '<div><b>Assistente Real</b><small>Assistente virtual · online</small></div>' +
          '<button class="x" type="button" aria-label="Fechar assistente">✕</button>' +
        '</div>' +
        '<div class="chat__body" role="log" aria-live="polite"></div>' +
        '<div class="chat__quick" aria-label="Perguntas rápidas"></div>' +
        '<form class="chat__form" autocomplete="off">' +
          '<label class="sr-only" for="chat-input-' + (opts.id || "w") + '">Digite sua pergunta</label>' +
          '<input id="chat-input-' + (opts.id || "w") + '" type="text" enterkeyhint="send" placeholder="Digite sua dúvida…" maxlength="300" />' +
          '<button type="submit" aria-label="Enviar">' + SEND_ICON + '</button>' +
        '</form>' +
        '<div class="chat__foot">' +
          '<a class="chat__human" href="' + CLINICA.wa + '" target="_blank" rel="noopener">💬 Falar com a equipe</a>' +
          '<p class="chat__disclaimer">' + AVISO + '</p>' +
        '</div>' +
      '</div>';

    var body = root.querySelector(".chat__body");
    var quick = root.querySelector(".chat__quick");
    var form = root.querySelector(".chat__form");
    var input = root.querySelector("input");
    var close = root.querySelector(".x");
    var busy = false;

    if (opts.onClose) close.addEventListener("click", opts.onClose);

    function scroll() { body.scrollTop = body.scrollHeight; }

    function addMsg(who, html, actions) {
      var m = document.createElement("div");
      m.className = "msg msg--" + who;
      if (who === "user") m.textContent = html; else m.innerHTML = html;
      if (actions && actions.length) {
        var wrap = document.createElement("div");
        wrap.className = "msg__actions";
        actions.forEach(function (key) {
          var a = A[key]; if (!a) return;
          var el = document.createElement("a");
          el.href = a.href; el.textContent = a.label;
          if (a.cls) el.className = a.cls;
          if (a.href.indexOf("http") === 0) { el.target = "_blank"; el.rel = "noopener"; }
          wrap.appendChild(el);
        });
        m.appendChild(wrap);
      }
      body.appendChild(m);
      scroll();
    }

    function reply(text) {
      var it = match(text);
      var t = document.createElement("div");
      t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>";
      body.appendChild(t); scroll();
      busy = true;
      setTimeout(function () {
        t.remove();
        if (it) addMsg("bot", rich(it.text), it.actions);
        else addMsg("bot", rich(NAO_SEI), ["wa"]);
        busy = false;
      }, 550 + Math.random() * 450);
    }

    function ask(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg("user", text);
      reply(text);
    }

    QUICK.forEach(function (q) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = q.label;
      b.addEventListener("click", function () { if (!busy) ask(q.q); });
      quick.appendChild(b);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      ask(input.value);
      input.value = "";
    });
    input.addEventListener("focus", function () { setTimeout(scroll, 300); });

    addMsg("bot", rich("Olá! 👋 Sou o **assistente virtual da Real Clínica Integrada**.\n\nPosso ajudar com endereço, telefone, horários, atendimentos e agendamento. Escolha uma opção abaixo ou digite sua dúvida."));

    return { ask: ask, focus: function () { input.focus({ preventScroll: true }); } };
  }

  /* Altura real da tela no celular (teclado aberto não quebra o layout) */
  function syncViewport() {
    var vv = window.visualViewport;
    var h = vv ? vv.height : window.innerHeight;
    document.documentElement.style.setProperty("--vvh", h + "px");
  }
  syncViewport();
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewport);
    window.visualViewport.addEventListener("scroll", syncViewport);
  }
  window.addEventListener("resize", syncViewport);

  window.RealChat = { mount: mount, match: match, CLINICA: CLINICA, rich: rich };
})();
