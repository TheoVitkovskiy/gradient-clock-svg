import ShareFacebook from "./i-morph-share.js";
import BgMoving from "./bg-moving.js";
import IFullScreen from "./i-full-screen.js";
import IShare from "./i-share.js";
import IMute from "./i-mute.js";
import IToggleThemes from "./i-toggle-themes.js";

export const registerElements = () => { 
    customElements.define("bg-moving", BgMoving);
    customElements.define("i-morph-share", ShareFacebook);
    customElements.define("share-ui", IShare)
    customElements.define("i-full-screen", IFullScreen);
    customElements.define("i-toggle-themes", IToggleThemes);
    customElements.define("i-mute", IMute);
}