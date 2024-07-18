class Menu {
    private el: Element;
    private buttons: NodeListOf<Element>;

    constructor(el: Element) {
        this.el = el;

        this.init();
    }

    init = () => {
        this.buttons = document.querySelectorAll('[data-menu="button"]');

        this.buttons.forEach((item) => {
            item.addEventListener('click', (event) => {
                event.stopPropagation();

                if (this.el.hasAttribute('hidden')) {
                    this.el.removeAttribute('hidden');
                    document.addEventListener('click', this.handleOutsideClick);
                } else {
                    this.el.setAttribute('hidden', 'hidden');
                    document.removeEventListener('click', this.handleOutsideClick);
                }
            });
        });
    }

    handleOutsideClick = (event: MouseEvent) => {
        if (!this.el.contains(event.target as Node)) {
            this.el.setAttribute('hidden', 'hidden');
            document.removeEventListener('click', this.handleOutsideClick);
        }
    }
}

export {
    Menu,
}
