import { getNowMs } from './helpers.js';
import { fruitContainer } from './fruitContainer.js';
import { alarm } from './alarm.js';
import { saveValue } from './helpers.js';

const { getNextActiveFruit } = fruitContainer;

const loadInitialValue = (key) => {
    return localStorage.getItem(key);
}

function createGlobalAlarm() {
    const HREF_1 = 'img/faviconGreenLight.png';
    const HREF_2 = 'img/faviconYellow.png';
    const HREF_3 = 'img/faviconOrange.png';
    const HREF_4 = 'img/favicon.png';
    const favicon = document.getElementById('favicon');
    const APP_TITLE = document.title;

    let startMs = loadInitialValue('startMs');
    let ripeMs = loadInitialValue('ripeMs');
    let currInterval = null;

    const reset = () => {
        clearInterval(currInterval);
        updateTitle(0);
        startMs = null;
        ripeMs = null;
    }

    const onSec = () => {
        if (!alarm.isPlaying()) {
            const remainingMs = ripeMs - (getNowMs() - startMs);
            const fractionFilled = 1 - (remainingMs / ripeMs);
            updateFavicon(fractionFilled);
            updateTitle(remainingMs);
        }
    }

    const updateFavicon = (fractionFilled) => {
        if (fractionFilled > 0) {
            favicon.href = HREF_1;
        }
        if (fractionFilled > 0.25) {
            favicon.href = HREF_2;
        }
        if (fractionFilled > 0.5) {
            favicon.href = HREF_3;
        }
        if (fractionFilled > 0.75) {
            favicon.href = HREF_4;
        }
    }

    const updateTitle = (ms) => {
        let title = '';
        if (ms <= 0) {
            title = APP_TITLE;
        } else {
            title = getTimeString(ms);
        }
        document.title = title;
    }

    const getTimeString = (ms) => {
        const timeInSeconds = ms / 1000;
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds - (minutes * 60));
        return `${minutes}:${seconds}`
    }

    const set = (timeMs) => {
        clearInterval(currInterval);
        currInterval = setInterval(onSec, 1000);
        update(timeMs);
    }

    const update = (timeMs = null) => {
        const nextFruit = getNextActiveFruit();

        if (nextFruit) {
            startMs = nextFruit.getStartMs();
            ripeMs = nextFruit.getRipeMs();
        } else if (timeMs) {
            startMs = getNowMs();
            ripeMs = timeMs;
        } else {
            reset();
        }
    }

    set(ripeMs - (getNowMs() - startMs));

    return {
        set(timeMs) {
            set(timeMs);
        },
        reset() {
            reset();
        },
        update(timeMs = null) {
            update(timeMs);
        },
        saveData() {
            saveValue('startMs', startMs);
            saveValue('ripeMs', ripeMs);
        }
    }
}

const globalAlarm = createGlobalAlarm();

export {
    globalAlarm
}