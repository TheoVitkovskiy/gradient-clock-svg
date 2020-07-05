import createFruit from './createFruit.js';
import config from './config.js';
import { getNowMs, setVariableInSec, minutesToMs } from './helpers.js';

const loadInitialValue = (key) => {
    return localStorage.getItem(key);
}

let orange = null;
let tomato = null;
let pear = null;
let apple = null;
let fruits = [];
let currInterval = null;
let startMs = loadInitialValue('startMs');
let ripeMs = loadInitialValue('ripeMs');
let faviconInterval = null;
let alarmTimeout = null;
let isAlarm = false;
let isUserTyping = false;
let isUserInputDirty = false;

const ALARM_AMOUNT = 3;
const ALARM_DELAY_MS = 4500;
const ALARM_FAVICON_DELAY_MS = 800;
const TIME_TO_DECIDE_MS = 1700;
const APP_TITLE = document.title;
const favicon = document.getElementById('favicon');
const customTimeInput = document.querySelector('.customTime');
const audio = new Audio('./sounds/Tea-bell-sound-effect.mp3');
const HREF_ALT = 'img/favicon.png';
const HREF_MAIN = 'img/faviconGreen.png';
const HREF_1 = 'img/faviconGreenLight.png';
const HREF_2 = 'img/faviconYellow.png';
const HREF_3 = 'img/faviconOrange.png';
const HREF_4 = 'img/favicon.png';
const HREF_BREAK_1 = 'img/favicon_breakGreen_center.png';
const CUSTOM_PLACEHOLDER = 'XXX';

const main = () => {
    orange = createFruit('orange');
    tomato = createFruit('tomato');
    pear = createFruit('pear');
    apple = createFruit('apple');

    fruits = [orange, tomato, pear, apple];

    addOnClickToClocks();

    setGlobalTimer(ripeMs - (getNowMs() - startMs));
    setCustomTimer();
    setCSSVariables(
        calculateDynamicValues()
    );
    customTimeInput.addEventListener('blur', () => {
        if (customTimeInput.value == '') {
            customTimeInput.value = CUSTOM_PLACEHOLDER;
        }
        isUserTyping = false;
        isUserInputDirty = false;
    });
    registerSW();
}

const saveValue = (key, value) => {
    return localStorage.setItem(key, value);
}

const addOnClickToClocks = () => {
    [...document.querySelectorAll('.clockContainer')].forEach(clock => {
        clock.addEventListener('click', clockOnClick);
    });
}

const clockOnClick = (e) => {
    window.navigator.vibrate(10);
    const fruit = getClickedFruit(e.currentTarget);
    updateFruit(fruit);
}

