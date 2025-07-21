import {celebrations} from './main.mjs';


// slideshow 
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides (n) {
    showSlides(slideIndex += n);
}

window.plusSlides = plusSlides;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) {
      console.error('No slides found with class "mySlides"');
      return;
  }

    if (n > slides.length) {slideIndex = 1};
    if (n < 1) {slideIndex = slides.length};
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex-1].style.display = "block";
  }

  //celebrations- content
function celebrationTemplate(celebrations) {
  return `<div class="celebration">
            <img class="celebration-img" src="${celebrations.imageSource}" alt="${celebrations.imageAlt}">
            <h3>${celebrations.title}</h3>
            <p>${celebrations.description}</p>
        </div>`;
}

function celeTemplateRender(celebrations) {
  const celeContainer = document.querySelector(".celebrations-content");
  celebrations.forEach((celebration) => {
      const html = celebrationTemplate(celebration);
      celeContainer.insertAdjacentHTML("beforeend",html);
  });
}

celeTemplateRender(celebrations);

// place an order button clicked
function formShowup() {
  const orderForm = document.querySelector(".order-form");
  if (orderForm.style.display =="block") {
    orderForm.style.display = "none";
  } else {
    orderForm.style.display = "block";
  }
}

document.querySelector(".place-order-btn").addEventListener("click", formShowup);

// add order form submit
function addOrderTemplate() {
  const username = document.querySelector("#name").value;
  const message = `Thank you ${username} for your order.`;
  document.querySelector(".order-confirm").innerText = message;
}

document.querySelector(".order-form").addEventListener("submit", function(event) {
  event.preventDefault();
  document.querySelector(".order-form").style.display = "none";
  document.querySelector(".order-confirm").style.display = "block";
  addOrderTemplate();
});

// document.querySelector(".place-order-btn").addEventListener("click", () => {
//   const orderConfirm = document.querySelector(".order-confirm");
// if (orderConfirm.classList.contains("hide")) {
//   orderConfirm.classList.remove("hide");
// } else {
//   orderConfirm.classList.add("hide");
// }
// });

// feedback form
document.querySelector(".feedback-form").addEventListener("submit", function(e) {
  e.preventDefault();
  // document.querySelector(".feedback-form").style.display="none";
  document.querySelector(".feedback-msg").style.display="block";
});