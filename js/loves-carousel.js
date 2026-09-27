(function () {
  var carousel = document.getElementById("lovesCarousel");
  var track = document.getElementById("lovesTrack");
  var prevBtn = document.getElementById("lovesPrev");
  var nextBtn = document.getElementById("lovesNext");
  var dotsContainer = document.getElementById("lovesDots");

  if (!carousel || !track) return;

  var slides = Array.prototype.slice.call(track.querySelectorAll(".carousel__slide"));
  if (slides.length === 0) return;

  var activeIndex = 0;

  
  slides.forEach(function (slide, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel__dot";
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", function () {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  });
  var dots = Array.prototype.slice.call(dotsContainer.querySelectorAll(".carousel__dot"));

  function update() {
    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === activeIndex);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === activeIndex);
    });

    var activeSlide = slides[activeIndex];
    var carouselCenter = carousel.offsetWidth / 2;
    var slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;
    var offset = carouselCenter - slideCenter;
    track.style.transform = "translateX(" + offset + "px)";
  }

  function goToSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    update();
  }

  prevBtn.addEventListener("click", function () {
    goToSlide(activeIndex - 1);
  });

  nextBtn.addEventListener("click", function () {
    goToSlide(activeIndex + 1);
  });

  window.addEventListener("resize", update);

  update();
})();