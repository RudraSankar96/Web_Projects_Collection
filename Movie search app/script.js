async function getMovie() {
  const movieInput = document.getElementById("movieInput").value;
  const movieResult = document.getElementById("movieResult");

  if (!movieInput) {
    movieResult.innerHTML = "<p>Please enter a movie name!</p>";
    return;
  }

  const apiKey = "YOUR_API_KEY"; // 🔑 Replace with your OMDb API key
  const url = `https://www.omdbapi.com/?t=${movieInput}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True") {
      movieResult.innerHTML = `
        <div class="movie-card">
          <img src="${data.Poster}" alt="${data.Title}">
          <h2>${data.Title} (${data.Year})</h2>
          <p><strong>Genre:</strong> ${data.Genre}</p>
          <p><strong>Director:</strong> ${data.Director}</p>
          <p><strong>Actors:</strong> ${data.Actors}</p>
          <p><strong>Plot:</strong> ${data.Plot}</p>
          <p><strong>IMDB Rating:</strong> ⭐ ${data.imdbRating}</p>
        </div>
      `;
    } else {
      movieResult.innerHTML = "<p>Movie not found. Try another title.</p>";
    }
  } catch (error) {
    movieResult.innerHTML = "<p>Something went wrong. Try again later.</p>";
    console.error(error);
  }
}
