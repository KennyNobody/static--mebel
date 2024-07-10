class SortList {
    private el: Element;
    private activeCategory: string;
    private items: NodeListOf<Element>;

    constructor(element: Element) {
        this.el = element;

        this.init();

        console.log(this.el);
    }

    private init = () => {
        const nav = this.el.querySelector('[data-sort-list="nav"]');
        const list = this.el.querySelector('[data-sort-list="list"]');

        if (nav && list) {
            this.initNav(nav);
            this.initList(list);
        }
    }

    private initNav = (el: Element) => {
        const items = el.querySelectorAll('input');

        items.forEach((item) => {
            item.addEventListener('change', (el) => {
                const targetEl = el.target as HTMLInputElement;
                this.activeCategory = targetEl.value;
                this.sort();
            })
        })
    }

    private initList = (el: Element) => {
        this.items = el.querySelectorAll('[data-sort-list="item"]');
    }

    private sort = () => {
        this.items.forEach((item: Element) => {
            const itemCat = item.getAttribute('data-key');

            if (!this.activeCategory || itemCat === this.activeCategory) {
                item.removeAttribute('hidden');
            } else {
                item.setAttribute('hidden', 'hidden');
            }
        })
    }
}

export {
    SortList,
}
