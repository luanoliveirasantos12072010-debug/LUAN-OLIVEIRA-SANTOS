/* =========================================================
   Real Clínica Integrada — efeitos e interações
   ========================================================= */
(function () {
  "use strict";

  var doc = document.documentElement;
  var body = document.body;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var range = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var vw = window.innerWidth, vh = window.innerHeight;
  var isMobile = function () { return vw < 641; };

  /* ---------------- Smooth scroll (Lenis) ---------------- */
  var lenis = null;
  function initLenis() {
    if (reduced || !window.Lenis) return;
    lenis = new window.Lenis({ duration: 1.15, smoothWheel: true, easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); } });
    lenis.stop();
  }
  function scrollToTarget(target) {
    var offset = -($(".header") ? $(".header").offsetHeight : 0) + 2;
    if (lenis) lenis.scrollTo(target, { offset: offset, duration: 1.6 });
    else {
      var top = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    }
  }
  function lockScroll(on) {
    body.classList.toggle("is-locked", on);
    if (lenis) on ? lenis.stop() : lenis.start();
  }

  /* ---------------- Preloader ---------------- */
  function runLoader(done) {
    var loader = $("#loader"), countEl = $("#loaderCount");
    if (!loader) return done();
    if (reduced) { loader.classList.add("is-done"); return done(); }
    var start = performance.now(), loaded = document.readyState === "complete", n = 0;
    window.addEventListener("load", function () { loaded = true; });
    (function tick(now) {
      var t = (now - start) / 1500;
      var target = loaded ? Math.min(100, t * 100) : Math.min(90, t * 80);
      if (now - start > 4000) target = 100;
      n = lerp(n, target, .18);
      var v = Math.round(n);
      countEl.textContent = v;
      loader.style.setProperty("--lp", v + "%");
      $(".loader__mark img", loader).style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
      if (v >= 100) { setTimeout(function () { loader.classList.add("is-done"); done(); }, 250); return; }
      requestAnimationFrame(tick);
    })(start);
  }

  /* ---------------- Split de palavras ---------------- */
  function splitWords(el) {
    var i = 0;
    var out = document.createDocumentFragment();
    function wrapWord(word, cls) {
      var w = document.createElement("span"); w.className = "w";
      var s = document.createElement("span"); s.textContent = word;
      if (cls) s.className = cls;
      s.style.setProperty("--i", i++);
      w.appendChild(s); return w;
    }
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      var text = node.textContent, cls = node.nodeType === 1 ? node.className : "";
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) out.appendChild(document.createTextNode(" "));
        else out.appendChild(wrapWord(part, cls));
      });
    });
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    el.innerHTML = ""; el.appendChild(out);
  }
  $$("[data-split]").forEach(splitWords);

  /* ---------------- Manifesto: palavras acendem ---------------- */
  var manifesto = $("[data-manifesto]"), mWords = [];
  if (manifesto) {
    var raw = manifesto.textContent.replace(/\s+/g, " ").trim();
    manifesto.setAttribute("aria-label", raw.replace(/[\[\]{}]/g, ""));
    var html = "", mode = "";
    raw.split(" ").forEach(function (w) {
      var cls = "mw";
      if (w.charAt(0) === "[") mode = "hl";
      if (w.charAt(0) === "{") mode = "or";
      if (mode) cls += " " + mode;
      var clean = w.replace(/[\[\]{}]/g, "");
      if (/[\]}]/.test(w)) mode = "";
      html += '<span class="' + cls + '" aria-hidden="true">' + clean + "</span> ";
    });
    manifesto.innerHTML = html;
    mWords = $$(".mw", manifesto);
  }

  /* ---------------- Reveal ao entrar na tela ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.hasAttribute("data-count")) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: "0px 0px -6% 0px" });
  $$("[data-reveal], [data-split], [data-count]").forEach(function (el) { io.observe(el); });

  /* ---------------- Contadores ---------------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute("data-count")), dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var fmt = function (v) { return v.toFixed(dec).replace(".", ","); };
    if (reduced) { el.textContent = fmt(to); return; }
    var t0 = performance.now();
    (function step(now) {
      var t = clamp((now - t0) / 1600, 0, 1);
      el.textContent = fmt(to * easeOut(t));
      if (t < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------------- Texto digitando (slogan oficial) ---------------- */
  var typedEl = $("[data-typed]");
  function startTyped() {
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
      var n = Math.round(clamp(W / 26, 18, 64));
      parts = [];
      for (var i = 0; i < n; i++) parts.push({
        x: Math.random() * W, y: Math.random() * H, s: 3 + Math.random() * 7,
        v: .15 + Math.random() * .45, ph: Math.random() * 6.28, r: Math.random() * 6.28, vr: (Math.random() - .5) * .01,
        o: i % 9 === 0 ? 1 : 0, a: .25 + Math.random() * .5, dx: 0, dy: 0
      });
    }
    function cross(p) {
      var s = p.s, t = s / 3;
      ctx.save(); ctx.translate(p.x + p.dx, p.y + p.dy); ctx.rotate(p.r);
      ctx.fillStyle = p.o ? "rgba(242,107,46," + p.a + ")" : "rgba(130,217,223," + p.a + ")";
      ctx.fillRect(-t / 2, -s / 2, t, s); ctx.fillRect(-s / 2, -t / 2, s, t);
      ctx.restore();
    }
    function frame(time) {
      if (!running) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.v; p.r += p.vr;
        p.x += Math.sin(time / 1800 + p.ph) * .25;
        if (p.y < -20) { p.y = H + 20; p.x = Math.random() * W; }
        var mx = p.x - mouse.x, my = p.y - mouse.y, d = Math.sqrt(mx * mx + my * my);
        var tx = 0, ty = 0;
        if (d < 140) { var f = (140 - d) / 140 * 40; tx = mx / d * f; ty = my / d * f; }
        p.dx = lerp(p.dx, tx, .08); p.dy = lerp(p.dy, ty, .08);
        cross(p);
      }
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    var hero = $(".hero");
    hero.addEventListener("pointermove", function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    hero.addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });
    new IntersectionObserver(function (en) {
      var vis = en[0].isIntersecting && !document.hidden;
      if (vis && !running) { running = true; requestAnimationFrame(frame); }
      else if (!vis) running = false;
    }).observe(hero);
    requestAnimationFrame(frame);
  }

  /* ---------------- Marquee com velocidade do scroll ---------------- */
  var marquees = $$("[data-marquee]").map(function (track) {
    var g = track.firstElementChild;
    for (var i = 0; i < 3; i++) track.appendChild(g.cloneNode(true));
    return { el: track, x: 0, w: 0, g: g };
  });

  /* ---------------- Cursor personalizado ---------------- */
  var cursor = $(".cursor"), dot = $(".cursor-dot");
  var cx = vw / 2, cy = vh / 2, tx = cx, ty = cy;
  if (finePointer && !reduced && cursor) {
    body.classList.add("has-cursor");
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = "translate(" + tx + "px," + ty + "px)";
    });
    document.addEventListener("pointerover", function (e) {
      var t = e.target;
      var view = t.closest && t.closest("[data-cursor='view']");
      var link = t.closest && t.closest("a, button, input");
      cursor.classList.toggle("is-view", !!view);
      cursor.classList.toggle("is-link", !view && !!link);
    });
  }

  /* ---------------- Botões magnéticos + cards 3D ---------------- */
  if (finePointer && !reduced) {
    $$("[data-magnetic]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * .25 + "px," + y * .35 + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; });
    });
    $$("[data-tilt]").forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", px * 100 + "%"); el.style.setProperty("--my", py * 100 + "%");
        el.style.transform = "perspective(900px) rotateX(" + (.5 - py) * 6 + "deg) rotateY(" + (px - .5) * 8 + "deg)";
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

  /* Links internos com scroll suave */
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

  /* ---------------- Demo do assistente (celular) ---------------- */
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
    var typing = function () { var t = document.createElement("div"); t.className = "typing"; t.innerHTML = "<i></i><i></i><i></i>"; demoBody.appendChild(t); return t; };
    var script = ["Onde fica a clínica?", "Vocês têm pilates?", "Como posso agendar?"];
    var play = function () {
      say("bot", "Olá! 👋 Como posso ajudar?");
      script.forEach(function (q, i) {
        setTimeout(function () {
          say("user", q);
          var t = typing();
          setTimeout(function () { t.remove(); var it = window.RealChat.match(q); say("bot", it ? it.text.split("\n\n")[0] + (it.text.indexOf("\n\n") > -1 ? "\n\n" + it.text.split("\n\n")[1] : "") : ""); }, 1100);
        }, 1200 + i * 3200);
      });
    };
    new IntersectionObserver(function (en, ob) {
      if (en[0].isIntersecting && !played) { played = true; play(); ob.disconnect(); }
    }, { threshold: .4 }).observe(demo);
  }

  /* ---------------- Lightbox ---------------- */
  var lb = $(".lightbox"), lbImg = lb && $("img", lb), lbCap = lb && $("p", lb);
  function closeLightbox() { if (lb && lb.classList.contains("is-open")) { lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); lockScroll(false); } }
  $$("[data-lightbox]").forEach(function (fig) {
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    var open = function () {
      var img = $("img", fig);
      lbImg.src = img.getAttribute("data-full") || img.src; lbImg.alt = img.alt;
      lbCap.textContent = $("figcaption", fig) ? $("figcaption", fig).textContent.replace(/^\d+/, "") : "";
      lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); lockScroll(true);
    };
    fig.addEventListener("click", open);
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
  if (lb) lb.addEventListener("click", function (e) { if (e.target !== lbImg) closeLightbox(); });

  /* ---------------- Elementos guiados pelo scroll ---------------- */
  var heroMedia = $("[data-hero-media]"), heroContent = $(".hero__content");
  var about = $("[data-about]"), cine = $("[data-cine]"), hgal = $("[data-hgal]");
  var hTrack = hgal && $(".hgal__track", hgal), hItems = hgal ? $$(".hgal__item", hgal) : [];
  var parallaxEls = $$("[data-parallax]");
  var progressEl = $(".progress"), igMark = $("[data-rotate]");
  var cineWords = cine ? $$("[data-cw]", cine) : [];
  var hDist = 0, lastY = -1, lastDir = 0, velocity = 0;

  function measure() {
    vw = window.innerWidth; vh = window.innerHeight;
    if (hgal) {
      var pin = vw > 640 && !reduced;
      hgal.classList.toggle("is-pinned", pin);
      hTrack.style.transform = "";
      if (pin) {
        hDist = Math.max(0, hTrack.scrollWidth - vw);
        hgal.style.setProperty("--hh", (hDist + vh) + "px");
      } else hgal.style.removeProperty("--hh");
    }
    if (cine && reduced) cine.style.height = "100vh";
    marquees.forEach(function (m) { m.w = m.g.offsetWidth; });
    lastY = -1;
  }

  function topOf(el) { return el.getBoundingClientRect().top + window.scrollY; }

  function update(y) {
    var docH = doc.scrollHeight - vh;
    if (progressEl) progressEl.style.setProperty("--sp", docH > 0 ? (y / docH).toFixed(4) : 0);

    /* header */
    if (header && !body.classList.contains("menu-open")) {
      header.classList.toggle("is-scrolled", y > 40);
      if (y > lastY + 4 && y > 700) header.classList.add("is-hidden");
      else if (y < lastY - 4 || y < 700) header.classList.remove("is-hidden");
    }

    /* hero */
    if (heroMedia && y < vh * 1.2 && !reduced) {
      heroMedia.style.transform = "translate3d(0," + y * .35 + "px,0)";
      heroContent.style.transform = "translate3d(0," + y * .15 + "px,0)";
      heroContent.style.opacity = 1 - range(y, vh * .2, vh * .85);
    }

    /* manifesto */
    if (mWords.length) {
      var r = manifesto.getBoundingClientRect();
      var p = reduced ? 1 : range(vh * .88 - r.top, 0, r.height + vh * .35);
      var on = Math.round(p * mWords.length);
      for (var i = 0; i < mWords.length; i++) mWords[i].classList.toggle("on", i < on);
    }

    /* A Clínica: imagem abrindo */
    if (about) {
      var ar = about.getBoundingClientRect();
      var ap = reduced ? 1 : easeOut(range(vh - ar.top, 0, vh * .95));
      var startX = isMobile() ? 6 : 22, startI = isMobile() ? 6 : 14;
      about.style.setProperty("--cx", (startX * (1 - ap)).toFixed(2) + "%");
      about.style.setProperty("--ci", (startI * (1 - ap)).toFixed(2) + "%");
      about.style.setProperty("--sc", (1.15 - .15 * ap).toFixed(3));
      about.style.setProperty("--py", ((ar.top / vh) * -6).toFixed(2) + "%");
    }

    /* parallax genérico */
    parallaxEls.forEach(function (el) {
      var r2 = el.getBoundingClientRect();
      if (r2.bottom < -100 || r2.top > vh + 100) return;
      var amt = parseFloat(el.getAttribute("data-parallax")) || -10;
      var c = (r2.top + r2.height / 2 - vh / 2) / vh;
      el.style.setProperty("--py", (c * amt * -1 - 6).toFixed(2) + "%");
    });

    /* cinematográfica */
    if (cine) {
      var ct = topOf(cine), ch = cine.offsetHeight - vh;
      var cp = reduced ? 1 : clamp((y - ct) / ch, 0, 1);
      var grow = easeOut(range(cp, 0, .36));
      var w0 = isMobile() ? 72 : 38, h0 = isMobile() ? 46 : 52;
      cine.style.setProperty("--p", cp.toFixed(3));
      cine.style.setProperty("--w", lerp(w0, 100, grow).toFixed(2));
      cine.style.setProperty("--h", lerp(h0, 100, grow).toFixed(2));
      cine.style.setProperty("--r", lerp(40, 0, grow).toFixed(1));
      cine.style.setProperty("--s", lerp(1.35, 1, easeOut(range(cp, 0, .9))).toFixed(3));
      cine.style.setProperty("--dim", range(cp, .3, .46).toFixed(3));
      cineWords.forEach(function (w, i) {
        var a = .42 + i * .13;
        w.style.setProperty("--o", range(cp, a, a + .1).toFixed(3));
      });
      cine.style.setProperty("--o4", range(cp, .82, .92).toFixed(3));
    }

    /* galeria horizontal */
    if (hgal) {
      if (hgal.classList.contains("is-pinned")) {
        var gt = topOf(hgal), gp = clamp((y - gt) / Math.max(1, hDist), 0, 1);
        hTrack.style.transform = "translate3d(" + (-gp * hDist).toFixed(1) + "px,0,0)";
      }
      hItems.forEach(function (it) {
        var ir = it.getBoundingClientRect();
        var cxm = ir.left + ir.width / 2, cym = ir.top + ir.height / 2;
        it.classList.toggle("is-color", Math.abs(cxm - vw / 2) < vw * .28 && cym > 0 && cym < vh);
      });
    }

    if (igMark) igMark.style.setProperty("--rot", (y * .04).toFixed(1) + "deg");

    /* botão do assistente: no celular aparece depois do hero */
    if (fab && body.classList.contains("is-ready")) fab.classList.toggle("is-shown", !isMobile() || y > vh * .55);

    if (lastY >= 0) {
      var dy = y - lastY;
      velocity = lerp(velocity, dy, .2);
      if (Math.abs(dy) > .5) lastDir = dy > 0 ? 1 : -1;
    }
    lastY = y;
  }

  function loop(time) {
    if (lenis) lenis.raf(time);
    var y = window.scrollY;
    if (y !== lastY) update(y);
    else velocity = lerp(velocity, 0, .1);

    /* marquee */
    marquees.forEach(function (m) {
      if (!m.w || reduced) return;
      var speed = (1.1 + Math.min(Math.abs(velocity) * .35, 14)) * (lastDir < 0 ? -1 : 1);
      m.x -= speed;
      if (m.x <= -m.w) m.x += m.w;
      if (m.x > 0) m.x -= m.w;
      m.el.style.transform = "translate3d(" + m.x.toFixed(1) + "px,0,0)";
    });

    /* cursor */
    if (body.classList.contains("has-cursor")) {
      cx = lerp(cx, tx, .18); cy = lerp(cy, ty, .18);
      cursor.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
    }
    requestAnimationFrame(loop);
  }

  /* ---------------- Início ---------------- */
  var yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initLenis();
  measure();
  window.addEventListener("resize", function () { measure(); update(window.scrollY); });
  window.addEventListener("load", measure);
  requestAnimationFrame(loop);

  runLoader(function () {
    lockScroll(false);
    body.classList.add("is-ready");
    startTyped();
    initParticles();
    setTimeout(function () { if (fab && !isMobile()) fab.classList.add("is-shown"); }, 1400);
  });
})();
