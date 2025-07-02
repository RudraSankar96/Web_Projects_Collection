let isLogin = true;

function toggleForm() {
  const formTitle = document.getElementById("form-title");
  const button = document.querySelector("#user-form button");
  const toggleText = document.getElementById("toggle-text");

  if (isLogin) {
    formTitle.textContent = "Register";
    button.textContent = "Register";
    toggleText.innerHTML = `Already have an account? <a href="#" onclick="toggleForm()">Login here</a>`;
    isLogin = false;
  } else {
    formTitle.textContent = "Login";
    button.textContent = "Login";
    toggleText.innerHTML = `New user? <a href="#" onclick="toggleForm()">Register here</a>`;
    isLogin = true;
  }
}

function handleForm() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (isLogin) {
    // Dummy login
    if (user === "admin" && pass === "admin") {
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials (try admin/admin)");
    }
  } else {
    alert(`Registered successfully for user: ${user}`);
    toggleForm(); // switch to login after register
  }
  return false;
}
