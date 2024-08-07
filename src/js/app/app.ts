import {Slider} from "../ui/slider";
import {Dropdown} from "../ui/dropdown";
import {Select} from "../ui/select";
import {Fieldgroup} from "../ui/fieldgroup";
import {Tooltip} from "../ui/tooltip";
import {SyncSlider} from "../ui/syncSlider";
import { Fancybox } from "@fancyapps/ui";
import {Input} from "../ui/input";
import {SortList} from "../ui/sortList";
import {Form} from "../ui/form";
import IMask from "imask";
import {Menu} from "../ui/menu";
import {FilterUI} from "../ui/filterUI";
import {BodyUI} from "../ui/bodyUI";

class App {
    bodyUI: BodyUI;
    filterUI: FilterUI;

    constructor() {
        this.init();
    }

    init = () => {
        this.initBody();
        this.initDropdown();
        this.initFieldgroup();
        this.initSliders();
        this.initSyncSliders();
        this.initSelect();
        this.initTooltip();
        this.initFancybox();
        this.initForms();
        this.initSortList();
        this.initForm();
        this.initInputMask();
        this.initMenu();
        this.initFilterUI();
    }

    private initBody = () => {
        const el: Element = document.querySelector('body');

        this.bodyUI = new BodyUI(el);
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
            Thumbs: {
                thumbTpl: '',
            }
        });
    }

    private initForms = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-input="block"]');

        elements.forEach((item) => new Input(item));
    }

    private initSortList = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-sort-list="block"]');

        elements.forEach((item) => new SortList(item));
    }

    private initForm = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-form]');

        elements.forEach((item) => new Form(item));
    }

    private initInputMask = () => {
        const elements: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll('[data-input-mask="phone"]');

        elements.forEach((item) => IMask(item, {
            mask: '+{7}(000)000-00-00'
        }))
    }

    private initMenu = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-menu="block"]');

        elements.forEach((item) => new Menu(item));
    }

    private initFilterUI = () => {
        const element: Element = document.querySelector('[data-filter="block"]');

        this.filterUI = new FilterUI(element, this.bodyUI || null);
    }
}

export {App};

