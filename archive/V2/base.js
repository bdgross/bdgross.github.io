// Zoom behavior: toggle zoom on the <figure> and the <img> inside it.
function toggleZoomFigure(figure) {
  if (!figure) return;
  const img = figure.querySelector('img');
  if (!img) return;

  figure.classList.toggle('zoomed');
  img.classList.toggle('zoomed');

  if (figure.classList.contains('zoomed')) {
    document.addEventListener('keydown', closeZoomOnEscape);
    document.addEventListener('click', closeZoomOnOutsideClick);
    // optional: prevent page scroll while zoomed
    document.body.style.overflow = 'hidden';
  } else {
    document.removeEventListener('keydown', closeZoomOnEscape);
    document.removeEventListener('click', closeZoomOnOutsideClick);
    document.body.style.overflow = '';
  }
}

function closeZoomOnEscape(e) {
  if (e.key === 'Escape') {
    const fig = document.querySelector('figure.zoomed');
    if (fig) toggleZoomFigure(fig);
  }
}

function closeZoomOnOutsideClick(e) {
  const fig = document.querySelector('figure.zoomed');
  if (!fig) return;
  // if click is outside the zoomed figure, close it
  if (!fig.contains(e.target)) {
    toggleZoomFigure(fig);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    const figures = document.querySelectorAll('figure');
    figures.forEach(fig => {
      // clicking the figure toggles zoom
      fig.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleZoomFigure(this);
      });

      // clicking the image toggles zoom too (safeguard)
      const img = fig.querySelector('img');
      if (img) {
        img.addEventListener('click', function(e) {
          e.stopPropagation();
          toggleZoomFigure(this.closest('figure'));
        });
      }
    });
  } catch (err) {
    console.error('Zoom init error:', err);
  }
});
