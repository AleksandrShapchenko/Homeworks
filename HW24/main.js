import { orderStore, Order } from './js/order.js';
import { validateCheckboxesOnRequired } from './js/validate.js';

let newOrder;
let formWrapper;

window.onload = init;

function init() {

    let order = document.querySelector('#order');

    order.onclick = function () {

        formWrapper = document.querySelector('.form-wrapper');
        let fillOutForm = document.querySelector('.fill-out-form');

        let ingridients = Order.getSelectedCheckboxValues('gridCheck');

        let invalidIngridients = fillOutForm.querySelector('.invalid-feedback');
        let invalidPayment = document.querySelector('.invalid-feedback.payment');

        if (!validateCheckboxesOnRequired(ingridients, invalidIngridients)) {
            return false;
        }

        let size = fillOutForm.elements.gridRadios.value,
            status;

        Order.getDone(size, invalidPayment).then(() => {
            newOrder = new Order({ size, ingridients, status });
            orderStore.setItem(newOrder);
            return 'ordered';
        }).then((status) => {
            setStatus(status);
            showMessage('Пожалуйста подождите, пицца готовится.');
            return getCooked();
        }).then((status) => {
            setStatus(status);
            showMessage('Пожалуйста подождите, курьер доставляет пиццу.');
            return getDeliveried();
        }).then((status) => {
            setStatus(status);
            showMessage('Пицца доставлена, приятного аппетита.');
            showFeedback();
        }).catch((error) => {
            throw error;
        })

    }

}

function getCooked() {
    return new Promise((resolve, reject) => {
        if (newOrder.status == 'ordered') {
            setTimeout(() => {
                resolve('cooked')
            }, 2000)
        } else {
            reject(new Error('pizza is not ordered'))
        }
    })
}

function getDeliveried() {
    return new Promise((resolve, reject) => {
        if (newOrder.status == 'cooked') {
            setTimeout(() => {
                resolve('deliveried')
            }, 2000)
        } else {
            reject(new Error('pizza is not cooked'))
        }
    })
}

function showFeedback() {
    if (newOrder.status == 'deliveried') {
        getFeedback(formWrapper);
        feedbackEvent(formWrapper);
    } else {
        throw new Error('feedback error');
    }
}

function setStatus(status) {
    newOrder.status = status;
}

function showMessage(message) {
    formWrapper.innerHTML = `<p>Спасибо за заказ. ${message}</p>`;
}

function getFeedback(form) {
    form.innerHTML += `<p>Пожалуйста оцените качесвто сервиса:</p> <br> <div type='submit' id='button-like'><i class='icon-heart'></i></div> <div type='submit' id='button-dislike'><i class='icon-heart-broken'></i></div>`;
    return true;
}

function feedbackEvent(form) {

    let buttonLike = document.querySelector('#button-like');

    buttonLike.onclick = function () {
        form.innerHTML = '<p>Спасибо, мы очень рады что вам понравилось.</p>';
    }

    let buttonDislike = document.querySelector('#button-dislike');

    buttonDislike.onclick = function () {
        form.innerHTML = '<p>Спасибо, мы будем стараться лучше.</p>';
    }
}




