
class ThemeToggling extends HTMLElement {
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

            .animLeftFill {
                fill: #fff;
                opacity: 0.2;
            }
            .animRightFill {
                fill: #000 !important;
            }

            #left, #right {
                opacity: 0.2;
            }
            #left .strokeArea {
                fill: #fff;

            }
           
            #right .strokeArea  {
                fill: #fff;
            }
            #right .fillArea {
                fill: none;
            }
           
            </style>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.34 74.6">
    <defs>

    </defs>
    <g id="themes_Kopie_2_Kopie" data-name="themes Kopie 2 Kopie">
    <g id="left">
    <path class="fillArea" d="M34.64,82.9a7.09,7.09,0,0,1-.79,0,33.11,33.11,0,0,1,0-65.72,7,7,0,0,1,7.76,7V75.89A7,7,0,0,1,34.64,82.9Z" transform="translate(-0.41 -12.7)"/>
    <path class="strokeArea" d="M34.64,21.5a2.59,2.59,0,0,1,2.57,2.61V75.89a2.59,2.59,0,0,1-2.57,2.61l-.29,0a28.7,28.7,0,0,1,0-57l.29,0m0-8.8a11.15,11.15,0,0,0-1.29.07,37.51,37.51,0,0,0,0,74.46,11.15,11.15,0,0,0,1.29.07A11.4,11.4,0,0,0,46,75.89V24.11A11.4,11.4,0,0,0,34.64,12.7Z" transform="translate(-0.41 -12.7)"/>
    </g>
    <g id="right">
    <path class="fillArea" d="M62.57,82.88a7,7,0,0,1-6.94-7V24.1a7,7,0,0,1,6.94-7,6.79,6.79,0,0,1,.78,0,33.08,33.08,0,0,1,0,65.67A5.11,5.11,0,0,1,62.57,82.88Z" transform="translate(-0.41 -12.7)"/>
    <path class="strokeArea" d="M62.57,21.49l.29,0a28.71,28.71,0,0,1,0,57l-.29,0A2.6,2.6,0,0,1,60,75.9V24.1a2.6,2.6,0,0,1,2.57-2.61m0-8.75A11.36,11.36,0,0,0,51.25,24.1V75.9A11.36,11.36,0,0,0,62.57,87.26a11.13,11.13,0,0,0,1.28-.08,37.46,37.46,0,0,0,0-74.36,11.13,11.13,0,0,0-1.28-.08Z" transform="translate(-0.41 -12.7)"/>
    </g>
    </g>
    </svg>
   
    `
        this.root = this.attachShadow({ mode: "open" })
        this.root.innerHTML = this.html;
        console.log(this.root.querySelector('#left'));
        console.log(this.root.querySelector('#right'));
        this.addEventListener("click", () => {
            this.root.querySelector('#left .fillArea').classList.toggle("animLeftFill");
            this.root.querySelector('#right .fillArea').classList.toggle("animRightFill");
        })

    }

}
customElements.define("i-toggle-themes", ThemeToggling);