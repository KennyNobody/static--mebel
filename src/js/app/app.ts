import {Slider} from "../ui/slider";
import {Dropdown} from "../ui/dropdown";
import {Select} from "../ui/select";
import {Fieldgroup} from "../ui/fieldgroup";
import {Tooltip} from "../ui/tooltip";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        this.initDropdown();
        this.initFieldgroup();
        this.initSliders();
        this.initSelect();
        this.initTooltip();
    }

    private initSliders = () => {
        const elements = document.querySelectorAll('[data-slider]');

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
}

export {App};

