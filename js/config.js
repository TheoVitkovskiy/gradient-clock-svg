
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

export default getConfigFromCSS();