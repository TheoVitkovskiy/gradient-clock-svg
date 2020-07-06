import {vibrateInPattern} from './helpers.js';
function createAlarm() {
    const ALARM_AMOUNT = 3;
    const ALARM_DELAY_MS = 4500;
    const ALARM_FAVICON_DELAY_MS = 800;

    const audio = new Audio('./sounds/Tea-bell-sound-effect.mp3');
    const HREF_ALT = 'img/favicon.png';
    const HREF_MAIN = 'img/faviconGreen.png';

    let alarmTimeout = null;
    let faviconInterval = null;
    let isPlaying = false;

    const playAlarm = () => {
        isPlaying = true;
        playSoundAlarm();
        playVibrateAlarm();
        playFaviconAlarm();
        playNotificationAlarm();
    };

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
        vibrateInPattern([40, 30, 100]);
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
        if (isPlaying) {
            audio.play();
        }
    }

    const resetFaviconAlarm = () => {
        clearInterval(faviconInterval);
        const favicon = document.getElementById('favicon');
        favicon.href = HREF_MAIN;
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
            resetSoundAlarm();
            resetFaviconAlarm();
            clearTimeout(alarmTimeout);
        },
    }

}

const alarm = createAlarm();

export {
    alarm
}