const toggleBtn = document.getElementById("toggleTheme");
const body = document.body;
const cartCount = document.getElementById("cartCount");
const addToCartBtn = document.getElementById("addToCartBtn");

let count = 0;

// Dark Mode Toggle
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  toggleBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// Add to Cart Logic
addToCartBtn.addEventListener("click", () => {
  count++;
  cartCount.textContent = count;
  addToCartBtn.textContent = "✅ Added!";
  setTimeout(() => {
    addToCartBtn.textContent = "Add to Cart";
  }, 1500);
});
