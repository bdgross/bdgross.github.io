function toggleZoom(div) {
    div.classList.toggle('zoomed');
  }

function toggleZoom(img) {
    img.classList.toggle('zoomed');
  }

document.addEventListener('DOMContentLoaded', function() {
  const gridDiv = document.querySelectorAll('.grid');
  gridDiv.forEach(div => {
    div.addEventListener('click', function() {
      toggleZoom(this);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const gridImages = document.querySelectorAll('.grid img');
  gridImages.forEach(img => {
    img.addEventListener('click', function() {
      toggleZoom(this);
    });
  });
});
