(function () {
  var triggers = document.querySelectorAll(".js-lightbox");
  var lightbox = document.getElementById("lightbox");

  if (!triggers.length || !lightbox) return;

  var mediaEl = document.getElementById("lightboxMedia");
  var imageEl = document.getElementById("lightboxImage");
  var swatchEl = document.getElementById("lightboxSwatch");
  var titleEl = document.getElementById("lightboxTitle");
  var textEl = document.getElementById("lightboxText");
  var specsEl = document.getElementById("lightboxSpecs");
  var hexEl = document.getElementById("lightboxHex");
  var rgbEl = document.getElementById("lightboxRgb");
  var cmykEl = document.getElementById("lightboxCmyk");
  var closers = lightbox.querySelectorAll("[data-lightbox-close]");
  var lastTrigger = null;

  function setSpec(dd, value) {
    dd.textContent = value || "";
    var row = dd.closest(".lightbox__spec");
    if (row) row.style.display = value ? "" : "none";
  }

  function openLightbox(trigger) {
    lastTrigger = trigger;

    var img = trigger.querySelector("img");
    var hex = trigger.getAttribute("data-lightbox-hex");
    var title = trigger.getAttribute("data-lightbox-title") || "";
    var text = trigger.getAttribute("data-lightbox-text") || "";

    if (hex) {
      // color swatch — show the flat color block, hide the image
      imageEl.classList.add("is-hidden");
      swatchEl.classList.remove("is-hidden");
      swatchEl.style.background = hex;

      setSpec(hexEl, hex);
      setSpec(rgbEl, trigger.getAttribute("data-lightbox-rgb"));
      setSpec(cmykEl, trigger.getAttribute("data-lightbox-cmyk"));
      specsEl.classList.remove("is-hidden");
      mediaEl.classList.remove("is-hidden");
    } else if (img) {
      // image + description
      swatchEl.classList.add("is-hidden");
      imageEl.classList.remove("is-hidden");
      imageEl.src = img.currentSrc || img.src;
      imageEl.alt = img.alt || "";
      specsEl.classList.add("is-hidden");
      mediaEl.classList.remove("is-hidden");
    } else {
      // plain text, no image or color (font samples)
      mediaEl.classList.add("is-hidden");
      specsEl.classList.add("is-hidden");
    }

    titleEl.textContent = title;
    textEl.textContent = text;
    textEl.classList.toggle("is-hidden", !text);

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-locked");

    window.requestAnimationFrame(function () {
      var closeBtn = lightbox.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-locked");

    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  for (var i = 0; i < triggers.length; i++) {
    triggers[i].addEventListener("click", function (e) {
      e.preventDefault();
      openLightbox(this);
    });
  }

  for (var j = 0; j < closers.length; j++) {
    closers[j].addEventListener("click", closeLightbox);
  }

  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();