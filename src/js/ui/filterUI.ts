import {BodyUI} from "./bodyUI";

class FilterUI {
    block: Element;
    isActive: boolean;
    bodyUI: BodyUI | null;
    buttons: NodeListOf<Element>;

    constructor(el: Element, body: BodyUI | null) {
        this.block = el;
        this.bodyUI = body;

        this.init();
    }

    init = () => {
        this.buttons = document.querySelectorAll('[data-filter-button]');

        this.isActive = this.block.classList.contains('active');

        this.buttons.forEach((item: Element) => {
            item.addEventListener('click', () => {
               this.toggleVisibility();
            });
        });
    }

    toggleVisibility = () => {
        if (this.isActive) {
            this.hideFilter();
        } else {
            this.showFilter();
        }
    }

    showFilter = () => {
        this.block.classList.add('active');
        this.isActive = true;
        if (this.bodyUI) this.bodyUI.fix();
    }

    hideFilter = () => {
        this.block.classList.remove('active');
        this.isActive = false;
        if (this.bodyUI) this.bodyUI.unFix();
    }
}

export {
    FilterUI,
}
