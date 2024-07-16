class Tooltip {
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
        this.button = this.el.querySelector('[data-tooltip="button"]');
        this.content = this.el.querySelector('[data-tooltip="content"]');

        if (this.button && this.content) {
            document.addEventListener('click', (e: MouseEvent) => {
                this.handleClickOutside(e);
            });

            this.isActive = !this.content.hasAttribute('hidden');

            this.button.addEventListener('click', () => {
                this.toggleItem();
            });
        }
    }

    private handleClickOutside(event: MouseEvent): void {
        const actionEl = event.target as Node;

        if (this.isActive && !this.el.contains(actionEl)) {
            this.toggleItem();
        }
    }

    private toggleItem(): void {
        if (this.isActive) {
            console.log('Скрываем');
            this.content.setAttribute('hidden', 'hidden');
            this.isActive = false;
        } else {
            console.log('Показываем');
            this.content.removeAttribute('hidden');
            this.isActive = true;
        }
    }
}

export {
    Tooltip
};
