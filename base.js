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

  // Wrapped in a DOMContentLoaded function to guarantee the elements exist before running
    document.addEventListener("DOMContentLoaded", () => {
      const track = document.querySelector('.carousel-track');
      const slides = document.querySelectorAll('.carousel-slide');
      const dots = document.querySelectorAll('.nav-dot');

      // 1. CLICK TO SCROLL FUNCTION
      dots.forEach(button => {
        button.addEventListener('click', () => {
          const targetId = button.getAttribute('data-target');
          const targetSlide = document.getElementById(targetId);
          
          if (targetSlide) {
            targetSlide.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'start'
            });
          }
        });
      });

      // 2. AUTOMATIC DOT HIGHLIGHT OBSERVER
      const observerOptions = {
        root: track,
        threshold: 0.6 
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            
            dots.forEach(dot => {
              if (dot.getAttribute('data-target') === activeId) {
                dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
            });
          }
        });
      }, observerOptions);

      slides.forEach(slide => observer.observe(slide));
    });
