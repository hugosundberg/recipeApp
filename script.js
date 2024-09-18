const apiKey = "c56415d77325af3a344d29207d9dcdb3";
const apiId = "3fac8ac0";

// Function to handle the search button click
async function handleSearch() {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;

  console.log(query);

  const recipes = await getRecipes(query);
  const recipeDetails = extractRecipeDetails(recipes);

  displayRecipes(recipeDetails);
}

// Add event listener to the search button
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", handleSearch);
});

async function getRecipes(query) {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}`;

  const response = await fetch(apiUrl);

  return await response.json();
}

function extractRecipeDetails(response) {
  return response.hits.slice(0, 10).map((hit) => ({
    name: hit.recipe.label,
    url: hit.recipe.url,
    image: hit.recipe.image,
    ingredients: hit.recipe.ingredientLines,
  }));
}

function displayRecipes(recipeDetails) {
  console.log(recipeDetails);
}
