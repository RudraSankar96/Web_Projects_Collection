document.addEventListener("DOMContentLoaded", function() {
  const websiteLink = document.querySelector("footer a");

  websiteLink.addEventListener("click", function() {
    alert("Thanks for visiting Camper Cafe!");
  });

  const items = document.querySelectorAll(".flavor, .dessert");

  items.forEach(function(item) {
    item.addEventListener("click", function() {
      console.log(`You clicked ${item.textContent}!`);
    });
  });
});
