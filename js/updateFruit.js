import { config } from './config.js';
import { alarm } from './alarm.js';
import { fruitContainer } from './fruitContainer.js';
import { customTimer } from './customTimer.js';
import { globalTimer } from './globalTimer.js';
import {
    getNowMs,
    vibrateInPattern,
} from './helpers.js';
import { favicon } from './favicon.js';

const TIME_TO_DECIDE_MS = 1700;
const { orange, apple, fruits } = fruitContainer;

const updateFruit = (fruit) => {
    const isSecondClick = (getNowMs() - fruit.getLastClickedMs()) < TIME_TO_DECIDE_MS;

    if (!isSecondClick) {
        fruit.setLastClickedMs(getNowMs());
    }

    if (!orange.isIdle() && !fruit.isBreakTimer()) {
        vibrateInPattern([50, 30, 80]);
        return;
    }

    if (fruit.equals(apple)) {
        customTimer.focus();
    }

    const fruitRipeMs = fruit.getRipeMs();
    if (!fruitRipeMs || fruitRipeMs === 0) {
        return;
    }

    if (fruit.isIdle()) {
        if (fruit.isBreakTimer()) {
            fruits.filter(fruit => !fruit.isBreakTimer()).forEach(fruit => {
                if (isSecondClick) {
                    resetClock(fruit);
                    fruit.applyBlur();
                } else { // first click
                    fruit.applyBlur();
                    fruit.disableBlur(TIME_TO_DECIDE_MS);
                }
            });
            if (!isSecondClick) {
                return;
            }
            favicon.setToBreak();
            customTimer.blur();
        } else {
            globalTimer.set(fruit.getRipeMs());
        }
        vibrateInPattern(vibrateStartPattern());
        fruit.start();
        const startDelayMs = (config['pre-ripe-delay'] + config['pre-ripe-dur']) * 1000;
        setTimeout(() => {
            alarm.set(fruit.getRipeMs());
        }, startDelayMs);
    } else if (fruit.isRipe()) {
        resetClock(fruit);
    } else {
        if (isSecondClick) {
            resetClock(fruit);
        } else { // first click
            fruit.applyBlur();
            setTimeout(fruit.disableBlur, TIME_TO_DECIDE_MS)
        }
    }
}

const resetClock = (fruit) => {
    if (fruit.isBreakTimer()) {
        fruits.filter(fruit => !fruit.isBreakTimer()).forEach(fruit => {
            fruit.disableBlur();
        });
    }
    fruit.reset();
    fruit.disableBlur();
    alarm.reset();
    globalTimer.update();
    if (fruit.equals(apple)) {
        customTimer.focus();
    }
}

const vibrateStartPattern = () => {
    const pattern = [];
    let dur = 60;
    for (let i = 0; i < 10; i++) {
        pattern.push(2); 
        pattern.push(dur += 10); 
    }
    return pattern;
}

export default updateFruit;
