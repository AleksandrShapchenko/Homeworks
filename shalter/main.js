window.onload = init;

function init() {
    let describe = document.querySelector('#describe');
    let getList = document.querySelector('#getList');
    let get = document.querySelector('#get');
    let errorSpan = document.createElement('span');
    errorSpan.classList.add('message');

    describe.onclick = function () {

        let fillOutForm = document.getElementById('fill-out-form');
        let elementsForms = fillOutForm.elements;
        let radioValue = fillOutForm.elements.who.value;
        console.log('validate - ', validateFormOnRequired(elementsForms));
        

        if(!validateFormOnRequired(elementsForms)) {
            errorSpan.classList.add('error');
            errorSpan.textContent = 'Заполните все поля!';
            fillOutForm.append(errorSpan);
            return false;
        }else {
            errorSpan.classList.remove('error');
        }

        let color = elementsForms.color.value,
            breed = elementsForms.breed.value,
            name = elementsForms.name.value,
            number = elementsForms.number.value;

        Animal.describeAnimal({
            cat: +radioValue == 0,
            dog: +radioValue == 1,
            color,
            breed,
            name,
            number: +number
        });
    }

    getList.onclick = function () {
        let list = document.querySelector('#list');

        list.innerHTML = Animal.getAnimalsList();
    }

}

function validateFormOnRequired(elements) {
    let valid = true;
    let validTypes = ['text', 'number'];
    
    for (const elem of elements) {
        if(validTypes.includes(elem.type)){
            if(!elem.value.length) {
                valid = false;
                elem.classList.add('error');
                elem.classList.remove('success');

            } else {
                elem.classList.add('success');
                elem.classList.remove('error');
            }
        }

    }

    return valid;
}