class Input {
    private isValid: boolean | null;
    private el: Element;
    private field: HTMLInputElement;
    private messageText: string;
    private messageField: Element | undefined;
    private buttonVisible: Element | undefined;

    constructor(el: Element) {
        this.messageText = '';
        this.init(el);
    }

    private init = (el: Element): void | undefined => {
        this.el = el;

        const input: HTMLInputElement = el.querySelector('[data-input="field"]');

        if (input) {
            this.field = input
        } else {
            return ;
        }


        const message: Element = el.querySelector('[data-input="message"]');

        if (message) {
            this.messageField = message;
        }

        const buttonType: Element = el.querySelector('[data-input="button-type"]');

        if (buttonType && this.field.type === 'password') {
            this.buttonVisible = buttonType;

            this.buttonVisible.addEventListener('click', () => {
                this.toggleInputMode();
            })
        }
    }

    private toggleInputMode = () => {
        console.log(this.field.type);
        this.field.type = (this.field.type !== 'password') ? 'password' : 'text';
    }
}

export {
    Input,
}
