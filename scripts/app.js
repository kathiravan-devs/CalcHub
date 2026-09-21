import { calculators } from "./hub.js";
import { initHistory, recordCalculation } from "./history.js";

const container = document.querySelector(".calculator-grid");

container.innerHTML = calculators.map((calculator) => `
  <div class="calculator-card" data-category="${calculator.category}">
    <div class="card-icon">${calculator.icon}</div>
    <h2>${calculator.title}</h2>
    <p>${calculator.description}</p>
    <button onclick="openCalculator('${calculator.type}')">
      Open Calculator →
    </button>
  </div>
`).join("");
window.openCalculator = openCalculator;
// ===============================
// SHARED DOM REFERENCES
// ===============================

const calculatorArea = document.getElementById("calculatorArea");
const calculatorTitle = document.getElementById("calculatorTitle");
const calculatorContent = document.getElementById("calculatorContent");


// ===============================
// CATEGORY FILTER
// ===============================

const categoryButtons = document.querySelectorAll(".category-btn");
const cards = document.querySelectorAll(".calculator-card");

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.category;

        cards.forEach(card => {
            card.style.display = category === "all" || card.dataset.category === category ? "block" : "none";
        });
    });
});


// ===============================
// HELPER FUNCTIONS
// ===============================

function input(id, label, type = "number", min = "", max = "") {
    return `
        <div class="form-group">
            <label>${label}</label>
            <input id="${id}" type="${type}" ${min ? `min="${min}"` : ''} ${max ? `max="${max}"` : ''} placeholder="Enter ${label}">
        </div>
    `;
}

function showResult(message) {
    const result = document.getElementById("result");
    result.innerHTML = `<div class="result">${message}</div>`;

    const heading = result.querySelector("h3")?.textContent;
    if (heading) {
        const summary = result.textContent
            .replace(heading, "")
            .replace(/\s+/g, " ")
            .trim();
        recordCalculation(heading.replace(" Result", ""), summary);
    }
}

function format(number) {
    return Number(number).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}


// ===============================
// SCIENTIFIC CALCULATOR
// ===============================

function scientificCalculator() {
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

function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    const display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById("display");
    try {
        display.value = Function(`"use strict"; return (${display.value})`)();
        recordCalculation("Scientific Calculator", `Result: ${display.value}`);
    } catch {
        display.value = "Error";
    }
}

function square() {
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

function squareRoot() {
    const display = document.getElementById("display");
    display.value = Math.sqrt(Number(display.value));
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}

function sin() {
    const display = document.getElementById("display");
    display.value = Math.sin(Number(display.value) * Math.PI / 180);
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}

function cos() {
    const display = document.getElementById("display");
    display.value = Math.cos(Number(display.value) * Math.PI / 180);
    recordCalculation("Scientific Calculator", `Result: ${display.value}`);
}


// ===============================
// EMI CALCULATOR
// ===============================

function emiCalculator() {
    calculatorTitle.textContent = "🏦 EMI Calculator";

    calculatorContent.innerHTML = `
        ${input("loan", "Loan Amount", "number")}
        ${input("rate", "Annual Interest Rate (%)", "number")}
        ${input("months", "Loan Tenure (Months)", "number")}
        <button class="calculate-btn" onclick="calculateEMI()">Calculate EMI</button>
        <div id="result"></div>
    `;
}

function calculateEMI() {
    const P = Number(document.getElementById("loan").value);
    const annualRate = Number(document.getElementById("rate").value);
    const N = Number(document.getElementById("months").value);
    const r = annualRate / 12 / 100;

    if (P <= 0 || annualRate < 0 || N <= 0) {
        showResult("Please enter valid values.");
        return;
    }

    const EMI = r === 0
        ? P / N
        : P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);

    const total = EMI * N;
    const interest = total - P;

    showResult(`
        <h3>EMI Result</h3>
        Monthly EMI: <strong>₹${format(EMI)}</strong>
        <br><br>
        Total Payment: <strong>₹${format(total)}</strong>
        <br><br>
        Total Interest: <strong>₹${format(interest)}</strong>
    `);
}

// ===============================
// GST CALCULATOR
// ===============================

function gstCalculator() {
    calculatorTitle.textContent = "💸 GST Calculator";

    calculatorContent.innerHTML = `
        ${input("price", "Product Price", "number")}
        ${input("gstRate", "GST Rate (%)", "number")}
        <button class="calculate-btn" onclick="calculateGST()">Calculate GST</button>
        <div id="result"></div>
    `;
}

function calculateGST() {
    const price = Number(document.getElementById("price").value);
    const rate = Number(document.getElementById("gstRate").value);

    if (price < 0 || rate < 0) {
        showResult("Please enter valid values.");
        return;
    }

    const gst = price * rate / 100;
    const total = price + gst;

    showResult(`
        <h3>GST Result</h3>
        GST Amount: <strong>₹${format(gst)}</strong>
        <br><br>
        Final Price: <strong>₹${format(total)}</strong>
    `);
}


// ===============================
// DISCOUNT CALCULATOR
// ===============================

