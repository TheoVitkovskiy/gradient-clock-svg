const createScreen = () => {
    let isFull = false;
    
    const goFullScreen = () => {
        document.documentElement.requestFullscreen();
    }

    const leaveFullScreen = () => {
        document.exitFullscreen();
    }

    return {
        toggleFullScreen() {
            if(!isFull) {
                isFull = true;
                goFullScreen();
            } else {
                isFull = false;
                console.log("leaveFullScreen")
                leaveFullScreen();
            }
        }      
    }
    
}
 

const screen = createScreen();

export {
    screen,
}