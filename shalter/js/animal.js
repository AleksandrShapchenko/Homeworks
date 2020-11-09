let animalStore = new StoreService();

class Animal {

    constructor({
        cat,
        dog,
        color,
        breed,
        name,
        number
    }) {
        this.cat = cat,
            this.dog = dog,
            this.color = color,
            this.breed = breed,
            this.name = name,
            this.number = number
    }

    changeName(number, newName) {
        let findedAnimal = animalStore.getItem('number', number);
        if (!findedAnimal) return;

        findedAnimal.name = newName;
    }

    static describeAnimal(data) {
        animalStore.setItem(new Animal(data))
    }

    static getAnimalsList() {
        return `<ol>${animalStore.store.map( animal => `<li>${animal.name}</li>`).join('')}</ol>`;
    }

}