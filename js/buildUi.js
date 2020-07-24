import buildTheme from "./buildTheme.js";
import { alarm } from "./alarm.js";

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
      document.exitFullscreen && document.exitFullscreen();
  }
}

const buildUi = () => { 
    let themeName = "light"
    document.querySelector(".ui").addEventListener("click", () => {
        console.log("bin in display-ui")
        const toggleDisplayUi = () => {
            console.log("bin in toggle-display-ui")
            document.querySelector(".ui").classList.toggle("display-ui")
            event.stopPropagation();
        }
        toggleDisplayUi()

    })

    document.querySelector("body").addEventListener("click", () => {
        document.querySelector(".ui").classList.remove("display-ui")
    })

    document.querySelector("i-toggle-themes").addEventListener("click", () => {
        if (themeName === "dark") {
            themeName = "light"
        } else {
            themeName = "dark"
        }
        buildTheme(themeName);
        event.stopPropagation();
    }) 

    document.querySelector("i-mute").addEventListener("click", () => { 
        alarm.toggleMute()
        event.stopPropagation();
    } )

    document.querySelector("i-full-screen").addEventListener("click", () => {
        console.log("bin in buildUi")
        toggleFullScreen()
        event.stopPropagation();
    })

    
}
export default buildUi 