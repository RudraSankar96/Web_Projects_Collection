function loginUser(event) {
    event.preventDefault(); // Page reload se bachata hai

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 🔐 Basic login check (dummy)
    if (username === "admin" && password === "1234") {
      window.location.href = "welcome.html"; // Redirect to another page
    } else {
      alert("Invalid username or password");
    }
  }