/* ============================================================
   TUNDA ANGOLA — planeiaViagem.js  (formulário multi-passo)
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    var currentStep = 1;
    var totalSteps = 6;
    var steps = document.querySelectorAll(".form-step");
    var pSteps = document.querySelectorAll(".p-step");
    var btnPrev = document.getElementById("btnPrev");
    var btnNext = document.getElementById("btnNext");
    var btnSubmit = document.getElementById("btnSubmit");
    var progressFill = document.getElementById("progressFill");
    if (!btnNext) return;

    function updateUI() {
        steps.forEach(function (s) { s.classList.remove("active"); });
        document.querySelector('.form-step[data-step="' + currentStep + '"]').classList.add("active");
        pSteps.forEach(function (s) {
            s.classList.remove("p-step--active", "p-step--done");
            var n = parseInt(s.dataset.step, 10);
            if (n === currentStep) s.classList.add("p-step--active");
            if (n < currentStep) s.classList.add("p-step--done");
        });
        progressFill.style.width = (((currentStep - 1) / (totalSteps - 1)) * 100) + "%";
        btnPrev.style.display = currentStep === 1 ? "none" : "";
        btnNext.style.display = currentStep === totalSteps ? "none" : "";
        btnSubmit.style.display = currentStep === totalSteps ? "" : "none";
    }

    // Passos que exigem obrigatoriamente uma seleção antes de avançar.
    // (Extras — passo 5 — é opcional; o passo 6 valida nome/email/consentimento no envio.)
    var required = { 1: "estilo", 2: "destino", 3: "periodo", 4: "grupo" };

    function validateStep(step) {
        var name = required[step];
        if (!name) return true;
        var el = document.querySelector('.form-step[data-step="' + step + '"]');
        var ok = !!el.querySelector('input[name="' + name + '"]:checked');
        if (!ok) showStepError(el); else clearStepError(el);
        return ok;
    }

    function showStepError(el) {
        var msg = el.querySelector(".step-error");
        if (!msg) {
            msg = document.createElement("p");
            msg.className = "step-error";
            msg.setAttribute("role", "alert");
            msg.textContent = "Selecione uma opção para continuar.";
            el.appendChild(msg);
        }
        msg.classList.remove("step-error--shake");
        // reinicia a animação de shake
        void msg.offsetWidth;
        msg.classList.add("step-error--shake");
    }

    function clearStepError(el) {
        var msg = el.querySelector(".step-error");
        if (msg) msg.remove();
    }

    // Ao selecionar algo, limpa o erro do passo atual
    document.getElementById("planForm").addEventListener("change", function () {
        var el = document.querySelector('.form-step[data-step="' + currentStep + '"]');
        if (el && validateStepSilent(currentStep)) clearStepError(el);
    });
    function validateStepSilent(step) {
        var name = required[step];
        if (!name) return true;
        var el = document.querySelector('.form-step[data-step="' + step + '"]');
        return !!el.querySelector('input[name="' + name + '"]:checked');
    }

    btnNext.addEventListener("click", function () {
        if (!validateStep(currentStep)) return;
        if (currentStep < totalSteps) { currentStep++; updateUI(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    });
    btnPrev.addEventListener("click", function () {
        if (currentStep > 1) { currentStep--; updateUI(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    });

    document.getElementById("planForm").addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("planForm").style.display = "none";
        var pb = document.querySelector(".progress-bar"); if (pb) pb.style.display = "none";
        var ps = document.querySelector(".progress-steps"); if (ps) ps.style.display = "none";
        document.getElementById("formSuccess").style.display = "flex";
    });

    // Contador de pessoas
    var contadorVal = document.getElementById("contadorVal");
    var numPessoas = document.getElementById("numPessoas");
    var btnMais = document.getElementById("btnMais");
    var btnMenos = document.getElementById("btnMenos");
    if (btnMais) btnMais.addEventListener("click", function () {
        var v = parseInt(contadorVal.textContent, 10);
        if (v < 30) { v++; contadorVal.textContent = v; numPessoas.value = v; }
    });
    if (btnMenos) btnMenos.addEventListener("click", function () {
        var v = parseInt(contadorVal.textContent, 10);
        if (v > 1) { v--; contadorVal.textContent = v; numPessoas.value = v; }
    });

    updateUI();
})();
