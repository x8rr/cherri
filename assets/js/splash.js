const splashes = [
    "wsp",
    "made by x8r",
    "im hungry",
    "w speed",
    "scramjet > ultraviolet",
    "social stuff coming soon",
    "penguins :thumbs-up:",
    "plz star",
    "sock",
    "sdakjlfhaskdfg",
    "AAAAAAAAAA AUTH WORKS OMD AYYAYAYAYA"
]

const randomSplashN = Math.floor(Math.random() * splashes.length)
const randomSplash = splashes[randomSplashN]

const splashTextEl = document.getElementById("splash")
splashTextEl.textContent = randomSplash