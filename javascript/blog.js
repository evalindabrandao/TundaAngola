/* ============================================================
   TUNDA ANGOLA — blog.js
   Filtro por tema (sidebar) + subscrição da newsletter.
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    // ── Filtro por tema ──
    var filtros = document.querySelectorAll(".filtro-pill");
    var artigos = document.querySelectorAll(".artigo-linha");
    filtros.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filtros.forEach(function (b) { b.classList.remove("filtro-pill--active"); });
            btn.classList.add("filtro-pill--active");
            var cat = btn.dataset.cat;
            var count = 0;
            artigos.forEach(function (a) {
                var show = cat === "todos" || a.dataset.cat === cat;
                a.style.display = show ? "" : "none";
                if (show) {
                    count++;
                    var num = a.querySelector(".artigo-linha__num");
                    if (num) num.textContent = String(count).padStart(2, "0");
                }
            });
        });
    });

    // ── Newsletter ──
    var form = document.getElementById("newsletterForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            form.innerHTML = '<p style="color:var(--orange);font-size:0.88rem;font-weight:500;text-align:center;padding:8px 0">✓ Subscrito com sucesso!</p>';
        });
    }
})();
