import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

/**
 * Throwable object (salsa bottle) with arc trajectory and splash animation.
 * @extends MovableObject
 */
export class ThrowableObject extends MovableObject {
    alwaysAboveGround = true;
    hasFrameForCollision = false;
    splashing = false;
    hasSplashed = false;

    /**
     * Creates a throwable at the given position and initiates the throw.
     * @param {number} x - The starting X position.
     * @param {number} y - The starting Y position.
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
     * Starts the throw motion with gravity and horizontal velocity.
     * @param {number} x - The starting X position.
     * @param {number} y - The starting Y position.
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
     * Starts the splash animation on impact and plays the break sound.
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
     * Plays the splash animation frame by frame and marks the end.
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
     * Animation loop: switches between rotation and splash animation.
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
