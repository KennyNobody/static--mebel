class Select {
    private isActive: boolean;
    private el: Element;
    private button: Element;
    private content: Element;
    private inputs: NodeListOf<Element>;
    private placeholder: string;
    private message: Element;


    constructor(element: Element) {
        this.el = element;
        this.isActive = false;

        this.init();
    }

    private init(): void {
        document.addEventListener('click', (e: MouseEvent) => {
            this.handleClickOutside(e);
        });

        this.button = this.el.querySelector('[data-select="button"]');
        this.content = this.el.querySelector('[data-select="content"]');
        this.inputs = this.el.querySelectorAll('input');
        this.message = this.el.querySelector('[data-select="message"]');
        this.placeholder = this.el.getAttribute('data-select-placeholder') || 'Сортировать';

        if (this.inputs) {
            this.initInputs();
        }

        if (this.button && this.content) {
            this.button.addEventListener('click', () => {
                this.isActive = !this.isActive;

                this.toggleItem();
            });
        }
    }

    private toggleItem(): void {
        if (this.isActive) {
            this.content.removeAttribute('hidden');
        } else {
            this.content.setAttribute('hidden', 'hidden');
        }
    }

    private handleClickOutside(event: MouseEvent): void {
        const actionEl = event.target as Node;

        if (this.isActive && !this.el.contains(actionEl)) {
            this.isActive = false;
            this.toggleItem();
        }
    }

    private initInputs(): void {
        this.inputs.forEach((item) => {
            item.addEventListener('change', () => {
               this.createString();
            });
        })
    }

    private createString(): void {
        const checkedInputs = Array.from(this.inputs).filter(input => (input as HTMLInputElement).checked);

        if (checkedInputs.length > 0) {
            const selectedValues = checkedInputs.map((input) => {
                return input.getAttribute('data-select-caption');
            }).join(', ');

            if (this.message) this.message.textContent = selectedValues;
        } else {
            if (this.message) this.message.textContent = this.placeholder;
        }
    }
}

export {
    Select
};
