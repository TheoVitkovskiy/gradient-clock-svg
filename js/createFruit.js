import config from './config.js';
import { getNowMs, capitalize, minutesToMs } from './helpers.js';

export default function createFruit(name) {
    const addRipeAnim = () => {
        clockFace.classList.add('animClockFace');
        clockBody.classList.add('animClockBody');
        clockTime.classList.add('animClockTime');
        clockDot.classList.add('animClockDot');
        clockDotSVG.classList.add('animClockDot');
        clockMain.classList.add('animClock' + capitalize(name));
        clockFace.classList.add('animClockFace' + capitalize(name));
    }

    let startMs = null;
    let ripeMs = null;
    let lastClickedMs = null;
    let disableBlurTimeout = null;

    if (name !== 'apple') {
        ripeMs = minutesToMs(config[name + '-ripe-minutes']);
    }

    const htmlElem = document.querySelector('.' + name);

    const clockMain = htmlElem.querySelector('.clock');
    const clockFace = htmlElem.querySelector('.clockFace');
    const clockBody = htmlElem.querySelector('.clockBody');
    const clockTime = htmlElem.querySelector('.clockTime');
    const clockDot = htmlElem.querySelector('.clockDot');
    const clockDotSVG = htmlElem.querySelector('.clockDot svg');

    const blurClass = 'blur';


    return {
        start() {
            startMs = getNowMs() + config['pre-ripe-delay'] + config['pre-ripe-dur'];
            addRipeAnim();
        },
        getStartMs() {
            return startMs;
        },
        getRipeMs() {
            return ripeMs;
        },
        setRipeMs(ms) {
            ripeMs = ms;
        },
        getName() {
            return name;
        },
        isRipe() {
            return startMs && ((getNowMs() - startMs) > ripeMs);
        },
        isIdle() {
            return startMs ? false : true;
        },
        getLastClickedMs() {
            return lastClickedMs;
        },
        setLastClickedMs(ms) {
            lastClickedMs = ms;
        },
        disableBlur(delayMs) {
            const disableBlur = () => {
                clockFace.classList.remove(blurClass);
                clockBody.classList.remove(blurClass);
                clockDot.classList.remove(blurClass);
                clockTime.classList.remove(blurClass);
            }

            if (delayMs) {
                disableBlurTimeout = setTimeout(disableBlur, delayMs);
            } else {
                disableBlur();
            }
        },
        applyBlur() {
            clearTimeout(disableBlurTimeout);

            const clockTimeVisible = !(getComputedStyle(clockTime).display == 'none');

            if (clockTimeVisible) {
                clockTime.classList.add(blurClass);
            } else {
                clockFace.classList.add(blurClass);
                clockBody.classList.add(blurClass);
                clockDot.classList.add(blurClass);
            }
        },
        reset() {
            startMs = null;
            if (name == 'apple') {
                ripeMs = null;
            }
            clockFace.classList.remove('animClockFace');
            clockBody.classList.remove('animClockBody');
            clockTime.classList.remove('animClockTime');
            clockDot.classList.remove('animClockDot');
            clockDotSVG.classList.remove('animClockDot');
            clockMain.classList.remove('animClock' + capitalize(name));
            clockFace.classList.remove('animClockFace' + capitalize(name));
        }
    }
}
