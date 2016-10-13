import Hammer from 'hammerjs';
require ('./slideshow.scss');

const classes = {
  init: 'slideshow-initialised',
  content: 'slideshow__content',
  track: 'slideshow__track',
  slide: 'slideshow__slide',
  active: 'slideshow-active'
};

class Slideshow {
  
  constructor(elements) {
    this.slideshows = {};
    elements.forEach(this.configureSlideshow.bind(this));
  }

  configureSlideshow(slideshow, index) {
    const identifier = `slideshow-${index}`;
    const settings = {
      activeSlide: 0,
      el: slideshow
    }

    this.slideshows[identifier] = settings;
    this.setupSlides(slideshow, identifier);
    this.bindEvents(slideshow);
  }

  setupSlides(element, identifier) {
    const slides = element.getElementsByClassName(classes.slide);
    const slideCount = slides.length;
    const containerWidth = element.clientWidth;
    const trackWidth = containerWidth * slides.length;
    const trackElement = element.querySelector(`.${classes.content}`);
    const slideshow = this.slideshows[identifier];
    const activeSlide = slideshow.activeSlide;

    slideshow.slideCount = slideCount;
    element.classList.add(classes.init);
    element.setAttribute('data-slideshow', identifier);
    trackElement.classList.add(classes.track);
    trackElement.style.width = `${trackWidth}px`;
    slides[activeSlide].classList.add(classes.active);

    for (let index = 0; index < slideCount; index++) {
      const slide = slides[index];
      slide.style.width = `${containerWidth}px`;
      slide.style.left = `-${containerWidth * index}px`;
    }
  }

  bindEvents(element) {
    const swipe = new Hammer.Swipe();
    const hammer = new Hammer.Manager(element);

    hammer.add(swipe);
    hammer.on('swipeleft', this.swipeHandler.bind(this, element));
    hammer.on('swiperight', this.swipeHandler.bind(this, element));
  }

  swipeHandler(element, event) {
    const identifier = element.getAttribute('data-slideshow');
    const slideshow = this.slideshows[identifier];
    const activeSlide = slideshow.activeSlide;
    const maxSlideIndex = slideshow.slideCount - 1;
    const activeElement = element.querySelector(`.${classes.active}`);
    let nextSlide;
    let nextActiveElement;

    switch (event.type) {
      
      case 'swipeleft':
        if (activeSlide === maxSlideIndex) {
          let slides = element.getElementsByClassName(classes.slide);
          nextActiveElement = slides[0];
          nextSlide = 0;
        } else {
          nextActiveElement = activeElement.nextElementSibling;
          nextSlide = activeSlide + 1;
        }
        break;
      
      case 'swiperight':
        if (activeSlide === 0) {
          let slides = element.getElementsByClassName(classes.slide);
          nextActiveElement = slides[maxSlideIndex];
          nextSlide = maxSlideIndex;
        } else {
          nextActiveElement = activeElement.previousElementSibling;
          nextSlide = activeSlide - 1;
        }
        break;
    }

    slideshow.activeSlide = nextSlide;
    activeElement.classList.remove(classes.active);
    nextActiveElement.classList.add(classes.active);
  }
}

export default Slideshow;
