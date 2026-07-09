function toggleZoom(img) {
    img.classList.toggle('zoomed');
    grid.classList.toggle('zoomed');
  }

document.addEventListener('DOMContentLoaded', function() {
  const gridImages = document.querySelectorAll('.grid img');
  gridImages.forEach(img => {
    img.addEventListener('click', function() {
      toggleZoom(this);
    });
  });
});
