import { input, showResult } from "./common.js";



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