window.onload = init;

function init() {

    let teacher = new Teacher({
        name: 'Peter',
        surname: 'Parker',
        age: 30,
        group: [],
    });

    let describe = document.querySelector('#add-student');

    describe.onclick = function () {

        let fillOutForm = document.querySelector('#fill-out-form');
        let elementsForms = fillOutForm.elements;

        let inputGroupFullName = fillOutForm.querySelector('.full-name');
        let validationFullName = inputGroupFullName.querySelector('#validationFullName');

        let inputGroupMarks = fillOutForm.querySelector('.marks');
        let validationMarks = inputGroupMarks.querySelector('#validationMarks');
        let inputsMarks = inputGroupMarks.querySelectorAll('.form-control');

        if (!validateFormOnRequired(elementsForms)) {
            if (checkInputGroupForError(inputGroupFullName)) {
                validationFullName.classList.add('message');
            } else {
                validationFullName.classList.remove('message');
            }
    
            if (checkInputGroupForError(inputGroupMarks)) {
                validationMarks.classList.add('message');
            } else {
                validationMarks.classList.remove('message');
            }

            return false;
        } else {
            validationFullName.classList.remove('message');
            validationMarks.classList.remove('message');
        }

        let name = fillOutForm.elements.name.value,
            surname = fillOutForm.elements.surname.value,
            marks = Array.prototype.map.call(inputsMarks, (mark => mark.value));

        teacher.addStudentInGroup({
            name,
            surname,
            marks,
        });
        console.log(teacher.group);
    }

    let upgrade = document.querySelector('#upgrade-list');

    upgrade.onclick = function () {
        let listOfStudents = teacher.getListOfStudentsByAverageMark();
        let str = '';
        listOfStudents.forEach(student => {
            str += `<li> ${student.name} ${student.surname} ${student.averageMark()} </li>`;
        });

        document.querySelector('.list-of-students').innerHTML = str;
    }
}

function validateFormOnRequired(elements) {
    let valid = true;
    let validTypeText = 'text';
    let validTypeMarks = 'number';

    for (const elem of elements) {
        if (validTypeText.includes(elem.type)) {
            if (!elem.value.length) {
                valid = false;
                elem.classList.add('error');
                elem.classList.remove('success');
            } else {
                elem.classList.add('success');
                elem.classList.remove('error');
            }
        } else if (validTypeMarks.includes(elem.type)) {
            if (elem.value < 1 || elem.value > 10) {
                valid = false;
                elem.classList.add('error');
                elem.classList.remove('success');
            } else {
                elem.classList.add('success');
                elem.classList.remove('error');
            }
        }
    }

    return valid;
}

function checkInputGroupForError(inputGroup) {
    let include = false;
    let array = inputGroup.querySelectorAll('.error');

    if (array.length > 0) {
        include = true;
    }

    return include;
}
