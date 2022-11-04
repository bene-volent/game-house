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

var screenStack = [".intro-screen", ".rps", ".tictactoe", ".minesweeper"].map(
    (value, index, arr) => {
        return document.querySelector(value);
    }
);

var onScreen = 0;
function animateNext() {
    if (onScreen < screenStack.length - 1) {
        screenStack[++onScreen].toggleAttribute("CurrentScreen");
    }
}
function animatePrev() {
    if (onScreen > 0) {
        screenStack[onScreen--].toggleAttribute("CurrentScreen");
    }
}

// document.addEventListener("mousemove",(e)=>{
//     screenStack[1].style.width = `${e.clientX/window.innerWidth * 100}%`
//     screenStack[2].style.width = `${e.clientX/window.innerWidth * 100 - 25}%`
//     screenStack[3].style.width = `${e.clientX/window.innerWidth * 100 - 50}%`
// })
var prevArrow = document.querySelector(`.arrows.prev-arrow`);
var nextArrow = document.querySelector(`.arrows.next-arrow`);

function enableNextArrows() {
    var arrow = nextArrow;
    if (arrow) {
        if (arrow.hasAttribute("disabled")) {
            arrow.toggleAttribute("disabled");
            arrow.toggleAttribute("aria-disabled", false);
        }
    }
}

function disableNextArrows() {
    var arrow = nextArrow;
    if (arrow) {
        if (!arrow.hasAttribute("disabled")) {
            arrow.toggleAttribute("disabled");
            arrow.toggleAttribute("aria-disabled", true);
        }
    }
}
function enablePrevArrows() {
    var arrow = prevArrow;
    if (arrow) {
        if (arrow.hasAttribute("disabled")) {
            arrow.toggleAttribute("disabled");
            arrow.toggleAttribute("aria-disabled", false);
        }
    }
}
function disablePrevArrows() {
    var arrow = prevArrow;
    if (arrow) {
        if (!arrow.hasAttribute("disabled")) {
            arrow.toggleAttribute("disabled");
            arrow.toggleAttribute("aria-disabled", true);
        }
    }
}

prevArrow.addEventListener("click", () => {
    // If Intro-screen is already visible
    if (onScreen == 0) {
        prevArrow.style.animation = "";
        prevArrow.offsetHeight;
        prevArrow.style.animation = "shakeOnDisabled 500ms linear";
        return;
    }

    // If other screen is present
    if (onScreen != 0) {
        animatePrev();
        enableNextArrows();
    }
    // Incase Intro-screen is now present
    if (onScreen == 0) {
        disablePrevArrows();
    }
});

nextArrow.addEventListener("click", () => {
    // If Intro-screen is already visible
    if (onScreen == screenStack.length - 1) {
        nextArrow.style.animation = "";
        nextArrow.offsetHeight;
        nextArrow.style.animation = "shakeOnDisabled 500ms linear";
        return;
    }

    // If other screen is present
    if (onScreen != screenStack.length - 1) {
        animateNext();
        enablePrevArrows();
    }
    // Incase Intro-screen is now present
    if (onScreen == screenStack.length - 1) {
        disableNextArrows();
    }
});

function setupArrows() {
    if (window.innerWidth <= 768) {
        prevArrow.classList.remove("fa-chevron-circle-left");
        prevArrow.classList.add("fa-chevron-circle-up");

        nextArrow.classList.remove("fa-chevron-circle-right");
        nextArrow.classList.add("fa-chevron-circle-down");
    } else {
        prevArrow.classList.add("fa-chevron-circle-left");
        prevArrow.classList.remove("fa-chevron-circle-up");

        nextArrow.classList.add("fa-chevron-circle-right");
        nextArrow.classList.remove("fa-chevron-circle-down");
    }
}


var resizeTimer;
window.addEventListener("resize", () => {
    setupArrows();

    screenStack.forEach((_screen, index) => {
        if (index != onScreen) {
            _screen.style.opacity = "0";
        }
    });
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        screenStack.forEach((_screen, index) => {
            if (index != onScreen) {
                _screen.style.opacity = "1";
            }
        });
    },1000);
});

document.addEventListener = startingSequence;
setupArrows()
