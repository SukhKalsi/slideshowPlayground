require ('./slideshow.scss');

class Slideshow {
  
  constructor(elements) {

    for (let slideshow of elements) {
      this.bindEvents(slideshow);
    }
  }

  bindEvents(element) {
    // @TODO: complete this.
  }
}

export default Slideshow;
