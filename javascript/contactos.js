/* ============================================================
   TUNDA ANGOLA — contactos.js
   Validação do formulário de contacto em JavaScript nativo
   (sem bibliotecas externas).
   Navbar, menu mobile, voltar-ao-topo e modo escuro vivem em global.js
   ============================================================ */
(function () {
    "use strict";

    var form = document.getElementById("contactForm");
    if (!form) return;

    var sucesso = document.getElementById("formSuccess");

    // Mostra/limpa a mensagem de erro de um campo
    function mostrarErro(campo, mensagem) {
        var grupo = campo.closest(".field-group") || campo.parentElement;
        campo.classList.add("field-input--error");
        var erro = grupo.querySelector(".field-error");
        if (!erro) {
            erro = document.createElement("span");
            erro.className = "field-error";
            grupo.appendChild(erro);
        }
        erro.textContent = mensagem;
    }

    function limparErro(campo) {
        var grupo = campo.closest(".field-group") || campo.parentElement;
        campo.classList.remove("field-input--error");
        var erro = grupo.querySelector(".field-error");
        if (erro) erro.remove();
    }

    // Validação de email por expressão regular (sem bibliotecas)
    function emailValido(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor);
    }

    function validarCampo(campo) {
        var valor = (campo.value || "").trim();

        if (campo.name === "nome") {
            if (valor === "") { mostrarErro(campo, "Por favor, indique o seu nome."); return false; }
            if (valor.length < 2) { mostrarErro(campo, "O nome parece demasiado curto."); return false; }
        }
        if (campo.name === "email") {
            if (valor === "") { mostrarErro(campo, "Por favor, indique o seu e-mail."); return false; }
            if (!emailValido(valor)) { mostrarErro(campo, "Introduza um e-mail válido (ex.: nome@exemplo.com)."); return false; }
        }
        if (campo.name === "mensagem") {
            if (valor === "") { mostrarErro(campo, "Escreva a sua mensagem."); return false; }
            if (valor.length < 10) { mostrarErro(campo, "A mensagem deve ter pelo menos 10 caracteres."); return false; }
        }
        limparErro(campo);
        return true;
    }

    var nome = form.querySelector('[name="nome"]');
    var email = form.querySelector('[name="email"]');
    var mensagem = form.querySelector('[name="mensagem"]');
    var consent = form.querySelector('[name="consentimento"]');

    // Validação em tempo real (ao sair do campo)
    [nome, email, mensagem].forEach(function (campo) {
        if (!campo) return;
        campo.addEventListener("blur", function () { validarCampo(campo); });
        campo.addEventListener("input", function () {
            if (campo.classList.contains("field-input--error")) validarCampo(campo);
        });
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var okNome = nome ? validarCampo(nome) : true;
        var okEmail = email ? validarCampo(email) : true;
        var okMsg = mensagem ? validarCampo(mensagem) : true;

        // Consentimento (checkbox)
        var okConsent = true;
        if (consent) {
            var label = consent.closest(".check-label");
            if (!consent.checked) {
                okConsent = false;
                if (label) label.classList.add("check-label--error");
            } else if (label) {
                label.classList.remove("check-label--error");
            }
        }

        if (okNome && okEmail && okMsg && okConsent) {
            form.style.display = "none";
            if (sucesso) sucesso.style.display = "flex";
        } else {
            // Foca o primeiro campo inválido
            var primeiro = form.querySelector(".field-input--error");
            if (primeiro) primeiro.focus();
        }
    });

    // Limpar erro do consentimento ao marcar
    if (consent) {
        consent.addEventListener("change", function () {
            var label = consent.closest(".check-label");
            if (consent.checked && label) label.classList.remove("check-label--error");
        });
    }
})();
