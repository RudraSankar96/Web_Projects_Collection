function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("conversion").value;
  
  let result;

  // Example static rate
  const inrToUsdRate = 0.012;  // e.g., ₹1 = $0.012
  const usdToInrRate = 83;     // $1 = ₹83

  if (isNaN(amount)) {
    result = "Please enter a valid amount.";
  } else {
    if (type === "inr-to-usd") {
      result = `₹${amount} = $${(amount * inrToUsdRate).toFixed(2)}`;
    } else {
      result = `$${amount} = ₹${(amount * usdToInrRate).toFixed(2)}`;
    }
  }

  document.getElementById("result").textContent = result;
}
