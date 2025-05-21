let btn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');
function ToggleMenu() {
  menu.classList.toggle('hide');

}
btn.addEventListener('click', ToggleMenu);


const gallery = document.querySelector('.gallery');

const modalIamge = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', (event) => {
  const img = event.target.closest('img');
  const src = clickedImage.getAttribute('src');
  const alt = clickedImage.getAttribute('alt');
  const full = src.split('-')[0] + '-full.jpeg';

  modalImage.src = full;
  modalImage.alt = alt;
  modal.showModal();

});


modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('close-viewer')) {
    modal.close();
  }
});


modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});





