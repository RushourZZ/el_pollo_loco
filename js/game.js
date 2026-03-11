import { World } from "../models/world.class.js";
import { Keyboard } from "../models/keyboard.class.js";

let canvas;

let world;

let keyboard = new Keyboard();


window.init = init;

function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    window.world = world;


    console.log("My Caracter is", world.character);
}



window.keyboard = keyboard;