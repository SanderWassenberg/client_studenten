import { Template } from "../modules/template.js";

console.log("MODULE cirkel");

const make_body = Template.new(`
<div class="cirkel">
    <p data-bind="cirkel-nummer"></p>
</div>
<link rel="stylesheet" href="stylesheets/components/cirkel.css">
`);

class Cirkel extends HTMLElement {

    shadowRoot;

    static get tag() { return 'click-cirkel' }

    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'});

        // init template
        this.shadowRoot.appendChild(make_body());

        // init events
        this.addEventListener('click', e => {
            this.shadowRoot.dispatchEvent(new Event('cirkelClick', {composed: true}));
        });
    }
}

customElements.define(Cirkel.tag, Cirkel);

export {Cirkel};
