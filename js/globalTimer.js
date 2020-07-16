import { getNowMs } from './helpers.js';
import { fruitContainer } from './fruitContainer.js';
import { alarm } from './alarm.js';
import { saveValue } from './helpers.js';
import { favicon } from './favicon.js';

const { getNextActiveFruit } = fruitContainer;

const loadInitialValue = (key) => {
    return localStorage.getItem(key);
}

function createGlobalTimer() {
    const APP_TITLE = document.title;

    let startMs = loadInitialValue('startMs');
    let ripeMs = loadInitialValue('ripeMs');
    let currInterval = null;

    const reset = () => {
        clearInterval(currInterval);
        updateTitle(0);
        favicon.reset();
        startMs = null;
        ripeMs = null;
    }

    const onSec = () => {
        if (!alarm.isPlaying()) {
            const remainingMs = ripeMs - (getNowMs() - startMs);
            if (remainingMs || remainingMs > 0) {
                const fractionFilled = 1 - (remainingMs / ripeMs);
                favicon.updateRipe(fractionFilled);
                updateTitle(remainingMs);
            }
        }
    }

    const updateTitle = (ms) => {
        let title = '';
        if (!ms || ms <= 0) {
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
        reset();
        currInterval = setInterval(onSec, 1000);
        startMs = getNowMs();
        ripeMs = timeMs;
    }

    const update = (timeMs = null) => {
        const nextFruit = getNextActiveFruit();

        if (nextFruit) {
            startMs = nextFruit.getStartMs();
            ripeMs = nextFruit.getRipeMs();
        } else if (timeMs) {
            if (!startMs) {
                startMs = getNowMs();
            }
            ripeMs = timeMs;
        } else {
            reset();
        }
    }

    // set, if page reloaded
    if (startMs && ripeMs) {
        set(ripeMs);
    }

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

const globalTimer = createGlobalTimer();

export {
    globalTimer
}
