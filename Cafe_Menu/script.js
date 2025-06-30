// script.js

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  const websiteLink = document.querySelector("footer a");

  websiteLink.addEventListener("click", function() {
    alert("Thanks for visiting Camper Cafe!");
  });
});
