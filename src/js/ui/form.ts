const errors = {
    0: 'Email некорректен',
    1: 'Обязательно для заполнения',
    2: 'Формат телефона некорректен',
    3: 'Должно быть 8 и более символов',
    4: 'Пароль должен содержать заглавные латинские буквы',
    5: 'Пароль должен содержать строчные латинские буквы',
    6: 'Пароль должен содержать числа',
    7: 'Пароль не совпадают',
}

class Form {
    private sectionIndex: number;
    private parent: Element;
    private buttons: NodeListOf<Element>;
    private sections: NodeListOf<Element>;
    private pagination: Element;
    private firstPass: string | null;
    private secondPass: string | null;

    constructor(el: Element) {
        this.parent = el;
        this.sectionIndex = 0;
        this.firstPass = null;
        this.secondPass = null;

        this.init();
    }

    private init = () => {
        this.buttons = this.parent.querySelectorAll('[data-form-button]');

        this.parent.addEventListener('submit', (e) => {
            e.preventDefault();
        });


        this.buttons.forEach((item: Element) => {
            item.addEventListener('click', () => {
                const atr = item.getAttribute('data-form-button');
                if (atr === 'next') {
                    this.nextStep();
                } else if (atr === 'next-submit') {
                    this.nextSubmitStep();
                } else if (atr === 'submit') {
                    this.submit();
                }
            })
        });

        this.sections = this.parent.querySelectorAll('[data-form-section]');
        this.pagination = this.parent.querySelector('[data-form-pagination]');

        if (this.pagination) this.renderPagination();
    }

    private nextStep = () => {
        const inputs = this.sections[this.sectionIndex].querySelectorAll('[data-input="block"]');
        if (!this.validateSection(inputs)) return false;

        this.sectionIndex++;

        this.sections.forEach((item: Element, index: number) => {
            if (index === this.sectionIndex) {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', 'hidden');
            }
        });

        this.renderPagination();
    }

    private nextSubmitStep = () => {
        const inputs = this.sections[this.sectionIndex].querySelectorAll('[data-input="block"]');
        if (!this.validateSection(inputs)) return false;

        setTimeout(() => {
            this.sectionIndex++;

            this.sections.forEach((item: Element, index: number) => {
                if (index === this.sectionIndex) {
                    item.removeAttribute('hidden');
                } else {
                    item.setAttribute('hidden', 'hidden');
                }
            });

            this.renderPagination();

            alert('Переключение после ответа от сервера');
        }, 1500);
    }

    private submit = () => {
        console.log('сабит');
        const inputs = this.sections[this.sectionIndex].querySelectorAll('[data-input="block"]');
        if (!this.validateSection(inputs)) return false;

        setTimeout(() => {
            alert('После ответа от сервера обновляем страницу');
        }, 1500);
    }

    private renderPagination = () => {
        this.pagination.innerHTML = '';

        const bulletsContainer = document.createElement('div');
        bulletsContainer.className = 'bullets bullets--green';

        for (let i = 0; i < this.sections.length; i++) {
            const item = document.createElement('div');
            item.className = 'bullets__item';

            if (i <= this.sectionIndex) {
                item.classList.add('active');
            }

            const itemContent = document.createElement('span');
            itemContent.className = 'bullets__item-content';

            item.appendChild(itemContent);
            bulletsContainer.appendChild(item);
        }

        this.pagination.appendChild(bulletsContainer);
    }

    private validateSection = (els: NodeListOf<Element>) => {
        let flag = true;

        els.forEach((item) => {
            const validateResult = this.validateItem(item);

            if (flag && !validateResult) flag = false;
        })

        return flag;
    }

    private validateItem = (el: Element) => {
        let flag: boolean = true;
        const errors: number[] = [];
        const message = el.querySelector('[data-input="message"]');
        if (message) message.innerHTML = '';

        const field = el.querySelector('input');

        if (el.hasAttribute('data-input-required')) {

            if (!field.value) {
                errors.push(1);

                if (flag) flag = false;
            }
        }

        if (el.hasAttribute('data-input-phone')) {
            if (field.value.length < 16) {
                errors.push(2);

                if (flag) flag = false;
            }
        }

        if (el.hasAttribute('data-input-password') && el.getAttribute('data-input-password') === '1') {
            this.firstPass = field.value;

            if (field.value.length < 8) {
                errors.push(3);

                if (flag) flag = false;
            }
            if (!/[A-Z]/.test(field.value)) {
                errors.push(4);

                if (flag) flag = false;
            }
            if (!/[a-z]/.test(field.value)) {
                errors.push(5);

                if (flag) flag = false;
            }
            if (!/\d/.test(field.value)) {
                errors.push(6);

                if (flag) flag = false;
            }

        }

        if (el.hasAttribute('data-input-password') && el.getAttribute('data-input-password') === '2') {
            this.secondPass = field.value;

            if (this.firstPass !== this.secondPass) {
                errors.push(7);

                if (flag) flag = false;
            }
        }

        if (!flag) {
            el.classList.add('invalid');
            this.renderErrors(message, errors);
        } else {
            el.classList.remove('invalid');
        }

        return flag;
    }

    private renderErrors = (field: Element, arr: number[]) => {

        arr.forEach((item) => {
            if (item in errors) {
                const node = document.createElement('p');
                // @ts-ignore
                node.innerHTML = errors[item];
                field.appendChild(node);
            }
        })
    }
}

export {
    Form,
}
