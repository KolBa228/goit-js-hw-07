import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const gallery = document.querySelector('.gallery');

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
          <div class="gallery__caption">${description}</div>
        </a>
      </li>`;
    })
    .join('');
}

const galleryLinks = document.querySelectorAll('.gallery__link');
const lightbox = new SimpleLightbox(galleryLinks, {
  captionsData: 'alt',
  captionDelay: 250,
});

lightbox.on('show.simplelightbox', function () {
  const captionElements = document.querySelectorAll('.gallery__caption');
  captionElements.forEach((captionElement) => {
    captionElement.classList.add('visible');
  });
});

lightbox.on('close.simplelightbox', function () {
  const captionElements = document.querySelectorAll('.gallery__caption');
  captionElements.forEach((captionElement) => {
    captionElement.classList.remove('visible');
  });
});
