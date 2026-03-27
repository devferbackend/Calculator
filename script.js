// --- Funciones matemáticas básicas ---

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "¡No, bro!";
  return a / b;
}

// --- Función operate ---
// Recibe un operador (string) y dos números,
// y llama a la función correspondiente.

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Error";
  }
}

// --- Estado de la calculadora ---

let firstNumber = null;
let operator = null;
let currentInput = "0";
let waitingForSecondOperand = false;

// --- Referencias al DOM ---

const displayCurrent = document.querySelector(".display-current");
const displayExpression = document.querySelector(".display-expression");

// --- Función para actualizar el display ---

function updateDisplay() {
  displayCurrent.textContent = currentInput;

  // Estilo visual cuando hay error
  if (hasError()) {
    displayCurrent.style.color = "#e94560";
    displayCurrent.style.fontSize = "1.6rem";
  } else {
    displayCurrent.style.color = "";
    displayCurrent.style.fontSize = "";
  }
}

// --- Helper: redondear resultados con decimales largos ---

function roundResult(value) {
  if (typeof value === "string") return value; // "¡No, bro!" u otro error
  return Math.round(value * 100000000) / 100000000;
}

// --- Helper: verificar si el display tiene un error ---

function hasError() {
  return isNaN(parseFloat(currentInput));
}

// --- Event listeners: botones de dígitos ---

const digitButtons = document.querySelectorAll(".btn-digit");

digitButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const digit = btn.dataset.digit;
    // Si no es un dígito (ej: el botón "."), ignorar por ahora
    if (digit === undefined) return;

    // Si hay error en pantalla, resetear todo al presionar un dígito
    if (hasError()) {
      firstNumber = null;
      operator = null;
      displayExpression.textContent = "";
      currentInput = digit;
      waitingForSecondOperand = false;
      updateDisplay();
      return;
    }

    // Si acabamos de presionar un operador o "=", empezar número nuevo
    if (waitingForSecondOperand) {
      currentInput = digit;
      waitingForSecondOperand = false;
      updateDisplay();
      return;
    }

    // Evitar múltiples ceros al inicio (ej: "007")
    if (currentInput === "0" && digit === "0") return;

    // Si el display muestra "0", reemplazar; si no, concatenar
    if (currentInput === "0") {
      currentInput = digit;
    } else {
      currentInput += digit;
    }

    updateDisplay();
  });
});

// --- Helper: símbolo del operador para el display ---

function getOperatorSymbol(op) {
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  return symbols[op] || op;
}

// --- Event listeners: botones de operador ---

const operatorButtons = document.querySelectorAll(".btn-operator");

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedOperator = btn.dataset.operator;

    // Si hay error, ignorar operadores
    if (hasError()) return;

    // Si ya estamos esperando el segundo número (operadores consecutivos),
    // solo cambiar el operador, NO evaluar.
    if (waitingForSecondOperand && operator !== null) {
      operator = selectedOperator;
      displayExpression.textContent =
        `${firstNumber} ${getOperatorSymbol(operator)}`;
      return;
    }

    // Si hay una operación pendiente Y ya se ingresó un segundo número,
    // evaluar primero y usar el resultado como nuevo firstNumber.
    // Ej: 12 + 7 → usuario presiona "-" → evalúa 12+7=19, luego 19 -
    if (firstNumber !== null && operator !== null && !waitingForSecondOperand) {
      const secondNumber = parseFloat(currentInput);
      const result = operate(operator, firstNumber, secondNumber);

      // Si el resultado es un error (ej: división por cero), mostrarlo
      if (typeof result === "string") {
        currentInput = result;
        updateDisplay();
        displayExpression.textContent = "";
        firstNumber = null;
        operator = null;
        return;
      }

      const rounded = roundResult(result);
      currentInput = String(rounded);
      updateDisplay();
      firstNumber = rounded;
    } else {
      // No hay operación pendiente, simplemente guardar el primer número
      firstNumber = parseFloat(currentInput);
    }

    operator = selectedOperator;
    waitingForSecondOperand = true;

    // Actualizar la expresión con el nuevo operador
    displayExpression.textContent =
      `${firstNumber} ${getOperatorSymbol(operator)}`;
  });
});

// --- Event listener: botón igual (=) ---

const equalsButton = document.querySelector('[data-action="equals"]');

equalsButton.addEventListener("click", () => {
  // No hacer nada si no hay operación pendiente
  if (firstNumber === null || operator === null) return;
  // No evaluar si aún esperamos el segundo número
  if (waitingForSecondOperand) return;
  // No operar si hay error
  if (hasError()) return;

  const secondNumber = parseFloat(currentInput);
  const result = operate(operator, firstNumber, secondNumber);

  // Mostrar la expresión completa arriba
  displayExpression.textContent =
    `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber} =`;

  // Mostrar el resultado (redondeado si es numérico)
  const rounded = roundResult(result);
  currentInput = String(rounded);
  updateDisplay();

  // Resetear para la siguiente operación
  firstNumber = null;
  operator = null;
  waitingForSecondOperand = true;
});

// --- Event listener: botón borrar (AC) ---

const clearButton = document.querySelector('[data-action="clear"]');

clearButton.addEventListener("click", () => {
  firstNumber = null;
  operator = null;
  currentInput = "0";
  waitingForSecondOperand = false;
  displayExpression.textContent = "";
  updateDisplay();
});

// --- Inicializar display ---
updateDisplay();