(function () {
    var timeEl = document.getElementById("localTime");
    if (!timeEl) return;

    var formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric",
        minute: "2-digit"
    });

    function update() {
        timeEl.textContent = formatter.format(new Date());
    }

    update();
    setInterval(update, 30000);
})();