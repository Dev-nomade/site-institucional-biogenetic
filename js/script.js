/* ============================================================
   UC15 — Bio Genétic — Interações
   1. Vídeo de fundo — respeita prefers-reduced-motion
   2. Menu hambúrguer (ativo em mobile + tablet, <1024px)
   3. Formulário de contato — validação decorativa, SEM envio real
   4. Carrossel — Estrutura (Home)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* --------------------------------------------------------
     1. VÍDEO DE FUNDO — respeita prefers-reduced-motion
     -------------------------------------------------------- */
  var videoFundo = document.querySelector(".home-hero__bg");
  if (videoFundo) {
    var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    var ajustarVideo = function () {
      if (reduzMovimento.matches) videoFundo.pause();
      else videoFundo.play();
    };
    ajustarVideo();
    reduzMovimento.addEventListener("change", ajustarVideo);
  }

  /* --------------------------------------------------------
     2. MENU HAMBÚRGUER
     -------------------------------------------------------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    var atualizarToggle = function (isOpen) {
      links.classList.toggle("is-open", isOpen);
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    };

    toggle.addEventListener("click", function () {
      atualizarToggle(!links.classList.contains("is-open"));
    });

    // Fecha ao clicar em um link
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        atualizarToggle(false);
      });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener("click", function (event) {
      var clickedInsideNav = toggle.contains(event.target) || links.contains(event.target);
      if (!clickedInsideNav) {
        atualizarToggle(false);
      }
    });
  }

  /* --------------------------------------------------------
     3. FORMULÁRIO DE CONTATO
     Este formulário é DECORATIVO: não há back-end, não há envio
     real de e-mail. A validação é só front-end (JS), e o
     "sucesso" é uma mensagem local que limpa o formulário.
     -------------------------------------------------------- */
  var form = document.getElementById("form-contato");
  if (form) {
    var campos = {
      nome: { min: 2, mensagem: "Informe seu nome (mínimo 2 caracteres)." },
      email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensagem: "Informe um e-mail válido." },
      telefone: { regex: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/, mensagem: "Use o formato (11) 98300-1111." },
      assunto: { min: 3, mensagem: "Informe o assunto (mínimo 3 caracteres)." },
      mensagem: { min: 10, mensagem: "Escreva uma mensagem com pelo menos 10 caracteres." }
    };

    var marcarErro = function (nomeCampo, comErro, mensagemErro) {
      var grupo = form.querySelector('[data-campo="' + nomeCampo + '"]');
      if (!grupo) return;
      grupo.classList.toggle("is-invalid", comErro);
      var erroEl = grupo.querySelector(".form-error");
      if (erroEl && mensagemErro) erroEl.textContent = mensagemErro;
      grupo.querySelectorAll("input, textarea").forEach(function (campo) {
        campo.setAttribute("aria-invalid", comErro ? "true" : "false");
      });
    };

    var validar = function () {
      var valido = true;

      ["nome", "assunto", "mensagem"].forEach(function (nomeCampo) {
        var input = form.querySelector('[name="' + nomeCampo + '"]');
        var regra = campos[nomeCampo];
        var comErro = !input || input.value.trim().length < regra.min;
        marcarErro(nomeCampo, comErro, regra.mensagem);
        if (comErro) valido = false;
      });

      var email = form.querySelector('[name="email"]');
      var emailComErro = !email || !campos.email.regex.test(email.value.trim());
      marcarErro("email", emailComErro, campos.email.mensagem);
      if (emailComErro) valido = false;

      var telefone = form.querySelector('[name="telefone"]');
      var telefoneComErro = !telefone || !campos.telefone.regex.test(telefone.value.trim());
      marcarErro("telefone", telefoneComErro, campos.telefone.mensagem);
      if (telefoneComErro) valido = false;

      var jaEAluno = form.querySelector('input[name="ja-e-aluno"]:checked');
      marcarErro("ja-e-aluno", !jaEAluno, "Selecione Sim ou Não.");
      if (!jaEAluno) valido = false;

      return valido;
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // nunca envia de verdade — formulário decorativo

      var sucesso = form.querySelector(".form-success");

      if (validar()) {
        form.reset();
        if (sucesso) sucesso.classList.add("is-visible");
      } else if (sucesso) {
        sucesso.classList.remove("is-visible");
      }
    });
  }

  /* --------------------------------------------------------
     4. CARROSSEL — Estrutura (Home)
     -------------------------------------------------------- */
  var carrossel = document.getElementById("estrutura-carrossel");
  if (carrossel) {
    var slides = carrossel.querySelectorAll(".estrutura__slide");
    var slideAtual = 0;
    var legenda = document.getElementById("estrutura-legenda");

    function atualizarLegenda() {
      if (!legenda) return;
      var atual = slides[slideAtual];
      legenda.textContent = atual.dataset.legenda + " · " + (slideAtual + 1) + "/" + slides.length;
    }

    function irParaSlide(indice) {
      slides[slideAtual].classList.remove("is-active");
      slideAtual = (indice + slides.length) % slides.length;
      slides[slideAtual].classList.add("is-active");
      atualizarLegenda();
    }

    atualizarLegenda();

    var setaProxima = document.getElementById("estrutura-next");
    var setaAnterior = document.getElementById("estrutura-prev");
    if (setaProxima) setaProxima.addEventListener("click", function () { irParaSlide(slideAtual + 1); });
    if (setaAnterior) setaAnterior.addEventListener("click", function () { irParaSlide(slideAtual - 1); });
  }
});
