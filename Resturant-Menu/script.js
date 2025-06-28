let cart = {};

function addToCart(itemName, itemPrice) {
  if (cart[itemName]) {
    cart[itemName].quantity++;
  } else {
    cart[itemName] = { price: itemPrice, quantity: 1 };
  }
  updateCartDisplay();
}

function changeQuantity(itemName, change) {
  if (cart[itemName]) {
    cart[itemName].quantity += change;
    if (cart[itemName].quantity <= 0) {
      delete cart[itemName];
    }
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartList = document.getElementById("cartItemsList");
  cartList.innerHTML = "";
  let totalItems = 0;
  for (const item in cart) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item} - ₹${cart[item].price} x ${cart[item].quantity}
      <button onclick="changeQuantity('${item}', 1)">+</button>
      <button onclick="changeQuantity('${item}', -1)">-</button>
    `;
    cartList.appendChild(li);
    totalItems += cart[item].quantity;
  }
  document.getElementById("cartCount").textContent = `Cart: ${totalItems} items`;
}
