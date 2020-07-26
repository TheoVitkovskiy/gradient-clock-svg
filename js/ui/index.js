import ShareFacebook from "./i-morph-share.js";
import BgMoving from "./bg-moving.js";

export const registerElements = () => { 
    customElements.define("bg-moving", BgMoving);
    customElements.define("i-morph-share", ShareFacebook);
}