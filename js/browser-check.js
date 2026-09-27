var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (!isSafari) {
    document.body.classList.add("supports-glass-distortion");
}