function toggleZoom(element) {
  element.classList.toggle('zoomed');

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
    div.addEventListener('click', function() {
      toggleZoom(this);
    });
  });

  const gridImages = document.querySelectorAll('.grid img');
  gridImages.forEach(img => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleZoom(this.parentElement); // Toggle the parent .grid div
    });
  });
});


  

/*


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
});  */
