import { calculators } from "./hub.js";
import { initHistory } from "./history.js";
import { scientificCalculator, appendValue, clearDisplay, deleteLast, calculate, square, squareRoot, sin, cos } from "./calculators/scientific.js";
import { emiCalculator, calculateEMI, gstCalculator, calculateGST, discountCalculator, calculateDiscount, salaryCalculator, calculateSalary, interestCalculator, calculateInterest } from "./calculators/finance.js";
import { cgpaCalculator, calculateCGPA, marksCalculator, calculateMarks, gpaCalculator, calculateGPA } from "./calculators/student.js";
import { percentageCalculator, calculatePercentage, unitCalculator, convertUnit, ageCalculator, calculateAge } from "./calculators/utility.js";
import { initCategoryFilter, initTheme } from "./ui/ui.js";

const container = document.querySelector(".calculator-grid");
const calculatorArea = document.getElementById("calculatorArea");
const calculatorTitle = document.getElementById("calculatorTitle");
const calculatorContent = document.getElementById("calculatorContent");

container.innerHTML = calculators.map((calculator) => `
  <div class="calculator-card" data-category="${calculator.category}">
    <div class="card-icon">${calculator.icon}</div>
    <h2>${calculator.title}</h2>
    <p>${calculator.description}</p>
    <button onclick="openCalculator('${calculator.type}')">Open Calculator →</button>
  </div>
`).join("");

function openCalculator(type) {
  calculatorArea.classList.remove("hidden");
  window.scrollTo({ top: calculatorArea.offsetTop - 20, behavior: "smooth" });

  const calculatorMap = {
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

  if (calculatorMap[type]) calculatorMap[type]();
}

function closeCalculator() {
  calculatorArea.classList.add("hidden");
}

Object.assign(window, {
  openCalculator, closeCalculator,
  appendValue, clearDisplay, deleteLast, calculate, square, squareRoot, sin, cos,
  calculateEMI, calculateGST, calculateDiscount, calculateSalary, calculateInterest,
  calculateCGPA, calculateMarks, calculateGPA, calculatePercentage, convertUnit, calculateAge
});

initCategoryFilter();
initTheme();
initHistory();
