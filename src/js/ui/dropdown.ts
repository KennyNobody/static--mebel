class Dropdown {
    private isActive: boolean;
    private el: Element;
    private button: Element;
    private content: Element;

    constructor(element: Element) {
        this.el = element;
        this.isActive = false;

        this.init();
    }

    private init(): void {
        this.button = this.el.querySelector('[data-dropdown="button"]');
        this.content = this.el.querySelector('[data-dropdown="content"]');

        if (this.button && this.content) {
            this.button.addEventListener('click', () => {
                this.isActive = !this.isActive;

                this.toggleItem();
            });
        }
    }

    private toggleItem(): void {
        if (this.isActive) {
            this.el.classList.add('active');
            this.content.removeAttribute('hidden');
        } else {
            this.el.classList.remove('active');
            this.content.setAttribute('hidden', 'hidden');
        }
    }
}

export {
    Dropdown
};
