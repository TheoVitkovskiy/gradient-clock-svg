import themeConfig from '../theme.js'
const buildTheme = () => {
    const darkTheme = themeConfig.dark;
    const lightTheme = themeConfig.light;
    const variableNames = getVariableNames(darkTheme);


}
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


export default buildTheme;