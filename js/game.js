import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";

let canvas;

let world;

let keyboard = new Keyboard();

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
    document.getElementById("startScreen").classList.add("displayNone");
    init();
}

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    window.world = world;

    console.log("My Caracter is", world.character);
}

window.init = init;
window.keyboard = keyboard;
