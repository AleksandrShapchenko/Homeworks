document.addEventListener('DOMContentLoaded', init);

function init() {
    customElements.define('alert-component', AlertComponent);
    let alertComponent = document.querySelector('alert-component');

    let btn = document.querySelector('#btn');

    btn.addEventListener('click', (e) => {
        if (alertComponent.getAttribute('type') == 'error') {
            alertComponent.setAttribute('type', 'success');
            alertComponent.setAttribute('message', 'Вы успешно отправили сообщение');
        } else if (alertComponent.getAttribute('type') == 'success') {
            alertComponent.setAttribute('type', 'info');
            alertComponent.setAttribute('message', 'Вы получили новое сообщение'); 
        } else {
            alertComponent.setAttribute('type', 'error');
            alertComponent.setAttribute('message', 'У вас ошибка'); 
        }

        console.log(alertComponent.getAttribute('type'));

    });

}

class AlertComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {

        this.attachShadow({
            mode: "open"
        });

        let message = this.getAttribute('message');
        let type = this.getAttribute('type');
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./css/${type}.css">
        <p>${message}</p>
        `

    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return ['type', 'message']
    }

    attributeChangedCallback(name, prev, curr) {
        console.log(name, prev, curr);

        let message = this.getAttribute('message');
        let type = this.getAttribute('type');
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./css/${type}.css">
        <p>${message}</p>
        `
    }
}

