// let btn = document.querySelector('.menu-btn');
// const menu = document.querySelector('.menu');
// function ToggleMenu() {
//   menu.classList.toggle('hide');

// }
// btn.addEventListener('click', ToggleMenu);


// const gallery = document.querySelector('.gallery');

// const modalIamge = modal.querySelector('img');
// const closeButton = modal.querySelector('.close-viewer');

// gallery.addEventListener('click', (event) => {
//   const img = event.target.closest('img');
//   const src = clickedImage.getAttribute('src');
//   const alt = clickedImage.getAttribute('alt');
//   const full = src.split('-')[0] + '-full.jpeg';

//   modalImage.src = full;
//   modalImage.alt = alt;
//   modal.showModal();

// });


// modal.addEventListener('click', (event) => {
//   if (event.target.classList.contains('close-viewer')) {
//     modal.close();
//   }
// });


// modal.addEventListener('click', (event) => {
//   if (event.target === modal) {
//     modal.close();
//   }
// });





// show and hide menu items 
const menuButton = document.querySelector("#menu-button");

function showMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("hide");
    console.log("Menu toggled!");
}

menuButton.addEventListener("click", showMenu);

// Window resize
function handleResize() {
    const navLinks = document.querySelector(".nav-links");
    if (window.innerWidth > 1000) {
        navLinks.classList.remove("hide");  
    } else {
        navLinks.classList.add("hide");  
    }
}

handleResize();
window.addEventListener("resize", handleResize);

// image viewer

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
    <button class="close-viewer">X</button>
    <img class="image" src="${pic}" alt="${alt}" />
  </div>`
}

function closeViewer(event) {
    document.querySelector(".viewer").remove()
}

function viewHandler(event) {
    // create a variable to hold the element that was clicked on from event.target
    const clickedImage = event.target;
	// get the src attribute from that element and 'split' it on the "-"
    const srcValue = clickedImage.getAttribute("src").split("-");
	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const newFilename = srcValue[0] + "-full.jpeg";
	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    document.querySelector("body").insertAdjacentHTML("afterbegin", viewerTemplate(newFilename, "image viewer"));
	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    document.querySelector(".close-viewer").addEventListener("click", closeViewer);
}


document.querySelector(".gallery").addEventListener("click", viewHandler);




