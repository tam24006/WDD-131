// Global variables and functions
let currentQuote = '';
let currentAuthor = '';
let currentFoodIndex = 0; // Track which food we're showing

// Mental Health Quote API - Using multiple reliable sources
const quoteUrls = [
    "https://api.quotable.io/random?tags=inspirational|motivational",
    "https://zenquotes.io/api/random",
    "https://api.goprogram.ai/inspiration"
];

// Fallback quotes in case APIs fail
const fallbackQuotes = [
    { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "The mind is everything. What you think you become.", author: "Buddha" }
];

// Nutrition data with more variety
const nutritionData = [
    {
        title: "🍎 Apple Nutrition",
        tips: [
            "🔥 Calories: 95 kcal",
            "💪 Protein: 0.5 g", 
            "🥑 Fat: 0.3 g",
            "🌾 Carbs: 25 g",
            "🌿 Fiber: 4.4 g"
        ]
    },
    {
        title: "🍌 Banana Benefits",
        tips: [
            "🔥 Calories: 89 kcal",
            "💪 Protein: 1.1 g",
            "🥑 Fat: 0.3 g", 
            "🌾 Carbs: 23 g",
            "🌿 Fiber: 2.6 g"
        ]
    },
    {
        title: "🥑 Avocado Power",
        tips: [
            "🔥 Calories: 160 kcal",
            "💪 Protein: 2 g",
            "🥑 Fat: 15 g",
            "🌾 Carbs: 9 g", 
            "🌿 Fiber: 7 g"
        ]
    },
    {
        title: "🐟 Salmon Nutrition",
        tips: [
            "🔥 Calories: 208 kcal",
            "💪 Protein: 25 g", 
            "🥑 Fat: 12 g",
            "🌾 Carbs: 0 g",
            "🌿 Omega-3: 2.3 g"
        ]
    },
    {
        title: "🍗 Chicken Breast",
        tips: [
            "🔥 Calories: 165 kcal",
            "💪 Protein: 31 g", 
            "🥑 Fat: 3.6 g",
            "🌾 Carbs: 0 g",
            "🌿 Iron: 1.0 mg"
        ]
    },
    {
        title: "🥜 Almonds",
        tips: [
            "🔥 Calories: 164 kcal",
            "💪 Protein: 6 g", 
            "🥑 Fat: 14 g",
            "🌾 Carbs: 6 g",
            "🌿 Fiber: 3.5 g"
        ]
    },
    {
        title: "🥛 Greek Yogurt",
        tips: [
            "🔥 Calories: 59 kcal",
            "💪 Protein: 10 g", 
            "🥑 Fat: 0.4 g",
            "🌾 Carbs: 3.6 g",
            "🌿 Calcium: 110 mg"
        ]
    },
    {
        title: "🥬 Spinach",
        tips: [
            "🔥 Calories: 23 kcal",
            "💪 Protein: 2.9 g", 
            "🥑 Fat: 0.4 g",
            "🌾 Carbs: 3.6 g",
            "🌿 Iron: 2.7 mg"
        ]
    },
    {
        title: "🍠 Sweet Potato",
        tips: [
            "🔥 Calories: 103 kcal",
            "💪 Protein: 2.3 g", 
            "🥑 Fat: 0.2 g",
            "🌾 Carbs: 24 g",
            "🌿 Fiber: 3.8 g"
        ]
    },
    {
        title: "🥚 Eggs",
        tips: [
            "🔥 Calories: 155 kcal",
            "💪 Protein: 13 g", 
            "🥑 Fat: 11 g",
            "🌾 Carbs: 1.1 g",
            "🌿 Vitamin D: 1.1 mcg"
        ]
    }
];

