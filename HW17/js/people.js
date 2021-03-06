class Human {

    constructor({
        name,
        surname,
        age
    }) {
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

    constructor({
        name,
        surname,
        age,
        group,
    }) {
        super({
            name,
            surname,
            age
        });
        this.group = group;
    }

    getListOfNamesByAverageMark = function () {
        return this.group.sort((student1, student2) => student2.averageMark() - student1.averageMark()).map(student => student.name);
    }

    getListOfStudentsByAverageMark = function () {
        return this.group.sort((student1, student2) => student2.averageMark() - student1.averageMark());
    }

    getStudentByName = function (name) {
        return this.group.find(student => student.name == name);
    }

    removeStudentByName = function (name) {
        let removingIndex = this.group.findIndex(student => student.name == name);
        this.group.splice(removingIndex, 1);
    }

    updateStudentByName = function (newStudent, name) {
        let removingIndex = this.group.findIndex(student => student.name == name);
        this.group.splice(removingIndex, 1, newStudent);
    }

    addStudentInGroup = function (data) {
        this.group.push(new Student(data));
    }
}

class Student extends Human {

    constructor({
        name,
        surname,
        age,
        marks,
    }) {
        super({
            name,
            surname,
            age
        });
        this.marks = marks;
    }

    averageMark = function () {
        return (this.marks.reduce((sum, current) => (+sum + +current), 0) / this.marks.length).toFixed(1);
    }

    maxMark = function () {
        let max = this.marks[0]
        for (let mark of this.marks) {
            if (+max < +mark) max = mark;
        }
        return +max;
    }

    minMark = function () {
        let min = this.marks[0]
        for (let mark of this.marks) {
            if (+min > +mark) min = mark;
        }
        return +min;
    }

    getFullName() {
        let fullName = this.name + ' ' + this.surname + ' -student';
        return fullName;
    }
}