let secretNumber = Math.floor(Math.random() * 100) + 1;

document.getElementById("checkBtn").addEventListener("click", () => {
    let guess = Number(document.getElementById("guess").value);
    let message = document.getElementById("message");

    if (guess === secretNumber) {
        message.textContent = "🎉 Correct! You guessed the number!";
    } else if (guess < secretNumber) {
        message.textContent = "📉 Too low!";
    } else {
        message.textContent = "📈 Too high!";
    }
});