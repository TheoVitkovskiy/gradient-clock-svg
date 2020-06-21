const main = () => {
    setCustomTimer();
    config = getConfigFromCSS()
    console.log(config);
    orange = createFruit('orange');
    tomato = createFruit('tomato');
    pear = createFruit('pear');
    apple = createFruit('apple');
    setTimerOnClick();
    setCSSVariables(
        calculateDynamicValues()
    );
}

let config = null;
let orange = null;
let tomato = null;
let pear = null;
let apple = null;

function createFruit(name) {
    let startMs = null;
    let ripeMs = config[name + '-ripe-minutes'] * 60 * 1000;

    const htmlElement = document.querySelector('.' + name);
    const clockMain = htmlElement.querySelector('.clock');
    const clockFace = htmlElement.querySelector('.clockFace');

    return {
        setStartMs(ms) {
            startMs = ms;  
        },
        getStartMs() {
            return startMs;
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
        addRipeAnim() {
            clockMain.classList.add('animClock' + capitalize(name));
            clockFace.classList.add('animClockFace' + capitalize(name));
        },
        reset() {
            clockMain.classList.remove('animClock' + capitalize(name));
            clockFace.classList.remove('animClockFace' + capitalize(name));
        }
    }
}

const getNowMs = () => {
    const date = new Date();
    return date.getTime();
}


const setTimerOnClick = () => {
    const clocks = [...document.querySelectorAll('.clockContainer')]; 
    clocks.forEach(clock => {
        clock.addEventListener('click', clockOnClick);
    });
}

const clockOnClick = (e) => {
    const clock = e.currentTarget;

    const clockMain = clock.querySelector('.clock');
    const clockFace = clock.querySelector('.clockFace');
    const clockBody = clock.querySelector('.clockBody');
    const clockTime = clock.querySelector('.clockTime');
    const clockDot = clock.querySelector('.clockDot');
    const clockDotSVG = clock.querySelector('.clockDot svg');

    const fruit = getClickedFruit(clock);
    console.log({'isIdle' : fruit.isIdle(), 'isRipe' : fruit.isRipe()});

    if (fruit.isIdle()){
        fruit.setStartMs(getNowMs());
        fruit.addRipeAnim();
       
        clockFace.classList.add('animClockFace');
        clockBody.classList.add('animClockBody');
        clockTime.classList.add('animClockTime');
        clockDot.classList.add('animClockDot');
        clockDotSVG.classList.add('animClockDot');
    } else if (fruit.isRipe()) {
        fruit.setStartMs(null);
        fruit.reset();

        clockFace.classList.remove('animClockFace');
        clockBody.classList.remove('animClockBody');
        clockTime.classList.remove('animClockTime');
        clockDot.classList.remove('animClockDot');
        clockDotSVG.classList.remove('animClockDot');
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
