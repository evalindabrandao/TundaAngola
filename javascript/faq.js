/* ============================================================
   TUNDA ANGOLA — faq.js  (lógica específica da página FAQ)
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    // Acordeão — fecha os outros ao abrir um; alterna ícone +/-
    document.querySelectorAll(".faq-item").forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (item.open) {
                document.querySelectorAll(".faq-item[open]").forEach(function (o) {
                    if (o !== item) o.removeAttribute("open");
                });
            }
            var icon = item.querySelector(".faq-icon i");
            if (icon) icon.className = item.open ? "fa-solid fa-minus" : "fa-solid fa-plus";
        });
    });

    // Filtro por categoria
    var catBtns = document.querySelectorAll(".cat-btn");
    var groups = document.querySelectorAll(".faq-group");
    catBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            catBtns.forEach(function (b) { b.classList.remove("cat-btn--active"); });
            btn.classList.add("cat-btn--active");
            var cat = btn.dataset.cat;
            groups.forEach(function (g) {
                g.style.display = (cat === "all" || g.dataset.cat === cat) ? "" : "none";
            });
        });
    });
})();
