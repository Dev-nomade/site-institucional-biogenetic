/* ============================================================
   UC15 — Bio Genétic — Interações
   1. Vídeo de fundo — respeita prefers-reduced-motion
   2. Menu hambúrguer (ativo em mobile + tablet, <1024px)
   3. Formulário de contato — validação decorativa, SEM envio real
   4. Carrossel — Estrutura (Home)
   5. Formulário de cadastro — validação decorativa, SEM envio real
   6. Formulário de login — validação decorativa, SEM base de usuários real
   7. Botão de mostrar/ocultar senha (Cadastro e Login)
   8. Check-in — registro decorativo, com histórico ilustrativo
   9. Agendar aula/sala — Modalidades e Coworking (área do aluno)
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
    // Pré-preenche o Assunto quando vem de um link com ?assunto= (ex: botão Personal Training da Home)
    var assuntoParam = new URLSearchParams(window.location.search).get("assunto");
    if (assuntoParam) {
      var campoAssunto = form.querySelector('[name="assunto"]');
      if (campoAssunto) campoAssunto.value = assuntoParam;
    }

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

  /* --------------------------------------------------------
     5. FORMULÁRIO DE CADASTRO
     Decorativo, mesmo espírito do Contato: valida no JS, não
     persiste nada de verdade. O título muda conforme o plano
     escolhido (?plano= na URL, vindo de planos.html).
     -------------------------------------------------------- */
  var formCadastro = document.getElementById("form-cadastro");
  if (formCadastro) {
    var nomesPlanos = { diario: "Diário", mensal: "Mensal", trimestral: "Trimestral", anual: "Anual" };
    var planoParam = new URLSearchParams(window.location.search).get("plano");
    var tituloCadastro = document.getElementById("cadastro-titulo");
    if (tituloCadastro) {
      tituloCadastro.textContent = nomesPlanos[planoParam] ? "Adesão ao Plano " + nomesPlanos[planoParam] : "Cadastro";
    }

    var campoParcelas = document.getElementById("campo-parcelas");
    var atualizarParcelas = function () {
      var pagamento = formCadastro.querySelector('input[name="pagamento"]:checked');
      var precisaParcelas = pagamento && (pagamento.value === "credito" || pagamento.value === "boleto");
      campoParcelas.classList.toggle("is-hidden", !precisaParcelas);
    };
    formCadastro.querySelectorAll('input[name="pagamento"]').forEach(function (radio) {
      radio.addEventListener("change", atualizarParcelas);
    });
    atualizarParcelas();

    // Máscara de digitação — CPF (000.000.000-00) e Contato (telefone)
    var campoCpf = document.getElementById("cpf");
    if (campoCpf) {
      campoCpf.addEventListener("input", function () {
        var digitos = campoCpf.value.replace(/\D/g, "").slice(0, 11);
        digitos = digitos.replace(/(\d{3})(\d)/, "$1.$2");
        digitos = digitos.replace(/(\d{3})(\d)/, "$1.$2");
        digitos = digitos.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        campoCpf.value = digitos;
      });
    }
    var campoContato = document.getElementById("contato");
    if (campoContato) {
      campoContato.addEventListener("input", function () {
        var d = campoContato.value.replace(/\D/g, "").slice(0, 11);
        var formatado = d;
        if (d.length > 2 && d.length <= 6) formatado = "(" + d.slice(0, 2) + ") " + d.slice(2);
        else if (d.length > 6 && d.length <= 10) formatado = "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
        else if (d.length > 10) formatado = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
        else if (d.length > 0) formatado = "(" + d;
        campoContato.value = formatado;
      });
    }

    var marcarErroCadastro = function (nomeCampo, comErro, mensagemErro) {
      var grupo = formCadastro.querySelector('[data-campo="' + nomeCampo + '"]');
      if (!grupo) return;
      grupo.classList.toggle("is-invalid", comErro);
      var erroEl = grupo.querySelector(".form-error");
      if (erroEl && mensagemErro) erroEl.textContent = mensagemErro;
      grupo.querySelectorAll("input").forEach(function (campo) {
        campo.setAttribute("aria-invalid", comErro ? "true" : "false");
      });
    };

    var camposTextoCadastro = {
      nome: { min: 2, mensagem: "Informe seu nome completo (mínimo 2 caracteres)." },
      cpf: { regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, mensagem: "Use o formato 000.000.000-00." },
      contato: { regex: /^\(\d{2}\)\s?\d{4,5}-\d{4}$/, mensagem: "Use o formato (11) 98300-1111." },
      email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, mensagem: "Informe um e-mail válido." },
      senha: { regex: /^.{7,16}$/, mensagem: "A senha deve ter entre 7 e 16 caracteres." }
    };

    var validarCadastro = function () {
      var valido = true;

      ["nome", "cpf", "contato", "email", "senha"].forEach(function (nomeCampo) {
        var input = formCadastro.querySelector('[name="' + nomeCampo + '"]');
        var regra = camposTextoCadastro[nomeCampo];
        var valor = input ? input.value.trim() : "";
        var comErro = regra.min ? valor.length < regra.min : !regra.regex.test(valor);
        marcarErroCadastro(nomeCampo, comErro, regra.mensagem);
        if (comErro) valido = false;
      });

      var nascimento = formCadastro.querySelector('[name="nascimento"]');
      var nascimentoComErro = !nascimento || !nascimento.value;
      marcarErroCadastro("nascimento", nascimentoComErro, "Informe sua data de nascimento.");
      if (nascimentoComErro) valido = false;

      var senha = formCadastro.querySelector('[name="senha"]');
      var confirmarSenha = formCadastro.querySelector('[name="confirmar-senha"]');
      var confirmarValor = confirmarSenha ? confirmarSenha.value : "";
      var confirmarComErro = !confirmarSenha || !/^.{7,16}$/.test(confirmarValor) || confirmarValor !== (senha ? senha.value : "");
      marcarErroCadastro("confirmar-senha", confirmarComErro, "A confirmação precisa ser igual à senha.");
      if (confirmarComErro) valido = false;

      var pagamento = formCadastro.querySelector('input[name="pagamento"]:checked');
      marcarErroCadastro("pagamento", !pagamento, "Selecione uma forma de pagamento.");
      if (!pagamento) valido = false;

      var precisaParcelas = pagamento && (pagamento.value === "credito" || pagamento.value === "boleto");
      if (precisaParcelas) {
        var parcelas = formCadastro.querySelector('input[name="parcelas"]:checked');
        marcarErroCadastro("parcelas", !parcelas, "Selecione o número de parcelas.");
        if (!parcelas) valido = false;
      } else {
        marcarErroCadastro("parcelas", false, "");
      }

      var termos = formCadastro.querySelector('[name="termos"]');
      var termosComErro = !termos || !termos.checked;
      marcarErroCadastro("termos", termosComErro, "É preciso aceitar os Termos de Uso e Política de Privacidade.");
      if (termosComErro) valido = false;

      return valido;
    };

    formCadastro.addEventListener("submit", function (event) {
      event.preventDefault(); // nunca envia de verdade — formulário decorativo

      var sucesso = formCadastro.querySelector(".form-success");

      if (validarCadastro()) {
        sucesso.classList.add("is-visible");
        setTimeout(function () {
          window.location.href = "check-in.html";
        }, 1200);
      } else if (sucesso) {
        sucesso.classList.remove("is-visible");
      }
    });
  }

  /* --------------------------------------------------------
     6. FORMULÁRIO DE LOGIN
     Decorativo: não existe base de usuários real (é tudo
     estático), então só valida o formato dos campos.
     -------------------------------------------------------- */
  var formLogin = document.getElementById("form-login");
  if (formLogin) {
    var marcarErroLogin = function (nomeCampo, comErro, mensagemErro) {
      var grupo = formLogin.querySelector('[data-campo="' + nomeCampo + '"]');
      if (!grupo) return;
      grupo.classList.toggle("is-invalid", comErro);
      var erroEl = grupo.querySelector(".form-error");
      if (erroEl && mensagemErro) erroEl.textContent = mensagemErro;
      grupo.querySelectorAll("input").forEach(function (campo) {
        campo.setAttribute("aria-invalid", comErro ? "true" : "false");
      });
    };

    formLogin.addEventListener("submit", function (event) {
      event.preventDefault(); // nunca autentica de verdade — formulário decorativo

      var valido = true;

      var email = formLogin.querySelector('[name="email"]');
      var emailComErro = !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      marcarErroLogin("email", emailComErro, "Informe um e-mail válido.");
      if (emailComErro) valido = false;

      var senha = formLogin.querySelector('[name="senha"]');
      var senhaComErro = !senha || senha.value.trim().length === 0;
      marcarErroLogin("senha", senhaComErro, "Informe sua senha.");
      if (senhaComErro) valido = false;

      var sucesso = formLogin.querySelector(".form-success");
      if (valido) {
        sucesso.classList.add("is-visible");
        setTimeout(function () {
          window.location.href = "check-in.html";
        }, 1200);
      } else if (sucesso) {
        sucesso.classList.remove("is-visible");
      }
    });
  }

  /* --------------------------------------------------------
     7. BOTÃO DE MOSTRAR/OCULTAR SENHA (Cadastro e Login)
     -------------------------------------------------------- */
  document.querySelectorAll(".input-senha__toggle").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var campo = document.getElementById(botao.dataset.alvo);
      if (!campo) return;
      var vaiMostrar = campo.type === "password";
      campo.type = vaiMostrar ? "text" : "password";
      botao.setAttribute("aria-label", vaiMostrar ? "Ocultar senha" : "Mostrar senha");
      botao.querySelector(".icone-olho").classList.toggle("is-hidden", vaiMostrar);
      botao.querySelector(".icone-olho-fechado").classList.toggle("is-hidden", !vaiMostrar);
    });
  });

  /* --------------------------------------------------------
     8. CHECK-IN
     Decorativo: não persiste — o novo registro só existe na
     página atual e some se ela for recarregada. O item "Ontem"
     no histórico é um exemplo ilustrativo, não é dado real.
     -------------------------------------------------------- */
  var btnCheckin = document.getElementById("btn-checkin");
  if (btnCheckin) {
    var listaCheckin = document.getElementById("lista-checkin");
    var confirmacaoCheckin = document.getElementById("checkin-confirmacao");

    btnCheckin.addEventListener("click", function () {
      var agora = new Date();
      var hora = String(agora.getHours()).padStart(2, "0") + ":" + String(agora.getMinutes()).padStart(2, "0");

      if (listaCheckin) {
        var item = document.createElement("div");
        item.className = "registro-item";
        item.innerHTML = "<span>Hoje</span><span>" + hora + "</span>";
        listaCheckin.insertBefore(item, listaCheckin.firstChild);
      }

      if (confirmacaoCheckin) {
        confirmacaoCheckin.textContent = "Check-in registrado às " + hora + ".";
        confirmacaoCheckin.classList.add("is-visible");
      }
    });
  }

  /* --------------------------------------------------------
     9. AGENDAR AULA/SALA (Modalidades e Coworking)
     Decorativo: descobre o dia/sala (cabeçalho da grade) e o
     horário (linha) a partir da posição do card na grade, sem
     precisar duplicar essa informação em atributos HTML. Não
     persiste — reseta se a página for recarregada.
     -------------------------------------------------------- */
  document.querySelectorAll(".aula-card__agendar").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var card = botao.closest(".aula-card");
      var celula = botao.closest(".grade-horarios__celula");
      var corpo = celula.parentElement;
      var cabecalho = corpo.previousElementSibling;
      var celulas = Array.prototype.filter.call(corpo.children, function (el) {
        return el.classList.contains("grade-horarios__celula");
      });
      var indiceColuna = celulas.indexOf(celula) % cabecalho.children.length;
      var coluna = cabecalho.children[indiceColuna].textContent.trim();

      var hora = "";
      var anterior = celula.previousElementSibling;
      while (anterior) {
        if (anterior.classList.contains("grade-horarios__hora")) {
          hora = anterior.textContent.trim();
          break;
        }
        anterior = anterior.previousElementSibling;
      }

      var titulo = card.querySelector("h3");
      var paragrafos = card.querySelectorAll("p");
      var extra = paragrafos.length > 1 ? " — " + paragrafos[1].textContent.trim() : "";
      var descricao = titulo
        ? titulo.textContent.trim() + " — " + coluna + ", " + hora + extra
        : coluna + " — Hoje, " + hora;

      var lista = document.getElementById("lista-agendamentos") || document.getElementById("lista-reservas");
      if (lista) {
        var item = document.createElement("div");
        item.className = "registro-item";
        item.innerHTML = "<span>" + descricao + "</span><span class=\"status-badge status-badge--confirmado\">Confirmado</span>";
        lista.insertBefore(item, lista.firstChild);
      }

      botao.textContent = "Agendado";
      botao.disabled = true;
    });
  });
});
