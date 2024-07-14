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

        if (mode === 'process') this.initProcessSlider(el);

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
            slidesPerView: 'auto',
            modules: [Pagination],
            slideActiveClass: 'active',
            spaceBetween: 20,
            breakpoints: {
                1299: {
                    spaceBetween: 20,
                    slidesPerView: 7,
                }
            },
            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider="pagination"]',
                bulletClass: 'bullets-line__item',
                simulateTouch: false,
            },
        });
    }

    private initSectionListSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            enabled: false,
            breakpoints: {
                1299: {
                    loop: true,
                    enabled: true,
                    spaceBetween: 20,
                    slidesPerView: 4,
                    allowTouchMove: false,
                    slideActiveClass: 'active',
                }
            },
        });
    }

    private initReviewsSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            allowTouchMove: true,
            slidesPerView: 'auto',
            modules: [Pagination],
            slideActiveClass: 'active',
            spaceBetween: 25,
            breakpoints: {
                1299: {
                    spaceBetween: 25,
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    allowTouchMove: false,
                }
            },
            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider="pagination"]',
                bulletClass: 'bullets-line__item',
                simulateTouch: false,
            },
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

    private initProcessSlider(el: Element): void {
        this.sliderInstance = new Swiper(el, {
            loop: false,
            enabled: true,
            spaceBetween: 0,
            modules: [Pagination],
            slidesPerView: 'auto',
            slideActiveClass: 'active',
            breakpoints: {
                1299: {
                    enabled: false,
                }
            },
            pagination: {
                clickable: true,
                bulletActiveClass: 'active',
                el: '[data-slider="pagination"]',
                bulletClass: 'bullets-line__item',
            },
        });
    }
}

export {
    Slider
};
