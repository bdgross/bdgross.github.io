function toggleZoom(element) {
  element.classList.toggle('zoomed');
}

document.addEventListener('DOMContentLoaded', function() {
  const gridDivs = document.querySelectorAll('.grid');
  gridDivs.forEach(div => {
    div.addEventListener('click', function(e) {
      // Stop propagation if you don't want clicks on images to also trigger the div listener
      e.stopPropagation();
      toggleZoom(this);
    });
  });

  const gridImages = document.querySelectorAll('.grid img');
  gridImages.forEach(img => {
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleZoom(this);
    });
  });
});
