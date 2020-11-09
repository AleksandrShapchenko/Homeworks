import { validateInputs, validEmail, validName, validPassword, validRepeatPas } from './js/validation.js';
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

    function onSubmit(event) {
        event.preventDefault();

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

}

export function controlFeedback(elem, text, elemName) {
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

export function btnDisableControl(cb, elem) {
    if (!cb) {
        elem.setAttribute('disabled', 'true');
    } else {
        elem.removeAttribute('disabled');
    }
}