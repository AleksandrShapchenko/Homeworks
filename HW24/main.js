import {orderStore, Order} from './js/order.js';
import {validateCheckboxesOnRequired} from './js/validate.js';

let newOrder;

window.onload = init;

function init() {

    let order = document.querySelector('#order');

    order.onclick = function () {

        let formWrapper = document.querySelector('.form-wrapper');
        let fillOutForm = document.querySelector('.fill-out-form');

        let ingridients = Order.getSelectedCheckboxValues('gridCheck');

        let invalidIngridients = fillOutForm.querySelector('.invalid-feedback');
        let invalidPayment = document.querySelector('.invalid-feedback.payment');

        if (!validateCheckboxesOnRequired(ingridients, invalidIngridients)) {
            return false;
        }

        let size = fillOutForm.elements.gridRadios.value,
            status = 'ordered';

        if (!Order.getDone(size, invalidPayment, formWrapper)) {
            return false;
        }

        newOrder = new Order({ size, ingridients, status });

        orderStore.setItem(newOrder);

        setTimeout(showOrderProcess, 500, formWrapper, 'ordered', 'Пожалуйста подождите, пицца готовится.');
        setTimeout(showOrderProcess, 5000, formWrapper, 'cooked', 'Пожалуйста подождите, курьер доставляет пиццу.');
        setTimeout(showOrderProcess, 10000, formWrapper, 'deliveried', 'Пицца доставлена, приятного аппетита.');
        setTimeout(getFeedback, 10000, formWrapper);
        setTimeout(feedbackEvent, 10000, formWrapper);
    }

}

function showOrderProcess (form, status, message) {
    newOrder.status = status;
    form.innerHTML = `<p>Спасибо за заказ. ${message}</p>`;
} 

function getFeedback(form) {
    form.innerHTML += `<p>Пожалуйста оцените качесвто сервиса:</p> <br> <div type='submit' id='button-like'><i class='icon-heart'></i></div> <div type='submit' id='button-dislike'><i class='icon-heart-broken'></i></div>`;
    return true;
}

function feedbackEvent (form) {

    let buttonLike = document.querySelector('#button-like');

    buttonLike.onclick = function () {
        form.innerHTML = '<p>Спасибо, мы очень рады что вам понравилось.</p>';
    }

    let buttonDislike = document.querySelector('#button-dislike');

    buttonDislike.onclick = function () {
        form.innerHTML = '<p>Спасибо, мы будем стараться лучше.</p>';
    }
}




