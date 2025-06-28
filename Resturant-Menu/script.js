// script.js me add karo

let sliderImages = [
  "https://media.istockphoto.com/id/1340754104/photo/closeup-flat-top-macro-of-fresh-raw-chopped-vegetable-salad-with-romaine-lettuce-greens-sweet.jpg?s=612x612&w=0&k=20&c=w260XDt_7HO4j5uMZvDDIr-ov17xMdjeVwpst5Ct_Sg=",
  "https://media.istockphoto.com/id/1401745103/photo/fried-chicken-wings.jpg?s=612x612&w=0&k=20&c=lhuKzqBPqng3zG_euXFSVcf7uDRguu4jC0OScKw9Rhg=",
  "https://media.istockphoto.com/id/1365480248/photo/chocolate-muffins.jpg?s=612x612&w=0&k=20&c=O2vVdpsHK83T0skY0uIh6c8Lx3RQEsYSp-VyAlxAEmk="
];

let currentIndex = 0;

function changeSlider() {
  const sliderImg = document.getElementById("sliderImage");
  sliderImg.src = sliderImages[currentIndex];
  currentIndex = (currentIndex + 1) % sliderImages.length;
}

// change image every 3 sec
setInterval(changeSlider, 3000);

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
