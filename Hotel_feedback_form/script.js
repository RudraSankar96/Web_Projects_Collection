const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const scriptURL = "https://script.google.com/macros/s/AKfycbyjeqw9XuJKioG-xErrP0nXONcJMLP-BM6Brn_cEfom6mSfuLZfW19oopaBwsSWO79N/exec";

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    alert("✅ Thank you! Your feedback has been submitted.");
    form.reset();
  } catch (err) {
    alert("❌ Submission failed: " + err);
  }
});
