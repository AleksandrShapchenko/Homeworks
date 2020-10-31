import { controlFeedback, btnDisableControl } from '../main.js';

export function validateInputs(elements) {
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

export function validEmail(email, btnElem) {

    if (!email.value.includes('@') || email.value.match(' ')) {
        email.classList.add('error');
        email.classList.remove('success');
        btnDisableControl(false, btnElem);
    }

    controlFeedback(email, 'Неправильный формат email', 'email');
}

export function validName(name) {
    controlFeedback(name, 'Введите корректное имя', 'name');
}

export function validPassword(password) {
    controlFeedback(password, 'Введите надёжный пароль', 'password');
}

export function validRepeatPas(repeatPas, btnElem) {

    if (repeatPas.value !== form.elements.password.value) {
        repeatPas.classList.add('error');
        repeatPas.classList.remove('success');
        btnDisableControl(false, btnElem);
    }

    controlFeedback(repeatPas, 'Пароли не совпадают', 'repeatPas');
}