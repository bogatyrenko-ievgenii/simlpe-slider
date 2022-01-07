class Slider {
  constructor(slideWidth /*number without "px"*/, slidesToShow, parent, imgPromise/* recieved array wich contains urls, async */) {
    this.slideWidth = slideWidth;
    this.offset = 0;
    this.parent = parent;
    this.imgPromise = imgPromise;
    this.sliderLength = null;
    this.slidesToShow = slidesToShow;
    this.slidesToShowWidth = this.slideWidth * this.slidesToShow;
    this.btns = null;
    this.slider = null;
  }

  createMarkup = async () => {
    this.renderLoading();
    const images = await this.handleImages();
    this.renderSlider(images);
    this.createRefs();
    this.addStyles(); //basic styles
    this.sliderLength = this.slider.children.length;
    this.addListeners();
  };

  createError = () => {
    return `<div class='error'>OOOPS!!!<br>We are so sorry...<br> Something went wrong...</div>`
  }

  handleImages = () => {
    return this.imgPromise.catch(() => this.parent.innerHTML = this.createError())
  }

  renderSlider = (images) => {
    if(Array.isArray(images)) {
      const elements = [];
      for (let image of images) {
        elements.push(
          `<li class="slider__item"><img src="${image}" alt="img"></li>`
        );
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
    }
  }

  createRefs = () => {
    this.btns = document.querySelector(".btns");
    this.slider = document.querySelector(".slider__list");
  }

  addStyles = () => {
    document.querySelector(".slider__line").style.width = `${this.slidesToShowWidth}px`;
    document.querySelector(".slider").style.cssText = `width: ${this.slidesToShowWidth * 1.1}px`;
  }

  renderLoading = () => {
    this.parent.innerHTML = '<div class="loader">Loading...</div>';
  }


  moveLeft = () => {
    if (this.offset > 0) {
      this.offset =
        -this.slideWidth * this.sliderLength + this.slidesToShowWidth;
    }
    this.slider.style.left = `${this.offset}px`;
  };

  moveRigth = () => {
    if (
      this.offset <
      -this.slideWidth * this.sliderLength + this.slidesToShowWidth
    ) {
      this.offset = 0;
    }
    this.slider.style.left = `${this.offset}px`;
  };

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



export default Slider;


