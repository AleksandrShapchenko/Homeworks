export class List {

    constructor(list) {
        this.list = list;
    }

    clearSelected(elem) {
        elem.target.classList.remove('selected');
    }

    clearAll(elems) {
        for (let elem of elems) {
            elem.classList.remove('selected');
        }
    }

    addSelected(target) {
        target.classList.add('selected');
    }
}