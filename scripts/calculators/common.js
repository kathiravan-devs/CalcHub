import { recordCalculation } from "../history.js";



export function input(id, label, type = "number", min = "", max = "") {
    return `
        <div class="form-group">
            <label>${label}</label>
            <input id="${id}" type="${type}" ${min ? `min="${min}"` : ''} ${max ? `max="${max}"` : ''} placeholder="Enter ${label}">
        </div>
    `;
}



export function showResult(message) {
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



export function format(number) {
    return Number(number).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}