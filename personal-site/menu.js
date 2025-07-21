import {Appetizer, MainCourse, Dessert} from './main.mjs';

// menu.dishes


function dishTemplate(dish) {
return `<div class="dish">
        <img class="dish-img" src="${dish.imgSrc}" alt="${dish.imgAlt}">
        <h4>${dish.name}</h4>
        <p>${dish.description}</p>
        <p class="price">Price: ${dish.price}</p>
        <button type="submit" class="dish-btn">Add to cart</button>
  </div>`;
}

function dishTemRender(dishes, category) {
  const dishArray = dishes.map(dish => dishTemplate(dish));
  const html = dishArray.join("");
  document.querySelector(`.${category}-content`).insertAdjacentHTML("beforeend",html);
}

dishTemRender(Appetizer, "appetizer");
dishTemRender(MainCourse, "maincourse");
dishTemRender(Dessert, "dessert");

// add to cart button
let counter = 0;
let total = 0;
document.querySelector(".content").addEventListener("click", event => {
  const clickedBtn = event.target;
  if (clickedBtn.classList.contains("dish-btn")) {
    const parentDish = clickedBtn.closest('.dish');
    const h4Element = parentDish.querySelector("h4");
    const priceElement = parentDish.querySelector(".price");
    const priceText = priceElement.innerText.replace("Price:", "").trim().replace("$", "").trim();
    const price = parseFloat(priceText);
    total += price;
    alert(`${h4Element.innerText} added successfully! Your total is ${total}.`);
    
    //update cart
    counter+=1;
    const orderNumber = document.querySelector(".tooltip");
    orderNumber.innerText = counter;
  }
});