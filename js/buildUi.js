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
            document.querySelector(".underLayer").classList.toggle("short")
            event.stopPropagation();
        }
        toggleDisplayUi()

    })

    document.querySelector("body:not(.rectangle)").addEventListener("click", (event) => {
        document.querySelector(".ui").classList.remove("display-ui")
        document.querySelector("share-ui").removeAttribute("visible")
        document.querySelector(".underLayer").classList.remove("short")
        document.querySelector(".underLayer").classList.remove("long")
    })

    document.querySelector(".rectangle").addEventListener("click", (event) => {
        event.stopPropagation();
    })

    document.querySelector("i-toggle-themes").addEventListener("click", (event) => {
        if (themeName === "dark") {
            themeName = "light"
        } else {
            themeName = "dark"
        }
        buildTheme(themeName);
        event.stopPropagation();
    }) 

    document.querySelector("i-mute").addEventListener("click", (event) => { 
        alarm.toggleMute()
        event.stopPropagation();
    } )

    document.querySelector("i-full-screen").addEventListener("click", (event) => {
        console.log("bin in buildUi")
        toggleFullScreen()
        event.stopPropagation();
    })

    document.querySelector("i-share").addEventListener("click", (event) => {
        // setTimeout(() => { 
            document.querySelector("share-ui").toggleAttribute("visible")
        // }, 300)
        document.querySelector(".underLayer").classList.toggle("long")
        event.stopPropagation();
    })

    
}
export default buildUi 