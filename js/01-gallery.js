import { galleryItems } from './gallery-items.js';
// import * as basicLightbox from 'basiclightbox';

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
let modalInstance = null;

gallery.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault();

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }

  const largeImageUrl = e.target.dataset.source;

  const modalContent = `
    <img src="${largeImageUrl}" alt="Large Image">
  `;

  modalInstance = basicLightbox.create(modalContent);
  modalInstance.show();

  document.addEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  if (modalInstance) {
    modalInstance.close();
    modalInstance = null;
    document.removeEventListener('keydown', onKeyDown);
  }
}

const imgMarkup = createGallery(galleryItems);
gallery.insertAdjacentHTML('beforeend', imgMarkup);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}