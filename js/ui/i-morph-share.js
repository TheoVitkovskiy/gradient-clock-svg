import anime from 'animejs/lib/anime.es.js';
const initial = "M128 64C128 54.7428 126.035 45.9446 122.498 38C118.949 30.0255 113.816 22.911 107.5 17.0555C102.243 12.1822 96.1666 8.18093 89.5 5.28177C81.6869 1.88401 73.0635 0 64 0C28.6538 0 0 28.6538 0 64C0 79.3663 5.41547 93.4678 14.442 104.5C18.5556 109.528 23.4193 113.918 28.8621 117.5C38.9481 124.138 51.023 128 64 128C99.3462 128 128 99.3462 128 64Z"
const morph = "M139 82C139 72.7428 135 53.5 124 50.5C101.502 49.5 109 34.5 109 26.5C109 18.5 96.1666 9.39916 89.5 6.5C81.6869 3.10224 72.0635 0.5 63 0.5C27.6538 0.5 0 33.6538 0 69C0 84.3663 7.97349 100.968 17 112C25.7732 113.096 34.0017 120.168 35 127.5C45.086 134.138 54.023 137 67 137C102.346 137 139 117.346 139 82Z"
const iconToPath = {
    fb: {
        d: "M66.14 0H3.86C2.83626 0 1.85446 0.406677 1.13057 1.13057C0.406677 1.85446 0 2.83626 0 3.86V66.14C0 67.1637 0.406677 68.1455 1.13057 68.8694C1.85446 69.5933 2.83626 70 3.86 70H37.39V42.89H28.27V32.33H37.39V24.54C37.39 15.54 42.91 10.54 50.98 10.54C53.7023 10.5303 56.4231 10.6705 59.13 10.96V20.41H53.54C49.15 20.41 48.3 22.49 48.3 25.55V32.3H58.76L57.4 42.89H48.3V70H66.14C67.1637 70 68.1455 69.5933 68.8694 68.8694C69.5933 68.1455 70 67.1637 70 66.14V3.86C70 2.83626 69.5933 1.85446 68.8694 1.13057C68.1455 0.406677 67.1637 0 66.14 0Z",
        offset_x: 20,
        offset_y: 20,
    },
    in: {
        d: "M63.41 30.32H57.17C57.6393 32.1228 57.8812 33.9772 57.89 35.84C57.89 41.688 55.5669 47.2965 51.4317 51.4317C47.2965 55.5669 41.688 57.89 35.84 57.89C29.992 57.89 24.3835 55.5669 20.2483 51.4317C16.1131 47.2965 13.79 41.688 13.79 35.84C13.7988 33.9772 14.0407 32.1228 14.51 30.32H8.27V60.65C8.26996 61.3768 8.55662 62.0743 9.06775 62.5911C9.57888 63.1078 10.2732 63.4021 11 63.41H60.65C61.382 63.41 62.084 63.1192 62.6016 62.6016C63.1192 62.084 63.41 61.382 63.41 60.65V30.32ZM63.41 11.03C63.4113 10.6672 63.3408 10.3077 63.2026 9.97223C63.0644 9.63678 62.8611 9.33199 62.6046 9.07544C62.348 8.81889 62.0432 8.61564 61.7078 8.4774C61.3723 8.33917 61.0128 8.26868 60.65 8.27H52.38C51.6532 8.26996 50.9557 8.55662 50.4389 9.06775C49.9222 9.57888 49.6279 10.2732 49.62 11V19.3C49.6226 20.0303 49.9146 20.7297 50.4319 21.2452C50.9492 21.7606 51.6497 22.05 52.38 22.05H60.65C61.012 22.0513 61.3707 21.9812 61.7055 21.8435C62.0403 21.7059 62.3446 21.5036 62.601 21.2481C62.8574 20.9926 63.0609 20.689 63.1997 20.3547C63.3385 20.0204 63.41 19.662 63.41 19.3V11.03ZM35.84 22.03C33.113 22.028 30.4467 22.8346 28.178 24.3478C25.9094 25.861 24.1404 28.0128 23.0945 30.5313C22.0487 33.0497 21.773 35.8217 22.3023 38.4968C22.8317 41.1719 24.1422 43.63 26.0684 45.5604C27.9946 47.4908 30.4498 48.8067 33.1238 49.3418C35.7977 49.877 38.5703 49.6074 41.091 48.567C43.6118 47.5266 45.7674 45.7622 47.2856 43.4969C48.8037 41.2316 49.616 38.567 49.62 35.84C49.62 32.1844 48.1685 28.6784 45.5845 26.0925C43.0006 23.5067 39.4956 22.0527 35.84 22.05V22.03ZM63.41 71.68H8.27C7.18397 71.68 6.10857 71.4661 5.10521 71.0505C4.10185 70.6349 3.19017 70.0257 2.42223 69.2578C1.65429 68.4898 1.04512 67.5782 0.629516 66.5748C0.21391 65.5714 0 64.496 0 63.41L0 8.27C0 6.07666 0.871301 3.97315 2.42223 2.42223C3.97315 0.871301 6.07666 0 8.27 0L63.41 0C65.6033 0 67.7068 0.871301 69.2578 2.42223C70.8087 3.97315 71.68 6.07666 71.68 8.27V63.41C71.68 65.6033 70.8087 67.7068 69.2578 69.2578C67.7068 70.8087 65.6033 71.68 63.41 71.68",
        offset_x: 20,
        offset_y: 20,
    },
    tg: {
        d: "M60 1L1 24C-0.599999 24.6237 0.333334 26.2599 1 27L17 32C25.5 26.5 43.4 15 47 13C50.6 11 52.5 10.5 53 10.5L25.5 36C25 40.6667 24.1 50.2 24.5 51C24.9 51.8 31 46 34 43C37.6667 45.6667 45.8 51.5 49 53.5C52.2 55.5 53.6667 53.6667 54 52.5C56.8333 38.8333 62.8 10.3 64 5.5C65.2 0.699999 61.8333 0.5 60 1Z",
        offset_x: 20,
        offset_y: 28,
    },
    ln: {
        d: "M29.07 51.75H43.94V99.54H29.07V51.75ZM36.51 28C38.2162 27.998 39.8845 28.5024 41.3038 29.4493C42.7231 30.3961 43.8295 31.7429 44.4829 33.319C45.1362 34.8951 45.3072 36.6296 44.9741 38.3029C44.641 39.9762 43.8188 41.5131 42.6117 42.7188C41.4046 43.9245 39.8668 44.7449 38.1931 45.0761C36.5194 45.4072 34.785 45.2342 33.2097 44.579C31.6344 43.9238 30.2889 42.8159 29.3437 41.3955C28.3985 39.9751 27.896 38.3061 27.9 36.6C27.9053 34.319 28.8144 32.1331 30.4283 30.5212C32.0421 28.9092 34.229 28.0026 36.51 28Z M53.26 51.75H67.5V58.28H67.7C69.7 54.52 74.53 50.56 81.76 50.56C96.76 50.56 99.58 60.46 99.58 73.33V99.54H84.72V76.3C84.72 70.76 84.63 63.63 77.01 63.63C69.39 63.63 68.1 69.63 68.1 75.9V99.54H53.26V51.75Z",
        offset_x: 5,
        offset_y: -2,
    },
    tw: {
        d: "M71.68 6.9C68.9955 8.09038 66.1468 8.86914 63.23 9.21C66.3014 7.37445 68.6008 4.48505 69.7 1.08C66.8113 2.78825 63.6528 3.99213 60.36 4.64C58.1422 2.28187 55.209 0.720571 52.0143 0.197785C48.8197 -0.325 45.5418 0.219888 42.688 1.7481C39.8343 3.27631 37.5639 5.70262 36.2284 8.65141C34.8928 11.6002 34.5665 14.907 35.3 18.06C29.4544 17.7646 23.7362 16.2436 18.5163 13.5957C13.2963 10.9479 8.69136 7.23229 5 2.69C3.11871 5.92752 2.541 9.75998 3.38433 13.4082C4.22766 17.0564 6.42871 20.2466 9.54 22.33C7.20534 22.2545 4.92228 21.6238 2.88 20.49V20.67C2.87984 24.0663 4.05492 27.3581 6.20579 29.9865C8.35667 32.6149 11.3508 34.4181 14.68 35.09C13.4158 35.4361 12.1108 35.611 10.8 35.61C9.86023 35.6087 8.9227 35.5183 8 35.34C8.94376 38.2662 10.7783 40.8243 13.2472 42.6567C15.7161 44.4891 18.6959 45.5042 21.77 45.56C16.5611 49.6454 10.1299 51.8608 3.51 51.85C2.33717 51.8493 1.16531 51.7825 0 51.65C6.72463 55.9667 14.5491 58.2578 22.54 58.25C49.59 58.25 64.38 35.84 64.38 16.41C64.38 15.77 64.38 15.14 64.38 14.51C67.2412 12.4216 69.7123 9.84555 71.68 6.9V6.9Z",
        offset_x: 21,
        offset_y: 26,
    },
    wa: {
        d: "M0 72L5.06 53.5C1.14749 46.6903 -0.409642 38.7803 0.629941 30.9957C1.66952 23.2112 5.24776 15.9869 10.8101 10.4426C16.3724 4.89821 23.6082 1.34336 31.3961 0.328962C39.1839 -0.685432 47.0889 0.897279 53.8859 4.8318C60.6829 8.76632 65.9923 14.8329 68.9913 22.0914C71.9903 29.3499 72.5114 37.3949 70.4738 44.9796C68.4362 52.5643 63.9537 59.2652 57.7211 64.0436C51.4884 68.8221 43.8536 71.4113 36 71.41V71.41C30.0595 71.3986 24.2159 69.9034 19 67.06L0 72ZM19.8 60.6L20.88 61.24C25.4552 63.9566 30.6791 65.3869 36 65.38V65.38C42.5728 65.378 48.9586 63.192 54.1539 59.1657C59.3491 55.1393 63.0592 49.5008 64.701 43.1363C66.3428 36.7719 65.8233 30.0423 63.2242 24.0052C60.6251 17.9682 56.0936 12.9658 50.342 9.7845C44.5904 6.60315 37.9447 5.42312 31.4495 6.42987C24.9542 7.43662 18.9776 10.5731 14.4589 15.3463C9.94027 20.1195 7.13573 26.2589 6.48609 32.7995C5.83645 39.3401 7.37854 45.9112 10.87 51.48L11.58 52.6L8.58 63.55L19.8 60.6Z M54 44.2C53.78 43.83 53.18 43.61 52.29 43.2C51.4 42.79 47.02 40.6 46.2 40.3C45.38 40 44.79 39.85 44.2 40.75C43.61 41.65 41.9 43.65 41.38 44.24C40.86 44.83 40.38 44.91 39.45 44.47C36.8005 43.4137 34.3568 41.9007 32.23 40C30.2659 38.1995 28.5808 36.1167 27.23 33.82C26.71 32.93 27.18 32.45 27.62 32C28.06 31.55 28.52 31 28.96 30.44C29.3413 30.01 29.6549 29.5244 29.89 29C30.0089 28.7547 30.0648 28.4835 30.0526 28.2111C30.0404 27.9388 29.9604 27.6737 29.82 27.44C29.6 26.99 27.82 22.6 27.07 20.82C26.32 19.04 25.61 19.32 25.07 19.29C24.53 19.26 23.96 19.29 23.36 19.29C22.9173 19.2925 22.4797 19.385 22.074 19.5621C21.6683 19.7392 21.3028 19.9971 21 20.32C19.9899 21.2746 19.1899 22.4292 18.651 23.7102C18.1121 24.9912 17.8461 26.3705 17.87 27.76C17.87 32.15 21.07 36.39 21.52 36.99C21.97 37.59 27.8 46.59 36.75 50.45C38.4092 51.1654 40.1048 51.7929 41.83 52.33C43.6505 52.8829 45.575 53.0028 47.45 52.68C49.16 52.43 52.73 50.53 53.45 48.44C54.0403 47.1098 54.2313 45.6368 54 44.2Z",
        offset_x: 22,
        offset_y: 22,
    }
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
            }
            .initial {
                fill: #EA3F63;
                /*fill: #7af471;
                fill: royalblue;*/
                /*fill: var(--dynamic-url-color);*/
                /*fill: #000; 
                fill-opacity: 0.3;*/
            }
            .icon {
                transform: translate(${this.iconPath.offset_x}%, ${this.iconPath.offset_y}%);
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
                    d="${this.iconPath.d}"
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


