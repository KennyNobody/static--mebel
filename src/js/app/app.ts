import {Slider} from "../ui/slider";
import {Dropdown} from "../ui/dropdown";
import {Select} from "../ui/select";
import {Fieldgroup} from "../ui/fieldgroup";
import {Tooltip} from "../ui/tooltip";
import {SyncSlider} from "../ui/syncSlider";
import { Fancybox } from "@fancyapps/ui";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.initDropdown();
        this.initFieldgroup();
        this.initSliders();
        this.initSyncSliders();
        this.initSelect();
        this.initTooltip();
        this.initFancybox();
    }

    private initSliders = (el?: Element) => {
        const parent = el || document;
        const elements = parent.querySelectorAll('[data-slider]');

        elements.forEach((item: Element) => new Slider(item));
    }

    private initDropdown = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-dropdown="block"]');

        elements.forEach((item) => new Dropdown(item));
    }

    private initFieldgroup = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-fieldgroup="block"]');

        elements.forEach((item) => new Fieldgroup(item));
    }

    private initSelect = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-select="block"]');

        elements.forEach((item) => new Select(item));
    }

    private initTooltip = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-tooltip="block"]');

        elements.forEach((item) => new Tooltip(item));
    }

    private initSyncSliders = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-sync-slider]');

        elements.forEach((item) => new SyncSlider(item));
    }

    private initFancybox = () => {
        Fancybox.bind('[data-fancybox]', {
            closeButton: false,
            closeExisting: true,
            compact: true,
            on: {
                ready: (el: Fancybox) => {
                    const carousel = el.carousel;
                    const node = el.container;

                    if (node && carousel) {
                        node.addEventListener("click", (e: MouseEvent) => {
                            const buttonPrev = (e.target as HTMLElement).closest('[data-carousel-prev]');
                            const buttonNext = (e.target as HTMLElement).closest('[data-carousel-next]');

                            if (buttonPrev) carousel.slidePrev();
                            if (buttonNext) carousel.slideNext();
                        });
                    }
                }
            },
            Carousel: {
                infinite: true,
                Navigation: false,
            },
        });
    }
}

export {App};

