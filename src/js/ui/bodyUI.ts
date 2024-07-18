class BodyUI {
    bodyEl: Element;
    isFixed: boolean;

    constructor(el: Element) {
        this.bodyEl = el;

        this.init();
    }

    init = () => {
        this.isFixed = this.bodyEl.classList.contains('fixed');
    }

    fix = () => {
        this.bodyEl.classList.add('fixed');
    }

    unFix = () => {
        this.bodyEl.classList.remove('fixed');
    }
}


export {
    BodyUI,
}