function discountCalculator() {
    calculatorTitle.textContent = "🏷️ Discount Calculator";

    calculatorContent.innerHTML = `
        ${input("originalPrice", "Original Price", "number")}
        ${input("discountRate", "Discount (%)", "number")}
        <button class="calculate-btn" onclick="calculateDiscount()">Calculate Discount</button>
        <div id="result"></div>
    `;
}

function calculateDiscount() {
    const price = Number(document.getElementById("originalPrice").value);
    const rate = Number(document.getElementById("discountRate").value);

    const discount = price * rate / 100;
    const finalPrice = price - discount;

    showResult(`
        <h3>Discount Result</h3>
        Discount Amount: <strong>₹${format(discount)}</strong>
        <br><br>
        Final Price: <strong>₹${format(finalPrice)}</strong>
    `);
}


// ===============================
// SALARY CALCULATOR
// ===============================

function salaryCalculator() {
    calculatorTitle.textContent = "💼 Salary Calculator";

    calculatorContent.innerHTML = `
        ${input("salary", "Monthly Gross Salary", "number")}
        ${input("deductions", "Monthly Deductions", "number")}
        <button class="calculate-btn" onclick="calculateSalary()">Calculate Salary</button>
        <div id="result"></div>
    `;
}

function calculateSalary() {
    const salary = Number(document.getElementById("salary").value);
    const deductions = Number(document.getElementById("deductions").value);

    const takeHome = salary - deductions;

    showResult(`
        <h3>Salary Result</h3>
        Estimated Take-Home Salary: <strong>₹${format(takeHome)}</strong>
    `);
}


// ===============================
// INTEREST CALCULATOR
// ===============================

function interestCalculator() {
    calculatorTitle.textContent = "📈 Interest Calculator";

    calculatorContent.innerHTML = `
        ${input("principal", "Principal Amount", "number")}
        ${input("interestRate", "Annual Interest Rate (%)", "number")}
        ${input("years", "Time (Years)", "number")}
        <button class="calculate-btn" onclick="calculateInterest()">Calculate Interest</button>
        <div id="result"></div>
    `;
}

function calculateInterest() {
    const P = Number(document.getElementById("principal").value);
    const R = Number(document.getElementById("interestRate").value);
    const T = Number(document.getElementById("years").value);

    const interest = P * R * T / 100;
    const total = P + interest;

    showResult(`
        <h3>Interest Result</h3>
        Simple Interest: <strong>₹${format(interest)}</strong>
        <br><br>
        Total Amount: <strong>₹${format(total)}</strong>
    `);
}


// ===============================
// CGPA CALCULATOR
// ===============================

function cgpaCalculator() {
    calculatorTitle.textContent = "🎓 CGPA Calculator";

    calculatorContent.innerHTML = `
        ${input("sem1", "Semester 1 CGPA", "number", "0", "10")}
        ${input("sem2", "Semester 2 CGPA", "number", "0", "10")}
        ${input("sem3", "Semester 3 CGPA", "number", "0", "10")}
        ${input("sem4", "Semester 4 CGPA", "number", "0", "10")}
        <button class="calculate-btn" onclick="calculateCGPA()">Calculate CGPA</button>
        <div id="result"></div>
    `;
}

function calculateCGPA() {
    const values = ["sem1", "sem2", "sem3", "sem4"]
        .map(id => Number(document.getElementById(id).value));

    const cgpa = values.reduce((a, b) => a + b, 0) / values.length;

    showResult(`
        <h3>CGPA Result</h3>
        Your CGPA: <strong>${cgpa.toFixed(2)}</strong>
        <br><br>
        Approx. Percentage: <strong>${(cgpa * 9.5).toFixed(2)}%</strong>
    `);
}


// ===============================
// MARKS CALCULATOR
// ===============================

function marksCalculator() {
    calculatorTitle.textContent = "📝 Marks Calculator";

    calculatorContent.innerHTML = `
        ${input("mark1", "Subject 1 Marks", "number")}
        ${input("mark2", "Subject 2 Marks", "number")}
        ${input("mark3", "Subject 3 Marks", "number")}
        ${input("mark4", "Subject 4 Marks", "number")}
        ${input("mark5", "Subject 5 Marks", "number")}
        <button class="calculate-btn" onclick="calculateMarks()">Calculate Marks</button>
        <div id="result"></div>
    `;
}

function calculateMarks() {
    const values = ["mark1", "mark2", "mark3", "mark4", "mark5"]
        .map(id => Number(document.getElementById(id).value));

    const total = values.reduce((a, b) => a + b, 0);
    const percentage = total / 500 * 100;

    showResult(`
        <h3>Marks Result</h3>
        Total Marks: <strong>${total} / 500</strong>
        <br><br>
        Percentage: <strong>${percentage.toFixed(2)}%</strong>
    `);
}


// ===============================
// GPA CALCULATOR
// ===============================

function gpaCalculator() {
    calculatorTitle.textContent = "📚 GPA Calculator";

    calculatorContent.innerHTML = `
        ${input("gradePoints", "Total Grade Points", "number")}
        ${input("credits", "Total Credits", "number")}
        <button class="calculate-btn" onclick="calculateGPA()">Calculate GPA</button>
        <div id="result"></div>
    `;
}

