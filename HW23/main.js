document.addEventListener('DOMContentLoaded', init);

function init() {
    // let form = document.querySelector('#form');
    let inputs = document.querySelector('#inputs');
    let email = inputs.querySelector('#email');
    let name = inputs.querySelector('#name');
    let password = inputs.querySelector('#password');
    let repeatPassword = inputs.querySelector('#repeat-password');
    let invalidEmail = inputs.querySelector('#invalid-email');
    let invalidName = inputs.querySelector('#invalid-name');
    let invalidPassword = inputs.querySelector('#invalid-password');
    let invalidRepeatPassword = inputs.querySelector('#invalid-repeat-password');
    let btnSubmit = document.querySelector('#btn-sumbit');

    validateInputs(inputs);

}

function validateInputs(elements) {
    let valid = true;
    let validTarget = elements.querySelectorAll('input');
    console.log(validTarget);

    for (const elem of validTarget) {
        if (!elem.value.length) {
            valid = false;
            elem.classList.add('error');
            elem.classList.remove('success');
        } else {
            elem.classList.add('success');
            elem.classList.remove('error');
        }
    }

    return valid;
}