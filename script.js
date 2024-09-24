const apiKey = "c56415d77325af3a344d29207d9dcdb3";
const apiId = "3fac8ac0";

let nextLink = null; // Store the link for the next page of results
let previousLink = [];

// Add event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", () => handleSearch());

  const nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", () => {
    if (nextLink) {
      previousLink.push(nextLink);
      handleSearch(nextLink);
    }
  });

  const previousButton = document.getElementById("previous-button");
  previousButton.addEventListener("click", () => {
    if (previousLink.length > 0) {
      const prevLink = previousLink.pop();
      handleSearch(previousLink[previousLink.length - 1]);
    } else {
      handleSearch();
    }
  });
});

// Event listener for 'Enter' key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Function to handle search and pagination
async function handleSearch(url = null) {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;
  const message = document.getElementById("message");

  if (query === "" && !url) {
    message.textContent = "Please enter a search term";
    return;
  }

  // Loading indicator
  message.textContent = "Loading...";

  try {
    const recipes = await getRecipes(query, url);

    if (recipes && recipes.hits.length > 0) {
      const totalResults = recipes.count; // Get the total number of results
      const recipeDetails = extractRecipeDetails(recipes); // Extract the recipe details
      displayRecipes(recipeDetails); // Display the recipes

      // Update the pagination controls
      updatePaginationControls(recipes._links);
    } else {
      message.textContent = "No recipes found";
    }
  } catch (error) {
    message.textContent = "Error fetching recipes";
  }
}

function updatePaginationControls(links) {
  const nextButton = document.getElementById("next-button");

  // Check if the "next" link exists in the response
  if (links && links.next) {
    nextLink = links.next.href; // Store the next link
    nextButton.disabled = false; // Enable the "Next" button
  } else {
    nextLink = null; // No more pages
    nextButton.disabled = true; // Disable the "Next" button
  }
}

// Fetching recipes from the EDAMAM API
async function getRecipes(query, url = null) {
  const apiUrl =
    url ||
    `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    document.getElementById("message").textContent = ""; // Clear loading message
    return data; // Return the data to the caller
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
}

// Extracting recipe information
function extractRecipeDetails(response) {
  const message = document.getElementById("message");
  if (!response || !response.hits || response.hits.length === 0) {
    message.textContent = "No recipes found";
    return [];
  }
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
