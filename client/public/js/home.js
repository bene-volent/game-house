function startingSequence() {
    const loadingScreen = document.querySelector(".loading-scene");

    var count = 0;
    
    const interval = setInterval(() => {
        count++;
        if (count > 3) {
            clearInterval(interval);
            loadingScreen.toggleAttribute("complete");
            loadingScreen.toggleAttribute("loading");
            setTimeout(() => {
                loadingScreen.remove();
            }, 1000);
        }
    }, 1000);
}

document.querySelector("body").onload = startingSequence;
