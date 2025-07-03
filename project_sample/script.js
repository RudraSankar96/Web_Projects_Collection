let isLogin = true;

function toggleForm() {
  const title = document.getElementById("form-title");
  const button = document.querySelector(".form-container button");
  const toggleText = document.getElementById("toggle-text");

  if (isLogin) {
    title.textContent = "Register";
    button.textContent = "Register";
    toggleText.innerHTML = `Already have an account? <a href="#" onclick="toggleForm()">Login here</a>`;
    isLogin = false;
  } else {
    title.textContent = "Login";
    button.textContent = "Login";
    toggleText.innerHTML = `New user? <a href="#" onclick="toggleForm()">Register here</a>`;
    isLogin = true;
  }
}

function handleForm() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (isLogin) {
    if (user === "admin" && pass === "admin") {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Try admin/admin");
    }
  } else {
    alert(`Registered successfully for user: ${user}`);
    toggleForm();
  }
  return false;
}
