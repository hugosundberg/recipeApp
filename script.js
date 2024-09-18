// script.js

// Function to handle the search button click
function handleSearch() {
  const searchBar = document.querySelector(".search-bar");
  const query = searchBar.value;
  return query;
}

// Add event listener to the search button
document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", handleSearch);
  displayRecipe();
});

function displayRecipe() {}
