class Carousel extends HTMLElement {
  constructor() {
    super();
    this.carouselElement = this;
    // Carousel element should have class splide
    if (!this.carouselElement.classList.contains('splide')) return;
    this.desktopPerPage = this.carouselElement.dataset["desktopperpage"] || 4;
    this.mobilePerPage = this.carouselElement.dataset["mobileperpage"] || 1;
    this.focus = this.carouselElement.dataset["focus"] || "center";
    this.type = this.carouselElement.dataset["type"] || "loop";
    this.gap = this.carouselElement.dataset["gapbetweenslides"] || 10;
    this.mobilegap = this.carouselElement.dataset["mobilegapbetweenslides"] || 10;
    this.autoplaySpeed = parseInt(this.dataset["autoplaySpeed"]) || 3000;
    // Data attribute string matching for correct boolean value
    // The fallback is used if the developer make mistake the code is forgiving
    // Read more here https://stackoverflow.com/questions/263965/how-can-i-convert-a-string-to-boolean-in-javascript
    this.showarrows = this.carouselElement.dataset['showarrows'] === 'true' || false;
    this.autoplay = this.carouselElement.dataset['autoplay'] === 'true' || false;
    this.showarrowsonmobile = this.carouselElement.dataset['showarrowsonmobile'] === 'true' || false;
    this.showdots = this.carouselElement.dataset['showdots']?.toLocaleLowerCase() === 'true' || false;
    this.showdotsonmobile = this.carouselElement.dataset['showdotsonmobile']?.toLocaleLowerCase() === 'true' || false;
    this.isNavigation = this.carouselElement.dataset['isnavigation'] === 'true' || false;
    this.disableDrag = this.carouselElement.dataset['disabledrag'] === 'true' || false;
    this.sync = this.carouselElement.dataset['carouselsyncselector'] || false;
    this.initCarousel();
  }

  initCarousel() {
    // More option available here https://splidejs.com/documents/
    // This slider can be customized as require check the above doc before adding any new
    // Slider library.
    this.carousel = new Splide(this.carouselElement, {
      perPage: this.desktopPerPage,
      type: this.type,
      focus: this.focus,
      autoplay: this.autoplay,
      interval: this.autoplaySpeed,
      gap: this.mobilegap,
      arrows: true,
      pagination: this.showdots,
      isNavigation: this.isNavigation,
      omitEnd: true,
      updateOnMove: true,
      drag: !this.disableDrag,
      breakpoints: {
        990: {
          perPage: parseInt(this.desktopPerPage) - parseInt(1),
          updateOnMove: true,
          drag: !this.disableDrag,
        },
        767: {
          perPage: this.mobilePerPage,
          arrows: this.showarrowsonmobile,
          pagination: this.showdotsonmobile,
          gap: this.gap,
          drag: !this.disableDrag,
          updateOnMove: true,
        },
      },
    });

    if (this.sync) {
      this.initCarouselSync()
    } else {
      this.carousel.mount();
    }
  }

  initCarouselSync() {
    this.syncElement = document.querySelector(this.sync);
    this.carouselSync = new Splide(this.sync, {
      updateOnMove: true,
      perPage: this.syncElement.dataset['desktopperpage'] || 5,
      type: this.syncElement.dataset['type'] || 'loop',
      focus: this.syncElement.dataset['focus'] || 'left',
      isNavigation: this.syncElement.dataset['isnavigation'] === 'true' || false,
      pagination: false,
      arrows: this.syncElement.dataset['showarrows'] === 'true' || false,
      breakpoints: {
        750: {
          direction: 'ltr',
          perPage: this.syncElement.dataset['mobileperpage'] || 4,
          gap: this.syncElement.dataset['mobilegap'],
          pagination: false,
        },
      },
    });
    this.carousel.sync(this.carouselSync);
    this.carousel.mount();
    this.carouselSync.mount();
  };
  refreshSlider() {
    this.carousel.refresh();
    if (this.carouselSync) {
      this.carouselSync.refresh();
    }
  }
}
customElements.define('carousel-component', Carousel);