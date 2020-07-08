import { globalAlarm } from './globalAlarm.js';
import { customTimer } from './customTimer.js';
import { fruitContainer } from './fruitContainer.js';
import {
    vibrateInMs,
    setDocProperty
} from './helpers.js';
import updateFruit from './updateFruit.js';
import calculateDynamicValues from './calculateDynamicValues.js';

const { orange, tomato, pear, apple } = fruitContainer;

const main = () => {
    animateBackground();
    setInterval(animateBackground, 3000);
    addOnClickToClocks();
    calculateDynamicValues();
    customTimer.set();
    registerSW();
    window.addEventListener('beforeunload', (e) => {
        globalAlarm.saveData();
    });
}
//   background: no-repeat center/100% url(/img/containerBg_flex1.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex2.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex3.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex4.svg),
//     /* no-repeat center/100% url(/img/bg/containerBg_flex5.svg), */ no-repeat
//       center/100% url(/img/bg/containerBg_flex6.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex7.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex8.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex9.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex10.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex11.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex12.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex13.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex14.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex15.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex16.svg),
//     /* no-repeat center/100% url(/img/bg/containerBg_flex17.svg), */ no-repeat
//       center/100% url(/img/bg/containerBg_flex18.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex19.svg),
//     no-repeat center/100% url(/img/bg/containerBg_flex20.svg);

const animateBackground = () => {
    const imgCount = 20;
    const turnOffCount = 4;

    const turnOffPositions = getRandomPositions(turnOffCount, imgCount);
    const randomApple = getRandomApple();
    const backgroundString = generateBackgroundString(imgCount, randomApple);

    setDocProperty('--bg-background', backgroundString);
}

const getRandomApple = () => {
    const firstApple = [1, 2, 3, 6, 7, 8, 14, 17, 13];
    const secondApple = [4, 5, 9, 10];
    const thirdApple = [14, 15, 18, 16];
    const fourthApple = [9, 11, 12, 13, 17, 19];
    const fifthApple = [20, 11];

    const apples = [firstApple, secondApple, thirdApple, fourthApple, fifthApple];
    const appleIndex = Math.floor(Math.random() * apples.length) + 1;
    return apples[appleIndex];
}

const getRandomPositions = (count, maxCount) => {
    const randomPositions = [];
    while (randomPositions.length < count) {
        for (let i = 0; i < count; i++) {
            const position = Math.floor(Math.random() * maxCount) + 1;
            if (randomPositions.includes(position)) {
                continue;
            }
            randomPositions.push(position);
        }
    }

    return randomPositions;
}

// const swapAnimation = () => {
//     let color = 'red';
//     setInterval(() => {
//         setDocProperty('--bg-background', color);
//         if (color == 'red') {
//             color = 'green';
//         } else {
//             color = 'red';
//         }
//     }, 2000);
// }

const generateBackgroundString = (imgCount, turnOffPositions) => {
    let string = '';
    for (let i = 1; i <= imgCount; i++) {
        if (turnOffPositions.includes(i)) {
            continue;
        }
        string += `no-repeat center/100% url(/img/containerBg_flex${i}.svg)`;
        string += ',';
    }
    string = string.slice(0, -1);
    console.log(string);
    return string;
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