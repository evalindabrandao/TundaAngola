/* ============================================================
   TUNDA ANGOLA — servicos.js
   Carrossel de testemunhos (slider) — nativo, sem bibliotecas.
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    var track = document.getElementById("testemunhosTrack");
    var dotsWrap = document.getElementById("testemunhosDots");
    var prev = document.getElementById("testemunhoPrev");
    var next = document.getElementById("testemunhoNext");
    if (!track) return;

    var slides = track.querySelectorAll(".testemunho");
    var total = slides.length;
    var atual = 0;
    var timer = null;

    // Criar "dots" de navegação
    for (var i = 0; i < total; i++) {
        var dot = document.createElement("button");
        dot.className = "testemunhos__dot";
        dot.setAttribute("aria-label", "Ir para o testemunho " + (i + 1));
        dot.dataset.index = i;
        dotsWrap.appendChild(dot);
    }
    var dots = dotsWrap.querySelectorAll(".testemunhos__dot");

    function mostrar(n) {
        atual = (n + total) % total;
        track.style.transform = "translateX(" + (-atual * 100) + "%)";
        dots.forEach(function (d, idx) {
            d.classList.toggle("testemunhos__dot--active", idx === atual);
        });
    }

    function seguinte() { mostrar(atual + 1); }
    function anterior() { mostrar(atual - 1); }

    function iniciarAuto() {
        pararAuto();
        timer = setInterval(seguinte, 6000);
    }
    function pararAuto() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    if (next) next.addEventListener("click", function () { seguinte(); iniciarAuto(); });
    if (prev) prev.addEventListener("click", function () { anterior(); iniciarAuto(); });
    dots.forEach(function (d) {
        d.addEventListener("click", function () {
            mostrar(parseInt(d.dataset.index, 10));
            iniciarAuto();
        });
    });

    // Pausar ao passar o rato
    var carrossel = document.getElementById("testemunhosCarrossel");
    if (carrossel) {
        carrossel.addEventListener("mouseenter", pararAuto);
        carrossel.addEventListener("mouseleave", iniciarAuto);
    }

    mostrar(0);
    iniciarAuto();
})();
