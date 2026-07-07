/* ============================================================
   TUNDA ANGOLA — destinos.js
   Filtros por categoria + pesquisa de destinos.
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    var cards = document.querySelectorAll(".card[data-categoria]");
    var filtros = document.querySelectorAll(".filtro-btn[data-filter]");
    var buscaInput = document.getElementById("buscaInput");
    var countEl = document.getElementById("resultadosCount");
    var semRes = document.getElementById("semResultados");
    var linhas = document.querySelectorAll(".linha");
    var resetBtn = document.getElementById("resetBtn");
    if (!cards.length) return;

    var filtroAtivo = "all";
    var termoBusca = "";

    function aplicarFiltros() {
        var visiveis = 0;

        cards.forEach(function (card) {
            var cats = card.dataset.categoria || "";
            var nome = (card.dataset.nome || "").toLowerCase();
            var tituloEl = card.querySelector(".card__titulo");
            var titulo = tituloEl ? tituloEl.textContent.toLowerCase() : "";

            var passaCategoria = filtroAtivo === "all" || cats.indexOf(filtroAtivo) !== -1;
            var passaBusca = !termoBusca || nome.indexOf(termoBusca) !== -1 || titulo.indexOf(termoBusca) !== -1;

            if (passaCategoria && passaBusca) {
                card.classList.remove("card--oculto");
                visiveis++;
            } else {
                card.classList.add("card--oculto");
            }
        });

        // Ocultar linhas completamente vazias
        linhas.forEach(function (linha) {
            var temVisivel = Array.prototype.some.call(
                linha.querySelectorAll(".card"),
                function (c) { return !c.classList.contains("card--oculto"); }
            );
            linha.style.display = temVisivel ? "" : "none";
        });

        if (countEl) {
            countEl.textContent = visiveis === 1 ? "1 destino encontrado" : visiveis + " destinos encontrados";
        }
        if (semRes) semRes.style.display = visiveis === 0 ? "flex" : "none";
    }

    filtros.forEach(function (btn) {
        btn.addEventListener("click", function () {
            filtros.forEach(function (b) { b.classList.remove("filtro-btn--active"); });
            btn.classList.add("filtro-btn--active");
            filtroAtivo = btn.dataset.filter;
            aplicarFiltros();
        });
    });

    if (buscaInput) {
        buscaInput.addEventListener("input", function () {
            termoBusca = buscaInput.value.toLowerCase().trim();
            aplicarFiltros();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            filtroAtivo = "all";
            termoBusca = "";
            if (buscaInput) buscaInput.value = "";
            filtros.forEach(function (b) { b.classList.remove("filtro-btn--active"); });
            var allBtn = document.querySelector('[data-filter="all"]');
            if (allBtn) allBtn.classList.add("filtro-btn--active");
            aplicarFiltros();
        });
    }
})();
