/**
 * UST BOXE — home.js
 * GSAP animations pour la page d'accueil
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  // ── HERO ANIMATION ──
  const tl = gsap.timeline({ delay: 0.2 });

  // Lines reveal
  const lines = document.querySelectorAll('.hero-title .line');
  if (lines.length) {
    tl.from(lines, {
      yPercent: 110,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
    });
  }

  tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.5 }, '-=0.6');
  tl.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6 }, '-=0.5');
  tl.from('.hero-ctas .btn', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, '-=0.4');
  tl.from('.hero-scroll', { opacity: 0, duration: 0.4 }, '-=0.2');

  // ── PARALLAX HERO ──
  gsap.to('.hero-video', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // ── DISCIPLINES CARDS PARALLAX ──
  gsap.utils.toArray('.discipline-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: i * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── STATS ENTRANCE ──
  gsap.fromTo('.stat-item',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ── AWARD CARDS STAGGER ──
  gsap.fromTo('.award-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.award-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // ── PRICING CARDS ──
  gsap.fromTo('.pricing-card',
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.pricing-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // Refresh ScrollTrigger after assets and header/footer load
  window.addEventListener('load', () => ScrollTrigger.refresh());
  setTimeout(() => ScrollTrigger.refresh(), 500);

  // ── MARQUEE PAUSE ON HOVER ──
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

  // ── CTA BANNER PARALLAX ──
  gsap.to('.cta-banner img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-banner',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
});
