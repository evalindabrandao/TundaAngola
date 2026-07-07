/* ============================================================
   TUNDA ANGOLA — global.js
   Funcionalidades partilhadas por TODAS as páginas:
   · Navbar que ganha fundo ao rolar (sticky visível)
   · Menu sanduíche (mobile) — abrir/fechar
   · Botão "Voltar ao topo"
   · Interruptor de Modo Escuro (com memória via localStorage)
   Envolvido numa IIFE para não poluir o escopo global.
   ============================================================ */
(function () {
    "use strict";

    /* ── 1. NAVBAR AO ROLAR ─────────────────────────────── */
    var nav = document.getElementById("nav");
    if (nav) {
        var onScrollNav = function () {
            nav.classList.toggle("nav--scrolled", window.scrollY > 60);
        };
        window.addEventListener("scroll", onScrollNav, { passive: true });
        onScrollNav();
    }

    /* ── 2. MENU SANDUÍCHE (MOBILE) ─────────────────────── */
    var burger = document.getElementById("burger");
    var mobileMenu = document.getElementById("mobileMenu");
    var overlay = document.getElementById("mobileOverlay"); // pode não existir

    function fecharMenu() {
        if (burger) burger.classList.remove("open");
        if (mobileMenu) mobileMenu.classList.remove("open");
        if (overlay) overlay.classList.remove("open");
        document.body.style.overflow = "";
    }
    function abrirMenu() {
        if (burger) burger.classList.add("open");
        if (mobileMenu) mobileMenu.classList.add("open");
        if (overlay) overlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }
    if (burger && mobileMenu) {
        burger.addEventListener("click", function () {
            if (mobileMenu.classList.contains("open")) { fecharMenu(); }
            else { abrirMenu(); }
        });
        // Fechar ao clicar num link ou no overlay, ou com Escape
        mobileMenu.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", fecharMenu);
        });
        if (overlay) overlay.addEventListener("click", fecharMenu);
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") fecharMenu();
        });
    }

    /* ── 3. BOTÃO "VOLTAR AO TOPO" ──────────────────────── */
    var topBtn = document.createElement("button");
    topBtn.className = "back-to-top";
    topBtn.setAttribute("aria-label", "Voltar ao topo");
    topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", function () {
        topBtn.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });

    topBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ── 4. MODO ESCURO (DARK MODE) ─────────────────────── */
    var root = document.documentElement;
    var STORAGE_KEY = "tunda-theme";

    var themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle";
    themeBtn.setAttribute("aria-label", "Alternar modo claro/escuro");
    document.body.appendChild(themeBtn);

    function aplicarTema(tema) {
        if (tema === "dark") {
            root.setAttribute("data-theme", "dark");
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            root.removeAttribute("data-theme");
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    // Por defeito o site é claro; o modo escuro só é aplicado se o
    // utilizador o tiver escolhido (guardado no localStorage).
    var guardado;
    try { guardado = localStorage.getItem(STORAGE_KEY); } catch (e) { guardado = null; }
    aplicarTema(guardado === "dark" ? "dark" : "light");

    themeBtn.addEventListener("click", function () {
        var novo = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        aplicarTema(novo);
        try { localStorage.setItem(STORAGE_KEY, novo); } catch (e) {}
    });

    /* ── 5. ANO ATUAL NO RODAPÉ (se existir #ano) ───────── */
    var anoEl = document.getElementById("ano");
    if (anoEl) anoEl.textContent = new Date().getFullYear();
})();
