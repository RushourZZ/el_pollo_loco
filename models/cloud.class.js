import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

/**
 * Decorative cloud that slowly moves to the left.
 * @extends MovableObject
 */
export class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Creates a cloud at a random X position and starts the movement.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.BACKGROUND_LAYERS.clouds[0], ImageHub.BACKGROUND_LAYERS.clouds[1]);
        this.x = 200 + Math.random() * 2000;

        this.animate();
    }

    /**
     * Starts the continuous leftward movement of the cloud.
     */
    animate() {
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
    }
}
