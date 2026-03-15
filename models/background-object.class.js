import { MovableObject } from "./movable-object.class.js";

/**
 * Hintergrundobjekt fuer die Parallax-Ebenen der Spielwelt.
 * @extends MovableObject
 */
export class BackgroundObject extends MovableObject {
    /** @type {number} */
    width = 720;
    /** @type {number} */
    height = 480;

    /**
     * Erstellt ein Hintergrundobjekt an der angegebenen Position.
     * @param {string} imagePath - Pfad zum Hintergrundbild.
     * @param {number} x - Die horizontale Position in Pixeln.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}
