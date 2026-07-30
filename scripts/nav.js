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
