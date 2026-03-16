import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Small chicken spawned by the endboss as a projectile.
 * @extends MovableObject
 */
export class SmallChicken extends MovableObject {
    y = 400;
    height = 40;
    width = 40;
    hasFrameForCollision = false;
    deathSoundPlayed = false;
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

    /**
     * Creates a small chicken at the given X position.
     * @param {number} x - The starting X position.
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
     * Starts the movement and animation intervals of the small chicken.
     */
    animate() {
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 100);
    }

    /**
     * Moves the small chicken to the left while alive.
     */
    updateMovement() {
        if (!this.isDead()) this.moveLeft();
    }

    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Shows the death or walk animation based on the life status.
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
