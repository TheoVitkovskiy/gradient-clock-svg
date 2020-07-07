const createFavicon = () => {
    const HREF_ALT = 'img/favicon.png';
    const HREF_MAIN = 'img/faviconGreen.png';
    const HREF_BREAK_1 = 'img/favicon_breakGreen_center.png';
    const HREF_1 = 'img/faviconGreenLight.png';
    const HREF_2 = 'img/faviconYellow.png';
    const HREF_3 = 'img/faviconOrange.png';
    const HREF_4 = 'img/favicon.png';
    const ALARM_INTERVAL_MS = 800;

    const favicon = document.getElementById('favicon');

    let alarmInterval = null;

    const setHref = (href) => {
        favicon.href = href;
    }

    const toggleForAlarm = () => {
        setHref(
            favicon.href.includes(HREF_MAIN) 
            ? HREF_ALT 
            : HREF_MAIN
        );
    }

    return {
        setToBreak() {
            setHref(HREF_BREAK_1);
        },
        reset() {
            setHref(HREF_MAIN);
        },
        updateRipe(fractionFilled) {
            if (fractionFilled > 0) {
                setHref(HREF_1);
            }
            if (fractionFilled > 0.25) {
                setHref(HREF_2);
            }
            if (fractionFilled > 0.5) {
                setHref(HREF_3);
            }
            if (fractionFilled > 0.75) {
                setHref(HREF_4);
            }
        },
        resetAlarm() {
            clearInterval(alarmInterval);
            setHref(HREF_MAIN);
        },
        playAlarm() {
            alarmInterval = setInterval(toggleForAlarm, ALARM_INTERVAL_MS);
        }
    }
}

const favicon = createFavicon();

export {
    favicon
}