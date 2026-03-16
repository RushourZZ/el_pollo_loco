import { MovableObject } from "./movable-object.class.js";

/**
 * Background object for the parallax layers of the game world.
 * @extends MovableObject
 */
export class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a background object at the specified position.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - The horizontal position in pixels.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
