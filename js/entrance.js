(function () {
    var gate = document.getElementById("gate");
    var enterBtn = document.getElementById("gateEnter");
    
    if (!gate || !enterBtn) return;

    document.body.classList.add("gate-locked");

    function openSite() {
        gate.classList.add("is-hidden");
        document.body.classList.remove("gate-locked");
    }

    enterBtn.addEventListener("click", openSite);

    enterBtn.addEventListener("keyup", function (e) {
        if (e.key === "Enter" || e.key === " ") openSite();
    });
})();