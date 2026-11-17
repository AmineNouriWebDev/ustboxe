/**
 * UST BOXE — main.js
 * Shared JS: header injection, footer injection, cursor, scroll progress, AOS, back-to-top
 */

/* ══════════════════════════════════════
   HEADER & FOOTER INJECTION
══════════════════════════════════════ */

const CURRENT_PAGE = window.location.pathname.split('/').pop() || 'index.html';
const ROOT = (() => {
  const p = window.location.pathname;
  return p.includes('/pages/') ? '../' : './';
})();

function getNavLinks() {
  const links = [
    { href: `${ROOT}index.html`,              label: 'Accueil',      id: 'index.html' },
    { href: `${ROOT}pages/disciplines.html`,  label: 'Disciplines',  id: 'disciplines.html' },
    { href: `${ROOT}pages/planning-tarifs.html`, label: 'Horaires & Tarifs', id: 'planning-tarifs.html' },
    { href: `${ROOT}pages/palmares.html`,     label: 'Palmarès',     id: 'palmares.html' },
    { href: `${ROOT}pages/galerie.html`,      label: 'Galerie',      id: 'galerie.html' },
    { href: `${ROOT}pages/contact.html`,      label: 'Contact',      id: 'contact.html' },
  ];
  return links;
}

function injectHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  const links = getNavLinks();
  const navLinks = links.map(l => {
    const isActive = CURRENT_PAGE === l.id ? 'active' : '';
    return `<a href="${l.href}" class="nav-link ${isActive}" aria-label="${l.label}">${l.label}</a>`;
  }).join('');

  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="mobile-nav-link">${l.label}</a>`
  ).join('');

  placeholder.outerHTML = `
  <div id="scroll-progress" aria-hidden="true"></div>
  <div id="cursor-dot" aria-hidden="true"></div>
  <div id="cursor-ring" aria-hidden="true"></div>

  <!-- Bandeau Promo -->
  <div class="promo-topbar" id="promo-topbar" role="banner">
    <div class="promo-inner">
      <span class="promo-text">🥊 <strong>1er COURS D'ESSAI GRATUIT</strong> — Saison 2026-2027</span>
      <a href="${ROOT}pages/contact.html#essai" class="promo-link">Réserver mon essai →</a>
    </div>
    <button class="promo-close" id="promo-close-btn" aria-label="Fermer le bandeau">✕</button>
  </div>

  <header id="site-header" role="banner">
    <div class="container header-inner">
      <a href="${ROOT}index.html" class="site-logo" aria-label="UST BOXE - Accueil">
        <div class="logo-icon" aria-hidden="true">🥊</div>
        <div class="logo-text">
          <span class="name">UST BOXE</span>
          <span class="sub">Talence · Gironde</span>
        </div>
      </a>

      <nav class="site-nav" role="navigation" aria-label="Navigation principale">
        ${navLinks}
      </nav>

      <a href="${ROOT}pages/contact.html#essai" class="btn btn-rouge header-cta" id="header-cta-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
        Essai gratuit
      </a>

      <button class="burger-btn" id="burger-btn" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <nav class="mobile-menu" id="mobile-menu" role="navigation" aria-label="Menu mobile">
    ${mobileLinks}
    <div class="mobile-menu-footer">
      <a href="${ROOT}pages/contact.html#essai" class="btn btn-rouge">Essai gratuit</a>
      <button class="pwa-install-btn" id="pwa-btn-mobile" style="display:none; margin-top:12px; width:100%; justify-content:center;">
        📲 Installer l'application
      </button>
    </div>
  </nav>
  `;
}

function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.outerHTML = `
  <footer id="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="site-logo">
            <div class="logo-icon" aria-hidden="true">🥊</div>
            <div class="logo-text">
              <span class="name">UST BOXE</span>
              <span class="sub">Talence · Gironde</span>
            </div>
          </div>
          <p class="footer-desc">
            Union Sportive Talençaise Boxe — Une boxe pour tous, une place pour chacun !<br>
            Club affilié à la Fédération Française de Boxe, basé à Talence (33400).
          </p>
          <span class="footer-ffboxe">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Affilié FFBoxe
          </span>
          <div class="footer-socials" style="margin-top:20px">
            <a href="https://www.facebook.com/UST-BOXE-524842731004325/" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook UST BOXE">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/33618410680" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp UST BOXE">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul class="footer-links">
            <li><a href="${ROOT}index.html">Accueil</a></li>
            <li><a href="${ROOT}pages/disciplines.html">Nos disciplines</a></li>
            <li><a href="${ROOT}pages/planning-tarifs.html">Horaires & Tarifs</a></li>
            <li><a href="${ROOT}pages/palmares.html">Palmarès</a></li>
            <li><a href="${ROOT}pages/galerie.html">Galerie</a></li>
            <li><a href="${ROOT}pages/contact.html">Contact</a></li>
          </ul>
        </div>

        <!-- Disciplines -->
        <div class="footer-col">
          <h4>Disciplines</h4>
          <ul class="footer-links">
            <li><a href="${ROOT}pages/disciplines.html#educative">Boxe éducative</a></li>
            <li><a href="${ROOT}pages/disciplines.html#amateur">Boxe amateur & loisirs</a></li>
            <li><a href="${ROOT}pages/disciplines.html#competition">Boxe compétition</a></li>
            <li><a href="${ROOT}pages/disciplines.html#feminine">Boxe féminine</a></li>
            <li><a href="${ROOT}pages/disciplines.html#aeroboxe">Aéro boxe / Fitness</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Salle Pierre de Coubertin<br>Rue Salvador Allende<br>33400 Talence</span>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <a href="tel:+33618410680">06 18 41 06 80</a>
          </div>
          <div class="footer-contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:a.nouiri@live.fr">a.nouiri@live.fr</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">© 2026-2027 <span>UST BOXE</span> — Tous droits réservés. Union Sportive Talençaise Boxe. Created by <a href="https://maxsolving.com" target="_blank" rel="noopener noreferrer" style="color:var(--rouge); text-decoration:none; font-weight:700;">MaxSolving</a></p>
        <p class="footer-copy">Affilié à la <span>Fédération Française de Boxe</span></p>
        <div style="width:100%; text-align:center; margin-top:10px;">
          <button class="pwa-install-btn" id="pwa-btn-footer" style="display:none;">
            📲 Installer l'application UST BOXE
          </button>
        </div>
      </div>
    </div>

    <button id="back-to-top" aria-label="Retour en haut de page">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
    </button>
  </footer>
  `;
}

/* ══════════════════════════════════════
   HEADER SCROLL
══════════════════════════════════════ */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const progress = document.getElementById('scroll-progress');
  if (!header) return;

  const onScroll = () => {
    // Scrolled class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Progress bar
    if (progress) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      progress.style.width = pct + '%';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════
   BURGER MENU
══════════════════════════════════════ */
function initBurger() {
  const btn = document.getElementById('burger-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

/* ══════════════════════════════════════
   AOS (Scroll animations)
══════════════════════════════════════ */
function initAOS() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const els = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════
   TIMELINE ANIMATION (palmares page)
══════════════════════════════════════ */
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}

/* ══════════════════════════════════════
   COUNTUP
══════════════════════════════════════ */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════ */
function initPageLoader() {
  // Inject skip link for accessibility
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Aller au contenu principal';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Inject loader
  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.setAttribute('aria-hidden', 'true');
  loader.setAttribute('role', 'presentation');
  loader.innerHTML = `<div class="loader-logo">🥊</div>`;
  document.body.appendChild(loader);

  // Hide loader after fonts/resources
  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 300);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
  }
}

/* ══════════════════════════════════════
   PWA & SERVICE WORKER
══════════════════════════════════════ */
let deferredInstallPrompt = null;

function initPWA() {
  // Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = ROOT === './' ? './sw.js' : '../sw.js';
      navigator.serviceWorker.register(swUrl)
        .then((reg) => {
          console.log('[PWA] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // Intercept beforeinstallprompt for desktop & mobile
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btns = document.querySelectorAll('.pwa-install-btn');
    btns.forEach((btn) => {
      btn.style.display = 'inline-flex';
      btn.onclick = async () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        console.log(`[PWA] Install prompt outcome: ${outcome}`);
        deferredInstallPrompt = null;
        document.querySelectorAll('.pwa-install-btn').forEach((b) => (b.style.display = 'none'));
      };
    });
  });

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] UST BOXE app installed successfully.');
    document.querySelectorAll('.pwa-install-btn').forEach((b) => (b.style.display = 'none'));
  });
}

/* ══════════════════════════════════════
   PROMO TOPBAR (Auto-hide & Close)
══════════════════════════════════════ */
function initPromoTopbar() {
  const topbar = document.getElementById('promo-topbar');
  const closeBtn = document.getElementById('promo-close-btn');
  if (!topbar) return;

  const hideTopbar = () => {
    topbar.classList.add('hidden');
    document.body.classList.add('topbar-hidden');
    document.documentElement.style.setProperty('--topbar-height', '0px');
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', hideTopbar);
  }

  // Auto-hide smoothly after 5 seconds
  const autoTimer = setTimeout(hideTopbar, 5000);

  // Auto-hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40 && !topbar.classList.contains('hidden')) {
      clearTimeout(autoTimer);
      hideTopbar();
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   INIT
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  injectHeader();
  injectFooter();
  initPromoTopbar();
  initHeaderScroll();
  initBurger();
  initCursor();
  initAOS();
  initBackToTop();
  initTimeline();
  initCountUp();
  initPWA();
});
