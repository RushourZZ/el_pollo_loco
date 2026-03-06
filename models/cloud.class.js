import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

export class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage(
            ImageHub.BACKGROUND_LAYERS.clouds[0],
        );
        this.x = 200 + Math.random() * 500;



        this.animate();
    }

    animate() {
        IntervalHub.startInterval(() => { this.x -= 0.15; }, 1000 / 60);
    }
}
