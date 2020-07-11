import { globalTimer } from './globalTimer.js';
import { customTimer } from './customTimer.js';
import { fruitContainer } from './fruitContainer.js';
import {
    vibrateInMs 
} from './helpers.js';
import updateFruit from './updateFruit.js';
import calculateDynamicValues from './calculateDynamicValues.js';

const { orange, tomato, pear, apple } = fruitContainer;

const main = () => {
    addOnClickToClocks();
    calculateDynamicValues();
    customTimer.set();
    window.addEventListener('beforeunload', (e) => {
        globalTimer.saveData();
    });
    registerSW();
}

const addOnClickToClocks = () => {
    [...document.querySelectorAll('.clockContainer')].forEach(clock => {
        clock.addEventListener('click', clockOnClick);
    });
}

const clockOnClick = (e) => {
    vibrateInMs(10);
    const fruit = getClickedFruit(e.currentTarget);
    updateFruit(fruit);
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

main();