
const getConfig = () => {
    const config = {};

    const docStyle = getComputedStyle(document.documentElement);

    // ToDo: find a way to make it dynamic
    config['orange-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--orange-ripe-minutes'));
    config['tomato-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--tomato-ripe-minutes'));
    config['apple-ripe-minutes'] = getCustomTime();
    config['pear-ripe-minutes'] = parseFloat(docStyle.getPropertyValue('--pear-ripe-minutes'));
    config['pre-ripe-delay'] = parseFloat(docStyle.getPropertyValue('--pre-ripe-delay'));
    config['pre-ripe-dur'] = parseFloat(docStyle.getPropertyValue('--pre-ripe-dur'));
    config['dot-delay'] = parseFloat(docStyle.getPropertyValue('--dot-delay'));
    config['success-dur'] = parseFloat(docStyle.getPropertyValue('--success-dur'));

    return config;
}

const getCustomTime = () => {
    const customTime = getQueryParamValue('minutes');
    return customTime;
}

const getQueryParamValue = (qParam) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(qParam);
}


export default getConfig();