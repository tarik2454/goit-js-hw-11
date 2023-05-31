const header = document.querySelector('.js-header');
const headerHeight = header.offsetHeight;
const topBtn = document.querySelector('.js-to-top');

const searchForm = document.querySelector('.search-form ');

window.onscroll = function () {
  if (window.pageYOffset > headerHeight) {
    header.classList.add('fixed');
    topBtn.classList.add('is-visible');
  } else {
    header.classList.remove('fixed');
    topBtn.classList.remove('is-visible');
  }
};

topBtn.addEventListener('click', onTopBtnClick);

function onTopBtnClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
