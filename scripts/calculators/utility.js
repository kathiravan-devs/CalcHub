import { input, showResult } from "./common.js";



export function percentageCalculator() {
    calculatorTitle.textContent = "📊 Percentage Calculator";

    calculatorContent.innerHTML = `
        ${input("obtained", "Obtained Value", "number")}
        ${input("totalValue", "Total Value", "number")}
        <button class="calculate-btn" onclick="calculatePercentage()">Calculate Percentage</button>
        <div id="result"></div>
    `;
}

export function calculatePercentage() {
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

export function unitCalculator() {
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

export function convertUnit() {
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

export function ageCalculator() {
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

export function calculateAge() {
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