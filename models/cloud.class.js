import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";

/**
 * Dekorative Wolke, die sich langsam nach links bewegt.
 * @extends MovableObject
 */
export class Cloud extends MovableObject {
    /** @type {number} */
    y = 20;
    /** @type {number} */
    width = 500;
    /** @type {number} */
    height = 250;

    /**
     * Erstellt eine Wolke an zufaelliger X-Position und startet die Bewegung.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.BACKGROUND_LAYERS.clouds[0], ImageHub.BACKGROUND_LAYERS.clouds[1]);
        this.x = 200 + Math.random() * 2000;

        this.animate();
    }

    /**
     * Startet die kontinuierliche Linksbewegung der Wolke.
     */
    animate() {
        IntervalHub.startInterval(() => this.moveLeft(), 1000 / 60);
    }
}
