function toggleZoom(element) {
  element.classList.toggle('zoomed');

  const img = element.querySelector('img');
  if (img) {
    img.classList.toggle('zoomed');
  }

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

document.addEventListener('DOMContentLoaded', function() {
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
});  

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.slide'));
  if (!slides.length) return;

  // Prefer the explicit wrapper but fall back to the carousel element itself
  const wrapper = carousel.closest('.carousel-wrapper') || carousel;

  // Create nav if missing
  let nav = wrapper.querySelector('.carousel-nav');
  if (!nav) {
    nav = document.createElement('div');
    nav.className = 'carousel-nav';
    wrapper.appendChild(nav);
  }

  // Build dot buttons
  slides.forEach((slide, i) => {
    const btn = document.createElement('button');
    btn.className = 'nav-dot';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      const preferReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      slide.scrollIntoView({ behavior: preferReduced ? 'auto' : 'smooth', inline: 'start' });
    });
    nav.appendChild(btn);
  });

  const dots = Array.from(nav.querySelectorAll('.nav-dot'));

  // Use IntersectionObserver to keep track of which slide is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = slides.indexOf(entry.target);
        dots.forEach((d, i) => d.setAttribute('aria-pressed', i === idx ? 'true' : 'false'));
        slides.forEach((s, i) => s.setAttribute('aria-hidden', i === idx ? 'false' : 'true'));
      }
    });
  }, { root: carousel, threshold: 0.6 });

  slides.forEach(s => observer.observe(s));

  // Keyboard navigation on carousel container
  carousel.addEventListener('keydown', (e) => {
    if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) e.preventDefault();
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
  });

  // Make carousel focusable for keyboard events
  carousel.tabIndex = 0;
});
