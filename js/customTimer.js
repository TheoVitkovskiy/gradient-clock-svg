import { minutesToMs } from './helpers.js';
import { config } from './config.js';
import { fruitContainer } from './fruitContainer.js';
import calculateDynamicValues from './calculateDynamicValues.js';
import updateFruit from './updateFruit.js';

const { apple } = fruitContainer;

const createCustomTimer = () => {
    const customTimeInput = document.querySelector('.customTime');
    const CUSTOM_PLACEHOLDER = 'XXX';

    let isUserTyping = false;
    let isUserInputDirty = false;

    customTimeInput.addEventListener('blur', () => {
        if (customTimeInput.value == '') {
            customTimeInput.value = CUSTOM_PLACEHOLDER;
        }
        isUserTyping = false;
        isUserInputDirty = false;
    });

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
                calculateDynamicValues();
                apple.setRipeMs(minutesToMs(minutesFromInput));
                updateFruit(apple);
            }
        });
    }

    return {
        isUserInputDirty,
        isUserTyping,
        set() {
            setCustomTimer()
        },
        setIsUserTyping(isTyping) {
            isUserTyping(isTyping);
        },
        focus() {
            if (isUserTyping) {
                return;
            }
            customTimeInput.focus();
            if (customTimeInput.value === CUSTOM_PLACEHOLDER) {
                customTimeInput.value = '';
            }
            isUserTyping = true;
        },
        blur() {
            isUserTyping = false;
            customTimeInput.blur();
        }
    }
}

const customTimer = createCustomTimer();

export {
    customTimer
}

