class Vierkant extends HTMLElement {

    shadowRoot;
    templateId = 'vierkant-template';
    elementId = 'click-vierkant';

    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'});
        this.state = {
            vierkantClicks: 0
        };
        
        // init templates
        const template = document.getElementById(this.templateId);
        const clone = template.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);

        // init style
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "stylesheets/components/vierkant.css");
        this.shadowRoot.appendChild(linkElem);

        // init events
        this.addEventListener('click', e => {
            this.shadowRoot.dispatchEvent(new Event('vierkantClick', {composed: true}));
        });
    }

    // Override
    connectedCallback() {
        this.shadowRoot.querySelector('div')
            .classList.add(this.getAttribute('color'));
    }

    // Override
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) return;
        this[ property ] = newValue;
    }

    setState(key, value) {
        this.state[key] = value;
        const bindings = this.shadowRoot.querySelectorAll(`[data-bind$="${key}"]`);

        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
        bindings.forEach(node => {
            node.textContent = this.state[key];
        })
    }
}

customElements.define('click-vierkant', Vierkant);

export {Vierkant};
