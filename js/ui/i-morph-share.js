import anime from 'animejs/lib/anime.es.js';
const initial = "M128 64C128 54.7428 126.035 45.9446 122.498 38C118.949 30.0255 113.816 22.911 107.5 17.0555C102.243 12.1822 96.1666 8.18093 89.5 5.28177C81.6869 1.88401 73.0635 0 64 0C28.6538 0 0 28.6538 0 64C0 79.3663 5.41547 93.4678 14.442 104.5C18.5556 109.528 23.4193 113.918 28.8621 117.5C38.9481 124.138 51.023 128 64 128C99.3462 128 128 99.3462 128 64Z"
const morph = "M139 82C139 72.7428 135 53.5 124 50.5C101.502 49.5 109 34.5 109 26.5C109 18.5 96.1666 9.39916 89.5 6.5C81.6869 3.10224 72.0635 0.5 63 0.5C27.6538 0.5 0 33.6538 0 69C0 84.3663 7.97349 100.968 17 112C25.7732 113.096 34.0017 120.168 35 127.5C45.086 134.138 54.023 137 67 137C102.346 137 139 117.346 139 82Z"
const iconToPath = {
    fb: "M66.14 0H3.86C2.83626 0 1.85446 0.406677 1.13057 1.13057C0.406677 1.85446 0 2.83626 0 3.86V66.14C0 67.1637 0.406677 68.1455 1.13057 68.8694C1.85446 69.5933 2.83626 70 3.86 70H37.39V42.89H28.27V32.33H37.39V24.54C37.39 15.54 42.91 10.54 50.98 10.54C53.7023 10.5303 56.4231 10.6705 59.13 10.96V20.41H53.54C49.15 20.41 48.3 22.49 48.3 25.55V32.3H58.76L57.4 42.89H48.3V70H66.14C67.1637 70 68.1455 69.5933 68.8694 68.8694C69.5933 68.1455 70 67.1637 70 66.14V3.86C70 2.83626 69.5933 1.85446 68.8694 1.13057C68.1455 0.406677 67.1637 0 66.14 0Z",
    in: "M66.14 0H3.86C2.83626 0 1.85446 0.406677 1.13057 1.13057C0.406677 1.85446 0 2.83626 0 3.86V66.14C0 67.1637 0.406677 68.1455 1.13057 68.8694C1.85446 69.5933 2.83626 70 3.86 70H37.39V42.89H28.27V32.33H37.39V24.54C37.39 15.54 42.91 10.54 50.98 10.54C53.7023 10.5303 56.4231 10.6705 59.13 10.96V20.41H53.54C49.15 20.41 48.3 22.49 48.3 25.55V32.3H58.76L57.4 42.89H48.3V70H66.14C67.1637 70 68.1455 69.5933 68.8694 68.8694C69.5933 68.1455 70 67.1637 70 66.14V3.86C70 2.83626 69.5933 1.85446 68.8694 1.13057C68.1455 0.406677 67.1637 0 66.14 0Z",
    tg: "M60 1L1 24C-0.599999 24.6237 0.333334 26.2599 1 27L17 32C25.5 26.5 43.4 15 47 13C50.6 11 52.5 10.5 53 10.5L25.5 36C25 40.6667 24.1 50.2 24.5 51C24.9 51.8 31 46 34 43C37.6667 45.6667 45.8 51.5 49 53.5C52.2 55.5 53.6667 53.6667 54 52.5C56.8333 38.8333 62.8 10.3 64 5.5C65.2 0.699999 61.8333 0.5 60 1Z",
}

export default class ShareFacebook extends HTMLElement {
    constructor() {
        super();
        this.iconPath = iconToPath[this.icon]
        this.initHTML();
        this.addMorph();
    }
    get icon() {
        return this.getAttribute('icon');
    }
    initHTML() {
        this.root = this.attachShadow({mode:"open"})
        this.root.innerHTML = /*html*/ `
        <style>
            :host {
            }
            :host svg {
                display: block;
                width: 100%;
                height: 100%;
            }
            .initial {
                fill: #EA3F63; 
            }
            .icon {
                transform: translate(20%, 20%);
                fill: #fff;
                fill-opacity: 0.7;
                stroke-linejoin: round;
            }
            </style>
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700.31 356.02"> -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"> 
                <path 
                    class="initial" 
                    d="${initial}" 
                />
                <path 
                    class="icon"
                    d="${this.iconPath}"
                />
            </svg>
        `
    }
    addMorph() { 
        const path = this.root.querySelector('.initial');
        const timeline = anime.timeline({
            duration: 1500,
            easing: "easeOutExpo", 
        });

        timeline.add({
            targets: path,
            d: [
                {value: morph},
            ]
        });
    }
}
// path.animate([
//     { d: `path("${initial}")` },
//     { d: `path("${morph}")` },
// ], {
//    duration: 2000,
//    iterations: Infinity
// });


