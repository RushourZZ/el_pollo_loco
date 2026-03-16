import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { ImageHub } from "../manager_classes/imageHub.js";

let canvas;
let world;
let keyboard = new Keyboard();

//#region event listeners
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("quitButton").addEventListener("click", quitGame);
document.getElementById("muteButton").addEventListener("click", toggleMute);
document.getElementById("quitButtonWon").addEventListener("click", quitGame);
document.getElementById("restartButton").addEventListener("click", restartGame);
document.getElementById("restartButtonWon").addEventListener("click", restartGame);
//#endregion event listeners

/**
 * Starts the game: hides the start screen, loads images and initializes the world.
 */
async function startGame() {
    document.getElementById("startScreen").classList.add("displayNone");
    enterFullscreen();
    await preloadImages();
    init();
    SoundHub.gameStart.play();
    SoundHub.BACKGROUND.play();
    SoundHub.BACKGROUND.loop = true;
}



/**
 * Quits the game by reloading the page.
 */
async function quitGame() {
    await exitFullscreen();
    location.reload();
}

/**
 * Initializes the canvas and creates a new game world instance.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    window.world = world;
}

/**
 * Toggles the mute state and updates the button icon.
 */
function toggleMute() {
    SoundHub.toggleMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted ? "🔇" : "🔈";
}

/**
 * Applies the stored mute state and sets the button icon.
 */
function muteState() {
    SoundHub.applyMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted ? "🔇" : "🔈";
}

muteState();

/**
 * Restarts the game: stops intervals, resets sounds and reinitializes.
 */
function restartGame() {
    IntervalHub.stopAllIntervals();
    SoundHub.resetAllSounds();
    document.getElementById("gameOverScreen").classList.add("displayNone");
    document.getElementById("gameWonScreen").classList.add("displayNone");
    init();
    SoundHub.gameStart.play();
    SoundHub.BACKGROUND.play();
}

/**
 * Preloads all game images to prevent stuttering during gameplay.
 * @returns {Promise} Resolves when all images are loaded.
 */
function preloadImages() {
    let paths = ImageHub.getAllPaths();
    let promises = paths.map((path) => {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = path;
        });
    });
    return Promise.all(promises);
}

/**
 * Activates fullscreen mode on touch devices.
 */
function enterFullscreen() {
    if (!matchMedia("(pointer: coarse)").matches) return;
    let game = document.getElementById("game");
    game.classList.add("fullscreen");
    if (game.requestFullscreen) game.requestFullscreen();
}

/**
 * Exits fullscreen mode if active.
 */
async function exitFullscreen() {
    document.getElementById("game").classList.remove("fullscreen");
    if (document.fullscreenElement) await document.exitFullscreen();
}



window.init = init;
window.keyboard = keyboard;
