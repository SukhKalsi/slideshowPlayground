require ('./main.scss');

import Slideshow from './components/slideshow';

document.addEventListener('DOMContentLoaded', () => {

  // Initialise all slideshows on the page
  const slideshowElements = document.querySelectorAll('.slideshow');
  if (slideshowElements) {
    new Slideshow(slideshowElements);
  }
});
