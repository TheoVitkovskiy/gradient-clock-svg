
class iFullScreen extends HTMLElement {
    constructor() {
        super();
        this.html = /*html*/`
            <style>
            :host {
                
                width: 100%;
                height: 100%;
               
            }
           .full-screen {
               transform-origin: center;
                transform: scale(0.7);
                
            }
            
            
                
            </style>
            
    
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.25 98.25">
<g id="Ebene_12" data-name="Ebene 12">
<g style="opacity:0.2"><rect x="5" y="5" width="88.25" height="88.25" rx="19.3" style="fill:#fff"/>
<path id="square" d="M74.83,10.88a14.3,14.3,0,0,1,14.3,14.29V74.83a14.31,14.31,0,0,1-14.3,14.3H25.17a14.3,14.3,0,0,1-14.29-14.3V25.17A14.29,14.29,0,0,1,25.17,10.88H74.83m0-10H25.17A24.31,24.31,0,0,0,.88,25.17V74.83a24.32,24.32,0,0,0,24.29,24.3H74.83a24.33,24.33,0,0,0,24.3-24.3V25.17A24.32,24.32,0,0,0,74.83.88Z" transform="translate(-0.88 -0.88)"/>
</g>
</g>
</svg>
    `
        this.root = this.attachShadow({ mode: "open" })
        this.root.innerHTML = this.html;
        this.addEventListener("click", () => {
            this.root.querySelector('#square').classList.add("full-screen");

        })
    }
}
customElements.define("i-full-screen", iFullScreen);