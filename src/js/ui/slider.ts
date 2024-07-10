import 'swiper/css';
import Swiper from "swiper";
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
// import {checkIsMobile} from "../helpers/checkIsMobile";
// import {removeInlineStyles} from "./helpers";

class Slider {
    sliderInstance: Swiper | null = null;

    constructor(el: Element) {
        this.initSlider(el);
    }

    private initSlider(el: Element): void {
        const mode = el.getAttribute('data-slider');

        if (mode === 'intro') this.initIntroSlider(el);

        if (mode === 'reviews') this.initReviewsSlider(el);

        if (mode === 'preview') this.initPreviewSlider(el);

        if (mode === 'section-list') this.initSectionListSlider(el);

        if (mode === 'promo') this.initPromoSlider(el);

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
        });
    }

    private initSectionListSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            slidesPerView: 4,
            slideActiveClass: 'active',
            spaceBetween: 20,
            allowTouchMove: false,
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
        });
    }

    private initPreviewSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            slidesPerView: 1,
            allowTouchMove: true,
            modules: [Pagination],
            slideActiveClass: 'active',
            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider="pagination"]',
                bulletClass: 'bullets__item',
                simulateTouch: false,
                renderBullet: (index: number, className: string) => {
                    return `<button class="${className}"><span class="bullets__item-content"></span></button>`;
                },
            },
        })
    }

    private initPromoSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: true,
            slidesPerView: 1,
            slideActiveClass: 'active',
            modules: [Pagination],
            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider="pagination"]',
                bulletClass: 'bullets-flex__item',
            },
        })
    }
}

export {
    Slider
};
