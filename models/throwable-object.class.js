import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Werfbares Objekt (Salsa-Flasche) mit Wurfparabel und Splash-Animation.
 * @extends MovableObject
 */
export class ThrowableObject extends MovableObject {
    /** @type {boolean} */
    alwaysAboveGround = true;
    /** @type {boolean} */
    hasFrame = true;
    /** @type {boolean} */
    splashing = false;
    /** @type {boolean} */
    hasSplashed = false;

    /**
     * Erstellt ein Wurfgeschoss an der angegebenen Position und startet den Wurf.
     * @param {number} x - Die Startposition auf der X-Achse.
     * @param {number} y - Die Startposition auf der Y-Achse.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(ImageHub.SALSA_BOTTLE.rotation[0]);
        this.loadImages(ImageHub.SALSA_BOTTLE.rotation);
        this.loadImages(ImageHub.SALSA_BOTTLE.splash);
        this.height = 100;
        this.width = 80;
        this.throw(this.x, this.y);
        this.animate();
    }

    /**
     * Startet die Wurfbewegung mit Schwerkraft und horizontaler Geschwindigkeit.
     * @param {number} x - Die X-Startposition.
     * @param {number} y - Die Y-Startposition.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 15;
        this.applyGravity();
        IntervalHub.startInterval(() => {
            if (this.spashing) return;
            this.x += 10;
            if (this.y >= 350) this.startSplash();
        }, 1000 / 60);
    }

    // #region splash animation
    /**
     * Startet die Splash-Animation beim Aufprall und spielt den Bruchsound.
     */
    startSplash() {
        if (this.splashing) return;
        this.splashing = true;
        this.currentImage = 0;
        this.speedY = 0;
        SoundHub.THROWABLE.bottle.currentTime = 0;
        SoundHub.THROWABLE.bottle.play();
    }

    /**
     * Spielt die Splash-Animation Frame fuer Frame und markiert das Ende.
     */
    splashAnimation() {
        if (this.currentImage >= ImageHub.SALSA_BOTTLE.splash.length) {
            this.hasSplashed = true;

            return;
        }
        this.img = this.imageCache[ImageHub.SALSA_BOTTLE.splash[this.currentImage]];
        this.currentImage++;
    }

    /**
     * Animations-Loop: wechselt zwischen Rotations- und Splash-Animation.
     */
    animate() {
        IntervalHub.startInterval(() => {
            if (this.splashing) {
                this.splashAnimation();
            } else {
                let i = this.currentImage % ImageHub.SALSA_BOTTLE.rotation.length;
                this.img = this.imageCache[ImageHub.SALSA_BOTTLE.rotation[i]];
                this.currentImage++;
            }
        }, 1000 / 20);
    }
    // #endregion splash animation
}
