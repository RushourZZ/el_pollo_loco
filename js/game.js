import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";
import { SoundHub } from "../manager_classes/soundHub.js";

let canvas;

let world;

let keyboard = new Keyboard();

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("quitButton").addEventListener("click", quitGame);


function startGame() {
    document.getElementById("startScreen").classList.add("displayNone");
    init();
    SoundHub.gameStart.play()
    SoundHub.BACKGROUND.play()
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

window.init = init;
window.keyboard = keyboard;
