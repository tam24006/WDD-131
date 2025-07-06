// script.js
const recipes = [
    { name: "Avocado Toast", category: "simpleFoods" },
    { name: "Veggie Wrap", category: "foodOnGo" },
    { name: "Chickpea Stir Fry", category: "quickDinners" },
    { name: "Roasted Veggie Bowl", category: "veggieYummy" },
    { name: "Peanut Butter Banana Sandwich", category: "foodOnGo" },
    { name: "Tomato Basil Pasta", category: "quickDinners" },
    { name: "Grilled Veggie Skewers", category: "veggieYummy" },
    { name: "Yogurt Parfait", category: "simpleFoods" },
  ];
  
  function displayRecipes(filter = "") {
    // Clear previous contents
    ["simpleFoods", "foodOnGo", "quickDinners", "veggieYummy"].forEach(id => {
      document.getElementById(id).innerHTML = "";
    });
  
    // Filter and append
    recipes.filter(r => r.name.toLowerCase().includes(filter.toLowerCase())).forEach(recipe => {
      const item = document.createElement("div");
      item.textContent = recipe.name;
      item.className = "recipe-item";
      document.getElementById(recipe.category).appendChild(item);
    });
  }
  
  // Initial load
  displayRecipes();
  
  // Search bar functionality
  const searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("input", () => {
    displayRecipes(searchBar.value);
  });
  