function calculateGPA() {
    const points = Number(document.getElementById("gradePoints").value);
    const credits = Number(document.getElementById("credits").value);

    if (credits <= 0) {
        showResult("Credits must be greater than zero.");
        return;
    }

    const gpa = points / credits;

    showResult(`
        <h3>GPA Result</h3>
        GPA: <strong>${gpa.toFixed(2)}</strong>
    `);
}


// ===============================
// PERCENTAGE CALCULATOR
// ===============================

function percentageCalculator() {
    calculatorTitle.textContent = "📊 Percentage Calculator";

    calculatorContent.innerHTML = `
        ${input("obtained", "Obtained Value", "number")}
        ${input("totalValue", "Total Value", "number")}
        <button class="calculate-btn" onclick="calculatePercentage()">Calculate Percentage</button>
        <div id="result"></div>
    `;
}

function calculatePercentage() {
    const obtained = Number(document.getElementById("obtained").value);
    const total = Number(document.getElementById("totalValue").value);

    if (total === 0) {
        showResult("Total cannot be zero.");
        return;
    }

    const percentage = obtained / total * 100;

    showResult(`
        <h3>Percentage Result</h3>
        <strong>${percentage.toFixed(2)}%</strong>
    `);
}


// ===============================
// UNIT CONVERTER
// ===============================

function unitCalculator() {
    calculatorTitle.textContent = "📏 Unit Converter";

    calculatorContent.innerHTML = `
        ${input("unitValue", "Value", "number")}
        <div class="form-group">
            <label>Conversion</label>
            <select id="conversion">
                <option value="km-mile">Kilometer → Mile</option>
                <option value="mile-km">Mile → Kilometer</option>
                <option value="kg-pound">Kilogram → Pound</option>
                <option value="pound-kg">Pound → Kilogram</option>
                <option value="c-f">Celsius → Fahrenheit</option>
                <option value="f-c">Fahrenheit → Celsius</option>
            </select>
        </div>
        <button class="calculate-btn" onclick="convertUnit()">Convert</button>
        <div id="result"></div>
    `;
}

function convertUnit() {
    const value = Number(document.getElementById("unitValue").value);
    const conversion = document.getElementById("conversion").value;
    let result;

    switch (conversion) {
        case "km-mile": result = value * 0.621371; break;
        case "mile-km": result = value * 1.60934; break;
        case "kg-pound": result = value * 2.20462; break;
        case "pound-kg": result = value * 0.453592; break;
        case "c-f": result = (value * 9 / 5) + 32; break;
        case "f-c": result = (value - 32) * 5 / 9; break;
    }

    showResult(`
        <h3>Conversion Result</h3>
        <strong>${result.toFixed(2)}</strong>
    `);
}


// ===============================
// AGE CALCULATOR
// ===============================

function ageCalculator() {
    calculatorTitle.textContent = "🎂 Age Calculator";

    calculatorContent.innerHTML = `
        <div class="form-group">
            <label>Date of Birth</label>
            <input type="date" id="dob">
        </div>
        <button class="calculate-btn" onclick="calculateAge()">Calculate Age</button>
        <div id="result"></div>
    `;
}

function calculateAge() {
    const dobValue = document.getElementById("dob").value;

    if (!dobValue) {
        showResult("Please select your date of birth.");
        return;
    }

    const dob = new Date(dobValue);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    showResult(`
        <h3>Age Result</h3>
        <strong>${years} Years, ${months} Months, ${days} Days</strong>
    `);
}


// ===============================
// OPEN / CLOSE CALCULATOR
// ===============================

function openCalculator(type) {
    calculatorArea.classList.remove("hidden");

    window.scrollTo({
        top: calculatorArea.offsetTop - 20,
        behavior: "smooth"
    });

    const calculators = {
        scientific: scientificCalculator,
        emi: emiCalculator,
        gst: gstCalculator,
        discount: discountCalculator,
        salary: salaryCalculator,
        interest: interestCalculator,
        cgpa: cgpaCalculator,
        marks: marksCalculator,
        gpa: gpaCalculator,
        percentage: percentageCalculator,
        unit: unitCalculator,
        age: ageCalculator
    };

    if (calculators[type]) {
        calculators[type]();
    }
}

function closeCalculator() {
    calculatorArea.classList.add("hidden");
}


// ===============================
// DARK MODE
// ===============================

let isDark = false;
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    isDark = !isDark;
    document.body.classList.toggle("dark", isDark);
    themeBtn.textContent = isDark ? "☀️" : "🌙";
});

Object.assign(window, {
  openCalculator,
  closeCalculator,
  calculateEMI,
  calculateGST,
  calculateDiscount,
  calculateSalary,
  calculateInterest,
  calculateCGPA,
  calculateMarks,
  calculateGPA,
  calculatePercentage,
  convertUnit,
  calculateAge,
  appendValue,
  clearDisplay,
  deleteLast,
  calculate,
  square,
  squareRoot,
  sin,
  cos
});

initHistory();