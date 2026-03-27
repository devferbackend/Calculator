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

// --- Pruebas en consola ---
console.log("=== Pruebas de funciones ===");
console.log("add(3, 5):", add(3, 5));             // 8
console.log("subtract(10, 4):", subtract(10, 4));  // 6
console.log("multiply(3, 7):", multiply(3, 7));    // 21
console.log("divide(10, 2):", divide(10, 2));      // 5
console.log("divide(5, 0):", divide(5, 0));        // Error

console.log("\n=== Pruebas de operate ===");
console.log('operate("+", 12, 7):', operate("+", 12, 7));   // 19
console.log('operate("-", 19, 1):', operate("-", 19, 1));    // 18
console.log('operate("*", 4, 6):', operate("*", 4, 6));     // 24
console.log('operate("/", 20, 5):', operate("/", 20, 5));    // 4
console.log('operate("/", 8, 0):', operate("/", 8, 0));      // Error