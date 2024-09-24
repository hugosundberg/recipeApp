const apiKey = "c56415d77325af3a344d29207d9dcdb3";
const apiId = "3fac8ac0";

let currentPage = 0;
const resultsPerPage = 20;

// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", () => handleSearch(currentPage));

  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", () => {
    currentPage++;
    handleSearch(currentPage);
  });

  const previousButton = document.getElementById("previous-button");
  previousButton.addEventListener("click", () => {
    currentPage--;
    handleSearch(currentPage);
  });
});

// Event listener for 'Enter' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch(currentPage);
  }
});

// Function to handle the search button click
async function handleSearch(page = 0) {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;
  const message = document.getElementById("message");

  if (query === "") {
    message.textContent = "Please enter a search term";
    return;
  }

  // Loading indicator
  message.textContent = "Loading...";

  const from = page * resultsPerPage;
  const to = from + resultsPerPage;

  const recipes = await getRecipes(query, from, to);

  if (recipes && recipes.hits.length > 0) {
    const totalResults = recipes.count;
    const recipeDetails = extractRecipeDetails(recipes);
    displayRecipes(recipeDetails);
    updatePaginationControls(page, totalResults);
  } else {
    message.textContent = "No recipes found";
  }
}

function updatePaginationControls(page, totalResults) {
  const previousButton = document.getElementById("previous-button");
  const nextButton = document.getElementById("next-button");

  // Disable button if on first page
  previousButton.disabled = page === 0;

  // Disable button if on last page
  const maxPages = Math.ceil(totalResults / resultsPerPage);
  nextButton.disabled = page >= maxPages - 1;
}

// Fetching recipes from EDAMAM API
async function getRecipes(query, from = 0, to = 20) {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}&from=${from}&to=${to}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    message.textContent = "";
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    alert("Unable to fetch recipes. Please try again later.");
  }
}

// Extracting recipe information
function extractRecipeDetails(response) {
  return response.hits.map((hit) => ({
    name: hit.recipe.label,
    url: hit.recipe.url,
    image: hit.recipe.image,
    ingredients: hit.recipe.ingredientLines,
  }));
}

// Display recipes as cards
function displayRecipes(recipeDetails) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = ""; // Clear previous search results

  if (recipeDetails.length === 0) {
    return;
  }

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
