import imgsArr from './imges.js';


class Slider {
  constructor(slideWidth, slidesToShow, parent, elements) {
    this.slideWidth = slideWidth;
    this.offset = 0;
    this.parent = parent;
    this.elements = elements;
    this.sliderLength = null;
    this.slidesToShow = slidesToShow;
    this.slidesToShowWidth = this.slideWidth * this.slidesToShow;
    this.btns = null;
    this.slider = null;

  }

  create = () => {
    const elements = [];
    for (let elem in this.elements) {
      // console.log(this.elements[elem]);
      elements.push(`<li class="slider__item"><img src="./icons/${this.elements[elem]}.png" alt="img"></li>`)
    }
    this.parent.innerHTML = `<div class="slider">
                                  <div class="slider__line">
                                      <ul class="slider__list">
                                       ${elements.join("")}
                                      </ul>
                                  </div>
                                  <div class="btns">
                                      <a class="btn" id="prev">prev</a>
                                      <a class="btn" id="next">next</a>
                                  </div>
                              </div>`;
    this.btns = document.querySelector(".btns");
    this.slider = document.querySelector(".slider__list");
    document.querySelector('.slider__line').style.width = `${this.slidesToShowWidth}px`;
    document.querySelector('.slider').style.cssText = `width: ${this.slidesToShowWidth * 1.1}px`;
    this.sliderLength = this.slider.children.length;
    this.addListeners();
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

  addListeners = () => {
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
  const slideWidth = 200;
  let slidesToShow = 3;
  const body = document.querySelector('body');

  const newSlider = new Slider(slideWidth, slidesToShow, body, imgsArr);
  newSlider.create();
});
