import ShareFacebook from "./i-morph-share.js";
import BgMoving from "./bg-moving.js";
import ShareUi from "./share-ui.js";

export const registerElements = () => { 
    customElements.define("bg-moving", BgMoving);
    customElements.define("i-morph-share", ShareFacebook);
    customElements.define("share-ui", ShareUi)
}