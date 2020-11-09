// Human
function Human(config) {
    this.name = config.name;
    this.surname = config.surname;
    this.age = config.age;
}

Human.prototype.getFullName = function () {
    let fullName = this.name + ' ' + this.surname;
    return fullName;
}

Human.prototype.setFullName = function (fullName) {
    let arr = fullName.split(' ');
    this.name = arr[0];
    this.surname = arr[1];
}
// Teacher
function Teacher(config) {
    Human.call(this, config);
    this.group = config.group;
}

Teacher.prototype = Object.create(Human.prototype);
Teacher.prototype.constructor = Teacher;

Teacher.prototype.getListOfNamesByAverageMark = function () {
    let studentsWithAvMark = this.group.map(item => Object.assign(item, {
        marks: item.averageMark(),
    }));
    let sortedByAvMark = studentsWithAvMark.sort((a, b) => +a.marks > +b.marks ? 1 : -1);
    
    return sortedByAvMark.map(item => item = item.name);
}

Teacher.prototype.getStudentByName = function (name) {
    return this.group.find(item => item.name == name);
}

Teacher.prototype.removeStudentByName = function (name) {
    let removingIndex = this.group.findIndex(item => item.name == name);
    this.group.splice(removingIndex, 1);
}

Teacher.prototype.updateStudentByName = function (student, name) {
    let removingIndex = this.group.findIndex(item => item.name == name);
    this.group.splice(removingIndex, 1, student);
}

// Student
function Student(config) {
    Human.call(this, config);
    this.marks = config.marks;
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype = Object.assign(Student.prototype, {
    getFullName() {
        let fullName = this.name + ' ' + this.surname + ' -student';
        return fullName;
    },
});

Student.prototype.averageMark = function () {
    return (this.marks.reduce((sum, current) => (sum + current), 0) / this.marks.length).toFixed(1);
}

Student.prototype.maxMark = function () {
    let max = this.marks[0]
    for (let mark of this.marks) {
        if (max < mark) max = mark;
    }
    return max;
}

Student.prototype.minMark = function () {
    let min = this.marks[0]
    for (let mark of this.marks) {
        if (min > mark) min = mark;
    }
    return min;
}
// configs
let hConfig = {
    name: 'Jery',
    surname: 'Pachiny',
    age: 35,
}

let tConfig = {
    name: 'Peter',
    surname: 'Petersson',
    age: 40,
    group: [new Student({ name: 'Joe', surname: 'Farell', age: '12', marks: [10, 10, 10, 9, 11], }),
    new Student({ name: 'Bill', surname: 'Milthon', age: '13', marks: [6, 8, 10, 7, 11], }),
    new Student({ name: 'Carl', surname: 'Smith', age: '12', marks: [12, 11, 10, 11, 8], }),
    new Student({ name: 'Phill', surname: 'Leotardo', age: '13', marks: [7, 8, 7, 9, 12], }),
    new Student({ name: 'Marty', surname: 'McFly', age: '12', marks: [9, 8, 9, 9, 11], })],
}

let sConfig = {
    name: 'f',
    surname: 'l',
    age: 12,
    marks: [],
}
// instances
let human1 = new Human(hConfig);
let teacher1 = new Teacher(tConfig);
let student1 = new Student(sConfig);
// tests
// teacher1
console.log(teacher1.getStudentByName('Joe'));
console.log(teacher1.getListOfNamesByAverageMark());
teacher1.removeStudentByName('Bill');
teacher1.updateStudentByName(student1, 'Marty');
console.log(teacher1);
// human1
console.log(human1.getFullName());
human1.setFullName(human1.getFullName());
// student1
console.log(student1.getFullName());