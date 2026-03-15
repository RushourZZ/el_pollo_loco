import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Kleines Huhn, das vom Endboss als Projektil gespawnt wird.
 * @extends MovableObject
 */
export class SmallChicken extends MovableObject {
    /** @type {number} */
    y = 385;
    /** @type {number} */
    height = 40;
    /** @type {number} */
    width = 40;
    /** @type {boolean} */
    hasFrameForCollision = false;
    /** @type {boolean} */
    deathSoundPlayed = false;
    /** @type {{top: number, left: number, right: number, bottom: number}} */
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

    /**
     * Erstellt ein kleines Huhn an der angegebenen X-Position.
     * @param {number} x - Die Startposition auf der X-Achse.
     */
    constructor(x) {
        super();
        this.loadImage(ImageHub.ENEMIES_CHICKEN_SMALL.walk[0]);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_SMALL.walk);
        this.loadImages(ImageHub.ENEMIES_CHICKEN_SMALL.dead);
        this.x = x;
        this.speed = 2 + Math.random() * 1.5;
        this.animate();
    }

    /**
     * Startet Bewegungs- und Animations-Intervalle des kleinen Huhns.
     */
    animate() {
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 100);
    }

    /**
     * Bewegt das kleine Huhn nach links, solange es lebt.
     */
    updateMovement() {
        if (!this.isDead()) this.moveLeft();
    }

    /**
     * Zeigt die Todes- oder Lauf-Animation basierend auf dem Lebensstatus.
     */
    updateAnimation() {
        if (this.isDead()) {
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.dead[0]];
            if (!this.deathSoundPlayed) {
                SoundHub.SMALL_CHICKEN_DEATH.death.play();
                this.deathSoundPlayed = true;
            }
        } else {
            let i = this.currentImage % ImageHub.ENEMIES_CHICKEN_SMALL.walk.length;
            this.img = this.imageCache[ImageHub.ENEMIES_CHICKEN_SMALL.walk[i]];
            this.currentImage++;
        }
    }
}
