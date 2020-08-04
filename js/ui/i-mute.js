
export default class iMute extends HTMLElement {
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
            .bar {
                display: none;
            }
            .sound-on {
                display: block;
            }
            
            .cls-1{opacity: var(--ui-icon-opacity);}
            .cls-2{fill:#fff;}
            .cls-3,.cls-4,.cls-5,.cls-6{fill:none;stroke:#fff;stroke-miterlimit:10;}
            .cls-3,.cls-4{stroke-width:4px;}.cls-4,.cls-5,.cls-6{stroke-linecap:round;}
            .cls-5{stroke-width:4.66px;}.cls-6{stroke-width:2px;}
            </style>
            
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 101">
    
    <g id="mute_Kopie_Kopie" data-name="mute Kopie Kopie">
    <g class="cls-1"><path d="M60.53,77.69a8.26,8.26,0,0,1-5.26-2l-9.05-7.45a6.69,6.69,0,0,1-3.86,1.23H23.1c-4.09,0-7.29-3.7-7.29-8.42V39.25c0-4.73,3.2-8.42,7.29-8.42H42.36a6.66,6.66,0,0,1,4,1.3l7.76-7.41a8.41,8.41,0,0,1,5.77-2.41c5.21,0,9.23,4.86,9.36,11.3l.67,32.16a12.86,12.86,0,0,1-3.34,9.28A8.43,8.43,0,0,1,60.53,77.69Z" transform="translate(-1)"/>
    <path class="cls-2" d="M59.85,27.5C62,27.5,64,30.05,64,33.71l.67,32.17c.08,3.81-1.94,6.62-4.16,6.62a3.1,3.1,0,0,1-2-.77L44.46,60.12v1c0,1.78-.93,3.23-2.1,3.23H23.1c-1.16,0-2.1-1.45-2.1-3.23V39.25c0-1.78.94-3.24,2.1-3.24H42.36c1.17,0,2.1,1.46,2.1,3.24v1.82l13.2-12.6a3.16,3.16,0,0,1,2.19-1m0-10.38h0A13.58,13.58,0,0,0,50.5,21l-5.26,5a12.34,12.34,0,0,0-2.88-.34H23.1c-7,0-12.48,6-12.48,13.61V61.1c0,7.63,5.48,13.61,12.48,13.61H42.36a11.65,11.65,0,0,0,3-.39L52,79.74a13.36,13.36,0,0,0,8.56,3.14,13.57,13.57,0,0,0,9.71-4.19,18.1,18.1,0,0,0,4.83-13L74.4,33.49C74.21,24.16,68,17.12,59.85,17.12Z" transform="translate(-1)"/>
    </g>
    <line class="cls-3" x1="84" y1="30" x2="84" y2="66"/>
    <line class="cls-4" x1="84" y1="30" x2="84" y2="66"/>
    <line class="cls-5" x1="92" y1="26.5" x2="92" y2="69.5"/>
    <line class="bar cls-6" x1="1" y1="1" x2="99" y2="100"/>
    </g>
    </svg>
    `
        this.root = this.attachShadow({ mode: "open" })
        this.root.innerHTML = this.html;
        this.addEventListener("click", () => {
            this.root.querySelector('.bar').classList.toggle("sound-on");
        })
    }
}