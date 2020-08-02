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
        if (this.visible) {
            html = /*html*/`
            <i-morph-share icon="fb"></i-morph-share>
            <i-morph-share icon="in"></i-morph-share>
            <i-morph-share icon="ln"></i-morph-share>
            <i-morph-share icon="tg"></i-morph-share>
            <i-morph-share icon="tw"></i-morph-share>
            <i-morph-share icon="wa"></i-morph-share>  
            `
        }
        return html;
    }
}