import {vibrateInPattern} from './helpers.js';
import { favicon } from './favicon.js';

function createAlarm() {
    const ALARM_AMOUNT = 3;
    const ALARM_DELAY_MS = 4500;

    const audio = new Audio('./sounds/Tea-bell-sound-effect.mp3');

    let alarmTimeout = null;
    let isPlaying = false;

    const playAlarm = () => {
        isPlaying = true;
        favicon.playAlarm();
        playSoundAlarm();
        playVibrateAlarm();
        playNotificationAlarm();
    };

    const playNotificationAlarm = () => {
        new Notification('Alarm!', {
            body: 'Alarm!!!',
            vibrate: [150, 50, 150, 50, 150]
        })
    }

    const playVibrateAlarm = () => {
        vibrateInPattern([40, 30, 100]);
    }

    const playSoundAlarm = () => {
        for (let i = 0; i < ALARM_AMOUNT; i++) {
            setTimeout(playSound, i * ALARM_DELAY_MS);
        }
    }

    const playSound = () => {
        if (isPlaying) {
            audio.play();
        }
    }

    const resetSoundAlarm = () => {
        audio.pause();
        audio.currentTime = 0;
    }

    return {
        isPlaying() {
            return isPlaying;    
        },
        set(ms) {
            alarmTimeout = setTimeout(playAlarm, ms);
        },
        reset() {
            isPlaying = false;
            favicon.resetAlarm();
            resetSoundAlarm();
            clearTimeout(alarmTimeout);
        },
    }

}

const alarm = createAlarm();

export {
    alarm
}