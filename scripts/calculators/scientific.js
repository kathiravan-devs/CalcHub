import { recordCalculation } from "../history.js";



export function scientificCalculator() {
    calculatorTitle.textContent = "🔬 Scientific Calculator";

    calculatorContent.innerHTML = `
        <input id="display" class="calc-display" type="text" readonly>
        <div class="calc-buttons">
            <button onclick="clearDisplay()">C</button>
            <button onclick="deleteLast()">⌫</button>
            <button onclick="appendValue('(')">(</button>
            <button onclick="appendValue(')')">)</button>

            <button onclick="appendValue('7')">7</button>
            <button onclick="appendValue('8')">8</button>
            <button onclick="appendValue('9')">9</button>
            <button onclick="appendValue('/')">÷</button>

            <button onclick="appendValue('4')">4</button>
            <button onclick="appendValue('5')">5</button>
            <button onclick="appendValue('6')">6</button>
            <button onclick="appendValue('*')">×</button>

            <button onclick="appendValue('1')">1</button>
            <button onclick="appendValue('2')">2</button>
            <button onclick="appendValue('3')">3</button>
            <button onclick="appendValue('-')">−</button>

            <button onclick="appendValue('0')">0</button>
            <button onclick="appendValue('.')">.</button>
            <button onclick="calculate()">=</button>
            <button onclick="appendValue('+')">+</button>

            <button onclick="square()">x²</button>
            <button onclick="squareRoot()">√</button>
            <button onclick="sin()">sin</button>
            <button onclick="cos()">cos</button>
        </div>
    `;
}

export function appendValue(value) {
    document.getElementById("display").value += value;
}

export function clearDisplay() {
    document.getElementById("display").value = "";
}

export function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

export function calculate() {
    const display = document.getElementById("display");
    try {
        display.value = Function(`"use strict"; return (${display.value})`)();
        recordCalculation("Scientific Calculator", `Result: ${display.value}`);
    } catch {
        display.value = "Error";
    }
}

export function square() {
    const display = document.getElementById("display");
    const expression = display.value.trim();

    if (!expression || expression === "Error") {
        display.value = "Error";
        return;
    }

    // Find the final numeric operand only.
    // Example: 3*5 -> 3*25, then normal evaluation gives 75.
    const match = expression.match(/(?:\\d+(?:\\.\\d*)?|\\.\\d+)$/);

    if (!match) {
        display.value = "Error";
        return;
    }

    const operand = Number(match[0]);

    if (!Number.isFinite(operand)) {
        display.value = "Error";
        return;
    }

    const squared = operand * operand;
    const before = expression.slice(0, match.index);

    display.value = before + squared;

    try {
        const result = Function(`"use strict"; return (${display.value})`)();
        display.value = result;
        recordCalculation("Scientific Calculator", `Result: ${display.value}`);
    } catch {
        display.value = "Error";
    }
}

export function squareRoot() {
    const display = document.getElementById("display");
    display.value = Math.sqrt(Number(display.value));
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}

export function sin() {
    const display = document.getElementById("display");
    display.value = Math.sin(Number(display.value) * Math.PI / 180);
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}

export function cos() {
    const display = document.getElementById("display");
    display.value = Math.cos(Number(display.value) * Math.PI / 180);
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}