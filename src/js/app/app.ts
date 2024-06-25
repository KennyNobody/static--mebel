import {Slider} from "../ui/slider";
import {Dropdown} from "../ui/dropdown";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.initDropdown();
        this.initSliders();
    }

    private initSliders = () => {
        const elements = document.querySelectorAll('[data-slider]');

        elements.forEach((item: Element) => new Slider(item))
    }

    private initDropdown = () => {
        const elements: NodeListOf<Element> = document.querySelectorAll('[data-dropdown="block"]');

        elements.forEach((item) => {
            new Dropdown(item);
        })
    }
}

export {App};

