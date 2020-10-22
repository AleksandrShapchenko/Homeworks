let ol = document.querySelector('#ol');
let menu = document.querySelector('#menu');
let inputDeal = document.querySelector('#input-deal');

function setListToStart(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    ol.prepend(li);
}

function setListToEnd(deal) {
    let li = document.createElement('li');
    li.textContent = `${deal.value}`;
    ol.append(li);
}

function clearSelected(elem) {
    elem.target.classList.remove('selected');
}

function clearAll(elems) {
    for (let elem of elems) {
        elem.classList.remove('selected');
    }
}

function addSelected(target) {
    target.classList.add('selected');
}

function deleteSelected(elems) {
    elems.forEach(element => {
        if (element.classList.contains('selected')) {
            console.log(element);
            element.remove();
        }
    })
}

ol.addEventListener('mousedown', function (event) {
    event.preventDefault();
})

ol.addEventListener('click', function (event) {

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

class Menu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this); // (*)
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
        let lists = ol.querySelectorAll('li');

        deleteSelected(lists);
    }

    sort() {
        const lists = ol.querySelectorAll('li');

        const arrLists = Array.from(lists);

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
        console.log(arrLists);



        for (let i = 0; i < arrLists.length; i++) {
            console.log(arrLists);
            lists[i].textContent = arrLists[i].textContent;
            
            debugger;
        }
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    };
}

console.log(new Menu(menu));

