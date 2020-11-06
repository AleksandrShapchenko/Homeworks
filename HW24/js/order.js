import { StoreService } from './store-service.js'

export let orderStore = new StoreService();

export class Order {

    constructor({ size, ingridients, status }) {
        this.size = size;
        this.ingredients = ingridients;
        this.status = status;
    }

    static getSelectedCheckboxValues(name) {
        const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
        let values = [];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
        return values;
    }

    static getPayment(cost = '') {
        return new Promise((resolve, reject) => {
            let payment = confirm(`Оплатить ${cost}$?`);
            if (payment) {
                resolve();
            } else {
                reject(new Error('payment failed'));
            }
        })
    }

    static getDone(size, feedback) {
        let cost;

        return new Promise((resolve, reject) => {
            if (+size == 0) {
                cost = 5;
                resolve();
            } else if (+size == 1) {
                cost = 10;
                resolve();
            } else if (+size == 2) {
                cost = 15;
                resolve();
            } else {
                reject(new Error('uncorrect size or cost data'));
            }
        }).then(() => {
            return Order.getPayment(cost);
        }).then(() => {
            return Order.deliteError(feedback);
        }).catch((error) => {
            Order.showError(feedback);
            throw error;
        })
    }

    static showError(feedback) {
        feedback.classList.add('show');
    }

    static deliteError(feedback) {
        feedback.classList.remove('show');
    }

    static createNewOrder() {
        return new Order({
            size,
            ingredients,
            status,
        })
    }

}