import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Character extends MovableObject {
    height = 280;
    y = 155;
    constructor() {
        super();
        this.loadImage(ImageHub.CHARACTER.idle[0]);

        this.loadImages(ImageHub.CHARACTER.idle);

        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.CHARACTER.idle.length;
            this.img = this.imageCache[ImageHub.CHARACTER.idle[i]];
            this.currentImage++;
        }, 7800 / 60);
    }

    jump() {}
}
