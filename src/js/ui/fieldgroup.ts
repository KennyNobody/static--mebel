class Fieldgroup {
    private el: Element;
    private button: Element;
    private content: Element;

    constructor(element: Element) {
        this.el = element;

        this.init();
    }

    private init(): void {
        this.button = this.el.querySelector('[data-fieldgroup="button"]');
        this.content = this.el.querySelector('[data-fieldgroup="content"]');

        if (this.button && this.content) {
            this.button.addEventListener('click', () => {
                this.toggleItem();
            });
        }
    }

    private toggleItem(): void {
        if (this.el.classList.contains('active')) {
            this.button.classList.remove('active');
            this.el.classList.remove('active');
        } else {
            this.button.classList.add('active');
            this.el.classList.add('active');
        }
    }
}

export {
    Fieldgroup
};