const updateFruit = (fruit) => {
    const isSecondClick = (getNowMs() - fruit.getLastClickedMs()) < TIME_TO_DECIDE_MS;

    if (!isSecondClick) {
        fruit.setLastClickedMs(getNowMs());
    }

    if (!orange.isIdle() && fruit.getName() != 'orange') {
        return;
    }

    if (fruit.getName() == 'apple' && !isUserTyping) {
        customTimeInput.focus();
        if (customTimeInput.value === CUSTOM_PLACEHOLDER) {
            customTimeInput.value = '';
        }
        isUserTyping = true;
    }

    if (!fruit.getRipeMs()) {
        return;
    }

    if (fruit.isIdle()) {
        if (fruit.getName() == 'orange') { // break timer
            fruits.filter(fruit => fruit.getName() != 'orange').forEach(fruit => {
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
            favicon.href = HREF_BREAK_1;
            customTimeInput.blur();
        } else {
            setGlobalTimer(fruit.getRipeMs());
        }
        isUserTyping = false;
        fruit.start();
        const startDelayMs = (config['pre-ripe-delay'] + config['pre-ripe-dur']) * 1000;
        setTimeout(() => {
            setAlarm(fruit.getRipeMs());
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
    if (fruit.getName() == 'orange') { // break timer
        fruits.filter(fruit => fruit.getName() != 'orange').forEach(fruit => {
            fruit.disableBlur();
        });
    }
    fruit.reset();
    fruit.disableBlur();
    updateGlobalTimer();
    clearTimeout(alarmTimeout);
    resetAlarm();
    if (fruit.getName() == 'apple') {
        customTimeInput.focus();
    }
}

const onSec = () => {
    if (!isAlarm) {
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

const getTimeString = (ms) => {
    const timeInSeconds = ms / 1000;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - (minutes * 60));
    return `${minutes}:${seconds}`
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


const setGlobalTimer = (timeMs) => {
    clearInterval(currInterval);
    currInterval = setInterval(onSec, 1000);
    updateGlobalTimer(timeMs);
}

const resetGlobalTimer = () => {
    clearInterval(currInterval);
    updateTitle(0);
    startMs = null;
    ripeMs = null;
}

const updateGlobalTimer = (timeMs = null) => {
    const nextFruit = fruits.find(fruit => !fruit.isRipe() && !fruit.isIdle());

    if (nextFruit) {
        startMs = nextFruit.getStartMs();
        ripeMs = nextFruit.getRipeMs();
    } else if (timeMs) {
        startMs = getNowMs();
        ripeMs = timeMs;
    } else {
        resetGlobalTimer();
    }
}

const setAlarm = (ms) => {
    alarmTimeout = setTimeout(playAlarm, ms);
}

const resetAlarm = () => {
    isAlarm = false;
    resetSoundAlarm();
    resetFaviconAlarm();
}

const playAlarm = () => {
    isAlarm = true;
    playSoundAlarm();
    playVibrateAlarm();
    playFaviconAlarm();
    playNotificationAlarm();
};

const resetFaviconAlarm = () => {
    clearInterval(faviconInterval);
    const favicon = document.getElementById('favicon');
    favicon.href = HREF_MAIN;
}

const resetSoundAlarm = () => {
    audio.pause();
    audio.currentTime = 0;
}

const playNotificationAlarm = () => {
    new Notification('Alarm!', {
        body: 'Alarm!!!',
        vibrate: [150, 50, 150, 50, 150]
    })

}

const playFaviconAlarm = () => {
    faviconInterval = setInterval(toggleFavicon, ALARM_FAVICON_DELAY_MS);
}

const playVibrateAlarm = () => {
    window.navigator.vibrate([40, 30, 100]);
}

const toggleFavicon = () => {
    const favicon = document.getElementById('favicon');

    favicon.href = favicon.href.includes(HREF_MAIN) ? HREF_ALT : HREF_MAIN;
}

const playSoundAlarm = () => {
    for (let i = 0; i < ALARM_AMOUNT; i++) {
        setTimeout(playSound, i * ALARM_DELAY_MS);
    }
}

const playSound = () => {
    if (isAlarm) {
        audio.play();
    }
}

const getClickedFruit = (clock) => {
    let clickedFruit = null;

    const isTomato = clock.classList.contains('tomato');
    const isApple = clock.classList.contains('apple');
    const isPear = clock.classList.contains('pear');
    const isOrange = clock.classList.contains('orange');

    if (isTomato) {
        clickedFruit = tomato;
    } else if (isApple) {
        clickedFruit = apple;
    } else if (isPear) {
        clickedFruit = pear;
    } else if (isOrange) {
        clickedFruit = orange;
    }

    return clickedFruit;
}

const setCustomTimer = () => {
    const customTime = config['apple-ripe-minutes'];

    customTimeInput.value = customTime || CUSTOM_PLACEHOLDER;

    customTimeInput.addEventListener('keydown', (e) => {
        const minutesFromInput = e.target.value;

        if (!isUserInputDirty) {
            customTimeInput.value = '';
            isUserInputDirty = true;
        }

        if (e.keyCode === 13) {
            isUserInputDirty = false;
            isUserTyping = false;
            config['apple-ripe-minutes'] = minutesFromInput;
            setCSSVariables(
                calculateDynamicValues()
            );
            apple.setRipeMs(minutesToMs(minutesFromInput));
            updateFruit(apple);
        }
    });
}

const calculateDynamicValues = () => {
    const dynamicValues = {};

    dynamicValues['pre-ripe-dur'] = config['pre-ripe-dur']; // to add s (seconds) at the end
    dynamicValues['pre-ripe-delay'] = config['pre-ripe-delay']; // to add s (seconds) at the end
    dynamicValues['dot-delay'] = config['dot-delay']; // to add s (seconds) at the end
    dynamicValues['success-dur'] = config['success-dur']; // to add s (seconds) at the end
    dynamicValues['ripe-delay'] = config['pre-ripe-delay'] + config['pre-ripe-dur'];
    dynamicValues['orange-ripe-dur'] = config['orange-ripe-minutes'] * 60;
    dynamicValues['tomato-ripe-dur'] = config['tomato-ripe-minutes'] * 60;
    dynamicValues['apple-ripe-dur'] = config['apple-ripe-minutes'] * 60;
    dynamicValues['pear-ripe-dur'] = config['pear-ripe-minutes'] * 60;
    dynamicValues['orange-success-start'] = dynamicValues['ripe-delay'] + dynamicValues['orange-ripe-dur'];
    dynamicValues['tomato-success-start'] = dynamicValues['ripe-delay'] + dynamicValues['tomato-ripe-dur'];
    dynamicValues['apple-success-start'] = dynamicValues['ripe-delay'] + dynamicValues['apple-ripe-dur'];
    dynamicValues['pear-success-start'] = dynamicValues['ripe-delay'] + dynamicValues['pear-ripe-dur'];

    return dynamicValues;
}

const setCSSVariables = (values) => {
    for (const key in values) {
        setVariableInSec('--' + key, values[key]);
    }
}

const saveData = () => {
    saveValue('startMs', startMs);
    saveValue('ripeMs', ripeMs);
}

document.addEventListener('DOMContentLoaded', main);

window.addEventListener('beforeunload', (e) => {
    saveData();
});

async function registerSW() {
    const isQA = window.location.host.includes('preview');
    const isDev = window.location.href.includes('127') || window.location.href.includes('localhost');

    if (isQA || isDev) {
        return;
    }

    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('../sw.js')
        } catch (e) {
            console.log(`Service Worker registration failed`, e);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
