// Simple accessible mobile overlay menu with close button, ESC close, and scroll lock.

(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('topnav-menu');

  if (!toggle || !menu) return;

  // Create close button (only if not already present)
  let closeBtn = menu.querySelector('.nav-close');
  if (!closeBtn) {
    closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '✕';
    menu.prepend(closeBtn);
  }

  // Focusable selector helper
  const FOCUSABLE = 'a, button, input, textarea, [tabindex]:not([tabindex="-1"])';

  let lastFocusedBeforeOpen = null;

  function openMenu() {
    lastFocusedBeforeOpen = document.activeElement;
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock scroll
    // move focus into menu
    const firstFocusable = menu.querySelector(FOCUSABLE);
    if (firstFocusable) firstFocusable.focus();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // restore scroll
    if (lastFocusedBeforeOpen && lastFocusedBeforeOpen.focus) lastFocusedBeforeOpen.focus();
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }
    if (e.key === 'Tab') {
      // Basic focus trap: keep focus inside the menu while open
      const focusables = Array.from(menu.querySelectorAll(FOCUSABLE)).filter(el => !el.hasAttribute('disabled'));
      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  // Toggle button click
  toggle.addEventListener('click', (e) => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Close button click
  closeBtn.addEventListener('click', closeMenu);

  // Clicking an internal link should close the menu (mobile)
  menu.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      closeMenu();
    }
  });

  // Initialize ARIA state
  menu.setAttribute('aria-hidden', 'true');
  toggle.setAttribute('aria-expanded', 'false');
})();
