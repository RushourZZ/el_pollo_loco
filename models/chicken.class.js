import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 70;
    hasFrame = true;

    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIES_CHICKEN_NORMAL.walk[0]);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_NORMAL.walk);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_NORMAL.dead);

        this.x = 450 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    //#region chicken animation
    animate() {
        IntervalHub.startInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        IntervalHub.startInterval(() => {
            if (this.isDead()) {
                this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_NORMAL.dead];
            } else {
                let i = this.currentImage % ImageHub.ENEMIES_CHICKEN_NORMAL.walk.length;
                this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_NORMAL.walk[i]];
                this.currentImage++;
            }
        }, 7800 / 60);
    }

    moveLeft() {
        this.x -= this.speed;
    }
    //#endregion chicken animation
}
