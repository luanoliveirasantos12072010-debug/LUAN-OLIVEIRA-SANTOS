/**
 * Interactive handlers for the Home Repair Guide page.
 * Replicates the exact behaviors from the original site:
 * - VSL video play overlay and unmute
 * - Live visitor localized dates & minutes elapsed
 * - Smooth scroll to checkout offer
 * - Sticky floating CTA bar
 * - Multi-step upsell cascade modal (Tracks A & B)
 * - Smartphone app preview frame carousel
 * - Add-ons dual-card slider
 */

export function initPageInteractions(container: HTMLElement): () => void {
  const cleanups: (() => void)[] = [];

  // 1. VSL Video Play Handler
  const v = container.querySelector<HTMLVideoElement>('#vslVideo');
  const b = container.querySelector<HTMLElement>('#vslPlay');
  let videoStarted = false;

  function startVideo() {
    if (!v || videoStarted) return;
    videoStarted = true;
    try {
      v.currentTime = 0;
    } catch (_) {}
    v.muted = false;
    v.volume = 1;
    v.controls = true;
    const p = v.play();
    if (p && p.catch) {
      p.catch(() => {
        if (v) {
          v.muted = true;
          v.play();
        }
      });
    }
    if (b) {
      b.style.opacity = '0';
      b.style.pointerEvents = 'none';
      setTimeout(() => {
        if (b && b.parentNode) b.parentNode.removeChild(b);
      }, 260);
    }
    document.removeEventListener('click', onDocClick, true);
  }

  function onDocClick() {
    startVideo();
  }

  if (b) {
    b.addEventListener('click', startVideo);
    cleanups.push(() => b.removeEventListener('click', startVideo));
  }
  document.addEventListener('click', onDocClick, true);
  cleanups.push(() => document.removeEventListener('click', onDocClick, true));

  // 2. Dates & Minutes
  const M = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  function updateDates() {
    const d = new Date();
    const t = `${d.getDate()} de ${M[d.getMonth()]} de ${d.getFullYear()}`;
    container.querySelectorAll('.dt').forEach((e) => {
      e.textContent = t;
    });
    container.querySelectorAll('.dt2').forEach((e) => {
      e.textContent = t;
    });
  }

  updateDates();
  const dateInterval = setInterval(updateDates, 60000);
  cleanups.push(() => clearInterval(dateInterval));

  function onVisibility() {
    if (!document.hidden) updateDates();
  }
  document.addEventListener('visibilitychange', onVisibility);
  cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));

  const mins = container.querySelector<HTMLElement>('.mins');
  if (mins) mins.textContent = String(18 + Math.floor(Math.random() * 42));

  // 3. Smooth Scroll to Offer
  const scrollAnchors = container.querySelectorAll<HTMLElement>('.js-scroll');
  scrollAnchors.forEach((a) => {
    function onScrollClick(e: MouseEvent) {
      e.preventDefault();
      const t = container.querySelector('#offer') || document.getElementById('offer');
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    a.addEventListener('click', onScrollClick);
    cleanups.push(() => a.removeEventListener('click', onScrollClick));
  });

  // 4. Sticky CTA
  const stickyBar = container.querySelector<HTMLElement>('#sticky') || document.getElementById('sticky');
  const offerSection = container.querySelector<HTMLElement>('#offer') || document.getElementById('offer');
  const heroTrigger = container.querySelector<HTMLElement>('.hero');

  if (stickyBar && offerSection && heroTrigger) {
    const onScroll = () => {
      const passedHero = heroTrigger.getBoundingClientRect().bottom < 0;
      const inOffer =
        offerSection.getBoundingClientRect().top < window.innerHeight &&
        offerSection.getBoundingClientRect().bottom > 0;
      stickyBar.classList.toggle('on', passedHero && !inOffer);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    cleanups.push(() => window.removeEventListener('scroll', onScroll));
  }

  // 5. Checkout Cascade Modal (#ups)
  const CK: Record<string, Record<string, string>> = {
    A: {
      base: 'https://pay.hotmart.com/A107647964S?off=0xyiokal&checkoutMode=10',
      s1: 'https://pay.hotmart.com/A107647964S?off=caawjv6f&checkoutMode=10',
      s2: 'https://pay.hotmart.com/A107647964S?off=2bn2crym&checkoutMode=10',
      s3: 'https://pay.hotmart.com/A107647964S?off=lhdbyxrr&checkoutMode=10',
    },
    B: {
      base: 'https://pay.hotmart.com/A107647964S?off=i4ydjw4x&checkoutMode=10',
      s1: 'https://pay.hotmart.com/A107647964S?off=ewafi30q&checkoutMode=10',
      s2: 'https://pay.hotmart.com/A107647964S?off=xwp7ifoe&checkoutMode=10',
      s3: 'https://pay.hotmart.com/A107647964S?off=mtymqfef&checkoutMode=10',
    },
  };
  const BASE_PRICE: Record<string, number> = { A: 7.9, B: 14.9 };

  const ov = container.querySelector<HTMLElement>('#ups') || document.getElementById('ups');
  if (ov) {
    let track = 'A';

    const showStep = (step: string) => {
      ov.dataset.step = step;
      ov.classList.add('show');
      ov.setAttribute('aria-hidden', 'false');
      document.body.classList.add('locked');
    };

    const hideModal = () => {
      ov.classList.remove('show');
      ov.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('locked');
    };

    const goToCheckout = (url: string, value: number, label: string) => {
      try {
        if ((window as any).fbq) {
          (window as any).fbq('track', 'InitiateCheckout', {
            value: value,
            currency: 'USD',
            content_name: label,
          });
        }
      } catch (_) {}

      let dest = url && url.startsWith('http') ? url : CK[track].base;
      hideModal();
      if (dest && dest.startsWith('http')) {
        const q = location.search.replace(/^\?/, '');
        if (q) dest += (dest.indexOf('?') > -1 ? '&' : '?') + q;
        setTimeout(() => {
          location.href = dest;
        }, 220);
      } else {
        console.warn('[checkout] placeholder — track', track, 'value', value);
      }
    };

    container.querySelectorAll<HTMLElement>('[data-buy]').forEach((b) => {
      const onBuyClick = (e: MouseEvent) => {
        e.preventDefault();
        track = b.dataset.buy || 'A';
        ov.dataset.track = track;
        showStep('s1');
      };
      b.addEventListener('click', onBuyClick);
      cleanups.push(() => b.removeEventListener('click', onBuyClick));
    });

    const ORDER = ['s1', 's2', 's3'];
    const nextStep = () => {
      const i = ORDER.indexOf(ov.dataset.step || '');
      if (i < ORDER.length - 1) {
        showStep(ORDER[i + 1]);
      } else {
        goToCheckout(CK[track].base, BASE_PRICE[track], 'base');
      }
    };

    const onOverlayClick = (e: MouseEvent) => {
      if (e.target === ov) {
        nextStep();
        return;
      }
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === 'yes') {
        const step = ov.dataset.step || 's1';
        return goToCheckout(CK[track][step], parseFloat(btn.dataset.price || '0'), `${track}-${step}`);
      }
      nextStep();
    };

    ov.addEventListener('click', onOverlayClick);
    cleanups.push(() => ov.removeEventListener('click', onOverlayClick));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && ov.classList.contains('show')) nextStep();
    };
    document.addEventListener('keydown', onKeyDown);
    cleanups.push(() => document.removeEventListener('keydown', onKeyDown));

    // Dynamic track style rule
    const styleId = 'ups-track-rule';
    let st = document.getElementById(styleId);
    if (!st) {
      st = document.createElement('style');
      st.id = styleId;
      st.textContent = '.ups[data-track="A"] [data-t="B"],.ups[data-track="B"] [data-t="A"]{display:none!important}';
      document.head.appendChild(st);
    }
  }

  // 6. Mobile Phone App Preview Slider
  const trk = container.querySelector<HTMLElement>('.app__trk');
  if (trk) {
    const sl = Array.from(trk.children) as HTMLElement[];
    const n = sl.length;
    let cur = 0;
    let timer: any = null;
    let inView = false;
    let seen = false;
    const dots = Array.from(container.querySelectorAll<HTMLElement>('.app__dots button'));
    const cap = container.querySelector<HTMLElement>('.app__cap');
    const tt = cap?.querySelector<HTMLElement>('.app__t');
    const dd = cap?.querySelector<HTMLElement>('.app__d');
    const phone = container.querySelector<HTMLElement>('.phone');
    const prevBtn = container.querySelector<HTMLElement>('.app__nav--p');
    const nextBtn = container.querySelector<HTMLElement>('.app__nav--n');

    const goSlide = (k: number) => {
      cur = (k + n) % n;
      trk.style.transform = `translateX(${-100 * cur}%)`;
      dots.forEach((dot, j) => dot.classList.toggle('on', j === cur));
      if (cap && tt && dd && sl[cur]) {
        cap.classList.add('fade');
        setTimeout(() => {
          if (tt && dd && sl[cur]) {
            tt.textContent = sl[cur].dataset.t || '';
            dd.textContent = sl[cur].dataset.d || '';
          }
          cap.classList.remove('fade');
        }, 180);
      }
      const nextImg = sl[(cur + 1) % n]?.querySelector<HTMLImageElement>('img');
      if (nextImg) nextImg.loading = 'eager';
    };

    const stopSlider = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const startSlider = () => {
      stopSlider();
      timer = setInterval(() => {
        goSlide(cur + 1);
      }, 2600);
    };

    dots.forEach((d, k) => {
      const onDotClick = () => {
        goSlide(k);
        startSlider();
      };
      d.addEventListener('click', onDotClick);
      cleanups.push(() => d.removeEventListener('click', onDotClick));
    });

    if (prevBtn) {
      const onPrev = () => {
        goSlide(cur - 1);
        startSlider();
      };
      prevBtn.addEventListener('click', onPrev);
      cleanups.push(() => prevBtn.removeEventListener('click', onPrev));
    }

    if (nextBtn) {
      const onNext = () => {
        goSlide(cur + 1);
        startSlider();
      };
      nextBtn.addEventListener('click', onNext);
      cleanups.push(() => nextBtn.removeEventListener('click', onNext));
    }

    let x0: number | null = null;
    const onSwipeDown = (x: number) => {
      x0 = x;
      stopSlider();
    };
    const onSwipeUp = (x: number) => {
      if (x0 === null) return;
      const dx = x - x0;
      x0 = null;
      if (dx < -40) goSlide(cur + 1);
      else if (dx > 40) goSlide(cur - 1);
      if (inView) startSlider();
    };

    if (phone) {
      const onTStart = (e: TouchEvent) => onSwipeDown(e.touches[0].clientX);
      const onTEnd = (e: TouchEvent) => onSwipeUp(e.changedTouches[0].clientX);
      const onMDown = (e: MouseEvent) => {
        e.preventDefault();
        onSwipeDown(e.clientX);
      };
      const onMUp = (e: MouseEvent) => onSwipeUp(e.clientX);

      phone.addEventListener('touchstart', onTStart, { passive: true });
      phone.addEventListener('touchend', onTEnd);
      phone.addEventListener('mousedown', onMDown);
      window.addEventListener('mouseup', onMUp);

      cleanups.push(() => {
        phone.removeEventListener('touchstart', onTStart);
        phone.removeEventListener('touchend', onTEnd);
        phone.removeEventListener('mousedown', onMDown);
        window.removeEventListener('mouseup', onMUp);
      });

      if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver(
          (es) => {
            inView = es[0].isIntersecting;
            if (inView) {
              if (!seen) {
                seen = true;
                setTimeout(() => goSlide(cur + 1), 250);
              }
              startSlider();
            } else {
              stopSlider();
            }
          },
          { threshold: 0.15 }
        );
        obs.observe(phone);
        cleanups.push(() => obs.disconnect());
      } else {
        startSlider();
      }
    }

    const onVisChange = () => {
      if (document.hidden || !inView) stopSlider();
      else startSlider();
    };
    document.addEventListener('visibilitychange', onVisChange);
    cleanups.push(() => {
      stopSlider();
      document.removeEventListener('visibilitychange', onVisChange);
    });
  }

  // 7. Add-ons Carousel (2 cards per page on desktop)
  const adnTrk = container.querySelector<HTMLElement>('.adn__trk');
  if (adnTrk) {
    const vp = adnTrk.parentElement;
    const dots = Array.from(container.querySelectorAll<HTMLElement>('.adn__dots button'));
    const totalPages = dots.length;
    let curPage = 0;
    const pv = container.querySelector<HTMLButtonElement>('.adn__nav--p');
    const nx = container.querySelector<HTMLButtonElement>('.adn__nav--n');

    const goAddon = (k: number) => {
      curPage = Math.max(0, Math.min(totalPages - 1, k));
      const solo =
        curPage === totalPages - 1 &&
        adnTrk.children.length % 2 === 1 &&
        matchMedia('(min-width:700px)').matches;
      adnTrk.style.transform = `translateX(calc(${-100 * curPage + (solo ? 25 : 0)}% - ${10 * curPage - (solo ? 2.5 : 0)}px))`;
      dots.forEach((dot, j) => dot.classList.toggle('on', j === curPage));
      if (pv) pv.disabled = curPage === 0;
      if (nx) nx.disabled = curPage === totalPages - 1;
      Array.from(adnTrk.children)
        .slice(curPage * 2, curPage * 2 + 4)
        .forEach((f) => {
          const img = f.querySelector<HTMLImageElement>('img');
          if (img) img.loading = 'eager';
        });
    };

    dots.forEach((d, k) => {
      const onDot = () => goAddon(k);
      d.addEventListener('click', onDot);
      cleanups.push(() => d.removeEventListener('click', onDot));
    });

    if (pv) {
      const onPrev = () => goAddon(curPage - 1);
      pv.addEventListener('click', onPrev);
      cleanups.push(() => pv.removeEventListener('click', onPrev));
    }

    if (nx) {
      const onNext = () => goAddon(curPage + 1);
      nx.addEventListener('click', onNext);
      cleanups.push(() => nx.removeEventListener('click', onNext));
    }

    let x0: number | null = null;
    const onSwipeEnd = (x: number) => {
      if (x0 === null) return;
      const dx = x - x0;
      x0 = null;
      if (dx < -40) goAddon(curPage + 1);
      else if (dx > 40) goAddon(curPage - 1);
    };

    if (vp) {
      const onTStart = (e: TouchEvent) => {
        x0 = e.touches[0].clientX;
      };
      const onTEnd = (e: TouchEvent) => {
        onSwipeEnd(e.changedTouches[0].clientX);
      };
      const onMDown = (e: MouseEvent) => {
        e.preventDefault();
        x0 = e.clientX;
      };
      const onMUp = (e: MouseEvent) => onSwipeEnd(e.clientX);

      vp.addEventListener('touchstart', onTStart, { passive: true });
      vp.addEventListener('touchend', onTEnd);
      vp.addEventListener('mousedown', onMDown);
      window.addEventListener('mouseup', onMUp);

      cleanups.push(() => {
        vp.removeEventListener('touchstart', onTStart);
        vp.removeEventListener('touchend', onTEnd);
        vp.removeEventListener('mousedown', onMDown);
        window.removeEventListener('mouseup', onMUp);
      });
    }

    goAddon(0);
  }

  return () => {
    cleanups.forEach((cleanup) => {
      try {
        cleanup();
      } catch (_) {}
    });
    document.body.classList.remove('locked');
  };
}
