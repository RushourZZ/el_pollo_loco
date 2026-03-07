import { World } from "../models/world.class.js";

let canvas;

let world;



function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas);
    window.world = world;

    


    console.log("My Caracter is", world.character);
    
    
}

window.init = init;