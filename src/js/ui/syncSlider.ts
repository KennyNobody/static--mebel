import 'swiper/css';
import Swiper from "swiper";
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
// import {checkIsMobile} from "../helpers/checkIsMobile";
// import {removeInlineStyles} from "./helpers";

class SyncSlider {
    sliderInstance: Swiper | null = null;
    sliderPagination: Swiper | null = null;

    constructor(el: Element) {
        if (el.hasAttribute('data-sync-slider')) {
            this.initSlider(el);
        } else {
            const element = el.querySelector('[data-sync-slider]');

            element ? this.initSlider(element) : console.error('Разметка слайдера не найдена');
        }
    }

    private initSlider(el: Element): void {
        const mode = el.getAttribute('data-sync-slider');

        if (mode === 'modal-sync') {
            this.initModalSlider(el);
        }
    }

    private initModalSlider(parent: Element): void {
        const mainSlider = parent.querySelector('[data-sub-slider="main"]');
        const paginationSlider = parent.querySelector('[data-sub-slider="pagination"]');

        if (paginationSlider) {
            this.sliderPagination = new Swiper(paginationSlider, {
                slidesPerView: 6,
                spaceBetween: 16,
                slideActiveClass: 'active',
                on: {
                    click: (el: Swiper) => {
                        console.log(el);
                        this.navigateMainSlider(el);
                    }
                }
            });

            this.initControls(paginationSlider);
        }

        if (mainSlider) {
            this.sliderInstance = new Swiper(mainSlider, {
                slidesPerView: 1,
                modules: [Pagination],
                slideActiveClass: 'active',
                thumbs: this.sliderPagination,
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
            });
        }

        if (paginationSlider) {
            this.sliderInstance.on('activeIndexChange', () => {
                const index = this.sliderInstance.realIndex;

                if (this.sliderPagination.realIndex !== index) {
                    this.sliderPagination.slideTo(index);
                }
            })

            this.sliderPagination.on('activeIndexChange', () => {
                const index = this.sliderPagination.realIndex;

                if (this.sliderInstance.realIndex !== index) {
                    this.sliderInstance.slideTo(index);
                }
            });
        }
    }

    private navigateMainSlider = (el: Swiper) => {
        if (this.sliderPagination && this.sliderInstance) {
            const index = el.clickedIndex;

            console.log(index);

            this.sliderInstance.slideTo(index);
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
}

export {
    SyncSlider
};
