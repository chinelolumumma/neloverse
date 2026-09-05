(function () {
    var toggles = document.querySelectorAll("[data-toggle-bullets]");

    toggles.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var item = btn.closest(".timeline__content");
            var bullets = item.querySelector(".timeline__bullets");
            var isHidden = bullets.classList.toggle("is-hidden");
            btn.textContent = isHidden ? "More" : "Less";
        });
    });
})();