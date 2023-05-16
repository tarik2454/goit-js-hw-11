export default function lazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    console.log('Браузер поддерживает lazyload');

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    lazyImages.forEach(image => {
      image.src = image.dataset.src;
    });
  } else {
    console.log('Браузер НЕ поддерживает lazyload');

    const lazyImages = [].slice.call(
      document.querySelectorAll('img[loading="lazy"]')
    );

    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
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

// export default function lazyLoading() {
//   if ('loading' in HTMLImageElement.prototype) {
//     console.log('Браузер поддерживает lazyload');

//     const lazyImages = document.querySelectorAll('img[loading="lazy"]');

//     lazyImages.forEach(image => {
//       image.src = image.dataset.src;
//     });
//   } else {
//     console.log('Браузер НЕ поддерживает lazyload');

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
