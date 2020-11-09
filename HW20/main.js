import { List } from './js/class/listClass.js';

let ol = document.querySelector('#ol');
let menuElem = document.querySelector('#menu');
let inputDeal = document.querySelector('#input-deal');

class Menu {

    constructor(elem, list) {
        this._elem = elem;
        this.list = list;
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
        let lists = deals.list.querySelectorAll('li');

        deleteSelected(lists);
    }

    sort() {
        let classSelected = document.querySelectorAll('.selected');

        let arrLi = Array.from(classSelected);

        arrLi.forEach(elem => this.list.append(elem));

    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

let menu = new Menu(menuElem, ol);
let deals = new List(ol);

window.onload = init;

function init() {

    deals.list.addEventListener('mousedown', function (event) {
        event.preventDefault();
    })

    deals.list.addEventListener('click', function (event) {

        if (event.target == this) {
            return false;
        }

        if (event.target.classList.contains('selected')) {
            if (event.ctrlKey) {
                deals.clearSelected(event);
                return;
            } else {
                deals.clearAll(this.children);
                return;
            }
        } else {
            if (!event.ctrlKey) {
                deals.clearAll(this.children);
            }

            deals.addSelected(event.target);
        }
    })

    console.log(menu);
}

function setListToStart(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    deals.list.prepend(li);
}

function setListToEnd(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    deals.list.append(li);
}

function deleteSelected(elems) {
    elems.forEach(element => {
        if (element.classList.contains('selected')) {
            element.remove();
        }
    })
}
