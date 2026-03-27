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
  if (b === 0) return "Error";
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
}

// --- Event listeners: botones de dígitos ---

const digitButtons = document.querySelectorAll(".btn-digit");

digitButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const digit = btn.dataset.digit;
    // Si no es un dígito (ej: el botón "."), ignorar por ahora
    if (digit === undefined) return;

    // Si acabamos de presionar un operador, empezar número nuevo
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

    // Guardar el primer número y el operador
    firstNumber = parseFloat(currentInput);
    operator = selectedOperator;
    waitingForSecondOperand = true;

    // Mostrar la expresión en la línea superior
    displayExpression.textContent =
      `${firstNumber} ${getOperatorSymbol(operator)}`;

    updateDisplay();
  });
});

// --- Event listener: botón igual (=) ---

const equalsButton = document.querySelector('[data-action="equals"]');

equalsButton.addEventListener("click", () => {
  // No hacer nada si no hay operación pendiente
  if (firstNumber === null || operator === null) return;
  // No evaluar si aún esperamos el segundo número
  if (waitingForSecondOperand) return;

  const secondNumber = parseFloat(currentInput);
  const result = operate(operator, firstNumber, secondNumber);

  // Mostrar la expresión completa arriba
  displayExpression.textContent =
    `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber} =`;

  // Mostrar el resultado
  currentInput = String(result);
  updateDisplay();

  // Resetear para la siguiente operación
  firstNumber = null;
  operator = null;
  waitingForSecondOperand = true;
});

// --- Inicializar display ---
updateDisplay();