// полчаю пиццу в зависимости от размера
let order = getOrderPizza('Заказать маленькую пиццу - 0; среднюю - 1 ; большая - 2');

// ИСПРАВЛЕНО - если ордер вернулся валидным
if(order != -1) {
    // проверка готовности 
    if (getDone(order)) {
        console.log('Пицца готова');
    
        // доставка и отзыв 
        takePizza();
        pizzaDeliveried();
        getFeedback();
    
    } else {
        console.log('Пицца не готова');
    }
}


// декларируем функции 
function getOrderPizza(orderMessage) {
    let order = prompt(orderMessage);

    if (validateOrder(order)) {
        return  +order;
    } 
    // ИСПРАВЛЕНО - если ордер валидный
    return -1;
}

function validateOrder(order) {
    let valid = false;

    if (isNaN(order)) {
        log('Введите число', 'error');
    } else if (order == null) {
        log('Вы отменили!', 'info');
    } else {
        valid = true;
    }

    return valid;
}

function getPayment(cost) {
    // ИСПРАВЛЕНО - ДОБАВЛЕН аргумент cost
    let payment = confirm(`Оплатить ${cost}$?`);
    return payment;
}

function cooking(action) {
    let status = action === 0 ? 'маленькая' :
                 action === 1 ? 'средняя' : 'большая';

    log(`Готовим ${status}`, 'info');
    log(`Готовим ${status}`, 'info');
    log(`Готовим ${status}`, 'info');
    return true;
}

function getDone(order) {
    let done = false;

    switch (order) {
        case 0: {
            if (getPayment(5)) {
                done = cooking(0)
            } else {
                log('Вы не оплатили', 'error');
            }
        };
        break;
        case 1: {
            if (getPayment(10)) {
                done = cooking(1)
            } else {
                log('Вы не оплатили', 'error');
            }
        };
        break;
        case 2: {
            if (getPayment(15)) {
                done = cooking(2)
            } else {
                log('Вы не оплатили', 'error');
            }
        };
        break;

        default: {
            log('Введите от 1 до 3', 'error');
        }
    }

    return done;
}

function takePizza() {
    log('Курьер забрал пиццу');
}

function pizzaDeliveried() {
    log('Курьер доствил пиццу');
}

function getFeedback() {
    let feedback = confirm('Вам все понравилось ?');

    if (feedback) {
        log('Спасибо');
    } else {
        log('Мы исправимся для Вас!');
    }
}

function log(message, type = null) {
    if (type == 'info') {
        console.info(message);
    } else if (type == 'error') {
        console.error(message);
    } else {
        console.log(message);
    }
}