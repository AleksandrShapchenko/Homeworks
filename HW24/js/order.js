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
                resolve()
            } else {
                reject()
            }
        });
    }

    static getDone(size, feedback) {
        let done = false;

        switch (+size) {
            case 0: {
                Order.getPayment(5).then(() => {
                    Order.deliteError(feedback);
                    done = true;
                }).catch(() => {
                    Order.showError(feedback);
                })
            };
                break;
            case 1: {
                Order.getPayment(10).then(() => {
                    Order.deliteError(feedback);
                    done = true;
                }).catch(() => {
                    Order.showError(feedback);
                })
            };
                break;
            case 2: {
                Order.getPayment(15).then(() => {
                    Order.deliteError(feedback);
                    done = true;
                }).catch(() => {
                    Order.showError(feedback);
                })
            };
                break;

        }
        console.log(done);
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