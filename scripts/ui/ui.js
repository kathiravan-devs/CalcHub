export function initCategoryFilter() {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const cards = document.querySelectorAll(".calculator-card");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.dataset.category;

      cards.forEach(card => {
        card.style.display =
          category === "all" || card.dataset.category === category
            ? "block"
            : "none";
      });
    });
  });
}



export function initTheme() {
  let isDark = false;
  const themeBtn = document.getElementById("themeBtn");

  themeBtn.addEventListener("click", () => {
    isDark = !isDark;
    document.body.classList.toggle("dark", isDark);
    themeBtn.textContent = isDark ? "☀️" : "🌙";
  });
}