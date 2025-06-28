function showThankYou(){
    alert("Thanks for checking our menu");

  const sections = document.querySelectorAll(".menu-section");
  
  sections.forEach((section) => {
    section.style.backgroundColor = "#ffe1b2"; // light orange
    section.style.transition = "background-color 0.5s ease";
  });
  
  // after 2 seconds wapas normal
  setTimeout(() => {
    sections.forEach((section) => {
      section.style.backgroundColor = "#fbeedc"; // original color
    });
  }, 2000);
}
