import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";

export class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super();
        this.loadImage(ImageHub.BACKGROUND_LAYERS.clouds[0], ImageHub.BACKGROUND_LAYERS.clouds[1]);
        this.x = 200 + Math.random() * 500;

        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}
