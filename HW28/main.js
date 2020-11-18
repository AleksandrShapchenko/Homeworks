document.addEventListener('DOMContentLoaded', init);

function init() {
    customElements.define('alert-component', AlertComponent);
    let alertComponent = document.querySelector('alert-component');

    let btn = document.querySelector('#btn');

    btn.addEventListener('click', (e) => {
        alertComponent.setAttribute('type', 'success');
        alertComponent.setAttribute('message', 'Вы успешно отправили сообщение');
        console.log(alertComponent.type, alertComponent.message);
        console.log(alertComponent);
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
        console.log(this.shadowRoot.type);

        // let message = this.getAttribute('message');
        // let type = this.getAttribute('type');
        // this.innerHTML = `
        // <link rel="stylesheet" href="./css/${type}.css">
        // <p>${message}</p>
        // `
    }
}

