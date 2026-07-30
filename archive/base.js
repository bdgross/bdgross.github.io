
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


// Lightweight lazy-loading for Instagram embeds.
// Usage: replace <blockquote class="instagram-media" data-instgrm-permalink="..."> with
// <div class="instagram-placeholder" data-permalink="https://www.instagram.com/p/POSTID/"></div>

(function () {
  const placeholders = () => Array.from(document.querySelectorAll('.instagram-placeholder'));

  let instagramScriptLoaded = false;
  function loadInstagramScript() {
    if (instagramScriptLoaded || window.instgrm) { instagramScriptLoaded = true; return Promise.resolve(); }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.async = true;
      s.defer = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.onload = () => {
        instagramScriptLoaded = true;
        resolve();
      };
      s.onerror = () => reject(new Error('Failed to load Instagram embed.js'));
      document.body.appendChild(s);
    });
  }

  function createBlockquote(permalink) {
    const block = document.createElement('blockquote');
    block.className = 'instagram-media';
    block.setAttribute('data-instgrm-permalink', permalink);
    block.setAttribute('data-instgrm-version', '14');
    const a = document.createElement('a');
    a.href = permalink;
    a.textContent = 'View on Instagram';
    a.target = '_blank';
    a.rel = 'noopener';
    block.appendChild(a);
    return block;
  }

  function upgradePlaceholder(el) {
    const permalink = el.dataset.permalink;
    if (!permalink) return;
    if (el.dataset.loaded) return; // already done
    el.dataset.loaded = '1';

    const block = createBlockquote(permalink);
    el.innerHTML = '';
    el.appendChild(block);

    loadInstagramScript().then(() => {
      if (window.instgrm && window.instgrm.Embeds && typeof window.instgrm.Embeds.process === 'function') {
        try { window.instgrm.Embeds.process(); } catch (e) { console.warn('instgrm.Embeds.process failed', e); }
      }
    }).catch((err) => {
      // If script fails, leave link fallback in place
      console.warn('Could not load Instagram embed script:', err);
    });
  }

  function initObserver() {
    const obsOptions = { root: null, rootMargin: '300px', threshold: 0.01 };
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          upgradePlaceholder(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, obsOptions);

    placeholders().forEach(p => {
      // If already near viewport, upgrade immediately
      const rect = p.getBoundingClientRect();
      if (rect.top < window.innerHeight + 300) {
        upgradePlaceholder(p);
      } else {
        io.observe(p);
      }
    });
  }

  if ('IntersectionObserver' in window) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initObserver);
    } else {
      initObserver();
    }
  } else {
    // Fallback: load all embeds after load
    window.addEventListener('load', () => {
      placeholders().forEach(upgradePlaceholder);
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector('.nav-toggle');
  if (!btn) return;
  const menu = document.getElementById(btn.getAttribute('aria-controls'));
  if (!menu) return;

  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
    btn.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
  });

  // close on Escape for accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      btn.focus();
    }
  });

  // Optional: close menu when a link is clicked (useful on mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
    }
  });
});
