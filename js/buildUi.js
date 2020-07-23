import buildTheme from "./buildTheme.js"
import { alarm } from "./alarm.js";

const buildUi = () => { 
    let themeName = "light"

    document.querySelector("i-toggle-themes").addEventListener("click", () => {
        if (themeName === "dark") {
            themeName = "light"
        } else {
            themeName = "dark"
        }
        buildTheme(themeName);
    }) 

    document.querySelector("i-mute").addEventListener("click", () =>{ 
        alarm.toggleMute()
    } )
}
export default buildUi 