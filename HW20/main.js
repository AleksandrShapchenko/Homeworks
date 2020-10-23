import { deals } from './js/instance/deals.js';
import { menu } from './js/instance/menu.js';
import { inputDeal } from '/js/DOMElements/inputDeal.js';

window.onload = init;

function init() {

    deals.ol.addEventListener('mousedown', function (event) {
        event.preventDefault();
    })

    deals.ol.addEventListener('click', function (event) {

        if (event.target == this) {
            return false;
        }

        if (event.target.classList.contains('selected')) {
            if (event.ctrlKey) {
                clearSelected(event);
                return;
            } else {
                clearAll(this.children);
                return;
            }
        } else {
            if (!event.ctrlKey) {
                clearAll(this.children);
            }

            addSelected(event.target);
        }
    })

    console.log(menu);
}

export class Menu {

    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    addStart() {
        if (inputDeal.value != '') {
            setListToStart(inputDeal);
        }
    }

    addEnd() {
        if (inputDeal.value != '') {
            setListToEnd(inputDeal);
        }
    }

    delete() {
        let lists = deals.ol.querySelectorAll('li');

        deleteSelected(lists);
    }

    sort() {
        let lists = deals.ol.querySelectorAll('li');

        let arrLists = Array.from(lists);

        arrLists.sort((a, b) => {
            let i = 0;
            console.log(a.textContent + i++);
            console.log(b.textContent);

            if (a.textContent < b.textContent)
                return -1

            if (a.textContent > b.textContent)
                return 1

            return 0
        })

        for (let i = 0; i < arrLists.length; i++) {
            lists[i].textContent = arrLists[i].textContent;
        }
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

function setListToStart(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    deals.ol.prepend(li);
}

function setListToEnd(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    deals.ol.append(li);
}

function deleteSelected(elems) {
    elems.forEach(element => {
        if (element.classList.contains('selected')) {
            element.remove();
        }
    })
}
