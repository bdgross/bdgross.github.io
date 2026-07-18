// base.js - robust version with logging and fallbacks

function toggleZoom(element) {
  element.classList.toggle('zoomed');

  const img = element.querySelector('img');
  if (img) img.classList.toggle('zoomed');

  // Allow closing by pressing Escape
  if (element.classList.contains('zoomed')) {
    document.addEventListener('keydown', closeZoomOnEscape);
  } else {
    document.removeEventListener('keydown', closeZoomOnEscape);
  }
}

function closeZoomOnEscape(e) {
  if (e.key === 'Escape') {
    const zoomed = document.querySelector('.grid.zoomed');
    if (zoomed) {
      zoomed.classList.remove('zoomed');
      document.removeEventListener('keydown', closeZoomOnEscape);
    }
  }
}

// Zoom handlers (unchanged behavior)
document.addEventListener('DOMContentLoaded', function() {
  try {
    const gridDivs = document.querySelectorAll('.grid');
    gridDivs.forEach(div => {
      div.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleZoom(this);
      });
    });

    const gridImages = document.querySelectorAll('.grid img');
    gridImages.forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleZoom(this.closest('.grid'));
      });
    });
  } catch (err) {
    console.error('Zoom init error:', err);
  }
});

// Robust carousel hookup: logs progress, guards, observer fallback
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.debug('[carousel] init start');

    const carousel = document.querySelector('.carousel');
    if (!carousel) {
      console.debug('[carousel] no .carousel element found; skipping carousel init');
      return;
    }

    const slides = Array.from(carousel.querySelectorAll('.slide'));
    if (!slides.length) {
      console.debug('[carousel] no .slide elements found; skipping carousel init');
      return;
    }

    // Prefer wrapper but fall back
    const wrapper = carousel.closest('.carousel-wrapper') || carousel;

    // Create nav if missing
    let nav = wrapper.querySelector('.carousel-nav');
    if (!nav) {
      nav = document.createElement('div');
      nav.className = 'carousel-nav';
      wrapper.appendChild(nav);
      console.debug('[carousel] created .carousel-nav');
    }

    // Build dot buttons (only once)
    if (!nav.querySelector('.nav-dot')) {
      slides.forEach((slide, i) => {
        const btn = document.createElement('button');
        btn.className = 'nav-dot';
        btn.type = 'button';
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        btn.setAttribute('aria-pressed', 'false');
        btn.addEventListener('click', () => {
          const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          try {
            slide.scrollIntoView({ behavior: preferReduced ? 'auto' : 'smooth', inline: 'start' });
          } catch (err) {
            // fallback in case scrollIntoView options unsupported
            carousel.scrollLeft = slide.offsetLeft;
          }
        });
        nav.appendChild(btn);
      });
      console.debug('[carousel] built nav dots');
    }

    const dots = Array.from(nav.querySelectorAll('.nav-dot'));

    // IntersectionObserver setup with protective try/catch and fallback to scroll handler
    let observerSupported = 'IntersectionObserver' in window;
    if (observerSupported) {
      try {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = slides.indexOf(entry.target);
              dots.forEach((d, i) => d.setAttribute('aria-pressed', i === idx ? 'true' : 'false'));
              slides.forEach((s, i) => s.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
            }
          });
        }, { root: carousel, threshold: 0.5 });

        slides.forEach(s => {
          try {
            observer.observe(s);
          } catch (err) {
            console.warn('[carousel] observer.observe failed for a slide, falling back to scroll handler', err);
            throw err; // trigger fallback
          }
        });

        console.debug('[carousel] IntersectionObserver initialized');
      } catch (err) {
        observerSupported = false;
      }
    }

    // Fallback: update active dot via scroll event
    if (!observerSupported) {
      console.debug('[carousel] using scroll fallback');
      const updateActiveByScroll = () => {
        const scrollLeft = carousel.scrollLeft;
        const viewportWidth = carousel.clientWidth;
        // choose slide whose center is closest to viewport center
        let bestIdx = 0, bestDist = Infinity;
        slides.forEach((s, i) => {
          const slideCenter = s.offsetLeft + (s.offsetWidth / 2);
          const viewportCenter = scrollLeft + (viewportWidth / 2);
          const dist = Math.abs(slideCenter - viewportCenter);
          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        });
        dots.forEach((d, i) => d.setAttribute('aria-pressed', i === bestIdx ? 'true' : 'false'));
        slides.forEach((s, i) => s.setAttribute('aria-hidden', i === bestIdx ? 'false' : 'true'));
      };

      // throttle to avoid high frequency
      let rAF = null;
      carousel.addEventListener('scroll', () => {
        if (rAF) return;
        rAF = requestAnimationFrame(() => {
          updateActiveByScroll();
          rAF = null;
        });
      });

      // initial set
      updateActiveByScroll();
    }

    // Keyboard navigation (guarded)
    carousel.addEventListener('keydown', (e) => {
      try {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
        e.preventDefault();
        const activeIndex = dots.findIndex(d => d.getAttribute('aria-pressed') === 'true');
        if (e.key === 'ArrowLeft') {
          const prev = Math.max(0, activeIndex - 1);
          slides[prev].scrollIntoView({ behavior: 'smooth', inline: 'start' });
          dots[prev].focus();
        } else if (e.key === 'ArrowRight') {
          const next = Math.min(slides.length - 1, activeIndex + 1);
          slides[next].scrollIntoView({ behavior: 'smooth', inline: 'start' });
          dots[next].focus();
        } else if (e.key === 'Home') {
          slides[0].scrollIntoView({ behavior: 'smooth', inline: 'start' });
          dots[0].focus();
        } else if (e.key === 'End') {
          slides[slides.length-1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
          dots[slides.length-1].focus();
        }
      } catch (err) {
        console.error('[carousel] keyboard handler error', err);
      }
    });

    // Make carousel focusable for keyboard events
    if (!carousel.hasAttribute('tabindex')) carousel.tabIndex = 0;

    console.debug('[carousel] init complete');
  } catch (err) {
    console.error('[carousel] unexpected init error:', err);
  }
});
