const apiKey = "c56415d77325af3a344d29207d9dcdb3";

// API Access point https://api.edamam.com/api/recipes/v2

// API request URL https://api.edamam.com/api/recipes/v2?type=user&q=chicken&app_id=3fac8ac0&app_key=c56415d77325af3a344d29207d9dcdb3

// Function to handle the search button click
function handleSearch() {
  const searchBar = document.querySelector("search-bar");
  const query = searchBar.value;
}

// Add event listener to the search button
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", handleSearch);

  console.log("clicked");

  getRecipies();
});

async function getRecipies() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=user&q=${query}&app_id=3fac8ac0&app_key=c56415d77325af3a344d29207d9dcdb3`;

  const response = await fetch(apiUrl);

  return await response.json;
}

function displayRecipe(recipesResponse) {
  console.log(recipesResponse);
}
