/* =========================================================
   Real Clínica Integrada — interações
   ========================================================= */
(function () {
  "use strict";

  var doc = document.documentElement;
  var body = document.body;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var vw = window.innerWidth, vh = window.innerHeight;
  var isMobile = function () { return vw < 641; };

  function lockScroll(on) { body.classList.toggle("is-locked", on); }
  function scrollToTarget(target) {
    var offset = ($(".header") ? $(".header").offsetHeight : 0) - 2;
    var top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
  }

  /* ---------------- Preloader ---------------- */
  function runLoader(done) {
    var loader = $("#loader"), countEl = $("#loaderCount");
    if (!loader) return done();
    if (reduced) { loader.classList.add("is-done"); return done(); }
    var start = performance.now(), loaded = document.readyState === "complete", n = 0;
    var markImg = $(".loader__mark img", loader);
    window.addEventListener("load", function () { loaded = true; });
    (function tick(now) {
      var t = (now - start) / 1200;
      var target = loaded ? Math.min(100, t * 100) : Math.min(90, t * 80);
      if (now - start > 3000) target = 100;
      n = lerp(n, target, .2);
      var v = Math.round(n);
      countEl.textContent = v;
      markImg.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
      if (v >= 100) { setTimeout(function () { loader.classList.add("is-done"); done(); }, 200); return; }
      requestAnimationFrame(tick);
    })(start);
  }

  /* ---------------- Reveal ao entrar na tela ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.hasAttribute("data-count")) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
  $$("[data-reveal], [data-count]").forEach(function (el) { io.observe(el); });

  /* ---------------- Contadores ---------------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute("data-count")), dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var fmt = function (v) { return v.toFixed(dec).replace(".", ","); };
    if (reduced) { el.textContent = fmt(to); return; }
    var t0 = performance.now();
    (function step(now) {
      var t = clamp((now - t0) / 1400, 0, 1);
      el.textContent = fmt(to * easeOut(t));
      if (t < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------------- Texto digitando (slogan oficial) ---------------- */
  function startTyped() {
    var typedEl = $("[data-typed]");
    if (!typedEl) return;
    var words = ["Acolhendo,", "Prevenindo,", "Reabilitando."], wi = 0, ci = 0, del = false;
    if (reduced) { typedEl.textContent = words.join(" "); return; }
    (function tick() {
      var w = words[wi];
      ci += del ? -1 : 1;
      typedEl.textContent = w.slice(0, ci);
      var delay = del ? 45 : 95;
      if (!del && ci === w.length) { del = true; delay = 1700; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; delay = 300; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------------- Partículas "+" no hero ---------------- */
  function initParticles() {
    var canvas = $(".hero__particles");
    if (!canvas || reduced) return;
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var W, H, parts = [], mouse = { x: -999, y: -999 }, running = true;
    function resize() {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(clamp(W / 30, 14, 50));
      parts = [];
      for (var i = 0; i < n; i++) parts.push({
        x: Math.random() * W, y: Math.random() * H, s: 3 + Math.random() * 7,
        v: .15 + Math.random() * .4, ph: Math.random() * 6.28, r: Math.random() * 6.28, vr: (Math.random() - .5) * .01,
        o: i % 9 === 0, a: .25 + Math.random() * .5, dx: 0, dy: 0
      });
    }
    function frame(time) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.v; p.r += p.vr;
        p.x += Math.sin(time / 1800 + p.ph) * .25;
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        var mx = p.x - mouse.x, my = p.y - mouse.y, d = Math.sqrt(mx * mx + my * my), tx = 0, ty = 0;
        if (d < 140) { var f = (140 - d) / 140 * 40; tx = mx / d * f; ty = my / d * f; }
        p.dx = lerp(p.dx, tx, .08); p.dy = lerp(p.dy, ty, .08);
        var s = p.s, t = s / 3;
        ctx.save(); ctx.translate(p.x + p.dx, p.y + p.dy); ctx.rotate(p.r);
        ctx.fillStyle = p.o ? "rgba(242,107,46," + p.a + ")" : "rgba(130,217,223," + p.a + ")";
        ctx.fillRect(-t / 2, -s / 2, t, s); ctx.fillRect(-s / 2, -t / 2, s, t);
        ctx.restore();
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    var hero = $(".hero");
    hero.addEventListener("pointermove", function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      else if (!vis) running = false;
    }).observe(hero);
    requestAnimationFrame(frame);
  }

  /* ---------------- Faixa laranja: esteira automática (vai e volta) ---------------- */
  var marquees = $$("[data-marquee]");
  marquees.forEach(function (track) {
    var g = track.firstElementChild;
    track.appendChild(g.cloneNode(true));
  });
  function measureMarquees() {
    marquees.forEach(function (track) {
      var dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      track.style.setProperty("--dist", -dist + "px");
      track.style.setProperty("--dur", Math.max(10, dist / 70) + "s");
    });
  }

  /* ---------------- Cursor personalizado (só no computador) ---------------- */
  var cursor = $(".cursor"), dot = $(".cursor-dot");
  var cx = vw / 2, cy = vh / 2, tx = cx, ty = cy, cursorOn = false;
  if (finePointer && !reduced && cursor) {
    cursorOn = true;
    body.classList.add("has-cursor");
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
    });
    document.addEventListener("pointerover", function (e) {
      var t = e.target;
      var view = t.closest && t.closest("[data-cursor='view']");
      var link = t.closest && t.closest("a, button, input, textarea, label, summary");
      cursor.classList.toggle("is-view", !!view);
      cursor.classList.toggle("is-link", !view && !!link);
    });
    (function follow() {
      cx = lerp(cx, tx, .2); cy = lerp(cy, ty, .2);
      cursor.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
      requestAnimationFrame(follow);
    })();
  }

  /* ---------------- Botões magnéticos ---------------- */
  if (finePointer && !reduced) {
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * .2 + "px," + y * .3 + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
    var final = $("[data-final]");
    if (final) final.addEventListener("pointermove", function (e) {
      var r = final.getBoundingClientRect();
      final.style.setProperty("--bx", (e.clientX - r.left) / r.width * 100 + "%");
      final.style.setProperty("--by", (e.clientY - r.top) / r.height * 100 + "%");
    });
  }

  /* ---------------- Header + menu mobile ---------------- */
  var header = $("#header"), burger = $(".burger"), menu = $("#mobileMenu");
  function setMenu(open) {
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.setAttribute("aria-hidden", !open);
    lockScroll(open);
  }
  if (burger) burger.addEventListener("click", function () { setMenu(!body.classList.contains("menu-open")); });

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      var target = id.length > 1 ? $(id) : null;
      if (!target) return;
      e.preventDefault();
      if (body.classList.contains("menu-open")) setMenu(false);
      scrollToTarget(id === "#inicio" ? 0 : target);
    });
  });
  $$(".mobile-menu a:not([href^='#'])").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });

  /* ---------------- Chat flutuante ---------------- */
  var panel = $("[data-chat-panel]"), chat = null, fab = $(".fab");
  function openChat(question) {
    if (!panel || !window.RealChat) { window.location.href = "assistente.html"; return; }
    if (!chat) chat = window.RealChat.mount(panel, { id: "w", onClose: closeChat });
    body.classList.add("chat-open");
    if (isMobile()) lockScroll(true);
    if (question) setTimeout(function () { chat.ask(question); }, 350);
    else if (!isMobile()) setTimeout(function () { chat.focus(); }, 400);
  }
  function closeChat() {
    body.classList.remove("chat-open");
    if (!body.classList.contains("menu-open")) lockScroll(false);
  }
  $$("[data-open-chat]").forEach(function (b) {
    b.addEventListener("click", function () {
      if (body.classList.contains("menu-open")) setMenu(false);
      openChat(b.getAttribute("data-ask"));
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (body.classList.contains("chat-open")) closeChat();
    if (body.classList.contains("menu-open")) setMenu(false);
    closeLightbox();
  });

  /* ---------------- Demo do assistente (celular ilustrativo) ---------------- */
  var demo = $("[data-demo]");
  if (demo && window.RealChat) {
    var demoBody = $(".demo-body", demo), played = false;
    var say = function (who, text) {
      var m = document.createElement("div");
      m.className = "msg msg--" + who;
      if (who === "user") m.textContent = text; else m.innerHTML = window.RealChat.rich(text);
      demoBody.appendChild(m);
      while (demoBody.scrollHeight > demoBody.clientHeight && demoBody.children.length > 1) demoBody.removeChild(demoBody.firstChild);
    };
    var script = ["Onde fica a clínica?", "Vocês têm pilates?", "Como posso agendar?"];
    var play = function () {
      say("bot", "Olá! 👋 Como posso ajudar?");
      script.forEach(function (q, i) {
        setTimeout(function () {
          say("user", q);
          var t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>"; demoBody.appendChild(t);
          setTimeout(function () {
            t.remove();
            var it = window.RealChat.match(q);
            if (it) say("bot", it.text.split("\n\n").slice(0, 2).join("\n\n"));
          }, 1100);
        }, 1200 + i * 3200);
      });
    };
    new IntersectionObserver(function (en, ob) {
      if (en[0].isIntersecting && !played) { played = true; play(); ob.disconnect(); }
    }, { threshold: .4 }).observe(demo);
  }

  /* ---------------- Galeria: setas ---------------- */
  var gTrack = $("[data-gallery]");
  $$("[data-gnav]").forEach(function (b) {
    b.addEventListener("click", function () {
      var item = $(".gallery__item", gTrack);
      var step = item ? item.getBoundingClientRect().width + 16 : 300;
      gTrack.scrollBy({ left: step * parseInt(b.getAttribute("data-gnav"), 10), behavior: reduced ? "auto" : "smooth" });
    });
  });

  /* ---------------- Lightbox ---------------- */
  var lb = $(".lightbox"), lbImg = lb && $("img", lb), lbCap = lb && $("p", lb);
  function closeLightbox() { if (lb && lb.classList.contains("is-open")) { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); lockScroll(false); } }
  $$("[data-lightbox]").forEach(function (fig) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    var open = function () {
      var img = $("img", fig);
      lbImg.src = img.getAttribute("data-full") || img.src; lbImg.alt = img.alt;
      lbCap.textContent = $("figcaption", fig) ? $("figcaption", fig).textContent : "";
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); lockScroll(true);
    };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
  if (lb) lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLightbox(); });

  /* ---------------- Avaliações enviadas pelo site ---------------- */
  function initReviews() {
    var form = $("[data-review-form]"), list = $("[data-site-reviews]"), empty = $("[data-reviews-empty]");
    if (!form || !list) return;
    var status = $("[data-review-status]", form), submit = $("[data-review-submit]", form);
    var photoInput = $("#rv-photo"), preview = $("[data-photo-preview]"), photoLabel = $("[data-photo-label]");
    var LOCAL_KEY = "rci-avaliacoes";
    var store = null, uid = null, photoData = "";

    function setStatus(msg, isError) { status.textContent = msg; status.classList.toggle("is-error", !!isError); }

    function starsHtml(n) {
      var s = document.createElement("span");
      s.className = "stars"; s.setAttribute("aria-label", n + " estrelas");
      s.textContent = "★★★★★".slice(0, n);
      var off = document.createElement("span"); off.className = "off"; off.textContent = "★★★★★".slice(0, 5 - n);
      s.appendChild(off);
      return s;
    }

    function render(items) {
      $$(".rv", list).forEach(function (el) { el.remove(); });
      empty.hidden = items.length > 0;
      items.forEach(function (r) {
        var nota = clamp(parseInt(r.nota, 10) || 5, 1, 5);
        var nome = String(r.nome || "").slice(0, 60);
        var art = document.createElement("article"); art.className = "rv";
        if (r.comentario) {
          var q = document.createElement("span"); q.className = "rv__quote"; q.setAttribute("aria-hidden", "true"); q.textContent = "“";
          var p = document.createElement("p"); p.textContent = String(r.comentario).slice(0, 600);
          art.appendChild(q); art.appendChild(p);
        }
        var who = document.createElement("div"); who.className = "rv__who";
        var foto = typeof r.foto === "string" && /^data:image\/(jpeg|png|webp);base64,/.test(r.foto) ? r.foto : "";
        var av;
        if (foto) { av = document.createElement("img"); av.src = foto; av.alt = "Foto de " + nome; av.width = 46; av.height = 46; }
        else { av = document.createElement("span"); av.setAttribute("aria-hidden", "true"); av.textContent = (nome.trim().charAt(0) || "?").toUpperCase(); av.style.background = "#0d5c66"; }
        av.className = "avatar";
        var info = document.createElement("div");
        var b = document.createElement("b"); b.textContent = nome;
        info.appendChild(b); info.appendChild(starsHtml(nota));
        if (r.criadoEm) { var d = document.createElement("span"); d.className = "rv__date"; d.textContent = new Date(r.criadoEm).toLocaleDateString("pt-BR"); info.appendChild(d); }
        who.appendChild(av); who.appendChild(info);
        art.appendChild(who);
        list.appendChild(art);
      });
    }

    function readLocal() {
      try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); } catch (e) { return []; }
    }
    function useLocal() {
      store = null;
      render(readLocal());
    }

    /* foto opcional: reduzida para 160px antes de salvar */
    photoInput.addEventListener("change", function () {
      var file = photoInput.files && photoInput.files[0];
      photoData = "";
      if (!file) return;
      if (!/^image\//.test(file.type)) { setStatus("Escolha um arquivo de imagem.", true); return; }
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var size = 160, c = document.createElement("canvas");
        c.width = c.height = size;
        var s = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        photoData = c.toDataURL("image/jpeg", .8);
        URL.revokeObjectURL(url);
        preview.innerHTML = "";
        var p = document.createElement("img"); p.src = photoData; p.alt = "";
        preview.appendChild(p);
        photoLabel.textContent = "Trocar foto";
        setStatus("");
      };
      img.onerror = function () { URL.revokeObjectURL(url); setStatus("Não foi possível ler essa imagem. Tente outra.", true); };
      img.src = url;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = $("#rv-name").value.trim();
      var notaEl = $("input[name=nota]:checked", form);
      var comentario = $("#rv-comment").value.trim();
      if (nome.length < 2) { setStatus("Digite seu nome para publicar.", true); $("#rv-name").focus(); return; }
      if (!notaEl) { setStatus("Escolha de 1 a 5 estrelas.", true); return; }
      var data = { nome: nome.slice(0, 60), nota: parseInt(notaEl.value, 10), comentario: comentario.slice(0, 600), foto: photoData, criadoEm: Date.now() };

      var done = function (local) {
        setStatus(local ? "Obrigado! Sua avaliação foi salva neste aparelho." : "Obrigado! Sua avaliação foi publicada.");
        form.reset(); photoData = ""; preview.textContent = "📷"; photoLabel.textContent = "Escolher foto";
        submit.disabled = false;
      };

      if (store && uid) {
        submit.disabled = true; setStatus("Publicando…");
        store.collection("avaliacoes").doc(uid).set(data).then(function () { done(false); }, function (err) {
          submit.disabled = false;
          if (err && err.code === "invalid_argument") setStatus("Esta página não permite publicar avaliações com o seu acesso.", true);
          else if (err && err.code === "quota_exceeded") setStatus("O limite de avaliações foi atingido.", true);
          else setStatus("Não foi possível publicar agora. Tente de novo em instantes.", true);
        });
        return;
      }
      /* sem banco de dados: guarda neste navegador */
      var items = readLocal();
      items.unshift(data);
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(items.slice(0, 50))); } catch (err) { /* armazenamento indisponível */ }
      render(items);
      done(true);
    });

    useLocal();

    /* Quando aberto como Artifact no claude.ai, as avaliações ficam salvas para todos */
    if (window.claude && typeof window.claude.use === "function") {
      Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function (r) {
        var db = r[0], user = r[1];
        if (!db) return;
        return (user ? user.id() : Promise.resolve(null)).then(function (id) {
          store = db; uid = id;
          db.collection("avaliacoes").orderBy("criadoEm", "desc").limit(200).onSnapshot(function (snap) {
            render(snap.docs.map(function (d) { return d.data(); }));
          }, function () { useLocal(); });
        });
      }).catch(function () { /* segue com o modo local */ });
    }
  }

  /* ---------------- Scroll ---------------- */
  var heroMedia = $("[data-hero-media]"), heroContent = $(".hero__content");
  var progressEl = $(".progress"), igMark = $("[data-rotate]");
  var lastY = -1, ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;
    var docH = doc.scrollHeight - vh;
    if (progressEl) progressEl.style.setProperty("--sp", docH > 0 ? (y / docH).toFixed(4) : 0);
    if (header && !body.classList.contains("menu-open")) {
      header.classList.toggle("is-scrolled", y > 40);
      if (y > lastY + 4 && y > 700) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 700) header.classList.remove("is-hidden");
    }
    if (heroMedia && y < vh * 1.2 && !reduced) {
      heroMedia.style.transform = "translate3d(0," + (y * .3).toFixed(1) + "px,0)";
      heroContent.style.opacity = (1 - clamp((y - vh * .2) / (vh * .65), 0, 1)).toFixed(3);
    }
    if (igMark) igMark.style.setProperty("--rot", (y * .04).toFixed(1) + "deg");
    if (fab && body.classList.contains("is-ready")) fab.classList.toggle("is-shown", !isMobile() || y > vh * .55);
    lastY = y;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener("resize", function () { vw = window.innerWidth; vh = window.innerHeight; measureMarquees(); update(); });

  /* ---------------- Início ---------------- */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  measureMarquees();
  window.addEventListener("load", measureMarquees);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureMarquees);
  initReviews();
  update();

  runLoader(function () {
    lockScroll(false);
    body.classList.add("is-ready");
    startTyped();
    initParticles();
    setTimeout(function () { if (fab && !isMobile()) fab.classList.add("is-shown"); update(); }, 1200);
  });
})();
