const toggleBtn = document.getElementById("toggleTheme");
const body = document.body;
const cartCount = document.getElementById("cartCount");
const addToCartBtn = document.getElementById("addToCartBtn"); // Optional
const allAddButtons = document.querySelectorAll(".add-btn");

let count = 0;

// Toggle Dark Mode
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Hero button logic (optional)
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    count++;
    cartCount.textContent = count;
    addToCartBtn.textContent = "✅ Added!";
    setTimeout(() => {
      addToCartBtn.textContent = "Add to Cart";
    }, 1500);
  });
}

// Product buttons logic
allAddButtons.forEach(button => {
  button.addEventListener("click", () => {
    count++;
    cartCount.textContent = count;
    button.textContent = "✅ Added!";
    setTimeout(() => {
      button.textContent = "Add to Cart";
    }, 1500);
  });
});
