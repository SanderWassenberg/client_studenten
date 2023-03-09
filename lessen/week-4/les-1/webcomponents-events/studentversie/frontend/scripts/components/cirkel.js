class Cirkel extends HTMLElement {

    shadowRoot;
    templateId = 'click-cirkel-tpl';
    elementId = 'click-cirkel';

    bindings  = {}; // getters/setters
    #bindings = {}; // backing fields

    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'});
        
        this.#defineBindingProperty("cirkelClicks", 0)

        // init template
        let template = document.getElementById(this.templateId);
        let clone = template.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
        
        // init style
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "stylesheets/components/cirkel.css");
        this.shadowRoot.appendChild(linkElem);

        // init events
        this.addEventListener('click', e => {
            this.shadowRoot.dispatchEvent(new Event('cirkelClick', {composed: true}));
            this.bindings.cirkelClicks++
        });
    }

    #defineBindingProperty(name, value) {

        // DO NOT REPLACE ARROW FUNCTIONS WITH function(), THEY MESS UP THE VALUE OF `this`
        this.bindings.__defineGetter__(name, () => this.#bindings[name])
        this.bindings.__defineSetter__(name, val => {
            // update backing field
            this.#bindings[name] = val;
            // update bound fields
            for (const node of this.shadowRoot.querySelectorAll(`[data-bind$="${name}"]`)) {
                node.textContent = val;
            }
        })
        this.bindings[name] = value;
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
}

customElements.define('click-cirkel', Cirkel);

export {Cirkel};
