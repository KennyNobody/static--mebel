import 'swiper/css';
import Swiper from "swiper";
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
// import {checkIsMobile} from "../helpers/checkIsMobile";
// import {removeInlineStyles} from "./helpers";

class Slider {
    sliderInstance: Swiper | null = null;
    sliderPagination: Swiper | null = null;

    constructor(el: Element) {
        this.initSlider(el);
    }

    private initSlider(el: Element): void {
        const mode = el.getAttribute('data-slider');

        if (mode === 'intro') this.initIntroSlider(el);

        if (mode === 'reviews') this.initReviewsSlider(el);

        if (this.sliderInstance) {
            this.initControls(el);
        }
    }

    private initControls(el: Element): void {
        const buttonNext = el.querySelectorAll('[data-button="next"]');
        const buttonPrev = el.querySelectorAll('[data-button="prev"]');

        if (buttonPrev?.length > 0) {
            buttonPrev.forEach((item) => {
                item.addEventListener('click', () => {
                    this.sliderInstance.slidePrev();
                });
            })
        }

        if (buttonNext?.length > 0) {
            buttonNext.forEach((item) => {
                item.addEventListener('click', () => {
                    this.sliderInstance.slideNext();
                });
            })
        }
    }

    private initIntroSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            slidesPerView: 7,
            slideActiveClass: 'active',
            spaceBetween: 20,
            // breakpoints: {
            //     1299: {
            //         enabled: false,
            //     }
            // },
            // on: {
            //     resize: (el: Swiper)=> removeInlineStyles(el)
            // }
        });
    }

    private initReviewsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            allowTouchMove: false,
            direction: 'vertical',
            slidesPerView: 'auto',
            slideActiveClass: 'active',
            spaceBetween: 25,
            // breakpoints: {
            //     1299: {
            //         enabled: false,
            //     }
            // },
            // on: {
            //     resize: (el: Swiper)=> removeInlineStyles(el)
            // }
        });
    }
}

export {
    Slider
};
