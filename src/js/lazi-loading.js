export default function lazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    console.log('Browser supports lazyload');

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(image => {
      image.src = image.dataset.src;
    });
  } else {
    console.log('Browser does NOT support lazyload');

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    const callback = (entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.src = target.dataset.src;
        observer.unobserve(target);
      });
    };

    const options = {
      root: null,
      rootMargin: '0px 0px 1200px 0px',
    };

    const imageObserver = new IntersectionObserver(callback, options);
    lazyImages.forEach(image => imageObserver.observe(image));
  }
}

//// option to lazy load images using the lazysizes library
// export default function lazyLoading() {
//   if ('loading' in HTMLImageElement.prototype) {
//     console.log('Browser supports lazyload');

//     const lazyImages = document.querySelectorAll('img[loading="lazy"]');

//     lazyImages.forEach(image => {
//       image.src = image.dataset.src;
//     });
//   } else {
//     console.log('Browser does NOT support lazyload');

//     const script = document.createElement('script');
//     script.src =
//       'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
//     script.integrity =
//       'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
//     script.crossorigin = 'anonymous';
//     script.referrerpolicy = 'no-referrer';

//     document.body.appendChild(script);
//   }
// }