function loadQuote() {
    // Show loading state
    const quoteElements = [
        document.getElementById("mental-health-quote"),
        document.getElementById("modal-quote")
    ];
    
    quoteElements.forEach(element => {
        if (element) {
            element.innerHTML = '<em>Loading new quote...</em>';
        }
    });
    
    // Try multiple API endpoints
    let currentApiIndex = 0;
    
    function tryNextApi() {
        if (currentApiIndex >= quoteUrls.length) {
            // All APIs failed, use fallback
            useFallbackQuote();
            return;
        }
        
        const currentUrl = quoteUrls[currentApiIndex];
        console.log(`Trying API ${currentApiIndex + 1}: ${currentUrl}`);
        
        fetch(currentUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            let quote, author;
            
            // Handle different API response formats
            if (data.content && data.author) {
                // quotable.io format
                quote = data.content;
                author = data.author;
            } else if (data[0] && data[0].q && data[0].a) {
                // zenquotes.io format
                quote = data[0].q;
                author = data[0].a;
            } else if (data.quote && data.author) {
                // goprogram.ai format
                quote = data.quote;
                author = data.author;
            } else {
                throw new Error('Unexpected API response format');
            }
            
            // Store current quote globally
            currentQuote = quote;
            currentAuthor = author;
            
            const quoteHTML = `<em>"${quote}"</em><br>– ${author}`;
            
            // Update both quote locations
            quoteElements.forEach(element => {
                if (element) {
                    element.innerHTML = quoteHTML;
                }
            });
            
            console.log('New quote loaded successfully:', quote);
        })
        .catch(error => {
            console.error(`API ${currentApiIndex + 1} failed:`, error);
            currentApiIndex++;
            tryNextApi(); // Try next API
        });
    }
    
    function useFallbackQuote() {
        const randomFallback = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        const fallbackHTML = `<em>"${randomFallback.quote}"</em><br>– ${randomFallback.author}`;
        
        quoteElements.forEach(element => {
            if (element) {
                element.innerHTML = fallbackHTML;
            }
        });
        
        console.log('Using fallback quote:', randomFallback.quote);
    }
    
    // Start trying APIs
    tryNextApi();
}

// Make loadNewQuote function global
window.loadNewQuote = function() {
    console.log('loadNewQuote function called');
    loadQuote();
};

// Nutrition API - Load nutrition information for a sample food
function loadNutritionInfo() {
    const nutritionResult = document.getElementById("nutrition-result");
    
    if (!nutritionResult) {
        console.error("Nutrition result element not found");
        return;
    }
    
    // Show loading state
    nutritionResult.innerHTML = '<em>Loading nutrition info...</em>';
    
    // Get the next food in the cycle
    const currentFood = nutritionData[currentFoodIndex];
    currentFoodIndex = (currentFoodIndex + 1) % nutritionData.length; // Move to next food
    
    const nutritionText = `
        <div class="nutrition-info">
            <strong>${currentFood.title}</strong><br>
            <div class="nutrition-details">
                ${currentFood.tips.map(tip => `<span>${tip}</span>`).join('<br>')}
            </div>
            <button onclick="loadNewNutrition()" class="refresh-btn" style="margin-top: 0.5rem;">Try Another Food</button>
        </div>
    `;
    
    nutritionResult.innerHTML = nutritionText;
    console.log('Nutrition info loaded successfully for:', currentFood.title);
}

// Make loadNewNutrition function global
window.loadNewNutrition = function() {
    console.log('loadNewNutrition function called');
    loadNutritionInfo();
};

// Food search functionality
window.searchFood = function() {
    const searchInput = document.getElementById('food-search');
    const foodName = searchInput.value.trim();
    
    if (!foodName) {
        alert('Please enter a food name to search for!');
        return;
    }
    
    console.log('Searching for food:', foodName);
    searchFoodNutrition(foodName);
};

