// 1. Написать функцию конструктор Student, которую я смогу использовать вот так:

// let s = new Student('Student 1', [10,9,8,1,10]), // имя, оценки
// У каждого студента должен быть методы

// averageMark() - возвращает среднюю оценку
// minMark() - возвращает минимальную оценку
// maxMark() - возвращает максимальную оценку

// 2. Создать массив students и с помощью for заполнить его 5-ю экзэмплярами студентов с разным именем и оценками. Создать глобальную функцию findMaxMark(), которая находит студента в массиве с наибольшей оценкой

function Student(name, marks) {
    this.name = name;
    this.marks = marks;
}

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

let st = new Student('Andrew', [3, 2, 6, 9, 1, 8, 2]);
let st1 = new Student('Sasha', [7, 8, 5, 7, 4, 5, 5]);
let st2 = new Student('Misha', [4, 4, 6, 10, 4, 2, 6]);
let st3 = new Student('Vasya', [2, 1, 2, 9, 8, 1, 7]);
let st4 = new Student('Petya', [3, 6, 2, 9, 5, 3, 7]);

let students = [st, st1, st2, st3, st4];

function findMaxMark(array) {
    let studentsAvMarks = array.map(item => item = item.averageMark());
    let bestStMark = studentsAvMarks[0];
    for (let mark of studentsAvMarks) {
        if (bestStMark < mark) bestStMark = mark;
    }
    return bestStMark;
}

console.log(st.averageMark());
console.log(st.minMark());
console.log(st.maxMark());
console.log(findMaxMark(students));