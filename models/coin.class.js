import { DrawableObject } from "./drawable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

/**
 * Sammelbare Muenze mit Rotationsanimation.
 * @extends DrawableObject
 */
export class Coin extends DrawableObject {
    /** @type {number} */
    height = 100;
    /** @type {number} */
    width = 100;
    /** @type {{top: number, bottom: number, left: number, right: number}} */
    offset = { top: 40, bottom: 40, left: 40, right: 40 };
    hasFrameForCollision = false;

    /**
     * Erstellt eine Muenze an zufaelliger Position und startet die Animation.
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
     * Startet die Rotationsanimation der Muenze.
     */
    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.ICONS.coin.length;
            this.img = this.imageCache[ImageHub.ICONS.coin[i]];
            this.currentImage++;
        }, 1000 / 60);
    }
}
