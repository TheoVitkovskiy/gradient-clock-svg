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
        console.log("jkj")
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
            <!-- <i-morph-share icon="ln"></i-morph-share>-->
            <i-morph-share icon="tg"></i-morph-share>
            <!-- <i-morph-share icon="tw"></i-morph-share>  -->
            `
        }
        return html;
    }
}