import config from './config.js';
import { getNowMs, capitalize, setVariableInSec } from './helpers.js';

export default function createFruit(name) {
    const minutesToMs = (minutes) => {
        return minutes * 60 * 1000;
    }
    const minutesToSec = (minutes) => {
        return minutes * 60;
    }

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
    let ripeMs = minutesToMs(config[name + '-ripe-minutes']);

    const htmlElem = document.querySelector('.' + name);

    const clockMain = htmlElem.querySelector('.clock');
    const clockFace = htmlElem.querySelector('.clockFace');
    const clockBody = htmlElem.querySelector('.clockBody');
    const clockTime = htmlElem.querySelector('.clockTime');
    const clockDot = htmlElem.querySelector('.clockDot');
    const clockDotSVG = htmlElem.querySelector('.clockDot svg');


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
        setRipeMs(minutes) {
            ripeMs = minutesToMs(minutes);
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
        reset() {
            startMs = null;
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
