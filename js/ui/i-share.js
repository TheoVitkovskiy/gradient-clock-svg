
export default class IShare extends HTMLElement {
    constructor() {
        super();
        this.html = /*html*/`
            <style>
            :host {
                
                width: 100%;
                height: 100%;
               
            }
            :host svg {
                display: block;
                width: 100%;
                height: 100%;
            }
            .cls-1 {
                opacity: var(--ui-icon-opacity);
            }
            </style>
            
    
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 85">
<g id="Ebene_8" data-name="Ebene 8">
<g class="cls-1">
<circle cx="46" cy="14" r="9" style="fill:#fff"/>
<path d="M50,15a4,4,0,1,1-4,4,4,4,0,0,1,4-4M50,5A14,14,0,1,0,64,19,14,14,0,0,0,50,5Z" transform="translate(-4 -5)"/>
</g>
<g class="cls-1">
<circle cx="14" cy="71" r="9" style="fill:#fff"/>
<path d="M18,72a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-10A14,14,0,1,0,32,76,14,14,0,0,0,18,62Z" transform="translate(-4 -5)"/>
</g>
<g class="cls-1">
<circle cx="78" cy="71" r="9" style="fill:#fff"/>
<path d="M82,72a4,4,0,1,1-4,4,4,4,0,0,1,4-4m0-10A14,14,0,1,0,96,76,14,14,0,0,0,82,62Z" transform="translate(-4 -5)"/></g><line x1="42.27" y1="22.87" x2="18.91" y2="62.76" style="fill:#fff;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px;opacity: var(--ui-icon-opacity);"/>
<line x1="68.47" y1="71.48" x2="23.69" y2="71.03" style="fill:#fff;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:10px; opacity: var(--ui-icon-opacity);"/>
</g>
</svg>
    `
        this.root = this.attachShadow({ mode: "open" })
        this.root.innerHTML = this.html;
        
    }
}