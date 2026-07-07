/* ============================================================
   TUNDA ANGOLA — 404.js
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";
    // Bússola a rodar lentamente
    var compass = document.getElementById("compass");
    if (!compass) return;
    var angle = 0;
    setInterval(function () {
        angle += 0.4;
        compass.style.transform = "rotate(" + angle + "deg)";
    }, 16);
})();
