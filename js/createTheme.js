import themeConfig from '../theme.js'
import {setDocProperty} from './helpers.js'
const buildTheme = () => {
    const THEME = "light"
    const theme = themeConfig[THEME];

    setThemeCSS(theme)
    // setThemeCSS(lightTheme)
    // const variableNames = getVariableNames(darkTheme);
    // console.log(getAllKeyValues(darkTheme));

}
const setThemeCSS = (obj) => {
    
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        const value = obj[key];
        setDocProperty("--" + key, value)
    }) 
}
 let THEME = "" 
 document.querySelector("i-toggle-themes").addEventListener("click", () => {
     
     //let THEME = ""
     if (THEME === "dark") {
         THEME = "light"
     } else {
        THEME = "dark"
     }
     const theme = themeConfig[THEME];
     setThemeCSS(theme);
     
 }) 














/*first attemt to flatten object*/
const getVariableNames = (theme) => {
    const keys = Object.keys(theme);
    const allKeys = getAllKeys(theme);
}
const getAllKeys = (obj) => {
    const allKeys = Object.keys(obj);
    allKeys.forEach((key) => {
        if (!obj[key]) {
            return allKeys;
        }
        const keys = getAllKeys(obj[key]);
        allKeys.push(keys);

    })
    
    return allKeys;
}
const getAllKeyValues = (obj) => {
    const allKeyValues = {};
    const allKeys = Object.keys(obj);

    allKeys.forEach((key) => {
        let value = obj[key];

        let fullKey = '';
        while(isObject(value)) {
            fullKey += key;
            value = value[key];
            console.log(fullKey);
            console.log(value);
        }

        allKeyValues[fullKey] = value;
    });

    return allKeyValues;
}

const getFullKey = (key, ) => {

}

const isObject = (obj) => {
    return obj === Object(obj);
}




export default buildTheme;