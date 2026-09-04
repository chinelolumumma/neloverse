(function () {
    var TIMEZONE = "America/Chicago";
    var AWAKE_START_HOUR = 8;   // 8am
    var AWAKE_END_HOUR = 16;    // 4pm

    function updateStatusWidget() {
        var icon = document.getElementById("statusIcon");
        var state = document.getElementById("statusState");
        var subtext = document.getElementById("statusSubtext");
        if (!icon || !state || !subtext) return;
        
        var now = new Date();
        var parts = new Intl.DateTimeFormat("en-US", {
            timeZone: TIMEZONE,
            weekday: "short",
            hour: "numeric",
            hour12: false
        }).formatToParts(now);
        
        var weekday = parts.find(function (p) { return p.type === "weekday"; }).value;
        var hour = parseInt(parts.find(function (p) { return p.type === "hour"; }).value, 10);

        var isWeekday = ["Sat", "Sun"].indexOf(weekday) === -1;
        var isAwake = isWeekday && hour >= AWAKE_START_HOUR && hour < AWAKE_END_HOUR;

        if (isAwake) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-message", "is-awake");
            state.textContent = "Awake";
            subtext.textContent = "Send me a message";
        } else {
            icon.classList.remove("fa-message", "is-awake");
            icon.classList.add("fa-moon");
            state.textContent = "Asleep";
            subtext.textContent = "Back online at 8:00am CT";
        }
    }
    updateStatusWidget();
    setInterval(updateStatusWidget, 60000);
})();