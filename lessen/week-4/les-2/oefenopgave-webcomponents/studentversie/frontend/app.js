import {Template} from "./modules/template.js";
import {Cirkel} from "./components/cirkel.js";

console.log("MODULE app");

const make_body = Template.new(`
<div id="app" class="app">
    <h1>Blokken</h1>
    <button>reset</button>
    <div class="container">
        <${Cirkel.tag}></${Cirkel.tag}>
    </div>
</div>
<link rel="stylesheet" href="stylesheets/app.css">
`);

class App extends HTMLElement {

    shadowRoot;
    container;
    button;

    static get tag() { return 'click-app' }

    constructor() {
        super(); // always call super() first in the ctor.

        this.shadowRoot = this.attachShadow({mode: 'open'})

        // init template
        this.shadowRoot.appendChild(make_body())

        // cache elems
        this.container = this.shadowRoot.querySelector(".container");
        this.button    = this.shadowRoot.querySelector("button");
        
        // init events
        const add_cirkel = () => this.container.appendChild(new Cirkel())

        this.addEventListener('cirkelClick', add_cirkel);

        this.button.addEventListener("click", e => {
            this.container.querySelectorAll(Cirkel.tag).forEach(e => e.remove())
            add_cirkel();
        });
    }
}

customElements.define(App.tag, App);