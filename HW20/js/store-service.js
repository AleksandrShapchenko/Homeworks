export class StoreService {
    store = [];

    constructor(initialStore = []) {
        this.store = initialStore;
    }

    setItem(item) {
        this.store.push(item);
    }

    getItem(key, value) {
        this.store.find(item => item[key] === value);
    }
}