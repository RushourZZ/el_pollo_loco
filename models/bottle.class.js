import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { DrawableObject } from "./drawable-object.class.js";

/**
 * Sammelbare Salsa-Flasche auf dem Boden.
 * @extends DrawableObject
 */
export class Bottle extends DrawableObject {
    /** @type {number} */
    height = 100;
    /** @type {number} */
    width = 100;

    /**
     * Erstellt eine Flasche an zufaelliger X-Position auf Bodenhoehe.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.SALSA_BOTTLE.on_ground_left[0]);
        this.x = 400 + Math.random() * 1800;
        this.y = 350;
    }

    /**
     * Startet die Rotationsanimation der Flasche (aktuell nicht im Konstruktor aufgerufen).
     */
    animate() {
        IntervalHub.startInterval(() => {
            let i = this.currentImage % ImageHub.SALSA_BOTTLE.on_ground_left.length;
            this.img = this.imageCache[ImageHub.SALSA_BOTTLE.on_ground_left[i]];
            this.currentImage++;
        }, 1000 / 60);
    }
}
