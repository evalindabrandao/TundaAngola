/* ============================================================
   TUNDA ANGOLA — index.js
   Lógica específica da página inicial.
   (Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js)
   ============================================================ */
(function () {
    "use strict";

    // FAQ acordeão — abre um item de cada vez
    document.querySelectorAll(".faq__item").forEach(function (item) {
        item.addEventListener("toggle", function () {
            if (!item.open) return;
            document.querySelectorAll(".faq__item[open]").forEach(function (aberto) {
                if (aberto !== item) aberto.removeAttribute("open");
            });
        });
    });

    // Newsletter — confirma a subscrição com uma mensagem
    var newsBtn = document.getElementById("newsBtn");
    var newsEmail = document.getElementById("newsEmail");
    var newsMsg = document.getElementById("newsMsg");
    if (newsBtn && newsEmail && newsMsg) {
        var subscrever = function () {
            var val = newsEmail.value.trim();
            var valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
            if (!valido) {
                newsMsg.textContent = "Introduza um e-mail válido.";
                newsMsg.className = "newsletter__msg newsletter__msg--erro";
                newsMsg.hidden = false;
                newsEmail.focus();
                return;
            }
            newsMsg.textContent = "✓ Subscrição confirmada! Obrigado — em breve terá novidades de Angola.";
            newsMsg.className = "newsletter__msg newsletter__msg--ok";
            newsMsg.hidden = false;
            newsEmail.value = "";
            newsEmail.disabled = true;
            newsBtn.disabled = true;
            newsBtn.textContent = "Subscrito ✓";
        };
        newsBtn.addEventListener("click", subscrever);
        newsEmail.addEventListener("keydown", function (e) {
            if (e.key === "Enter") { e.preventDefault(); subscrever(); }
        });
    }
})();
