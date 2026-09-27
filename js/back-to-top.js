(function () {
  var button = document.getElementById("backToTop");
  if (!button) return;

  var SHOW_AFTER = 400;

  function updateVisibility() {
    button.classList.toggle("is-visible", window.scrollY > SHOW_AFTER);
  }

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", updateVisibility);
  updateVisibility();
})();