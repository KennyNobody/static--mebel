import {Slider} from "../ui/slider";

class App {
    constructor() {
        this.init();
    }

    init = () => {
        console.log('App Inited');
        this.initSliders();
    }

    private initSliders = () => {
        const elements = document.querySelectorAll('[data-slider]');

        elements.forEach((item: Element) => new Slider(item))
    }
}

export {App};

