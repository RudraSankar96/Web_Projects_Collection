async function getRecipe() {
  const searchInput = document.getElementById("searchInput").value;
  const recipeResult = document.getElementById("recipeResult");

  if (!searchInput) {
    recipeResult.innerHTML = "<p>Please enter a dish name!</p>";
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.meals) {
      const meal = data.meals[0];
      
      // Collect ingredients
      let ingredients = "";
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
        }
      }

      recipeResult.innerHTML = `
        <div class="recipe-card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h2>${meal.strMeal}</h2>
          <h3>Ingredients:</h3>
          <ul>${ingredients}</ul>
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank">📺 Watch Recipe Video</a>
        </div>
      `;
    } else {
      recipeResult.innerHTML = "<p>No recipe found. Try another dish.</p>";
    }
  } catch (error) {
    recipeResult.innerHTML = "<p>Something went wrong. Try again later.</p>";
    console.error(error);
  }
}
