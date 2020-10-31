 export class Human {

    constructor({
        email,
        name,
        password,
    }) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

}

export class People extends Human {
    static peopleStore = [];

    constructor({
        email,
        name,
        password,
    }) {
        super({
            email,
            name,
            password,
        });
    }

    static setHuman(human) {
        People.peopleStore.push(human);
    }


}