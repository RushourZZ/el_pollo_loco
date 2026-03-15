import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { DrawableObject } from "./drawable-object.class.js";

export class Bottle extends DrawableObject {
    height = 100;
    width = 100;

    constructor() {
        super();
        this.loadImage(ImageHub.SALSA_BOTTLE.on_ground_left[0]);
        this.x = 400 + Math.random() * 1800;
        this.y = 350;
    }

    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.SALSA_BOTTLE.on_ground_left.length;
            this.img = this.imageCache[ImageHub.SALSA_BOTTLE.on_ground_left[i]];
            this.currentImage++;
        }, 1000 / 60);
    }
}
