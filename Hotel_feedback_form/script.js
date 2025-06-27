// document.getElementById("myForm").addEventListener("submit", function(e){
//     e.preventDefault();

//     fetch("https://script.google.com/macros/s/AKfycbyl1cu-iKQbT-QgNjL_tvxk3M-rzVB5HpnyFmlyux8eUSXJ0LqDGB3iMSXo57xe6ub_/exec", {
//         method: "POST",
//         body: JSON.stringify({
//             name: document.getElementById("name").value,
//             email: document.getElementById("email").value,
//             age: document.getElementById("age").value,
//             rating: document.getElementById("rating").value,
//             foodQuality: document.getElementById("foodQuality").value,
//             comments: document.getElementById("comments").value
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//     .then(res => res.json())
//     .then(data => {
//         alert("Thank you for your feedback!");
//         document.getElementById("myForm").reset();
//     })
//     .catch(err => {
//         console.error("Error!", err.message);
//         alert("Something went wrong!");
//     });
// });
