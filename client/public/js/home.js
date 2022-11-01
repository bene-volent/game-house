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
            }, 2000);
        }
    }, 1000);
}

var screenStack = [
    ".intro-screen",
    ".rock-paper-scissors",
    ".tic-tac-toe",
    ".minesweeper",
].map((value, index, arr) => {
    return document.querySelector(value);
});
var currentIndex = 0;

function rotateStackForward() {
    for (let i = 0; i < screenStack.length - 1; i++) {
        var tmp = screenStack[i];
        screenStack[i] = screenStack[i + 1];
        screenStack[i + 1] = tmp;
    }
    return screenStack;
}
function rotateStackBackward() {
    for (let i = screenStack.length-1; i >0; i--) {
        var tmp = screenStack[i];
        screenStack[i] = screenStack[i - 1];
        screenStack[i - 1] = tmp;
    }
    return screenStack;
}

function setPosition(isDeviceLarge) {
    for (var i = 0; i < screenStack.length; i++)
        if (isDeviceLarge) {
            screenStack[i].style.left = `${i * 100}%`;
            screenStack[i].style.top = `0`;
        } else {
            screenStack[i].style.top = `${i * 100}vh`;
            screenStack[i].style.left = `0`;
        }
}

var moveAnimationInterval;

function nextAnimation() {
    var timeToNext = 2;
    var isDeviceLarge = window.matchMedia("( width > 768px )").matches;

    var distanceEachFrame = (100 / timeToNext) * (60 / 1000);
    var x = 100;

    function updateScreen() {
        if (isDeviceLarge) screenStack[1].style.left = `${x}%`;
        else screenStack[1].style.top = `${x}vh`;
    }

    isDeviceLarge
        ? (screenStack[1].style.top = `0`)
        : (screenStack[1].style.left = `0`);
    updateScreen();

    screenStack[0].style.zIndex = 0;
    screenStack[1].style.zIndex = 1;

    if (moveAnimationInterval) {
        x = 0;
        updateScreen();
        x = 100;
        rotateStackForward();
        updateScreen();

        setPosition(isDeviceLarge);

        clearInterval(moveAnimationInterval);
    }
    screenStack[0].style.zIndex = 0;
    screenStack[1].style.zIndex = 1;

    moveAnimationInterval = setInterval(() => {
        x -= distanceEachFrame;
        updateScreen();
        if (x <= 0) {
            x = 0;
            rotateStackForward();
            updateScreen();

            setPosition(isDeviceLarge);

            clearInterval(moveAnimationInterval);
            moveAnimationInterval = undefined;
        }
    }, 1000 / 60);
}

function prevAnimation() {
    var timeToNext = 2;
    var isDeviceLarge = window.matchMedia("( width > 768px )").matches;

    var distanceEachFrame = (100 / timeToNext) * (60 / 1000);
    var x = -100;

    function updateScreen() {
        if (isDeviceLarge) screenStack[screenStack.length-1].style.left = `${x}%`;
        else screenStack[screenStack.length-1].style.top = `${x}vh`;
    }

    isDeviceLarge
        ? (screenStack[screenStack.length-1].style.top = `0`)
        : (screenStack[screenStack.length-1].style.left = `0`);
    updateScreen();

    screenStack[0].style.zIndex = 0;
    screenStack[screenStack.length-1].style.zIndex = 1;

    if (moveAnimationInterval) {
        x = 0;
        updateScreen();
        x = -100;
        rotateStackBackward();
        updateScreen();

        setPosition(isDeviceLarge);

        clearInterval(moveAnimationInterval);
    }
    screenStack[0].style.zIndex = 0;
    screenStack[screenStack.length-1].style.zIndex = 1;

    moveAnimationInterval = setInterval(() => {
        x += distanceEachFrame;
        updateScreen();
        if (x >=0) {
            x = 0;
            rotateStackBackward();
            updateScreen();

            setPosition(isDeviceLarge);

            clearInterval(moveAnimationInterval);
            moveAnimationInterval = undefined;
        }
    }, 1000 / 60);
}


document.querySelector("body").onload = startingSequence;
document
    .querySelectorAll(".arrows.next")
    .forEach((ele) => ele.addEventListener("click", nextAnimation));
    document
    .querySelectorAll(".arrows.prev")
    .forEach((ele) => ele.addEventListener("click", prevAnimation));
