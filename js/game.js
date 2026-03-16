import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { ImageHub } from "../manager_classes/imageHub.js";

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Keyboard} */
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
 * Startet das Spiel: blendet den Startbildschirm aus, laedt Bilder und initialisiert die Welt.
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
 * Beendet das Spiel durch Neuladen der Seite.
 */
async function quitGame() {
    await exitFullscreen();
    location.reload();
}

/**
 * Initialisiert das Canvas und erstellt eine neue Spielwelt-Instanz.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    window.world = world;
}

/**
 * Schaltet den Mute-Zustand um und aktualisiert das Button-Symbol.
 */
function toggleMute() {
    SoundHub.toggleMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted ? "🔇" : "🔈";
}

/**
 * Wendet den gespeicherten Mute-Zustand an und setzt das Button-Symbol.
 */
function muteState() {
    SoundHub.applyMute();
    document.getElementById("muteButton").textContent = SoundHub.isMuted ? "🔇" : "🔈";
}

muteState();

/**
 * Startet das Spiel neu: stoppt Intervalle, setzt Sounds zurueck und initialisiert neu.
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
 * Laedt alle Spielbilder vorab, um Laderuckler waehrend des Spiels zu vermeiden.
 * @returns {Promise<void[]>} Wird aufgeloest, wenn alle Bilder geladen sind.
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
 * Aktiviert den Vollbildmodus auf Touch-Geraeten.
 */
function enterFullscreen() {
    if (!matchMedia("(pointer: coarse)").matches) return;
    let game = document.getElementById("game");
    game.classList.add("fullscreen");
    if (game.requestFullscreen) game.requestFullscreen();
}

/**
 * Beendet den Vollbildmodus, falls aktiv.
 */
async function exitFullscreen() {
    document.getElementById("game").classList.remove("fullscreen");
    if (document.fullscreenElement) await document.exitFullscreen();
}



window.init = init;
window.keyboard = keyboard;
