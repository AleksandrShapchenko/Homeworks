class Human {

    constructor({name, surname, age}) {
        this.name = name;
        this.surname = surname;
        this.age = age;
    }

    getFullName = function () {
        let fullName = this.name + ' ' + this.surname;
        return fullName;
    }

    setFullName = function (fullName) {
        let arr = fullName.split(' ');
        this.name = arr[0];
        this.surname = arr[1];
    }
}

class Teacher extends Human {

    constructor({name, surname, age, group}) {
        super({name, surname, age});
        this.group = group;
    }

    getListOfNamesByAverageMark = function () {
        return this.group.sort((student1, student2) => student2.averageMark() - student1.averageMark()).map(item => item.name);
    }

    getStudentByName = function (name) {
        return this.group.find(item => item.name == name);
    }

    removeStudentByName = function (name) {
        let removingIndex = this.group.findIndex(item => item.name == name);
        this.group.splice(removingIndex, 1);
    }

    updateStudentByName = function (student, name) {
        let removingIndex = this.group.findIndex(item => item.name == name);
        this.group.splice(removingIndex, 1, student);
    }
}

class Student extends Human {

    constructor({name, surname, age, marks}) {
        super({name, surname, age});
        this.marks = marks;
    }

    averageMark = function () {
        return (this.marks.reduce((sum, current) => (sum + current), 0) / this.marks.length).toFixed(1);
    }

    maxMark = function () {
        let max = this.marks[0]
        for (let mark of this.marks) {
            if (max < mark) max = mark;
        }
        return max;
    }

    minMark = function () {
        let min = this.marks[0]
        for (let mark of this.marks) {
            if (min > mark) min = mark;
        }
        return min;
    }

    getFullName() {
        let fullName = this.name + ' ' + this.surname + ' -student';
        return fullName;
    }
}

let group = [
    new Student({
        name: 'Joe',
        surname: 'Farell',
        age: '12',
        marks: [10, 10, 10, 9, 11],
    }),
    new Student({
        name: 'Bill',
        surname: 'Milthon',
        age: '13',
        marks: [6, 8, 10, 7, 11],
    }),
    new Student({
        name: 'Carl',
        surname: 'Smith',
        age: '12',
        marks: [12, 11, 10, 11, 8],
    }),
    new Student({
        name: 'Phill',
        surname: 'Leotardo',
        age: '13',
        marks: [7, 8, 7, 9, 12],
    }),
    new Student({
        name: 'Marty',
        surname: 'McFly',
        age: '12',
        marks: [9, 8, 9, 9, 11],
    })
];

let hConfig = {
    name: 'Jery',
    surname: 'Pachiny',
    age: 35,
}

let tConfig = {
    name: 'Peter',
    surname: 'Petersson',
    age: 40,
    group,
}

let sConfig = {
    name: 'f',
    surname: 'l',
    age: 12,
    marks: [],
}

let human = new Human(hConfig);
let teacher = new Teacher(tConfig);
let student = new Student(sConfig);

// console.log(teacher.getStudentByName('Joe'));
// console.log(teacher.getListOfNamesByAverageMark());
// teacher.removeStudentByName('Bill');
// teacher.updateStudentByName(student, 'Marty');
// console.log(teacher);

// console.log(human.getFullName());
// human.setFullName(human.getFullName());

// console.log(student.getFullName());