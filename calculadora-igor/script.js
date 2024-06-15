document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".calculadora-botoes button");
  const tela = document.getElementById("tela");

  let numDigitado = "";
  let numAntesOperador = "";
  let operador = null;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const valor = button.textContent;

      if ((valor >= "0" && valor <= "9") || valor === ".") {
        colocarNumero(valor);
      } else if (
        valor === "+" ||
        valor === "-" ||
        valor === "*" ||
        valor === "/"
      ) {
        colocarOperador(valor);
      } else if (valor === "=") {
        calcular();
      }
    });
  });
  const botaoApagarTudo = document.getElementById("apagartudo");
  botaoApagarTudo.addEventListener("click", () => {
    apagarTudo();
  });

  function apagarTudo() {
    numDigitado = "";
    numAntesOperador = "";
    operador = null;
    tela.textContent = "0";
    ajustarTamanhoTexto();
  }

  const botaoApagarEntrada = document.getElementById("apagarentrada");
  botaoApagarEntrada.addEventListener("click", () => {
    apagarEntrada();
  });

  function apagarEntrada() {
    numDigitado = "";
    tela.textContent = "0";
    ajustarTamanhoTexto();
  }

  function colocarNumero(valor) {
    if (operador && numAntesOperador) {
      numDigitado += valor;
      tela.textContent = numDigitado;
    } else numDigitado = numDigitado === "0" ? valor : numDigitado + valor;
    tela.textContent = numDigitado;
    ajustarTamanhoTexto();
  }
  function colocarOperador(valor) {
    if (numDigitado) {
      if (numAntesOperador && operador) {
        calcular();
      } else {
        numAntesOperador = numDigitado;
        numDigitado = "";
      }
    }
    operador = valor;
  }
  function calcular() {
    if (operador && numAntesOperador && numDigitado) {
      let resultado;
      const antes = parseFloat(numAntesOperador);
      const atual = parseFloat(numDigitado);

      switch (operador) {
        case "+":
          resultado = antes + atual;
          break;
        case "-":
          resultado = antes - atual;
          break;
        case "*":
          resultado = antes * atual;
          break;
        case "/":
          resultado = antes / atual;
          break;
      }

      tela.textContent = resultado;
      numAntesOperador = resultado.toString();
      numDigitado = "";
      operador = null;
      ajustarTamanhoTexto();
    }
  }

  function ajustarTamanhoTexto() {
    const tamanhoPadrao = 36;
    const comprimentoTexto = tela.textContent.length;
    const tamanhoTexto = Math.min(tamanhoPadrao, 400 / comprimentoTexto);
    tela.style.fontSize = tamanhoTexto + "px";
  }
});
