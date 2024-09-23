const apiKey = "c56415d77325af3a344d29207d9dcdb3";
const apiId = "3fac8ac0";

// Function to handle the search button click
async function handleSearch() {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;

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

// Event listener for 'Enter' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

function extractRecipeDetails(response) {
  return response.hits.slice(0, 20).map((hit) => ({
    name: hit.recipe.label,
    url: hit.recipe.url,
    image: hit.recipe.image,
    ingredients: hit.recipe.ingredientLines,
  }));
}

function displayRecipes(recipeDetails) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = ""; // Clear previous search results

  recipeDetails.forEach((recipe) => {
    // Create a card element
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    // Recipe image
    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;

    // Recipe title
    const title = document.createElement("h3");
    title.textContent = recipe.name;

    // Ingredients list
    const ingredients = document.createElement("p");
    ingredients.textContent = "Ingredients: " + recipe.ingredients.join(", ");

    // Link to full recipe
    const linkButton = document.createElement("button");

    const link = document.createElement("a");
    link.href = recipe.url;
    link.textContent = "View Recipe";
    link.target = "_blank"; // Opens link in a new tab

    linkButton.appendChild(link);

    // Append all elements to the card
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(ingredients);
    card.appendChild(linkButton);

    // Append the card to the container
    recipeContainer.appendChild(card);
  });
}
