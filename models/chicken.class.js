import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Normaler Huehner-Gegner mit Lauf- und Todes-Animation.
 * @extends MovableObject
 */
export class Chicken extends MovableObject {
    /** @type {number} */
    y = 370;
    /** @type {number} */
    height = 70;
    /** @type {number} */
    width = 70;
    /** @type {boolean} */
    hasFrame = true;
    /** @type {boolean} */
    deadSoundPlayed = false;
    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

    /**
     * Erstellt ein Huhn an zufaelliger Position mit zufaelliger Geschwindigkeit.
     */
    constructor() {
        super();
        this.loadImage(ImageHub.ENEMIES_CHICKEN_NORMAL.walk[0]);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_NORMAL.walk);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_NORMAL.dead);
        this.x = 450 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    //#region chicken animation
    /**
     * Startet Bewegungs- und Animations-Intervalle des Huhns.
     */
    animate() {
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 7800 / 60);
    }

    /**
     * Bewegt das Huhn nach links, solange es lebt.
     */
    updateMovement() {
        if (!this.isDead()) this.moveLeft();
    }

    /**
     * Zeigt die Todes- oder Lauf-Animation basierend auf dem Lebensstatus.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_NORMAL.dead];
            if (!this.deadSoundPlayed) {
                SoundHub.CHICKEN_NORMAL.death.play();
                this.deadSoundPlayed = true;
            }
        } else {
            let i = this.currentImage % ImageHub.ENEMIES_CHICKEN_NORMAL.walk.length;
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_NORMAL.walk[i]];
            this.currentImage++;
        }
    }

    /**
     * Bewegt das Huhn um seine Geschwindigkeit nach links.
     */
    moveLeft() {
        this.x -= this.speed;
    }
    //#endregion chicken animation
}
