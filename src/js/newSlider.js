import Slider from './Slider';
import fetchImg from './fetch';


export default window.addEventListener("DOMContentLoaded", () => {
    const slideWidth = 200;
    let slidesToShow = 3;
    const body = document.querySelector("body");
  
    const newSlider = new Slider(slideWidth, slidesToShow, body, fetchImg());
    newSlider.createMarkup();
  });