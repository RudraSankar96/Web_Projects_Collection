function shortenUrl() {
  let longUrl = document.getElementById("longUrl").value;
  if (longUrl === "") {
    alert("Please enter a URL!");
    return;
  }

  // Generate random short code
  let shortCode = Math.random().toString(36).substring(2, 8);

  // Simulated short URL
  let shortUrl = `https://rudra.ly/${shortCode}`;

  document.getElementById("result").innerHTML = `
    Original: <br><a href="${longUrl}" target="_blank">${longUrl}</a><br><br>
    Shortened: <br><a href="${longUrl}" target="_blank">${shortUrl}</a>
  `;
}
