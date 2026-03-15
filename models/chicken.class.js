import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "../manager_classes/imageHub.js";
import { IntervalHub } from "../manager_classes/intervalHub.js";
import { SoundHub } from "../manager_classes/soundHub.js";

export class Chicken extends MovableObject {
    y = 370;
    height = 70;
    width = 70;
    hasFrame = true;
    deadSoundPlayed = false;
    offset = { top: 5, left: 5, right: 5, bottom: 5 };

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
    animate() {
        IntervalHub.startInterval(() => this.updateMovement(), 1000 / 60);
        IntervalHub.startInterval(() => this.updateAnimation(), 7800 / 60);
    }

    updateMovement() {
        if (!this.isDead()) this.moveLeft();
    }

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

    moveLeft() {
        this.x -= this.speed;
    }
    //#endregion chicken animation
}
