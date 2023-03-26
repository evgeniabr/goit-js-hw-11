 import './css/styles.css';

import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';




const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '34734183-f822af85241d99cf90dda111a';
// const OPTIONS = {
//   headers : {
//     Autorization: API_KEY,
//   }
// }
// let searchQuery = "";
let currentPage = 1;
const limit = 40;

// const searchParams = new URLSearchParams({
//    q: "searchQuery",
//   image_type: "photo",
//   orientation: "horizontal",
//   safesearch: true,
//   page: currentPage,
//   per_page: limit,

// })

const refs = {
   formImages: document.querySelector('.search-form'),
  listGallery: document.querySelector('.gallery'),
  formInput: document.querySelector('form>input'),
  loadMoreBtn: document.querySelector('.load-more'),

}
console.log(refs);



refs.formImages.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onSubmitForm);


async function onSubmitForm(event) {
  event.preventDefault();
  const searchQuery = refs.formInput.value.trim();
   console.log(searchQuery);
  try {
    const response = await axios.get(`${BASE_URL}/?key=34734183-f822af85241d99cf90dda111a&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${limit}`);

    const valueQuery = response.data.hits;
    const quantityImages = response.data.totalHits;

    const totalPages = Math.ceil(quantityImages - limit * currentPage);

 if (valueQuery.length === 0 || searchQuery === '') {
      // console.log(valueQuery);

      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (event.type === 'submit') {
      delateListGallery();

      refs.loadMoreBtn.classList.remove('load-more');

      currentPage += 1;

      Notiflix.Notify.success(`Hooray! We found ${quantityImages} images.`);

      createContent(valueQuery);
      gallery.refresh();
    } else if (totalPages <= 0) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );

      refs.loadMoreBtn.classList.add('load-more');
    } else {
      createContent(valueQuery);
      gallery.refresh();

      currentPage += 1;
    }
  } catch (error) {
    console.log(error);
  }
}
    
function createContent(valueQuery) {
  const generateContent = valueQuery.map(value => createListItem(value));
  refs.listGallery.insertAdjacentHTML('beforeend', generateContent.join(''));
}

function createListItem(item) {
  return `<div class="photo-card">
   <a href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${item.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${item.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${item.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${item.downloads}</b>
      </p>
      </div>
      </div>`;
}
  
  function delateListGallery() {
  refs.listGallery.innerHTML = '';
  }


  const gallery = new SimpleLightbox('.photo-card a', {
  captionsData: 'alt',
  showCounter: false,
  maxZoom: 10,
  disableScroll: true,
  nav: true,
});

gallery.on('show.simplelightbox');



//   const { height: cardHeight } = document
//    .querySelector('.gallery')
//    .firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//   top: cardHeight * 2,
//  behavior: 'smooth',
//  });

 



