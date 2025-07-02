function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "admin") {
    window.location.href = "dashboard.html";
    return false;
  } else {
    alert("Invalid username or password. Try 'admin'/'admin'");
    return false;
  }
}
