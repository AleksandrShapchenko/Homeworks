class StoreService {
    store = [];
    constructor(initialStore = []) {
        this.shalter = initialStore;
    }

    setItem(animal) {
        console.log(animal);
        this.store.push(animal);
        console.log(this.store);
    }
    getItems(key, value) {
        return this.store.filter(function (animal, index) {
            animal[key] === value;
        })
    }

    getItem(key, value) {
        return this.store.find(function (animal, index) {
            animal[key] === value;
        })
    }
}