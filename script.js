class Slider {
  constructor(btns, slider, slideWidth, slidesSum) {
    this.btns = btns;
    this.slider = slider;
    this.slideWidth = slideWidth;
    this.offset = 0;
    this.sliderLength = this.slider.children.length;
    this.slidesSum = slidesSum;
    this.slidesToShowWidth = this.slideWidth * this.slidesSum;
  }


  moveLeft = () => {
    if (this.offset > 0) {
      this.offset = -this.slideWidth * this.sliderLength + this.slidesToShowWidth;
    }
    this.slider.style.left = `${this.offset}px`;
  }

  moveRigth = () => {
    if (this.offset < -this.slideWidth * this.sliderLength + this.slidesToShowWidth) {
      this.offset = 0;
    }
    this.slider.style.left = `${this.offset}px`;
  }

  start = () => {
    this.btns.addEventListener("click", (event) => {
      if (event.target.id === "prev") {
        this.offset += this.slideWidth;
        this.moveLeft();
      } else if (event.target.id === "next") {
        this.offset -= this.slideWidth;
        this.moveRigth();
      }
    });
  };

}

window.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelector(".btns");
  const slider = document.querySelector(".slider__list");
  const slideWidth = 200;

const carousel = new Slider(btns, slider, slideWidth, 3);
carousel.start();
});
