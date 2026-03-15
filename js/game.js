import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";


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

//#region 
function startGame() {
    document.getElementById("startScreen").classList.add("displayNone");

    init();
    SoundHub.gameStart.play();
    SoundHub.BACKGROUND.play();
    SoundHub.BACKGROUND.loop = true;
}

function quitGame() {
    location.reload();
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    window.world = world;
    console.log("My Caracter is", world.character);
}

function toggleMute() {
    SoundHub.toggleMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted
        ? "🔇"
        : "🔈";
}

function muteState() {
    SoundHub.applyMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted
        ? "🔇"
        : "🔈";
}

muteState();

function restartGame() {
    IntervalHub.stopAllIntervals();
    SoundHub.resetAllSounds();
    document.getElementById("gameOverScreen").classList.add("displayNone");
    document.getElementById("gameWonScreen").classList.add("displayNone");
    init();
    SoundHub.gameStart.play();
    SoundHub.BACKGROUND.play();
}

window.init = init;
window.keyboard = keyboard;
