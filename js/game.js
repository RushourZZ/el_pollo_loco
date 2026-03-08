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

window.addEventListener("keydown", (event) => {
    if(event.keyCode === 39){
        keyboard.RIGHT = true;
    }
    if(event.keyCode === 37){
        keyboard.LEFT = true;
    }
    if(event.keyCode === 38){
        keyboard.UP = true;
    }
    if(event.keyCode === 40){
        keyboard.DOWN = true;
    }
    if(event.keyCode === 32){
        keyboard.SPACE = true;
    }
    
    console.log(event.key);
});

window.addEventListener("keyup", (event) => {
    if(event.keyCode === 39){
        keyboard.RIGHT = false;
    }
    if(event.keyCode === 37){
        keyboard.LEFT = false;
    }
    if(event.keyCode === 38){
        keyboard.UP = false;
    }
    if(event.keyCode === 40){
        keyboard.DOWN = false;
    }
    if(event.keyCode === 32){
        keyboard.SPACE = false;
    }
    
    console.log(event.key);
});

window.keyboard = keyboard;