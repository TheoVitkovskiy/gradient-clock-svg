export default class ShareUi extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: "open"})
    }
    static get observedAttributes() {
        return [
            'visible'
        ]
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        this.renderHtml(); 
    }
    get visible() {
        return this.hasAttribute("visible")
    }
    renderHtml() {
        this.root.innerHTML = /*html*/`
        <style>
            :host {
                display: flex;
                justify-content: space-around;
            }
            :host > * {
                margin: 0 5px;
            }
            :host > *:nth-child(even) {
                transform: translateY(10px);
            } 
            
        @media only screen and (max-width: 450px) {
            
            :host {
                width: 100%; 
                display: flex;
                flex-wrap: wrap;
            }
                
            :host > * {
                margin: 0;
                width: 30%;
            }
            :host > *:nth-child(even) {
                transform: translateY(0px);
            } 
        }
        </style>
            ${this.html()}
        `
    }
    html() {
        let html = '';
        // const stepDuration = 150;
        const stepFactor = 1.25;
        let appearDelay = 100;

        const icons = ['fb', 'in', 'ln', 'tg', 'tw', 'wa'];
        if (this.visible) {
            html = icons
            .map((icon) => {
                // return '<h1>' + icon + '</h1>';
                return /*html*/`
                <i-morph-share 
                    icon='${icon}'
                    appeardelay='${appearDelay = appearDelay * stepFactor }'
                ></i-morph-share>`
            })
            .join((''));
        }
        return html;
    }
}