(function () {
  var scroller = document.getElementById("relatedScroll");
  var prevBtn = document.getElementById("relatedPrev");
  var nextBtn = document.getElementById("relatedNext");

  if (!scroller || !prevBtn || !nextBtn) return;

  var SCROLL_AMOUNT = 320;

  prevBtn.addEventListener("click", function () {
    scroller.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function () {
    scroller.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
  });
})();