// Search for specific food nutrition
function searchFoodNutrition(foodName) {
    const nutritionResult = document.getElementById("nutrition-result");
    
    if (!nutritionResult) {
        console.error("Nutrition result element not found");
        return;
    }
    
    // Show loading state
    nutritionResult.innerHTML = '<em>Searching for ' + foodName + '...</em>';
    
    // Using a free nutrition API (USDA Food Database)
    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(foodName)}&app_id=YOUR_APP_ID&app_key=YOUR_APP_KEY`;
    
    fetch(apiUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        if (data.hints && data.hints.length > 0) {
            const foodInfo = data.hints[0].food;
            const nutrients = foodInfo.nutrients;
            
            const nutritionText = `
                <div class="nutrition-info">
                    <strong>🍽️ ${foodInfo.label}</strong> (${foodInfo.category || 'Food'})<br>
                    <div class="nutrition-details">
                        <span>🔥 Calories: ${nutrients.ENERC_KCAL || 'N/A'} kcal</span><br>
                        <span>💪 Protein: ${nutrients.PROCNT || 'N/A'} g</span><br>
                        <span>🥑 Fat: ${nutrients.FAT || 'N/A'} g</span><br>
                        <span>🌾 Carbs: ${nutrients.CHOCDF || 'N/A'} g</span><br>
                        <span>🌿 Fiber: ${nutrients.FIBTG || 'N/A'} g</span>
                    </div>
                    <button onclick="searchFood()" class="refresh-btn" style="margin-top: 0.5rem;">Search Again</button>
                </div>
            `;
            
            nutritionResult.innerHTML = nutritionText;
            console.log('Food search successful for:', foodInfo.label);
        } else {
            // No results found, show fallback
            showFallbackForSearch(foodName);
        }
    })
    .catch(error => {
        console.error("Food search API error:", error);
        showFallbackForSearch(foodName);
    });
}

// Show fallback nutrition data when search fails
function showFallbackForSearch(foodName) {
    const nutritionResult = document.getElementById("nutrition-result");
    
    // Create a custom nutrition entry for the searched food
    const customNutrition = {
        title: `🍽️ ${foodName.charAt(0).toUpperCase() + foodName.slice(1)}`,
        tips: [
            "🔥 Calories: Search for specific data",
            "💪 Protein: Varies by preparation", 
            "🥑 Fat: Depends on cooking method",
            "🌾 Carbs: Check nutrition labels",
            "🌿 Fiber: Look for whole grain options"
        ]
    };
    
    const nutritionText = `
        <div class="nutrition-info">
            <strong>${customNutrition.title}</strong><br>
            <div class="nutrition-details">
                ${customNutrition.tips.map(tip => `<span>${tip}</span>`).join('<br>')}
            </div>
            <p style="margin-top: 0.5rem; font-size: 0.8rem; color: #666;">
                💡 Tip: Try searching for specific brands or preparation methods (e.g., "grilled chicken", "whole wheat bread")
            </p>
            <button onclick="searchFood()" class="refresh-btn" style="margin-top: 0.5rem;">Try Different Search</button>
        </div>
    `;
    
    nutritionResult.innerHTML = nutritionText;
    console.log('Showing fallback for searched food:', foodName);
}

// Add Enter key support for search
document.addEventListener('DOMContentLoaded', function() {
    const foodSearchInput = document.getElementById('food-search');
    if (foodSearchInput) {
        foodSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFood();
            }
        });
    }
});

// Modal Functions
function openMentalHealthModal() {
    const modal = document.getElementById('mentalHealthModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Load a fresh quote when modal opens
    loadQuote();
}

function closeMentalHealthModal() {
    const modal = document.getElementById('mentalHealthModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('mentalHealthModal');
    if (event.target === modal) {
        closeMentalHealthModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeMentalHealthModal();
    }
});

document.addEventListener("DOMContentLoaded", () => {

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Search functionality (basic implementation)
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            // You'll implement actual search functionality later
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // Load initial quote
    loadQuote();

    // Load nutrition info
    loadNutritionInfo();

    // Health News API (using a free news API)
    const newsUrl = "https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=demo";
    
    fetch(newsUrl)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        const newsList = document.getElementById('news-list');
        if (data.articles && data.articles.length > 0) {
            data.articles.slice(0, 5).forEach(article => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <a href="${article.url}" target="_blank">
                        <strong>${article.title}</strong>
                        <p>${article.description || ''}</p>
                    </a>
                `;
                newsList.appendChild(li);
            });
        } else {
            newsList.innerHTML = '<li>No health news available at the moment.</li>';
        }
    })
    .catch(error => {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '<li>Unable to load health news. Please check back later.</li>';
        console.error("News API error:", error);
    });
});

const food = "banana"; // You can change this to any food like "chicken", "avocado", "rice"

fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${food}&app_id=92cb1fe7&app_key=92cb1fe7`)
  .then(res => res.json())
  .then(data => {
    const foodInfo = data.hints[0].food;

    const foodName = foodInfo.label;
    const category = foodInfo.category;
    const nutrients = foodInfo.nutrients;

    const nutritionText = `
      <strong>${foodName}</strong> (${category})<br>
      Calories: ${nutrients.ENERC_KCAL} kcal<br>
      Protein: ${nutrients.PROCNT} g<br>
      Fat: ${nutrients.FAT} g<br>
      Carbs: ${nutrients.CHOCDF} g<br>
      Fiber: ${nutrients.FIBTG || "N/A"} g
    `;

    document.getElementById("nutrition-result").innerHTML = nutritionText;
  })
  .catch(error => {
    document.getElementById("nutrition-result").innerText = "Error loading food data.";
    console.error("Nutrition API error:", error);
  });

  fetch("https://wger.de/api/v2/exercise/?language=2&limit=5")
  .then(res => res.json())
  .then(data => {
    const exercises = data.results;

    let html = "<ul>";
    exercises.forEach(exercise => {
      html += `
        <li>
          <strong>${exercise.name}</strong><br>
          <em>${exercise.description ? exercise.description : "No description available."}</em>
        </li>
        <br>
      `;
    });
    html += "</ul>";

    document.getElementById("fitness-exercises").innerHTML = html;
  })
  .catch(error => {
    document.getElementById("fitness-exercises").innerText = "Error loading exercises.";
    console.error("Exercise API error:", error);
  });

// Fitness search functionality
window.searchFitness = function() {
    const searchInput = document.getElementById('fitness-search');
    const query = searchInput.value.trim();
    const resultsDiv = document.getElementById('fitness-exercises');

    if (!query) {
        alert('Please enter a workout or fitness keyword!');
        return;
    }

    resultsDiv.innerHTML = `<em>Searching for "${query}"...</em>`;

    // wger API: search by name or description (simple filter after fetch)
    fetch(`https://wger.de/api/v2/exercise/?language=2&limit=100`)
        .then(res => res.json())
        .then(data => {
            // Broaden search: match if any word in the query is in name or description
            const words = query.toLowerCase().split(/\s+/);
            const exercises = data.results.filter(ex => {
                const name = (ex.name || '').toLowerCase();
                const desc = (ex.description || '').toLowerCase();
                return words.some(word => name.includes(word) || desc.includes(word));
            });
            if (exercises.length === 0) {
                // Curated fallback exercises
                const curated = [
                    {
                        name: "Push-Up",
                        description: "A classic bodyweight exercise for chest, shoulders, and triceps."
                    },
                    {
                        name: "Squat",
                        description: "A fundamental lower body exercise for legs and glutes."
                    },
                    {
                        name: "Plank",
                        description: "A core stability exercise that strengthens the abs and back."
                    },
                    {
                        name: "Jumping Jacks",
                        description: "A full-body cardio move to get your heart rate up."
                    },
                    {
                        name: "Lunges",
                        description: "A great exercise for legs, balance, and coordination."
                    }
                ];
                let html = `<em>No exercises found for "${query}".<br>Try a more general keyword like <b>push</b>, <b>abs</b>, <b>stretch</b>, or <b>cardio</b>.<br><br>Here are some popular exercises you can try:</em><ul>`;
                curated.forEach(exercise => {
                    html += `
                        <li>
                            <strong>${exercise.name}</strong><br>
                            <em>${exercise.description}</em>
                        </li>
                        <br>
                    `;
                });
                html += '</ul>';
                resultsDiv.innerHTML = html;
                return;
            }
            let html = '<ul>';
            exercises.slice(0, 8).forEach(exercise => {
                html += `
                    <li>
                        <strong>${exercise.name}</strong><br>
                        <em>${exercise.description ? exercise.description : "No description available."}</em>
                    </li>
                    <br>
                `;
            });
            html += '</ul>';
            resultsDiv.innerHTML = html;
        })
        .catch(error => {
            resultsDiv.innerHTML = 'Error loading exercises.';
            console.error('Exercise API error:', error);
        });
};

// Enter key support for fitness search
document.addEventListener('DOMContentLoaded', function() {
    const fitnessSearchInput = document.getElementById('fitness-search');
    if (fitnessSearchInput) {
        fitnessSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFitness();
            }
        });
    }
});



  

