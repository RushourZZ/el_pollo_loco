import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Collectible salsa bottle on the ground.
 * @extends DrawableObject
 */
export class Bottle extends DrawableObject {
    height = 100;
    width = 100;
    hasFrameForCollision = false;
    offset = { top: 20, bottom: 20, left: 50, right: 30 };

    /**
     * Creates a bottle at a random X position at ground level.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.SALSA_BOTTLE.on_ground_left[0]);
        this.x = 400 + Math.random() * 1800;
        this.y = 350;
    }

    /**
     * Starts the rotation animation of the bottle (not called in constructor).
     */
    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.SALSA_BOTTLE.on_ground_left.length;
            this.img = this.imageCache[ImageHub.SALSA_BOTTLE.on_ground_left[i]];
            this.currentImage++;
        }, 1000 / 60);
    }
}
