import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class ThrowableObject extends MovableObject {
    alwaysAboveGround = true;
    hasFrame = true;
    splashing = false;
    hasSplashed = false;

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
    startSplash() {
        if (this.splashing) return;
        this.splashing = true;
        this.currentImage = 0;
        this.speedY = 0;
        SoundHub.THROWABLE.bottle.currentTime = 0;
        SoundHub.THROWABLE.bottle.play();
    }

    splashAnimation() {
        if (this.currentImage >= ImageHub.SALSA_BOTTLE.splash.length) {
            this.hasSplashed = true;

            return;
        }
        this.img = this.imageCache[ImageHub.SALSA_BOTTLE.splash[this.currentImage]];
        this.currentImage++;
    }

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
