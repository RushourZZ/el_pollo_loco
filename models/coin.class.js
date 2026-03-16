import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

/**
 * Collectible coin with rotation animation.
 * @extends DrawableObject
 */
export class Coin extends DrawableObject {
    height = 100;
    width = 100;
    offset = { top: 40, bottom: 40, left: 40, right: 40 };
    hasFrameForCollision = false;

    /**
     * Creates a coin at a random position and starts the animation.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.ICONS.coin[0]);
        this.loadImages(ImageHub.ICONS.coin);
        this.x = 300 + Math.random() * 1800;
        this.y = 100 + Math.random() * 250;
        this.animate();
    }

    /**
     * Starts the rotation animation of the coin.
     */
    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.ICONS.coin.length;
            this.img = this.imageCache[ImageHub.ICONS.coin[i]];
            this.currentImage++;
        }, 200);
    }
}
