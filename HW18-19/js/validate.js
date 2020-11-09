export function validateCheckboxesOnRequired(values, feedback) {
    let valid = true;

    if (values.length < 3) {
        valid = false;

        feedback.classList.add('show');
    } else {
        feedback.classList.remove('show');
    }

    return valid;
}