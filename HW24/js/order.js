import {StoreService} from './store-service.js'

export let orderStore = new StoreService();

export class Order {

    constructor({size, ingridients, status}) {
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
        let payment = confirm(`Оплатить ${cost}$?`);
        return payment;
    }

    static getDone(size, feedback) {
        let done = false;

        switch (+size) {
            case 0: {
                if (Order.getPayment(5)) {
                    done = true;
                    Order.deliteError(feedback);
                } else {
                    Order.showError(feedback);
                }
            };
                break;
            case 1: {
                if (Order.getPayment(10)) {
                    done = true;
                    Order.deliteError(feedback);
                } else {
                    Order.showError(feedback);
                }
            };
                break;
            case 2: {
                if (Order.getPayment(15)) {
                    done = true;
                    Order.deliteError(feedback);
                } else {
                    Order.showError(feedback);
                }
            };
                break;

        }

        return done;
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