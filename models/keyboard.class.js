import { SoundHub } from "../manager_classes/soundHub.js";

export class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    constructor() {
        this.addEvents();
    }

    addEvents() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                this.RIGHT = true;
            }
            if (event.key === "ArrowLeft") {
                this.LEFT = true;
            }
            if (event.key === "ArrowUp") {
                this.UP = true;
            }
            if (event.key === "ArrowDown") {
                this.DOWN = true;
            }
            if (event.key === " ") {
                this.SPACE = true;
            }
            if (event.key === "d") {
                this.D = true;
            }
            console.log(event.key);
        });

        window.addEventListener("keyup", (event) => {
            if (event.key === "ArrowRight") {
                this.RIGHT = false;
                SoundHub.CHARACTER.walk.pause();
            }
            if (event.key === "ArrowLeft") {
                this.LEFT = false;
                SoundHub.CHARACTER.walk.pause();
            }
            if (event.key === "ArrowUp") {
                this.UP = false;
                
            }
            if (event.key === "ArrowDown") {
                this.DOWN = false;
            }
            if (event.key === " ") {
                this.SPACE = false;
            }
        });
    }
}
