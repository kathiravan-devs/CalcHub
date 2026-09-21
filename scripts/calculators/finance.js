import { input, showResult, format } from "./common.js";



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