let config = null;
let orange = null;
let tomato = null;
let pear = null;
let apple = null;
let currInterval = null;
let startMs = null;
let ripeMs = null;
let remainingMs = null;
let faviconInterval = null;
let isAlarm = false;

const ALARM_AMOUNT = 3;
const ALARM_DELAY_MS = 4500;
const ALARM_FAVICON_DELAY_MS = 800;

const HREF_ALT = 'img/favicon.png';
const HREF_MAIN = 'img/faviconGreen.png';
const APP_TITLE = 'Fruit Timer';

const audio = new Audio('./sounds/Tea-bell-sound-effect.mp3');
const time = new Date(0);
let fruits;

const main = () => {
    setCustomTimer();
    updateTitle(0);

    config = getConfigFromCSS()

    orange = createFruit('orange');
    tomato = createFruit('tomato');
    pear = createFruit('pear');
    apple = createFruit('apple');

    fruits = [orange, tomato, pear, apple];

    setTimerOnClick();

    setCSSVariables(
        calculateDynamicValues()
    );
}

function createFruit(name) {
    let startMs = null;
    let ripeMs = config[name + '-ripe-minutes'] * 60 * 1000;

    const htmlElem = document.querySelector('.' + name);

    const clockMain = htmlElem.querySelector('.clock');
    const clockFace = htmlElem.querySelector('.clockFace');
    const clockBody = htmlElem.querySelector('.clockBody');
    const clockTime = htmlElem.querySelector('.clockTime');
    const clockDot = htmlElem.querySelector('.clockDot');
    const clockDotSVG = htmlElem.querySelector('.clockDot svg');

    const addRipeAnim = () => {
        clockFace.classList.add('animClockFace');
        clockBody.classList.add('animClockBody');
        clockTime.classList.add('animClockTime');
        clockDot.classList.add('animClockDot');
        clockDotSVG.classList.add('animClockDot');
        clockMain.classList.add('animClock' + capitalize(name));
        clockFace.classList.add('animClockFace' + capitalize(name));
    }

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

const setTimerOnClick = () => {
    const clocks = [...document.querySelectorAll('.clockContainer')]; 
    clocks.forEach(clock => {
        clock.addEventListener('click', clockOnClick);
    });
}

const clockOnClick = (e) => {
    const clock = e.currentTarget;

    const fruit = getClickedFruit(clock);

    if (fruit.isIdle()){
        fruit.start();
        const startDelayMs = (config['pre-ripe-delay'] + config['pre-ripe-dur']) * 1000;
        setTimeout(() => {
            setGlobalTimer(fruit.getRipeMs());
            setAlarm(fruit.getRipeMs());
        }, startDelayMs);
    } else if (fruit.isRipe()) {
        fruit.reset();
        updateGlobalTimer();
        resetAlarm();
    }
}

const getNowMs = () => {
    const date = new Date();
    return date.getTime();
}

const onSec = () => {
    const remainingMs = ripeMs - (getNowMs() - startMs);
    //if (remainingMs < 0) {
    //    resetGlobalTimer();
    //    return;
    //}
    updateTitle(remainingMs);
}

const updateTitle = (ms) => {
    let title = '';
    if (ms <= 0) {
        title = APP_TITLE; 
    } else {
        title = Math.round(ms / 1000);
        //time.setMilliseconds(ms);
        //title = time.toISOString().substr(11, 8);
        //time.setMilliseconds(-ms);

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
    setTimeout(playAlarm, ms);
}

const resetAlarm = () => {
    isAlarm = false;
    resetSoundAlarm();
    resetFaviconAlarm();
}

const playAlarm = () => {
    isAlarm = true;
    playSoundAlarm();    
    playFaviconAlarm();
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

const playFaviconAlarm = () => {
    faviconInterval = setInterval(toggleFavicon, ALARM_FAVICON_DELAY_MS);
}

const toggleFavicon = () => {
    const favicon = document.getElementById('favicon');

    favicon.href = favicon.href.includes(HREF_MAIN) ? HREF_ALT : HREF_MAIN;
}

const playSoundAlarm = () => {
    for(let i = 0; i < ALARM_AMOUNT; i++) {
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
    const customTime = getCustomTime();
    const timeDomElement = document.querySelector('.customTime h2');
    timeDomElement.innerText = customTime || 'XXX';
    setDocProperty('--apple-ripe-minutes', customTime || 0);
}

const getCustomTime = () => {
    const customTime = getQueryParamValue('minutes');
    return customTime;
}

const getQueryParamValue = (qParam) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(qParam);
}

const getConfigFromCSS = () => {
    const config = {};

    const docStyle = getComputedStyle(document.documentElement);

    // ToDo: find a way to make it dynamic
    config['orange-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--orange-ripe-minutes'));
    config['tomato-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--tomato-ripe-minutes'));
    config['apple-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--apple-ripe-minutes'));
    config['pear-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--pear-ripe-minutes'));
    config['pre-ripe-delay'] = parseFloat(docStyle.getPropertyValue('--pre-ripe-delay'));
    config['pre-ripe-dur'] = parseFloat(docStyle.getPropertyValue('--pre-ripe-dur'));
    config['dot-delay'] = parseFloat(docStyle.getPropertyValue('--dot-delay'));
    config['success-dur'] = parseFloat(docStyle.getPropertyValue('--success-dur'));

    return config;
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
        setDocProperty('--' + key, values[key] + 's');
    }
}

const setDocProperty = (key, value) => {
    document.documentElement.style.setProperty(key, value);
}

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

document.addEventListener("DOMContentLoaded", main)
