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
            return showOrderProcess();
        }).catch(() => {
             console.log('error');
        })

    }

}

function showOrderProcess() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let message = 'Пожалуйста подождите, пицца готовится.';
            newOrder.status = 'ordered';
            formWrapper.innerHTML = `<p>Спасибо за заказ. ${message}</p>`;
            resolve();
        }, 500)
    }).then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let message = 'Пожалуйста подождите, курьер доставляет пиццу.';
                    newOrder.status = 'cooked';
                    formWrapper.innerHTML = `<p>Спасибо за заказ. ${message}</p>`;
                    resolve();
                }, 2000)
            })
        }).then(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    let message = 'Пицца доставлена, приятного аппетита.';
                    newOrder.status = 'deliveried';
                    formWrapper.innerHTML = `<p>Спасибо за заказ. ${message}</p>`;
                    resolve();
                }, 4000)
            })
        }).then(() => {
            return new Promise((resolve) => {
                getFeedback(formWrapper);
                feedbackEvent(formWrapper);
                resolve();
            })
        })

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




