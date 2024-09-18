// API SEARCH URL https://api.edamam.com/api/recipes/v2?type=user&q=chicken&app_id=3fac8ac0&app_key=c56415d77325af3a344d29207d9dcdb3

const apiKey = "c56415d77325af3a344d29207d9dcdb3";
const apiId = "3fac8ac0";

// Function to handle the search button click
function handleSearch() {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;
}

// Add event listener to the search button
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", handleSearch);
});

async function getRecipes() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=user&q=${chicken}&app_id=${apiId}0&app_key=${apiKey}`;

  const response = await fetch(apiUrl);

  return await response.json();
}
