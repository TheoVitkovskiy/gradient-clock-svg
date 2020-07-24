import buildTheme from "./buildTheme.js";
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


    document.querySelector("i-full-screen").addEventListener("click", () => {
        console.log("bin in buildUi")
        toggleFullScreen()
    })
}
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      document.exitFullscreen && document.exitFullscreen();
  }
}
export default buildUi 