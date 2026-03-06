let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    ctx.drawImage(ImageHub.CHARACTER.pepe, 20, 20, 50.150)
}