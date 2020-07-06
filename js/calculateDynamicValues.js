import {config} from './config.js';
import {setVariableInSec} from './helpers.js';
export default function calculateDynamicValues() {
    setCSSVariables(
        calculate()
    );
}

const setCSSVariables = (values) => {
    for (const key in values) {
        setVariableInSec('--' + key, values[key]);
    }
}

const calculate = () => {
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