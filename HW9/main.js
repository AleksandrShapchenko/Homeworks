let vasia = { name: "Вася", age: 25 };
let petia = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };
let egor = { name: "Егор", age: 40 };
let dima = { name: "Дима", age: 35 };
let lena = { name: "Лена", age: 18 };

let users = [vasia, petia, masha, egor, dima, lena];

function getYoungEmployees(array) {
    let youngEmpl = array.filter(item => item.age < 30);
    let youngEmplNames = youngEmpl.map(item => item.name);
    return youngEmplNames;
};

console.log(getYoungEmployees(users));