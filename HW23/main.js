import { Human } from './js/people.js';
import { People } from './js/people.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
    let form = document.querySelector('#form');
    let btnSubmit = document.querySelector('#btn-submit');

    form.addEventListener('input', onInput);

    function onInput() {
        btnDisableControl(validateInputs(form.elements), btnSubmit);

        validEmail(form.elements.email, btnSubmit);
        validName(form.elements.name);
        validPassword(form.elements.password);
        validRepeatPas(form.elements.repeatPassword, btnSubmit);
    }

    form.addEventListener('submit', onSubmit);

    function onSubmit() {
        preventDefault();

        let personConfig = {
            email: form.elements.email.value,
            name: form.elements.name.value,
            password: form.elements.password.value,
        }

        let newPerson = new Human(personConfig);
        People.setHuman(newPerson);
        console.log(newPerson);
        console.log(People.peopleStore);

    }

    // form.onsubmit = function() {
    //     preventDefault();

    //     let personConfig = {
    //         email: form.elements.email.value,
    //         name: form.elements.name.value,
    //         password: form.elements.password.value,
    //     }

    //     let newPerson = new Human(personConfig);
    //     People.setHuman(newPerson);
    //     console.log(newPerson);
    //     console.log(People.peopleStore);
    // }

}

function validateInputs(elements) {
    let valid = true;

    Array.prototype.map.call(elements, elem => {
        if (elem.name) {
            if (!elem.value.length) {
                valid = false;
                elem.classList.add('error');
                elem.classList.remove('success');
            } else {
                elem.classList.add('success');
                elem.classList.remove('error');
            }

        }
    })

    return valid;
}

function validEmail(email, btnElem) {

    if (!email.value.includes('@')) {
        email.classList.add('error');
        email.classList.remove('success');
        btnDisableControl(false, btnElem);
    }

    controlFeedback(email, 'Неправильный формат email', 'email');
}

function validName(name) {
    controlFeedback(name, 'Введите корректное имя', 'name');
}

function validPassword(password) {
    controlFeedback(password, 'Введите надёжный пароль', 'password');
}

function validRepeatPas(repeatPas, btnElem) {

    if (repeatPas.value !== form.elements.password.value) {
        repeatPas.classList.add('error');
        repeatPas.classList.remove('success');
        btnDisableControl(false, btnElem);
    }

    controlFeedback(repeatPas, 'Пароли не совпадают', 'repeatPas');
}

function controlFeedback(elem, text, elemName) {
    let feedback;

    if (elem.classList.contains('error') && !elem.dataset.feedback) {
        feedback = document.createElement('div');
        feedback.className = `invalid-feedback ${elemName}`;
        feedback.textContent = text;
        elem.setAttribute('data-feedback', 'true');
        elem.after(feedback);
    } else if (!elem.classList.contains('error') && elem.dataset.feedback) {
        elem.removeAttribute('data-feedback');
        form.querySelector(`.invalid-feedback.${elemName}`).remove();
    }

}

function btnDisableControl(cb, elem) {
    if (!cb) {
        elem.setAttribute('disabled', 'true');
    } else {
        elem.removeAttribute('disabled');
    }
}