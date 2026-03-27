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

// --- Inicializar display ---
updateDisplay();